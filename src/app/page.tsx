import Game from "@/components/Game";
import { loadGameData } from "@/lib/game-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await loadGameData();
  return <Game data={data} />;
}
