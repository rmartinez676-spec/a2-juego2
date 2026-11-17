"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { BlockDTO, BoeSourceDTO, GameData, QuestionDTO, TopicDTO } from "@/game/types";

type Act = (body: Record<string, unknown>) => Promise<boolean>;

interface SyncResult {
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

const input = "w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900";
const label = "block text-xs font-semibold uppercase tracking-wide text-slate-500";
const btn = "cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold disabled:opacity-50";
const btnPrimary = `${btn} bg-slate-900 text-white hover:bg-slate-700`;
const btnDanger = `${btn} bg-red-600 text-white hover:bg-red-500`;
const btnGhost = `${btn} bg-slate-200 text-slate-800 hover:bg-slate-300`;

function field(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export default function Admin({ data }: { data: GameData }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [sync, setSync] = useState<SyncResult[] | null>(null);

  const act: Act = async (body) => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; results?: SyncResult[] };
      if (!res.ok || json.ok === false) throw new Error(json.error ?? "No se pudo guardar");
      if (Array.isArray(json.results)) setSync(json.results);
      setMsg(body.action === "syncBoe" ? "Sincronización con el BOE completada ✔" : "Cambios guardados ✔");
      router.refresh();
      return true;
    } catch (error) {
      setMsg(`Error: ${error instanceof Error ? error.message : "desconocido"}`);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const totalQuestions = data.blocks.reduce((acc, b) => acc + b.topics.reduce((a, t) => a + t.questions.length, 0), 0);
  const totalTopics = data.blocks.reduce((acc, b) => acc + b.topics.length, 0);
  const flagged = data.blocks.reduce((acc, b) => acc + b.topics.filter((t) => t.needsReview).length, 0);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 text-slate-900">
      <header className="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div>
          <h1 className="text-xl font-black">Editor del temario · OPOSI-KID</h1>
          <p className="text-sm text-slate-600">
            {data.blocks.length} bloques · {totalTopics} temas · {totalQuestions} preguntas · {flagged} temas pendientes de revisar
          </p>
        </div>
        <div className="flex items-center gap-3">
          {msg && <span className={`text-sm font-semibold ${msg.startsWith("Error") ? "text-red-600" : "text-emerald-700"}`}>{msg}</span>}
          <Link href="/" className="rounded-md bg-amber-400 px-3 py-1.5 text-sm font-bold text-slate-950 hover:bg-amber-300">
            ▶ Volver al juego
          </Link>
        </div>
      </header>

      <BoeSection sources={data.boeSources} act={act} busy={busy} results={sync} />

      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-black">Bloques (mundos)</h2>
        {data.blocks.map((block) => (
          <BlockPanel key={block.id} block={block} act={act} busy={busy} />
        ))}
        <NewBlockHint />
      </section>
    </main>
  );
}

function NewBlockHint() {
  return (
    <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
      Para añadir más mundos, crea nuevos temas dentro de un bloque. Los bloques 1-6 y el Examen Final se generan automáticamente
      a partir de estos datos.
    </p>
  );
}

function BoeSection({ sources, act, busy, results }: { sources: BoeSourceDTO[]; act: Act; busy: boolean; results: SyncResult[] | null }) {
  const changed = sources.filter((s) => s.changed).length;
  const onAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const ok = await act({ action: "addSource", boeId: field(fd, "boeId"), shortName: field(fd, "shortName") });
    if (ok) e.currentTarget.reset();
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black">Conexión con el BOE</h2>
          <p className="text-sm text-slate-600">
            Consulta la API de datos abiertos del BOE: fecha de última actualización y normas que modifican cada ley. Si algo cambia, los temas
            vinculados se marcan para revisar.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" disabled={busy} onClick={() => act({ action: "syncBoe" })} className={btnPrimary}>
            {busy ? "Consultando…" : "Sincronizar con el BOE"}
          </button>
          <button type="button" disabled={busy || changed === 0} onClick={() => act({ action: "ackSources" })} className={btnGhost}>
            Marcar cambios como vistos ({changed})
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="py-2 pr-3">Norma</th>
              <th className="py-2 pr-3">BOE</th>
              <th className="py-2 pr-3">Última actualización</th>
              <th className="py-2 pr-3">Reformas</th>
              <th className="py-2 pr-3">Estado</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.id} className="border-t border-slate-100">
                <td className="py-2 pr-3">
                  <div className="font-semibold">{s.shortName}</div>
                  <div className="max-w-md truncate text-xs text-slate-500">{s.title || "Pendiente de sincronizar"}</div>
                </td>
                <td className="py-2 pr-3">
                  {s.url ? (
                    <a className="text-sky-700 underline" href={s.url} target="_blank" rel="noreferrer">
                      {s.boeId}
                    </a>
                  ) : (
                    s.boeId
                  )}
                </td>
                <td className="py-2 pr-3 text-xs">{s.lastUpdate ? formatBoeDate(s.lastUpdate) : "—"}</td>
                <td className="py-2 pr-3">{s.reformCount}</td>
                <td className="py-2 pr-3">
                  {s.changed ? (
                    <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">Cambió</span>
                  ) : (
                    <span className="text-xs text-slate-500">{s.status}</span>
                  )}
                </td>
                <td className="py-2 text-right">
                  <button type="button" disabled={busy} onClick={() => confirm("¿Quitar esta fuente?") && act({ action: "removeSource", id: s.id })} className="text-xs text-red-600 hover:underline">
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={onAdd} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <input name="boeId" required placeholder="BOE-A-2015-10565" className={input} />
        <input name="shortName" placeholder="Nombre corto (ej. Ley 39/2015)" className={input} />
        <button type="submit" disabled={busy} className={btnGhost}>
          Añadir norma BOE
        </button>
      </form>

      {results && (
        <ul className="mt-4 space-y-1 rounded-lg bg-slate-50 p-3 text-sm">
          {results.map((r) => (
            <li key={r.boeId}>
              {r.ok ? (
                <>
                  <span className="font-semibold">{r.boeId}</span> · {r.title?.slice(0, 80)} · reformas: {r.reformCount}
                  {r.changed ? <span className="font-bold text-amber-700"> · CAMBIO detectado ({r.flaggedTopics} temas marcados)</span> : null}
                  {r.latestReform ? <span className="text-slate-500"> · última norma modificadora: {r.latestReform}</span> : null}
                </>
              ) : (
                <span className="text-red-700">
                  {r.boeId}: {r.error}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatBoeDate(value: string): string {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(value);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : value;
}

function BlockPanel({ block, act, busy }: { block: BlockDTO; act: Act; busy: boolean }) {
  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    void act({
      action: "updateBlock",
      id: block.id,
      title: field(fd, "title"),
      ministry: field(fd, "ministry"),
      worldName: field(fd, "worldName"),
      description: field(fd, "description"),
      theme: field(fd, "theme"),
      bossName: field(fd, "bossName"),
      bossIntro: field(fd, "bossIntro"),
      bossStyle: field(fd, "bossStyle"),
    });
  };
  const onAddTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const ok = await act({ action: "createTopic", blockId: block.id, title: field(fd, "title") });
    if (ok) e.currentTarget.reset();
  };

  return (
    <details className="rounded-xl border border-slate-200 bg-white shadow-sm" open={block.number === 1}>
      <summary className="cursor-pointer px-5 py-4 font-black">
        Mundo {block.number} · {block.title} <span className="font-normal text-slate-500">({block.topics.length} temas)</span>
      </summary>
      <div className="space-y-5 border-t border-slate-100 p-5">
        <form onSubmit={onSave} className="grid gap-3 md:grid-cols-2">
          <div>
            <span className={label}>Título del bloque</span>
            <input name="title" defaultValue={block.title} className={input} />
          </div>
          <div>
            <span className={label}>Ministerio / institución</span>
            <input name="ministry" defaultValue={block.ministry} className={input} />
          </div>
          <div>
            <span className={label}>Nombre del mundo</span>
            <input name="worldName" defaultValue={block.worldName} className={input} />
          </div>
          <div>
            <span className={label}>Ambientación (congreso, ministerio, inap, hacienda, digital, europa)</span>
            <select name="theme" defaultValue={block.theme} className={input}>
              {["congreso", "ministerio", "inap", "hacienda", "digital", "europa"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <span className={label}>Descripción</span>
            <textarea name="description" defaultValue={block.description} rows={2} className={input} />
          </div>
          <div>
            <span className={label}>Nombre del jefe final</span>
            <input name="bossName" defaultValue={block.bossName} className={input} />
          </div>
          <div>
            <span className={label}>Estilo del jefe (quorum, stamp, judge, inspector, cyber, stars)</span>
            <select name="bossStyle" defaultValue={block.bossStyle} className={input}>
              {["quorum", "stamp", "judge", "inspector", "cyber", "stars"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <span className={label}>Frase de introducción del jefe</span>
            <textarea name="bossIntro" defaultValue={block.bossIntro} rows={2} className={input} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={busy} className={btnPrimary}>
              Guardar mundo
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <h3 className="font-bold">Temas (submundos)</h3>
          {block.topics.map((topic) => (
            <TopicPanel key={topic.id} topic={topic} blockId={block.id} act={act} busy={busy} />
          ))}
          <form onSubmit={onAddTopic} className="flex flex-wrap gap-2">
            <input name="title" required placeholder="Título del nuevo tema" className={`${input} max-w-md`} />
            <button type="submit" disabled={busy} className={btnGhost}>
              + Añadir tema
            </button>
          </form>
        </div>
      </div>
    </details>
  );
}

function TopicPanel({ topic, blockId, act, busy }: { topic: TopicDTO; blockId: number; act: Act; busy: boolean }) {
  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    void act({
      action: "updateTopic",
      id: topic.id,
      title: field(fd, "title"),
      summary: field(fd, "summary"),
      npcName: field(fd, "npcName"),
      npcRole: field(fd, "npcRole"),
      npcLines: field(fd, "npcLines"),
      tipName: field(fd, "tipName"),
      tipRole: field(fd, "tipRole"),
      tipLines: field(fd, "tipLines"),
      boeIds: field(fd, "boeIds"),
    });
  };

  return (
    <details className="rounded-lg border border-slate-200 bg-slate-50">
      <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-3 text-sm font-semibold">
        <span>
          Tema {topic.position}: {topic.title}
        </span>
        <span className="text-xs font-normal text-slate-500">· {topic.questions.length} preguntas</span>
        {topic.needsReview && <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">⚠ revisar (BOE)</span>}
      </summary>
      <div className="space-y-5 border-t border-slate-200 p-4">
        <div className="flex flex-wrap justify-end gap-2">
          {topic.needsReview && (
            <button type="button" disabled={busy} onClick={() => act({ action: "markTopicReviewed", id: topic.id })} className={btnGhost}>
              Marcar revisado
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => confirm(`¿Eliminar el tema "${topic.title}" y sus preguntas?`) && act({ action: "deleteTopic", id: topic.id })}
            className={btnDanger}
          >
            Eliminar tema
          </button>
        </div>

        <form onSubmit={onSave} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <span className={label}>Título del tema</span>
            <input name="title" defaultValue={topic.title} className={input} />
          </div>
          <div className="md:col-span-2">
            <span className={label}>Resumen</span>
            <input name="summary" defaultValue={topic.summary} className={input} />
          </div>
          <div>
            <span className={label}>Personaje explicador: nombre</span>
            <input name="npcName" defaultValue={topic.npcName} className={input} />
          </div>
          <div>
            <span className={label}>Personaje explicador: cargo</span>
            <input name="npcRole" defaultValue={topic.npcRole} className={input} />
          </div>
          <div>
            <span className={label}>Explicación (una frase por línea)</span>
            <textarea name="npcLines" rows={4} defaultValue={topic.npcLines.join("\n")} className={input} />
          </div>
          <div>
            <span className={label}>Consejo: nombre y cargo</span>
            <div className="grid grid-cols-2 gap-2">
              <input name="tipName" defaultValue={topic.tipName} className={input} />
              <input name="tipRole" defaultValue={topic.tipRole} className={input} />
            </div>
            <textarea name="tipLines" rows={2} defaultValue={topic.tipLines.join("\n")} className={`${input} mt-2`} />
          </div>
          <div className="md:col-span-2">
            <span className={label}>IDs BOE vinculados (separados por comas)</span>
            <input name="boeIds" defaultValue={topic.boeIds.join(", ")} placeholder="BOE-A-2015-10565, BOE-A-2015-10566" className={input} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={busy} className={btnPrimary}>
              Guardar tema
            </button>
          </div>
        </form>

        <div className="space-y-2">
          <h4 className="text-sm font-bold">Preguntas ({topic.questions.length})</h4>
          {topic.questions.map((q) => (
            <QuestionEditor key={q.id} question={q} blockId={blockId} topicId={topic.id} act={act} busy={busy} />
          ))}
          <details className="rounded-md border border-dashed border-slate-300 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold">+ Nueva pregunta</summary>
            <div className="mt-3">
              <QuestionForm blockId={blockId} topicId={topic.id} act={act} busy={busy} />
            </div>
          </details>
        </div>
      </div>
    </details>
  );
}

function QuestionEditor({ question, blockId, topicId, act, busy }: { question: QuestionDTO; blockId: number; topicId: number; act: Act; busy: boolean }) {
  return (
    <details className="rounded-md border border-slate-200 bg-white p-3">
      <summary className="cursor-pointer text-sm">{question.prompt}</summary>
      <div className="mt-3 space-y-3">
        <QuestionForm question={question} blockId={blockId} topicId={topicId} act={act} busy={busy} />
        <div className="flex justify-end">
          <button
            type="button"
            disabled={busy}
            onClick={() => confirm("¿Eliminar esta pregunta?") && act({ action: "deleteQuestion", id: question.id })}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Eliminar pregunta
          </button>
        </div>
      </div>
    </details>
  );
}

function QuestionForm({ question, blockId, topicId, act, busy }: { question?: QuestionDTO; blockId: number; topicId: number; act: Act; busy: boolean }) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const options = [0, 1, 2, 3].map((i) => field(fd, `opt${i}`));
    const answer = Number(fd.get("answer") ?? 0);
    const body = {
      prompt: field(fd, "prompt"),
      options,
      answer,
      explanation: field(fd, "explanation"),
      reference: field(fd, "reference"),
    };
    if (question) {
      await act({ action: "updateQuestion", id: question.id, ...body });
    } else {
      const ok = await act({ action: "createQuestion", blockId, topicId, ...body });
      if (ok) e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <div>
        <span className={label}>Enunciado</span>
        <textarea name="prompt" required rows={2} defaultValue={question?.prompt ?? ""} className={input} />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <label key={i} className="flex items-center gap-2">
            <input type="radio" name="answer" value={i} required defaultChecked={question ? question.answer === i : i === 0} />
            <input name={`opt${i}`} required placeholder={`Opción ${String.fromCharCode(65 + i)}`} defaultValue={question?.options[i] ?? ""} className={input} />
          </label>
        ))}
      </div>
      <p className="text-xs text-slate-500">Marca con el círculo la opción correcta.</p>
      <div>
        <span className={label}>Explicación</span>
        <textarea name="explanation" rows={2} defaultValue={question?.explanation ?? ""} className={input} />
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <input name="reference" placeholder="Referencia legal (ej. Art. 66 CE)" defaultValue={question?.reference ?? ""} className={input} />
        <button type="submit" disabled={busy} className={btnPrimary}>
          {question ? "Guardar pregunta" : "Añadir pregunta"}
        </button>
      </div>
    </form>
  );
}
