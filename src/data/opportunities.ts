import type { Opportunity } from "./types";

export const opportunities: Opportunity[] = [
  {
    id: "glp1-injectable-packaging",
    title: "GLP-1 Injectable Packaging Expansion",
    segment: "Pharmaceutical Packaging — Metabolic Disease",
    timing: "NOW",
    confidence: 87,
    horizon: "Demand scaling 2–4 years",
    summary:
      "Rapid Phase III expansion of GLP-1 and GLP-1/GIP therapies signals a structural step-up in demand for high-purity Type I borosilicate cartridges, prefillable syringes, and vials. Auto-injector platforms are converging on standardized glass primary containers.",
    whySchott:
      "Direct match to SCHOTT Pharma's Fiolax tubing and prefillable syringe/cartridge portfolio. GLP-1 molecules are sensitive to silicone oil and tungsten residues, favoring SCHOTT's siliconisation-free and low-tungsten syringe lines. Clean-room production and decades of FDA/EMA regulatory experience are the moat here, not the molecule.",
    whyNow:
      "Eli Lilly and Novo Nordisk have moved multiple obesity and cardiovascular indications into Phase III in the last 18 months, with announced multi-billion capex into fill-finish capacity. FDA approval cadence for incretin-class drugs has accelerated through 2025–2026. Cartridge demand lags drug approval by 18–30 months — the qualification window for new primary packaging is open now.",
    competencies: ["Pharmaceutical Glass", "Manufacturing & Regulatory"],
    evidence: [
      { label: "Phase III trials, 24 mo", value: "42", trend: "up" },
      { label: "Related patents", value: "18", trend: "up" },
      { label: "FDA approvals, incretin class", value: "7", trend: "up" },
      { label: "Competitor capacity announcements", value: "4", trend: "up" },
    ],
    evidenceNarrative:
      "Trial pipeline has shifted decisively from Phase II to Phase III, the canonical 2–4 year demand proxy for primary packaging. Patent filings cluster around low-extractable glass formulations and siliconisation alternatives, confirming that primary-container quality is a recognised industry constraint, not a solved problem.",
    scoreDrivers: [
      "Strong strategic fit with pharmaceutical glass portfolio",
      "Multiple Phase III trials with disclosed commercial-scale plans",
      "Accelerating FDA approval momentum",
      "High source reliability (ClinicalTrials.gov, openFDA, SEC filings)",
      "Demand horizon clearly within 2–4 year action window",
    ],
    risks: [
      "Competitor capacity (Stevanato, Gerresheimer) already expanding aggressively",
      "Polymer-based primary containers may take share for higher-viscosity formulations",
      "Pricing pressure as supply catches up post-2027",
    ],
    sources: [
      {
        title: "Tirzepatide Phase III obesity trial (SURMOUNT-MAINTAIN)",
        type: "Clinical Trial",
        date: "2026-02-14",
        url: "https://clinicaltrials.gov/study/NCT05931367",
        note: "Phase III, primary completion 2027 — demand proxy 2028–2029.",
      },
      {
        title: "openFDA: Wegovy supplemental approval",
        type: "FDA Approval",
        date: "2026-03-08",
        url: "https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:Wegovy",
        note: "New cardiovascular indication broadens addressable patient population.",
      },
      {
        title: "Novo Nordisk capex update — fill/finish expansion",
        type: "Press Release",
        date: "2026-01-22",
        url: "https://www.novonordisk.com/news-and-media/news-and-ir-materials.html",
        note: "EUR 6.8B committed to primary packaging and aseptic fill capacity.",
      },
      {
        title: "WO2025/118432 — Low-extractable borosilicate cartridge",
        type: "Patent",
        date: "2025-11-04",
        url: "https://patents.google.com/?q=WO2025118432",
        note: "Stevanato filing — confirms primary-container quality as active R&D frontier.",
      },
      {
        title: "SEC 10-K — Eli Lilly 2025",
        type: "Article",
        date: "2026-02-19",
        url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000059478&type=10-K",
        note: "Discloses multi-year primary packaging supply agreements.",
      },
    ],
    novelty: 35,
    signalCount: 71,
    updatedAt: "2026-05-28",
  },
  {
    id: "cart-cryogenic-vials",
    title: "Cryogenic Vials for Autologous CAR-T Containment",
    segment: "Cell & Gene Therapy — Hematologic Oncology",
    timing: "SOON",
    confidence: 74,
    horizon: "Demand scaling 3–5 years",
    summary:
      "Autologous CAR-T and TCR therapies require primary containers stable at −150 °C with documented integrity across freeze-thaw cycles. As ATMP approvals broaden beyond hematologic cancers, demand for purpose-engineered cryogenic borosilicate vials grows faster than generic vial supply.",
    whySchott:
      "Specialty glass and glass-ceramic compositions can be tuned for cryogenic mechanical stability and gas-tightness — a non-obvious extension of SCHOTT's Fiolax and sealing-glass capabilities. Clean-room volumes are small but margin-rich.",
    whyNow:
      "EMA and FDA ATMP approvals are tracking ahead of consensus through 2026. Multiple Phase II solid-tumor CAR-T programs have moved to Phase III with cryogenic supply chains explicitly cited in CMC sections. The 3–5 year window aligns with SCHOTT's typical material qualification cycle for ATMPs.",
    competencies: ["Pharmaceutical Glass", "Specialty Glass & Glass-Ceramics"],
    evidence: [
      { label: "Phase II→III ATMP transitions, 18 mo", value: "23", trend: "up" },
      { label: "EU ATMP approvals 2025", value: "11", trend: "up" },
      { label: "Cryogenic primary-container patents", value: "9", trend: "up" },
      { label: "NIH RePORTER grants — cryostorage", value: "USD 142M", trend: "up" },
    ],
    evidenceNarrative:
      "Signal density is moderate but coherent. Both clinical pipeline and patent activity point at the same constraint (cryogenic integrity), and public funding is reinforcing the trajectory. Not yet a NOW-window opportunity because most programs are still Phase II.",
    scoreDrivers: [
      "Distinct material-science angle few competitors hold",
      "Clear unmet need in ATMP CMC packages",
      "Public funding signal corroborates private pipeline",
      "Time-to-demand fits SCHOTT specialty-glass qualification cycle",
    ],
    risks: [
      "Per-batch volumes very low — commercial model needs tuning",
      "Some sponsors prefer cryo-bags over vials",
      "Logistics players (Cryoport, BioLife) may bundle containers",
    ],
    sources: [
      {
        title: "EMA ATMP register — 2025 approvals",
        type: "EMA Update",
        date: "2026-01-15",
        url: "https://www.ema.europa.eu/en/human-regulatory-overview/advanced-therapy-medicinal-products-overview",
        note: "11 ATMPs approved in 2025, up from 6 in 2024.",
      },
      {
        title: "EU-CTIS: Solid-tumor CAR-T Phase III (2025-503112-19-00)",
        type: "Clinical Trial",
        date: "2026-04-02",
        url: "https://euclinicaltrials.eu/ctis-public/search",
        note: "First Phase III solid-tumor CAR-T with explicit cryogenic vial CMC.",
      },
      {
        title: "EP4382112 — Borosilicate vial for cryogenic storage",
        type: "Patent",
        date: "2025-09-30",
        url: "https://worldwide.espacenet.com/patent/search?q=EP4382112",
        note: "Independent filing on cryogenic-grade primary container.",
      },
      {
        title: "NIH RePORTER — Cryopreservation Program Projects",
        type: "Research Funding",
        date: "2026-02-01",
        url: "https://reporter.nih.gov/search/?searchtext=cryopreservation+cell+therapy",
        note: "USD 142M cumulative active funding signals durable demand.",
      },
    ],
    novelty: 72,
    signalCount: 38,
    updatedAt: "2026-05-27",
  },
  {
    id: "bci-hermetic-feedthroughs",
    title: "Hermetic Glass-to-Metal Feedthroughs for Brain-Computer Interfaces",
    segment: "Implantable Devices — Neuromodulation",
    timing: "SOON",
    confidence: 71,
    horizon: "Demand scaling 3–6 years",
    summary:
      "Invasive BCI and high-channel-count neuromodulation implants require hermetic feedthroughs with channel counts an order of magnitude higher than legacy pacemakers. Funded clinical-stage programs are converging on glass-to-metal sealing as the lifetime-reliability path.",
    whySchott:
      "Direct fit with SCHOTT's hermetic glass-to-metal sealing capabilities used in implantable devices. The 1,024+ channel requirement of next-gen BCI is the exact niche where ceramic feedthroughs struggle and where SCHOTT's high-density sealing IP becomes decisive.",
    whyNow:
      "Multiple BCI companies (Neuralink, Synchron, Precision Neuroscience) raised pre-IPO rounds in 2025–2026 with disclosed in-human pivotal timing. FDA Breakthrough Device designations have accelerated. Implant qualification is a 4–6 year cycle — material partners are being chosen now.",
    competencies: ["Glass-to-Metal Seals", "Specialty Glass & Glass-Ceramics", "Manufacturing & Regulatory"],
    evidence: [
      { label: "BCI startup funding 2025", value: "USD 1.4B", trend: "up" },
      { label: "FDA Breakthrough Designations (BCI)", value: "6", trend: "up" },
      { label: "Active IDE studies", value: "9", trend: "up" },
      { label: "Hermetic feedthrough patents 24 mo", value: "47", trend: "up" },
    ],
    evidenceNarrative:
      "Funding signal is the leading indicator here; clinical evidence is still thin (most programs are first-in-human). Patent activity is concentrated in feedthrough density and biocompatibility, exactly SCHOTT's competency surface.",
    scoreDrivers: [
      "Funding momentum signals 3–6 year demand build",
      "Technical requirements favor glass-to-metal over ceramic",
      "SCHOTT has incumbency in adjacent implantables (cardiac, cochlear)",
      "Few qualified suppliers globally",
    ],
    risks: [
      "Regulatory path for high-channel implants still being defined",
      "Per-device volumes remain low for years",
      "Some sponsors are vertically integrating sealing in-house",
    ],
    sources: [
      {
        title: "Synchron Series D funding round",
        type: "Startup Funding",
        date: "2026-03-11",
        url: "https://dealroom.co/companies/synchron",
        note: "USD 200M raise; commercialization timeline disclosed for 2028.",
      },
      {
        title: "FDA 510(k) database — neuromodulation clearances",
        type: "FDA Approval",
        date: "2026-02-28",
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm",
        note: "Cadence of high-channel neurostimulator clearances rising YoY.",
      },
      {
        title: "US2026/0034521 A1 — High-density hermetic feedthrough",
        type: "Patent",
        date: "2026-01-09",
        url: "https://patents.google.com/?q=US20260034521",
        note: "Filed by Precision Neuroscience — signals supplier qualification phase.",
      },
      {
        title: "ClinicalTrials.gov: BCI Pivotal IDE",
        type: "Clinical Trial",
        date: "2026-04-19",
        url: "https://clinicaltrials.gov/study/NCT06241324",
        note: "First multi-site BCI IDE — meaningful implant volume by 2028.",
      },
    ],
    novelty: 68,
    signalCount: 44,
    updatedAt: "2026-05-26",
  },
  {
    id: "cgm-cover-glass",
    title: "Ultra-Thin Cover Glass for Next-Gen Continuous Glucose Monitors",
    segment: "Wearable MedTech — Metabolic Monitoring",
    timing: "NOW",
    confidence: 81,
    horizon: "Demand scaling 1–3 years",
    summary:
      "Next-generation CGMs are converging on optical sensing modalities (Raman, fluorescence) that require ultra-thin, chemically strengthened cover glass with controlled optical properties. Adoption is broadening from diabetes into mass-market metabolic wellness.",
    whySchott:
      "Display and cover-glass platform (ultra-thin chemically strengthened glass) maps directly. SCHOTT's experience with optical-grade thin glass for AR/VR is the bridge.",
    whyNow:
      "Dexcom, Abbott, and at least two well-funded entrants disclosed optical-modality CGM programs in late 2025 with 2027 launches. FDA pre-submission activity is up sharply. Cover-glass qualification is a 12–18 month cycle — the window is now.",
    competencies: ["Display & Cover Glass", "Specialty Glass & Glass-Ceramics"],
    evidence: [
      { label: "510(k) CGM submissions 2025", value: "14", trend: "up" },
      { label: "Optical-CGM patents 24 mo", value: "29", trend: "up" },
      { label: "Phase III CGM-integrated insulin trials", value: "12", trend: "up" },
      { label: "Wearable-MedTech funding 2025", value: "USD 2.1B", trend: "up" },
    ],
    evidenceNarrative:
      "Three independent signal streams (regulatory submissions, IP, and commercial pipeline) converge on the same 2027 launch window. The optical-modality shift is the meaningful change — generic enzymatic CGMs do not need specialty cover glass.",
    scoreDrivers: [
      "Three converging signal streams with same horizon",
      "Optical-modality shift creates new material requirement",
      "SCHOTT has direct platform fit (AR/VR thin glass)",
      "Short qualification cycle = NOW timing",
    ],
    risks: [
      "Polymer cover materials remain a viable alternative",
      "Some sensor architectures may not require glass",
      "Corning is a likely strong competitor with Gorilla Glass variants",
    ],
    sources: [
      {
        title: "openFDA 510(k): K252134 — Optical CGM submission",
        type: "FDA Approval",
        date: "2026-03-22",
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K252134",
        note: "First optical-modality CGM 510(k) acceptance.",
      },
      {
        title: "Dexcom Investor Day 2026",
        type: "Press Release",
        date: "2026-04-08",
        url: "https://investors.dexcom.com/events",
        note: "Disclosed optical-sensing roadmap for 2027 launch.",
      },
      {
        title: "WO2026/041823 — Thin cover glass for biosensors",
        type: "Patent",
        date: "2026-02-12",
        url: "https://patents.google.com/?q=WO2026041823",
        note: "Abbott-affiliated filing on ultra-thin optical cover.",
      },
      {
        title: "OpenAlex: Optical glucose sensing publication trend",
        type: "Scientific Paper",
        date: "2026-01-30",
        url: "https://api.openalex.org/works?search=optical+glucose+sensing",
        note: "Publication count +180% vs 2023 baseline.",
      },
    ],
    novelty: 58,
    signalCount: 55,
    updatedAt: "2026-05-28",
  },
  {
    id: "single-use-light-guides",
    title: "Single-Use Light Guides for Disposable Surgical Endoscopes",
    segment: "Surgical Devices — Minimally Invasive",
    timing: "NOW",
    confidence: 76,
    horizon: "Demand scaling 1–4 years",
    summary:
      "Hospital infection-control economics are pushing single-use endoscopes from niche to default in bronchoscopy, ureteroscopy, and increasingly duodenoscopy. Per-device light-guide consumption shifts from durable to disposable — a unit-volume step change.",
    whySchott:
      "SCHOTT's fiber-optic and light-guide portfolio is incumbent in reusable endoscopes. The disposable transition needs lower-cost, simplified light guides at much higher unit volumes — a manufacturing rather than R&D challenge that SCHOTT's global production network can address.",
    whyNow:
      "FDA reinforced single-use guidance after 2024 duodenoscope contamination incidents. Boston Scientific, Olympus, and Ambu have all expanded single-use lines in 2025–2026. Hospital procurement contracts for 2027 are being negotiated now.",
    competencies: ["Fiber Optics & Light Guides", "Manufacturing & Regulatory"],
    evidence: [
      { label: "Single-use endoscope 510(k) clearances 24 mo", value: "31", trend: "up" },
      { label: "Procurement RFPs (US IDNs)", value: "62", trend: "up" },
      { label: "Reprocessing-related FDA safety comms", value: "4", trend: "up" },
      { label: "Competitor capacity announcements", value: "3", trend: "up" },
    ],
    evidenceNarrative:
      "Clearance cadence and procurement activity are both rising at the same pace, which is a strong indicator that the supply side is responding to confirmed demand rather than speculating about it.",
    scoreDrivers: [
      "Demand structural, not cyclical (regulatory-driven)",
      "Manufacturing match — SCHOTT scale and clean-room",
      "Incumbency advantage with existing endoscope OEMs",
      "Short qualification cycle",
    ],
    risks: [
      "Polymer light guides may take share in lowest-cost segment",
      "Margin compression as volumes rise",
    ],
    sources: [
      {
        title: "FDA Safety Communication — Duodenoscope reprocessing",
        type: "Regulatory Change",
        date: "2025-12-04",
        url: "https://www.fda.gov/medical-devices/safety-communications",
        note: "Reinforces preference for single-use designs.",
      },
      {
        title: "Boston Scientific Q4 2025 earnings call",
        type: "Press Release",
        date: "2026-02-01",
        url: "https://investors.bostonscientific.com/news-events",
        note: "Disclosed 40% capacity increase for EXALT single-use line.",
      },
      {
        title: "openFDA 510(k) — Single-use bronchoscope clearance",
        type: "FDA Approval",
        date: "2026-03-15",
        url: "https://api.fda.gov/device/510k.json?search=device_name:single-use+bronchoscope",
        note: "31 clearances in trailing 24 months, +120% vs prior period.",
      },
    ],
    novelty: 28,
    signalCount: 49,
    updatedAt: "2026-05-25",
  },
  {
    id: "ar-surgical-waveguides",
    title: "Waveguide Optics for Augmented-Reality Surgical Navigation",
    segment: "Surgical Devices — Visualization",
    timing: "SOON",
    confidence: 68,
    horizon: "Demand scaling 4–6 years",
    summary:
      "AR-guided orthopedic and neurosurgical platforms are accumulating clinical evidence and reimbursement traction. High refractive-index waveguides differentiate the optical experience and are the supply-chain bottleneck.",
    whySchott:
      "SCHOTT RealView high-refractive-index wafers and broader waveguide portfolio are direct platform-level fits. Existing AR/VR consumer engagements de-risk the technology curve.",
    whyNow:
      "FDA approvals for AR surgical navigation systems doubled 2024→2026. CMS reimbursement codes for AR-guided spine procedures were finalized in early 2026. Hardware supplier qualification typically precedes commercial launch by 36 months.",
    competencies: ["Display & Cover Glass", "Specialty Glass & Glass-Ceramics"],
    evidence: [
      { label: "FDA-cleared AR surgical systems", value: "11", trend: "up" },
      { label: "CMS reimbursement coverage (US)", value: "Expanded 2026", trend: "up" },
      { label: "Waveguide patents (med-surgical)", value: "22", trend: "up" },
      { label: "Surgeon-pilot publications", value: "+140% YoY", trend: "up" },
    ],
    evidenceNarrative:
      "Reimbursement is the leading indicator — once codes exist, OEM commercial budgets unlock 12–24 months later, and supplier qualification follows. Signal density is moderate and growing.",
    scoreDrivers: [
      "Reimbursement signal is high-quality timing proxy",
      "SCHOTT has unique high-index waveguide IP",
      "Supplier base is narrow — defensible position",
    ],
    risks: [
      "Surgical AR adoption may stay clinical-trial niche longer than expected",
      "Headset form factor is still evolving rapidly",
    ],
    sources: [
      {
        title: "CMS Final Rule — AR-Guided Spine Surgery Coverage",
        type: "Regulatory Change",
        date: "2026-01-20",
        url: "https://www.cms.gov/medicare-coverage-database",
        note: "Establishes reimbursement pathway, unlocks OEM budgets.",
      },
      {
        title: "FDA 510(k) K251987 — AR surgical navigation",
        type: "FDA Approval",
        date: "2026-02-25",
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K251987",
        note: "Eleventh AR surgical system clearance.",
      },
      {
        title: "PubMed publication trend — AR surgical navigation",
        type: "Scientific Paper",
        date: "2026-03-01",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=augmented+reality+surgical+navigation",
        note: "Publication count +140% YoY confirming clinical traction.",
      },
    ],
    novelty: 62,
    signalCount: 33,
    updatedAt: "2026-05-24",
  },
  {
    id: "leadless-pacemaker-lids",
    title: "Hermetic Lithium Battery Lids for Leadless Pacemakers",
    segment: "Implantable Devices — Cardiac",
    timing: "NOW",
    confidence: 79,
    horizon: "Demand scaling 1–3 years",
    summary:
      "Leadless pacemaker adoption is accelerating as second-generation devices with dual-chamber capability win clearance. Battery hermeticity over 12+ year implant life is the gating reliability constraint, favoring SCHOTT's gas-tight lid systems.",
    whySchott:
      "Direct match to SCHOTT's hermetic lid and glass-to-metal sealing portfolio for primary lithium cells. Leadless devices are smaller and have less tolerance for failure than transvenous systems — quality moat applies.",
    whyNow:
      "Multiple second-generation leadless pacemakers reached FDA clearance in 2025–2026. Procedural volumes are tracking 25%+ annual growth. Battery supplier qualification is already underway at major OEMs.",
    competencies: ["Glass-to-Metal Seals", "Specialty Glass & Glass-Ceramics", "Manufacturing & Regulatory"],
    evidence: [
      { label: "FDA-cleared leadless pacemakers", value: "5", trend: "up" },
      { label: "Annual implant volume growth", value: "+26%", trend: "up" },
      { label: "Battery hermeticity patents 24 mo", value: "14", trend: "up" },
      { label: "Procedure reimbursement expansion", value: "EU + US 2026", trend: "up" },
    ],
    evidenceNarrative:
      "Clearance, volume, and reimbursement signals are all NOW-window. IP activity confirms hermeticity is the recognised constraint, not just a marketing point.",
    scoreDrivers: [
      "SCHOTT incumbency in cardiac implant batteries",
      "All three signal types converging on near-term horizon",
      "Reliability requirements favor specialty over commodity",
    ],
    risks: [
      "Leadless adoption pace depends on physician training",
      "Battery-chemistry shifts could change lid requirements",
    ],
    sources: [
      {
        title: "FDA approval — Aveir DR dual-chamber leadless pacemaker",
        type: "FDA Approval",
        date: "2025-11-12",
        url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P200035",
        note: "First dual-chamber leadless system at scale.",
      },
      {
        title: "Abbott Q1 2026 earnings — CRM segment",
        type: "Press Release",
        date: "2026-04-17",
        url: "https://abbott.mediaroom.com",
        note: "Leadless volume up 26% YoY.",
      },
      {
        title: "Espacenet — Hermetic Li-cell lid patents",
        type: "Patent",
        date: "2026-02-08",
        url: "https://worldwide.espacenet.com/patent/search?q=hermetic+lithium+pacemaker",
        note: "14 filings 24 mo, concentrated in glass-metal interface.",
      },
    ],
    novelty: 40,
    signalCount: 52,
    updatedAt: "2026-05-28",
  },
  {
    id: "lab-on-chip-decentralised",
    title: "Lab-on-Chip Substrates for Decentralised Diagnostics",
    segment: "In-Vitro Diagnostics — Point of Care",
    timing: "SOON",
    confidence: 66,
    horizon: "Demand scaling 3–5 years",
    summary:
      "Decentralised diagnostics platforms are moving from centralised reference labs to point-of-care and home settings, driving demand for precision-structured glass substrates with integrated optical and fluidic features.",
    whySchott:
      "NEXTERION and broader structured-glass capabilities at SCHOTT MINIFAB match this exactly. Combining coatings, micro-structures, and hermetic packaging in a single substrate is the SCHOTT differentiator.",
    whyNow:
      "NIH and EU public funding for decentralised diagnostics has expanded materially in 2025–2026 post-pandemic. FDA OTC clearance pathways for molecular diagnostics opened. Multi-year qualification cycle starts now.",
    competencies: ["Specialty Glass & Glass-Ceramics", "Manufacturing & Regulatory"],
    evidence: [
      { label: "NIH POC diagnostics funding 2025", value: "USD 380M", trend: "up" },
      { label: "FDA OTC molecular diagnostic clearances", value: "9", trend: "up" },
      { label: "Lab-on-chip patents 24 mo", value: "67", trend: "up" },
      { label: "EU CORDIS funded projects", value: "23", trend: "up" },
    ],
    evidenceNarrative:
      "Funding plus regulatory signal — classic SOON pattern. IP activity is broad, which suggests the technology will commoditise; SCHOTT's edge is in precision manufacturing, not in the platform IP itself.",
    scoreDrivers: [
      "Strong public funding signal",
      "Regulatory pathway clarifying",
      "Manufacturing fit (precision, clean-room)",
    ],
    risks: [
      "Polymer substrates dominate cost-sensitive segments",
      "Platform IP is fragmented — supplier role only",
    ],
    sources: [
      {
        title: "NIH RePORTER — POC diagnostics 2025 awards",
        type: "Research Funding",
        date: "2026-01-10",
        url: "https://reporter.nih.gov/search/?searchtext=point+of+care+diagnostics",
        note: "USD 380M cumulative 2025 funding.",
      },
      {
        title: "EU CORDIS — Horizon Europe IVD program",
        type: "Research Funding",
        date: "2026-02-15",
        url: "https://cordis.europa.eu/projects",
        note: "23 funded projects with structured-glass component.",
      },
      {
        title: "FDA OTC molecular diagnostic clearance pathway",
        type: "Regulatory Change",
        date: "2025-10-22",
        url: "https://www.fda.gov/medical-devices/in-vitro-diagnostics",
        note: "Clarifies OTC route — accelerates commercialization.",
      },
    ],
    novelty: 55,
    signalCount: 41,
    updatedAt: "2026-05-23",
  },
  {
    id: "mrna-cold-chain-ampoules",
    title: "Low-Extractable Ampoules for Self-Amplifying mRNA",
    segment: "Pharmaceutical Packaging — Vaccines",
    timing: "EARLY_WATCH",
    confidence: 54,
    horizon: "Demand scaling 5–8 years",
    summary:
      "Self-amplifying mRNA (saRNA) platforms are entering Phase I/II with lower-dose, room-temperature-stable profiles that could expand mRNA beyond cold-chain. Container compatibility with novel LNP formulations is an unresolved CMC question.",
    whySchott:
      "Specialty borosilicate with controlled extractables fits saRNA stability requirements. Too early for capacity decisions but worth scientific engagement now.",
    whyNow:
      "Not yet a commercial timing question. Engagement-now opportunity through scientific partnerships and academic collaboration to shape future material requirements.",
    competencies: ["Pharmaceutical Glass", "Specialty Glass & Glass-Ceramics"],
    evidence: [
      { label: "saRNA Phase I/II trials", value: "17", trend: "up" },
      { label: "OpenAlex saRNA publications 2025", value: "412", trend: "up" },
      { label: "CMC/extractables papers", value: "29", trend: "up" },
      { label: "Commercial pipeline (Phase III)", value: "0", trend: "flat" },
    ],
    evidenceNarrative:
      "Strong scientific momentum, weak commercial signal. Classic EARLY_WATCH profile — engage in research collaborations, do not commit capacity.",
    scoreDrivers: [
      "Scientific momentum genuine",
      "Material requirements still undefined — engagement window",
      "Low commercial risk at this stage",
    ],
    risks: [
      "saRNA may not reach commercial launch",
      "Polymer or single-dose pre-filled formats may displace ampoules",
      "Long horizon — opportunity cost of attention",
    ],
    sources: [
      {
        title: "OpenAlex publication trend — saRNA",
        type: "Scientific Paper",
        date: "2026-03-12",
        url: "https://api.openalex.org/works?search=self-amplifying+mRNA",
        note: "Publication volume up sharply through 2025.",
      },
      {
        title: "ClinicalTrials.gov — saRNA Phase I/II registry",
        type: "Clinical Trial",
        date: "2026-04-05",
        url: "https://clinicaltrials.gov/search?term=self+amplifying+mRNA",
        note: "17 active trials but no Phase III commitments yet.",
      },
    ],
    novelty: 84,
    signalCount: 18,
    updatedAt: "2026-05-22",
  },
  {
    id: "xray-fiber-faceplates",
    title: "Fiber-Optic Faceplates for Portable C-Arm Detectors",
    segment: "Imaging Devices — Mobile Surgical Suites",
    timing: "EARLY_WATCH",
    confidence: 49,
    horizon: "Demand scaling 5–7 years",
    summary:
      "Portable and mobile C-arm imaging is expanding into ambulatory surgical centers. Detector miniaturization may revive demand for fiber-optic faceplate solutions for radiation shielding and signal coupling.",
    whySchott:
      "Direct match to SCHOTT's fiber-optic faceplate and radiation-shielding glass portfolio. Currently EARLY_WATCH because detector roadmaps are not yet locked.",
    whyNow:
      "Watch — not act. ASC procedural volume is growing 8–10% annually but detector architecture is still mid-evolution.",
    competencies: ["Fiber Optics & Light Guides", "Specialty Glass & Glass-Ceramics"],
    evidence: [
      { label: "Portable C-arm 510(k) 24 mo", value: "16", trend: "up" },
      { label: "ASC procedure growth", value: "+9%", trend: "up" },
      { label: "Faceplate-related patents", value: "6", trend: "flat" },
    ],
    evidenceNarrative:
      "Macro adoption signal is real but architectural choice (CMOS vs CCD vs fiber-coupled) is unresolved.",
    scoreDrivers: [
      "Macro adoption real",
      "SCHOTT competency fit if architecture goes fiber-coupled",
    ],
    risks: [
      "CMOS direct-detection may displace fiber-coupled designs",
      "Demand horizon uncertain",
    ],
    sources: [
      {
        title: "openFDA — Portable C-arm 510(k) trend",
        type: "FDA Approval",
        date: "2026-02-18",
        url: "https://api.fda.gov/device/510k.json?search=device_name:mobile+c-arm",
        note: "16 clearances 24 mo.",
      },
    ],
    novelty: 71,
    signalCount: 12,
    updatedAt: "2026-05-21",
  },
];
