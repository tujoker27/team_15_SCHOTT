export type Sector =
  | "MedTech"
  | "New Energy"
  | "Semiconductors"
  | "High-Performance Computing"
  | "Defence";

export type TrafficLight = "green" | "amber" | "red";
export type Visibility = "Private" | "Shared" | "Team Visible" | "Submitted";
export type IdeaOwner = "My Ideas" | "Team Ideas" | "Submitted";

export const STAGES = [
  "Spark",
  "Market Scan",
  "Market Sizing",
  "SCHOTT Fit",
  "Competitive Landscape",
  "Risk Register",
  "Project Card",
] as const;
export type StageName = (typeof STAGES)[number];

export interface StageState {
  name: StageName;
  status: "complete" | "active" | "future";
  summary?: string;
  content?: string;
  traffic?: TrafficLight;
  source?: string;
  inputLabel?: string;
  prewrittenResponse?: string;
}

export interface Idea {
  id: string;
  title: string;
  sector: Sector;
  owner: IdeaOwner;
  visibility: Visibility;
  traffic: TrafficLight;
  context: string;
  activeStageIndex: number; // 0-6
  submitted?: boolean;
  stages: StageState[];
  date: string;
  oneLiner: string;
  projectCard?: ProjectCard;
}

export interface ProjectCard {
  executiveSummary: string;
  marketSize: string;
  confidence: "Low" | "Medium" | "High";
  marketTraffic: TrafficLight;
  capabilityScore: number; // /10
  capabilityText: string;
  competitivePosition: string;
  pros: string[];
  cons: { label: string; severity: "High" | "Medium" | "Low" }[];
  recommendation: "Pursue" | "Hold" | "Pass";
  recommendationBadge: TrafficLight;
  justification: string;
}

// ────────────────────────────────────────────────────────────────
// IDEA 1 — Glass Substrates for AI Chip Packaging (ACTIVE DEMO)
// ────────────────────────────────────────────────────────────────
const idea1: Idea = {
  id: "idea-glass-substrates",
  title: "Glass Substrates for AI Chip Packaging",
  sector: "Semiconductors",
  owner: "My Ideas",
  visibility: "Private",
  traffic: "green",
  date: "2026-05-22",
  oneLiner:
    "Precision borosilicate glass substrates and interposers for advanced AI/HPC chip packaging.",
  context:
    "Exploring SCHOTT's potential as a precision glass material supplier for semiconductor advanced packaging, specifically borosilicate glass substrates and interposers for AI and high-performance computing chip manufacturers including Intel, TSMC, and Samsung.",
  activeStageIndex: 3,
  stages: [
    {
      name: "Spark",
      status: "complete",
      traffic: "green",
      summary:
        "Core capability identified: specialty glass and ultra-flat glass manufacturing. Two clarifying questions sent.",
      content:
        "This is a strong strategic concept centred on SCHOTT's specialty glass and ultra-flat glass manufacturing capabilities. The semiconductor advanced packaging industry is undergoing a material transition from organic substrates to glass, driven by AI chip complexity and thermal management demands.\n\nBefore the market scan, two clarifying questions should be answered:\n• Are we focusing on glass core substrates, glass interposers, or both?\n• Is the target customer a chip manufacturer such as Intel or TSMC, or a substrate manufacturer such as SKC Absolics or Samsung Electro-Mechanics?",
      source: "IDTechEx Glass in Semiconductors 2026",
    },
    {
      name: "Market Scan",
      status: "complete",
      traffic: "green",
      summary:
        "Five supporting signals found. AGC already supplying. Differentiation through co-packaged optics identified.",
      content:
        "Five strongest evidence points:\n\n1. TSMC has publicly committed to glass interposer mass production between 2028 and 2029 through its CoPoS product line.\n2. Samsung confirmed glass substrate adoption for advanced semiconductor packaging by 2028, with a pilot line already operational at its Sejong facility.\n3. Intel has begun licensing its portfolio of 600+ glass substrate patents to external manufacturers, opening a direct entry path for material suppliers.\n4. AGC, a direct SCHOTT competitor, is already supplying low-CTE borosilicate glass sheets for early customer evaluations.\n5. The global glass substrate market for semiconductors is expected to grow strongly toward 2030, driven by AI and HPC demand.\n\nTwo counterarguments:\n• AGC and Corning already have established relationships with key customers, making qualification as a new supplier slow and expensive.\n• Panel-scale glass manufacturing for semiconductors requires different equipment from pharmaceutical tube-drawn glass, meaning significant capital investment is needed.",
      source: "IDTechEx 2026, TrendForce 2026",
    },
    {
      name: "Market Sizing",
      status: "complete",
      traffic: "green",
      summary:
        "Addressable market EUR 285M to EUR 865M by 2029. Exceeds EUR 50M threshold. Confidence: Medium.",
      content:
        "Market sizing calculation:\n\nThe total semiconductor advanced packaging market is projected to grow strongly toward 2029. Glass substrates are estimated to capture 8–12% of that market as organic substrates are displaced.\n\nA specialty glass material supplier serving substrate manufacturers would realistically capture 5–10% of the glass substrate value as the upstream material provider. This gives a SCHOTT-addressable market range of approximately EUR 285M to EUR 865M by 2029.\n\nThis significantly exceeds the EUR 50M threshold.\n\nConfidence: Medium — the market is real and the trajectory is credible, but the exact material-supplier share depends on whether SCHOTT is positioned as a commodity sheet supplier or a value-added precision glass partner.",
      source: "IDTechEx Glass in Semiconductors 2026, Future Markets Inc 2026",
    },
    {
      name: "SCHOTT Fit",
      status: "active",
      inputLabel: "Describe SCHOTT's relevant capabilities for this opportunity.",
      prewrittenResponse:
        "Most relevant SCHOTT capability: Specialty glass and advanced optics manufacturing — specifically the ability to produce ultra-flat, low-CTE borosilicate glass with high surface precision in a cleanroom environment.\n\nCapability fit score: 7 / 10.\n\nSCHOTT would need to invest in panel-scale glass processing equipment. Current pharmaceutical glass capabilities are highly relevant from a material science and quality perspective, but pharmaceutical glass uses tube drawing, while semiconductor packaging requires flat panels in the 300–510 mm range.\n\nThe single biggest internal gap is the absence of established customer relationships in the semiconductor advanced packaging supply chain — especially with Intel, TSMC, Samsung and major OSATs.\n\nTraffic light: Amber.\n\nSource: SCHOTT capability documentation, IDTechEx 2026.",
    },
    {
      name: "Competitive Landscape",
      status: "future",
      prewrittenResponse:
        "Key competitors:\n\n• AGC (Japan) — Already supplying low-CTE borosilicate sheets for early-stage evaluation. Strongest incumbent.\n• Corning (USA) — Deep semiconductor customer relationships and demonstrated ultra-flat glass capability.\n• SKC Absolics (USA/Korea) — Dedicated glass substrate factory in Covington, Georgia with large-scale investment and mass production targeted for the second half of the decade.\n• Nippon Electric Glass (Japan) — Ultra-thin glass for display and semiconductor applications with existing qualification at Japanese customers.\n\nAssessment: SCHOTT's entry would be primarily head-to-head with AGC on material properties, but potentially differentiated through co-packaged optics glass, where SCHOTT's fiber optics expertise adds a capability that pure semiconductor glass suppliers may not fully cover.\n\nTraffic light: Amber.\n\nSource: TrendForce 2026, IDTechEx 2026.",
    },
    {
      name: "Risk Register",
      status: "future",
      prewrittenResponse:
        "Four key risks:\n\n1. Customer qualification timeline — Severity: High. Semiconductor customers require ~18–36 months to qualify a new material supplier. If SCHOTT does not begin customer conversations soon, the 2028–2029 mass-production window may be missed.\n2. Capital investment requirement — Severity: High. Panel-scale glass processing equipment requires significant investment before SCHOTT can supply at commercial volumes.\n3. AGC incumbent advantage — Severity: Medium. AGC is already in evaluation with key customers.\n4. Technology shift risk — Severity: Low. Alternative advanced packaging technologies could reduce the speed or scale of glass substrate adoption.\n\nStrongest argument to proceed: Intel's licensing programme and the broader market push toward glass substrates suggest that the market may need multiple qualified glass suppliers. SCHOTT is technically positioned to become one if it acts early enough.\n\nTraffic light: Amber.\n\nSource: Mordor Intelligence 2026, IDTechEx 2026.",
    },
    { name: "Project Card", status: "future" },
  ],
  projectCard: {
    executiveSummary:
      "SCHOTT has an opportunity to enter the semiconductor advanced packaging materials market as a precision glass substrate supplier. The transition from organic to glass substrates is being driven by AI and high-performance computing demand. SCHOTT's borosilicate glass expertise and cleanroom manufacturing capability provide a technically credible foundation. The differentiated entry angle is co-packaged optics, where SCHOTT's fiber optics expertise could add a capability that pure semiconductor glass suppliers may not fully cover.",
    marketSize: "EUR 285M – 865M",
    confidence: "Medium",
    marketTraffic: "amber",
    capabilityScore: 7,
    capabilityText:
      "SCHOTT's specialty glass and cleanroom manufacturing capability addresses several material requirements for glass substrates. However, panel-scale processing equipment would be required to bridge the gap between current pharmaceutical tube-drawing geometry and semiconductor-grade flat panel dimensions.",
    competitivePosition:
      "Primary competitor AGC is already in customer evaluation and focuses on standard flat glass supply. Corning has strong semiconductor relationships. SCHOTT's differentiated position could be in co-packaged optics applications where glass must support both electrical and optical integration.",
    pros: [
      "Intel's patent licensing programme may provide a faster legal and technical entry path.",
      "TSMC and Samsung's target timelines create a defined commercial demand window.",
      "SCHOTT may have a differentiated angle through the combination of specialty glass and fiber optics.",
    ],
    cons: [
      { label: "Customer qualification timeline", severity: "High" },
      { label: "Capital investment requirement", severity: "High" },
      { label: "AGC incumbent advantage", severity: "Medium" },
      { label: "Technology shift risk", severity: "Low" },
    ],
    recommendation: "Pursue",
    recommendationBadge: "green",
    justification:
      "The market opportunity is credible, SCHOTT's capability fit is technically plausible, and the co-packaged optics angle offers differentiation. However, action within the qualification window is required.",
  },
};

// ────────────────────────────────────────────────────────────────
// IDEA 2 — Radiopharmaceutical Containment Vials (Submitted)
// ────────────────────────────────────────────────────────────────
const idea2: Idea = {
  id: "idea-radiopharma-vials",
  title: "Radiopharmaceutical Containment Vials",
  sector: "MedTech",
  owner: "Submitted",
  visibility: "Submitted",
  traffic: "green",
  submitted: true,
  date: "2026-04-18",
  oneLiner:
    "Pharma-grade vials engineered with radiation-shielding glass for Lu-177 and other radioligand therapies.",
  context:
    "Intersection of SCHOTT pharmaceutical glass and radiation-shielding specialty glass for the rapidly growing radiopharmaceutical therapy market.",
  activeStageIndex: 6,
  stages: [
    {
      name: "Spark",
      status: "complete",
      traffic: "green",
      summary:
        "Core capability identified: intersection of pharmaceutical glass and radiation-shielding specialty glass.",
      content:
        "Cross-divisional play: combines SCHOTT Pharma's vial expertise with specialty-glass radiation shielding. Strong fit with HVS strategy.",
      source: "SCHOTT Pharma Annual Report 2025",
    },
    {
      name: "Market Scan",
      status: "complete",
      traffic: "green",
      summary:
        "Lu-177 market growth signal identified. No competitor clearly combines pharma purity with radiation shielding.",
      content:
        "Lu-177 and Ac-225 radioligand therapy approvals are accelerating. Current containment uses lead pots with separate pharma vials — a single integrated container is an unmet need.",
      source: "EMA & FDA approvals tracker 2026",
    },
    {
      name: "Market Sizing",
      status: "complete",
      traffic: "green",
      summary: "Addressable market estimated above EUR 50M. Confidence: Medium.",
      content:
        "Addressable market estimated at EUR 80–180M by 2030 as radioligand therapy volumes scale. Above the EUR 50M threshold.",
      source: "Evaluate Pharma 2026",
    },
    {
      name: "SCHOTT Fit",
      status: "complete",
      traffic: "green",
      summary: "SCHOTT fit score 8 out of 10. Cross-divisional capability confirmed.",
      content:
        "Combination of SCHOTT Pharma EVERIC vial coatings and specialty radiation-shielding glass gives an 8/10 capability fit. Cleanroom and GMP infrastructure already in place.",
      source: "SCHOTT Pharma Business Factsheet 2025",
    },
    {
      name: "Competitive Landscape",
      status: "complete",
      traffic: "green",
      summary: "No direct competitor identified. First-mover opportunity possible.",
      content:
        "No competitor today offers an integrated pharma-grade radiation-shielded primary container. Stevanato and Gerresheimer supply pharma vials; Mirion supplies shielding — none combine both.",
      source: "General market data",
    },
    {
      name: "Risk Register",
      status: "complete",
      traffic: "amber",
      summary: "Regulatory complexity high. Product development timeline 3–4 years.",
      content:
        "Dual regulatory pathway (pharma primary packaging + radiation containment). Estimated 3–4 year development and qualification cycle.",
      source: "General market data",
    },
    {
      name: "Project Card",
      status: "complete",
      traffic: "green",
      summary: "Recommendation: Pursue.",
      content: "Submitted as formal project proposal.",
    },
  ],
  projectCard: {
    executiveSummary:
      "Integrated radiation-shielded pharmaceutical vials for the radioligand therapy market — a cross-divisional play between SCHOTT Pharma and specialty glass.",
    marketSize: "EUR 80M – 180M",
    confidence: "Medium",
    marketTraffic: "green",
    capabilityScore: 8,
    capabilityText:
      "Excellent capability fit combining EVERIC pharma vial expertise with specialty radiation-shielding glass.",
    competitivePosition: "No direct competitor — potential first-mover advantage.",
    pros: [
      "First-mover advantage in an integrated product category.",
      "Cross-divisional leverage between Pharma and Specialty Glass.",
      "Growing Lu-177 and Ac-225 therapy pipeline.",
    ],
    cons: [
      { label: "Dual regulatory pathway", severity: "High" },
      { label: "Long development cycle (3–4 yrs)", severity: "Medium" },
    ],
    recommendation: "Pursue",
    recommendationBadge: "green",
    justification:
      "Strong strategic fit, unmet market need, and cross-divisional differentiation justify formal project initiation.",
  },
};

// ────────────────────────────────────────────────────────────────
// IDEA 3 — Solid-State Battery Separator Glass
// ────────────────────────────────────────────────────────────────
const idea3: Idea = {
  id: "idea-ssb-separator",
  title: "Solid-State Battery Separator Glass",
  sector: "New Energy",
  owner: "Team Ideas",
  visibility: "Shared",
  traffic: "amber",
  date: "2026-05-10",
  oneLiner:
    "Ultra-thin CERAN glass-ceramic separators for next-generation solid-state batteries.",
  context:
    "Evaluating SCHOTT CERAN glass-ceramic as an ultra-thin separator material for solid-state batteries, targeting Toyota, QuantumScape and emerging Asian battery manufacturers.",
  activeStageIndex: 2,
  stages: [
    {
      name: "Spark",
      status: "complete",
      traffic: "green",
      summary:
        "Core capability identified: SCHOTT CERAN glass-ceramic for ultra-thin separator applications.",
      content:
        "SCHOTT's CERAN glass-ceramic platform is technically extendable to thin separator membranes for solid-state batteries.",
      source: "General market data",
    },
    {
      name: "Market Scan",
      status: "complete",
      traffic: "green",
      summary:
        "Toyota investment and solid-state battery market growth signal confirmed.",
      content:
        "Toyota committed to commercial solid-state batteries by 2027–2028. Multiple Asian and US players investing heavily. Glass-ceramic separators are one of three competing approaches.",
      source: "BloombergNEF 2026",
    },
    {
      name: "Market Sizing",
      status: "active",
      inputLabel: "Refine market sizing assumptions.",
      prewrittenResponse:
        "Market sizing:\n\nThe global solid-state battery market is projected to grow strongly through 2030. Glass-ceramic separators may capture a meaningful share of material value because of their role in thermal stability, ion transport and dendrite prevention.\n\nSCHOTT as a material supplier to battery manufacturers could target a niche but potentially attractive portion of this market.\n\nEstimated addressable range: EUR 90M to EUR 400M by 2030.\n\nConfidence: Low to Medium — technology adoption timeline is uncertain and polymer, oxide and sulfide-based separators remain competing approaches.\n\nTraffic light: Amber.\n\nSource: BloombergNEF 2026, IDTechEx Solid-State Batteries 2025.",
    },
    { name: "SCHOTT Fit", status: "future" },
    { name: "Competitive Landscape", status: "future" },
    { name: "Risk Register", status: "future" },
    { name: "Project Card", status: "future" },
  ],
};

// ────────────────────────────────────────────────────────────────
// IDEA 4 — Hermetic Seals for Defence Drone Electronics
// ────────────────────────────────────────────────────────────────
const idea4: Idea = {
  id: "idea-defence-seals",
  title: "Hermetic Seals for Defence Drone Electronics",
  sector: "Defence",
  owner: "Team Ideas",
  visibility: "Team Visible",
  traffic: "amber",
  date: "2026-05-19",
  oneLiner:
    "Glass-to-metal hermetic seals for ruggedized autonomous drone electronics.",
  context:
    "Applying SCHOTT's glass-to-metal hermetic sealing capability to high-reliability electronics enclosures for military and autonomous drone platforms.",
  activeStageIndex: 1,
  stages: [
    {
      name: "Spark",
      status: "complete",
      traffic: "green",
      summary: "Core capability identified: glass-to-metal hermetic seals.",
      content:
        "SCHOTT's existing glass-to-metal sealing business already serves aerospace and industrial customers — directly relevant to defence drone electronics.",
      source: "SCHOTT capability documentation",
    },
    {
      name: "Market Scan",
      status: "active",
      inputLabel: "Continue market scan.",
      prewrittenResponse:
        "Five strongest signals:\n\n1. Military drone demand is increasing globally.\n2. Defence procurement notices increasingly mention ruggedized and hermetically sealed electronics.\n3. Autonomous drone systems require reliable electronics protection under harsh environmental conditions.\n4. Supply chains for high-reliability electronics enclosures are under capacity pressure.\n5. SCHOTT already has relevant glass-to-metal sealing capabilities used in aerospace and industrial applications.\n\nTwo counterarguments:\n• Defence procurement cycles are long.\n• Export control and ITAR-related restrictions may complicate international supply.\n\nTraffic light: Green.\n\nSource: Jane's Defence 2026, US DoD Procurement Portal 2026.",
    },
    { name: "Market Sizing", status: "future" },
    { name: "SCHOTT Fit", status: "future" },
    { name: "Competitive Landscape", status: "future" },
    { name: "Risk Register", status: "future" },
    { name: "Project Card", status: "future" },
  ],
};

export const ideas: Idea[] = [idea1, idea2, idea3, idea4];

export function getIdea(id: string): Idea | undefined {
  return ideas.find((i) => i.id === id);
}
