import { midiToFreq, rng } from "./rand";
import { SCALES, type MusicCfg } from "./themes";

export type SfxName =
  | "jump"
  | "coin"
  | "stomp"
  | "hit"
  | "punch"
  | "bump"
  | "correct"
  | "wrong"
  | "talk"
  | "win"
  | "lose"
  | "bossHit"
  | "break"
  | "life";

interface Pattern {
  lead: (number | null)[];
  bass: (number | null)[];
}

const STEPS = 64;
const MUTE_KEY = "oposikid-muted";

// Genera un patrón de 4 compases a partir de la configuración musical (determinista por semilla).
function buildPattern(cfg: MusicCfg): Pattern {
  const r = rng(cfg.seed);
  const scale = SCALES[cfg.mode];
  const n = scale.length;
  const deg = (d: number) => 12 * Math.floor(d / n) + scale[((d % n) + n) % n];
  const lead: (number | null)[] = [];
  const bass: (number | null)[] = [];
  let cur = 2;

  for (let s = 0; s < STEPS; s++) {
    const chord = cfg.prog[Math.floor(s / 16) % cfg.prog.length];
    if (s % 4 === 0) {
      cur = r() < 0.6 ? chord + [0, 2, 4][Math.floor(r() * 3)] : cur + (r() < 0.5 ? -1 : 1) * (1 + Math.floor(r() * 2));
    } else if (r() < 0.3) {
      cur += r() < 0.5 ? -1 : 1;
    }
    cur = Math.max(0, Math.min(2 * n - 1, cur));
    lead.push(r() < 0.18 ? null : cfg.root + deg(cur));
    if (s % 8 === 0) bass.push(cfg.root - 12 + deg(chord));
    else if (s % 8 === 4 && r() < 0.6) bass.push(cfg.root - 12 + deg(chord) + 7);
    else bass.push(null);
  }
  return { lead, bass };
}

// Motor de audio con WebAudio: música procedural + efectos de sonido. El silencio se controla con un
// único nodo maestro, así que el botón de mute funciona siempre (también antes de iniciar el audio).
class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private muted = false;
  private trackId = "";
  private cfg: MusicCfg | null = null;
  private pattern: Pattern | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        this.muted = window.localStorage.getItem(MUTE_KEY) === "1";
      } catch {
        this.muted = false;
      }
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(value: boolean): boolean {
    this.muted = value;
    try {
      window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    } catch {
      /* sin almacenamiento */
    }
    this.applyMute();
    return value;
  }

  // Debe llamarse desde un gesto del usuario (toque o tecla).
  unlock(): void {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.connect(ctx.destination);
      const musicBus = ctx.createGain();
      musicBus.gain.value = 0.5;
      musicBus.connect(master);
      const sfxBus = ctx.createGain();
      sfxBus.gain.value = 0.6;
      sfxBus.connect(master);
      const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      this.ctx = ctx;
      this.master = master;
      this.musicBus = musicBus;
      this.sfxBus = sfxBus;
      this.noiseBuf = buf;
      this.applyMute();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    this.ensureTimer();
  }

  playMusic(id: string, cfg: MusicCfg): void {
    if (id === this.trackId) return;
    this.trackId = id;
    this.cfg = cfg;
    this.pattern = buildPattern(cfg);
    this.step = 0;
    if (this.ctx) this.nextTime = this.ctx.currentTime + 0.05;
    this.ensureTimer();
  }

  sfx(name: SfxName): void {
    const ctx = this.ctx;
    const bus = this.sfxBus;
    if (!ctx || !bus) return;
    const t = ctx.currentTime;
    switch (name) {
      case "jump":
        this.tone(300, t, 0.12, "square", 0.08, bus, 650);
        break;
      case "coin":
        this.tone(988, t, 0.06, "square", 0.08, bus);
        this.tone(1319, t + 0.06, 0.12, "square", 0.08, bus);
        break;
      case "stomp":
        this.tone(260, t, 0.1, "square", 0.1, bus, 90);
        this.noise(t, 0.05, 0.1, bus, "lowpass", 1200);
        break;
      case "hit":
        this.tone(380, t, 0.3, "sawtooth", 0.12, bus, 60);
        break;
      case "punch":
        this.noise(t, 0.08, 0.2, bus, "bandpass", 900);
        this.tone(180, t, 0.08, "square", 0.06, bus, 90);
        break;
      case "bump":
        this.tone(520, t, 0.05, "triangle", 0.12, bus, 760);
        break;
      case "correct":
        [523, 659, 784, 1047].forEach((f, i) => this.tone(f, t + i * 0.08, 0.12, "square", 0.08, bus));
        break;
      case "wrong":
        this.tone(220, t, 0.25, "sawtooth", 0.1, bus, 110);
        this.tone(165, t + 0.22, 0.3, "sawtooth", 0.1, bus, 80);
        break;
      case "talk":
        this.tone(660, t, 0.03, "square", 0.04, bus);
        break;
      case "win":
        [523, 659, 784, 659, 784, 1047].forEach((f, i) => this.tone(f, t + i * 0.12, 0.18, "square", 0.09, bus));
        break;
      case "lose":
        [392, 349, 330, 262].forEach((f, i) => this.tone(f, t + i * 0.2, 0.22, "triangle", 0.14, bus));
        break;
      case "bossHit":
        this.noise(t, 0.3, 0.35, bus, "lowpass", 800);
        this.tone(140, t, 0.35, "square", 0.15, bus, 40);
        break;
      case "break":
        this.noise(t, 0.15, 0.25, bus, "highpass", 2000);
        break;
      case "life":
        [660, 784, 988, 1319].forEach((f, i) => this.tone(f, t + i * 0.07, 0.1, "square", 0.08, bus));
        break;
    }
  }

  private applyMute(): void {
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.8, this.ctx.currentTime, 0.02);
    }
  }

  private ensureTimer(): void {
    if (!this.ctx || !this.cfg || this.timer !== null) return;
    this.timer = window.setInterval(() => this.tick(), 25);
  }

  private tick(): void {
    const ctx = this.ctx;
    const cfg = this.cfg;
    const pattern = this.pattern;
    if (!ctx || !cfg || !pattern || !this.musicBus) return;
    const dur = 60 / cfg.bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.12) {
      this.playStep(pattern, cfg, this.step, this.nextTime, dur);
      this.nextTime += dur;
      this.step = (this.step + 1) % STEPS;
    }
  }

  private playStep(p: Pattern, cfg: MusicCfg, s: number, t: number, dur: number): void {
    const bus = this.musicBus;
    if (!bus) return;
    const lead = p.lead[s];
    if (lead != null) this.tone(midiToFreq(lead), t, dur * 1.6, cfg.lead, 0.05, bus);
    const bass = p.bass[s];
    if (bass != null) this.tone(midiToFreq(bass), t, dur * 2.5, cfg.bass, 0.12, bus);
    if (cfg.drums > 0) {
      if (s % 8 === 0) this.kick(t, bus);
      if (s % 16 === 8) this.noise(t, 0.12, 0.22, bus, "highpass", 1500);
      if (cfg.drums === 1 && s % 4 === 2) this.noise(t, 0.03, 0.04, bus, "highpass", 7000);
      if (cfg.drums === 2 && s % 2 === 1) this.noise(t, 0.03, 0.05, bus, "highpass", 7000);
      if (cfg.drums === 2 && s % 8 === 4) this.kick(t, bus);
    }
  }

  private kick(t: number, bus: AudioNode): void {
    this.tone(120, t, 0.14, "sine", 0.45, bus, 40);
  }

  private tone(freq: number, t: number, dur: number, type: OscillatorType, vol: number, bus: AudioNode, slideTo?: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  private noise(t: number, dur: number, vol: number, bus: AudioNode, filter: BiquadFilterType, freq: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.noiseBuf) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(gain);
    gain.connect(bus);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.05);
  }
}

export const audio = new GameAudio();
