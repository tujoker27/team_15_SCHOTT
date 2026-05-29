import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SCHOTT_KB = `SCHOTT KNOWLEDGE BASE (use specific figures and cite the document):

SCHOTT Pharma Annual Report 2025
- Full-year revenue: EUR 986M
- DCS segment growing 11.9% at constant currency; DDS segment flat
- HVS revenue share: 57%; mid-term target 60%+
- ADCs and GLP-1 named as primary growth drivers
- Polymer syringe overcapacity identified as a risk
- Six glass capability families
- Capacity expansion across Hungary, Switzerland, Serbia, Germany, USA, India
- Mid-term revenue CAGR target: 6–8%
- EBITDA margin target approaching 30% by 2027–2029

SCHOTT Pharma H1 2026 Financial Report
- H1 2026 revenue: EUR 488M
- FY 2026 described as a bridge year
- DDS EBIT margin declined from 25.3% to 17.9%
- EUR 12M inventory write-down on glass syringes
- Key customer unexpectedly revised demand forecast
- DCS growing 8.3% at constant currency driven by HVS specialty vials and cartridges
- ADCs and GLP-1 confirmed as primary demand drivers
- mRNA polymer syringe demand structurally declined

SCHOTT Pharma Business Factsheet December 2025
- 13 billion products delivered annually
- 17 production facilities in 15 countries
- 1,300+ patents
- EUR 986M revenue
- Four named growth opportunities: ADCs requiring EVERIC hydrophobic-coated vials; GLP-1 long-term contracts; homecare large-volume subcutaneous injection systems; manufacturing shift to RTU driven by GMP Annex 1

SCHOTT Pharma FY 2025 Investor Presentation
- HVS share trajectory FY22 39% → FY25 57%; target 60%+ mid-term
- Megatrends: Biologics, Homecare solutions, RTU manufacturing shift, Sustainability
- New product launches: 5.5 ml prefillable glass syringe for Ypsomed YpsoMate autoinjector; TOPPAC freeze polymer syringe for cell and gene therapy at -180°C
- FY 2026 guidance: 2–5% revenue growth at constant currencies; DDS impacted by key customer revision

Investment threshold: SCHOTT screens new opportunities against an EUR 50M minimum addressable-market threshold.`;

const SYSTEM_PROMPT = `You are the Research Assistant inside Prometheus, SCHOTT AG's internal Business Development Intelligence tool.

Your role: provide concise, evidence-backed answers that help SCHOTT employees turn early ideas into structured project proposals.

Behavioural rules:
1. Always anchor the answer to the active idea and active stage you are given.
2. If the question relates to SCHOTT (financials, products, strategy, capabilities), cite specific figures, product names, and document references from the embedded knowledge base.
3. If the question is about external markets, combine SCHOTT context with general market data.
4. If the question is about strategic fit, connect to SCHOTT capabilities.
5. If the question is about financial potential, mention the EUR 50M minimum threshold where relevant.
6. If there is not enough information, say so clearly.
7. Do not invent precise figures that are not in the knowledge base or in the stage context.
8. Keep answers concise and executive-friendly: 3–5 sentences unless the user explicitly asks for more detail.
9. Every response MUST end on a new line with a single source tag in one of these exact formats:
   Source: SCHOTT Pharma Annual Report 2025
   Source: H1 2026 Financial Report
   Source: FY 2025 Investor Presentation
   Source: Business Factsheet 2025
   Source: General market data
   Source: SCHOTT knowledge base + general market data

${SCHOTT_KB}`;

export const ideaChat = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      ideaTitle: z.string().min(1).max(300),
      ideaContext: z.string().min(1).max(2000),
      activeStage: z.string().min(1).max(100),
      sector: z.string().min(1).max(100),
      messages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(8000),
          }),
        )
        .min(1)
        .max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const ctx = `ACTIVE IDEA: ${data.ideaTitle}\nSECTOR: ${data.sector}\nACTIVE STAGE: ${data.activeStage}\nCONTEXT: ${data.ideaContext}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: ctx },
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) {
      throw new Error("Rate limit reached on Lovable AI. Please retry shortly.");
    }
    if (res.status === 402) {
      throw new Error(
        "Lovable AI credits exhausted. Add credits in Settings → Workspace → Usage.",
      );
    }
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("Research Assistant is temporarily unavailable.");
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content =
      json.choices?.[0]?.message?.content?.trim() ??
      "No response generated.\n\nSource: General market data";
    return { content };
  });
