# Quality Assurance (QA)

## Effective standard

This document defines the **mandatory QA standard** for FIBEX.

- **Compliance**: applies to all repositories, services, and applications, including third-party work.
- **Exceptions**: any relaxation of thresholds or bypass of controls requires technical justification and explicit approval.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged. Each repository must implement them using the equivalent tool for its stack.

Levels:

- **Standard**: internal products or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Category | Gate | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Style | Auto-formatting | No diffs | No diffs | Yes |
| Quality | Lint | 0 errors | 0 errors | Yes |
| Correctness | Type-check (when applicable) | 0 errors | 0 errors | Yes |
| Testing | Unit tests | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| Testing | Integration tests | Critical flows covered in CI | Critical flows + critical-route regression in CI | Yes |
| Testing | E2E (when applicable) | Critical flows on `main`/release | Critical flows + critical-route regression on `main`/release | Yes |
| Security | Secret scanning | 0 findings | 0 findings | Yes |
| Security | Dependency scanning | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Security | SAST | 0 High findings without exception | 0 Medium/High findings without exception | Yes |
| Security | DAST (exposed apps) | 0 High findings without exception | 0 Medium/High findings without exception | Yes |
| Supply chain | SBOM (when applicable) | Generated on release | Generated on release + kept as artifact | Yes |
| Operations | CI evidence | Artifacts and reports on PR/build | Artifacts, reports, and quality metrics on PR/build | Yes |

This document lists standard tools for code quality review and continuous improvement.

## Static analysis

- SonarQube (`https://www.sonarsource.com/products/sonarqube/`): platform for static code analysis, code smells, vulnerabilities, and maintainability metrics.

## AI-assisted code review

- CodeRabbit (`https://www.coderabbit.ai/`): AI code review assistant integrated with pull requests for style, correctness, and best‑practice suggestions.

## Guidelines

- Integrate checks in CI for every pull request.
- Block merges on critical issues; track debt with clear ownership.
- Document false positives and add targeted suppressions rather than global ignores.

At FIBEX, Quality Assurance (QA) is a fundamental pillar to ensure our products are reliable, secure, and high quality. This document establishes industry-grade QA standards, including testing strategies, automated tooling, static analysis, continuous integration, and best practices. By following these standards, we deliver robust software, minimize risk, and promote a culture of continuous improvement.

QA covers everything from defect prevention in code to thorough validation in staging/production environments, integrating practices such as TDD (Test-Driven Development), BDD (Behavior-Driven Development), and DevOps. All teams must adopt these standards to maintain excellence.

## Testing strategies

We implement a balanced testing pyramid, prioritizing unit tests and scaling up to integration and end-to-end (E2E) tests. Each test type has specific tools and standards.

### Unit testing

- **Purpose**: validate individual units of code (functions, methods, classes) in isolation.
- **Coverage**: minimum 80% code coverage.
- **Tools**:
  - Jest (JavaScript/TypeScript): fast framework with mocking and assertions.
  - JUnit (Java).
  - NUnit (.NET).
  - Pytest (Python): standard frameworks per language.
- **Standards**: use TDD; write tests before code; mock external dependencies.

### Integration testing

- **Purpose**: verify interactions between components or services.
- **Tools**:
  - Postman/Newman: for REST APIs.
  - TestContainers: tests with real containers (databases, services).
  - Cypress: frontend-backend integrations.
- **Standards**: include in CI; test critical data flows.

### End-to-end (E2E) testing

- **Purpose**: simulate real user behavior across the full system.
- **Tools**:
  - Selenium: browser automation.
  - Cypress: modern web apps.
  - Appium: mobile apps.
- **Standards**: run in staging; cover critical business scenarios.

### Performance and load testing

- **Purpose**: evaluate performance under normal and peak load.
- **Tools**:
  - JMeter: load and stress testing.
  - Gatling: scalable high-volume simulation.
  - Lighthouse: web performance metrics.
- **Standards**: define SLAs (e.g., response times < 2s); continuous testing in CI/CD when applicable.

### Security testing

- **Purpose**: identify vulnerabilities and security risks.
- **Tools**:
  - OWASP ZAP: vulnerability scanner.
  - Snyk: dependency and container analysis.
  - Burp Suite: penetration testing.
- **Standards**: integrate SAST/DAST in pipelines; comply with OWASP Top 10.

### Accessibility testing

- **Purpose**: ensure software is usable by people with disabilities.
- **Tools**:
  - axe-core: automated testing library.
  - WAVE: assisted manual evaluation.
- **Standards**: comply with WCAG 2.1 AA; include checks in E2E where applicable.

### Regression testing

- **Purpose**: verify that new changes do not break existing functionality.
- **Tools**:
  - Automated suites using the tools above.
- **Standards**: run on every commit; use smoke tests for fast validation.

## Static analysis and code quality

Static analysis identifies issues in code without executing it, improving maintainability and security.

- **SonarQube** (`https://www.sonarsource.com/products/sonarqube/`): comprehensive platform for static analysis, code smells, vulnerabilities, duplications, and maintainability metrics across multiple languages.
- **ESLint/Prettier** (JavaScript/TypeScript): linting and auto-formatting for consistency.
- **Pylint/Black** (Python): static analysis and formatting.
- **Checkstyle/SpotBugs** (Java): style enforcement and bug detection.
- **Roslyn Analyzers** (.NET): compiler-integrated analysis.
- **Bandit** (Python): security-focused analysis.
- **Dependabot/Snyk**: dependency vulnerability analysis.

**Standards**: integrate into pre-commit hooks; enforce strict thresholds (e.g., technical debt < 5%, coverage > 80%); provide automatic PR reports.

## AI-assisted code review

- **CodeRabbit** (`https://www.coderabbit.ai/`): AI assistant for PR reviews suggesting style, correctness, and best-practice improvements.
- **GitHub Copilot**: real-time suggestions during development.
- **DeepCode/SonarLint**: IDE extensions for immediate feedback.
- **CodeClimate**: complexity and maintainability analysis.

**Standards**: use AI as a complement to human reviews; configure project-specific rules.

## Continuous integration and automation (CI/CD)

QA is fully integrated into CI/CD pipelines for fast feedback.

- **Tools**:
  - GitHub Actions, Jenkins: build and test automation.
  - Docker/TestContainers: consistent test environments.
- **Standards**:
  - Run tests on every PR; block merges on failures.
  - Parallelize tests for speed.
  - Continuous monitoring with dashboards (e.g., Grafana for metrics).

## Metrics and reporting

- **Code coverage**: use JaCoCo, Istanbul; report in SonarQube.
- **Technical debt**: quantify and track improvements.
- **MTTR/MTBF**: reliability metrics.
- **Reporting**: dashboards in tooling for automatic alerting.

**Technical debt management**: assign owners; refactoring plans; do not accumulate > 10% debt.

## General guidelines

- **Mandatory integration**: all QA checks must be integrated in CI/CD; do not allow merges without tests and analysis.
- **Testing pyramid**: maintain ~70% unit, 20% integration, 10% E2E; adjust per project.
- **Minimum coverage**: 80% for unit tests; 100% for critical code.
- **TDD/BDD**: adopt for new work; write tests before code.
- **Mandatory reviewers**: minimum 2 reviews per PR; use standard checklists.
- **Technical debt**: do not exceed 5% debt; monthly reduction plans.
- **Documentation**: documented tests, clear use cases, detailed bug reports.
- **Security first**: SAST/DAST scanners on every build; OWASP compliance.
- **Accessibility**: WCAG checks on releases; include in E2E.
- **Performance**: SLAs defined; continuous monitoring.
- **Automation**: >90% of tests automated; manual flows only for exploratory testing.
- **Fast feedback**: tests in <10 minutes; immediate PR feedback.
- **Continuous improvement**: quarterly QA retrospectives; tooling updates.
- **False positives**: document and suppress with justification; do not globally ignore.
- **Training**: annual QA training for the whole team.

## Final considerations

- Quality is a non-functional requirement and must be treated as a deliverable: no release is considered ready without automated evidence (tests, static analysis, and CI/CD results).
- Thresholds (coverage, debt, feedback times) can be tightened based on system criticality; any relaxation requires technical justification and approval.
- All QA decisions must be auditable (build artifacts, reports, traces, and results), especially for TELCO-impacting systems.


