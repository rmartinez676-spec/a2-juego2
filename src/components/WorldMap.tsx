"use client";

import { isStageUnlocked } from "@/game/stages";
import { THEMES } from "@/game/themes";
import type { GameData, Progress, Stage } from "@/game/types";

interface Props {
  data: GameData;
  stages: Stage[];
  progress: Progress;
  freePlay: boolean;
  muted: boolean;
  onPlay: (stage: Stage) => void;
  onBack: () => void;
  onToggleFree: () => void;
  onToggleMute: () => void;
}

interface WorldCard {
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  stages: Stage[];
}

export default function WorldMap({ data, stages, progress, freePlay, muted, onPlay, onBack, onToggleFree, onToggleMute }: Props) {
  const worlds: WorldCard[] = [0, 1, 2, 3, 4, 5, 6, 7]
    .map((number): WorldCard | null => {
      const list = stages.filter((s) => s.blockNumber === number);
      if (list.length === 0) return null;
      if (number === 0) {
        return { number, title: "Plaza de la Administración", subtitle: "Mundo inicial · Tutorial", theme: "plaza", stages: list };
      }
      if (number === 7) {
        return { number, title: "Examen Final", subtitle: "Tribunal Calificador · todo el temario", theme: "tribunal", stages: list };
      }
      const block = data.blocks.find((b) => b.number === number);
      return {
        number,
        title: block?.title ?? `Bloque ${number}`,
        subtitle: block ? `${block.worldName} · ${block.ministry}` : "",
        theme: block?.theme ?? "plaza",
        stages: list,
      };
    })
    .filter((w): w is WorldCard => w !== null);

  const done = progress.completed.length;
  const total = stages.length;

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-950 text-white">
      <header className="flex items-center justify-between gap-[2cqw] border-b border-white/10 bg-black/40 px-[2.5cqw] py-[1.2cqw]">
        <div className="flex items-center gap-[2cqw]">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-md bg-white/10 px-[2cqw] py-[0.8cqw] text-[2.2cqw] font-bold hover:bg-white/20"
          >
            ← Inicio
          </button>
          <div>
            <p className="text-[2.6cqw] font-black text-amber-300">Mapa del temario</p>
            <p className="text-[1.9cqw] text-slate-300">
              Progreso: {done}/{total} fases
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[1.5cqw]">
          <button
            type="button"
            onClick={onToggleFree}
            className={`cursor-pointer rounded-md px-[2cqw] py-[0.8cqw] text-[2cqw] font-bold ${
              freePlay ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title="Permite jugar cualquier fase sin completar las anteriores"
          >
            {freePlay ? "Modo estudio: libre ✓" : "Modo estudio libre"}
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            className="cursor-pointer rounded-md bg-white/10 px-[2cqw] py-[0.8cqw] text-[2.2cqw] hover:bg-white/20"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 snap-x gap-[1.6cqw] overflow-x-auto overflow-y-hidden p-[1.6cqw]">
        {worlds.map((world) => {
          const theme = THEMES[world.theme] ?? THEMES.plaza;
          const worldDone = world.stages.every((s) => progress.completed.includes(s.key));
          return (
            <section
              key={world.number}
              className="flex w-[40cqw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/15 shadow-xl"
              style={{ background: `linear-gradient(180deg, ${theme.sky[0]}, ${theme.sky[1]}40 60%, #0b1020)` }}
            >
              <div className="bg-black/35 px-[2cqw] py-[1.4cqw]">
                <p className="text-[1.8cqw] font-bold uppercase tracking-wider text-amber-200">
                  {world.number === 0 ? "Mundo 0" : world.number === 7 ? "Mundo final" : `Mundo ${world.number}`}
                  {worldDone ? " · ✔ superado" : ""}
                </p>
                <h2 className="text-[2.6cqw] font-black leading-tight">{world.title}</h2>
                <p className="text-[1.8cqw] text-slate-200">{world.subtitle}</p>
              </div>
              <ol className="flex min-h-0 flex-1 flex-col gap-[1cqw] overflow-y-auto p-[1.5cqw]">
                {world.stages.map((stage) => {
                  const idx = stage.index;
                  const finished = progress.completed.includes(stage.key);
                  const unlocked = isStageUnlocked(stages, idx, progress.completed, freePlay);
                  const topic = stage.topicId ? data.blocks.flatMap((b) => b.topics).find((t) => t.id === stage.topicId) : undefined;
                  const score = progress.testScores[stage.key];
                  const icon = stage.kind === "boss" ? "💀" : stage.kind === "exam" ? "🎓" : stage.kind === "tutorial" ? "🏁" : finished ? "✔" : "📘";
                  return (
                    <li key={stage.key}>
                      <button
                        type="button"
                        disabled={!unlocked}
                        onClick={() => onPlay(stage)}
                        className={`flex w-full cursor-pointer items-center gap-[1.5cqw] rounded-lg border px-[1.6cqw] py-[1.1cqw] text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          stage.kind === "boss" || stage.kind === "exam"
                            ? "border-red-400/60 bg-red-950/60 hover:bg-red-900/70"
                            : finished
                              ? "border-emerald-400/60 bg-emerald-950/50 hover:bg-emerald-900/60"
                              : "border-white/20 bg-black/40 hover:bg-black/60"
                        }`}
                      >
                        <span className="grid h-[4.6cqw] w-[4.6cqw] shrink-0 place-items-center rounded-md bg-white/10 text-[2.4cqw]">
                          {unlocked ? icon : "🔒"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[1.9cqw] font-bold text-amber-200">{stage.subtitle}</span>
                          <span className="block truncate text-[2.1cqw] font-semibold">{stage.title}</span>
                          <span className="block text-[1.7cqw] text-slate-300">
                            {stage.kind === "topic" && score ? `Prueba: ${score.score}/${score.total}` : ""}
                            {stage.kind === "topic" && topic?.needsReview ? " · ⚠ revisar (BOE actualizado)" : ""}
                            {stage.kind === "tutorial" ? "Aprende a jugar" : ""}
                            {stage.kind === "boss" ? "Responde para derrotar al jefe" : ""}
                            {stage.kind === "exam" ? "Simulacro con todo el temario" : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
