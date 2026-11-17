import { db, hasDb } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDb || !db) {
    return Response.json({ ok: true, mode: "standalone" });
  }
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, mode: "postgres" });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

