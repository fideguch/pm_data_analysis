# A/B Test Analysis Example

This example demonstrates pm-data-analysis applied to an A/B test validation for a signup flow redesign.

## Scenario

A product team redesigned the signup flow and ran a 15-day A/B test. The PM needs to decide whether to ship the new flow to 100% of users.

## Key Patterns Demonstrated

- **12-point confidence scoring** (4 axes × 3 levels)
- **Guardrail metric monitoring** (churn, support tickets, performance)
- **Novelty effect check** (Week 1 vs Week 2 comparison)
- **Full bias checklist** (7 types, all clear)
- **So What / Now What** framework for actionable recommendations
- **Reproduction section** with complete statistical test code

## Files

- `input.csv` — 30 rows of daily A/B test data (15 days × 2 variants)
- `analysis_report.md` — Complete analysis output with confidence scoring
