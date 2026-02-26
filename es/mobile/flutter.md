# Stack Tecnológico de Flutter

## Estándar vigente

Este documento define el **estándar obligatorio** para construir aplicaciones móviles con Flutter en Fibex Telecom.

- **Cumplimiento**: obligatorio para nuevos productos móviles y para modernizaciones relevantes.
- **Excepciones**: requieren justificación técnica, evaluación de riesgo y aprobación explícita del comité de arquitectura.
- **Calidad (ISO/IEC 25010)**: se exige evidencia automatizada (tests, análisis estático) y controles de seguridad (dependencias y secretos) integrados al pipeline.

Este documento describe los estándares y convenciones específicas para desarrollar aplicaciones móviles con Flutter.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar.

Niveles:

- **Estándar**: aplicaciones internas o de impacto moderado.
- **TELCO Crítico**: apps con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Control | Herramienta estándar | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Formato | `dart format` | Sin diffs | Sin diffs | Sí |
| Lint | `flutter analyze` | 0 errores | 0 errores | Sí |
| Tests unit/widget | `flutter test` | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| Tests de integración | `integration_test` | Flujos críticos en `main`/release | Flujos críticos + regresión en `main`/release | Sí |
| Dependencias | `flutter pub outdated` + auditoría (Snyk si aplica) | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Secretos | Gitleaks (o equivalente) | 0 hallazgos | 0 hallazgos | Sí |

## Seguridad (obligatorio)

- Prohibido almacenar tokens o secretos en texto plano. Cualquier token persistente debe almacenarse con almacenamiento seguro del SO (Keychain/Keystore).
- Network: exigir TLS; validar certificados según política del producto; prohibido deshabilitar validación TLS en builds no-locales.
- Observabilidad: registrar eventos operativos sin PII; aplicar redacción y minimización de datos.

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
