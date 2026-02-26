# Flutter Technology Stack

## Effective standard

This document defines the **mandatory standard** for building Flutter mobile applications at FIBEX.

- **Compliance**: mandatory for new projects and for significant refactors/modernizations.
- **Exceptions**: require technical justification, risk analysis, and explicit approval by the architecture committee.
- **Quality (ISO/IEC 25010)**: quality must be proven with CI/CD evidence (format, analysis, tests, dependency security).

This document outlines the specific standards and conventions for developing mobile applications with Flutter.

## Quality Gates (mandatory)

The following controls are **merge-blocking**: if they fail, the PR cannot be merged.

Levels:

- **Standard**: internal applications or moderate impact.
- **TELCO Critical**: strict SLAs, high exposure, operational/regulatory impact, or network/service criticality.

| Control | Standard tool | Standard | TELCO Critical | Blocks merge |
|---|---|---:|---:|:---:|
| Formatting | `dart format` | No diffs | No diffs | Yes |
| Static analysis | `flutter analyze` | 0 errors | 0 errors | Yes |
| Tests | `flutter test` / `integration_test` | Coverage >= 80% overall; 100% in critical code | Coverage >= 90% overall; 100% in critical code | Yes |
| Dependencies | `dart pub outdated` + advisory scan (Snyk/Dependabot if available) | 0 High/Critical without exception | 0 High/Critical without exception | Yes |
| Secrets | Gitleaks (or equivalent) | 0 findings | 0 findings | Yes |

## Security & supply chain (mandatory)

- Secrets management: forbidden in repo. Use per-environment variables/secure storage and a vault when applicable.
- Mobile hardening: do not store tokens in plaintext; use secure storage; enforce TLS and certificate validation.
- Dependencies: any new package must be justified (maintainability, community health, licensing, attack surface).

## Core Stack
- **Framework**: [Flutter](https://flutter.dev/)
- **Language**: [Dart](https://dart.dev/) (v3.x or higher)

## State Management
- **Recommended**: [Riverpod](https://riverpod.dev/) is the preferred state management solution for its simplicity, testability, and compile-safe nature.
- **Alternative**: [BLoC](https://bloclibrary.dev/) can be used for projects with very complex state or where the team has strong existing expertise.

## Navigation
- **Standard**: [GoRouter](https://pub.dev/packages/go_router) is the required package for handling navigation and deep linking.

## API Communication
- **Standard**: The [Dio](https://pub.dev/packages/dio) package should be used for all HTTP requests to ensure consistency and access to features like interceptors and cancellation.
- **Code Generation**: For REST APIs, use [Retrofit](https://pub.dev/packages/retrofit) with Dio to generate type-safe client code.

## Testing
- **Unit/Widget**: Use the built-in `flutter_test` framework.
- **Integration**: Use `integration_test`.

## Naming Conventions
- **Classes**: `PascalCase` (e.g., `class UserProfile {}`).
- **Files, Variables, Functions**: `snake_case` (e.g., `user_profile.dart`, `final userProfile;`).

## Directory Structure
A feature-first directory structure is the standard.

`lib`
`├── src`
`│   ├── features/                  # Main feature folders`
`│   │   └── auth/`
`│   │       ├── data/                # Data sources (API clients, local storage)`
`│   │       ├── domain/              # Business logic (entities, repositories, use cases)`
`│   │       └── presentation/        # UI layer (providers, widgets, screens)`
`│   ├── common_widgets/            # Shared widgets used across features`
`│   ├── routing/                   # GoRouter configuration`
`│   ├── services/                  # Global services (e.g., analytics)`
`│   └── utils/                     # Utility functions`
`├── main.dart`
