import { audio } from "./audio";
import { generateLevel, GROUND, LEVEL_H } from "./level";
import { shuffle } from "./rand";
import * as R from "./render";
import type { BossStyle, MusicCfg, Theme } from "./themes";

export const VIEW_W = 320;
export const VIEW_H = 180;
export const RENDER_SCALE = 3;
export const CANVAS_W = 960;
export const CANVAS_H = 540;
const CAM_Y = 12;
const TILE = 16;
const PW = 10;
const PH = 15;

export interface QuestionLite {
  id: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  reference: string | null;
}

export interface NpcLite {
  name: string;
  role: string;
  lines: string[];
}

export type StageMode = "tutorial" | "topic" | "boss" | "exam";
export type Difficulty = "easy" | "normal" | "hard";

export function randomizeQuestion(q: QuestionLite, difficulty: Difficulty = "normal"): QuestionLite {
  const origIndices = [0, 1, 2, 3];
  let availableIndices = [...origIndices];
  if (difficulty === "easy" && q.options.length === 4) {
    const wrongIndices = origIndices.filter((idx) => idx !== q.answer);
    const dropIdx = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    availableIndices = origIndices.filter((idx) => idx !== dropIdx);
  }
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }
  const shuffledOptions = availableIndices.map((idx) => q.options[idx]);
  const newAnswer = availableIndices.indexOf(q.answer);
  return {
    id: q.id,
    prompt: q.prompt,
    options: shuffledOptions,
    answer: Math.max(0, newAnswer),
    explanation: q.explanation,
    reference: q.reference,
  };
}

export interface EngineConfig {
  mode: StageMode;
  difficulty?: Difficulty;
  seed: number;
  theme: Theme;
  title: string;
  subtitle: string;
  npcs: NpcLite[];
  pool: QuestionLite[];
  testQuestions: QuestionLite[];
  passMin: number;
  bossName: string;
  bossIntro: string[];
  bossStyle: BossStyle;
  bossHp: number;
  music: MusicCfg;
  musicId: string;
}

export interface InputState {
  left: boolean;
  right: boolean;
  jump: boolean;
  punch: boolean;
  interact: boolean;
}

export type Overlay =
  | { kind: "dialogue"; speaker: string; role: string; color: string; lines: string[]; index: number }
  | {
      kind: "quiz";
      mode: "bump" | "test" | "boss";
      title: string;
      q: QuestionLite;
      step: number;
      total: number;
      answered: null | { chosen: number; ok: boolean };
    }
  | { kind: "testResult"; passed: boolean; score: number; total: number; min: number }
  | { kind: "end"; win: boolean; title: string; text: string };

export interface Snapshot {
  overlay: Overlay | null;
  lives: number;
  coins: number;
  score: number;
  title: string;
  subtitle: string;
  mode: StageMode;
  bossName: string;
  bossHp: number;
  bossMax: number;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Player extends Box {
  vx: number;
  vy: number;
  onGround: boolean;
  facing: 1 | -1;
  frame: number;
  anim: number;
  punch: number;
  cool: number;
  inv: number;
  knock: number;
  dead: boolean;
}

interface Enemy extends Box {
  kind: R.Kind;
  vx: number;
  vy: number;
  dir: 1 | -1;
  alive: boolean;
  t: number;
  baseY: number;
  minX: number;
  maxX: number;
}

interface NpcState {
  x: number;
  y: number;
  talked: boolean;
  cfg: NpcLite;
  look: R.Look;
}

interface Proj {
  x: number;
  y: number;
  vx: number;
  life: number;
}

interface BossState {
  x: number;
  y: number;
  minX: number;
  maxX: number;
  dir: 1 | -1;
  hp: number;
  max: number;
  flash: number;
  shoot: number;
  round: number;
}

interface FloatText {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
}

function overlap(a: Box, b: Box): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// Motor del juego (plataformas estilo 8/16 bits). La UI de React se muestra encima mediante `overlay`.
export class GameEngine {
  overlay: Overlay | null = null;
  input: InputState = { left: false, right: false, jump: false, punch: false, interact: false };

  private prev: InputState = { left: false, right: false, jump: false, punch: false, interact: false };
  private ctx: CanvasRenderingContext2D;
  private cfg: EngineConfig;
  private onChange: (s: Snapshot) => void;
  private raf = 0;
  private running = false;
  private last = 0;
  private acc = 0;
  private t = 0;
  private rows: string[][] = [];
  private W = 0;
  private p!: Player;
  private enemies: Enemy[] = [];
  private npcs: NpcState[] = [];
  private projs: Proj[] = [];
  private boss: BossState | null = null;
  private texts: FloatText[] = [];
  private difficulty: Difficulty = "normal";
  private lives = 3;
  private coins = 0;
  private score = 0;
  private lastSafeX = 48;
  private afterDialogue: (() => void) | null = null;
  private bumpDeck: QuestionLite[] = [];
  private bossDeck: QuestionLite[] = [];
  private testDeck: QuestionLite[] = [];
  private testIdx = 0;
  private testScore = 0;
  private gateDone = false;
  private goalDone = false;
  private camX = 0;
  private goalX = 0;
  private lastOverlay: Overlay | null = null;

  constructor(canvas: HTMLCanvasElement, cfg: EngineConfig, onChange: (s: Snapshot) => void) {
    const g = canvas.getContext("2d");
    if (!g) throw new Error("Canvas 2D no disponible");
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";
    this.ctx = g;
    this.cfg = cfg;
    this.difficulty = cfg.difficulty ?? "normal";
    this.onChange = onChange;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    audio.playMusic(this.cfg.musicId, this.cfg.music);
    this.restart();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  destroy(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  restart(): void {
    this.lives = this.difficulty === "easy" ? 4 : this.difficulty === "hard" ? 2 : 3;
    this.coins = 0;
    this.score = 0;
    this.overlay = null;
    this.afterDialogue = null;
    this.gateDone = false;
    this.goalDone = false;
    this.testIdx = 0;
    this.testScore = 0;
    this.testDeck = [];
    this.projs = [];
    this.texts = [];
    this.buildLevel();
    this.bumpDeck = shuffle(this.cfg.pool).map((q) => randomizeQuestion(q, this.difficulty));
    this.bossDeck = shuffle(this.cfg.pool).map((q) => randomizeQuestion(q, this.difficulty));
    if (this.boss) {
      if (this.cfg.bossIntro.length > 0) {
        this.overlay = {
          kind: "dialogue",
          speaker: this.cfg.bossName,
          role: "Jefe final",
          color: "#ef4444",
          lines: this.cfg.bossIntro,
          index: 0,
        };
        this.afterDialogue = () => this.nextBossRound();
      } else {
        this.nextBossRound();
      }
    }
    this.lastOverlay = this.overlay;
    this.emit();
  }

  nextLine(): void {
    const o = this.overlay;
    if (!o || o.kind !== "dialogue") return;
    if (o.index + 1 < o.lines.length) {
      this.overlay = { ...o, index: o.index + 1 };
    } else {
      this.overlay = null;
      const cb = this.afterDialogue;
      this.afterDialogue = null;
      if (cb) cb();
    }
    this.emit();
  }

  answer(choice: number): void {
    const o = this.overlay;
    if (!o || o.kind !== "quiz" || o.answered) return;
    const ok = choice === o.q.answer;
    this.overlay = { ...o, answered: { chosen: choice, ok } };
    audio.sfx(ok ? "correct" : "wrong");
    if (o.mode === "test") {
      if (ok) {
        this.testScore++;
      } else if (this.difficulty === "hard") {
        // En dificultad oficial (Tribunal), cada fallo penaliza 0.33 aciertos (fórmula oficial AGE)
        this.testScore = Math.max(0, Math.round((this.testScore - 0.33) * 100) / 100);
        this.popText(this.p.x, this.p.y - 12, "-0.33", "#f87171");
      }
    }
    if (o.mode === "bump" && ok) {
      this.score += 100;
      this.addCoins(3);
      this.popText(this.p.x, this.p.y - 12, "+100", "#86efac");
    }
    if (o.mode === "boss" && this.boss) {
      if (ok) {
        this.boss.hp--;
        this.boss.flash = 30;
        this.score += 200;
        audio.sfx("bossHit");
        this.popText(this.boss.x - 8, this.boss.y - 60, "¡Golpe!", "#fde047");
      } else {
        this.hurt(true);
      }
    }
    this.emit();
  }

  continueQuiz(): void {
    const o = this.overlay;
    if (!o || o.kind !== "quiz" || !o.answered) return;
    if (o.mode === "bump") {
      this.overlay = null;
    } else if (o.mode === "test") {
      if (this.testIdx + 1 < this.testDeck.length) {
        this.testIdx++;
        this.overlay = {
          kind: "quiz",
          mode: "test",
          title: o.title,
          q: this.testDeck[this.testIdx],
          step: this.testIdx + 1,
          total: o.total,
          answered: null,
        };
      } else {
        const min = Math.min(this.cfg.passMin, this.testDeck.length);
        const passed = this.testScore >= min;
        this.overlay = { kind: "testResult", passed, score: this.testScore, total: this.testDeck.length, min };
        audio.sfx(passed ? "win" : "lose");
      }
    } else if (o.mode === "boss") {
      const b = this.boss;
      if (b && b.hp <= 0) {
        this.winBoss();
      } else if (!this.p.dead) {
        this.overlay = null;
        if (b) b.round = 150;
      }
    }
    this.emit();
  }

  retryTest(): void {
    if (this.cfg.mode !== "topic") return;
    this.gateDone = false;
    this.testDeck = shuffle(this.cfg.testQuestions)
      .slice(0, Math.min(5, this.cfg.testQuestions.length))
      .map((q) => randomizeQuestion(q, this.difficulty));
    this.testIdx = 0;
    this.testScore = 0;
    this.overlay = null;
    this.p.x = this.goalX - 96;
    this.p.vx = 0;
    this.p.inv = 60;
    this.emit();
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.acc += dt;
    while (this.acc >= 1 / 60) {
      this.update();
      this.acc -= 1 / 60;
    }
    this.render();
    this.raf = requestAnimationFrame(this.frame);
  };

  private emit(): void {
    const b = this.boss;
    this.onChange({
      overlay: this.overlay,
      lives: this.lives,
      coins: this.coins,
      score: this.score,
      title: this.cfg.title,
      subtitle: this.cfg.subtitle,
      mode: this.cfg.mode,
      bossName: this.cfg.bossName,
      bossHp: b ? Math.max(0, b.hp) : 0,
      bossMax: b ? b.max : 0,
    });
  }

  private buildLevel(): void {
    const arena = this.cfg.mode === "boss" || this.cfg.mode === "exam";
    const L = generateLevel(
      this.cfg.seed,
      arena
        ? { arena: true, length: 0, qBlocks: 0, enemyRate: 0, npcs: 0 }
        : {
            arena: false,
            length: this.cfg.mode === "tutorial" ? 120 : 170,
            qBlocks: this.cfg.mode === "tutorial" ? 3 : 4,
            enemyRate: 0.35,
            npcs: this.cfg.npcs.length,
          },
    );
    this.W = L.w;
    this.rows = L.rows.map((row) => row.split(""));
    this.goalX = L.goalX;
    this.p = {
      x: L.start.x,
      y: L.start.y,
      w: PW,
      h: PH,
      vx: 0,
      vy: 0,
      onGround: false,
      facing: 1,
      frame: 0,
      anim: 0,
      punch: 0,
      cool: 0,
      inv: 0,
      knock: 0,
      dead: false,
    };
    this.lastSafeX = L.start.x;
    this.enemies = L.enemies.map((e) => ({
      kind: e.kind,
      x: e.x,
      y: e.y,
      w: 10,
      h: 12,
      vx: 0,
      vy: 0,
      dir: -1 as const,
      alive: true,
      t: 0,
      baseY: e.y,
      minX: e.x - 40,
      maxX: e.x + 40,
    }));
    this.npcs = L.npcs.slice(0, this.cfg.npcs.length).map((n, i) => {
      const cfg = this.cfg.npcs[i];
      return { x: n.x, y: n.y, talked: false, cfg, look: R.npcLook(cfg.name, cfg.role) };
    });
    this.boss = arena
      ? {
          x: L.bossX,
          y: GROUND * TILE,
          minX: (this.W - 14) * TILE,
          maxX: (this.W - 6) * TILE,
          dir: -1,
          hp: this.cfg.bossHp,
          max: this.cfg.bossHp,
          flash: 0,
          shoot: 90,
          round: 0,
        }
      : null;
  }

  private update(): void {
    this.t++;
    const pj = this.input.jump && !this.prev.jump;
    const pp = this.input.punch && !this.prev.punch;
    const pi = this.input.interact && !this.prev.interact;
    this.prev = { ...this.input };
    this.tickTexts();
    if (!this.overlay && this.p && !this.p.dead) {
      this.stepPlayer(pj, pp, pi);
      if (!this.p.dead) {
        this.stepEnemies();
        this.stepBoss();
        this.stepProjectiles();
        this.collectItems();
        this.checkTriggers();
      }
    }
    if (this.overlay !== this.lastOverlay || this.t % 10 === 0) {
      this.lastOverlay = this.overlay;
      this.emit();
    }
  }

  private tickTexts(): void {
    for (const tx of this.texts) {
      tx.y -= 0.35;
      tx.life--;
    }
    this.texts = this.texts.filter((tx) => tx.life > 0);
  }

  private popText(x: number, y: number, text: string, color: string): void {
    this.texts.push({ x, y, text, life: 40, color });
  }

  private stepPlayer(pj: boolean, pp: boolean, pi: boolean): void {
    const p = this.p;
    const dir = (this.input.right ? 1 : 0) - (this.input.left ? 1 : 0);
    if (p.knock > 0) {
      p.knock--;
      p.vx = -p.facing * 1.4;
    } else {
      p.vx = dir * 1.6;
      if (dir !== 0) p.facing = dir > 0 ? 1 : -1;
    }
    if (pj && p.onGround) {
      p.vy = -5.4;
      p.onGround = false;
      audio.sfx("jump");
    }
    if (!this.input.jump && p.vy < -1.6) p.vy = -1.6;
    p.vy = Math.min(p.vy + 0.3, 5.5);
    if (pp && p.cool <= 0) {
      p.punch = 10;
      p.cool = 20;
      audio.sfx("punch");
      this.doPunch();
    }
    if (p.punch > 0) p.punch--;
    if (p.cool > 0) p.cool--;
    if (p.inv > 0) p.inv--;
    if (pi) this.tryTalk(true);

    const res = this.moveBox(p, p.vx, p.vy, true);
    if (res.hitX) p.vx = 0;
    p.onGround = res.landed;
    if (res.landed || res.head) p.vy = 0;
    if (res.head) this.bump(res.head[0], res.head[1]);

    if (p.onGround && dir !== 0) {
      p.anim += 0.25;
      p.frame = Math.floor(p.anim) % 2;
    } else if (p.onGround) {
      p.frame = 0;
    }
    if (p.onGround) this.lastSafeX = p.x;
    if (p.y > LEVEL_H * TILE + 24) this.fallDeath();
    this.tryTalk(false);
  }

  private doPunch(): void {
    const p = this.p;
    const box: Box = { x: p.facing > 0 ? p.x + PW : p.x - 14, y: p.y, w: 14, h: PH };
    for (const e of this.enemies) {
      if (e.alive && overlap(box, e)) {
        e.alive = false;
        this.score += 20;
        this.popText(e.x, e.y - 14, "+20", "#fde047");
        audio.sfx("break");
      }
    }
    const tx0 = Math.floor(box.x / TILE);
    const tx1 = Math.floor((box.x + box.w - 0.01) / TILE);
    const ty0 = Math.floor(box.y / TILE);
    const ty1 = Math.floor((box.y + box.h - 0.01) / TILE);
    for (let ty = ty0; ty <= ty1; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        const c = this.tile(tx, ty);
        if (c === "R" || c === "B") {
          this.rows[ty][tx] = ".";
          this.addCoins(c === "R" ? 2 : 1);
          this.score += c === "R" ? 15 : 5;
          this.popText(tx * TILE, ty * TILE - 4, c === "R" ? "+15" : "+5", "#e2e8f0");
          audio.sfx("break");
        }
      }
    }
  }

  private tile(tx: number, ty: number): string {
    if (tx < 0 || tx >= this.W) return "#";
    if (ty < 0 || ty >= LEVEL_H) return ".";
    return this.rows[ty][tx];
  }

  private solid(c: string): boolean {
    return c === "#" || c === "B" || c === "Q" || c === "X" || c === "R";
  }

  // Mueve una caja en X y en Y resolviendo colisiones con los bloques del nivel.
  private moveBox(b: Box, dx: number, dy: number, oneWay: boolean): { hitX: boolean; landed: boolean; head: [number, number] | null } {
    const res: { hitX: boolean; landed: boolean; head: [number, number] | null } = { hitX: false, landed: false, head: null };
    if (dx !== 0) {
      b.x += dx;
      const ty0 = Math.floor(b.y / TILE);
      const ty1 = Math.floor((b.y + b.h - 0.01) / TILE);
      if (dx > 0) {
        const tx = Math.floor((b.x + b.w) / TILE);
        for (let ty = ty0; ty <= ty1; ty++) {
          if (this.solid(this.tile(tx, ty))) {
            b.x = tx * TILE - b.w - 0.001;
            res.hitX = true;
            break;
          }
        }
      } else {
        const tx = Math.floor(b.x / TILE);
        for (let ty = ty0; ty <= ty1; ty++) {
          if (this.solid(this.tile(tx, ty))) {
            b.x = (tx + 1) * TILE;
            res.hitX = true;
            break;
          }
        }
      }
    }
    if (dy !== 0) {
      const prevFeet = b.y + b.h;
      b.y += dy;
      const tx0 = Math.floor((b.x + 1) / TILE);
      const tx1 = Math.floor((b.x + b.w - 1) / TILE);
      if (dy > 0) {
        const row = Math.floor((b.y + b.h) / TILE);
        const top = row * TILE;
        for (let tx = tx0; tx <= tx1; tx++) {
          const c = this.tile(tx, row);
          if (this.solid(c) || (oneWay && c === "=" && prevFeet <= top + 0.5)) {
            b.y = top - b.h;
            res.landed = true;
            break;
          }
        }
      } else {
        const row = Math.floor(b.y / TILE);
        for (let tx = tx0; tx <= tx1; tx++) {
          if (this.solid(this.tile(tx, row))) {
            b.y = (row + 1) * TILE;
            res.head = [tx, row];
            break;
          }
        }
      }
    }
    return res;
  }

  private bump(tx: number, ty: number): void {
    const c = this.tile(tx, ty);
    if (c === "Q") {
      this.rows[ty][tx] = "X";
      audio.sfx("bump");
      if (this.bumpDeck.length === 0) this.bumpDeck = shuffle(this.cfg.pool).map((q) => randomizeQuestion(q, this.difficulty));
      const q = this.bumpDeck.pop();
      if (!q) {
        this.addCoins(2);
        this.score += 50;
        this.popText(tx * TILE, ty * TILE - 4, "+50", "#fde047");
        return;
      }
      this.overlay = { kind: "quiz", mode: "bump", title: "Bloque de pregunta", q: randomizeQuestion(q, this.difficulty), step: 1, total: 1, answered: null };
    } else if (c === "B") {
      this.rows[ty][tx] = "X";
      audio.sfx("bump");
      this.addCoins(1);
      this.score += 10;
      this.popText(tx * TILE, ty * TILE - 4, "+10", "#fde047");
    }
  }

  private addCoins(n: number): void {
    const before = Math.floor(this.coins / 50);
    this.coins += n;
    if (Math.floor(this.coins / 50) > before && this.lives < 5) {
      this.lives++;
      audio.sfx("life");
      this.popText(this.p.x, this.p.y - 8, "+1 ❤", "#f87171");
    }
  }

  private collectItems(): void {
    const p = this.p;
    const cx = Math.floor((p.x + PW / 2) / TILE);
    const cy = Math.floor((p.y + PH / 2) / TILE);
    if (this.tile(cx, cy) === "c") {
      this.rows[cy][cx] = ".";
      this.score += 10;
      this.addCoins(1);
      audio.sfx("coin");
    }
  }

  private tryTalk(manual: boolean): void {
    const px = this.p.x + PW / 2;
    for (const n of this.npcs) {
      const d = Math.abs(px - n.x);
      if (d < (manual ? 26 : 16) && (!n.talked || manual)) {
        n.talked = true;
        this.overlay = {
          kind: "dialogue",
          speaker: n.cfg.name,
          role: n.cfg.role,
          color: n.look.shirt,
          lines: n.cfg.lines,
          index: 0,
        };
        audio.sfx("talk");
        return;
      }
    }
  }

  private fallDeath(): void {
    this.lives--;
    audio.sfx("hit");
    if (this.lives <= 0) {
      this.die();
      return;
    }
    this.p.x = this.lastSafeX;
    this.p.y = 2 * TILE;
    this.p.vy = 0;
    this.p.inv = 60;
    this.popText(this.p.x, this.p.y - 10, "¡Cuidado!", "#f87171");
  }

  private hurt(force = false): void {
    const p = this.p;
    if (p.dead || (!force && p.inv > 0)) return;
    this.lives--;
    p.inv = 90;
    p.knock = 14;
    p.vy = -3.2;
    audio.sfx("hit");
    this.popText(p.x, p.y - 10, "-1 ❤", "#f87171");
    if (this.lives <= 0) this.die();
    this.emit();
  }

  private die(): void {
    this.p.dead = true;
    this.overlay = {
      kind: "end",
      win: false,
      title: "¡Se acabaron las vidas!",
      text: "Repasa la teoría con los personajes antes de volver a intentarlo.",
    };
    audio.sfx("lose");
  }

  private stepEnemies(): void {
    for (const e of this.enemies) {
      if (!e.alive) continue;
      e.t++;
      if (e.kind === "silencio") {
        e.x += e.dir * 0.35;
        if (e.x < e.minX || e.x > e.maxX) e.dir = e.dir > 0 ? -1 : 1;
        e.y = e.baseY + Math.sin(e.t / 18) * 5;
      } else {
        const speed = e.kind === "burocrata" ? 0.3 : 0.45;
        e.vx = e.dir * speed;
        e.vy = Math.min(e.vy + 0.3, 5);
        const res = this.moveBox(e, e.vx, e.vy, true);
        if (res.landed) e.vy = 0;
        if (res.hitX) e.dir = e.dir > 0 ? -1 : 1;
        if (res.landed) {
          const fx = e.dir > 0 ? Math.floor((e.x + e.w + 1) / TILE) : Math.floor((e.x - 1) / TILE);
          const fy = Math.floor((e.y + e.h + 2) / TILE);
          if (!this.solid(this.tile(fx, fy))) e.dir = e.dir > 0 ? -1 : 1;
          if (e.kind === "sello" && e.t % 90 === 0) e.vy = -3.2;
        }
        if (e.y > LEVEL_H * TILE + 40) e.alive = false;
      }
      this.touchEnemy(e);
    }
  }

  private touchEnemy(e: Enemy): void {
    const p = this.p;
    if (!overlap(p, e)) return;
    const stompable = e.kind === "papeleo" || e.kind === "sello";
    if (stompable && p.vy > 0 && p.y + PH - e.y < 8) {
      e.alive = false;
      p.vy = -3.6;
      this.score += 50;
      this.popText(e.x, e.y - 12, "+50", "#fde047");
      audio.sfx("stomp");
    } else {
      this.hurt();
    }
  }

  private stepBoss(): void {
    const b = this.boss;
    if (!b || b.hp <= 0) return;
    if (b.flash > 0) b.flash--;
    b.x += b.dir * 0.45;
    if (b.x < b.minX) {
      b.x = b.minX;
      b.dir = 1;
    }
    if (b.x > b.maxX) {
      b.x = b.maxX;
      b.dir = -1;
    }
    b.shoot--;
    if (b.shoot <= 0) {
      const angry = b.max - b.hp;
      this.projs.push({ x: b.x - 6, y: b.y - 12, vx: -(1.1 + angry * 0.12), life: 260 });
      b.shoot = Math.max(50, 110 - angry * 9);
    }
    if (b.round > 0) {
      b.round--;
      if (b.round === 0) this.nextBossRound();
    }
    if (overlap(this.p, { x: b.x - 14, y: b.y - 48, w: 28, h: 48 })) this.hurt();
  }

  private stepProjectiles(): void {
    for (const pr of this.projs) {
      pr.x += pr.vx;
      pr.life--;
      if (overlap(this.p, { x: pr.x - 3, y: pr.y - 2, w: 6, h: 4 })) {
        this.hurt();
        pr.life = 0;
      }
    }
    this.projs = this.projs.filter((pr) => pr.life > 0 && pr.x > -10);
  }

  private nextBossRound(): void {
    const b = this.boss;
    if (!b) return;
    if (b.hp <= 0) {
      this.winBoss();
      return;
    }
    if (this.bossDeck.length === 0) this.bossDeck = shuffle(this.cfg.pool).map((q) => randomizeQuestion(q, this.difficulty));
    const q = this.bossDeck.pop();
    if (!q) {
      b.hp = 0;
      this.winBoss();
      return;
    }
    this.overlay = {
      kind: "quiz",
      mode: "boss",
      title: this.cfg.bossName,
      q: randomizeQuestion(q, this.difficulty),
      step: b.max - b.hp + 1,
      total: b.max,
      answered: null,
    };
    this.emit();
  }

  private winBoss(): void {
    this.overlay = {
      kind: "end",
      win: true,
      title: `¡${this.cfg.bossName} derrotado!`,
      text:
        this.cfg.mode === "exam"
          ? "Has completado el examen final simulado. ¡Sigue repasando los puntos débiles!"
          : "Bloque superado. El siguiente mundo se ha desbloqueado.",
    };
    audio.sfx("win");
    this.emit();
  }

  private checkTriggers(): void {
    const p = this.p;
    if (this.cfg.mode === "topic" && !this.gateDone && p.x > this.goalX) {
      this.gateDone = true;
      this.startTest();
    }
    if (this.cfg.mode === "tutorial" && !this.goalDone && p.x > this.goalX) {
      this.goalDone = true;
      this.overlay = {
        kind: "end",
        win: true,
        title: "¡Tutorial completado!",
        text: "Ya conoces la Plaza. Elige un tema en el mapa y empieza tu aventura.",
      };
      audio.sfx("win");
    }
  }

  private startTest(): void {
    const pool = this.cfg.testQuestions;
    if (pool.length === 0) {
      this.overlay = { kind: "testResult", passed: true, score: 0, total: 0, min: 0 };
      audio.sfx("win");
      return;
    }
    this.testDeck = shuffle(pool).slice(0, Math.min(5, pool.length)).map((q) => randomizeQuestion(q, this.difficulty));
    this.testIdx = 0;
    this.testScore = 0;
    this.overlay = {
      kind: "quiz",
      mode: "test",
      title: `Prueba · ${this.cfg.title}`,
      q: this.testDeck[0],
      step: 1,
      total: this.testDeck.length,
      answered: null,
    };
  }

  private render(): void {
    const g = this.ctx;
    const th = this.cfg.theme;
    const maxCam = Math.max(0, this.W * TILE - VIEW_W);
    this.camX = Math.max(0, Math.min(maxCam, this.p.x + 8 - VIEW_W / 2));

    g.save();
    g.scale(RENDER_SCALE, RENDER_SCALE);
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";

    R.drawBackdrop(g, th, this.camX);

    g.save();
    g.translate(-Math.round(this.camX), -CAM_Y);
    const x0 = Math.max(0, Math.floor(this.camX / TILE) - 1);
    const x1 = Math.min(this.W - 1, Math.floor((this.camX + VIEW_W) / TILE) + 1);
    for (let ty = 0; ty < LEVEL_H; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const c = this.rows[ty][tx];
        if (c === ".") continue;
        R.drawTile(g, c, tx * TILE, ty * TILE, th, this.t, ty > 0 && this.rows[ty - 1][tx] === "#");
      }
    }
    if (this.cfg.mode === "topic") R.drawGate(g, this.goalX, GROUND * TILE);
    if (this.cfg.mode === "tutorial") R.drawGoal(g, this.goalX, GROUND * TILE, this.t);

    for (const n of this.npcs) R.drawNPC(g, n.x, n.y, n.cfg.name, n.cfg.role, this.t);
    for (const e of this.enemies) {
      if (e.alive) R.drawEnemy(g, e.kind, e.x + 5, e.y + e.h, e.dir, Math.floor(this.t / 12) % 2);
    }
    if (this.boss && this.boss.hp > 0) {
      R.drawBoss(g, this.cfg.bossStyle, this.boss.x, this.boss.y, true, this.t, this.boss.flash);
    }
    for (const pr of this.projs) R.drawProjectile(g, pr.x, pr.y, this.t);

    const p = this.p;
    const blinkOff = p.inv > 0 && Math.floor(this.t / 4) % 2 === 0;
    if (!blinkOff) {
      const state = p.punch > 0 ? "punch" : !p.onGround ? "jump" : Math.abs(p.vx) > 0.1 ? "walk" : "idle";
      R.drawPlayer(g, p.x + 5, p.y + PH, {
        flip: p.facing < 0,
        state,
        t: this.t,
        hurt: p.inv > 60,
      });
    }
    g.textAlign = "left";
    for (const tx of this.texts) {
      g.fillStyle = tx.color;
      g.font = "bold 8px sans-serif";
      g.fillText(tx.text, tx.x, tx.y);
    }
    g.restore(); // camera translate

    if (p.inv > 60) {
      g.fillStyle = "rgba(239,68,68,0.14)";
      g.fillRect(0, 0, VIEW_W, VIEW_H);
    }
    g.restore(); // scale
  }
}
