# Flutter Technology Stack

IMPORTANT NOTE: This document is not final; it is under review.

This document outlines the specific standards and conventions for developing mobile applications with Flutter.

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
