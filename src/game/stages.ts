import type { EngineConfig, QuestionLite } from "./engine";
import { HUB_NPCS, TUTORIAL_TITLE } from "./content/syllabus";
import { THEMES, variantMusic } from "./themes";
import type { BossStyle } from "./themes";
import type { GameData, Stage } from "./types";

// Orden lineal de fases: tutorial → temas de cada bloque (con su jefe) → examen final.
export function buildStages(data: GameData): Stage[] {
  const stages: Stage[] = [
    {
      key: "tutorial",
      kind: "tutorial",
      index: 0,
      blockNumber: 0,
      blockId: 0,
      topicId: null,
      title: TUTORIAL_TITLE,
      subtitle: "Mundo 0 · Plaza de la Administración",
    },
  ];

  const blocks = [...data.blocks].sort((a, b) => a.number - b.number);
  for (const block of blocks) {
    for (const topic of block.topics) {
      stages.push({
        key: `topic:${topic.id}`,
        kind: "topic",
        index: stages.length,
        blockNumber: block.number,
        blockId: block.id,
        topicId: topic.id,
        title: topic.title,
        subtitle: `Tema ${block.number}.${topic.position}`,
      });
    }
    stages.push({
      key: `boss:${block.number}`,
      kind: "boss",
      index: stages.length,
      blockNumber: block.number,
      blockId: block.id,
      topicId: null,
      title: block.bossName,
      subtitle: `Jefe · ${block.worldName}`,
    });
  }

  stages.push({
    key: "exam",
    kind: "exam",
    index: stages.length,
    blockNumber: 7,
    blockId: 0,
    topicId: null,
    title: "Examen Final",
    subtitle: "Tribunal Calificador · todo el temario",
  });
  return stages;
}

export function isStageUnlocked(stages: Stage[], index: number, completed: string[], freePlay: boolean): boolean {
  if (freePlay || index === 0) return true;
  return completed.includes(stages[index - 1].key);
}

export function makeEngineConfig(stage: Stage, data: GameData): EngineConfig {
  const allQuestions: QuestionLite[] = data.blocks.flatMap((b) => b.topics.flatMap((t) => t.questions));
  const block = data.blocks.find((b) => b.number === stage.blockNumber) ?? null;
  const themeKey = stage.kind === "exam" ? "tribunal" : stage.blockNumber === 0 ? "plaza" : block?.theme ?? "plaza";
  const theme = THEMES[themeKey] ?? THEMES.plaza;
  const seed = 1000 + stage.index * 7919;
  const base: Omit<EngineConfig, "mode"> = {
    seed,
    theme,
    title: stage.title,
    subtitle: stage.subtitle,
    npcs: [],
    pool: [],
    testQuestions: [],
    passMin: 3,
    bossName: "",
    bossIntro: [],
    bossStyle: "quorum",
    bossHp: 0,
    music: theme.music,
    musicId: `${themeKey}:tutorial`,
  };

  if (stage.kind === "tutorial") {
    return {
      ...base,
      mode: "tutorial",
      npcs: HUB_NPCS,
      pool: allQuestions,
      music: theme.music,
      musicId: "plaza:tutorial",
    };
  }

  if (stage.kind === "topic") {
    const topic = block?.topics.find((t) => t.id === stage.topicId);
    const variant = Math.max(0, (topic?.position ?? 1) - 1);
    const npcs = topic
      ? [
          { name: topic.npcName, role: topic.npcRole, lines: topic.npcLines },
          { name: topic.tipName, role: topic.tipRole, lines: topic.tipLines },
        ].filter((n) => n.lines.length > 0)
      : [];
    const questions = topic?.questions ?? [];
    return {
      ...base,
      mode: "topic",
      npcs,
      pool: questions,
      testQuestions: questions,
      passMin: 3,
      music: variantMusic(theme.music, variant),
      musicId: `${themeKey}:topic:${variant}`,
    };
  }

  if (stage.kind === "boss") {
    const blockQuestions = block?.topics.flatMap((t) => t.questions) ?? [];
    return {
      ...base,
      mode: "boss",
      seed,
      pool: blockQuestions,
      bossName: block?.bossName ?? "Jefe",
      bossIntro: block ? [block.bossIntro, "Responde a mis preguntas: cada acierto me debilita, cada fallo te cuesta una vida."] : [],
      bossStyle: (block?.bossStyle ?? "quorum") as BossStyle,
      bossHp: Math.min(6, blockQuestions.length),
      music: theme.boss,
      musicId: `${themeKey}:boss`,
    };
  }

  return {
    ...base,
    mode: "exam",
    theme: THEMES.tribunal,
    pool: allQuestions,
    bossName: "Tribunal Calificador",
    bossIntro: [
      "Bienvenida al examen final. Aquí se mezcla todo el temario.",
      "Diez aciertos para aprobar esta simulación. ¡Concéntrate!",
    ],
    bossStyle: "judge",
    bossHp: Math.min(10, allQuestions.length),
    music: THEMES.tribunal.boss,
    musicId: "tribunal:exam",
  };
}
