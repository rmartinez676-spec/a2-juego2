import { asc } from "drizzle-orm";
import { db, hasDb } from "@/db";
import { blocks, boeSources, questions, topics } from "@/db/schema";
import { ensureSeed } from "@/db/seed";
import { BOE_SOURCES, SYLLABUS } from "@/game/content/syllabus";
import type { BlockDTO, GameData, QuestionDTO, TopicDTO } from "@/game/types";

export function buildFallbackGameData(): GameData {
  let topicIdCounter = 1;
  let questionIdCounter = 1;
  return {
    blocks: SYLLABUS.map((b) => ({
      id: b.number,
      number: b.number,
      title: b.title,
      ministry: b.ministry,
      worldName: b.worldName,
      description: b.description,
      theme: b.theme,
      bossName: b.bossName,
      bossIntro: b.bossIntro,
      bossStyle: b.bossStyle,
      topics: b.topics.map((t, idx) => ({
        id: topicIdCounter++,
        blockId: b.number,
        position: idx + 1,
        title: t.title,
        summary: t.summary,
        npcName: t.npcName,
        npcRole: t.npcRole,
        npcLines: t.npcLines,
        tipName: t.tipName,
        tipRole: t.tipRole,
        tipLines: t.tipLines,
        boeIds: t.boeIds,
        needsReview: false,
        questions: t.questions.map((q) => ({
          id: questionIdCounter++,
          prompt: q.prompt,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          reference: q.reference ?? null,
          legalArticle: q.legalArticle,
          legalText: q.legalText,
        })),
      })),
    })),
    boeSources: BOE_SOURCES.map((s, idx) => ({
      id: idx + 1,
      boeId: s.boeId,
      shortName: s.shortName,
      title: s.shortName,
      url: `https://www.boe.es/buscar/act.php?id=${s.boeId}`,
      status: "ok",
      lastUpdate: null,
      reformCount: 0,
      changed: false,
      lastCheckedAt: null,
    })),
  };
}

// Carga el temario completo desde PostgreSQL (o fallback de temario directo si no hay BD).
export async function loadGameData(): Promise<GameData> {
  if (!hasDb || !db) return buildFallbackGameData();

  try {
    await ensureSeed();

    const [blockRows, topicRows, questionRows, sourceRows] = await Promise.all([
      db.select().from(blocks).orderBy(asc(blocks.number)),
      db.select().from(topics).orderBy(asc(topics.blockId), asc(topics.position)),
      db.select().from(questions).orderBy(asc(questions.id)),
      db.select().from(boeSources).orderBy(asc(boeSources.id)),
    ]);


    if (topicRows.length < 58 || blockRows.length !== 6) {
      await ensureSeed(true);
      return buildFallbackGameData();
    }

    const questionsByTopic = new Map<number, QuestionDTO[]>();
    for (const q of questionRows) {
      if (q.topicId === null) continue;
      const list = questionsByTopic.get(q.topicId) ?? [];
      list.push({
        id: q.id,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        reference: q.reference,
        legalArticle: (q as { legalArticle?: string }).legalArticle,
        legalText: (q as { legalText?: string }).legalText,
      });
      questionsByTopic.set(q.topicId, list);
    }

  const topicsByBlock = new Map<number, TopicDTO[]>();
  for (const t of topicRows) {
    const list = topicsByBlock.get(t.blockId) ?? [];
    list.push({
      id: t.id,
      blockId: t.blockId,
      position: t.position,
      title: t.title,
      summary: t.summary,
      npcName: t.npcName,
      npcRole: t.npcRole,
      npcLines: t.npcLines,
      tipName: t.tipName,
      tipRole: t.tipRole,
      tipLines: t.tipLines,
      boeIds: t.boeIds,
      needsReview: t.needsReview,
      questions: questionsByTopic.get(t.id) ?? [],
    });
    topicsByBlock.set(t.blockId, list);
  }

  const blockDTOs: BlockDTO[] = blockRows.map((b) => ({
    id: b.id,
    number: b.number,
    title: b.title,
    ministry: b.ministry,
    worldName: b.worldName,
    description: b.description,
    theme: b.theme,
    bossName: b.bossName,
    bossIntro: b.bossIntro,
    bossStyle: b.bossStyle,
    topics: topicsByBlock.get(b.id) ?? [],
  }));

    return {
      blocks: blockDTOs,
      boeSources: sourceRows.map((s) => ({
        id: s.id,
        boeId: s.boeId,
        shortName: s.shortName,
        title: s.title,
        url: s.url,
        status: s.status,
        lastUpdate: s.lastUpdate,
        reformCount: s.reformCount,
        changed: s.changed,
        lastCheckedAt: s.lastCheckedAt ? s.lastCheckedAt.toISOString() : null,
      })),
    };
  } catch (err) {
    console.warn("Error cargando base de datos, usando temario integrado:", err);
    return buildFallbackGameData();
  }
}

