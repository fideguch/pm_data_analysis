# Cohort Retention Analysis Report

**Date**: 2026-03-20
**Analyst**: pm-data-analysis skill
**Decision Statement**: Should we prioritize Android retention improvements in Q2?

## Executive Summary

Android D30 retention has declined from 11.0% to 1.8% over 10 weeks, while iOS remains stable at 14.5-15.0%. This divergence suggests a platform-specific issue rather than a product-wide problem. Recommend immediate investigation into Android-specific UX or performance regressions.

**Confidence**: High — N=21,170 total users, consistent trend across 10 cohorts, platform split eliminates Simpson's Paradox risk.

## Key Findings

| #   | Finding                                          | Confidence                           | Effect Size   | Business Impact                |
| --- | ------------------------------------------------ | ------------------------------------ | ------------- | ------------------------------ |
| 1   | Android D30 retention declined from 11.0% → 1.8% | High (10 cohorts, monotonic decline) | -83% relative | ~150 fewer retained users/week |
| 2   | iOS D30 retention stable at 14.5-15.0%           | High (low variance, σ=0.4%)          | No change     | Baseline healthy               |
| 3   | Android D7 also declining (30.0% → 13.0%)        | High (same trend)                    | -57% relative | Leading indicator              |
| 4   | Android D1 declining (60.0% → 44.0%)             | Medium (less dramatic)               | -27% relative | Activation issue emerging      |

## Bias Checklist

| Bias               | Status   | Notes                                         |
| ------------------ | -------- | --------------------------------------------- |
| Simpson's Paradox  | ✅ Clear | Platform split shows divergent trends         |
| Survivorship Bias  | ✅ Clear | All cohort users included from signup         |
| Regression to Mean | ✅ Clear | Monotonic decline, not spike recovery         |
| Selection Bias     | ⚠️ Note  | Android user acquisition mix may have shifted |
| Novelty Effect     | ✅ Clear | Not applicable (no feature launch)            |
| Instrumentation    | ⚠️ Check | Verify Android SDK version unchanged          |
| Seasonality        | ✅ Clear | iOS control group shows no seasonal effect    |

## So What?

Android is losing users at an accelerating rate. The D1→D7→D30 cascade suggests the root cause is in early experience (first session or first week), not long-term engagement.

## Now What?

| Priority | Action                                                                | Expected Effect                 | Confidence |
| -------- | --------------------------------------------------------------------- | ------------------------------- | ---------- |
| 1        | Investigate Android app performance (crash rate, load time) since Jan | Identify root cause             | High       |
| 2        | Compare Android vs iOS onboarding completion rates                    | Isolate activation vs retention | High       |
| 3        | Run user interviews with churned Android users (N=10)                 | Qualitative validation          | Medium     |

## Reproduction

### Environment

- Python 3.11, pandas 2.2, scipy 1.12
- Data source: examples/cohort-retention/input.csv
- Data snapshot: 20 rows, 2026-01-06 to 2026-03-17

### Code

```python
import pandas as pd

df = pd.read_csv('input.csv')
df['d30_rate'] = df['d30_retained'] / df['users'] * 100

for platform in ['ios', 'android']:
    subset = df[df['platform'] == platform]
    print(f"\n{platform.upper()} D30 Retention Trend:")
    for _, row in subset.iterrows():
        print(f"  {row['cohort_week']}: {row['d30_rate']:.1f}%")

# Statistical test: is Android decline significant?
from scipy import stats
android = df[df['platform'] == 'android']
early = android.head(4)['d30_rate']
late = android.tail(4)['d30_rate']
t_stat, p_value = stats.ttest_ind(early, late)
print(f"\nAndroid early vs late D30: t={t_stat:.2f}, p={p_value:.4f}")
```
