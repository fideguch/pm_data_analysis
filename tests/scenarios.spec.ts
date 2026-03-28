import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SKILL_DIR = join(import.meta.dirname, '..');

function readFile(relativePath: string): string {
  return readFileSync(join(SKILL_DIR, relativePath), 'utf-8');
}

// =============================================================================
// Scenario: Autonomous Routing
// =============================================================================

test.describe('Scenario: Autonomous Routing', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given context.md missing, When skill invoked, Then hearing is triggered', () => {
    expect(skill).toMatch(/context\.md.*missing.*hearing/is);
  });

  test('Given context.md exists, When user has specific request, Then skip hearing', () => {
    expect(skill).toMatch(/context\.md.*exists.*skip.*hearing/is);
  });

  test('Given CSV attached, When skill invoked, Then ingest and analyze flow starts', () => {
    expect(skill).toMatch(/Data attached|CSV.*attached/i);
    expect(skill).toMatch(/quality check|Data Quality/i);
  });

  test('Given stale context, When skill invoked, Then freshness warning shown', () => {
    expect(skill).toMatch(/stale|freshness/i);
    expect(skill).toMatch(/warn/i);
  });

  test('Given user says "re-run", When past analysis exists, Then reproduce flow starts', () => {
    expect(skill).toMatch(/re-run|再実行/i);
    expect(skill).toMatch(/reproduce|Reproduction/i);
  });
});

// =============================================================================
// Scenario: Confidence Scoring
// =============================================================================

test.describe('Scenario: Confidence Scoring', () => {
  let stats: string;

  test.beforeAll(() => {
    stats = readFile('references/statistical_tests.md');
  });

  test('Given 4-axis rubric, When all axes strong, Then score is High (10-12pt)', () => {
    expect(stats).toMatch(/10-12.*=.*High|High.*10-12/i);
  });

  test('Given 4-axis rubric, When axes moderate, Then score is Medium (7-9pt)', () => {
    expect(stats).toMatch(/7-9.*=.*Medium|Medium.*7-9/i);
  });

  test('Given 4-axis rubric, When axes weak, Then score is Low (<=6pt)', () => {
    expect(stats).toMatch(/(<=?\s*6|6pt).*=.*Low|Low.*(<=?\s*6|6pt)/i);
  });

  test('Given insufficient sample size, When N < recommended, Then low score on sample axis', () => {
    expect(stats).toMatch(/N\s*<\s*50%.*recommended/i);
  });
});

// =============================================================================
// Scenario: Bias Detection
// =============================================================================

test.describe('Scenario: Bias Detection', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given analysis complete, When bias checklist run, Then all 7 biases checked', () => {
    const biases = [
      /Simpson/i,
      /Survivorship/i,
      /Regression to Mean/i,
      /Selection Bias/i,
      /Novelty/i,
      /Instrumentation/i,
      /Seasonality/i,
    ];
    for (const bias of biases) {
      expect(skill).toMatch(bias);
    }
  });

  test('Given bias detected, When presenting results, Then confidence adjusted', () => {
    expect(skill).toMatch(/bias.*detected.*confidence|adjust confidence/is);
  });
});

// =============================================================================
// Scenario: Decision Statement Enforcement
// =============================================================================

test.describe('Scenario: Decision Statement Enforcement', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given no decision statement, When analysis requested, Then refuse to proceed', () => {
    expect(skill).toMatch(/Decision Statement/);
    expect(skill).toMatch(/refuse|do not proceed|must articulate/i);
  });
});

// =============================================================================
// Scenario: Data Quality Check
// =============================================================================

test.describe('Scenario: Data Quality Check', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given data ingested, When quality check runs, Then missing values reported', () => {
    expect(skill).toMatch(/Missing values/);
  });

  test('Given data ingested, When quality check runs, Then outliers detected', () => {
    expect(skill).toMatch(/Outliers/);
  });

  test('Given data ingested, When quality check runs, Then sample size assessed', () => {
    expect(skill).toMatch(/Sample size/);
  });

  test('Given data ingested, When quality check runs, Then duplicates checked', () => {
    expect(skill).toMatch(/Duplicates/);
  });

  test('Given quality issues found, When proceeding, Then user asked to confirm', () => {
    expect(skill).toMatch(/Proceed with caveats|fix first/i);
  });
});

// =============================================================================
// Scenario: Knowledge Accumulation
// =============================================================================

test.describe('Scenario: Knowledge Accumulation', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given analysis complete, When auto-save triggers, Then report saved to history/', () => {
    expect(skill).toMatch(/history\/.*YYYY-MM-DD/);
  });

  test('Given analysis complete, When auto-save triggers, Then index.md updated', () => {
    expect(skill).toMatch(/index\.md/);
  });

  test('Given knowledge store, When structured, Then has context.md + kpi_definitions + data_catalog', () => {
    expect(skill).toContain('context.md');
    expect(skill).toContain('kpi_definitions.md');
    expect(skill).toContain('data_catalog.md');
  });
});

// =============================================================================
// Scenario: AARRR Lifecycle
// =============================================================================

test.describe('Scenario: AARRR Lifecycle', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given first use, When AARRR mapping built, Then all 5 stages present', () => {
    expect(skill).toMatch(/Acquisition/);
    expect(skill).toMatch(/Activation/);
    expect(skill).toMatch(/Retention/);
    expect(skill).toMatch(/Revenue/);
    expect(skill).toMatch(/Referral/);
  });
});

// =============================================================================
// Scenario: Error Handling
// =============================================================================

test.describe('Scenario: Error Handling', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given CSV parse error, When detected, Then recovery documented', () => {
    expect(skill).toMatch(/CSV.*parse|parse.*error|Malformed/i);
  });

  test('Given insufficient sample, When detected, Then aggregation suggested', () => {
    expect(skill).toMatch(/[Ii]nsufficient.*sample|sample.*insufficient/);
  });

  test('Given MCP failure, When detected, Then fallback to CSV documented', () => {
    expect(skill).toMatch(/MCP.*fail|connection.*fail/i);
  });

  test('Given stale context, When detected, Then update prompted', () => {
    expect(skill).toMatch(/[Ss]tale.*context/);
  });

  test('Given error, When displayed, Then includes what/why/next-steps', () => {
    expect(skill).toMatch(/what happened.*why.*what to do|Error Message Format/i);
  });
});

// =============================================================================
// Scenario: Reproducibility
// =============================================================================

test.describe('Scenario: Reproducibility', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given analysis report, When saved, Then Reproduction section included', () => {
    expect(skill).toMatch(/## Reproduction/);
  });

  test('Given Reproduction section, When present, Then includes environment + code + parameters', () => {
    expect(skill).toMatch(/### Environment/);
    expect(skill).toMatch(/### Code/);
    expect(skill).toMatch(/### Parameters/);
  });

  test('Given past analysis query, When index searched, Then matching entries presented', () => {
    expect(skill).toMatch(/index\.md/);
    expect(skill).toMatch(/match.*query|search/i);
  });
});

// =============================================================================
// Scenario: Guardrail Metrics
// =============================================================================

test.describe('Scenario: Guardrail Metrics', () => {
  let skill: string;

  test.beforeAll(() => {
    skill = readFile('SKILL.md');
  });

  test('Given analysis plan, When guardrails defined, Then defaults by business model', () => {
    expect(skill).toMatch(/SaaS.*Churn|Churn.*SaaS/i);
  });

  test('Given guardrails, When results presented, Then guardrail check included', () => {
    expect(skill).toMatch(/Guardrail Check/);
  });
});
