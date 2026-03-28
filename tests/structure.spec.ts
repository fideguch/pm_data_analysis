import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SKILL_DIR = join(import.meta.dirname, '..');

function fileExists(relativePath: string): boolean {
  return existsSync(join(SKILL_DIR, relativePath));
}

// =============================================================================
// File Structure
// =============================================================================

test.describe('File Structure', () => {
  const requiredFiles = [
    'SKILL.md',
    'README.md',
    'package.json',
    'playwright.config.ts',
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'references/analysis_patterns.md',
    'references/statistical_tests.md',
    'templates/analysis_report.md',
    'templates/context.md',
  ];

  for (const file of requiredFiles) {
    test(`${file} exists`, () => {
      expect(fileExists(file)).toBe(true);
    });
  }
});

// =============================================================================
// SKILL.md Frontmatter
// =============================================================================

test.describe('SKILL.md Frontmatter', () => {
  let content: string;

  test.beforeAll(() => {
    content = readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf-8');
  });

  test('has YAML frontmatter delimiters', () => {
    expect(content).toMatch(/^---\n/);
  });

  test('name is pm-data-analysis', () => {
    expect(content).toContain('name: pm-data-analysis');
  });

  test('type is interactive', () => {
    expect(content).toContain('type: interactive');
  });

  test('has description field', () => {
    expect(content).toMatch(/^description:/m);
  });

  test('has best_for list', () => {
    expect(content).toMatch(/^best_for:/m);
  });

  test('has triggers list with at least 10 entries', () => {
    const triggersMatch = content.match(/^triggers:\n((?:\s+-\s+.+\n)+)/m);
    expect(triggersMatch).not.toBeNull();
    const triggerLines = triggersMatch![1] ?? '';
    const count = triggerLines.split('\n').filter((l) => l.trim().startsWith('-')).length;
    expect(count).toBeGreaterThanOrEqual(10);
  });
});

// =============================================================================
// Directory Structure
// =============================================================================

test.describe('Directory Structure', () => {
  test('references/ directory exists', () => {
    expect(fileExists('references')).toBe(true);
  });

  test('templates/ directory exists', () => {
    expect(fileExists('templates')).toBe(true);
  });

  test('examples/ directory exists', () => {
    expect(fileExists('examples')).toBe(true);
  });

  test('tests/ directory exists', () => {
    expect(fileExists('tests')).toBe(true);
  });
});
