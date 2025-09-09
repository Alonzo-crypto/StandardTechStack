# Especificaciones de Diseño de API

Este documento describe los estándares para diseñar y construir APIs RESTful en FIBEX.

## Principios
- **Estilo**: Seguir los principios RESTful para todo el diseño de API.
- **Especificación**: Usar el estándar [OpenAPI 3.0 (Swagger)](https://swagger.io/specification/) para definir y documentar las APIs. Esto es obligatorio para todos los servicios nuevos.

## Convenciones de Nomenclatura
- **Endpoints**: Usar `kebab-case` y sustantivos en plural para los recursos (ej., `/user-profiles`, `/purchase-orders`).
- **Propiedades JSON**: Usar `camelCase` para todas las claves de objetos JSON en peticiones y respuestas (ej., `"userName": "john.doe"`).

## Versionado
Todas las APIs deben ser versionadas. El versionado debe incluirse en la ruta de la URL.
- Ejemplo: `/api/v1/users`
- Ejemplo: `/api/v2/users`

## Respuestas
- **Códigos de Estado**: Usar los códigos de estado HTTP estándar correctamente (ej., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
- **Cuerpo de la Respuesta**: Las respuestas JSON deben tener una estructura consistente.

  **Respuesta Exitosa:**
  ```json
  {
    "data": {
      "userId": "123",
      "name": "John Doe"
    },
    "error": null
  }
  ```

  **Respuesta de Error:**
  ```json
  {
    "data": null,
    "error": {
      "code": "INVALID_INPUT",
      "message": "La dirección de correo electrónico no es válida."
    }
  }
  ```

## Autenticación
- Proteger los endpoints usando JWTs enviados en la cabecera `Authorization`.
- El token debe tener el prefijo `Bearer`.
- Ejemplo: `Authorization: Bearer <your-jwt-token>`
