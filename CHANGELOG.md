# Changelog

All notable changes to pm-data-analysis are documented here.

## [1.4.0] - 2026-03-28

### Added

- Error Handling & Recovery section in SKILL.md (8 failure modes with detection/recovery)
- Test split into 3 files: structure (14 tests), content (28 tests), scenarios (37 tests)
- 37 scenario tests with Given-When-Then pattern covering all 6 capabilities
- Error handling scenarios (CSV parse, insufficient sample, MCP failure, stale context)

### Changed

- Test organization from monolithic to categorized structure

## [1.3.0] - 2026-03-28

### Added

- Tests infrastructure (Playwright, 25 structure tests)
- CI/CD pipeline (GitHub Actions)
- Examples: cohort-retention and ab-test-signup with realistic data
- CONTRIBUTING.md with development guidelines
- CHANGELOG.md

## [1.2.0] - 2026-03-27

### Added

- Installation commands, prerequisites, and PM Tool Suite section in README
- "When NOT to Use" section for skill delegation guidance

## [1.1.0] - 2026-03-27

### Added

- Capability 6: Reproducibility (save, search, re-run)
- Fixed confidence rubric duplication

## [1.0.1] - 2026-03-27

### Fixed

- GAFA quality improvements (bias checklist, confidence scoring refinements)

## [1.0.0] - 2026-03-27

### Added

- Initial release with 6 capabilities
- Autonomous routing with decision rules
- 4-axis confidence scoring rubric (12-point matrix)
- 7-type bias detection checklist
- AARRR lifecycle mapping
- Disaggregation protocol
- Knowledge store (analysis/ directory)
- On-demand reference loading
- Statistical tests reference
- Analysis patterns reference
- Report and context templates
