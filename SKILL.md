---
name: pm-data-analysis
description: >-
  GAFA-quality data analysis skill with autonomous routing, project knowledge accumulation,
  and confidence-scored insights. Ingests CSV, images, JSON, and MCP data sources.
  Auto-learns business context per project. Includes bias detection, causal inference guidance,
  AARRR lifecycle, metric trees, and executive-ready output.
type: interactive
best_for:
  - "Analyzing CSV/spreadsheet data with statistical rigor"
  - "Building and maintaining project-specific analysis knowledge base"
  - "Generating confidence-scored insights for PM decision-making"
  - "A/B test validation with proper statistical testing"
  - "Funnel, cohort, segment, and trend analysis"
  - "Hypothesis generation and analysis planning"
triggers:
  - "データ分析"
  - "CSV分析"
  - "A/Bテスト"
  - "コホート分析"
  - "ファネル分析"
  - "セグメント比較"
  - "トレンド分析"
  - "data analysis"
  - "analyze this"
  - "この数字を分析して"
  - "KPIを見て"
  - "仮説を立てたい"
---

# PM Data Analysis

GAFA品質のデータ分析スキル。プロジェクト知識を蓄積し、自律的に最適な分析を実行する。

---

## Core Principle: Autonomous Routing

このスキルは固定フローを順番に実行しない。蓄積された知識とユーザーの入力に基づき、何をすべきかを自律的に判断する。

```
User Input (natural language)
  ↓
Load knowledge base (analysis/)
  ↓
Autonomous decision: what to do now?
  ├── Context missing     → Capability 1 (hearing)
  ├── Data provided       → Capability 2 (ingest) → 4 (analyze) → 5 (insights)
  ├── "Continue from last" → Load history/ → deep-dive
  ├── "Build a hypothesis" → Capability 3 (hypothesis + plan)
  ├── "Analyze this CSV"   → Capability 2 → 4 → 5 (skip hearing)
  └── "Improve low confidence" → Request additional data → re-analyze
  ↓
After execution: auto-update knowledge base
```

### Decision Rules

1. `analysis/context.md` exists AND user has a specific request → skip hearing, execute immediately
2. `analysis/context.md` missing → run initial hearing (Capability 1)
3. Data attached → start quality check + analysis (ask 1 clarifying question if purpose unclear)
4. Past analysis exists → reference it: "Last time [X] showed [Y]. Continue or new analysis?"
5. Past Low-confidence finding exists → auto-suggest: "We can improve [X] with additional data: [list]"

### Mandatory for ALL analyses

Before ANY analysis output, enforce:
- **Decision Statement**: "What decision will this analysis inform?" (refuse to proceed without it)
- **Bias Checklist**: Auto-execute before presenting results
- **Confidence Score**: Every finding gets High/Medium/Low with evidence

---

## Knowledge Store (analysis/)

Every project accumulates analysis knowledge in `analysis/` at the project root.

```
analysis/
├── context.md              ← Business context (created on first use, auto-updated)
├── kpi_definitions.md      ← KPI definitions, metric tree, AARRR mapping
├── data_catalog.md         ← Available data sources
└── history/                ← Past analysis reports
    ├── YYYY-MM-DD_type.md
    └── ...
```

### context.md Template

Use `templates/context.md` as the base. Key sections:

- **Business**: model, stage, industry, revenue
- **Product**: name, users, core value
- **KPIs**: north star, primary, secondary (with input/output classification)
- **Tenets**: priority rules when metrics conflict (e.g., "retention > activation")
- **Data Sources**: connected MCPs, CSV export sources
- **Analysis History**: 1-line summaries of past analyses with confidence scores
- **Experimentation Velocity**: monthly count of analyses, experiments, win rate

### Auto-Update Rules

After every analysis session, automatically:
- Append to `analysis/history/` with dated report
- Update `context.md` Analysis History with 1-line summary
- Add any newly discovered data sources to `data_catalog.md`
- Update KPI values if new data was analyzed
- Increment experimentation velocity counters

---

## Capability 1: Hearing + Context Building

**Trigger:** context.md missing, or information gaps detected

### Context Loading (every invocation)

1. Check if `analysis/context.md` exists
2. **Exists:** Load silently. Only ask user if something seems stale (e.g., last update > 30 days)
3. **Missing:** Run full initial hearing, then generate context.md from `templates/context.md`

### Decision Statement (MANDATORY — Amazon)

Before any analysis, require:
```
Decision Statement: What decision will this analysis inform?
→ [User must articulate this. Do not proceed without it.]
```

### Business Context Hearing (first time only)

Confirm via adaptive questioning:
- Business model (SaaS / EC / Marketplace / Ads / Other)
- Stage (Pre-PMF / Growth / Scale / Mature)
- North Star Metric + input metrics
- Tenets (what to prioritize when metrics conflict)
- Available data sources
- Decision context (what will be decided with this analysis)

### AARRR Lifecycle Mapping (Meta)

On first use, build AARRR mapping in `kpi_definitions.md`:
```
| Stage | Definition | Key Metric | Current Value |
|-------|-----------|-----------|--------------|
| Acquisition | How do users find us? | Signup Rate | |
| Activation | First value moment? | Activation Rate | |
| Retention | Do they come back? | D7/D30 Retention | |
| Revenue | Do they pay? | ARPU, MRR | |
| Referral | Do they tell others? | Viral Coefficient | |
```

### Metric Tree (Meta)

Decompose North Star into controllable input metrics:
```
North Star: [metric]
  = New + Retained + Resurrected - Churned
  New = Signups × Activation Rate
  Retained = Last Period Active × Retention Rate
```

Store in `kpi_definitions.md`. Reference in every subsequent analysis.

---

## Capability 2: Data Ingestion + Quality Check

**Trigger:** User provides data (file attachment, MCP query, manual input)

### Ingestion by Format

**CSV/TSV:**
1. Read first 50 rows to understand structure
2. Show column names, types, null percentages
3. For large files (1000+ rows): compute summary stats via Python (pandas)

**Images (dashboard screenshots, charts):**
1. Read via multimodal (Read tool on image file)
2. Extract: chart type, axis labels, data points, trends
3. Convert to table format
4. Ask user: "Is this extraction accurate?"

**MCP (DuckDB, GA4, BigQuery):**
1. Execute query via MCP
2. Display results as table
3. Verify data freshness (last update date)

**JSON/JSONL:**
1. Read and parse structure
2. Identify key fields and nesting
3. Flatten if needed for analysis

### Data Quality Check (MANDATORY)

Execute before any analysis:
```
Data Quality Report

| Check | Result | Impact |
|-------|--------|--------|
| Missing values | [X]% | [High/Medium/Low] |
| Outliers | [count] | [High/Medium/Low] |
| Date range | [start ~ end] | — |
| Sample size | N=[X] | [Sufficient/Marginal/Insufficient] |
| Granularity | [daily/weekly/monthly] | — |
| Duplicates | [count] | [High/Medium/Low] |
```

If issues found: explain impact, ask "Proceed with caveats or fix first?"

---

## Capability 3: Hypothesis + Analysis Plan + Confidence Pre-Assessment

**Trigger:** User exploring what to analyze, or pre-analysis validation needed

### Hypothesis Generation

From context.md + recent data, generate testable hypotheses:
```
Hypothesis: If [change/condition], then [metric] will [direction] because [mechanism].
Test: [specific analysis to validate]
Data needed: [what data is required]
```

### Analysis Plan

```
| Method | Purpose | Data | Expected Insight |
|--------|---------|------|-----------------|
| [method] | [purpose] | [columns] | [what we'll learn] |
```

### Guardrail Metrics (GAFA)

For every analysis plan, define:
```
Guardrail Metrics (must not degrade):
| Metric | Current | Acceptable Range |
|--------|---------|-----------------|
| [metric] | [value] | [range] |
```

### Confidence Pre-Assessment (CRITICAL)

Before executing, estimate achievable confidence:
```
| Factor | Rating | Reason |
|--------|--------|--------|
| Sample size | [Sufficient/Marginal/Insufficient] | N=[X], minimum needed=[Y] |
| Time period | [Sufficient/Marginal/Insufficient] | [X] days, seasonality needs [Y] |
| Confounders | [Controllable/Partial/Difficult] | [uncontrolled variables] |
| Data quality | [Good/Acceptable/Problematic] | Missing [X]%, outliers [Y] |
| Causality | [Possible/Correlation only/Unknown] | [observational/experimental] |

Overall: [High / Medium / Low]
```

If Low: "Reliable conclusions are difficult with this data. Additional data needed: [list]" → ask user.

### Causal Inference Decision Tree (Google)

When user seeks causal claims, refer to `references/statistical_tests.md` → "Causal Inference Decision Tree" section. If none of the causal methods apply, report findings as correlation only and downgrade confidence.

---

## Capability 4: Analysis Execution

**Trigger:** Data and purpose are ready. May skip Capabilities 1-3 for simple requests.

### Tools

| Type | Tool | Method |
|------|------|--------|
| Descriptive stats | Python (Bash) | pandas: mean/median/std/percentile |
| Statistical tests | Python (Bash) | scipy.stats: t-test, chi-squared, Mann-Whitney |
| Regression | Python (Bash) | statsmodels: OLS + p-values + confidence intervals |
| SQL analysis | DuckDB MCP or Bash | Direct SQL on CSV |
| Visualization | Python matplotlib/seaborn or Chart MCP | Generate chart → Read to display |
| A/B testing | Python (Bash) | Frequentist or Bayesian, with power analysis |

### Analysis Pattern Library

Refer to `references/analysis_patterns.md` for detailed patterns:
- Funnel analysis (from funnel-analysis skill)
- Cohort analysis (retention curves, heatmaps, LTV prediction)
- A/B test validation (sample size, significance, effect size, novelty check)
- Segment comparison (statistical difference, distribution viz)
- Growth accounting (New + Retained + Resurrected - Churned)
- Disaggregation protocol (recursive drill-down on anomalies)

### Bias Checklist (MANDATORY — auto-execute before results)

```
Bias Check:
- [ ] Simpson's Paradox: Does aggregate finding hold across top segments?
- [ ] Survivorship Bias: Does dataset exclude churned/failed users?
- [ ] Regression to Mean: Is analysis triggered by a recent extreme? (z > 2 → warn)
- [ ] Selection Bias: Is sample representative of population?
- [ ] Novelty Effect: For A/B tests, does Week 1 effect differ from Week 2+?
```

If any bias detected: note in output, adjust confidence accordingly.

### Disaggregation Protocol (Amazon)

When anomaly detected (>10% change from baseline), auto-trigger:
1. Split by segment → which segment drives the change?
2. Split by time → when did the change start?
3. Split by product/feature → which area is affected?
4. Split by geography/platform → localized or global?
→ Continue recursively until root cause is identified

---

## Capability 5: Confidence-Scored Insights

**Trigger:** Analysis complete, presenting results. ALWAYS includes confidence scoring.

### Output Format

```markdown
## Executive Summary
[1 sentence: Decision context]
[1 sentence: Key finding]
[1 sentence: Recommended action]
Confidence: [High/Medium/Low] — [plain-language reason]

## Key Findings

| # | Finding | Confidence | Effect Size | Business Impact | Level |
|---|---------|------------|-------------|-----------------|-------|
| 1 | [finding] | High (p=0.003, N=5,000) | +12% | +¥500K/mo | Diagnostic |
| 2 | [finding] | Medium (N=200) | +5% | +¥100K/mo | Descriptive |

### Confidence Legend
- High: "This conclusion is reliable. Multiple data points converge."
- Medium: "Direction is likely correct, but magnitude is uncertain. More data would sharpen this."
- Low: "This is a hypothesis worth exploring, not a conclusion to act on."

### Analysis Level
- Descriptive: What happened
- Diagnostic: Why it happened
- Predictive: What will happen
- Prescriptive: What to do about it

## So What? (What this means for the business)
[Interpretation tied to business context and tenets]

## Now What? (Recommended actions)
| Priority | Action | Expected Effect | Confidence |
|----------|--------|----------------|------------|
| 1 | [action] | [effect] | [H/M] |

## Guardrail Check
| Metric | Before | After | Status |
|--------|--------|-------|--------|
| [metric] | [value] | [value] | OK / WARNING |

## Additional Data Needed (if Medium/Low confidence)
- [data 1]
- [data 2]

## Limitations
- [What this analysis cannot tell you]
- [Assumptions that, if wrong, would change the conclusion]
- [Known data quality issues and their impact]
```

---

## Existing Skill Delegation

| Analysis Type | Delegate To | Method |
|--------------|------------|--------|
| Funnel details | `funnel-analysis` | Apply patterns internally |
| A/B test design | `cro-methodology` | ICE scoring + test patterns |
| SaaS metrics | `pm-saas-revenue-growth-metrics` | Formulas + benchmarks |
| Business health | `pm-business-health-diagnostic` | 4-dimension diagnosis |
| Market sizing | `pm-tam-sam-som-calculator` | Market calculation |

---

## Reference Files

| File | When Referenced |
|------|----------------|
| `references/statistical_tests.md` | Choosing the right test for the data |
| `references/analysis_patterns.md` | Applying standard analysis patterns |
| `templates/context.md` | Creating initial analysis/context.md |
| `templates/analysis_report.md` | Formatting analysis output |

---

## Language Support

- User-facing output: Japanese (per global CLAUDE.md)
- Section headers in analysis reports: English (for consistency)
- Statistical notation: English (p-values, confidence intervals)
- Executive Summary: User's language with plain-language confidence
