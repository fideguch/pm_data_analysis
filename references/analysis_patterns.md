# Analysis Patterns Library

## Funnel Analysis
→ Delegate to `funnel-analysis` skill for detailed implementation.
Key outputs: stage conversion rates, drop-off visualization, segment comparison.

## Cohort Analysis

1. Define cohort (by signup date, first purchase date, etc.)
2. Build retention table (Week/Month 0, 1, 2, ... N)
3. Visualize: retention heatmap
4. Compare cohorts: is retention improving over time?
5. Project LTV from retention curves

## A/B Test Validation
Source: cro-methodology skill

1. Pre-registration check: Was hypothesis + primary metric + sample size defined before test?
2. Sample size sufficiency: Power analysis (80% power, alpha=0.05)
3. Statistical significance: p-value + confidence interval
4. Effect size: Cohen's d + practical significance assessment
5. Novelty check: Compare Week 1 vs Week 2+ effects
6. Multiple testing: Bonferroni correction if >1 metric or >2 variants
7. Guardrail metrics: Did any guardrail degrade?

## Segment Comparison

1. Define segments (behavioral > demographic > channel)
2. Statistical difference test (t-test or Mann-Whitney per metric)
3. Distribution visualization (box plot or violin plot)
4. Effect size between segments
5. Check for interaction effects

## Growth Accounting (Meta)

```
End Users = Start Users + New + Resurrected - Churned
Quick Ratio = (New + Resurrected) / Churned
```

Quick Ratio interpretation:
- > 4.0: Excellent (hyper-growth)
- 2.0-4.0: Good (healthy growth)
- 1.0-2.0: Concerning (growth slowing)
- < 1.0: Shrinking

## Trend Analysis

1. Plot time series with moving average (7-day or 30-day)
2. Decompose: trend + seasonality + residual (STL)
3. Detect anomalies: z-score > 2 from moving average
4. If anomaly found → trigger Disaggregation Protocol

## Disaggregation Protocol (Amazon)

When anomaly detected (>10% change from baseline):
1. Split by user segment → which segment drives the change?
2. Split by time period → when exactly did the change start?
3. Split by product/feature → which area is affected?
4. Split by geography/platform → localized or global?
5. Continue recursively until root cause is attributable

Present as drill-down tree in output.

## Segmentation Depth Ladder (Meta)

| Level | Type | Example | When to Use |
|-------|------|---------|-------------|
| 1 | Channel | Organic / Paid / Direct | Quick overview |
| 2 | Demographic | Geography, company size | Market analysis |
| 3 | Behavioral | Feature usage, engagement frequency | Product analysis |
| 4 | Lifecycle | New / Activated / Retained / Dormant / Resurrected | Growth analysis |
| 5 | Value-based | High-LTV / Low-LTV clusters | Monetization |

Default to Level 3+. Warn if analysis uses only Level 1-2.

## Chart Selection Guide (Apple)

| Insight Type | Chart | Rule |
|-------------|-------|------|
| Comparison across categories | Horizontal bar | Easy label reading |
| Trend over time | Line chart | Shows direction + inflection |
| Part-to-whole | Stacked bar or 100% bar | Never pie charts |
| Distribution | Histogram or box plot | Shows shape, not just mean |
| Correlation | Scatter plot | Reveals outliers |
| Funnel | Funnel or horizontal bar | Stage-by-stage drop |
| Retention | Heatmap | Cohort × time period |

**Rule:** Every chart title states the insight ("Activation drops 40% at step 3"), not a label ("Funnel by Stage").
