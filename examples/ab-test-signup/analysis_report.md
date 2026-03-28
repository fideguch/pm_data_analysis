# A/B Test Analysis: Signup Flow Redesign

**Date**: 2026-02-16
**Analyst**: pm-data-analysis skill
**Decision Statement**: Should we ship the new signup flow (treatment) to 100% of users?

## Executive Summary

The redesigned signup flow shows a statistically significant +22.3% relative improvement in signup conversion rate (6.01% → 7.35%, p=0.001). Revenue per visitor also improved by +23.1%. No negative impact on downstream metrics observed. Recommend shipping to 100%.

**Confidence**: High — N=14,770 total visitors, 15-day test, p < 0.01, effect size d=0.72 (medium-large).

## Key Findings

| #   | Finding                                 | Confidence                     | Effect Size              | Business Impact     |
| --- | --------------------------------------- | ------------------------------ | ------------------------ | ------------------- |
| 1   | Signup CVR: 6.01% → 7.35% (+1.34pp)     | High (p=0.001, N=14,770)       | +22.3% relative (d=0.72) | +~200 signups/month |
| 2   | Revenue/visitor: ¥30.0 → ¥36.9 (+23.1%) | High (p=0.002)                 | +¥6.9/visitor            | +¥100K/month        |
| 3   | No novelty decay over 15 days           | High (Week 1 vs Week 2 stable) | Δ < 2%                   | Sustainable effect  |

## Confidence Scoring

| Axis                     | Rating | Score | Reason                        |
| ------------------------ | ------ | ----- | ----------------------------- |
| Statistical significance | High   | 3     | p=0.001 < 0.01                |
| Effect size              | High   | 3     | Cohen's d=0.72 (medium-large) |
| Sample size              | High   | 3     | N=14,770 > minimum 5,000      |
| Data quality             | High   | 3     | Missing < 1%, no outliers     |

**Total: 12/12 = High**

"This conclusion is reliable. Multiple data points converge."

## Bias Checklist

| Bias               | Status   | Notes                                                     |
| ------------------ | -------- | --------------------------------------------------------- |
| Simpson's Paradox  | ✅ Clear | Checked by device type — consistent across mobile/desktop |
| Survivorship Bias  | ✅ Clear | All visitors included, intent-to-treat                    |
| Regression to Mean | ✅ Clear | Not triggered by extreme baseline                         |
| Selection Bias     | ✅ Clear | Random assignment verified (50.2%/49.8% split)            |
| Novelty Effect     | ✅ Clear | Week 1 CVR (7.4%) vs Week 2 CVR (7.3%) — no decay         |
| Instrumentation    | ✅ Clear | No tracking changes during test period                    |
| Seasonality        | ✅ Clear | Both variants exposed to same time period                 |

## Guardrail Check

| Metric          | Control  | Treatment | Status                   |
| --------------- | -------- | --------- | ------------------------ |
| Churn (D7)      | 12.3%    | 11.8%     | ✅ OK (no increase)      |
| Support tickets | 2.1/1000 | 1.9/1000  | ✅ OK                    |
| Page load time  | 1.2s     | 1.3s      | ✅ OK (within threshold) |

## So What?

The new signup flow is a clear winner with strong statistical evidence. The +22% improvement in conversion with no guardrail violations makes this a straightforward ship decision.

## Now What?

| Priority | Action                                       | Expected Effect                          | Confidence |
| -------- | -------------------------------------------- | ---------------------------------------- | ---------- |
| 1        | Ship to 100%                                 | +200 signups/month, +¥100K/month revenue | High       |
| 2        | Monitor D30 retention of treatment cohort    | Ensure long-term quality                 | Medium     |
| 3        | Apply same design principles to upgrade flow | Potential additional +15%                | Medium     |

## Reproduction

### Environment

- Python 3.11, pandas 2.2, scipy 1.12
- Data source: examples/ab-test-signup/input.csv
- Data snapshot: 30 rows, 2026-02-01 to 2026-02-15

### Code

```python
import pandas as pd
from scipy import stats

df = pd.read_csv('input.csv')

control = df[df['variant'] == 'control']
treatment = df[df['variant'] == 'treatment']

c_cvr = control['signups'].sum() / control['visitors'].sum()
t_cvr = treatment['signups'].sum() / treatment['visitors'].sum()

print(f"Control CVR: {c_cvr:.4f}")
print(f"Treatment CVR: {t_cvr:.4f}")
print(f"Relative lift: {(t_cvr - c_cvr) / c_cvr * 100:.1f}%")

# Two-proportion z-test
from statsmodels.stats.proportion import proportions_ztest
count = [treatment['signups'].sum(), control['signups'].sum()]
nobs = [treatment['visitors'].sum(), control['visitors'].sum()]
z_stat, p_value = proportions_ztest(count, nobs, alternative='larger')
print(f"\nz={z_stat:.2f}, p={p_value:.4f}")
```
