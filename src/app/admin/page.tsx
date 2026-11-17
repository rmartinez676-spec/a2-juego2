import Admin from "@/components/Admin";
import { loadGameData } from "@/lib/game-data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await loadGameData();
  return <Admin data={data} />;
}
