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
export type ControlMode = "runner" | "pad" | "touch";

const PLAYER_KEY = "oposikid-player-id";
const FREE_KEY = "oposikid-free-play";
const DIFFICULTY_KEY = "oposikid-difficulty";
const CONTROL_MODE_KEY = "oposikid-control-mode";

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
  const [controlMode, setControlMode] = useState<ControlMode>("runner");
  const [runnerDir, setRunnerDir] = useState<1 | -1>(1);
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
  const runnerSwipeRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    pointerId: number;
  }>({ startX: 0, startY: 0, startTime: 0, pointerId: -1 });

  // Detección reactiva de orientación: vertical (portrait) vs horizontal (landscape)
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
      const savedMode = window.localStorage.getItem(CONTROL_MODE_KEY) as ControlMode | null;
      if (savedMode === "runner" || savedMode === "pad" || savedMode === "touch") {
        setControlMode(savedMode);
      } else {
        setControlMode("runner");
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

  // Sincronización del Modo Mario Run (auto-carrera continua cuando no hay overlays)
  useEffect(() => {
    if (screen !== "play") return;
    const eng = engineRef.current;
    if (!eng) return;

    if (controlMode === "runner") {
      if (snap?.overlay) {
        eng.input.right = false;
        eng.input.left = false;
        eng.input.jump = false;
      } else {
        if (runnerDir > 0) {
          eng.input.right = true;
          eng.input.left = false;
        } else {
          eng.input.left = true;
          eng.input.right = false;
        }
      }
    }
  }, [controlMode, runnerDir, snap?.overlay, screen]);

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

    // Si está en modo Mario Run, arrancar avanzando inmediatamente
    if (controlMode === "runner") {
      eng.input.right = runnerDir > 0;
      eng.input.left = runnerDir < 0;
    }

    eng.start();
    return () => {
      eng.destroy();
      if (engineRef.current === eng) engineRef.current = null;
    };
  }, [screen, stage, data, difficulty, controlMode, runnerDir]);

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
    setRunnerDir(1);
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

  // Alternar entre los 3 modos de control: 🏃 Mario Run -> 🕹️ Mando Consola -> 👆 Táctil Libre
  const cycleControlMode = () => {
    setControlMode((prev) => {
      const next: ControlMode = prev === "runner" ? "pad" : prev === "pad" ? "touch" : "runner";
      try {
        window.localStorage.setItem(CONTROL_MODE_KEY, next);
      } catch {}
      const eng = engineRef.current;
      if (eng) {
        eng.input.left = false;
        eng.input.right = false;
        eng.input.jump = false;
        if (next === "runner" && !snapRef.current?.overlay) {
          eng.input.right = runnerDir > 0;
          eng.input.left = runnerDir < 0;
        }
      }
      return next;
    });
  };

  // Invertir dirección en modo Mario Run (correr derecha <-> izquierda)
  const toggleRunnerDir = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
    } catch {}
    setRunnerDir((prev) => {
      const next = prev === 1 ? -1 : 1;
      const eng = engineRef.current;
      if (eng && controlMode === "runner" && !snapRef.current?.overlay) {
        if (next > 0) {
          eng.input.right = true;
          eng.input.left = false;
        } else {
          eng.input.left = true;
          eng.input.right = false;
        }
      }
      return next;
    });
  };

  // Acción rápida de puño/interactuar
  const triggerPunch = () => {
    const eng = engineRef.current;
    if (!eng) return;
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(15);
    } catch {}
    eng.input.punch = true;
    eng.input.interact = true;
    setTimeout(() => {
      if (engineRef.current) {
        engineRef.current.input.punch = false;
        engineRef.current.input.interact = false;
      }
    }, 150);
  };

  // Toques en Modo Mario Run (1 toque = salto de altura variable, gestos de swipe)
  const runnerTouchDown = (e: ReactPointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".no-runner-jump") || snapRef.current?.overlay) return;

    runnerSwipeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      pointerId: e.pointerId,
    };

    const eng = engineRef.current;
    if (eng) {
      try {
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(12);
      } catch {}
      eng.input.jump = true;
    }
  };

  const runnerTouchUp = (e: ReactPointerEvent) => {
    if (runnerSwipeRef.current.pointerId !== -1 && e.pointerId !== runnerSwipeRef.current.pointerId) return;

    const dx = e.clientX - runnerSwipeRef.current.startX;
    const dy = e.clientY - runnerSwipeRef.current.startY;
    const dt = Date.now() - runnerSwipeRef.current.startTime;

    // Gestos rápidos (swipes)
    if (dt < 350 && Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) {
        // Deslizar a la izquierda -> girar a la izquierda
        setRunnerDir(-1);
        if (engineRef.current) {
          engineRef.current.input.left = true;
          engineRef.current.input.right = false;
        }
      } else {
        // Deslizar a la derecha -> girar a la derecha
        setRunnerDir(1);
        if (engineRef.current) {
          engineRef.current.input.right = true;
          engineRef.current.input.left = false;
        }
      }
    } else if (dt < 250 && Math.hypot(dx, dy) < 20 && e.clientY - runnerSwipeRef.current.startY > 30) {
      // Swipe hacia abajo -> Puño
      triggerPunch();
    }

    if (engineRef.current) {
      engineRef.current.input.jump = false;
    }
    runnerSwipeRef.current.pointerId = -1;
  };

  // Modo Táctil Libre (arrastrar dedo por pantalla)
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
      triggerPunch();
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
      try {
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
      } catch {}
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
          width: isPortrait ? "100vw" : `${viewportSize.width}px`,
          height: isPortrait ? "100dvh" : `${viewportSize.height}px`,
          maxWidth: "100vw",
          maxHeight: "100dvh",
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

        {playing && stage && isPortrait && (
          /* ============================================================== */
          /* MODO VERTICAL / RETRATO (Móvil y Tablet estilo Nintendo DS):  */
          /* Arriba: Pantalla 16:9 limpia sin botones tapando a Lucía      */
          /* Abajo: Consola táctil ergonómica / Modo Mario Run (1 dedo)    */
          /* ============================================================== */
          <div className="relative h-full w-full overflow-hidden flex flex-col justify-between bg-slate-950 select-none">
            {/* PANTALLA SUPERIOR: Canvas de juego 16:9 limpio */}
            <div
              className="relative w-full aspect-[16/9] flex-none bg-black shadow-2xl overflow-hidden [container-type:inline-size]"
              onPointerDown={controlMode === "runner" ? runnerTouchDown : controlMode === "touch" ? handlePointerDownGame : undefined}
              onPointerMove={controlMode === "touch" ? handlePointerMoveGame : undefined}
              onPointerUp={controlMode === "runner" ? runnerTouchUp : controlMode === "touch" ? handlePointerUpGame : undefined}
              onPointerCancel={controlMode === "runner" ? runnerTouchUp : controlMode === "touch" ? handlePointerUpGame : undefined}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Marcador táctil libre */}
              {controlMode === "touch" && fingerMarker.active && (
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

              {/* HUD Superior Limpio */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-1.5 p-1.5">
                <div className="rounded-lg bg-black/75 backdrop-blur-md px-2 py-0.5 text-white border border-white/10">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-amber-300 truncate max-w-[140px]">
                    {snap?.subtitle ?? stage.subtitle}
                  </p>
                  <p className="text-xs font-black leading-tight truncate max-w-[140px]">
                    {snap?.title ?? stage.title}
                  </p>
                </div>

                {snap && snap.bossMax > 0 && (
                  <div className="rounded-lg bg-black/75 backdrop-blur-md px-2 py-0.5 text-white border border-red-500/30">
                    <p className="text-[10px] font-black text-red-300">{snap.bossName}</p>
                    <div className="mt-0.5 flex gap-1">
                      {Array.from({ length: snap.bossMax }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-3 rounded-xs transition-all duration-300 ${
                            i < snap.bossHp ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg bg-black/75 backdrop-blur-md px-2 py-0.5 text-xs font-bold text-white border border-white/10">
                  <span className="text-red-400">❤ {snap?.lives ?? 3}</span>
                  <span className="text-yellow-300">💶 {snap?.coins ?? 0}</span>
                  <button
                    type="button"
                    onClick={cycleControlMode}
                    className="cursor-pointer rounded bg-amber-500/35 border border-amber-400/50 px-2 py-0.5 text-[11px] font-black text-amber-200 hover:bg-amber-500/50 active:scale-95 transition"
                    title="Alternar modo de control"
                  >
                    {controlMode === "runner" ? "🏃 Mario Run" : controlMode === "pad" ? "🕹️ Mando" : "👆 Táctil"}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="cursor-pointer rounded bg-white/15 px-1 py-0.5 text-xs hover:bg-white/30"
                  >
                    {muted ? "🔇" : "🔊"}
                  </button>
                  <button
                    type="button"
                    onClick={() => finish({ completed: false })}
                    className="cursor-pointer rounded bg-white/15 px-1.5 py-0.5 text-xs hover:bg-white/30"
                  >
                    Mapa
                  </button>
                </div>
              </div>
            </div>

            {/* CONSOLA INFERIOR: Controlador dedicado fuera del área de juego */}
            <div className="flex-1 w-full min-h-0 flex flex-col justify-between p-3 bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t-2 border-amber-500/30 select-none touch-none">
              {controlMode === "runner" && (
                <div className="flex-1 w-full flex flex-col justify-between py-1">
                  {/* Tarjeta gigante de salto para jugar con 1 dedo */}
                  <div
                    onPointerDown={runnerTouchDown}
                    onPointerUp={runnerTouchUp}
                    onPointerCancel={runnerTouchUp}
                    className="flex-1 w-full rounded-2xl bg-gradient-to-br from-emerald-600/30 via-emerald-500/15 to-teal-800/30 border-2 border-emerald-400/60 p-3 flex flex-col items-center justify-center active:bg-emerald-500/40 active:border-emerald-300 active:scale-[0.99] transition shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  >
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-500/40 border-3 border-emerald-300 flex items-center justify-center shadow-lg animate-pulse mb-1.5">
                      <span className="text-3xl font-black text-white">⬆</span>
                    </div>
                    <p className="text-base sm:text-lg font-black text-white uppercase tracking-wider text-center">
                      TOCA EN CUALQUIER LUGAR PARA SALTAR
                    </p>
                    <p className="text-xs text-emerald-200 mt-0.5 text-center font-medium">
                      Modo Mario Run · Mantén pulsado para saltar más alto
                    </p>
                  </div>

                  {/* Barra inferior de acciones auxiliares */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
                    <button
                      type="button"
                      onClick={toggleRunnerDir}
                      className="flex-1 h-12 rounded-xl bg-slate-800 border-2 border-slate-600 text-xs font-black text-amber-200 flex items-center justify-center gap-1 active:bg-slate-700 active:scale-95 transition shadow"
                    >
                      <span>🔄</span> Girar {runnerDir > 0 ? "▶ Der" : "◀ Izq"}
                    </button>
                    <button
                      type="button"
                      onClick={triggerPunch}
                      className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 border-2 border-orange-300 text-xs font-black text-slate-950 flex items-center justify-center gap-1 active:brightness-110 active:scale-95 transition shadow"
                    >
                      <span>👊</span> Puño / Golpear
                    </button>
                    <button
                      type="button"
                      onClick={cycleControlMode}
                      className="h-12 px-3 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-slate-300 hover:bg-white/20 active:scale-95 transition"
                      title="Cambiar a mando cruceta o libre"
                    >
                      🕹️ Mando
                    </button>
                  </div>
                </div>
              )}

              {controlMode === "pad" && (
                <div className="flex-1 w-full flex flex-col justify-between py-1">
                  {/* Deck de Consola: Cruceta a la izquierda, botones A/B a la derecha */}
                  <div className="flex-1 w-full flex items-center justify-between px-2">
                    {/* Cruceta Izquierda */}
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        {...touchButton("left")}
                        className="h-16 w-16 rounded-2xl bg-slate-800 border-2 border-slate-600 text-3xl font-black text-white active:bg-amber-500 active:border-amber-300 active:scale-95 transition shadow-lg flex items-center justify-center"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        {...touchButton("right")}
                        className="h-16 w-16 rounded-2xl bg-slate-800 border-2 border-slate-600 text-3xl font-black text-white active:bg-amber-500 active:border-amber-300 active:scale-95 transition shadow-lg flex items-center justify-center"
                      >
                        ▶
                      </button>
                    </div>

                    {/* Botones de Acción Derecha */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        {...touchButton("punch")}
                        className="h-13 w-13 rounded-full bg-orange-500/90 border-2 border-orange-300 text-[10px] font-black text-white active:bg-orange-400 active:scale-95 transition shadow-lg flex items-center justify-center"
                      >
                        PUÑO
                      </button>
                      <button
                        type="button"
                        {...touchButton("interact")}
                        className="h-13 w-13 rounded-full bg-sky-500/90 border-2 border-sky-300 text-[10px] font-black text-white active:bg-sky-400 active:scale-95 transition shadow-lg flex items-center justify-center"
                      >
                        HABLAR
                      </button>
                      <button
                        type="button"
                        {...touchButton("jump")}
                        className="h-18 w-18 rounded-full bg-emerald-500 border-3 border-emerald-300 text-sm font-black text-slate-950 active:bg-emerald-400 active:scale-95 transition shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center"
                      >
                        SALTAR
                      </button>
                    </div>
                  </div>

                  {/* Barra de estado inferior */}
                  <div className="mt-2 flex items-center justify-between px-2 pt-1 border-t border-white/10 text-xs text-slate-400">
                    <span>🕹️ Mando Abajo (Nintendo DS style)</span>
                    <button
                      type="button"
                      onClick={cycleControlMode}
                      className="text-amber-300 font-bold hover:underline"
                    >
                      Probar 🏃 Mario Run (1 Dedo)
                    </button>
                  </div>
                </div>
              )}

              {controlMode === "touch" && (
                <div
                  onPointerDown={handlePointerDownGame}
                  onPointerMove={handlePointerMoveGame}
                  onPointerUp={handlePointerUpGame}
                  onPointerCancel={handlePointerUpGame}
                  className="flex-1 w-full rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border-2 border-indigo-400/40 p-4 flex flex-col items-center justify-center select-none touch-none shadow-inner"
                >
                  <div className="h-14 w-14 rounded-full bg-indigo-500/30 border-2 border-indigo-300 flex items-center justify-center text-2xl mb-1.5 animate-bounce">
                    👆
                  </div>
                  <p className="text-sm font-black text-white text-center">ZONA TÁCTIL LIBRE</p>
                  <p className="text-xs text-indigo-200 mt-0.5 text-center">
                    Arrastra el dedo para guiar a Lucía · Toca arriba para saltar · Toque rápido para puño
                  </p>
                  <button
                    type="button"
                    onClick={cycleControlMode}
                    className="mt-2.5 px-3 py-1 rounded-lg bg-white/15 text-xs font-bold text-amber-200 hover:bg-white/25 transition"
                  >
                    Cambiar a 🏃 Mario Run
                  </button>
                </div>
              )}
            </div>

            {/* Overlays modales para preguntas, diálogos y resultados */}
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

        {playing && stage && !isPortrait && (
          /* ============================================================== */
          /* MODO HORIZONTAL / APAISADO (Widescreen 16:9)                    */
          /* ============================================================== */
          <div
            className="relative h-full w-full overflow-hidden flex flex-col justify-center items-center touch-none select-none"
            onPointerDown={controlMode === "runner" ? runnerTouchDown : controlMode === "touch" ? handlePointerDownGame : undefined}
            onPointerMove={controlMode === "touch" ? handlePointerMoveGame : undefined}
            onPointerUp={controlMode === "runner" ? runnerTouchUp : controlMode === "touch" ? handlePointerUpGame : undefined}
            onPointerCancel={controlMode === "runner" ? runnerTouchUp : controlMode === "touch" ? handlePointerUpGame : undefined}
          >
            <div className="relative w-full aspect-[16/9] max-h-full overflow-hidden shadow-2xl flex items-center justify-center [container-type:inline-size]">
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Marcador táctil libre */}
              {controlMode === "touch" && fingerMarker.active && (
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
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-[1.5cqw] p-[1.2cqw] z-10">
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
                  onClick={cycleControlMode}
                  className="cursor-pointer rounded bg-amber-500/35 border border-amber-400/40 px-[1cqw] py-[0.3cqw] text-xs sm:text-[1.6cqw] font-bold text-amber-200 hover:bg-amber-500/50 transition shadow-sm"
                  title="Alternar modo de control"
                >
                  {controlMode === "runner" ? "🏃 Mario Run" : controlMode === "pad" ? "🕹️ Mando" : "👆 Táctil"}
                </button>
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

            {/* Controles en pantalla en modo Pad en Horizontal */}
            {controlMode === "pad" && touch && !snap?.overlay && (
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

            {/* Controles auxiliares en modo Mario Run en Horizontal */}
            {controlMode === "runner" && touch && !snap?.overlay && (
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none z-20">
                <button
                  type="button"
                  onClick={toggleRunnerDir}
                  className="pointer-events-auto h-11 px-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-amber-400/50 text-xs font-black text-amber-200 active:scale-95 transition shadow-lg flex items-center gap-1"
                >
                  <span>🔄</span> Girar {runnerDir > 0 ? "▶" : "◀"}
                </button>
                <div className="pointer-events-none rounded-full bg-black/60 backdrop-blur-md px-4 py-1 text-xs text-emerald-200 border border-emerald-400/30">
                  🏃 Mario Run: Toca cualquier lugar para saltar
                </div>
                <button
                  type="button"
                  onClick={triggerPunch}
                  className="pointer-events-auto h-11 px-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 backdrop-blur-md border border-orange-300 text-xs font-black text-slate-950 active:scale-95 transition shadow-lg flex items-center gap-1"
                >
                  <span>👊</span> Puño
                </button>
              </div>
            )}

            {/* Aviso breve de modo Dedo cuando está en modo libre */}
            {controlMode === "touch" && touch && !snap?.overlay && (
              <div className="pointer-events-none absolute bottom-2 inset-x-0 flex justify-center z-20">
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-4 py-1 text-xs text-amber-200/90 shadow border border-amber-400/20">
                  👆 Modo Dedo: arrastra en pantalla para guiar a Lucía · toca arriba para saltar
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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
        <div className="w-full max-w-xl rounded-2xl border-2 border-white/80 bg-slate-950/98 p-4 sm:p-6 text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <div
              className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border-2 border-white/70 shadow-lg"
              style={{ background: overlay.color }}
            >
              {portrait ? (
                <Image
                  src={portrait}
                  alt={overlay.speaker}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-xl font-black">
                  {overlay.speaker.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-base sm:text-lg font-black text-amber-300">{overlay.speaker}</p>
              <p className="text-xs sm:text-sm text-slate-300">{overlay.role}</p>
            </div>
          </div>
          <p className="mt-3 min-h-[50px] text-sm sm:text-base leading-relaxed text-slate-100">{line}</p>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
            <span className="text-xs text-slate-400">
              {overlay.index + 1}/{overlay.lines.length}
            </span>
            <button
              type="button"
              onClick={onNext}
              className="cursor-pointer rounded-xl bg-amber-400 px-5 py-2 text-sm sm:text-base font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
            >
              {last ? "Entendido ✔" : "Siguiente ▶"}
            </button>
          </div>
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm select-none">
        <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-amber-300/80 bg-slate-950/98 p-4 sm:p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              {bossPortrait && (
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border border-red-400">
                  <Image src={bossPortrait} alt={overlay.title} fill sizes="60px" className="object-cover" unoptimized />
                </div>
              )}
              <p
                className={`text-xs sm:text-sm font-black uppercase tracking-wide ${
                  isBoss ? "text-red-400" : isTest ? "text-sky-300" : "text-amber-300"
                }`}
              >
                {isBoss ? `👹 ${overlay.title}` : isTest ? `📝 ${overlay.title}` : "❓ Bloque de pregunta"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {difficulty === "hard" && (
                <span className="rounded bg-red-600/40 px-2 py-0.5 text-[11px] font-bold text-red-200">
                  -0.33 fallo
                </span>
              )}
              <p className="text-xs sm:text-sm font-bold text-slate-300">
                {isBoss ? `Golpe ${overlay.step}/${overlay.total}` : `${overlay.step}/${overlay.total}`}
              </p>
            </div>
          </div>

          {/* Pista en modo fácil antes de responder */}
          {difficulty === "easy" && !answered && q.reference && (
            <div className="mt-2 rounded-lg bg-amber-500/15 border border-amber-400/40 px-3 py-1.5 text-xs text-amber-200">
              💡 <span className="font-semibold">Pista de estudio:</span> Regulado en {q.reference}.
            </div>
          )}

          <p className="mt-3 text-sm sm:text-base font-semibold leading-relaxed text-slate-100">{q.prompt}</p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answer;
              const isChosen = answered?.chosen === i;
              let style = "border-white/20 bg-white/5 hover:bg-white/15 active:scale-[0.99]";
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
                  className={`flex min-h-[44px] cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition disabled:cursor-default ${style}`}
                >
                  <span className="font-black text-amber-300">{String.fromCharCode(65 + i)}.</span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-3 rounded-xl bg-black/60 p-3.5 border border-white/15">
              <p className={`text-sm sm:text-base font-black ${answered.ok ? "text-emerald-300" : "text-red-300"}`}>
                {answered.ok ? "¡Correcto! 🎉" : "Incorrecto ❌"}
              </p>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-200">{q.explanation}</p>
              {q.reference && <p className="mt-1 text-xs text-amber-300 font-medium">📜 {q.reference}</p>}

              {/* Texto Literal de la Ley del BOE */}
              {q.legalText && (
                <div className="mt-2 rounded-lg border-l-4 border-amber-400 bg-amber-950/40 p-2.5 text-amber-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    ⚖️ {q.legalArticle ?? "Texto Literal de la Ley (BOE)"}
                  </p>
                  <blockquote className="mt-1 text-xs italic leading-relaxed text-slate-200">
                    {q.legalText}
                  </blockquote>
                </div>
              )}

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={onContinue}
                  className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2 text-sm sm:text-base font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
                >
                  Continuar ▶
                </button>
              </div>
            </div>
          )}
          {!answered && (
            <p className="mt-2 text-center text-xs text-slate-400">Toca una opción para responder o pulsa 1-4 en el teclado.</p>
          )}
        </div>
      </div>
    );
  }

  if (overlay.kind === "testResult") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm select-none">
        <div className="w-full max-w-md rounded-2xl border-2 border-white/70 bg-slate-950/98 p-5 text-center text-white shadow-2xl">
          <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/50 shadow-lg">
            <Image
              src={overlay.passed ? "/player/cheer.png" : "/player/idle.png"}
              alt="Lucía"
              fill
              sizes="120px"
              className="object-contain"
              unoptimized
            />
          </div>
          <p className={`text-xl sm:text-2xl font-black ${overlay.passed ? "text-emerald-300" : "text-red-300"}`}>
            {overlay.passed ? "¡Prueba de tema superada!" : "Prueba no superada"}
          </p>
          <p className="mt-2 text-sm sm:text-base">
            Aciertos: <span className="font-black text-amber-300">{overlay.score}/{overlay.total}</span>
            <span className="text-slate-300"> · Mínimo necesario: {overlay.min}</span>
          </p>
          {difficulty === "hard" && !overlay.passed && (
            <p className="mt-1 text-xs text-red-300">
              En modo Tribunal cada fallo resta -0.33 aciertos.
            </p>
          )}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {overlay.passed ? (
              <button
                type="button"
                onClick={() => onExit({ completed: true, score: overlay.score, total: overlay.total })}
                className="cursor-pointer rounded-xl bg-emerald-400 px-6 py-2.5 text-sm sm:text-base font-black text-slate-950 shadow-md hover:bg-emerald-300 active:scale-95 transition"
              >
                Volver al mapa ✔
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onRetryTest}
                  className="cursor-pointer rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
                >
                  Repetir prueba
                </button>
                <button
                  type="button"
                  onClick={() => onExit({ completed: false })}
                  className="cursor-pointer rounded-xl bg-white/15 px-5 py-2.5 text-sm font-bold hover:bg-white/25 transition"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-md rounded-2xl border-2 border-white/70 bg-slate-950/98 p-5 text-center text-white shadow-2xl">
        <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-2xl border-2 border-white/50 shadow-lg">
          <Image
            src={overlay.win ? "/player/cheer.png" : "/player/idle.png"}
            alt="Lucía"
            fill
            sizes="120px"
            className="object-contain"
            unoptimized
          />
        </div>
        <p className={`text-xl sm:text-2xl font-black ${overlay.win ? "text-emerald-300" : "text-red-300"}`}>
          {overlay.title}
        </p>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">{overlay.text}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {overlay.win ? (
            <button
              type="button"
              onClick={() => onExit({ completed: true })}
              className="cursor-pointer rounded-xl bg-emerald-400 px-6 py-2.5 text-sm sm:text-base font-black text-slate-950 shadow-md hover:bg-emerald-300 active:scale-95 transition"
            >
              Volver al mapa ✔
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onRestart}
                className="cursor-pointer rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-black text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
              >
                Reintentar
              </button>
              <button
                type="button"
                onClick={() => onExit({ completed: false })}
                className="cursor-pointer rounded-xl bg-white/15 px-5 py-2.5 text-sm font-bold hover:bg-white/25 transition"
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
