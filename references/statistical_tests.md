# Statistical Test Selection Guide

## Decision Tree

### Comparing two groups
- Both normal distribution? → **t-test** (independent or paired)
- Non-normal or ordinal? → **Mann-Whitney U** (independent) or **Wilcoxon** (paired)
- Proportions? → **Chi-squared test** or **Fisher's exact test** (small N)

### Comparing 3+ groups
- Normal distribution? → **ANOVA** (+ Tukey HSD post-hoc)
- Non-normal? → **Kruskal-Wallis** (+ Dunn's post-hoc)

### Relationship between variables
- Both continuous? → **Pearson correlation** (linear) or **Spearman** (non-linear)
- Predict outcome? → **Linear regression** (continuous) or **Logistic regression** (binary)

### Time series
- Trend detection → **Mann-Kendall test**
- Seasonality → **STL decomposition**
- Change point → **CUSUM** or **Bayesian change point detection**

### A/B Testing
- Conversion rate → **Chi-squared** or **Bayesian A/B test**
- Continuous metric → **Welch's t-test**
- Multiple variants → Apply **Bonferroni correction** (divide alpha by number of comparisons)
- Sequential testing → **Always-valid p-values** or **group sequential design**

## Sample Size Requirements

| Test | Minimum N (per group) | For 80% power |
|------|----------------------|---------------|
| t-test (medium effect d=0.5) | 64 | at alpha=0.05 |
| Chi-squared (w=0.3) | 88 | at alpha=0.05 |
| Correlation (r=0.3) | 85 | at alpha=0.05 |
| A/B test (5% baseline, 10% lift) | ~3,200 | at alpha=0.05 |

## Effect Size Interpretation

| Measure | Small | Medium | Large |
|---------|-------|--------|-------|
| Cohen's d | 0.2 | 0.5 | 0.8 |
| Correlation r | 0.1 | 0.3 | 0.5 |
| Odds Ratio | 1.5 | 3.5 | 9.0 |
| Relative Risk Reduction | 10% | 30% | 50% |

## Practical vs Statistical Significance

A finding is actionable only when BOTH conditions are met:
1. **Statistically significant**: p < 0.05 (or Bayesian posterior > 95%)
2. **Practically significant**: Effect size exceeds minimum detectable effect (MDE) defined by business context

Example: p=0.01 but effect is +0.1% conversion → statistically significant but NOT practically significant.

## Python Quick Reference

```python
# t-test
from scipy.stats import ttest_ind
t_stat, p_value = ttest_ind(group_a, group_b)

# Chi-squared
from scipy.stats import chi2_contingency
chi2, p, dof, expected = chi2_contingency(contingency_table)

# Mann-Whitney
from scipy.stats import mannwhitneyu
stat, p = mannwhitneyu(group_a, group_b, alternative='two-sided')

# Effect size (Cohen's d) — pooled SD, handles unequal sample sizes
def cohens_d(a, b):
    n1, n2 = len(a), len(b)
    pooled_std = (((n1 - 1) * a.std()**2 + (n2 - 1) * b.std()**2) / (n1 + n2 - 2)) ** 0.5
    return (a.mean() - b.mean()) / pooled_std

# Confidence interval
import statsmodels.stats.api as sms
ci = sms.DescrStatsW(data).tconfint_mean(alpha=0.05)

# Sample size calculation
from statsmodels.stats.power import TTestIndPower
power = TTestIndPower()
n = power.solve_power(effect_size=0.5, alpha=0.05, power=0.8)
```

## Causal Inference Decision Tree

```
Can you randomize?
  → Yes: A/B test (gold standard)
  → No: Is there a sharp threshold/cutoff?
    → Yes: Regression Discontinuity Design
    → No: Is there before/after + treatment/control?
      → Yes: Difference-in-Differences
      → No: Can you find comparable groups?
        → Yes: Propensity Score Matching
        → No: Report as CORRELATION ONLY. Downgrade confidence.
```
