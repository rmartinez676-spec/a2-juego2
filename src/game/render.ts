import type { BossStyle, Prop, Theme } from "./themes";
import { hashString } from "./rand";

export interface Look {
  hair: string;
  skin: string;
  shirt: string;
  pants: string;
  hat?: string;
  tie?: string;
  briefcase?: boolean;
  longHair?: boolean;
  glasses?: boolean;
}

export type Kind = "papeleo" | "sello" | "silencio" | "burocrata";

export const PLAYER_LOOK: Look = {
  hair: "#4a2c17",
  skin: "#f1c7a5",
  shirt: "#f472b6",
  pants: "#1e3a8a",
  longHair: true,
};

export const BUROCRATA_LOOK: Look = {
  hair: "#9ca3af",
  skin: "#e0ac69",
  shirt: "#374151",
  pants: "#1f2937",
  tie: "#b91c1c",
  briefcase: true,
  glasses: true,
};

const SHIRTS = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2", "#be123c", "#4d7c0f"];
const HAIRS = ["#3f2a1d", "#1f1f1f", "#b45309", "#e5e7eb", "#78350f", "#451a03"];
const SKINS = ["#f1c7a5", "#c68642", "#8d5524", "#ffdbac", "#e0ac69"];
const PANTS = ["#1e293b", "#4b5563", "#78350f", "#374151"];

export function npcLook(name: string, role: string): Look {
  const h = hashString(name + role);
  const look: Look = {
    hair: HAIRS[h % HAIRS.length],
    skin: SKINS[(h >>> 3) % SKINS.length],
    shirt: SHIRTS[(h >>> 6) % SHIRTS.length],
    pants: PANTS[(h >>> 9) % PANTS.length],
    longHair: (h >>> 12) % 3 === 0,
    glasses: (h >>> 15) % 4 === 0,
  };
  if (/Letra|Juez|Magistr|Catedr|Interventor|Presidente|Secretari|Abogad/i.test(role)) look.tie = "#111827";
  if (/Jef|Director|Inspector|Interventor/i.test(role)) look.briefcase = true;
  return look;
}

export const BOSS_LOOK: Record<BossStyle, Look> = {
  quorum: { hair: "#e5e7eb", skin: "#f1c7a5", shirt: "#1e3a8a", pants: "#111827", tie: "#fbbf24", longHair: true },
  stamp: { hair: "#374151", skin: "#d6a27a", shirt: "#7f1d1d", pants: "#111827", tie: "#111111" },
  judge: { hair: "#f8fafc", skin: "#e8b894", shirt: "#0f0f10", pants: "#0f0f10", longHair: true },
  inspector: { hair: "#7c2d12", skin: "#c68642", shirt: "#166534", pants: "#3f3f46", tie: "#fde047", glasses: true },
  cyber: { hair: "#22d3ee", skin: "#e0ac69", shirt: "#0f172a", pants: "#020617", tie: "#22d3ee" },
  stars: { hair: "#a16207", skin: "#f1c7a5", shirt: "#1d4ed8", pants: "#1e3a8a", hat: "#1e3a8a" },
};

export const TILE = 16;

export function drawSky(g: CanvasRenderingContext2D, th: Theme): void {
  const gr = g.createLinearGradient(0, 0, 0, 180);
  gr.addColorStop(0, th.sky[0]);
  gr.addColorStop(1, th.sky[1]);
  g.fillStyle = gr;
  g.fillRect(0, 0, 320, 180);
}

export function drawBackdrop(g: CanvasRenderingContext2D, th: Theme, camX: number): void {
  drawSky(g, th);
  // Skyline lejano (parallax lento)
  const far = camX * 0.25;
  g.fillStyle = th.far;
  for (let i = Math.floor(far / 36) - 1; i < Math.floor(far / 36) + 12; i++) {
    const x = i * 36 - far;
    const h = 40 + hashString(String(i)) % 50;
    g.fillRect(x, 150 - h, 30, 180);
  }
  // Monumentos (parallax medio)
  const mid = camX * 0.5;
  const span = 160;
  for (let i = Math.floor(mid / span) - 1; i < Math.floor(mid / span) + 4; i++) {
    drawProp(g, th.prop, th, i * span - mid + 40, i);
  }
}

function drawProp(g: CanvasRenderingContext2D, prop: Prop, th: Theme, x: number, i: number): void {
  const base = 150;
  switch (prop) {
    case "dome":
      g.fillStyle = th.mid;
      g.fillRect(x, base - 34, 80, 40);
      g.fillStyle = th.accent;
      g.beginPath();
      g.arc(x + 40, base - 34, 24, Math.PI, 0);
      g.fill();
      g.fillStyle = "#e2e8f0";
      for (let c = 0; c < 5; c++) g.fillRect(x + 8 + c * 15, base - 26, 4, 26);
      break;
    case "towers": {
      const h = 60 + (hashString(String(i)) % 40);
      g.fillStyle = th.mid;
      g.fillRect(x, base - h, 30, h + 30);
      g.fillStyle = th.accent;
      for (let wy = 0; wy < 4; wy++) for (let wx = 0; wx < 3; wx++) g.fillRect(x + 5 + wx * 8, base - h + 6 + wy * 12, 4, 5);
      g.fillStyle = "#ef4444";
      g.fillRect(x + 15, base - h - 14, 1, 14);
      g.fillRect(x + 16, base - h - 14, 8, 5);
      break;
    }
    case "books":
      for (let b = 0; b < 5; b++) {
        g.fillStyle = ["#7f1d1d", "#1e3a8a", "#14532d", "#78350f", "#4c1d95"][b];
        g.fillRect(x + b * 9, base - 40 - (b % 2) * 6, 8, 40 + (b % 2) * 6);
      }
      g.fillStyle = th.mid;
      g.fillRect(x - 4, base, 60, 4);
      break;
    case "coins":
      g.fillStyle = th.accent;
      for (let c = 0; c < 3; c++) {
        g.beginPath();
        g.arc(x + 12 + c * 20, base - 20 - c * 8, 9, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = th.mid;
      g.fillRect(x - 4, base, 70, 30);
      break;
    case "circuit":
      g.strokeStyle = th.groundTop;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(x, base - 10);
      g.lineTo(x + 20, base - 10);
      g.lineTo(x + 20, base - 40);
      g.lineTo(x + 60, base - 40);
      g.lineTo(x + 60, base - 20);
      g.lineTo(x + 90, base - 20);
      g.stroke();
      g.fillStyle = th.accent;
      g.fillRect(x + 18, base - 42, 4, 4);
      g.fillRect(x + 58, base - 22, 4, 4);
      break;
    case "stars":
      g.fillStyle = th.far;
      g.fillRect(x, base - 60, 50, 60);
      g.fillStyle = th.accent;
      for (let s = 0; s < 12; s++) {
        const a = (s / 12) * Math.PI * 2;
        g.fillRect(x + 25 + Math.cos(a) * 14 - 1, base - 30 + Math.sin(a) * 14 - 1, 2, 2);
      }
      break;
    case "fountain":
      g.fillStyle = th.mid;
      g.fillRect(x, base - 10, 70, 10);
      g.fillStyle = "#bae6fd";
      g.fillRect(x + 30, base - 40, 10, 30);
      g.fillRect(x + 22, base - 30, 26, 4);
      break;
    case "scales":
      g.fillStyle = th.mid;
      g.fillRect(x + 20, base - 60, 4, 60);
      g.fillStyle = th.accent;
      g.fillRect(x + 4, base - 60, 36, 3);
      g.fillRect(x + 2, base - 46, 8, 2);
      g.fillRect(x + 30, base - 46, 8, 2);
      break;
  }
}

export function drawTile(
  g: CanvasRenderingContext2D,
  c: string,
  x: number,
  y: number,
  th: Theme,
  t: number,
  aboveSolid: boolean,
): void {
  switch (c) {
    case "#":
      g.fillStyle = th.ground;
      g.fillRect(x, y, TILE, TILE);
      g.fillStyle = "rgba(0,0,0,0.18)";
      g.fillRect(x, y + 8, TILE, 1);
      g.fillRect(x + ((y / TILE) % 2 ? 4 : 10), y + 8, 1, 8);
      if (!aboveSolid) {
        g.fillStyle = th.groundTop;
        g.fillRect(x, y, TILE, 3);
      }
      break;
    case "B":
      g.fillStyle = th.brick;
      g.fillRect(x, y, TILE, TILE);
      g.fillStyle = "rgba(0,0,0,0.35)";
      g.fillRect(x, y + 7, TILE, 1);
      g.fillRect(x + 7, y, 1, 7);
      g.fillRect(x + 3, y + 8, 1, 8);
      break;
    case "Q":
      g.fillStyle = th.accent;
      g.fillRect(x, y, TILE, TILE);
      g.fillStyle = "#7c2d12";
      g.fillRect(x, y, TILE, 1);
      g.fillRect(x, y + TILE - 1, TILE, 1);
      g.fillRect(x, y, 1, TILE);
      g.fillRect(x + TILE - 1, y, 1, TILE);
      g.font = "bold 11px monospace";
      g.textAlign = "center";
      g.fillStyle = "#7c2d12";
      g.fillText("?", x + 8, y + 12);
      break;
    case "X":
      g.fillStyle = "#6b6b6b";
      g.fillRect(x, y, TILE, TILE);
      g.fillStyle = "#4b4b4b";
      g.fillRect(x + 2, y + 2, 2, 2);
      g.fillRect(x + 12, y + 12, 2, 2);
      break;
    case "=":
      g.fillStyle = "#a16207";
      g.fillRect(x, y, TILE, 5);
      g.fillStyle = "#fde68a";
      g.fillRect(x, y, TILE, 1);
      g.fillStyle = "#713f12";
      g.fillRect(x, y + 5, TILE, 1);
      break;
    case "R":
      g.fillStyle = "#94a3b8";
      g.fillRect(x + 1, y + 2, TILE - 2, TILE - 3);
      g.fillStyle = "#64748b";
      g.fillRect(x + 4, y + 6, 1, 4);
      g.fillRect(x + 10, y + 4, 1, 5);
      g.fillStyle = "#cbd5e1";
      g.fillRect(x + 2, y + 3, 4, 1);
      break;
    case "c": {
      const w = 3 + 4 * Math.abs(Math.cos(t / 14));
      g.fillStyle = "#a16207";
      g.fillRect(x + 8 - w / 2 - 0.5, y + 3, w + 1, 10);
      g.fillStyle = "#facc15";
      g.fillRect(x + 8 - w / 2, y + 4, w, 8);
      break;
    }
  }
}

export function drawGate(g: CanvasRenderingContext2D, x: number, groundY: number): void {
  g.fillStyle = "#7c2d12";
  g.fillRect(x, groundY - 48, 4, 48);
  g.fillRect(x + 52, groundY - 48, 4, 48);
  g.fillStyle = "#b45309";
  g.fillRect(x - 4, groundY - 56, 64, 12);
  g.fillStyle = "#fef08a";
  g.font = "bold 8px monospace";
  g.textAlign = "center";
  g.fillText("PRUEBA", x + 28, groundY - 47);
}

export function drawGoal(g: CanvasRenderingContext2D, x: number, groundY: number, t: number): void {
  g.fillStyle = "#e5e7eb";
  g.fillRect(x, groundY - 56, 2, 56);
  const wave = Math.sin(t / 8) * 2;
  g.fillStyle = "#facc15";
  g.beginPath();
  g.moveTo(x + 2, groundY - 56);
  g.lineTo(x + 22, groundY - 50 + wave);
  g.lineTo(x + 2, groundY - 44);
  g.fill();
}

// Caché de imágenes de la jugadora (Lucía)
const SPRITE_CACHE: Partial<Record<"walk" | "idle" | "cheer", HTMLImageElement>> = {};

function getSprite(key: "walk" | "idle" | "cheer"): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  if (!SPRITE_CACHE[key]) {
    const img = new Image();
    img.src = `/player/${key}.png`;
    SPRITE_CACHE[key] = img;
  }
  const img = SPRITE_CACHE[key];
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

export function drawPlayer(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  o: {
    flip?: boolean;
    state?: "idle" | "walk" | "jump" | "punch" | "cheer" | "hurt";
    t?: number;
    hurt?: boolean;
  } = {},
): void {
  const flip = o.flip ?? false;
  const state = o.state ?? "idle";
  const t = o.t ?? 0;

  let spriteName: "walk" | "idle" | "cheer" = "walk";
  if (state === "cheer" || state === "jump" || state === "punch") {
    spriteName = "cheer";
  } else if (state === "idle") {
    spriteName = "idle";
  } else {
    spriteName = "walk";
  }

  const sprite = getSprite(spriteName);
  if (!sprite) {
    drawPerson(g, x, y, PLAYER_LOOK, { flip, frame: Math.floor(t / 8) % 2, hurt: o.hurt });
    return;
  }

  g.save();
  if (o.hurt && t % 4 < 2) {
    g.globalAlpha = 0.35;
  }

  // Altura del sprite adaptada a la escala de 16px por bloque
  const targetH = spriteName === "idle" ? 22 : 24;
  const ratio = sprite.naturalWidth / sprite.naturalHeight;
  const targetW = Math.round(targetH * ratio);

  // Efecto de balanceo al caminar
  const bob = state === "walk" ? Math.abs(Math.sin(t / 3.5)) * 1.5 : 0;
  const drawY = y - targetH - bob;

  if (flip) {
    g.translate(x, drawY);
    g.scale(-1, 1);
    g.drawImage(sprite, -targetW / 2, 0, targetW, targetH);
  } else {
    g.translate(x, drawY);
    g.drawImage(sprite, -targetW / 2, 0, targetW, targetH);
  }
  g.restore();
}

// Dibuja una persona pixel-art con los pies en (x, y). Se usa para jugador (fallback), NPC, burócratas y jefes.
export function drawPerson(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  look: Look,
  o: { flip?: boolean; frame?: number; arm?: boolean; hurt?: boolean } = {},
): void {

  const f = o.flip ? -1 : 1;
  const fr = o.frame ?? 0;
  const rect = (dx: number, dy: number, w: number, h: number, color: string) => {
    g.fillStyle = color;
    const rx = f > 0 ? dx : -dx - w;
    g.fillRect(x + rx, y + dy, w, h);
  };
  const legShift = fr === 1 ? 1 : 0;
  rect(-3 + legShift, -5, 3, 5, look.pants);
  rect(0 - legShift, -5, 3, 5, look.pants);
  rect(-3 + legShift, -1, 3, 1, "#111827");
  rect(0 - legShift, -1, 3, 1, "#111827");
  rect(-4, -11, 8, 6, look.shirt);
  if (look.tie) rect(-1, -11, 2, 5, look.tie);
  const sw = fr === 1 ? 1 : -1;
  rect(-6, -10 + sw, 2, 5, look.shirt);
  if (o.arm) {
    rect(4, -12, 6, 2, look.shirt);
    rect(9, -13, 2, 3, look.skin);
  } else {
    rect(4, -10 - sw, 2, 5, look.shirt);
  }
  if (look.briefcase) rect(6, -6, 4, 4, "#78350f");
  rect(-3, -17, 6, 6, look.skin);
  rect(-3, -18, 6, 2, look.hair);
  rect(-3, -17, 1, 4, look.hair);
  rect(2, -17, 1, 4, look.hair);
  if (look.longHair) {
    rect(-4, -16, 1, 8, look.hair);
    rect(3, -16, 1, 8, look.hair);
  }
  if (o.hurt) {
    rect(-2, -14, 1, 1, "#111111");
    rect(1, -14, 1, 1, "#111111");
  } else {
    rect(-1, -14, 1, 1, "#111111");
    rect(1, -14, 1, 1, "#111111");
  }
  if (look.glasses) {
    rect(-2, -14, 4, 1, "#334155");
  }
  if (look.hat) {
    rect(-5, -19, 10, 2, look.hat);
    rect(-3, -21, 6, 2, look.hat);
  }
}

export function drawEnemy(
  g: CanvasRenderingContext2D,
  kind: Kind,
  x: number,
  y: number,
  dir: number,
  frame: number,
): void {
  if (kind === "burocrata") {
    drawPerson(g, x, y, BUROCRATA_LOOK, { flip: dir < 0, frame });
    return;
  }
  if (kind === "papeleo") {
    g.fillStyle = "#ffffff";
    g.fillRect(x - 5, y - 11, 10, 11);
    g.fillStyle = "#cbd5e1";
    g.fillRect(x - 5, y - 1, 10, 1);
    g.fillRect(x + 2, y - 11, 3, 3);
    g.fillStyle = "#94a3b8";
    g.fillRect(x - 3, y - 7, 6, 1);
    g.fillRect(x - 3, y - 4, 4, 1);
    g.fillStyle = "#111827";
    g.fillRect(x - 3, y - 9, 2, 1);
    g.fillRect(x + 1, y - 9, 2, 1);
    g.fillRect(x - 2, y - 8, 1, 1);
    g.fillRect(x + 2, y - 8, 1, 1);
    g.fillStyle = "#b91c1c";
    g.fillRect(x - 1, y - 6, 3, 1);
    g.fillStyle = "#111827";
    g.fillRect(x - 3 + (frame ? 0 : 1), y, 2, 2);
    g.fillRect(x + 1 - (frame ? 0 : 1), y, 2, 2);
    return;
  }
  if (kind === "sello") {
    g.fillStyle = "#7f1d1d";
    g.fillRect(x - 3, y - 11, 6, 4);
    g.fillStyle = "#dc2626";
    g.fillRect(x - 6, y - 7, 12, 6);
    g.fillStyle = "#fca5a5";
    g.fillRect(x - 4, y - 5, 8, 1);
    g.fillStyle = "#7f1d1d";
    g.fillRect(x - 6, y - 1, 12, 1);
    return;
  }
  // silencio (fantasma)
  g.fillStyle = "rgba(226,232,240,0.92)";
  g.beginPath();
  g.arc(x, y - 10, 6, Math.PI, 0);
  g.fillRect(x - 6, y - 10, 12, 8);
  g.fillStyle = "rgba(226,232,240,0.92)";
  for (let i = 0; i < 3; i++) g.fillRect(x - 6 + i * 4, y - 2 + ((i + frame) % 2), 4, 2);
  g.fillStyle = "#334155";
  g.fillRect(x - 3, y - 8, 2, 1);
  g.fillRect(x + 1, y - 8, 2, 1);
  g.fillRect(x - 1, y - 5, 2, 1);
}

export function drawBoss(
  g: CanvasRenderingContext2D,
  style: BossStyle,
  x: number,
  y: number,
  flip: boolean,
  t: number,
  flash: number,
): void {
  const look = BOSS_LOOK[style];
  g.save();
  g.translate(x, y + Math.sin(t / 25) * 1);
  g.scale(3, 3);
  drawPerson(g, 0, 0, look, { flip, frame: Math.floor(t / 20) % 2, arm: true });
  switch (style) {
    case "quorum":
      g.fillStyle = "#fbbf24";
      g.fillRect(6, -10, 3, 2);
      g.fillRect(7, -8, 1, 3);
      break;
    case "stamp":
      g.fillStyle = "#b91c1c";
      g.fillRect(-6, -30, 12, 5);
      g.fillStyle = "#7f1d1d";
      g.fillRect(-2, -34, 4, 4);
      break;
    case "judge":
      g.fillStyle = "#92400e";
      g.fillRect(6, -14, 4, 2);
      g.fillRect(9, -14, 1, 6);
      g.fillStyle = "#f8fafc";
      g.fillRect(-5, -10, 2, 3);
      g.fillRect(3, -10, 2, 3);
      break;
    case "inspector":
      g.fillStyle = "#78350f";
      g.fillRect(-5, -20, 10, 2);
      g.fillRect(-3, -22, 6, 2);
      g.strokeStyle = "#93c5fd";
      g.lineWidth = 0.6;
      g.beginPath();
      g.arc(9, -11, 2.2, 0, Math.PI * 2);
      g.stroke();
      g.fillStyle = "#78350f";
      g.fillRect(9, -9, 1, 3);
      break;
    case "cyber":
      g.fillStyle = "#0f172a";
      g.fillRect(-7, -30, 14, 9);
      g.strokeStyle = "#22d3ee";
      g.lineWidth = 0.5;
      g.strokeRect(-7, -30, 14, 9);
      g.fillStyle = "#22d3ee";
      g.fillRect(-5, -28, 8, 1);
      g.fillRect(-5, -25, 5 + (Math.floor(t / 15) % 4), 1);
      g.fillStyle = "#fde047";
      g.fillRect(-5, -19, 10, 1);
      g.fillRect(-5, -20, 10, 1);
      break;
    case "stars":
      g.fillStyle = "#fde047";
      for (let s = 0; s < 12; s++) {
        const a = (s / 12) * Math.PI * 2 + t / 60;
        g.fillRect(Math.cos(a) * 2.5 - 0.5, -8 + Math.sin(a) * 2.5 - 0.5, 1, 1);
      }
      break;
  }
  g.restore();
  if (flash > 0) {
    g.globalAlpha = 0.55;
    g.fillStyle = "#ffffff";
    g.fillRect(x - 18, y - 52, 36, 54);
    g.globalAlpha = 1;
  }
}

export function drawProjectile(g: CanvasRenderingContext2D, x: number, y: number, t: number): void {
  g.fillStyle = "#ffffff";
  g.fillRect(x - 3, y - 2 + Math.sin(t / 4), 6, 4);
  g.fillStyle = "#94a3b8";
  g.fillRect(x - 2, y, 4, 1);
}
