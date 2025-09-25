# Quality Assurance (QA)

This document lists standard tools for code quality review and continuous improvement.

## Static analysis

- SonarQube (`https://www.sonarsource.com/products/sonarqube/`): platform for static code analysis, code smells, vulnerabilities, and maintainability metrics.

## AI-assisted code review

- CodeRabbit (`https://www.coderabbit.ai/`): AI code review assistant integrated with pull requests for style, correctness, and best‑practice suggestions.

## Guidelines

- Integrate checks in CI for every pull request.
- Block merges on critical issues; track debt with clear ownership.
- Document false positives and add targeted suppressions rather than global ignores.


