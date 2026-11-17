"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as R from "@/game/render";
import { THEMES } from "@/game/themes";
import type { Difficulty } from "@/game/engine";

interface Props {
  muted: boolean;
  musicMuted: boolean;
  difficulty: Difficulty;
  hasProgress: boolean;
  onPlay: () => void;
  onOpenStudyHub?: () => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
  onSelectDifficulty: (d: Difficulty) => void;
  onReset: () => void;
  onToggleFullscreen?: () => void;
}

export default function TitleScreen({
  muted,
  musicMuted,
  difficulty,
  hasProgress,
  onPlay,
  onOpenStudyHub,
  onToggleMute,
  onToggleMusic,
  onSelectDifficulty,
  onReset,
  onToggleFullscreen,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const g = canvas?.getContext("2d");
    if (!canvas || !g) return;
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";
    let raf = 0;
    let t = 0;
    const loop = () => {
      t++;
      const camX = t * 0.4;
      g.save();
      g.scale(3, 3);
      R.drawBackdrop(g, THEMES.plaza, camX);
      for (let x = 0; x < 22; x++) R.drawTile(g, "#", x * 16 - (camX % 16), 164, THEMES.plaza, t, false);
      const walk = 160 + Math.sin(t / 110) * 80;
      const dir = Math.cos(t / 110) >= 0 ? 1 : -1;
      R.drawNPC(g, 36, 164, "Don Ramón", "Conserje de la Plaza", t);
      R.drawPlayer(g, walk, 164, { flip: dir < 0, state: "walk", t });
      g.restore();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      <canvas ref={ref} width={960} height={540} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/85" />
      
      <div className="relative flex h-full flex-col items-center justify-between p-[2cqw] text-center text-white">
        {/* Barra superior con controles */}
        <div className="flex w-full items-center justify-between px-[1cqw]">
          <div className="flex items-center gap-[1cqw] rounded-lg bg-black/60 px-[1.5cqw] py-[0.6cqw] text-[1.8cqw] font-semibold backdrop-blur">
            <span className="text-amber-300">★</span> AGE A2 · Gestión Estado
          </div>
          <div className="flex items-center gap-[1cqw]">
            <button
              type="button"
              onClick={onToggleMusic}
              aria-label={musicMuted ? "Activar música" : "Silenciar música"}
              className="cursor-pointer rounded-lg bg-white/15 px-[1.6cqw] py-[0.6cqw] text-[1.8cqw] font-bold backdrop-blur hover:bg-white/25 active:scale-95"
              title="Activar/Silenciar música de fondo"
            >
              {musicMuted ? "🎵 Música off" : "🎵 Música on"}
            </button>
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? "Activar sonido" : "Silenciar todo"}
              className="cursor-pointer rounded-lg bg-white/15 px-[1.6cqw] py-[0.6cqw] text-[1.8cqw] font-bold backdrop-blur hover:bg-white/25 active:scale-95"
              title="Silenciar todos los sonidos"
            >
              {muted ? "🔇 Mute" : "🔊 Audio"}
            </button>
            {onToggleFullscreen && (
              <button
                type="button"
                onClick={onToggleFullscreen}
                className="cursor-pointer rounded-lg bg-white/15 px-[1.6cqw] py-[0.6cqw] text-[1.8cqw] font-bold backdrop-blur hover:bg-white/25 active:scale-95"
                title="Pantalla completa"
              >
                ⛶
              </button>
            )}
          </div>
        </div>

        {/* Hero central con Lucía y el título */}
        <div className="flex flex-1 items-center justify-center gap-[4cqw] max-w-[95cqw]">
          {/* Ilustración de Lucía estudiando con sus libros de OPOS */}
          <div className="relative hidden sm:flex shrink-0 flex-col items-center">
            <div className="relative h-[22cqw] w-[13cqw] drop-shadow-[0_12px_16px_rgba(0,0,0,0.8)]">
              <Image
                src="/player/idle.png"
                alt="Lucía opositora"
                fill
                priority
                className="object-contain"
                sizes="20vw"
              />
            </div>
            <span className="mt-[0.6cqw] rounded bg-black/60 px-[1.2cqw] py-[0.3cqw] text-[1.4cqw] font-bold text-amber-200">
              Lucía · Opositora A2
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="text-[2.2cqw] font-bold uppercase tracking-[0.25em] text-amber-300 drop-shadow">
              Aventura de Repaso · Temario A2 Estado
            </p>
            <h1 className="mt-[0.5cqw] text-[7.5cqw] font-black leading-none tracking-tight text-white drop-shadow-[0_4px_0_#92400e]">
              OPOSI<span className="text-amber-400">-KID</span>
            </h1>
            <p className="mt-[1.2cqw] max-w-[65cqw] text-[2cqw] leading-relaxed text-slate-100 drop-shadow">
              6 mundos, uno por bloque oficial. Encuentra preparadores, supera pruebas de test en cada tema, derrota a los jefes y conquista el Examen Final del INAP.
            </p>

            {/* Selector de Dificultad */}
            <div className="mt-[2cqw] flex items-center justify-center gap-[1cqw] rounded-xl bg-black/65 p-[0.8cqw] backdrop-blur">
              <span className="px-[1cqw] text-[1.6cqw] font-bold text-slate-300">Dificultad:</span>
              <button
                type="button"
                onClick={() => onSelectDifficulty("easy")}
                className={`cursor-pointer rounded-lg px-[1.8cqw] py-[0.6cqw] text-[1.7cqw] font-black transition ${
                  difficulty === "easy"
                    ? "bg-emerald-500 text-slate-950 shadow-[0_2px_0_#065f46]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                🟢 Fácil (4 ❤ · Pistas BOE)
              </button>
              <button
                type="button"
                onClick={() => onSelectDifficulty("normal")}
                className={`cursor-pointer rounded-lg px-[1.8cqw] py-[0.6cqw] text-[1.7cqw] font-black transition ${
                  difficulty === "normal"
                    ? "bg-amber-400 text-slate-950 shadow-[0_2px_0_#92400e]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                🟡 Estándar (3 ❤ · Oficial)
              </button>
              <button
                type="button"
                onClick={() => onSelectDifficulty("hard")}
                className={`cursor-pointer rounded-lg px-[1.8cqw] py-[0.6cqw] text-[1.7cqw] font-black transition ${
                  difficulty === "hard"
                    ? "bg-red-500 text-white shadow-[0_2px_0_#7f1d1d]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                🔴 Tribunal (-0.33 fallo)
              </button>
            </div>

            {/* Botones de acción */}
            <div className="mt-[2.2cqw] flex flex-wrap items-center justify-center gap-[1.6cqw]">
              <button
                type="button"
                onClick={onPlay}
                className="cursor-pointer rounded-xl bg-amber-400 px-[5cqw] py-[1.4cqw] text-[3.2cqw] font-black text-slate-950 shadow-[0_5px_0_#92400e] transition active:translate-y-[3px] active:shadow-none hover:bg-amber-300"
              >
                ▶ EMPEZAR REPASO
              </button>
              {onOpenStudyHub && (
                <button
                  type="button"
                  onClick={onOpenStudyHub}
                  className="cursor-pointer rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-[3cqw] py-[1.4cqw] text-[2.2cqw] font-black text-white shadow-[0_4px_0_#1e3a8a] transition active:translate-y-[2px] active:shadow-none hover:from-sky-400 hover:to-indigo-500"
                >
                  🏫 Aula INAP & Mini-Juegos
                </button>
              )}
              <Link
                href="/admin"
                className="rounded-xl bg-white/15 px-[2.4cqw] py-[1.4cqw] text-[2.2cqw] font-bold text-white backdrop-blur transition hover:bg-white/25"
              >
                ✎ BOE / Temario
              </Link>
              {hasProgress && (
                <button
                  type="button"
                  onClick={onReset}
                  className="cursor-pointer rounded-xl bg-red-500/30 px-[2.2cqw] py-[1.4cqw] text-[2cqw] font-bold text-red-200 hover:bg-red-500/50"
                >
                  Reiniciar progreso
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pie de pantalla */}
        <div className="text-[1.5cqw] text-slate-400">
          Usa teclado en ordenador (Flechas / Espacio / X) o controles táctiles en móvil apaisado.
        </div>
      </div>
    </div>
  );
}

