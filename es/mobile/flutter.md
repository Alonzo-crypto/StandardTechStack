# Stack Tecnológico de Flutter

NOTA IMPORTANTE: Este documento no es definitivo, está en revisión.

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones móviles con Flutter.

## Stack Principal
- **Framework**: [Flutter](https://flutter.dev/)
- **Lenguaje**: [Dart](https://dart.dev/) (v3.x o superior)

## Manejo de Estado
- **Recomendado**: [Riverpod](https://riverpod.dev/) es la solución de manejo de estado preferida por su simplicidad, testabilidad y seguridad en tiempo de compilación.
- **Alternativa**: [BLoC](https://bloclibrary.dev/) puede usarse para proyectos con un estado muy complejo o donde el equipo tiene una fuerte experiencia previa.

## Navegación
- **Estándar**: [GoRouter](https://pub.dev/packages/go_router) es el paquete requerido para manejar la navegación y los deep links.

## Comunicación con API
- **Estándar**: El paquete [Dio](https://pub.dev/packages/dio) debe usarse para todas las peticiones HTTP para asegurar consistencia y acceso a características como interceptores y cancelación.
- **Generación de Código**: Para APIs REST, usar [Retrofit](https://pub.dev/packages/retrofit) con Dio para generar código de cliente tipado de forma segura.

## Pruebas (Testing)
- **Unitarias/Widget**: Usar el framework integrado `flutter_test`.
- **Integración**: Usar `integration_test`.

## Convenciones de Nomenclatura
- **Clases**: `PascalCase` (ej., `class UserProfile {}`).
- **Archivos, Variables, Funciones**: `snake_case` (ej., `user_profile.dart`, `final userProfile;`).

## Estructura de Directorios
El estándar es una estructura de directorios "feature-first" (funcionalidad primero).

`lib`
`├── src`
`│   ├── features/                  # Carpetas de las funcionalidades principales`
`│   │   └── auth/`
`│   │       ├── data/                # Fuentes de datos (clientes API, almacenamiento local)`
`│   │       ├── domain/              # Lógica de negocio (entidades, repositorios, casos de uso)`
`│   │       └── presentation/        # Capa de UI (providers, widgets, pantallas)`
`│   ├── common_widgets/            # Widgets compartidos entre funcionalidades`
`│   ├── routing/                   # Configuración de GoRouter`
`│   ├── services/                  # Servicios globales (ej., analíticas)`
`│   └── utils/                     # Funciones de utilidad`
`├── main.dart`
