# Guiding Principles

- **Use Approved Languages**: Projects must use the designated language for their platform: **TypeScript** for web frontend and backend services, **Python** for backend services, and **Dart** for mobile applications.
- **Simplicity and Maintainability**: We have a preference for simple, clear, and maintainable solutions over complex and overly-engineered ones. Code should be easy to read and understand.
- **Consistency**: The conventions and patterns outlined in this document must be followed to ensure a consistent developer experience across all projects.
- **Test-Driven Development (TDD)**: Write tests before or alongside your code. Every new feature or bug fix must be accompanied by relevant tests.
- **API-First Design**: Design APIs thoughtfully before implementation. Use standards like OpenAPI to document them.
- **Language in Code**: All code, including variable names, function names, comments, and documentation, must be in **English**.
- **Formatting**: Code must be formatted using [Prettier](https://prettier.io/) with a shared configuration. A pre-commit hook should enforce this.
- **Linting**: Code must pass linting checks using [ESLint](https://eslint.org/) (for TS) or a similar linter for other languages, with a shared configuration.
