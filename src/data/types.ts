export type Timing = "NOW" | "SOON" | "EARLY_WATCH";

export type Competency =
  | "Pharmaceutical Glass"
  | "Specialty Glass & Glass-Ceramics"
  | "Glass-to-Metal Seals"
  | "Fiber Optics & Light Guides"
  | "Display & Cover Glass"
  | "Manufacturing & Regulatory";

export type SignalType =
  | "Clinical Trial"
  | "FDA Approval"
  | "EMA Update"
  | "Patent"
  | "Scientific Paper"
  | "Research Funding"
  | "Startup Funding"
  | "Competitor News"
  | "Regulatory Change"
  | "Article"
  | "Press Release"
  | "Conference"
  | "Procurement";

export interface Source {
  title: string;
  type: SignalType | "Database" | "Investor Relations";
  date: string; // ISO
  url: string;
  note: string;
}

export interface EvidenceMetric {
  label: string;
  value: string;
  trend?: "up" | "flat" | "down";
}

export interface Opportunity {
  id: string;
  title: string;
  segment: string;
  timing: Timing;
  confidence: number; // 0-100
  horizon: string; // demand horizon e.g. "2-4 years"
  summary: string;
  whySchott: string;
  whyNow: string;
  competencies: Competency[];
  evidence: EvidenceMetric[];
  evidenceNarrative: string;
  scoreDrivers: string[];
  risks: string[];
  sources: Source[];
  novelty: number; // 0-100, internal
  signalCount: number;
  updatedAt: string; // ISO
}

export interface FeedSignal {
  id: string;
  type: SignalType;
  title: string;
  date: string;
  source: string;
  sourceUrl: string;
  summary: string;
  segment: string;
  competency: Competency;
  timing: Timing;
  relatedOpportunityId?: string;
}

export type CompetitorMoveType =
  | "Acquisition"
  | "Partnership"
  | "Product Launch"
  | "Capacity Expansion"
  | "Investment"
  | "Patent"
  | "Hiring"
  | "Strategic Announcement"
  | "News";

export interface CompetitorMove {
  date: string;
  type: CompetitorMoveType;
  title: string;
  summary: string;
  sourceTitle: string;
  sourceUrl: string;
  relatedOpportunityId?: string;
}

export interface Competitor {
  id: string;
  name: string;
  category: "Pharma Packaging" | "Specialty Glass" | "Adjacent";
  hq: string;
  blurb: string;
  moves: CompetitorMove[];
}

export type ConnectionStatus = "connected" | "degraded" | "offline" | "manual";

export interface DataSource {
  id: string;
  name: string;
  category: "Clinical" | "Regulatory" | "IP" | "Science" | "Funding" | "Corporate" | "SCHOTT";
  url: string;
  status: ConnectionStatus;
  mode: "Live API" | "Manual Upload" | "Context";
  lastPulled: string;
  recordsPulled: number;
  example: string;
  error?: string;
}
