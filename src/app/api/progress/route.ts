import { eq } from "drizzle-orm";
import { db } from "@/db";
import { playerProgress } from "@/db/schema";

export const dynamic = "force-dynamic";

function validId(id: unknown): id is string {
  return typeof id === "string" && id.length >= 8 && id.length <= 80;
}

export async function GET(req: Request) {
  const playerId = new URL(req.url).searchParams.get("playerId");
  if (!validId(playerId)) return Response.json({ completed: [], testScores: {} });

  const [row] = await db
    .select()
    .from(playerProgress)
    .where(eq(playerProgress.playerId, playerId))
    .limit(1);

  return Response.json({ completed: row?.completed ?? [], testScores: row?.testScores ?? {} });
}

interface ProgressBody {
  playerId?: unknown;
  action?: unknown;
  stageKey?: unknown;
  score?: unknown;
  total?: unknown;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ProgressBody | null;
  if (!body || !validId(body.playerId)) {
    return Response.json({ ok: false, error: "playerId inválido" }, { status: 400 });
  }
  const playerId = body.playerId;

  if (body.action === "reset") {
    await db.delete(playerProgress).where(eq(playerProgress.playerId, playerId));
    return Response.json({ ok: true, completed: [], testScores: {} });
  }

  if (typeof body.stageKey !== "string" || body.stageKey.length > 60) {
    return Response.json({ ok: false, error: "stageKey inválido" }, { status: 400 });
  }

  const [row] = await db
    .select()
    .from(playerProgress)
    .where(eq(playerProgress.playerId, playerId))
    .limit(1);

  const completed = Array.from(new Set<string>([...(row?.completed ?? []), body.stageKey]));
  const testScores: Record<string, { score: number; total: number }> = { ...(row?.testScores ?? {}) };

  if (typeof body.score === "number" && typeof body.total === "number") {
    const previous = testScores[body.stageKey];
    if (!previous || body.score >= previous.score) {
      testScores[body.stageKey] = { score: body.score, total: body.total };
    }
  }

  const updatedAt = new Date();
  await db
    .insert(playerProgress)
    .values({ playerId, completed, testScores, updatedAt })
    .onConflictDoUpdate({
      target: playerProgress.playerId,
      set: { completed, testScores, updatedAt },
    });

  return Response.json({ ok: true, completed, testScores });
}
