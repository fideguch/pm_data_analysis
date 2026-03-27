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

### General Tests
| Test | Minimum N (per group) | For 80% power |
|------|----------------------|---------------|
| t-test (medium effect d=0.5) | 64 | at alpha=0.05 |
| Chi-squared (w=0.3) | 88 | at alpha=0.05 |
| Correlation (r=0.3) | 85 | at alpha=0.05 |

### A/B Tests (detailed)
| Baseline | MDE (absolute) | MDE (relative) | Alpha | Power | N per group |
|----------|---------------|----------------|-------|-------|-------------|
| 5% | 0.5pp | 10% relative | 0.05 | 0.80 | ~3,200 |
| 5% | 1.0pp | 20% relative | 0.05 | 0.80 | ~800 |
| 20% | 2.0pp | 10% relative | 0.05 | 0.80 | ~1,500 |
| Continuous (mean=100, sd=50) | +5 units | — | 0.05 | 0.80 | ~1,600 |

Note: MDE = Minimum Detectable Effect. "10% relative" on 5% baseline = 0.5 percentage points absolute.

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

## Confidence Scoring Rubric

| Axis | High (3pt) | Medium (2pt) | Low (1pt) |
|------|-----------|-------------|----------|
| Statistical significance | p < 0.01 | p < 0.05 | p >= 0.05 or untested |
| Effect size | >= Medium (Cohen's d >= 0.5) | Small-Medium (0.2-0.5) | < Small (< 0.2) or unknown |
| Sample size | N >= recommended (see table above) | N = 50-100% of recommended | N < 50% of recommended |
| Data quality | Missing < 5%, no major issues | Missing 5-15% or minor issues | Missing > 15% or major issues |

**Total: 10-12pt = High, 7-9pt = Medium, <= 6pt = Low**

For descriptive analyses without statistical tests, score only Sample size + Data quality (max 6pt): 5-6 = High, 3-4 = Medium, <= 2 = Low.

## Bayesian A/B Testing

### When to use Bayesian over Frequentist
- Small sample sizes (N < 1000) where p-values are unreliable
- Need for continuous monitoring (no peeking problem)
- Stakeholders want "probability of being better" not "p-value"

### Beta-Binomial Model (for conversion rates)
- Prior: Beta(1, 1) (uninformative) or Beta(alpha, beta) from historical data
- Posterior: Beta(alpha + successes, beta + failures)
- P(B > A) = probability that variant B's posterior > variant A's posterior

### Expected Loss
- "If we choose B but A is actually better, how much do we lose?"
- Ship when expected loss < threshold (e.g., 0.1% conversion rate)

### ROPE (Region of Practical Equivalence)
- Define minimum meaningful difference (e.g., +/-0.5pp for conversion)
- If 95% of posterior difference is within ROPE -> "practically equivalent"
- If 95% is outside ROPE -> "practically different"

### Python Quick Reference (Bayesian)
```python
import numpy as np
from scipy.stats import beta

# Beta-Binomial posterior
posterior_a = beta(1 + successes_a, 1 + trials_a - successes_a)
posterior_b = beta(1 + successes_b, 1 + trials_b - successes_b)

# P(B > A) via Monte Carlo
samples_a = posterior_a.rvs(100000)
samples_b = posterior_b.rvs(100000)
p_b_better = (samples_b > samples_a).mean()

# Expected loss
loss_if_choose_b = np.maximum(samples_a - samples_b, 0).mean()
```

## Multiple Testing Corrections

| Method | When to use | Conservativeness |
|--------|------------|-----------------|
| Bonferroni | Few comparisons (< 5), confirmatory | Most conservative |
| Holm-Bonferroni | Moderate comparisons, step-down | Less conservative |
| Benjamini-Hochberg (FDR) | Many comparisons (> 10), exploratory | Least conservative |

Rule of thumb:
- Confirmatory analysis (key decision) -> Bonferroni or Holm
- Exploratory analysis (hypothesis generation) -> Benjamini-Hochberg

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
