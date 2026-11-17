"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { audio } from "@/game/audio";
import { GameEngine, VIEW_H, VIEW_W, type InputState, type Overlay, type Snapshot } from "@/game/engine";
import { buildStages, makeEngineConfig } from "@/game/stages";
import { THEMES, TITLE_MUSIC } from "@/game/themes";
import type { ExitResult, GameData, Progress, Stage } from "@/game/types";
import TitleScreen from "./TitleScreen";
import WorldMap from "./WorldMap";

type Screen = "title" | "map" | "play";

const PLAYER_KEY = "oposikid-player-id";
const FREE_KEY = "oposikid-free-play";

const KEY_MAP: Record<string, keyof InputState> = {
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
  ArrowUp: "jump",
  w: "jump",
  W: "jump",
  " ": "jump",
  z: "jump",
  Z: "jump",
  x: "punch",
  X: "punch",
  k: "punch",
  K: "punch",
  Control: "punch",
  e: "interact",
  E: "interact",
  Enter: "interact",
};

const FRAME_STYLE: CSSProperties = {
  width: "min(100vw, calc(100dvh * 16 / 9))",
  aspectRatio: "16 / 9",
};

function newPlayerId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function unlockAudioAndScreen(): void {
  audio.unlock();
  try {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch && !document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.().catch(() => {});
    }
    const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    void orientation?.lock?.("landscape")?.catch(() => {});
  } catch {
    /* algunos navegadores no lo permiten */
  }
}

export default function Game({ data }: { data: GameData }) {
  const stages = useMemo(() => buildStages(data), [data]);
  const [screen, setScreen] = useState<Screen>("title");
  const [playerId, setPlayerId] = useState("");
  const [progress, setProgress] = useState<Progress>({ completed: [], testScores: {} });
  const [freePlay, setFreePlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [touch, setTouch] = useState(false);
  const [stage, setStage] = useState<Stage | null>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const screenRef = useRef<Screen>("title");
  const snapRef = useRef<Snapshot | null>(null);
  const stageRef = useRef<Stage | null>(null);
  const playerIdRef = useRef("");
  const handlersRef = useRef<{ advance: () => void; backToMap: () => void }>({ advance: () => {}, backToMap: () => {} });

  // Inicialización: identificador de jugador, preferencias y progreso guardado en PostgreSQL.
  useEffect(() => {
    let id = "";
    try {
      id = window.localStorage.getItem(PLAYER_KEY) ?? "";
      if (!id) {
        id = newPlayerId();
        window.localStorage.setItem(PLAYER_KEY, id);
      }
      setFreePlay(window.localStorage.getItem(FREE_KEY) === "1");
    } catch {
      id = newPlayerId();
    }
    playerIdRef.current = id;
    setPlayerId(id);
    setMuted(audio.isMuted());
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    fetch(`/api/progress?playerId=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((p: Progress) => setProgress({ completed: p.completed ?? [], testScores: p.testScores ?? {} }))
      .catch(() => {});
  }, []);

  // Teclado (escritorio): flechas/WASD para moverse, espacio/↑ saltar, X/K golpear, E/Enter hablar.
  useEffect(() => {
    const down = (ev: KeyboardEvent) => {
      if (screenRef.current !== "play") return;
      const eng = engineRef.current;
      if (!eng) return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(ev.key)) ev.preventDefault();
      const ov = snapRef.current?.overlay ?? null;
      if (ov) {
        if (ov.kind === "quiz" && !ov.answered && /^[1-4]$/.test(ev.key)) {
          eng.answer(Number(ev.key) - 1);
        } else if ((ev.key === "Enter" || ev.key === " ") && !ev.repeat) {
          handlersRef.current.advance();
        } else if (ev.key === "Escape") {
          handlersRef.current.backToMap();
        }
        return;
      }
      if (ev.key === "Escape") {
        handlersRef.current.backToMap();
        return;
      }
      const k = KEY_MAP[ev.key];
      if (k) eng.input[k] = true;
    };
    const up = (ev: KeyboardEvent) => {
      const eng = engineRef.current;
      const k = KEY_MAP[ev.key];
      if (eng && k) eng.input[k] = false;
    };
    const blur = () => {
      const eng = engineRef.current;
      if (!eng) return;
      eng.input = { left: false, right: false, jump: false, punch: false, interact: false };
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  // Motor: se crea al entrar en una fase y se destruye al salir.
  useEffect(() => {
    if (screen !== "play" || !stage || !canvasRef.current) return;
    const eng = new GameEngine(canvasRef.current, makeEngineConfig(stage, data), (s) => {
      snapRef.current = s;
      setSnap(s);
    });
    engineRef.current = eng;
    eng.start();
    return () => {
      eng.destroy();
      if (engineRef.current === eng) engineRef.current = null;
    };
  }, [screen, stage, data]);

  const setScreenBoth = (next: Screen) => {
    screenRef.current = next;
    setScreen(next);
  };

  const completeStage = (key: string, score?: number, total?: number) => {
    setProgress((prev) => ({
      completed: prev.completed.includes(key) ? prev.completed : [...prev.completed, key],
      testScores:
        score !== undefined && total !== undefined ? { ...prev.testScores, [key]: { score, total } } : prev.testScores,
    }));
    const pid = playerIdRef.current;
    if (!pid) return;
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: pid, stageKey: key, score, total }),
    }).catch(() => {});
  };

  const goMap = () => {
    engineRef.current?.destroy();
    engineRef.current = null;
    snapRef.current = null;
    setSnap(null);
    setStage(null);
    setScreenBoth("map");
    audio.playMusic("plaza:map", THEMES.plaza.music);
  };

  const finish = (result: ExitResult) => {
    const st = stageRef.current;
    if (st && result.completed) completeStage(st.key, result.score, result.total);
    stageRef.current = null;
    goMap();
  };

  const startStage = (s: Stage) => {
    unlockAudioAndScreen();
    stageRef.current = s;
    snapRef.current = null;
    setSnap(null);
    setStage(s);
    setScreenBoth("play");
  };

  const advance = () => {
    const eng = engineRef.current;
    const ov: Overlay | null = snapRef.current?.overlay ?? null;
    if (!eng || !ov) return;
    switch (ov.kind) {
      case "dialogue":
        eng.nextLine();
        break;
      case "quiz":
        if (ov.answered) eng.continueQuiz();
        break;
      case "testResult":
        if (ov.passed) finish({ completed: true, score: ov.score, total: ov.total });
        break;
      case "end":
        if (ov.win) finish({ completed: true });
        else eng.restart();
        break;
    }
  };

  handlersRef.current = { advance, backToMap: () => finish({ completed: false }) };

  const resetProgress = async () => {
    if (!window.confirm("¿Reiniciar todo el progreso del temario?")) return;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: playerIdRef.current, action: "reset" }),
    }).catch(() => {});
    setProgress({ completed: [], testScores: {} });
  };

  const toggleMute = () => setMuted(audio.setMuted(!audio.isMuted()));

  const toggleFree = () => {
    const next = !freePlay;
    setFreePlay(next);
    try {
      window.localStorage.setItem(FREE_KEY, next ? "1" : "0");
    } catch {
      /* sin almacenamiento */
    }
  };

  const setKey = (k: keyof InputState, v: boolean) => {
    if (engineRef.current) engineRef.current.input[k] = v;
  };

  const touchButton = (k: keyof InputState) => ({
    onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setKey(k, true);
    },
    onPointerUp: () => setKey(k, false),
    onPointerLeave: () => setKey(k, false),
    onPointerCancel: () => setKey(k, false),
    onContextMenu: (e: ReactMouseEvent) => e.preventDefault(),
  });

  const playing = screen === "play";

  return (
    <div className="game-root fixed inset-0 grid place-items-center overflow-hidden bg-black select-none">
      <div className="game-frame relative overflow-hidden bg-black [container-type:inline-size]" style={FRAME_STYLE}>
        {screen === "title" && (
          <TitleScreen
            muted={muted}
            hasProgress={progress.completed.length > 0}
            onPlay={() => {
              audio.unlock();
              audio.playMusic("title", TITLE_MUSIC);
              goMap();
            }}
            onToggleMute={toggleMute}
            onReset={resetProgress}
          />
        )}

        {screen === "map" && (
          <WorldMap
            data={data}
            stages={stages}
            progress={progress}
            freePlay={freePlay}
            muted={muted}
            onPlay={startStage}
            onBack={() => {
              audio.playMusic("title", TITLE_MUSIC);
              setScreenBoth("title");
            }}
            onToggleFree={toggleFree}
            onToggleMute={toggleMute}
          />
        )}

        {playing && stage && (
          <>
            <canvas
              ref={canvasRef}
              width={VIEW_W}
              height={VIEW_H}
              className="absolute inset-0 h-full w-full [image-rendering:pixelated]"
            />

            {/* HUD */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-[1.5cqw] p-[1.2cqw]">
              <div className="rounded-md bg-black/55 px-[1.6cqw] py-[0.8cqw] text-white">
                <p className="text-[1.8cqw] font-bold uppercase tracking-wider text-amber-300">{snap?.subtitle ?? stage.subtitle}</p>
                <p className="text-[2.3cqw] font-bold leading-tight">{snap?.title ?? stage.title}</p>
              </div>
              {snap && snap.bossMax > 0 && (
                <div className="rounded-md bg-black/55 px-[1.6cqw] py-[0.8cqw] text-white">
                  <p className="text-[1.8cqw] font-bold text-red-300">{snap.bossName}</p>
                  <div className="mt-[0.4cqw] flex gap-[0.5cqw]">
                    {Array.from({ length: snap.bossMax }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-[1.6cqw] w-[3cqw] rounded-sm ${i < snap.bossHp ? "bg-red-500" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="pointer-events-auto flex items-center gap-[1.2cqw] rounded-md bg-black/55 px-[1.6cqw] py-[0.8cqw] text-[2.2cqw] font-bold text-white">
                <span className="text-red-400">❤ {snap?.lives ?? 3}</span>
                <span className="text-yellow-300">💶 {snap?.coins ?? 0}</span>
                <span className="text-sky-200">★ {snap?.score ?? 0}</span>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  className="cursor-pointer rounded bg-white/15 px-[1cqw] hover:bg-white/30"
                >
                  {muted ? "🔇" : "🔊"}
                </button>
                <button
                  type="button"
                  onClick={() => finish({ completed: false })}
                  className="cursor-pointer rounded bg-white/15 px-[1.2cqw] py-[0.3cqw] text-[1.9cqw] hover:bg-white/30"
                >
                  Mapa
                </button>
              </div>
            </div>

            {/* Controles táctiles */}
            {touch && !snap?.overlay && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[1.5cqw]">
                <div className="flex gap-[1.5cqw]">
                  <button type="button" {...touchButton("left")} className="touch-none h-[13cqw] w-[13cqw] rounded-full bg-white/25 text-[4cqw] font-bold text-white active:bg-white/50">◀</button>
                  <button type="button" {...touchButton("right")} className="touch-none h-[13cqw] w-[13cqw] rounded-full bg-white/25 text-[4cqw] font-bold text-white active:bg-white/50">▶</button>
                </div>
                <div className="flex items-end gap-[1.5cqw]">
                  <button type="button" {...touchButton("interact")} className="touch-none h-[9cqw] w-[9cqw] rounded-full bg-sky-400/50 text-[2cqw] font-bold text-white active:bg-sky-300/70">HABLAR</button>
                  <button type="button" {...touchButton("punch")} className="touch-none h-[9cqw] w-[9cqw] rounded-full bg-orange-400/50 text-[2cqw] font-bold text-white active:bg-orange-300/70">PUÑO</button>
                  <button type="button" {...touchButton("jump")} className="touch-none h-[13cqw] w-[13cqw] rounded-full bg-emerald-400/60 text-[2.4cqw] font-black text-white active:bg-emerald-300/80">SALTAR</button>
                </div>
              </div>
            )}

            {snap?.overlay && (
              <OverlayView
                overlay={snap.overlay}
                onNext={() => engineRef.current?.nextLine()}
                onAnswer={(i) => engineRef.current?.answer(i)}
                onContinue={advance}
                onRetryTest={() => engineRef.current?.retryTest()}
                onRestart={() => engineRef.current?.restart()}
                onExit={(r) => finish(r)}
              />
            )}
          </>
        )}
      </div>

      <div className="rotate-hint fixed inset-0 flex-col items-center justify-center gap-4 bg-slate-950 p-8 text-center text-white">
        <div className="text-6xl">📱⟳</div>
        <p className="text-xl font-bold">Gira el móvil en horizontal</p>
        <p className="text-sm text-slate-300">El juego se ve completo en apaisado.</p>
      </div>
    </div>
  );
}

interface OverlayProps {
  overlay: Overlay;
  onNext: () => void;
  onAnswer: (i: number) => void;
  onContinue: () => void;
  onRetryTest: () => void;
  onRestart: () => void;
  onExit: (r: ExitResult) => void;
}

function OverlayView({ overlay, onNext, onAnswer, onContinue, onRetryTest, onRestart, onExit }: OverlayProps) {
  if (overlay.kind === "dialogue") {
    const line = overlay.lines[overlay.index] ?? "";
    const last = overlay.index + 1 >= overlay.lines.length;
    return (
      <div className="absolute inset-x-[2cqw] bottom-[2cqw] rounded-xl border-[0.3cqw] border-white/80 bg-slate-950/95 p-[2.2cqw] text-white shadow-2xl">
        <div className="flex items-center gap-[2cqw]">
          <div
            className="grid h-[8cqw] w-[8cqw] shrink-0 place-items-center rounded-lg border-2 border-white/60 text-[3.4cqw] font-black"
            style={{ background: overlay.color }}
          >
            {overlay.speaker.charAt(0)}
          </div>
          <div>
            <p className="text-[2.6cqw] font-black text-amber-300">{overlay.speaker}</p>
            <p className="text-[1.9cqw] text-slate-300">{overlay.role}</p>
          </div>
        </div>
        <p className="mt-[1.4cqw] min-h-[7cqw] text-[2.5cqw] leading-snug">{line}</p>
        <div className="mt-[1cqw] flex items-center justify-between">
          <span className="text-[1.8cqw] text-slate-400">
            {overlay.index + 1}/{overlay.lines.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-amber-300"
          >
            {last ? "Entendido ✔" : "Siguiente ▶"}
          </button>
        </div>
      </div>
    );
  }

  if (overlay.kind === "quiz") {
    const answered = overlay.answered;
    const q = overlay.q;
    const isBoss = overlay.mode === "boss";
    const isTest = overlay.mode === "test";
    return (
      <div className="absolute inset-0 grid place-items-center bg-black/75 p-[2cqw]">
        <div className="max-h-full w-[92cqw] overflow-y-auto rounded-xl border-[0.3cqw] border-amber-300/80 bg-slate-950 p-[2.4cqw] text-white shadow-2xl">
          <div className="flex items-center justify-between gap-[2cqw]">
            <p className={`text-[2.2cqw] font-black uppercase tracking-wide ${isBoss ? "text-red-400" : isTest ? "text-sky-300" : "text-amber-300"}`}>
              {isBoss ? `👹 ${overlay.title}` : isTest ? `📝 ${overlay.title}` : "❓ Bloque de pregunta"}
            </p>
            <p className="text-[2cqw] font-bold text-slate-300">
              {isBoss ? `Golpe ${overlay.step}/${overlay.total}` : `${overlay.step}/${overlay.total}`}
            </p>
          </div>
          <p className="mt-[1.6cqw] text-[2.6cqw] font-semibold leading-snug">{q.prompt}</p>
          <div className="mt-[1.6cqw] grid grid-cols-1 gap-[1cqw] md:grid-cols-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answer;
              const isChosen = answered?.chosen === i;
              let style = "border-white/25 bg-white/5 hover:bg-white/15";
              if (answered) {
                if (isCorrect) style = "border-emerald-400 bg-emerald-600/40";
                else if (isChosen) style = "border-red-400 bg-red-600/40";
                else style = "border-white/10 bg-white/5 opacity-60";
              }
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!answered}
                  onClick={() => onAnswer(i)}
                  className={`flex cursor-pointer items-start gap-[1.2cqw] rounded-lg border px-[1.6cqw] py-[1.2cqw] text-left text-[2.2cqw] disabled:cursor-default ${style}`}
                >
                  <span className="font-black text-amber-300">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="mt-[1.6cqw] rounded-lg bg-black/50 p-[1.6cqw]">
              <p className={`text-[2.4cqw] font-black ${answered.ok ? "text-emerald-300" : "text-red-300"}`}>
                {answered.ok ? "¡Correcto!" : "Incorrecto"}
              </p>
              <p className="mt-[0.6cqw] text-[2cqw] leading-snug text-slate-100">{q.explanation}</p>
              {q.reference && <p className="mt-[0.6cqw] text-[1.8cqw] text-amber-200">📜 {q.reference}</p>}
              <div className="mt-[1.4cqw] flex justify-end">
                <button
                  type="button"
                  onClick={onContinue}
                  className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-amber-300"
                >
                  Continuar ▶
                </button>
              </div>
            </div>
          )}
          {!answered && (
            <p className="mt-[1.2cqw] text-[1.7cqw] text-slate-400">Pulsa 1-4 en el teclado o toca una opción.</p>
          )}
        </div>
      </div>
    );
  }

  if (overlay.kind === "testResult") {
    return (
      <div className="absolute inset-0 grid place-items-center bg-black/80 p-[2cqw]">
        <div className="w-[70cqw] rounded-xl border-[0.3cqw] border-white/70 bg-slate-950 p-[3cqw] text-center text-white shadow-2xl">
          <p className="text-[4cqw]">{overlay.passed ? "🏆" : "📚"}</p>
          <p className={`mt-[1cqw] text-[3cqw] font-black ${overlay.passed ? "text-emerald-300" : "text-red-300"}`}>
            {overlay.passed ? "¡Prueba superada!" : "Prueba no superada"}
          </p>
          <p className="mt-[1cqw] text-[2.4cqw]">
            Aciertos: <span className="font-black text-amber-300">{overlay.score}/{overlay.total}</span> · Necesitas {overlay.min}
          </p>
          <div className="mt-[2.4cqw] flex flex-wrap justify-center gap-[1.5cqw]">
            {overlay.passed ? (
              <button
                type="button"
                onClick={() => onExit({ completed: true, score: overlay.score, total: overlay.total })}
                className="cursor-pointer rounded-md bg-emerald-400 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-emerald-300"
              >
                Volver al mapa ✔
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onRetryTest}
                  className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-amber-300"
                >
                  Repetir prueba
                </button>
                <button
                  type="button"
                  onClick={() => onExit({ completed: false })}
                  className="cursor-pointer rounded-md bg-white/15 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-bold hover:bg-white/25"
                >
                  Mapa
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // end
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/80 p-[2cqw]">
      <div className="w-[70cqw] rounded-xl border-[0.3cqw] border-white/70 bg-slate-950 p-[3cqw] text-center text-white shadow-2xl">
        <p className="text-[4cqw]">{overlay.win ? "🎉" : "💀"}</p>
        <p className={`mt-[1cqw] text-[3cqw] font-black ${overlay.win ? "text-emerald-300" : "text-red-300"}`}>{overlay.title}</p>
        <p className="mt-[1cqw] text-[2.2cqw] leading-snug text-slate-200">{overlay.text}</p>
        <div className="mt-[2.4cqw] flex flex-wrap justify-center gap-[1.5cqw]">
          {overlay.win ? (
            <button
              type="button"
              onClick={() => onExit({ completed: true })}
              className="cursor-pointer rounded-md bg-emerald-400 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-emerald-300"
            >
              Volver al mapa ✔
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onRestart}
                className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-black text-slate-950 hover:bg-amber-300"
              >
                Reintentar
              </button>
              <button
                type="button"
                onClick={() => onExit({ completed: false })}
                className="cursor-pointer rounded-md bg-white/15 px-[2.5cqw] py-[1.2cqw] text-[2.2cqw] font-bold hover:bg-white/25"
              >
                Mapa
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
