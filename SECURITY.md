# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include a clear description of the vulnerability and steps to reproduce
4. Allow reasonable time for a fix before public disclosure

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |

## Data Analysis Security Considerations

This skill processes CSV, JSON, and image data for analysis. The following security principles apply:

### Data Handling

- **No secrets in data files**: Data files (CSV, JSON, images) must not contain API keys, passwords, tokens, or other credentials. If credentials are found in input data, the analysis must halt and warn the user.
- **Input validation**: All file inputs are validated before processing. Malformed CSV/JSON is rejected with clear error messages.
- **No persistent storage of user data**: Analysis results are generated per-session. No user data is cached or stored beyond the active session.

### Dependency Security

- Dependencies are audited on every CI run (`npm audit --audit-level=high`)
- Only well-maintained, widely-used packages are included as dependencies
- `package-lock.json` is committed to ensure reproducible builds

### CI/CD Security

- All pull requests run automated quality checks (lint, typecheck, format, test, audit)
- No secrets are stored in configuration files committed to the repository
- GitHub Actions use pinned versions for all third-party actions
