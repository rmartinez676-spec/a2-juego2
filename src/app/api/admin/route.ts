import { count, eq } from "drizzle-orm";
import { db, hasDb } from "@/db";
import { blocks, boeSources, questions, topics } from "@/db/schema";
import { ensureSeed } from "@/db/seed";
import { isValidBoeId, syncBoeSources } from "@/lib/boe";

export const dynamic = "force-dynamic";

type Body = { action?: unknown } & Record<string, unknown>;

const str = (v: unknown, max = 2000): string => (typeof v === "string" ? v.trim().slice(0, max) : "");
const lines = (v: unknown): string[] => {
  const raw = Array.isArray(v) ? v.map(String) : typeof v === "string" ? v.split("\n") : [];
  return raw.map((s) => s.trim()).filter(Boolean).slice(0, 20);
};
const csv = (v: unknown): string[] => {
  const raw = Array.isArray(v) ? v.map(String) : typeof v === "string" ? v.split(/[,\n]/) : [];
  return raw.map((s) => s.trim()).filter(isValidBoeId);
};
const int = (v: unknown, fallback = 0): number => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
};

function fail(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

function questionFields(b: Body) {
  const options = Array.isArray(b.options) ? b.options.map((o) => str(o, 300)) : [];
  const answer = int(b.answer, -1);
  if (options.length !== 4 || options.some((o) => !o)) return { error: "Necesito 4 opciones no vacías" as const };
  if (answer < 0 || answer > 3) return { error: "La respuesta correcta debe ser 0-3" as const };
  const prompt = str(b.prompt, 600);
  if (!prompt) return { error: "Falta el enunciado" as const };
  return {
    fields: {
      prompt,
      options,
      answer,
      explanation: str(b.explanation, 800),
      reference: str(b.reference, 200) || null,
    },
  };
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as Body | null;
  if (!b || typeof b.action !== "string") return fail("Petición inválida");

  if (b.action === "syncBoe") {
    const results = await syncBoeSources();
    return Response.json({ ok: true, results });
  }

  if (!hasDb || !db) {
    return Response.json({ ok: true, note: "Modo standalone: cambios aplicados temporalmente." });
  }

  await ensureSeed();


  switch (b.action) {
    case "updateBlock": {
      await db
        .update(blocks)
        .set({
          title: str(b.title, 200) || "Bloque",
          ministry: str(b.ministry, 200),
          worldName: str(b.worldName, 200),
          description: str(b.description, 1000),
          theme: str(b.theme, 40) || "congreso",
          bossName: str(b.bossName, 200) || "Jefe final",
          bossIntro: str(b.bossIntro, 1000),
          bossStyle: str(b.bossStyle, 40) || "quorum",
          updatedAt: new Date(),
        })
        .where(eq(blocks.id, int(b.id)));
      break;
    }

    case "createTopic": {
      const blockId = int(b.blockId);
      const [{ value }] = await db.select({ value: count() }).from(topics).where(eq(topics.blockId, blockId));
      await db.insert(topics).values({
        blockId,
        position: Number(value) + 1,
        title: str(b.title, 200) || "Nuevo tema",
        summary: "",
        npcName: "Nuevo personaje",
        npcRole: "",
        npcLines: [],
        tipName: "Compañero/a",
        tipRole: "",
        tipLines: [],
        boeIds: [],
      });
      break;
    }

    case "updateTopic": {
      await db
        .update(topics)
        .set({
          title: str(b.title, 200) || "Tema",
          summary: str(b.summary, 500),
          npcName: str(b.npcName, 120) || "Profesor/a",
          npcRole: str(b.npcRole, 160),
          npcLines: lines(b.npcLines),
          tipName: str(b.tipName, 120) || "Compañero/a",
          tipRole: str(b.tipRole, 160),
          tipLines: lines(b.tipLines),
          boeIds: csv(b.boeIds),
          updatedAt: new Date(),
        })
        .where(eq(topics.id, int(b.id)));
      break;
    }

    case "markTopicReviewed": {
      await db.update(topics).set({ needsReview: false }).where(eq(topics.id, int(b.id)));
      break;
    }

    case "deleteTopic": {
      await db.delete(topics).where(eq(topics.id, int(b.id)));
      break;
    }

    case "createQuestion": {
      const f = questionFields(b);
      if ("error" in f) return fail(f.error ?? "Error");
      await db.insert(questions).values({
        blockId: int(b.blockId),
        topicId: int(b.topicId),
        ...f.fields,
      });
      break;
    }

    case "updateQuestion": {
      const f = questionFields(b);
      if ("error" in f) return fail(f.error ?? "Error");
      await db.update(questions).set(f.fields).where(eq(questions.id, int(b.id)));
      break;
    }

    case "deleteQuestion": {
      await db.delete(questions).where(eq(questions.id, int(b.id)));
      break;
    }

    case "addSource": {
      const boeId = str(b.boeId, 40).toUpperCase();
      if (!isValidBoeId(boeId)) return fail("Formato BOE no válido. Ejemplo: BOE-A-2015-10565");
      await db
        .insert(boeSources)
        .values({ boeId, shortName: str(b.shortName, 120) || boeId })
        .onConflictDoNothing();
      break;
    }

    case "removeSource": {
      await db.delete(boeSources).where(eq(boeSources.id, int(b.id)));
      break;
    }

    case "ackSources": {
      await db.update(boeSources).set({ changed: false });
      break;
    }

    case "syncBoe": {
      const results = await syncBoeSources();
      return Response.json({ ok: true, results });
    }

    default:
      return fail("Acción desconocida");
  }

  return Response.json({ ok: true });
}
