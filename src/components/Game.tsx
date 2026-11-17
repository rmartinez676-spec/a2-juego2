"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { audio } from "@/game/audio";
import { GameEngine, VIEW_H, VIEW_W, CANVAS_W, CANVAS_H, type Difficulty, type InputState, type Overlay, type Snapshot } from "@/game/engine";
import { buildStages, makeEngineConfig } from "@/game/stages";
import { THEMES, TITLE_MUSIC } from "@/game/themes";
import type { ExitResult, GameData, Progress, Stage } from "@/game/types";
import TitleScreen from "./TitleScreen";
import WorldMap from "./WorldMap";
import StudyHubModal from "./StudyHubModal";

type Screen = "title" | "map" | "play";

const PLAYER_KEY = "oposikid-player-id";
const FREE_KEY = "oposikid-free-play";
const DIFFICULTY_KEY = "oposikid-difficulty";

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
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [muted, setMuted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [touch, setTouch] = useState(false);
  const [touchKeysVisible, setTouchKeysVisible] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [fingerMarker, setFingerMarker] = useState<{ x: number; y: number; active: boolean; dir: -1 | 0 | 1 }>({
    x: 0,
    y: 0,
    active: false,
    dir: 0,
  });
  const [stage, setStage] = useState<Stage | null>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({ width: 960, height: 540 });
  const [studyHubOpen, setStudyHubOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const screenRef = useRef<Screen>("title");
  const snapRef = useRef<Snapshot | null>(null);
  const stageRef = useRef<Stage | null>(null);
  const playerIdRef = useRef("");
  const handlersRef = useRef<{ advance: () => void; backToMap: () => void }>({ advance: () => {}, backToMap: () => {} });
  const touchSteerRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startY: number;
    startTime: number;
  }>({ active: false, pointerId: -1, startX: 0, startY: 0, startTime: 0 });

  // Ajuste reactivo al tamaño de pantalla: soporta tanto apaisado (horizontal) como vertical (portrait)
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portrait = vh > vw;
      setIsPortrait(portrait);

      if (portrait) {
        // En vertical (móvil/tablet): ancho completo y altura acorde a proporción 16:9
        const w = vw;
        const h = Math.floor(w / (16 / 9));
        setViewportSize({ width: w, height: h });
      } else {
        // En horizontal (apaisado): contener en 16:9 sin desbordar la pantalla
        const targetRatio = 16 / 9;
        let w = vw;
        let h = w / targetRatio;
        if (h > vh) {
          h = vh;
          w = h * targetRatio;
        }
        setViewportSize({ width: Math.floor(w), height: Math.floor(h) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
    };
  }, []);

  // Inicialización: identificador de jugador, preferencias y progreso guardado en DB / memoria
  useEffect(() => {
    let id = "";
    try {
      id = window.localStorage.getItem(PLAYER_KEY) ?? "";
      if (!id) {
        id = newPlayerId();
        window.localStorage.setItem(PLAYER_KEY, id);
      }
      setFreePlay(window.localStorage.getItem(FREE_KEY) === "1");
      const savedDiff = window.localStorage.getItem(DIFFICULTY_KEY) as Difficulty;
      if (savedDiff === "easy" || savedDiff === "normal" || savedDiff === "hard") {
        setDifficulty(savedDiff);
      }
      const savedKeys = window.localStorage.getItem("a2_touch_keys");
      if (savedKeys !== null) {
        setTouchKeysVisible(savedKeys === "1");
      }
    } catch {
      id = newPlayerId();
    }
    playerIdRef.current = id;
    setPlayerId(id);
    setMuted(audio.isMuted());
    setMusicMuted(audio.isMusicMuted());
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

  // Motor: se crea al entrar en una fase y se destruye al salir, con la dificultad seleccionada
  useEffect(() => {
    if (screen !== "play" || !stage || !canvasRef.current) return;
    const eng = new GameEngine(canvasRef.current, makeEngineConfig(stage, data, difficulty), (s) => {
      snapRef.current = s;
      setSnap(s);
    });
    engineRef.current = eng;
    eng.start();
    return () => {
      eng.destroy();
      if (engineRef.current === eng) engineRef.current = null;
    };
  }, [screen, stage, data, difficulty]);

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

  const toggleMute = () => {
    const next = !audio.isMuted();
    audio.setMuted(next);
    setMuted(next);
  };

  const toggleMusic = () => {
    const next = !audio.isMusicMuted();
    audio.setMusicMuted(next);
    setMusicMuted(next);
  };

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    try {
      window.localStorage.setItem(DIFFICULTY_KEY, d);
    } catch {
      /* sin almacenamiento */
    }
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const toggleFree = () => {
    const next = !freePlay;
    setFreePlay(next);
    try {
      window.localStorage.setItem(FREE_KEY, next ? "1" : "0");
    } catch {
      /* sin almacenamiento */
    }
  };

  const toggleTouchKeys = () => {
    setTouchKeysVisible((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem("a2_touch_keys", next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  const updateFingerSteer = (clientX: number, clientY: number) => {
    const eng = engineRef.current;
    const canvas = canvasRef.current;
    if (!eng || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    const canvasX = (relX / rect.width) * CANVAS_W;
    const canvasY = (relY / rect.height) * CANVAS_H;

    const luciaX = snapRef.current?.playerScreenX ?? CANVAS_W / 2;
    const luciaY = snapRef.current?.playerScreenY ?? CANVAS_H / 2;

    const diffX = canvasX - luciaX;
    const diffY = canvasY - luciaY;

    let dir: -1 | 0 | 1 = 0;
    if (diffX > 22) {
      eng.input.right = true;
      eng.input.left = false;
      dir = 1;
    } else if (diffX < -22) {
      eng.input.left = true;
      eng.input.right = false;
      dir = -1;
    } else {
      eng.input.left = false;
      eng.input.right = false;
      dir = 0;
    }

    if (diffY < -32 || (touchSteerRef.current.startY - clientY) > 28) {
      eng.input.jump = true;
    } else {
      eng.input.jump = false;
    }

    setFingerMarker({ x: relX, y: relY, active: true, dir });
  };

  const handlePointerDownGame = (e: ReactPointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".no-finger-steer") || snapRef.current?.overlay) return;

    const eng = engineRef.current;
    if (!eng || !canvasRef.current) return;

    touchSteerRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
    };

    updateFingerSteer(e.clientX, e.clientY);
  };

  const handlePointerMoveGame = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!touchSteerRef.current.active || e.pointerId !== touchSteerRef.current.pointerId) return;
    updateFingerSteer(e.clientX, e.clientY);
  };

  const handlePointerUpGame = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!touchSteerRef.current.active || e.pointerId !== touchSteerRef.current.pointerId) return;

    const eng = engineRef.current;
    const duration = Date.now() - touchSteerRef.current.startTime;
    const dist = Math.hypot(e.clientX - touchSteerRef.current.startX, e.clientY - touchSteerRef.current.startY);

    if (duration < 280 && dist < 25 && eng) {
      eng.input.punch = true;
      eng.input.interact = true;
      setTimeout(() => {
        if (engineRef.current) {
          engineRef.current.input.punch = false;
          engineRef.current.input.interact = false;
        }
      }, 180);
    }

    touchSteerRef.current.active = false;
    setFingerMarker((prev) => ({ ...prev, active: false }));

    if (eng) {
      eng.input.left = false;
      eng.input.right = false;
      eng.input.jump = false;
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
      <div
        className="game-frame relative overflow-hidden bg-black shadow-2xl [container-type:inline-size]"
        style={{
          width: isPortrait && screen !== "play" ? "100vw" : `${viewportSize.width}px`,
          height: isPortrait && screen !== "play" ? "100vh" : isPortrait ? "100vh" : `${viewportSize.height}px`,
          maxWidth: "100vw",
          maxHeight: "100vh",
          aspectRatio: isPortrait ? "auto" : "16 / 9",
        }}
      >
        {screen === "title" && (
          <TitleScreen
            muted={muted}
            musicMuted={musicMuted}
            difficulty={difficulty}
            hasProgress={progress.completed.length > 0}
            onPlay={() => {
              audio.unlock();
              audio.playMusic("title", TITLE_MUSIC);
              goMap();
            }}
            onOpenStudyHub={() => setStudyHubOpen(true)}
            onToggleMute={toggleMute}
            onToggleMusic={toggleMusic}
            onSelectDifficulty={handleDifficultyChange}
            onReset={resetProgress}
            onToggleFullscreen={toggleFullscreen}
          />
        )}

        {screen === "map" && (
          <WorldMap
            data={data}
            stages={stages}
            progress={progress}
            freePlay={freePlay}
            muted={muted}
            musicMuted={musicMuted}
            difficulty={difficulty}
            onPlay={startStage}
            onOpenStudyHub={() => setStudyHubOpen(true)}
            onBack={() => {
              audio.playMusic("title", TITLE_MUSIC);
              setScreenBoth("title");
            }}
            onToggleFree={toggleFree}
            onToggleMute={toggleMute}
            onToggleMusic={toggleMusic}
            onSelectDifficulty={handleDifficultyChange}
            onToggleFullscreen={toggleFullscreen}
          />
        )}

        {playing && stage && (
          <div
            className="relative h-full w-full overflow-hidden flex flex-col justify-center items-center touch-none select-none"
            onPointerDown={handlePointerDownGame}
            onPointerMove={handlePointerMoveGame}
            onPointerUp={handlePointerUpGame}
            onPointerCancel={handlePointerUpGame}
          >
            {/* Contenedor del Canvas con aspect-ratio 16/9 adaptativo */}
            <div className="relative w-full aspect-[16/9] max-h-full overflow-hidden shadow-2xl flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Marcador visual al seguir con el dedo */}
              {fingerMarker.active && (
                <div
                  className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ left: `${fingerMarker.x}px`, top: `${fingerMarker.y}px` }}
                >
                  <div className="h-14 w-14 rounded-full border-2 border-amber-300/80 bg-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-ping" />
                  <div className="absolute h-9 w-9 rounded-full border-2 border-amber-200 bg-amber-500/50 shadow-md flex items-center justify-center text-xs font-black text-white">
                    {fingerMarker.dir > 0 ? "▶" : fingerMarker.dir < 0 ? "◀" : "👆"}
                  </div>
                </div>
              )}
            </div>

            {/* HUD */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-[1.5cqw] p-[1.2cqw]">
              <div className="rounded-md bg-black/60 backdrop-blur-sm px-[1.6cqw] py-[0.8cqw] text-white">
                <p className="text-xs sm:text-[1.8cqw] font-bold uppercase tracking-wider text-amber-300">
                  {snap?.subtitle ?? stage.subtitle}
                </p>
                <p className="text-sm sm:text-[2.3cqw] font-black leading-tight">{snap?.title ?? stage.title}</p>
              </div>
              {snap && snap.bossMax > 0 && (
                <div className="rounded-md bg-black/60 backdrop-blur-sm px-[1.6cqw] py-[0.8cqw] text-white">
                  <p className="text-xs sm:text-[1.8cqw] font-black text-red-300">{snap.bossName}</p>
                  <div className="mt-[0.4cqw] flex gap-[0.5cqw]">
                    {Array.from({ length: snap.bossMax }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-[1.6cqw] w-[3cqw] rounded-sm transition-all duration-300 ${
                          i < snap.bossHp ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="pointer-events-auto flex items-center gap-[0.8cqw] rounded-md bg-black/60 backdrop-blur-sm px-[1.2cqw] py-[0.6cqw] text-xs sm:text-[1.8cqw] font-bold text-white">
                <span className="text-red-400">❤ {snap?.lives ?? 3}</span>
                <span className="text-yellow-300">💶 {snap?.coins ?? 0}</span>
                <span className="text-sky-200">★ {snap?.score ?? 0}</span>
                <button
                  type="button"
                  onClick={toggleTouchKeys}
                  className={`cursor-pointer rounded px-[1cqw] py-[0.3cqw] text-xs sm:text-[1.6cqw] font-bold transition shadow-sm ${
                    touchKeysVisible
                      ? "bg-amber-500/35 text-amber-200 border border-amber-400/40"
                      : "bg-white/15 text-slate-300"
                  }`}
                  title="Alternar botones en pantalla (puedes jugar con botones o seguir con el dedo)"
                >
                  {touchKeysVisible ? "🎮 Teclas: ON" : "👆 Dedo (sin teclas)"}
                </button>
                <span
                  className={`rounded px-[0.8cqw] py-[0.2cqw] text-[1.4cqw] font-black uppercase ${
                    difficulty === "easy"
                      ? "bg-emerald-500/30 text-emerald-300"
                      : difficulty === "hard"
                      ? "bg-red-500/30 text-red-300"
                      : "bg-amber-500/30 text-amber-300"
                  }`}
                >
                  {difficulty === "easy" ? "Fácil" : difficulty === "hard" ? "Tribunal" : "Normal"}
                </span>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activar efectos" : "Silenciar efectos"}
                  className="cursor-pointer rounded bg-white/15 px-[0.8cqw] py-[0.2cqw] hover:bg-white/30"
                  title="Efectos de sonido"
                >
                  {muted ? "🔇" : "🔊"}
                </button>
                <button
                  type="button"
                  onClick={toggleMusic}
                  aria-label={musicMuted ? "Activar música" : "Silenciar música"}
                  className="cursor-pointer rounded bg-white/15 px-[0.8cqw] py-[0.2cqw] hover:bg-white/30"
                  title="Música de fondo"
                >
                  {musicMuted ? "🎵❌" : "🎵"}
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Pantalla completa"
                  className="cursor-pointer rounded bg-white/15 px-[0.8cqw] py-[0.2cqw] hover:bg-white/30"
                  title="Pantalla completa"
                >
                  ⛶
                </button>
                <button
                  type="button"
                  onClick={() => setStudyHubOpen(true)}
                  className="cursor-pointer rounded bg-sky-500/30 px-[1cqw] py-[0.3cqw] text-xs sm:text-[1.8cqw] font-bold text-sky-200 hover:bg-sky-500/50"
                  title="Abrir Aula INAP"
                >
                  🏫 Aula
                </button>
                <button
                  type="button"
                  onClick={() => finish({ completed: false })}
                  className="cursor-pointer rounded bg-white/15 px-[1cqw] py-[0.3cqw] text-xs sm:text-[1.8cqw] hover:bg-white/30"
                >
                  Mapa
                </button>
              </div>
            </div>

            {/* Controles táctiles en pantalla (si están activados) */}
            {touchKeysVisible && touch && !snap?.overlay && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[1.5cqw] pointer-events-none z-20">
                <div className="flex gap-[1.5cqw] pointer-events-auto">
                  <button
                    type="button"
                    {...touchButton("left")}
                    className="touch-none h-14 w-14 sm:h-[13cqw] sm:w-[13cqw] rounded-full bg-white/25 text-2xl sm:text-[4cqw] font-bold text-white shadow-lg backdrop-blur-sm active:bg-white/50"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    {...touchButton("right")}
                    className="touch-none h-14 w-14 sm:h-[13cqw] sm:w-[13cqw] rounded-full bg-white/25 text-2xl sm:text-[4cqw] font-bold text-white shadow-lg backdrop-blur-sm active:bg-white/50"
                  >
                    ▶
                  </button>
                </div>
                <div className="flex items-end gap-[1.5cqw] pointer-events-auto">
                  <button
                    type="button"
                    {...touchButton("interact")}
                    className="touch-none h-10 w-10 sm:h-[9cqw] sm:w-[9cqw] rounded-full bg-sky-400/50 text-[11px] sm:text-[1.8cqw] font-bold text-white shadow-lg backdrop-blur-sm active:bg-sky-300/70"
                  >
                    HABLAR
                  </button>
                  <button
                    type="button"
                    {...touchButton("punch")}
                    className="touch-none h-10 w-10 sm:h-[9cqw] sm:w-[9cqw] rounded-full bg-orange-400/50 text-[11px] sm:text-[1.8cqw] font-bold text-white shadow-lg backdrop-blur-sm active:bg-orange-300/70"
                  >
                    PUÑO
                  </button>
                  <button
                    type="button"
                    {...touchButton("jump")}
                    className="touch-none h-14 w-14 sm:h-[13cqw] sm:w-[13cqw] rounded-full bg-emerald-400/60 text-base sm:text-[2.4cqw] font-black text-white shadow-lg backdrop-blur-sm active:bg-emerald-300/80"
                  >
                    SALTAR
                  </button>
                </div>
              </div>
            )}

            {/* Aviso breve de modo Dedo cuando las teclas están ocultas */}
            {!touchKeysVisible && touch && !snap?.overlay && (
              <div className="pointer-events-none absolute bottom-2 inset-x-0 flex justify-center z-20">
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-4 py-1 text-xs text-amber-200/90 shadow border border-amber-400/20">
                  👆 Modo Dedo: arrastra en pantalla para guiar a Lucía · toca arriba para saltar · toque rápido para golpear/hablar
                </span>
              </div>
            )}

            {snap?.overlay && (
              <OverlayView
                overlay={snap.overlay}
                difficulty={difficulty}
                onNext={() => engineRef.current?.nextLine()}
                onAnswer={(i) => engineRef.current?.answer(i)}
                onContinue={advance}
                onRetryTest={() => engineRef.current?.retryTest()}
                onRestart={() => engineRef.current?.restart()}
                onExit={(r) => finish(r)}
              />
            )}
          </div>
        )}

        {/* Modal de Estudio: Simulacro INAP, Duelo de Plazos y BOE */}
        <StudyHubModal
          data={data}
          isOpen={studyHubOpen}
          onClose={() => setStudyHubOpen(false)}
          onReward={() => {
            audio.sfx("coin");
          }}
        />
      </div>
    </div>
  );
}

const CHARACTER_PORTRAITS: Record<string, string> = {
  "don ramón": "/characters/don_ramon.jpg",
  ramón: "/characters/don_ramon.jpg",
  "conserje": "/characters/don_ramon.jpg",
  "señor quórum": "/characters/senor_quorum.jpg",
  quórum: "/characters/senor_quorum.jpg",
  quorum: "/characters/senor_quorum.jpg",
  "comisario de bruselas": "/characters/comisario_ue.jpg",
  comisario: "/characters/comisario_ue.jpg",
  bruselas: "/characters/comisario_ue.jpg",
  "jueza de alzada": "/characters/jueza_alzada.jpg",
  jueza: "/characters/jueza_alzada.jpg",
  alzada: "/characters/jueza_alzada.jpg",
  "gran interventor": "/characters/gran_interventor.jpg",
  interventor: "/characters/gran_interventor.jpg",
  "inspector tributario": "/characters/gran_interventor.jpg",
  "tribunal calificador supremo": "/characters/tribunal_calificador.jpg",
  "tribunal calificador": "/characters/tribunal_calificador.jpg",
  "presidenta del tribunal": "/characters/tribunal_calificador.jpg",
  "tribunal": "/characters/tribunal_calificador.jpg",
  lucía: "/player/avatar.png",
  opositora: "/player/avatar.png",
};

function getPortrait(name: string): string | null {
  const lower = name.toLowerCase().trim();
  for (const [key, path] of Object.entries(CHARACTER_PORTRAITS)) {
    if (lower.includes(key)) return path;
  }
  return null;
}

interface OverlayProps {
  overlay: Overlay;
  difficulty: Difficulty;
  onNext: () => void;
  onAnswer: (i: number) => void;
  onContinue: () => void;
  onRetryTest: () => void;
  onRestart: () => void;
  onExit: (r: ExitResult) => void;
}

function OverlayView({ overlay, difficulty, onNext, onAnswer, onContinue, onRetryTest, onRestart, onExit }: OverlayProps) {
  if (overlay.kind === "dialogue") {
    const line = overlay.lines[overlay.index] ?? "";
    const last = overlay.index + 1 >= overlay.lines.length;
    const portrait = getPortrait(overlay.speaker);

    return (
      <div className="absolute inset-x-[2cqw] bottom-[2cqw] rounded-xl border-[0.3cqw] border-white/80 bg-slate-950/95 p-[2.2cqw] text-white shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-[2cqw]">
          <div
            className="relative h-[9cqw] w-[9cqw] shrink-0 overflow-hidden rounded-xl border-2 border-white/70 shadow-lg"
            style={{ background: overlay.color }}
          >
            {portrait ? (
              <Image
                src={portrait}
                alt={overlay.speaker}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-[3.4cqw] font-black">
                {overlay.speaker.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="text-[2.6cqw] font-black text-amber-300">{overlay.speaker}</p>
            <p className="text-[1.8cqw] text-slate-300">{overlay.role}</p>
          </div>
        </div>
        <p className="mt-[1.4cqw] min-h-[6.5cqw] text-[2.4cqw] leading-snug">{line}</p>
        <div className="mt-[1cqw] flex items-center justify-between">
          <span className="text-[1.8cqw] text-slate-400">
            {overlay.index + 1}/{overlay.lines.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[0.8cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
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
    const bossPortrait = isBoss ? getPortrait(overlay.title) : null;

    return (
      <div className="absolute inset-0 grid place-items-center bg-black/80 p-[2cqw]">
        <div className="max-h-[90cqh] w-[92cqw] overflow-y-auto rounded-xl border-[0.3cqw] border-amber-300/80 bg-slate-950/95 p-[2.2cqw] text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-[2cqw]">
            <div className="flex items-center gap-[1.2cqw]">
              {bossPortrait && (
                <div className="relative h-[6cqw] w-[6cqw] overflow-hidden rounded-full border border-red-400">
                  <Image src={bossPortrait} alt={overlay.title} fill sizes="80px" className="object-cover" unoptimized />
                </div>
              )}
              <p
                className={`text-[2.2cqw] font-black uppercase tracking-wide ${
                  isBoss ? "text-red-400" : isTest ? "text-sky-300" : "text-amber-300"
                }`}
              >
                {isBoss ? `👹 ${overlay.title}` : isTest ? `📝 ${overlay.title}` : "❓ Bloque de pregunta"}
              </p>
            </div>
            <div className="flex items-center gap-[1cqw]">
              {difficulty === "hard" && (
                <span className="rounded bg-red-600/40 px-[0.8cqw] py-[0.2cqw] text-[1.5cqw] font-bold text-red-200">
                  -0.33 fallo
                </span>
              )}
              <p className="text-[2cqw] font-bold text-slate-300">
                {isBoss ? `Golpe ${overlay.step}/${overlay.total}` : `${overlay.step}/${overlay.total}`}
              </p>
            </div>
          </div>

          {/* Pista en modo fácil antes de responder */}
          {difficulty === "easy" && !answered && q.reference && (
            <div className="mt-[1cqw] rounded-md bg-amber-500/15 border border-amber-400/40 px-[1.4cqw] py-[0.6cqw] text-[1.7cqw] text-amber-200">
              💡 <span className="font-semibold">Pista de estudio:</span> Regulado en {q.reference}.
            </div>
          )}

          <p className="mt-[1.4cqw] text-[2.5cqw] font-semibold leading-snug">{q.prompt}</p>
          <div className="mt-[1.4cqw] grid grid-cols-1 gap-[1cqw] md:grid-cols-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answer;
              const isChosen = answered?.chosen === i;
              let style = "border-white/25 bg-white/5 hover:bg-white/15";
              if (answered) {
                if (isCorrect) style = "border-emerald-400 bg-emerald-600/40 shadow-[0_0_10px_rgba(52,211,153,0.5)]";
                else if (isChosen) style = "border-red-400 bg-red-600/40 shadow-[0_0_10px_rgba(248,113,113,0.5)]";
                else style = "border-white/10 bg-white/5 opacity-50";
              }
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!answered}
                  onClick={() => onAnswer(i)}
                  className={`flex cursor-pointer items-start gap-[1.2cqw] rounded-lg border px-[1.6cqw] py-[1cqw] text-left text-[2.1cqw] transition disabled:cursor-default ${style}`}
                >
                  <span className="font-black text-amber-300">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-[1.4cqw] rounded-lg bg-black/60 p-[1.4cqw] border border-white/10">
              <p className={`text-[2.3cqw] font-black ${answered.ok ? "text-emerald-300" : "text-red-300"}`}>
                {answered.ok ? "¡Correcto! 🎉" : "Incorrecto ❌"}
              </p>
              <p className="mt-[0.6cqw] text-[2cqw] leading-snug text-slate-100">{q.explanation}</p>
              {q.reference && <p className="mt-[0.6cqw] text-[1.8cqw] text-amber-200">📜 {q.reference}</p>}

              {/* Texto Literal de la Ley del BOE */}
              {q.legalText && (
                <div className="mt-[1cqw] rounded-md border-l-4 border-amber-400 bg-amber-950/40 p-[1.2cqw] text-amber-100">
                  <p className="text-[1.6cqw] font-bold uppercase tracking-wider text-amber-300">
                    ⚖️ {q.legalArticle ?? "Texto Literal de la Ley (BOE)"}
                  </p>
                  <blockquote className="mt-[0.4cqw] text-[1.8cqw] italic leading-relaxed text-slate-200">
                    {q.legalText}
                  </blockquote>
                </div>
              )}

              <div className="mt-[1.2cqw] flex justify-end">
                <button
                  type="button"
                  onClick={onContinue}
                  className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[0.8cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
                >
                  Continuar ▶
                </button>
              </div>
            </div>
          )}
          {!answered && (
            <p className="mt-[1.2cqw] text-[1.6cqw] text-slate-400">Pulsa 1-4 en el teclado o toca una opción para responder.</p>
          )}
        </div>
      </div>
    );
  }

  if (overlay.kind === "testResult") {
    return (
      <div className="absolute inset-0 grid place-items-center bg-black/80 p-[2cqw]">
        <div className="w-[72cqw] rounded-xl border-[0.3cqw] border-white/70 bg-slate-950/95 p-[2.5cqw] text-center text-white shadow-2xl backdrop-blur-md">
          <div className="relative mx-auto mb-[1cqw] h-[15cqw] w-[15cqw] overflow-hidden rounded-2xl border-2 border-white/50 shadow-lg">
            <Image
              src={overlay.passed ? "/player/cheer.png" : "/player/idle.png"}
              alt="Lucía"
              fill
              sizes="180px"
              className="object-contain"
              unoptimized
            />
          </div>
          <p className={`text-[3cqw] font-black ${overlay.passed ? "text-emerald-300" : "text-red-300"}`}>
            {overlay.passed ? "¡Prueba de tema superada!" : "Prueba no superada"}
          </p>
          <p className="mt-[0.8cqw] text-[2.3cqw]">
            Aciertos: <span className="font-black text-amber-300">{overlay.score}/{overlay.total}</span>
            <span className="text-slate-300"> · Mínimo necesario: {overlay.min}</span>
          </p>
          {difficulty === "hard" && !overlay.passed && (
            <p className="mt-[0.4cqw] text-[1.6cqw] text-red-300">
              En modo Tribunal cada fallo resta -0.33 aciertos.
            </p>
          )}
          <div className="mt-[2cqw] flex flex-wrap justify-center gap-[1.5cqw]">
            {overlay.passed ? (
              <button
                type="button"
                onClick={() => onExit({ completed: true, score: overlay.score, total: overlay.total })}
                className="cursor-pointer rounded-md bg-emerald-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-emerald-300 active:scale-95 transition"
              >
                Volver al mapa ✔
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onRetryTest}
                  className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
                >
                  Repetir prueba
                </button>
                <button
                  type="button"
                  onClick={() => onExit({ completed: false })}
                  className="cursor-pointer rounded-md bg-white/15 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-bold hover:bg-white/25 transition"
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

  // end (boss defeated or game over)
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/85 p-[2cqw]">
      <div className="w-[72cqw] rounded-xl border-[0.3cqw] border-white/70 bg-slate-950/95 p-[2.5cqw] text-center text-white shadow-2xl backdrop-blur-md">
        <div className="relative mx-auto mb-[1cqw] h-[15cqw] w-[15cqw] overflow-hidden rounded-2xl border-2 border-white/50 shadow-lg">
          <Image
            src={overlay.win ? "/player/cheer.png" : "/player/idle.png"}
            alt="Lucía"
            fill
            sizes="180px"
            className="object-contain"
            unoptimized
          />
        </div>
        <p className={`text-[3cqw] font-black ${overlay.win ? "text-emerald-300" : "text-red-300"}`}>
          {overlay.title}
        </p>
        <p className="mt-[0.8cqw] text-[2.1cqw] leading-snug text-slate-200">{overlay.text}</p>
        <div className="mt-[2cqw] flex flex-wrap justify-center gap-[1.5cqw]">
          {overlay.win ? (
            <button
              type="button"
              onClick={() => onExit({ completed: true })}
              className="cursor-pointer rounded-md bg-emerald-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-emerald-300 active:scale-95 transition"
            >
              Volver al mapa ✔
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onRestart}
                className="cursor-pointer rounded-md bg-amber-400 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
              >
                Reintentar
              </button>
              <button
                type="button"
                onClick={() => onExit({ completed: false })}
                className="cursor-pointer rounded-md bg-white/15 px-[2.5cqw] py-[1cqw] text-[2.2cqw] font-bold hover:bg-white/25 transition"
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
