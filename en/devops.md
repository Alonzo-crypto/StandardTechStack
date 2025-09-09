# Infrastructure & DevOps

This document covers standards related to deployment, containerization, and CI/CD.

## Deployment Platform
- **Standard**: All new applications should be designed to be deployed on major cloud providers like **AWS, Azure, or Google Cloud**.
- **Serverless**: For applicable services (e.g., APIs, small functions), serverless deployment is preferred to reduce operational overhead.

## Containerization
- **Standard**: All backend services must be containerized using [Docker](https://www.docker.com/).
- **Dockerfile**: Each service must include a multi-stage `Dockerfile` to produce a small, optimized, and secure production image.

## CI/CD
- **Platform**: [GitHub Actions](https://github.com/features/actions) is the standard for all CI/CD pipelines.
- **Required Workflows**: Every project must include workflows for:
  - **Linting & Formatting**: Run on every push to any branch.
  - **Testing**: Run unit and integration tests on every push to `develop` and feature branches.
  - **Building**: Create a production build and container image on every merge to `develop`.
  - **Deployment**: Automate deployment to staging/production environments.

## Package Management
- **Standard**: [pnpm](https://pnpm.io/) is the required package manager for all TypeScript/JavaScript projects to ensure efficient and deterministic dependency management.
