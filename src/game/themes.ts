// Temas visuales y musicales de cada mundo.

export type ScaleName = "major" | "minor" | "dorian" | "phrygian" | "mixolydian" | "lydian" | "pentatonic";
export type Prop = "dome" | "towers" | "books" | "coins" | "circuit" | "stars" | "fountain" | "scales";
export type BossStyle = "quorum" | "stamp" | "judge" | "inspector" | "cyber" | "stars";
export type MusicStyle = "mario" | "fanfare" | "euro" | "funky" | "mystery" | "study" | "castle" | "boss" | "examBoss" | "title" | "map";
export type BassStyle = "walking" | "arpeggio" | "syncopated" | "driving" | "pulse";

export const SCALES: Record<ScaleName, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  pentatonic: [0, 3, 5, 7, 10],
};

export interface MusicCfg {
  bpm: number;
  root: number;
  mode: ScaleName;
  prog: number[];
  lead: OscillatorType;
  bass: OscillatorType;
  drums: 0 | 1 | 2 | 3;
  seed: number;
  style?: MusicStyle;
  bassStyle?: BassStyle;
}

export interface Theme {
  key: string;
  name: string;
  sky: [string, string];
  far: string;
  mid: string;
  ground: string;
  groundTop: string;
  brick: string;
  accent: string;
  prop: Prop;
  music: MusicCfg;
  boss: MusicCfg;
}

export const THEMES: Record<string, Theme> = {
  plaza: {
    key: "plaza",
    name: "Plaza de la Administración",
    sky: ["#38bdf8", "#e0f2fe"],
    far: "#93c5fd",
    mid: "#f59e0b",
    ground: "#a16207",
    groundTop: "#84cc16",
    brick: "#d97706",
    accent: "#facc15",
    prop: "fountain",
    music: { bpm: 120, root: 60, mode: "major", prog: [0, 3, 4, 0], lead: "square", bass: "triangle", drums: 1, seed: 11, style: "mario", bassStyle: "walking" },
    boss: { bpm: 148, root: 57, mode: "minor", prog: [0, 5, 3, 4], lead: "square", bass: "sawtooth", drums: 2, seed: 111, style: "boss", bassStyle: "driving" },
  },
  congreso: {
    key: "congreso",
    name: "Las Cortes Generales",
    sky: ["#1e3a8a", "#60a5fa"],
    far: "#1e40af",
    mid: "#334155",
    ground: "#475569",
    groundTop: "#cbd5e1",
    brick: "#92400e",
    accent: "#fbbf24",
    prop: "dome",
    music: { bpm: 108, root: 62, mode: "dorian", prog: [0, 4, 5, 3], lead: "square", bass: "triangle", drums: 1, seed: 22, style: "fanfare", bassStyle: "arpeggio" },
    boss: { bpm: 146, root: 59, mode: "phrygian", prog: [0, 1, 0, 6], lead: "sawtooth", bass: "sawtooth", drums: 3, seed: 122, style: "boss", bassStyle: "driving" },
  },
  europa: {
    key: "europa",
    name: "Bruselas · Unión Europea",
    sky: ["#172554", "#3b82f6"],
    far: "#2563eb",
    mid: "#1e3a8a",
    ground: "#334155",
    groundTop: "#facc15",
    brick: "#475569",
    accent: "#fde047",
    prop: "stars",
    music: { bpm: 122, root: 60, mode: "lydian", prog: [0, 3, 4, 1], lead: "triangle", bass: "triangle", drums: 1, seed: 77, style: "euro", bassStyle: "arpeggio" },
    boss: { bpm: 154, root: 55, mode: "minor", prog: [0, 5, 3, 4], lead: "square", bass: "sawtooth", drums: 3, seed: 177, style: "boss", bassStyle: "driving" },
  },
  ministerio: {
    key: "ministerio",
    name: "Ministerio de la Presidencia · Políticas Públicas",
    sky: ["#312e81", "#818cf8"],
    far: "#4338ca",
    mid: "#1e1b4b",
    ground: "#334155",
    groundTop: "#94a3b8",
    brick: "#7c2d12",
    accent: "#f472b6",
    prop: "towers",
    music: { bpm: 128, root: 57, mode: "minor", prog: [0, 5, 2, 6], lead: "square", bass: "triangle", drums: 2, seed: 33, style: "funky", bassStyle: "syncopated" },
    boss: { bpm: 160, root: 52, mode: "minor", prog: [0, 6, 5, 4], lead: "sawtooth", bass: "sawtooth", drums: 3, seed: 133, style: "boss", bassStyle: "driving" },
  },
  procedimiento: {
    key: "procedimiento",
    name: "Laberinto del Procedimiento Administrativo",
    sky: ["#0f172a", "#334155"],
    far: "#1e293b",
    mid: "#0f172a",
    ground: "#374151",
    groundTop: "#9ca3af",
    brick: "#52525b",
    accent: "#38bdf8",
    prop: "books",
    music: { bpm: 112, root: 58, mode: "phrygian", prog: [0, 1, 3, 1], lead: "triangle", bass: "triangle", drums: 1, seed: 45, style: "mystery", bassStyle: "pulse" },
    boss: { bpm: 152, root: 53, mode: "phrygian", prog: [0, 1, 6, 0], lead: "sawtooth", bass: "sawtooth", drums: 3, seed: 145, style: "boss", bassStyle: "driving" },
  },
  inap: {
    key: "inap",
    name: "Escuela de la Función Pública · INAP",
    sky: ["#fef08a", "#fb923c"],
    far: "#f97316",
    mid: "#9a3412",
    ground: "#78350f",
    groundTop: "#facc15",
    brick: "#b45309",
    accent: "#fef08a",
    prop: "books",
    music: { bpm: 126, root: 64, mode: "mixolydian", prog: [0, 4, 5, 3], lead: "square", bass: "triangle", drums: 1, seed: 44, style: "study", bassStyle: "walking" },
    boss: { bpm: 156, root: 60, mode: "minor", prog: [0, 5, 3, 6], lead: "square", bass: "sawtooth", drums: 3, seed: 144, style: "boss", bassStyle: "driving" },
  },
  hacienda: {
    key: "hacienda",
    name: "Torre de Hacienda y el Tesoro Público",
    sky: ["#042f2e", "#0d9488"],
    far: "#115e59",
    mid: "#134e4a",
    ground: "#1f2937",
    groundTop: "#f59e0b",
    brick: "#92400e",
    accent: "#fde047",
    prop: "coins",
    music: { bpm: 134, root: 55, mode: "minor", prog: [0, 1, 0, 6], lead: "square", bass: "triangle", drums: 2, seed: 55, style: "castle", bassStyle: "arpeggio" },
    boss: { bpm: 164, root: 50, mode: "phrygian", prog: [0, 1, 6, 0], lead: "sawtooth", bass: "sawtooth", drums: 3, seed: 155, style: "boss", bassStyle: "driving" },
  },
  tribunal: {
    key: "tribunal",
    name: "Sede del Tribunal Calificador",
    sky: ["#18181b", "#3f3f46"],
    far: "#27272a",
    mid: "#18181b",
    ground: "#27272a",
    groundTop: "#f59e0b",
    brick: "#3f3f46",
    accent: "#fbbf24",
    prop: "scales",
    music: { bpm: 114, root: 53, mode: "minor", prog: [0, 6, 5, 4], lead: "triangle", bass: "triangle", drums: 2, seed: 88, style: "examBoss", bassStyle: "pulse" },
    boss: { bpm: 172, root: 48, mode: "phrygian", prog: [0, 1, 0, 6], lead: "sawtooth", bass: "sawtooth", drums: 3, seed: 188, style: "examBoss", bassStyle: "driving" },
  },
};

export const TITLE_MUSIC: MusicCfg = {
  bpm: 104,
  root: 60,
  mode: "major",
  prog: [0, 5, 3, 4],
  lead: "square",
  bass: "triangle",
  drums: 1,
  seed: 7,
  style: "title",
  bassStyle: "walking",
};

export const MAP_MUSIC: MusicCfg = {
  bpm: 112,
  root: 62,
  mode: "major",
  prog: [0, 3, 4, 0],
  lead: "triangle",
  bass: "triangle",
  drums: 1,
  seed: 42,
  style: "map",
  bassStyle: "marching" as BassStyle,
};

// Variante musical por tema: cambia semilla, tempo, estilo y progresión para que cada submundo suene distinto.
export function variantMusic(base: MusicCfg, variant: number): MusicCfg {
  const shift = variant % base.prog.length;
  const roots = [0, 2, 4, 5, 7];
  const rootShift = roots[variant % roots.length];
  const bpms = [base.bpm, base.bpm + 4, base.bpm - 2, base.bpm + 8];
  return {
    ...base,
    seed: base.seed + variant * 137 + 13,
    bpm: bpms[variant % bpms.length],
    root: base.root + (variant % 2 === 0 ? 0 : rootShift > 4 ? rootShift - 12 : rootShift),
    prog: [...base.prog.slice(shift), ...base.prog.slice(0, shift)],
    drums: ((base.drums + (variant % 2)) % 3) as 0 | 1 | 2 | 3,
  };
}

