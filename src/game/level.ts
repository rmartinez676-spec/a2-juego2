import { rng } from "./rand";
import type { Kind } from "./render";

export const LEVEL_H = 12;
export const GROUND = 10;
const TILE = 16;

export interface EnemySpawn {
  kind: Kind;
  x: number;
  y: number;
}

export interface NpcSpawn {
  x: number;
  y: number;
}

export interface LevelData {
  w: number;
  rows: string[];
  enemies: EnemySpawn[];
  npcs: NpcSpawn[];
  start: { x: number; y: number };
  goalX: number;
  bossX: number;
}

export interface LevelOpts {
  arena: boolean;
  length: number;
  qBlocks: number;
  enemyRate: number;
  npcs: number;
}

// Genera un nivel de plataformas por tramos: llano, fosos, escalones, plataformas con bloques "?",
// muros de rocas y enemigos. Todo determinista a partir de la semilla.
export function generateLevel(seed: number, o: LevelOpts): LevelData {
  const r = rng(seed);
  const W = o.arena ? 44 : o.length;
  const grid: string[][] = Array.from({ length: LEVEL_H }, () => new Array<string>(W).fill("."));
  const colTop: number[] = new Array<number>(W).fill(GROUND);
  const flatCols: number[] = [];
  const enemies: EnemySpawn[] = [];
  let qLeft = o.qBlocks;
  let top = GROUND;
  let x = 0;

  const set = (cx: number, cy: number, c: string) => {
    if (cx >= 0 && cx < W && cy >= 0 && cy < LEVEL_H) grid[cy][cx] = c;
  };

  const pickKind = (): Kind => {
    const v = r();
    if (v < 0.45) return "papeleo";
    if (v < 0.6) return "sello";
    if (v < 0.8) return "silencio";
    return "burocrata";
  };

  const spawnEnemy = (cx: number, groundTop: number) => {
    const kind = pickKind();
    enemies.push({
      kind,
      x: cx * TILE,
      y: kind === "silencio" ? (groundTop - 4) * TILE : (groundTop - 1) * TILE,
    });
  };

  const flatRun = (len: number, enemyChance: number) => {
    const s = x;
    for (let i = 0; i < len && x < W - 14; i++, x++) {
      colTop[x] = top;
      flatCols.push(x);
    }
    for (let c = s + 2; c < x - 1; c += 3) {
      if (r() < 0.3) set(c, top - 2, "c");
    }
    if (x - s > 4 && r() < enemyChance) spawnEnemy(s + Math.floor((x - s) / 2), top);
  };

  if (o.arena) {
    for (let cy = 0; cy < LEVEL_H; cy++) {
      set(0, cy, "#");
      set(W - 1, cy, "#");
    }
    x = W;
  } else {
    flatRun(12, 0);
    while (x < W - 16) {
      const v = r();
      if (v < 0.3) {
        flatRun(5 + Math.floor(r() * 6), o.enemyRate);
      } else if (v < 0.42 && x > 14) {
        const width = 2 + (r() < 0.4 ? 1 : 0);
        for (let i = 0; i < width && x < W - 16; i++, x++) colTop[x] = -1;
        flatRun(3, 0);
      } else if (v < 0.55) {
        top = Math.max(8, Math.min(10, top + (r() < 0.5 ? -1 : 1)));
        flatRun(4 + Math.floor(r() * 3), o.enemyRate);
      } else if (v < 0.82) {
        // Estructura estilo Super Mario: bloques flotantes '?' y ladrillos 'B' con salto despejado
        const len = 5 + Math.floor(r() * 4);
        const s = x;
        for (let i = 0; i < len && x < W - 16; i++, x++) {
          colTop[x] = top;
          flatCols.push(x);
        }
        for (let c = s + 1; c < x - 1; c++) {
          if ((c - s) % 2 === 1 && qLeft > 0 && r() < 0.85) {
            set(c, top - 3, "Q");
            qLeft--;
          } else if (r() < 0.6) {
            set(c, top - 3, "B");
          }
          // Monedas de Euro flotando sobre algunos bloques
          if (r() < 0.35) set(c, top - 5, "c");
        }
      } else {
        flatRun(3, 0);
        colTop[x] = top;
        set(x, top - 1, "R");
        x++;
        flatRun(3, 0);
      }
    }
    while (x < W) {
      colTop[x] = top;
      flatCols.push(x);
      x++;
    }
  }

  for (let cx = 0; cx < W; cx++) {
    const t = colTop[cx];
    if (t < 0) continue;
    for (let cy = t; cy < LEVEL_H; cy++) grid[cy][cx] = "#";
  }

  // Q extra garantizados a lo largo del nivel siempre a la altura perfecta para saltar y golpear
  if (!o.arena) {
    for (let k = 0; qLeft > 0 && k < flatCols.length; k += 6) {
      const cx = flatCols[k];
      if (cx > 15 && cx < W - 20 && colTop[cx] >= 8 && grid[colTop[cx] - 3][cx] === ".") {
        set(cx, colTop[cx] - 3, "Q");
        qLeft--;
      }
    }
  }

  const npcs: NpcSpawn[] = [];
  if (!o.arena && o.npcs > 0) {
    const candidates = flatCols.filter(
      (c) => c >= 8 && c < W - 22 && colTop[c] >= 0 && colTop[c - 1] === colTop[c] && colTop[c + 1] === colTop[c],
    );
    for (let k = 0; k < o.npcs && candidates.length > 0; k++) {
      const target = 8 + Math.floor(((W - 30) * k) / o.npcs);
      let best = candidates[0];
      for (const c of candidates) {
        if (Math.abs(c - target) < Math.abs(best - target)) best = c;
      }
      npcs.push({ x: best * TILE + 8, y: colTop[best] * TILE });
      for (let i = candidates.length - 1; i >= 0; i--) {
        if (Math.abs(candidates[i] - best) < 8) candidates.splice(i, 1);
      }
    }
  }

  // Quitar enemigos que caen justo encima de un NPC
  const safeEnemies = enemies.filter((e) => !npcs.some((n) => Math.abs(n.x - e.x) < 24));

  return {
    w: W,
    rows: grid.map((row) => row.join("")),
    enemies: safeEnemies,
    npcs,
    start: { x: 3 * TILE, y: GROUND * TILE - 15 },
    goalX: (W - 10) * TILE,
    bossX: (W - 13) * TILE,
  };
}
