# pm-data-analysis

> A Claude Code skill that auto-generates confidence-scored analysis reports, inspired by analytical methodologies from leading tech companies — just pass a CSV.

## Features

- **Autonomous Routing**: No fixed workflow. Automatically determines the next action based on accumulated knowledge and user input
- **Project Knowledge Accumulation**: Stores business context, KPIs, and past analysis results in the `analysis/` directory. No onboarding needed from the second session onward
- **Confidence Score**: Assigns High/Medium/Low confidence to every insight. Requests additional data when confidence is Low
- **Automatic Bias Detection**: Checks for Simpson's paradox, survivorship bias, and regression to the mean before presenting results
- **Executive-Ready Structured Output**: Executive summary, So What / Now What, and Limitations sections

## Usage

```
Analyze this data
```

```
Analyze this CSV
```

```
Continue the previous analysis
```

```
Validate the A/B test results
```

## Capabilities

| Capability | Description | Auto-Trigger Condition |
|-----------|-------------|----------------------|
| 1. Interview + Context Building | Business understanding, KPI definition, metrics tree | Only when context.md does not exist |
| 2. Data Ingestion + Quality Check | Data acquisition from CSV/images/MCP, quality validation | When data is attached |
| 3. Hypothesis Generation + Analysis Plan | Analysis plan, pre-estimation of confidence, guardrail metrics | When exploring "what should be analyzed" |
| 4. Analysis Execution | Python statistical analysis, SQL, bias checks, decomposition protocol | When data and objectives are ready |
| 5. Confidence-Scored Insights | Executive summary, So What / Now What, Limitations | Always runs after analysis completion |
| 6. Reproducibility — Save, Search, Re-run | Auto-save code/queries, natural language search, re-run with diff comparison | After analysis (automatic), or on "previous analysis" / "re-run" |

## Supported Data Formats

| Format | Method |
|--------|--------|
| CSV / TSV | Read tool + statistical processing with pandas |
| JSON / JSONL | Structure parsing + flattening |
| Images (dashboard screenshots) | Multimodal reading → numeric extraction |
| Database | DuckDB MCP (SQL on CSV), BigQuery MCP |
| GA4 / Google Ads | Via supported MCP servers |
| Manual input | Interactive interview → structured data |

## Analysis Framework References

> The design draws on publicly available methodologies and frameworks from the following companies. This does not imply official certification or compliance with any of these companies.

| Company | Adopted Elements |
|---------|-----------------|
| Google | Four-stage analytics maturity (descriptive → diagnostic → predictive → prescriptive), causal inference decision tree |
| Meta | AARRR lifecycle, metrics tree, growth accounting, behavioral cohorts |
| Amazon | Forced decision statements, tenets, input/output metrics, decomposition protocol |
| Apple | Executive summary, plain-language confidence expressions, chart selection guide |

## Knowledge Accumulation

```
analysis/
├── context.md              ← Business context (created on first run, auto-updated)
├── kpi_definitions.md      ← KPI definitions + metrics tree + AARRR
├── data_catalog.md         ← Available data source catalog
└── history/                ← Past analysis reports (with reproduction code)
    ├── index.md            ← Searchable index (auto-updated)
    └── YYYY-MM-DD_type.md  ← Individual reports + Reproduction section
```

| Session | Interview | Available Information |
|---------|-----------|---------------------|
| 1st | Full (5-10 min) | Starting from scratch |
| 2nd | Incremental only (1-2 min) | Previous context + past results |
| 3rd+ | Near zero | Leverages all accumulated knowledge |

## Prerequisites

- Claude Code CLI
- Python 3.11+

```bash
pip install -r requirements.txt
```

### Optional (MCP connections)

- DuckDB MCP — Run SQL directly on CSV files
- GA4 MCP — Retrieve Google Analytics 4 data
- BigQuery MCP — Large-scale data analysis

## Installation

```bash
# Clone and symlink
git clone git@github.com:fideguch/pm_data_analysis.git ~/pm_data_analysis
ln -s ~/pm_data_analysis ~/.claude/skills/pm-data-analysis

# Verify
ls ~/.claude/skills/pm-data-analysis/SKILL.md
```

Setup time: ~5 min

## When to Use

- Statistically analyze CSV/spreadsheet data
- Validate A/B test results (is the difference significant?)
- Identify root causes of KPI anomalies
- Form hypotheses and validate them with data

## When NOT to Use

- Ad data analysis → use `pm-ad-analysis`
- Detailed funnel analysis → use `funnel-analysis`
- Dashboard building → use a BI tool

## PM Tool Suite

This skill is part of a five-piece PM tool suite:

```
requirements_designer → speckit-bridge → my_pm_tools
                              ↕
                  ▶ pm-data-analysis ◀ ← pm_ad_analysis
```

## License

MIT
