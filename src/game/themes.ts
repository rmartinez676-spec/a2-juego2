// Temas visuales y musicales de cada mundo.

export type ScaleName = "major" | "minor" | "dorian" | "phrygian" | "mixolydian" | "lydian" | "pentatonic";
export type Prop = "dome" | "towers" | "books" | "coins" | "circuit" | "stars" | "fountain" | "scales";
export type BossStyle = "quorum" | "stamp" | "judge" | "inspector" | "cyber" | "stars";

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
  drums: 0 | 1 | 2;
  seed: number;
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
    sky: ["#7dd3fc", "#e0f2fe"],
    far: "#93c5fd",
    mid: "#f59e0b",
    ground: "#a16207",
    groundTop: "#84cc16",
    brick: "#d97706",
    accent: "#facc15",
    prop: "fountain",
    music: { bpm: 118, root: 60, mode: "major", prog: [0, 3, 4, 0], lead: "square", bass: "triangle", drums: 1, seed: 11 },
    boss: { bpm: 150, root: 57, mode: "minor", prog: [0, 5, 3, 4], lead: "square", bass: "sawtooth", drums: 2, seed: 111 },
  },
  congreso: {
    key: "congreso",
    name: "Las Cortes",
    sky: ["#1e3a8a", "#60a5fa"],
    far: "#1e40af",
    mid: "#334155",
    ground: "#6b7280",
    groundTop: "#d1d5db",
    brick: "#92400e",
    accent: "#fbbf24",
    prop: "dome",
    music: { bpm: 104, root: 62, mode: "dorian", prog: [0, 5, 3, 4], lead: "triangle", bass: "triangle", drums: 1, seed: 22 },
    boss: { bpm: 140, root: 59, mode: "phrygian", prog: [0, 1, 0, 6], lead: "square", bass: "sawtooth", drums: 2, seed: 122 },
  },
  ministerio: {
    key: "ministerio",
    name: "Ministerio de la Presidencia",
    sky: ["#312e81", "#818cf8"],
    far: "#4338ca",
    mid: "#1e1b4b",
    ground: "#475569",
    groundTop: "#94a3b8",
    brick: "#7c2d12",
    accent: "#f472b6",
    prop: "towers",
    music: { bpm: 128, root: 57, mode: "minor", prog: [0, 5, 2, 6], lead: "square", bass: "triangle", drums: 1, seed: 33 },
    boss: { bpm: 160, root: 52, mode: "minor", prog: [0, 6, 5, 4], lead: "square", bass: "sawtooth", drums: 2, seed: 133 },
  },
  inap: {
    key: "inap",
    name: "Escuela de la Función Pública",
    sky: ["#fde68a", "#fb923c"],
    far: "#f97316",
    mid: "#9a3412",
    ground: "#78350f",
    groundTop: "#d97706",
    brick: "#b45309",
    accent: "#fef08a",
    prop: "books",
    music: { bpm: 100, root: 64, mode: "mixolydian", prog: [0, 4, 5, 3], lead: "triangle", bass: "triangle", drums: 1, seed: 44 },
    boss: { bpm: 130, root: 62, mode: "minor", prog: [0, 5, 3, 6], lead: "square", bass: "sawtooth", drums: 2, seed: 144 },
  },
  hacienda: {
    key: "hacienda",
    name: "Torre de Hacienda",
    sky: ["#0f766e", "#5eead4"],
    far: "#0d9488",
    mid: "#115e59",
    ground: "#374151",
    groundTop: "#fbbf24",
    brick: "#b45309",
    accent: "#fde047",
    prop: "coins",
    music: { bpm: 138, root: 55, mode: "phrygian", prog: [0, 1, 0, 6], lead: "square", bass: "triangle", drums: 2, seed: 55 },
    boss: { bpm: 158, root: 50, mode: "phrygian", prog: [0, 1, 6, 0], lead: "square", bass: "sawtooth", drums: 2, seed: 155 },
  },
  digital: {
    key: "digital",
    name: "Ciudad Digital",
    sky: ["#020617", "#1e1b4b"],
    far: "#1d4ed8",
    mid: "#0f172a",
    ground: "#1e293b",
    groundTop: "#22d3ee",
    brick: "#334155",
    accent: "#a3e635",
    prop: "circuit",
    music: { bpm: 148, root: 59, mode: "pentatonic", prog: [0, 3, 4, 0], lead: "square", bass: "triangle", drums: 2, seed: 66 },
    boss: { bpm: 170, root: 57, mode: "minor", prog: [0, 5, 3, 4], lead: "sawtooth", bass: "sawtooth", drums: 2, seed: 166 },
  },
  europa: {
    key: "europa",
    name: "Bruselas",
    sky: ["#1e3a8a", "#3b82f6"],
    far: "#2563eb",
    mid: "#172554",
    ground: "#4b5563",
    groundTop: "#fde047",
    brick: "#6b7280",
    accent: "#facc15",
    prop: "stars",
    music: { bpm: 116, root: 60, mode: "lydian", prog: [0, 1, 3, 0], lead: "triangle", bass: "triangle", drums: 1, seed: 77 },
    boss: { bpm: 146, root: 55, mode: "minor", prog: [0, 5, 3, 4], lead: "square", bass: "sawtooth", drums: 2, seed: 177 },
  },
  tribunal: {
    key: "tribunal",
    name: "Sede del Tribunal Calificador",
    sky: ["#1c1917", "#44403c"],
    far: "#57534e",
    mid: "#292524",
    ground: "#3f3f46",
    groundTop: "#a8a29e",
    brick: "#52525b",
    accent: "#fbbf24",
    prop: "scales",
    music: { bpm: 110, root: 50, mode: "minor", prog: [0, 6, 5, 4], lead: "triangle", bass: "sawtooth", drums: 1, seed: 88 },
    boss: { bpm: 164, root: 48, mode: "phrygian", prog: [0, 1, 0, 6], lead: "square", bass: "sawtooth", drums: 2, seed: 188 },
  },
};

export const TITLE_MUSIC: MusicCfg = {
  bpm: 96,
  root: 60,
  mode: "major",
  prog: [0, 5, 3, 4],
  lead: "triangle",
  bass: "triangle",
  drums: 0,
  seed: 5,
};

// Variante musical por tema: cambia semilla, tempo y progresión para que cada submundo suene distinto.
export function variantMusic(base: MusicCfg, variant: number): MusicCfg {
  const shift = variant % base.prog.length;
  return {
    ...base,
    seed: base.seed + variant * 131 + 7,
    bpm: base.bpm + variant * 6,
    prog: [...base.prog.slice(shift), ...base.prog.slice(0, shift)],
  };
}
