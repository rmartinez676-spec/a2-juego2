import { asc } from "drizzle-orm";
import { db } from "@/db";
import { blocks, boeSources, questions, topics } from "@/db/schema";
import { ensureSeed } from "@/db/seed";
import type { BlockDTO, GameData, QuestionDTO, TopicDTO } from "@/game/types";

// Carga el temario completo desde PostgreSQL (con seed automático si está vacío).
export async function loadGameData(): Promise<GameData> {
  await ensureSeed();

  const [blockRows, topicRows, questionRows, sourceRows] = await Promise.all([
    db.select().from(blocks).orderBy(asc(blocks.number)),
    db.select().from(topics).orderBy(asc(topics.blockId), asc(topics.position)),
    db.select().from(questions).orderBy(asc(questions.id)),
    db.select().from(boeSources).orderBy(asc(boeSources.id)),
  ]);

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
}
