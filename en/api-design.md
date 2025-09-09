# API Design Specifications

This document outlines the standards for designing and building RESTful APIs at FIBEX.

## Principles
- **Style**: Follow RESTful principles for all API design.
- **Specification**: Use the [OpenAPI 3.0 (Swagger)](https://swagger.io/specification/) standard to define and document APIs. This is mandatory for all new services.

## Naming Conventions
- **Endpoints**: Use `kebab-case` and plural nouns for resources (e.g., `/user-profiles`, `/purchase-orders`).
- **JSON Properties**: Use `camelCase` for all JSON object keys in requests and responses (e.g., `"userName": "john.doe"`).

## Versioning
All APIs must be versioned. Versioning should be included in the URL path.
- Example: `/api/v1/users`
- Example: `/api/v2/users`

## Responses
- **Status Codes**: Use standard HTTP status codes correctly (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- **Response Body**: JSON responses should have a consistent structure.

  **Successful Response:**
  ```json
  {
    "data": {
      "userId": "123",
      "name": "John Doe"
    },
    "error": null
  }
  ```

  **Error Response:**
  ```json
  {
    "data": null,
    "error": {
      "code": "INVALID_INPUT",
      "message": "The email address is not valid."
    }
  }
  ```

## Authentication
- Secure endpoints using JWTs sent in the `Authorization` header.
- The token should be prefixed with `Bearer`.
- Example: `Authorization: Bearer <your-jwt-token>`
