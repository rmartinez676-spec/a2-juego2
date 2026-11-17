"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as R from "@/game/render";
import { THEMES } from "@/game/themes";

interface Props {
  muted: boolean;
  hasProgress: boolean;
  onPlay: () => void;
  onToggleMute: () => void;
  onReset: () => void;
}

export default function TitleScreen({ muted, hasProgress, onPlay, onToggleMute, onReset }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const g = canvas?.getContext("2d");
    if (!canvas || !g) return;
    g.imageSmoothingEnabled = false;
    let raf = 0;
    let t = 0;
    const npcLook = R.npcLook("Don Ramón", "Conserje de la Plaza");
    const loop = () => {
      t++;
      const camX = t * 0.4;
      R.drawBackdrop(g, THEMES.plaza, camX);
      for (let x = 0; x < 22; x++) R.drawTile(g, "#", x * 16 - (camX % 16), 164, THEMES.plaza, t, false);
      const walk = 160 + Math.sin(t / 110) * 90;
      const dir = Math.cos(t / 110) >= 0 ? 1 : -1;
      R.drawPerson(g, 36, 164, npcLook, { frame: 0 });
      R.drawPerson(g, walk, 164, R.PLAYER_LOOK, { flip: dir < 0, frame: Math.floor(t / 12) % 2 });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={ref} width={320} height={180} className="absolute inset-0 h-full w-full [image-rendering:pixelated]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
        <p className="text-[2.4cqw] font-bold uppercase tracking-[0.3em] text-amber-300">Repaso del temario · A2 Estado</p>
        <h1 className="mt-[1cqw] text-[8cqw] font-black leading-none tracking-tight text-white drop-shadow-[0_4px_0_#7c2d12]">
          OPOSI<span className="text-amber-300">-KID</span>
        </h1>
        <p className="mt-[1.5cqw] max-w-[70cqw] text-[2.4cqw] text-slate-100 drop-shadow">
          Recorre 6 mundos, uno por bloque del temario. Habla con los personajes, responde preguntas de los bloques &quot;?&quot;,
          supera las pruebas de cada tema y derrota a los jefes. ¡Al final, el Examen Final!
        </p>
        <div className="mt-[3cqw] flex flex-wrap items-center justify-center gap-[2cqw]">
          <button
            type="button"
            onClick={onPlay}
            className="cursor-pointer rounded-lg bg-amber-400 px-[4cqw] py-[1.6cqw] text-[3cqw] font-black text-slate-950 shadow-[0_5px_0_#92400e] active:translate-y-[3px] active:shadow-none"
          >
            ▶ JUGAR
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            className="cursor-pointer rounded-lg bg-white/15 px-[2.4cqw] py-[1.6cqw] text-[2.4cqw] font-bold text-white backdrop-blur hover:bg-white/25"
          >
            {muted ? "🔇 Sonido off" : "🔊 Sonido on"}
          </button>
          <Link
            href="/admin"
            className="rounded-lg bg-white/15 px-[2.4cqw] py-[1.6cqw] text-[2.4cqw] font-bold text-white backdrop-blur hover:bg-white/25"
          >
            ✎ Editar temario
          </Link>
          {hasProgress && (
            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer rounded-lg bg-red-500/30 px-[2.4cqw] py-[1.6cqw] text-[2.2cqw] font-bold text-red-100 hover:bg-red-500/50"
            >
              Reiniciar progreso
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
