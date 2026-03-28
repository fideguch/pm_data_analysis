import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SKILL_DIR = join(import.meta.dirname, '..');

function readFile(relativePath: string): string {
  return readFileSync(join(SKILL_DIR, relativePath), 'utf-8');
}

// =============================================================================
// SKILL.md Core Sections
// =============================================================================

test.describe('SKILL.md Core Sections', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('has Resource Loading section', () => {
    expect(content).toContain('## Resource Loading');
  });

  test('has Core Principle: Autonomous Routing', () => {
    expect(content).toMatch(/autonomous/i);
    expect(content).toMatch(/routing/i);
  });

  test('has Knowledge Store section', () => {
    expect(content).toContain('## Knowledge Store');
  });

  test('contains all 6 capabilities', () => {
    expect(content).toContain('Capability 1');
    expect(content).toContain('Capability 2');
    expect(content).toContain('Capability 3');
    expect(content).toContain('Capability 4');
    expect(content).toContain('Capability 5');
    expect(content).toContain('Capability 6');
  });

  test('has Existing Skill Delegation section', () => {
    expect(content).toMatch(/Delegation/);
  });

  test('has Known Limitations section', () => {
    expect(content).toMatch(/Known Limitations|Limitations & Edge Cases/);
  });

  test('has Error Handling section', () => {
    expect(content).toMatch(/Error Handling/);
  });

  test('has Language Support section', () => {
    expect(content).toContain('## Language Support');
  });
});

// =============================================================================
// SKILL.md Content Validation
// =============================================================================

test.describe('SKILL.md Content Validation', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('SKILL.md');
  });

  test('contains 4-axis confidence scoring rubric', () => {
    expect(content).toMatch(/significance/i);
    expect(content).toMatch(/effect size/i);
    expect(content).toMatch(/sample size/i);
    expect(content).toMatch(/data quality/i);
  });

  test('contains 7-type bias detection checklist', () => {
    expect(content).toMatch(/Simpson/i);
    expect(content).toMatch(/Survivorship/i);
    expect(content).toMatch(/Regression to Mean/i);
    expect(content).toMatch(/Selection Bias/i);
    expect(content).toMatch(/Novelty/i);
    expect(content).toMatch(/Instrumentation/i);
    expect(content).toMatch(/Seasonality/i);
  });

  test('references AARRR lifecycle', () => {
    expect(content).toContain('AARRR');
  });

  test('contains Disaggregation Protocol', () => {
    expect(content).toMatch(/[Dd]isaggregation/);
  });

  test('enforces Decision Statement', () => {
    expect(content).toMatch(/Decision Statement/i);
  });

  test('defines knowledge store structure', () => {
    expect(content).toContain('analysis/');
    expect(content).toContain('context.md');
    expect(content).toContain('history/');
  });

  test('specifies on-demand reference loading', () => {
    expect(content).toMatch(/on-demand|Do NOT pre-load/i);
  });

  test('contains guardrail metrics by business model', () => {
    expect(content).toMatch(/[Gg]uardrail/);
    expect(content).toMatch(/SaaS|EC|Marketplace/);
  });

  test('contains causal inference guidance', () => {
    expect(content).toMatch(/[Cc]ausal/);
    expect(content).toMatch(/correlation|Causal Inference Decision Tree/i);
  });

  test('contains analysis level classification', () => {
    expect(content).toMatch(/Descriptive/);
    expect(content).toMatch(/Diagnostic/);
    expect(content).toMatch(/Predictive/);
    expect(content).toMatch(/Prescriptive/);
  });
});

// =============================================================================
// README Validation
// =============================================================================

test.describe('README Content', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFile('README.md');
  });

  test('mentions capabilities', () => {
    expect(content).toMatch(/ヒアリング|Hearing|Capability/i);
  });

  test('has prerequisites section', () => {
    expect(content).toMatch(/[Pp]rerequisites|前提条件/);
  });

  test('references skill name', () => {
    expect(content).toMatch(/pm-data-analysis/);
  });
});

// =============================================================================
// Cross-Reference Integrity
// =============================================================================

test.describe('Cross-Reference Integrity', () => {
  let skillContent: string;

  test.beforeAll(() => {
    skillContent = readFile('SKILL.md');
  });

  test('SKILL.md references analysis_patterns.md', () => {
    expect(skillContent).toContain('analysis_patterns');
  });

  test('SKILL.md references statistical_tests.md', () => {
    expect(skillContent).toContain('statistical_tests');
  });

  test('analysis_patterns.md covers funnel, cohort, A/B patterns', () => {
    const patterns = readFile('references/analysis_patterns.md');
    expect(patterns).toMatch(/[Ff]unnel/);
    expect(patterns).toMatch(/[Cc]ohort/);
    expect(patterns).toMatch(/A\/B/);
  });

  test('statistical_tests.md covers t-test, chi-squared, Mann-Whitney', () => {
    const stats = readFile('references/statistical_tests.md');
    expect(stats).toMatch(/t-test/i);
    expect(stats).toMatch(/[Cc]hi-squared|chi2/);
    expect(stats).toMatch(/Mann-Whitney/);
  });

  test('statistical_tests.md has confidence scoring rubric', () => {
    const stats = readFile('references/statistical_tests.md');
    expect(stats).toMatch(/Confidence Scoring Rubric/);
  });
});

// =============================================================================
// Template Content Validation
// =============================================================================

test.describe('Template Content', () => {
  test('context.md template has required sections', () => {
    const content = readFile('templates/context.md');
    expect(content).toMatch(/Business|model:|north_star/i);
  });

  test('analysis_report.md template has executive summary', () => {
    const content = readFile('templates/analysis_report.md');
    expect(content).toMatch(/[Ee]xecutive [Ss]ummary|エグゼクティブ/);
  });

  test('analysis_report.md template has confidence section', () => {
    const content = readFile('templates/analysis_report.md');
    expect(content).toMatch(/[Cc]onfidence|信頼度/);
  });
});
