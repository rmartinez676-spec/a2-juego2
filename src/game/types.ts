export type StageKind = "tutorial" | "topic" | "boss" | "exam";

export interface QuestionDTO {
  id: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  reference: string | null;
  legalArticle?: string;
  legalText?: string;
}

export interface TopicDTO {
  id: number;
  blockId: number;
  position: number;
  title: string;
  summary: string;
  npcName: string;
  npcRole: string;
  npcLines: string[];
  tipName: string;
  tipRole: string;
  tipLines: string[];
  boeIds: string[];
  needsReview: boolean;
  questions: QuestionDTO[];
}

export interface BlockDTO {
  id: number;
  number: number;
  title: string;
  ministry: string;
  worldName: string;
  description: string;
  theme: string;
  bossName: string;
  bossIntro: string;
  bossStyle: string;
  topics: TopicDTO[];
}

export interface BoeSourceDTO {
  id: number;
  boeId: string;
  shortName: string;
  title: string;
  url: string | null;
  status: string;
  lastUpdate: string | null;
  reformCount: number;
  changed: boolean;
  lastCheckedAt: string | null;
}

export interface GameData {
  blocks: BlockDTO[];
  boeSources: BoeSourceDTO[];
}

export interface Stage {
  key: string;
  kind: StageKind;
  index: number;
  blockNumber: number;
  blockId: number;
  topicId: number | null;
  title: string;
  subtitle: string;
}

export interface Progress {
  completed: string[];
  testScores: Record<string, { score: number; total: number }>;
}

export interface ExitResult {
  completed: boolean;
  score?: number;
  total?: number;
}
