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

const SHIRTS = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2", "#be123c", "#4d7c0f"];
const HAIRS = ["#3f2a1d", "#1f1f1f", "#b45309", "#e5e7eb", "#78350f", "#451a03"];
const SKINS = ["#f1c7a5", "#c68642", "#8d5524", "#ffdbac", "#e0ac69"];
const PANTS = ["#1e293b", "#4b5563", "#78350f", "#374151"];

export function npcLook(name: string, role: string): Look {
  const h = hashString(name + role);
  return {
    hair: HAIRS[h % HAIRS.length],
    skin: SKINS[(h >>> 3) % SKINS.length],
    shirt: SHIRTS[(h >>> 6) % SHIRTS.length],
    pants: PANTS[(h >>> 9) % PANTS.length],
    hat: (h >>> 12) % 4 === 0 ? "#1e293b" : undefined,
    tie: (h >>> 14) % 3 === 0 ? "#b91c1c" : undefined,
    briefcase: (h >>> 16) % 2 === 0,
    longHair: (h >>> 17) % 2 === 0,
    glasses: (h >>> 18) % 3 === 0,
  };
}

export type Kind = "papeleo" | "sello" | "silencio" | "burocrata";

export const TILE = 16;

// ==========================================
// CACHÉ DE FONDOS PANORÁMICOS 3D PIXAR
// ==========================================
const BG_CACHE: Partial<Record<string, HTMLImageElement>> = {};
const BG_MAP: Record<string, string> = {
  plaza: "/backgrounds/plaza.jpg",
  congreso: "/backgrounds/cortes.jpg",
  europa: "/backgrounds/bruselas.jpg",
  ministerio: "/backgrounds/moncloa.jpg",
  procedimiento: "/backgrounds/justicia.jpg",
  inap: "/backgrounds/funcion.jpg",
  hacienda: "/backgrounds/hacienda.jpg",
  tribunal: "/backgrounds/inap.jpg",
};

function getBackground(key: string): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  const path = BG_MAP[key] ?? "/backgrounds/plaza.jpg";
  if (!BG_CACHE[key]) {
    const img = new Image();
    img.src = path;
    BG_CACHE[key] = img;
  }
  const img = BG_CACHE[key];
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

// ==========================================
// CACHÉ DE RETRATOS DE PERSONAJES 3D PIXAR
// ==========================================
const PORTRAIT_CACHE: Record<string, HTMLImageElement> = {};
const PORTRAIT_PATHS: Record<string, string> = {
  ramon: "/characters/don_ramon.jpg",
  quorum: "/characters/senor_quorum.jpg",
  comisario: "/characters/comisario_ue.jpg",
  jueza: "/characters/jueza_alzada.jpg",
  interventor: "/characters/gran_interventor.jpg",
  tribunal: "/characters/tribunal_calificador.jpg",
  avatar: "/player/avatar.png",
};

function getPortraitImg(key: string): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  const path = PORTRAIT_PATHS[key];
  if (!path) return null;
  if (!PORTRAIT_CACHE[key]) {
    const img = new Image();
    img.src = path;
    PORTRAIT_CACHE[key] = img;
  }
  const img = PORTRAIT_CACHE[key];
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

export function getNpcPortraitKey(name: string, role: string): string {
  const s = (name + " " + role).toLowerCase();
  if (s.includes("ramón") || s.includes("ramon") || s.includes("conserje")) return "ramon";
  if (s.includes("quórum") || s.includes("quorum") || s.includes("congreso") || s.includes("diputad")) return "quorum";
  if (s.includes("bruselas") || s.includes("comisario") || s.includes("unión") || s.includes("europea")) return "comisario";
  if (s.includes("juez") || s.includes("alzada") || s.includes("magistrad") || s.includes("justicia")) return "jueza";
  if (s.includes("interventor") || s.includes("hacienda") || s.includes("tribut") || s.includes("inspector")) return "interventor";
  if (s.includes("tribunal") || s.includes("calificador") || s.includes("presidenta")) return "tribunal";
  // Alternativas temáticas para los demás preparadores
  const h = hashString(name);
  const pool = ["ramon", "jueza", "comisario", "quorum", "interventor"];
  return pool[h % pool.length];
}

// ==========================================
// CACHÉ DE SPRITES DE LA JUGADORA (LUCÍA)
// ==========================================
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

// ==========================================
// DIBUJO DE FONDOS TEMÁTICOS REALISTAS
// ==========================================
export function drawSky(g: CanvasRenderingContext2D, th: Theme): void {
  const gr = g.createLinearGradient(0, 0, 0, 180);
  gr.addColorStop(0, th.sky[0]);
  gr.addColorStop(1, th.sky[1]);
  g.fillStyle = gr;
  g.fillRect(0, 0, 320, 180);
}

export function drawBackdrop(g: CanvasRenderingContext2D, th: Theme, camX: number): void {
  const bg = getBackground(th.key);
  if (bg) {
    // Parallax panorámico suave con la imagen 3D generada
    const drawH = 180;
    const imgRatio = bg.naturalWidth / bg.naturalHeight;
    const drawW = drawH * imgRatio;
    const speed = 0.12;
    const offset = -(camX * speed) % drawW;

    g.drawImage(bg, offset, 0, drawW, drawH);
    if (offset + drawW < 320) {
      g.drawImage(bg, offset + drawW, 0, drawW, drawH);
    }

    // Degradado sutil en la parte inferior para dar profundidad y contraste a las plataformas
    const groundShadow = g.createLinearGradient(0, 130, 0, 180);
    groundShadow.addColorStop(0, "rgba(0,0,0,0)");
    groundShadow.addColorStop(1, "rgba(0,0,0,0.4)");
    g.fillStyle = groundShadow;
    g.fillRect(0, 130, 320, 50);
  } else {
    // Fallback decorativo con cielo y siluetas
    drawSky(g, th);
    const far = camX * 0.25;
    g.fillStyle = th.far;
    for (let i = Math.floor(far / 40) - 1; i < Math.floor(far / 40) + 12; i++) {
      const x = i * 40 - far;
      const h = 50 + (hashString(String(i)) % 55);
      g.fillRect(x, 150 - h, 34, 180);
    }
  }
}

// ==========================================
// DIBUJO DE BALDOSAS Y ELEMENTOS 3D
// ==========================================
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
    case "#": {
      // Suelo ministerial: losas de granito con biseles de luz y sombra
      g.fillStyle = th.ground;
      g.fillRect(x, y, TILE, TILE);

      // Bisel de luz superior / lateral
      g.fillStyle = "rgba(255,255,255,0.22)";
      g.fillRect(x, y, TILE, 1);
      g.fillRect(x, y, 1, TILE);

      // Bisel de sombra
      g.fillStyle = "rgba(0,0,0,0.3)";
      g.fillRect(x, y + TILE - 1, TILE, 1);
      g.fillRect(x + TILE - 1, y, 1, TILE);

      // Líneas sutiles de baldosas
      g.fillStyle = "rgba(0,0,0,0.15)";
      g.fillRect(x, y + 8, TILE, 1);
      g.fillRect(x + ((y / TILE) % 2 ? 4 : 12), y + 8, 1, 8);

      // Hierba cuidada institucional en la superficie exterior
      if (!aboveSolid) {
        g.fillStyle = th.groundTop;
        g.fillRect(x, y, TILE, 3);
        // Pequeñas briznas de hierba para acabado orgánico
        g.fillStyle = "#84cc16";
        for (let i = 2; i < TILE; i += 4) {
          g.fillRect(x + i, y - 1, 2, 2);
        }
      }
      break;
    }

    case "B": {
      // Bloques de piedra arquitectónica / mármol
      g.fillStyle = th.brick;
      g.fillRect(x, y, TILE, TILE);

      // Relieve 3D biselado
      g.fillStyle = "rgba(255,255,255,0.3)";
      g.fillRect(x, y, TILE, 1);
      g.fillRect(x, y, 1, TILE);
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.fillRect(x, y + TILE - 1, TILE, 1);
      g.fillRect(x + TILE - 1, y, 1, TILE);

      // Junta de cantería
      g.fillStyle = "rgba(0,0,0,0.25)";
      g.fillRect(x, y + 7, TILE, 1);
      g.fillRect(x + 8, y, 1, 7);
      break;
    }

    case "Q": {
      // Bloque '?' estilo cubo de latón dorado 3D con remaches y brillo
      const pulse = Math.sin(t / 8) * 0.15 + 0.85;

      // Cara base dorada metálica
      const grad = g.createLinearGradient(x, y, x + TILE, y + TILE);
      grad.addColorStop(0, "#fef08a");
      grad.addColorStop(0.5, "#f59e0b");
      grad.addColorStop(1, "#b45309");
      g.fillStyle = grad;
      g.fillRect(x, y, TILE, TILE);

      // Bisel de luz superior e izquierdo
      g.fillStyle = "rgba(255,255,255,0.6)";
      g.fillRect(x, y, TILE, 2);
      g.fillRect(x, y, 2, TILE);

      // Bisel de sombra inferior y derecho
      g.fillStyle = "rgba(120,53,15,0.8)";
      g.fillRect(x, y + TILE - 2, TILE, 2);
      g.fillRect(x + TILE - 2, y, 2, TILE);

      // 4 remaches en las esquinas
      g.fillStyle = "#78350f";
      g.fillRect(x + 2, y + 2, 2, 2);
      g.fillRect(x + TILE - 4, y + 2, 2, 2);
      g.fillRect(x + 2, y + TILE - 4, 2, 2);
      g.fillRect(x + TILE - 4, y + TILE - 4, 2, 2);

      // Símbolo '?' grabado en 3D con halo
      g.save();
      g.shadowColor = `rgba(253, 224, 71, ${pulse})`;
      g.shadowBlur = 6;
      g.font = "bold 12px sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = "#78350f";
      g.fillText("?", x + TILE / 2 + 0.5, y + TILE / 2 + 1);
      g.fillStyle = "#fef08a";
      g.fillText("?", x + TILE / 2, y + TILE / 2);
      g.restore();
      break;
    }

    case "X": {
      // Bloque metálico inerte tras responder
      g.fillStyle = "#4b5563";
      g.fillRect(x, y, TILE, TILE);
      g.fillStyle = "rgba(255,255,255,0.2)";
      g.fillRect(x, y, TILE, 1);
      g.fillRect(x, y, 1, TILE);
      g.fillStyle = "rgba(0,0,0,0.5)";
      g.fillRect(x, y + TILE - 1, TILE, 1);
      g.fillRect(x + TILE - 1, y, 1, TILE);
      g.fillStyle = "#1f2937";
      g.fillRect(x + 4, y + 4, 2, 2);
      g.fillRect(x + TILE - 6, y + 4, 2, 2);
      g.fillRect(x + 4, y + TILE - 6, 2, 2);
      g.fillRect(x + TILE - 6, y + TILE - 6, 2, 2);
      break;
    }

    case "=": {
      // Plataforma flotante de caoba con herrajes dorados
      g.fillStyle = "#78350f";
      g.fillRect(x, y, TILE, 6);
      g.fillStyle = "#facc15";
      g.fillRect(x, y, TILE, 1.5);
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.fillRect(x, y + 5, TILE, 1.5);
      break;
    }

    case "R": {
      // Roca de granito tallada
      g.fillStyle = "#64748b";
      g.beginPath();
      g.roundRect(x + 1, y + 1, TILE - 2, TILE - 2, 3);
      g.fill();
      g.fillStyle = "#94a3b8";
      g.fillRect(x + 3, y + 2, 4, 2);
      g.fillStyle = "#334155";
      g.fillRect(x + 4, y + 8, 8, 1);
      break;
    }

    case "c": {
      // MONEDA DE EURO 3D DORADA CON SÍMBOLO '€' Y GIRO PERSPECTIVO
      const floatY = Math.sin(t / 6) * 1.5;
      const rot = Math.abs(Math.cos(t / 10));
      const w = Math.max(2, 10 * rot);
      const cx = x + TILE / 2;
      const cy = y + TILE / 2 + floatY;

      g.save();
      // Sombra sutil de la moneda
      g.fillStyle = "rgba(0,0,0,0.2)";
      g.beginPath();
      g.ellipse(cx, y + TILE - 1, 5 * rot, 1.5, 0, 0, Math.PI * 2);
      g.fill();

      // Borde exterior metálico
      g.fillStyle = "#b45309";
      g.beginPath();
      g.ellipse(cx, cy, w / 2, 5.5, 0, 0, Math.PI * 2);
      g.fill();

      // Cara interna dorada reflectante
      const coinGrad = g.createRadialGradient(cx - w / 4, cy - 2, 1, cx, cy, 5.5);
      coinGrad.addColorStop(0, "#fef08a");
      coinGrad.addColorStop(0.7, "#facc15");
      coinGrad.addColorStop(1, "#eab308");
      g.fillStyle = coinGrad;
      g.beginPath();
      g.ellipse(cx, cy, (w - 1.5) / 2, 4.5, 0, 0, Math.PI * 2);
      g.fill();

      // Símbolo '€' en la cara cuando está visible
      if (rot > 0.45) {
        g.font = `bold ${Math.round(8 * rot)}px sans-serif`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "#78350f";
        g.fillText("€", cx, cy + 0.5);
      }
      g.restore();
      break;
    }
  }
}

// Puerta de examen / final de tema
export function drawGate(g: CanvasRenderingContext2D, x: number, groundY: number): void {
  // Columnas neoclásicas
  g.fillStyle = "#cbd5e1";
  g.fillRect(x, groundY - 52, 6, 52);
  g.fillRect(x + 50, groundY - 52, 6, 52);

  // Cornisa superior dorada
  g.fillStyle = "#b45309";
  g.fillRect(x - 4, groundY - 60, 64, 10);
  g.fillStyle = "#fde047";
  g.fillRect(x - 4, groundY - 60, 64, 2);

  g.font = "bold 8px sans-serif";
  g.textAlign = "center";
  g.fillStyle = "#ffffff";
  g.fillText("🏛️ PRUEBA", x + 28, groundY - 52);
}

// Meta del tutorial (Plaza)
export function drawGoal(g: CanvasRenderingContext2D, x: number, groundY: number, t: number): void {
  g.fillStyle = "#94a3b8";
  g.fillRect(x, groundY - 56, 3, 56);
  const wave = Math.sin(t / 8) * 3;
  g.fillStyle = "#ef4444";
  g.beginPath();
  g.moveTo(x + 3, groundY - 56);
  g.lineTo(x + 24, groundY - 48 + wave);
  g.lineTo(x + 3, groundY - 40);
  g.fill();
  g.fillStyle = "#facc15";
  g.fillRect(x + 3, groundY - 50 + wave * 0.5, 14, 4);
}

// ==========================================
// DIBUJO DE LA JUGADORA (LUCÍA) EN ALTA DEFINICIÓN
// ==========================================
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

  g.save();

  // Sombra suave en el suelo bajo los pies de Lucía
  g.fillStyle = "rgba(0,0,0,0.3)";
  g.beginPath();
  g.ellipse(x, y - 0.5, 7, 2, 0, 0, Math.PI * 2);
  g.fill();

  if (o.hurt && t % 4 < 2) {
    g.globalAlpha = 0.35;
  }

  // Altura mejorada y nítida
  const targetH = spriteName === "idle" ? 26 : 28;

  if (sprite) {
    const ratio = sprite.naturalWidth / sprite.naturalHeight;
    const targetW = Math.round(targetH * ratio);
    const bob = state === "walk" ? Math.abs(Math.sin(t / 3.5)) * 1.8 : 0;
    const drawY = y - targetH - bob;

    if (flip) {
      g.translate(x, drawY);
      g.scale(-1, 1);
      g.drawImage(sprite, -targetW / 2, 0, targetW, targetH);
    } else {
      g.translate(x, drawY);
      g.drawImage(sprite, -targetW / 2, 0, targetW, targetH);
    }
  } else {
    // Fallback estilizado si la imagen no está lista
    g.fillStyle = "#f472b6";
    g.fillRect(x - 5, y - 24, 10, 24);
  }
  g.restore();
}

// ==========================================
// DIBUJO DE NPCS CON RETRATOS 3D PIXAR REALISTAS
// ==========================================
export function drawNPC(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  name: string,
  role: string,
  t: number,
): void {
  const portraitKey = getNpcPortraitKey(name, role);
  const portraitImg = getPortraitImg(portraitKey);
  const hover = Math.sin(t / 14) * 1.5;
  const radius = 13;
  const centerY = y - 18 + hover;

  g.save();

  // Sombra en el suelo
  g.fillStyle = "rgba(0,0,0,0.35)";
  g.beginPath();
  g.ellipse(x, y - 1, 10, 2.5, 0, 0, Math.PI * 2);
  g.fill();

  // Pedestal ministerial de mármol y oro bajo el medallón
  g.fillStyle = "#cbd5e1";
  g.fillRect(x - 5, y - 6, 10, 5);
  g.fillStyle = "#f59e0b";
  g.fillRect(x - 7, y - 2, 14, 2);

  // Halo brillante exterior
  g.shadowColor = "rgba(250, 204, 21, 0.75)";
  g.shadowBlur = 8;
  g.fillStyle = "#f59e0b";
  g.beginPath();
  g.arc(x, centerY, radius + 2, 0, Math.PI * 2);
  g.fill();

  // Borde dorado metálico
  g.shadowBlur = 0;
  g.fillStyle = "#b45309";
  g.beginPath();
  g.arc(x, centerY, radius + 1, 0, Math.PI * 2);
  g.fill();

  // Retrato 3D Pixar recortado en círculo
  g.save();
  g.beginPath();
  g.arc(x, centerY, radius, 0, Math.PI * 2);
  g.clip();

  if (portraitImg) {
    g.drawImage(portraitImg, x - radius, centerY - radius, radius * 2, radius * 2);
  } else {
    // Fondo de color con inicial si la imagen aún carga
    g.fillStyle = "#1e3a8a";
    g.fillRect(x - radius, centerY - radius, radius * 2, radius * 2);
    g.fillStyle = "#ffffff";
    g.font = "bold 12px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(name.charAt(0), x, centerY);
  }
  g.restore();

  // Etiqueta flotante superior "💬 [HABLAR]"
  const promptY = centerY - radius - 5;
  g.fillStyle = "rgba(15, 23, 42, 0.85)";
  g.beginPath();
  g.roundRect(x - 22, promptY - 8, 44, 11, 4);
  g.fill();
  g.strokeStyle = "#facc15";
  g.lineWidth = 0.8;
  g.stroke();

  g.font = "bold 6.5px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#facc15";
  g.fillText("💬 HABLAR", x, promptY - 2.5);

  g.restore();
}

// ==========================================
// DIBUJO DE JEFES CON RETRATO 3D Y AURA DE PODER
// ==========================================
export function drawBoss(
  g: CanvasRenderingContext2D,
  style: BossStyle,
  x: number,
  y: number,
  flip: boolean,
  t: number,
  flash: number,
): void {
  let portraitKey = "quorum";
  let auraColor = "rgba(250, 204, 21, 0.8)";
  let bossTitle = "Señor Quórum";

  if (style === "judge") {
    portraitKey = "jueza";
    auraColor = "rgba(248, 113, 113, 0.85)";
    bossTitle = "Jueza de Alzada";
  } else if (style === "inspector") {
    portraitKey = "interventor";
    auraColor = "rgba(52, 211, 153, 0.85)";
    bossTitle = "Gran Interventor";
  } else if (style === "cyber" || style === "stars") {
    portraitKey = "comisario";
    auraColor = "rgba(56, 189, 248, 0.85)";
    bossTitle = "Comisario UE";
  } else if (style === "stamp") {
    portraitKey = "tribunal";
    auraColor = "rgba(192, 132, 252, 0.9)";
    bossTitle = "Tribunal Calificador";
  }

  const portraitImg = getPortraitImg(portraitKey);
  const hover = Math.sin(t / 12) * 3;
  const radius = 22;
  const centerY = y - 28 + hover;

  g.save();

  // Sombra amenazante en el suelo
  g.fillStyle = "rgba(0,0,0,0.45)";
  g.beginPath();
  g.ellipse(x, y - 1, 18, 4.5, 0, 0, Math.PI * 2);
  g.fill();

  // Aura pulsante de energía del jefe
  const pulse = Math.sin(t / 6) * 4;
  g.shadowColor = auraColor;
  g.shadowBlur = 14 + pulse;
  g.fillStyle = auraColor;
  g.beginPath();
  g.arc(x, centerY, radius + 3, 0, Math.PI * 2);
  g.fill();

  // Borde dorado ornamentado
  g.shadowBlur = 0;
  g.fillStyle = "#b45309";
  g.beginPath();
  g.arc(x, centerY, radius + 2, 0, Math.PI * 2);
  g.fill();

  // Retrato 3D Pixar circular
  g.save();
  g.beginPath();
  g.arc(x, centerY, radius, 0, Math.PI * 2);
  g.clip();

  if (portraitImg) {
    g.drawImage(portraitImg, x - radius, centerY - radius, radius * 2, radius * 2);
  } else {
    g.fillStyle = "#1e1b4b";
    g.fillRect(x - radius, centerY - radius, radius * 2, radius * 2);
    g.fillStyle = "#ffffff";
    g.font = "bold 16px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("JEFE", x, centerY);
  }
  g.restore();

  // Destello blanco al recibir daño
  if (flash > 0) {
    g.fillStyle = "rgba(255, 255, 255, 0.75)";
    g.beginPath();
    g.arc(x, centerY, radius + 2, 0, Math.PI * 2);
    g.fill();
  }

  // Cartel con nombre del Jefe
  const badgeY = centerY - radius - 7;
  g.fillStyle = "rgba(15, 23, 42, 0.9)";
  g.beginPath();
  g.roundRect(x - 30, badgeY - 8, 60, 12, 4);
  g.fill();
  g.strokeStyle = "#f87171";
  g.lineWidth = 1;
  g.stroke();

  g.font = "bold 7px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#fca5a5";
  g.fillText(`👹 ${bossTitle}`, x, badgeY - 2);

  g.restore();
}

// ==========================================
// DIBUJO DE ENEMIGOS BUROCRÁTICOS 3D
// ==========================================
export function drawEnemy(
  g: CanvasRenderingContext2D,
  kind: Kind,
  x: number,
  y: number,
  dir: number,
  frame: number,
): void {
  g.save();

  // Sombra
  g.fillStyle = "rgba(0,0,0,0.25)";
  g.beginPath();
  g.ellipse(x, y - 0.5, 6, 2, 0, 0, Math.PI * 2);
  g.fill();

  if (kind === "papeleo") {
    // Carpeta de expediente administrativo con sello rojo
    g.fillStyle = "#f8fafc";
    g.beginPath();
    g.roundRect(x - 6, y - 12, 12, 11, 2);
    g.fill();
    g.strokeStyle = "#94a3b8";
    g.lineWidth = 0.8;
    g.stroke();

    // Cinta y sello oficial rojo
    g.fillStyle = "#ef4444";
    g.fillRect(x - 6, y - 7, 12, 2);
    g.beginPath();
    g.arc(x + 2, y - 6, 3, 0, Math.PI * 2);
    g.fill();

    // Ojitos caricatura
    g.fillStyle = "#0f172a";
    g.fillRect(x - 3, y - 10, 2, 2);
    g.fillRect(x + 2, y - 10, 2, 2);
  } else if (kind === "sello") {
    // Sello ministerial de madera con mango de latón
    g.fillStyle = "#f59e0b";
    g.fillRect(x - 2, y - 13, 4, 4); // Pomo latón
    g.fillStyle = "#78350f";
    g.fillRect(x - 4, y - 9, 8, 4); // Mango madera
    g.fillStyle = "#dc2626";
    g.beginPath();
    g.roundRect(x - 7, y - 5, 14, 5, 1); // Base caucho
    g.fill();
  } else if (kind === "burocrata") {
    // Maletín ejecutivo de piel con herrajes dorados
    g.fillStyle = "#451a03";
    g.beginPath();
    g.roundRect(x - 7, y - 11, 14, 10, 2);
    g.fill();
    g.fillStyle = "#facc15";
    g.fillRect(x - 1.5, y - 9, 3, 3); // Cerradura oro
    g.fillStyle = "#ffffff";
    g.fillRect(x + 2, y - 13, 4, 3); // Papeles asomando
  } else {
    // Silencio administrativo (fantasma flotante)
    g.fillStyle = "rgba(224, 242, 254, 0.85)";
    g.beginPath();
    g.arc(x, y - 9, 6, Math.PI, 0);
    g.lineTo(x + 6, y - 2);
    g.lineTo(x - 6, y - 2);
    g.closePath();
    g.fill();
    g.fillStyle = "#0369a1";
    g.fillRect(x - 3, y - 8, 2, 2);
    g.fillRect(x + 1, y - 8, 2, 2);
  }

  g.restore();
}

// Proyectiles (sellos DENEGADO / papel)
export function drawProjectile(g: CanvasRenderingContext2D, x: number, y: number, t: number): void {
  g.save();
  g.fillStyle = "#ef4444";
  g.beginPath();
  g.roundRect(x - 4, y - 3, 8, 6, 2);
  g.fill();
  g.font = "bold 4.5px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#ffffff";
  g.fillText("LEY", x, y);
  g.restore();
}
