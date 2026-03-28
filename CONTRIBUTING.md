# Contributing to pm-data-analysis

## Development Flow

1. Create an issue describing the change
2. Create a branch: `feature/<issue>-<description>` or `fix/<issue>-<description>`
3. Make changes
4. Run quality checks: `npm run quality && npm test`
5. Submit a PR

## 2-File Sync Rule

When modifying capabilities, routing logic, or analysis patterns, update both:

1. **SKILL.md** — Core specification
2. **README.md** — User-facing documentation

## Adding a New Capability

1. Add the capability section in SKILL.md following the existing pattern
2. Update the README.md capability table
3. If the capability needs reference data, add a file to `references/`
4. If the capability produces new output format, add a template to `templates/`
5. Add tests in `tests/skill-structure.spec.ts` to validate the new content
6. Add an example in `examples/` demonstrating the capability

## Adding a Reference File

1. Create the file in `references/`
2. Add a loading instruction in SKILL.md's "Resource Loading" section
3. Ensure the file is loaded on-demand, not at skill invocation

## Running Tests

```bash
npm install        # First time only
npm test           # Run all tests
npm run quality    # Lint + typecheck + format check
```

## Commit Messages

Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
