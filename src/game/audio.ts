import { midiToFreq, rng } from "./rand";
import { SCALES, type MusicCfg, type MusicStyle, type BassStyle } from "./themes";

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
const MUSIC_MUTE_KEY = "oposikid-music-muted";

// Genera un patrón retro procedural de 64 pasos (4 compases de 16 semicorcheas)
// adaptado al estilo temático del mundo o jefe.
function buildPattern(cfg: MusicCfg): Pattern {
  const r = rng(cfg.seed);
  const scale = SCALES[cfg.mode];
  const n = scale.length;
  const deg = (d: number) => 12 * Math.floor(d / n) + scale[((d % n) + n) % n];
  const lead: (number | null)[] = [];
  const bass: (number | null)[] = [];
  const style: MusicStyle = cfg.style ?? (cfg.mode === "major" ? "mario" : "mystery");
  const bStyle: BassStyle = cfg.bassStyle ?? (style === "boss" || style === "examBoss" ? "driving" : "walking");

  let curLead = 2;

  // Motivos melódicos característicos de los 90 según temática
  const marioMotifs = [
    [0, 2, 4, null, 7, null, 4, 2],
    [4, null, 2, null, 0, null, 4, 7],
    [5, 4, 3, 2, 1, null, 2, 4],
    [7, null, 5, 4, 2, 0, null, null],
  ];

  const fanfareMotifs = [
    [0, null, 0, null, 4, null, 7, null],
    [7, 9, 7, 5, 4, null, 2, null],
    [5, null, 4, null, 2, null, 0, null],
    [0, 4, 7, 12, 11, 9, 7, null],
  ];

  const euroMotifs = [
    [4, 4, 5, 7, 7, 5, 4, 2],
    [0, 0, 2, 4, 4, null, 2, 2],
    [4, 4, 5, 7, 7, 5, 4, 2],
    [0, 0, 2, 4, 2, null, 0, 0],
  ];

  const bossMotifs = [
    [0, 1, 0, 3, 0, 1, 0, 5],
    [0, 6, 5, 3, 1, 0, 1, 3],
    [7, 6, 7, 8, 7, 5, 3, 1],
    [0, 12, 11, 10, 8, 7, 5, 3],
  ];

  for (let s = 0; s < STEPS; s++) {
    const bar = Math.floor(s / 16) % cfg.prog.length;
    const chord = cfg.prog[bar];
    const stepInBar = s % 16;
    const subMotif = Math.floor(stepInBar / 4);
    const subStep = stepInBar % 8;

    // --- GENERACIÓN DE MELODÍA PRINCIPAL (LEAD) ---
    if (style === "euro") {
      const noteDegree = euroMotifs[subMotif % 4][subStep % 8];
      lead.push(noteDegree !== null ? cfg.root + deg(noteDegree) : null);
    } else if (style === "fanfare") {
      const noteDegree = fanfareMotifs[subMotif % 4][subStep % 8];
      lead.push(noteDegree !== null ? cfg.root + deg(noteDegree) : null);
    } else if (style === "mario" || style === "title") {
      const noteDegree = marioMotifs[subMotif % 4][subStep % 8];
      if (noteDegree !== null && r() > 0.15) {
        lead.push(cfg.root + deg(noteDegree));
      } else {
        lead.push(null);
      }
    } else if (style === "boss" || style === "examBoss") {
      const noteDegree = bossMotifs[subMotif % 4][subStep % 8];
      // Melodía rápida de combate de jefes
      if (stepInBar % 2 === 0 || (style === "examBoss" && stepInBar % 4 !== 3)) {
        lead.push(cfg.root + 12 + deg((noteDegree ?? 0) + (chord % 3)));
      } else {
        lead.push(null);
      }
    } else if (style === "castle") {
      // Arpegio estilo barroco / castillo de Bowser o Castlevania
      const arp = [0, 2, 4, 7, 12, 7, 4, 2][s % 8];
      lead.push(cfg.root + deg(chord + arp));
    } else {
      // Mystery / Funky / Study
      if (s % 4 === 0) {
        curLead = r() < 0.6 ? chord + [0, 2, 4, 7][Math.floor(r() * 4)] : curLead + (r() < 0.5 ? -1 : 1) * (1 + Math.floor(r() * 2));
      } else if (r() < 0.35) {
        curLead += r() < 0.5 ? -1 : 1;
      }
      curLead = Math.max(0, Math.min(2 * n - 1, curLead));
      lead.push(r() < 0.15 ? null : cfg.root + deg(curLead));
    }

    // --- GENERACIÓN DE LÍNEA DE BAJO (BASS) ---
    if (bStyle === "driving") {
      // Bajo de combate continuo (semicorcheas pulsantes estilo 90s boss)
      if (s % 2 === 0) {
        bass.push(cfg.root - 12 + deg(chord));
      } else if (s % 8 === 6) {
        bass.push(cfg.root - 12 + deg(chord) + 7);
      } else {
        bass.push(cfg.root - 12 + deg(chord) + (s % 4 === 2 ? 12 : 0));
      }
    } else if (bStyle === "arpeggio") {
      const arpStep = [0, 7, 12, 7][s % 4];
      bass.push(cfg.root - 12 + deg(chord) + arpStep);
    } else if (bStyle === "syncopated") {
      if (s % 8 === 0 || s % 8 === 3 || s % 8 === 6) {
        bass.push(cfg.root - 12 + deg(chord));
      } else {
        bass.push(null);
      }
    } else if (bStyle === "pulse") {
      if (s % 8 === 0 || s % 8 === 4) {
        bass.push(cfg.root - 12 + deg(chord));
      } else {
        bass.push(null);
      }
    } else {
      // Walking bass tradicional (Mario / Alex Kidd)
      const walk = [0, 2, 4, 5][Math.floor((s % 16) / 4)];
      if (s % 4 === 0) {
        bass.push(cfg.root - 12 + deg(chord + walk));
      } else if (s % 8 === 2 && r() < 0.4) {
        bass.push(cfg.root - 12 + deg(chord + walk) + 12);
      } else {
        bass.push(null);
      }
    }
  }

  return { lead, bass };
}

class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private muted = false;
  private musicMuted = false;
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
        this.musicMuted = window.localStorage.getItem(MUSIC_MUTE_KEY) === "1";
      } catch {
        this.muted = false;
        this.musicMuted = false;
      }
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  isMusicMuted(): boolean {
    return this.musicMuted;
  }

  setMuted(value: boolean): boolean {
    this.muted = value;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
      } catch {}
      this.unlock();
    }
    this.applyMute();
    return value;
  }

  setMusicMuted(value: boolean): boolean {
    this.musicMuted = value;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(MUSIC_MUTE_KEY, value ? "1" : "0");
      } catch {}
      this.unlock();
    }
    this.applyMute();
    return value;
  }

  toggleMute(): boolean {
    return this.setMuted(!this.muted);
  }

  toggleMusic(): boolean {
    return this.setMusicMuted(!this.musicMuted);
  }

  unlock(): void {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.connect(ctx.destination);
      const musicBus = ctx.createGain();
      musicBus.connect(master);
      const sfxBus = ctx.createGain();
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
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    this.ensureTimer();
  }

  playMusic(id: string, cfg: MusicCfg): void {
    if (id === this.trackId) return;
    this.trackId = id;
    this.cfg = cfg;
    this.pattern = buildPattern(cfg);
    this.step = 0;
    if (this.ctx) {
      this.nextTime = this.ctx.currentTime + 0.05;
    }
    this.ensureTimer();
  }

  stopMusic(): void {
    this.trackId = "";
    this.cfg = null;
    this.pattern = null;
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
    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.master) {
        this.master.gain.cancelScheduledValues(now);
        this.master.gain.setValueAtTime(this.muted ? 0 : 0.8, now);
        this.master.gain.value = this.muted ? 0 : 0.8;
      }
      if (this.musicBus) {
        const musicVol = this.muted || this.musicMuted ? 0 : 0.5;
        this.musicBus.gain.cancelScheduledValues(now);
        this.musicBus.gain.setValueAtTime(musicVol, now);
        this.musicBus.gain.value = musicVol;
      }
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
    if (this.muted || this.musicMuted) {
      this.nextTime = ctx.currentTime + 0.05;
      return;
    }
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
    if (lead != null) this.tone(midiToFreq(lead), t, dur * 1.5, cfg.lead, 0.06, bus);
    const bass = p.bass[s];
    if (bass != null) this.tone(midiToFreq(bass), t, dur * 2.2, cfg.bass, 0.14, bus);

    if (cfg.drums > 0) {
      // Bombo (Kick)
      if (s % 8 === 0) this.kick(t, bus);
      if (cfg.drums >= 2 && s % 8 === 4) this.kick(t, bus);
      if (cfg.drums === 3 && (s % 8 === 2 || s % 8 === 6)) this.kick(t, bus);

      // Caja (Snare)
      if (s % 16 === 8) this.noise(t, 0.12, 0.24, bus, "highpass", 1500);
      if (cfg.drums === 3 && s % 16 === 0) this.noise(t, 0.06, 0.15, bus, "highpass", 2000);

      // Charles / Hi-hat
      if (cfg.drums === 1 && s % 4 === 2) this.noise(t, 0.03, 0.04, bus, "highpass", 7000);
      if (cfg.drums >= 2 && s % 2 === 1) this.noise(t, 0.03, 0.06, bus, "highpass", 7500);
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
