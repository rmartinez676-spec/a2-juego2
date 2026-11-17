import { eq } from "drizzle-orm";
import { db } from "@/db";
import { boeSources, topics } from "@/db/schema";

// API de datos abiertos del BOE (legislación consolidada).
// Nota: el endpoint de metadatos/análisis responde en JSON con Accept: application/json.
const BASE = "https://www.boe.es/datosabiertos/api/legislacion-consolidada/id/";

interface BoeMetaJson {
  data?: Array<{
    titulo?: string;
    fecha_actualizacion?: string;
    url_html_consolidada?: string;
    url_eli?: string;
  }>;
}

interface BoeAnalysisJson {
  data?: Array<{
    referencias?: {
      posteriores?: Array<{ posterior?: Array<{ id_norma?: string; texto?: string }> }>;
    };
  }>;
}

export interface SyncResult {
  boeId: string;
  ok: boolean;
  title?: string;
  lastUpdate?: string;
  reformCount?: number;
  changed?: boolean;
  flaggedTopics?: number;
  latestReform?: string | null;
  error?: string;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`BOE respondió HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function isValidBoeId(id: string): boolean {
  return /^BOE-A-\d{4}-\d{1,6}$/.test(id);
}

// Sincroniza todas las fuentes BOE: fecha de actualización y número de normas que las modifican.
// Si cambian respecto a la última revisión, marca como "revisar" los temas vinculados.
export async function syncBoeSources(): Promise<SyncResult[]> {
  const sources = await db.select().from(boeSources);
  const allTopics = await db.select().from(topics);
  const results: SyncResult[] = [];

  for (const source of sources) {
    try {
      const meta = await getJson<BoeMetaJson>(`${BASE}${source.boeId}/metadatos`);
      const info = meta.data?.[0];
      if (!info) throw new Error("Respuesta sin datos");

      const analysis = await getJson<BoeAnalysisJson>(`${BASE}${source.boeId}/analisis`);
      const reforms: Array<{ id_norma?: string }> = [];
      for (const group of analysis.data?.[0]?.referencias?.posteriores ?? []) {
        for (const item of group.posterior ?? []) reforms.push(item);
      }
      const reformCount = reforms.length;
      const lastUpdate = info.fecha_actualizacion ?? null;
      const hadBaseline = source.lastUpdate !== null;
      const differs = hadBaseline && (source.lastUpdate !== lastUpdate || source.reformCount !== reformCount);
      const changed = source.changed || differs;

      await db
        .update(boeSources)
        .set({
          title: info.titulo ?? source.title,
          url: info.url_html_consolidada ?? info.url_eli ?? source.url,
          status: "ok",
          lastUpdate,
          reformCount,
          changed,
          lastCheckedAt: new Date(),
        })
        .where(eq(boeSources.id, source.id));

      let flaggedTopics = 0;
      if (changed) {
        for (const topic of allTopics) {
          if (topic.boeIds.includes(source.boeId) && !topic.needsReview) {
            await db.update(topics).set({ needsReview: true }).where(eq(topics.id, topic.id));
            topic.needsReview = true;
            flaggedTopics++;
          }
        }
      }

      results.push({
        boeId: source.boeId,
        ok: true,
        title: info.titulo,
        lastUpdate: lastUpdate ?? undefined,
        reformCount,
        changed,
        flaggedTopics,
        latestReform: reforms[0]?.id_norma ?? null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      await db
        .update(boeSources)
        .set({ status: `error: ${message}`.slice(0, 200), lastCheckedAt: new Date() })
        .where(eq(boeSources.id, source.id));
      results.push({ boeId: source.boeId, ok: false, error: message });
    }
  }

  return results;
}
