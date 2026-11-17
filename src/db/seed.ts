import { count } from "drizzle-orm";
import { db, hasDb } from "@/db";
import { blocks, boeSources, questions, topics } from "@/db/schema";
import { BOE_SOURCES, SYLLABUS } from "@/game/content/syllabus";

let seedPromise: Promise<void> | null = null;

export function ensureSeed(force = false): Promise<void> {
  if (!hasDb || !db) return Promise.resolve();
  if (force) seedPromise = null;
  if (!seedPromise) {
    seedPromise = doSeed(force).catch((error: unknown) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

async function doSeed(force = false): Promise<void> {
  if (!hasDb || !db) return;
  const expectedTotalTopics = SYLLABUS.reduce((acc, b) => acc + b.topics.length, 0);
  const [{ value: currentTopics }] = await db.select({ value: count() }).from(topics);

  if (!force && Number(currentTopics) === expectedTotalTopics) return;

  await db.transaction(async (tx) => {
    // Limpia contenido previo desfasado para sincronizar con los 58 temas oficiales del BOE
    await tx.delete(questions);
    await tx.delete(topics);
    await tx.delete(blocks);
    for (const block of SYLLABUS) {
      const [row] = await tx
        .insert(blocks)
        .values({
          number: block.number,
          title: block.title,
          ministry: block.ministry,
          worldName: block.worldName,
          description: block.description,
          theme: block.theme,
          bossName: block.bossName,
          bossIntro: block.bossIntro,
          bossStyle: block.bossStyle,
        })
        .returning({ id: blocks.id });

      for (const [index, topic] of block.topics.entries()) {
        const [topicRow] = await tx
          .insert(topics)
          .values({
            blockId: row.id,
            position: index + 1,
            title: topic.title,
            summary: topic.summary,
            npcName: topic.npcName,
            npcRole: topic.npcRole,
            npcLines: topic.npcLines,
            tipName: topic.tipName,
            tipRole: topic.tipRole,
            tipLines: topic.tipLines,
            boeIds: topic.boeIds,
          })
          .returning({ id: topics.id });

        if (topic.questions.length > 0) {
          await tx.insert(questions).values(
            topic.questions.map((question) => ({
              blockId: row.id,
              topicId: topicRow.id,
              prompt: question.prompt,
              options: [...question.options],
              answer: question.answer,
              explanation: question.explanation,
              reference: question.reference ?? null,
            })),
          );
        }
      }
    }

    await tx
      .insert(boeSources)
      .values(BOE_SOURCES.map((source) => ({ boeId: source.boeId, shortName: source.shortName })))
      .onConflictDoNothing();
  });
}
