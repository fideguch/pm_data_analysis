# Analysis Report: [Title]

**Date**: [YYYY-MM-DD]
**Decision**: [What decision does this analysis inform?]
**Analyst**: [name]
**Data Sources**: [list]

---

## Executive Summary

[1 sentence: Decision context]
[1 sentence: Key finding]
[1 sentence: Recommended action]
Confidence: [High/Medium/Low] — [plain-language reason]

---

## Data Quality

| Check               | Result | Impact |
| ------------------- | ------ | ------ |
| Missing values      | %      |        |
| Outliers            | count  |        |
| Date range          | ~      |        |
| Sample size         | N=     |        |
| Granularity         |        |        |
| Duplicates          | count  |        |
| Period completeness |        |        |

---

## Key Findings

| #   | Finding | Confidence | Effect Size | Business Impact | Level |
| --- | ------- | ---------- | ----------- | --------------- | ----- |
| 1   |         |            |             |                 |       |

---

## Bias Check

- [ ] Simpson's Paradox: aggregate holds across segments?
- [ ] Survivorship Bias: excludes churned/failed?
- [ ] Regression to Mean: triggered by extreme value?
- [ ] Selection Bias: sample representative?
- [ ] Novelty Effect: Week 1 vs Week 2+ effects compared? (A/B tests only)
- [ ] Instrumentation Bias: recent logging/tracking/SDK change?
- [ ] Seasonality: comparing equivalent time periods?

### Confidence Scoring Rubric

| Axis                     | Score | Reason                                  |
| ------------------------ | ----- | --------------------------------------- |
| Statistical significance | /3    |                                         |
| Effect size              | /3    |                                         |
| Sample size              | /3    |                                         |
| Data quality             | /3    |                                         |
| **Total**                | /12   | High (10-12) / Medium (7-9) / Low (<=6) |

### Analysis Level

[Descriptive / Diagnostic / Predictive / Prescriptive]

---

## So What?

[Business interpretation]

## Now What?

| Priority | Action | Expected Effect | Confidence |
| -------- | ------ | --------------- | ---------- |
| 1        |        |                 |            |

## Guardrail Check

| Metric | Before | After | Status  |
| ------ | ------ | ----- | ------- |
|        |        |       | OK/WARN |

## Additional Data Needed

- [if Medium/Low confidence]

## Limitations

- [What this analysis cannot tell you]
- [Key assumptions]

---

## Reproduction

### Environment

- Python: [version], pandas [version], scipy [version]
- Data source: [file path or MCP query or manual input]
- Data snapshot: N=[row count], Date range=[start ~ end]

### Code

```python
# Full analysis code — copy-paste runnable
import pandas as pd
# ... complete analysis pipeline ...
```

### SQL Queries (if applicable)

```sql
-- Remove this section if no SQL was used
```

### Parameters

| Parameter | Value   | Rationale                   |
| --------- | ------- | --------------------------- |
| alpha     | 0.05    | Standard significance level |
| [param]   | [value] | [rationale]                 |

### Re-run Instructions

1. Ensure data file exists at [path] (or re-export from [source])
2. Run the code block above
3. Expected output: [key metric ≈ approximate value]
