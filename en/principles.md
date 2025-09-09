# Guiding Principles

- **Use Approved Languages**: Projects must use the designated language for their platform: **TypeScript** for web frontend and backend services, **Python** for backend services, and **Dart** for mobile applications.
- **Simplicity and Maintainability**: We have a preference for simple, clear, and maintainable solutions over complex and overly-engineered ones. Code should be easy to read and understand.
- **Consistency**: The conventions and patterns outlined in this document must be followed to ensure a consistent developer experience across all projects.
- **Test-Driven Development (TDD)**: Write tests before or alongside your code. Every new feature or bug fix must be accompanied by relevant tests.
- **API-First Design**: Design APIs thoughtfully before implementation. Use standards like OpenAPI to document them.

## TELCO-Grade Principles

- **High Availability and Scalability**: All systems must be architected for resilience, fault tolerance, and the capacity to scale seamlessly. They must be prepared to handle significant, rapid growth in the user base while maintaining performance.
- **Quality of Service (QoS)**: Every component must be built and tested to meet high standards of performance, reliability, and security. The primary goal is to ensure a superior and consistent customer experience.
- **Monitoring and Observability**: Systems must expose real-time metrics, structured logs, and traces. This allows for proactive monitoring, rapid troubleshooting, and continuous performance improvement.
- **Reusable and Modular Design**: Solutions should be designed as a series of independent, reusable components with well-defined APIs. This fosters flexibility, accelerates a development, and ensures long-term maintainability.

## General Conventions

- **Language in Code**: All code, including variable names, function names, comments, and documentation, must be in **English**.
- **Formatting**: Code must be formatted using [Prettier](https://prettier.io/) with a shared configuration. A pre-commit hook should enforce this.
- **Linting**: Code must pass linting checks using [ESLint](https://eslint.org/) (for TS) or a similar linter for other languages, with a shared configuration.
