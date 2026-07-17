export type AgentStatus = "active" | "paused";

export interface AgentActivity {
  id: string;
  leadName: string;
  action: "found" | "added" | "scored";
  detail: string;
  score: number;
  timestamp: string;
}

export interface AgentCriteria {
  locations: string;
  minBudget: number;
  maxBudget: number;
  propertyType: string;
  minScore: number;
}
