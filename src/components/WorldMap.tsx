import Image from "next/image";
import { isStageUnlocked } from "@/game/stages";
import { THEMES } from "@/game/themes";
import type { GameData, Progress, Stage } from "@/game/types";
import type { Difficulty } from "@/game/engine";

interface Props {
  data: GameData;
  stages: Stage[];
  progress: Progress;
  freePlay: boolean;
  muted: boolean;
  musicMuted: boolean;
  difficulty: Difficulty;
  onPlay: (stage: Stage) => void;
  onOpenStudyHub?: () => void;
  onBack: () => void;
  onToggleFree: () => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
  onSelectDifficulty?: (d: Difficulty) => void;
  onToggleFullscreen?: () => void;
}

interface WorldCard {
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  bossImage?: string;
  stages: Stage[];
}

const WORLD_PORTRAITS: Record<number, string> = {
  0: "/characters/don_ramon.jpg",
  1: "/characters/senor_quorum.jpg",
  2: "/characters/comisario_ue.jpg",
  4: "/characters/jueza_alzada.jpg",
  6: "/characters/gran_interventor.jpg",
  7: "/characters/tribunal_calificador.jpg",
};

export default function WorldMap({
  data,
  stages,
  progress,
  freePlay,
  muted,
  musicMuted,
  difficulty,
  onPlay,
  onOpenStudyHub,
  onBack,
  onToggleFree,
  onToggleMute,
  onToggleMusic,
  onSelectDifficulty,
  onToggleFullscreen,
}: Props) {
  const worlds: WorldCard[] = [0, 1, 2, 3, 4, 5, 6, 7]
    .map((number): WorldCard | null => {
      const list = stages.filter((s) => s.blockNumber === number);
      if (list.length === 0) return null;
      if (number === 0) {
        return {
          number,
          title: "Plaza de la Administración",
          subtitle: "Mundo inicial · Tutorial y conceptos básicos",
          theme: "plaza",
          bossImage: WORLD_PORTRAITS[0],
          stages: list,
        };
      }
      if (number === 7) {
        return {
          number,
          title: "Examen Final de la Oposición",
          subtitle: "Tribunal Calificador · Todo el temario A2 AGE",
          theme: "tribunal",
          bossImage: WORLD_PORTRAITS[7],
          stages: list,
        };
      }
      const block = data.blocks.find((b) => b.number === number);
      return {
        number,
        title: block?.title ?? `Bloque ${number}`,
        subtitle: block ? `${block.worldName} · ${block.ministry}` : "",
        theme: block?.theme ?? "plaza",
        bossImage: WORLD_PORTRAITS[number],
        stages: list,
      };
    })
    .filter((w): w is WorldCard => w !== null);

  const done = progress.completed.length;
  const total = stages.length;

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-950 text-white select-none">
      <header className="flex items-center justify-between gap-[1.5cqw] border-b border-white/10 bg-black/60 px-[2cqw] py-[1cqw] backdrop-blur">
        <div className="flex items-center gap-[1.5cqw]">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-lg bg-white/15 px-[1.8cqw] py-[0.7cqw] text-[2cqw] font-bold hover:bg-white/25 active:scale-95"
          >
            ← Inicio
          </button>
          <div>
            <p className="text-[2.4cqw] font-black text-amber-300">Mapa de los 6 Mundos</p>
            <p className="text-[1.7cqw] text-slate-300">
              Progreso: {done}/{total} fases superadas
            </p>
          </div>
        </div>

        {/* Controles y dificultad */}
        <div className="flex items-center gap-[1cqw]">
          {onSelectDifficulty && (
            <div className="hidden sm:flex items-center gap-[0.5cqw] rounded-lg bg-black/40 px-[1cqw] py-[0.5cqw] text-[1.6cqw]">
              <span className="text-slate-400">Dificultad:</span>
              <button
                type="button"
                onClick={() => onSelectDifficulty(difficulty === "easy" ? "normal" : difficulty === "normal" ? "hard" : "easy")}
                className="cursor-pointer font-bold text-amber-300 hover:underline"
              >
                {difficulty === "easy" ? "🟢 Fácil" : difficulty === "normal" ? "🟡 Estándar" : "🔴 Tribunal"}
              </button>
            </div>
          )}

          {onOpenStudyHub && (
            <button
              type="button"
              onClick={onOpenStudyHub}
              className="cursor-pointer rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-[1.6cqw] py-[0.7cqw] text-[1.8cqw] font-black text-white hover:from-sky-400 hover:to-indigo-500 active:scale-95 shadow-md transition"
              title="Abrir Aula INAP con simulacros oficiales, plazos y BOE"
            >
              🏫 Aula INAP & Mini-Juegos
            </button>
          )}

          <button
            type="button"
            onClick={onToggleFree}
            className={`cursor-pointer rounded-lg px-[1.6cqw] py-[0.7cqw] text-[1.8cqw] font-bold transition ${
              freePlay ? "bg-emerald-500 text-slate-950" : "bg-white/15 text-white hover:bg-white/25"
            }`}
            title="Permite jugar cualquier fase sin completar las anteriores"
          >
            {freePlay ? "Modo libre ✓" : "Modo guiado"}
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={musicMuted ? "Activar música" : "Silenciar música"}
            className="cursor-pointer rounded-lg bg-white/15 px-[1.4cqw] py-[0.7cqw] text-[2cqw] hover:bg-white/25"
            title="Activar/Silenciar música"
          >
            {musicMuted ? "🎵❌" : "🎵"}
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? "Activar sonido" : "Silenciar todo"}
            className="cursor-pointer rounded-lg bg-white/15 px-[1.4cqw] py-[0.7cqw] text-[2cqw] hover:bg-white/25"
            title="Silenciar sonido general"
          >
            {muted ? "🔇" : "🔊"}
          </button>

          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="cursor-pointer rounded-lg bg-white/15 px-[1.4cqw] py-[0.7cqw] text-[2cqw] hover:bg-white/25"
              title="Pantalla completa"
            >
              ⛶
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 snap-x gap-[1.6cqw] overflow-x-auto overflow-y-hidden p-[1.6cqw]">
        {worlds.map((world) => {
          const theme = THEMES[world.theme] ?? THEMES.plaza;
          const worldDone = world.stages.every((s) => progress.completed.includes(s.key));
          return (
            <section
              key={world.number}
              className="flex w-[42cqw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/20 shadow-2xl backdrop-blur"
              style={{ background: `linear-gradient(180deg, ${theme.sky[0]}ee, ${theme.sky[1]}40 60%, #0b1020)` }}
            >
              <div className="flex items-center gap-[1.5cqw] bg-black/45 px-[2cqw] py-[1.2cqw]">
                {world.bossImage && (
                  <div className="relative h-[6cqw] w-[6cqw] shrink-0 overflow-hidden rounded-full border-2 border-amber-300/80 shadow-md">
                    <Image
                      src={world.bossImage}
                      alt={world.title}
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[1.6cqw] font-bold uppercase tracking-wider text-amber-200">
                    {world.number === 0 ? "Mundo 0 · Tutorial" : world.number === 7 ? "Mundo Final" : `Bloque ${world.number}`}
                    {worldDone ? " · ✔ Superado" : ""}
                  </p>
                  <h2 className="text-[2.4cqw] font-black leading-tight truncate">{world.title}</h2>
                  <p className="text-[1.6cqw] text-slate-200 truncate">{world.subtitle}</p>
                </div>
              </div>

              <ol className="flex min-h-0 flex-1 flex-col gap-[1cqw] overflow-y-auto p-[1.4cqw]">
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
                        className={`flex w-full cursor-pointer items-center gap-[1.4cqw] rounded-lg border px-[1.5cqw] py-[1cqw] text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          stage.kind === "boss" || stage.kind === "exam"
                            ? "border-red-400/70 bg-red-950/70 hover:bg-red-900/80 shadow-md"
                            : finished
                              ? "border-emerald-400/70 bg-emerald-950/60 hover:bg-emerald-900/70 shadow-md"
                              : "border-white/20 bg-black/50 hover:bg-black/70"
                        }`}
                      >
                        <span className="grid h-[4.4cqw] w-[4.4cqw] shrink-0 place-items-center rounded-md bg-white/10 text-[2.2cqw]">
                          {unlocked ? icon : "🔒"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[1.8cqw] font-bold text-amber-200">{stage.subtitle}</span>
                          <span className="block truncate text-[2cqw] font-semibold">{stage.title}</span>
                          <span className="block text-[1.6cqw] text-slate-300 truncate">
                            {stage.kind === "topic" && score ? `Prueba: ${score.score}/${score.total} aciertos` : ""}
                            {stage.kind === "topic" && topic?.needsReview ? " · ⚠ revisar (reforma BOE)" : ""}
                            {stage.kind === "tutorial" ? "Aprende a moverte y responder preguntas" : ""}
                            {stage.kind === "boss" ? "Combate contra el jefe del bloque" : ""}
                            {stage.kind === "exam" ? "Simulacro oficial de oposición completa" : ""}
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

