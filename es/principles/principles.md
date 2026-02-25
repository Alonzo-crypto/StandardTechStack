# Principios Rectores

Estos principios son obligatorios y no admiten excepciones sin aprobación explícita del comité de arquitectura. Se aplican a todos los proyectos en Fibex Telecom.

- **Usar Lenguajes Aprobados**: Los proyectos deben usar exclusivamente los lenguajes y frameworks aprobados por plataforma. Cualquier desviación requiere justificación técnica y aprobación del comité de arquitectura.

  - **TypeScript**:
    - Backend: NestJS (recomendado para APIs escalables y modulares).
    - Frontend Web: Next.js (recomendado para SSR/SSG), Angular (para aplicaciones empresariales complejas), React (para UIs dinámicas), Vue.js (para prototipos rápidos y mantenibles).
  - **Python**:
    - Frameworks: Django (recomendado para aplicaciones full-stack con ORM integrado), FastAPI (recomendado para APIs REST/GraphQL de alto rendimiento), Flask (para microservicios simples).
    - Recomendaciones: Usar async/await en FastAPI; Poetry para gestión de dependencias; Pydantic para validación.
  - **PHP**:
    - Laravel (recomendado para aplicaciones web robustas con Eloquent ORM).
  - **Dart**:
    - Para aplicaciones móviles: Flutter (recomendado para cross-platform con UI declarativa).
- **Simplicidad y Mantenibilidad**: Preferir soluciones simples y claras. Evitar complejidad innecesaria; el código debe ser legible por cualquier desarrollador del equipo. Usar patrones conocidos y evitar "reinventar la rueda".
- **Consistencia**: Seguir estrictamente las convenciones descritas. Herramientas automatizadas (linters, formatters) deben forzar el cumplimiento. Inconsistencias son consideradas bugs críticos.
- **Desarrollo Guiado por Pruebas (TDD/BDD)**: Escribir pruebas antes del código. Cobertura mínima de 80%; pruebas fallidas bloquean commits. No se permite código sin tests asociados.
- **Diseño API-First**: Diseñar APIs con OpenAPI antes de cualquier implementación. APIs deben ser versionadas, documentadas y probadas exhaustivamente.
- **Seguridad por Diseño (Security by Design)**: Integrar seguridad desde el inicio. Usar principios como Zero Trust, encriptación end-to-end y minimización de datos.
- **Principio de Menor Privilegio**: Otorgar solo los permisos mínimos necesarios. Aplicar en código, infraestructura y accesos.
- **Inmutabilidad y Reproducibilidad**: Usar contenedores inmutables (Docker) y entornos reproducibles. No modificaciones manuales en producción.
- **Fail-Fast**: Diseñar sistemas que fallen rápido y de manera visible. Evitar silencios fallos; logging obligatorio.
- **Separación de Preocupaciones**: Mantener capas claras (frontend, backend, datos). Evitar acoplamiento fuerte.
- **Automatización Máxima**: Todo lo automatizable debe serlo: builds, tests, deployments. Manual solo para excepciones críticas.

## Principios de Nivel TELCO

En Fibex Telecom, estos principios son críticos para operar en un entorno de alta demanda y regulación estricta. Se aplican sin excepciones para asegurar cumplimiento normativo y excelencia operativa.

- **Alta Disponibilidad y Escalabilidad**: Sistemas con 99.99% uptime mínimo. Arquitecturas serverless o microservicios con auto-escalado. Pruebas de carga obligatorias; capacidad para manejar 10x picos de tráfico.
- **Calidad de Servicio (QoS)**: Latencia <100ms para APIs críticas; throughput definido por SLA. Monitoreo continuo de QoS; penalizaciones por incumplimiento.
- **Monitoreo y Observabilidad**: Métricas Prometheus/Grafana obligatorias. Logs estructurados en ELK stack. Trazas distribuidas con Jaeger. Alertas automáticas 24/7; dashboards en tiempo real.
- **Diseño Modular y Reutilizable**: Microservicios con contratos API estables. Catálogo de componentes reutilizables. Versionado semántico estricto para evitar breaking changes.
- **Cumplimiento Regulatorio**: Adherencia a leyes de telecomunicaciones (ej. GDPR, FCC). Auditorías anuales; encriptación de datos sensibles obligatoria.
- **Resiliencia ante Fallos**: Circuit breakers, retries, fallbacks. Pruebas de caos (Chaos Engineering) trimestrales.
- **Optimización de Recursos**: Eficiencia energética y costos. Uso de CDN para distribución global; caching agresivo.
- **Integración con Infraestructura Telco**: Compatibilidad con redes 5G, IoT. APIs estandarizadas para interoperabilidad.

## Convenciones Generales

Estas convenciones son obligatorias y se aplican a todo el código. Herramientas automatizadas deben prevenir commits que no cumplan.

- **Idioma en el Código**: Todo el código debe estar en **Inglés**. Comentarios y documentación en **Español** para el equipo interno. Proveedores externos en **Inglés**.
- **Formateo**: Usar [Prettier](https://prettier.io/) con configuración compartida. Hooks de pre-commit bloquean commits no formateados.
- **Linting**: Pasar [ESLint](https://eslint.org/) para TS/JS; equivalentes para otros lenguajes. Configuración compartida; errores bloquean CI.
- **Nombres de Variables/Funciones**: CamelCase para JS/TS; snake_case para Python. Descriptivos y en inglés. Evitar abreviaturas.
- **Estructura de Proyectos**: Seguir estructura estándar (src/, tests/, docs/). Usar monorepos para multi-proyectos.
- **Manejo de Errores**: Excepciones claras; no silenciar errores. Logging estructurado obligatorio.
- **Versionado de Dependencias**: Usar versiones fijas; actualizaciones solo via PR con pruebas.
- **Commits y Mensajes**: Conventional Commits estrictos; hooks previenen mensajes no conformes.
- **Documentación**: README obligatorio; código auto-documentado; APIs con Swagger/OpenAPI.
- **Gestión de Secretos**: Nunca en código; usar vaults (ej. HashiCorp Vault). Auditorías regulares.

## Principios de Seguridad

La seguridad es prioritaria y no negociable. Cualquier violación resulta en suspensión inmediata de proyectos.

- **Zero Trust Architecture**: Verificar todo acceso; no confiar en perímetros. Autenticación multifactor obligatoria.
- **Encriptación End-to-End**: Datos sensibles encriptados en reposo y tránsito. Usar TLS 1.3 mínimo.
- **Auditorías de Seguridad**: Escáneres SAST/DAST en CI; pentesting trimestral. Cumplir OWASP Top 10.
- **Gestión de Vulnerabilidades**: Actualizaciones de seguridad en <24h; dependencias escaneadas diariamente.
- **Principio de Defensa en Profundidad**: Múltiples capas de seguridad; segmentación de redes.

## Principios de Arquitectura

Arquitecturas deben ser escalables, mantenibles y alineadas con estándares actuales.

- **Microservicios**: Servicios independientes con comunicación asíncrona (eventos). Evitar monolitos.
- **Event-Driven**: Usar patrones de eventos para decoupling. Herramientas como Kafka para mensajería.
- **Serverless donde Aplicable**: Para funciones puntuales; reducir overhead de infraestructura.
- **APIs RESTful/GraphQL**: Estandarizadas; versionadas; con throttling y rate limiting.
- **Base de Datos**: PostgreSQL/MySQL para relacionales; MongoDB para NoSQL. Migraciones versionadas.

## Gobernanza y Cumplimiento

Asegurar alineación con objetivos empresariales y regulaciones.

- **Revisión de Arquitectura**: Obligatoria para nuevos proyectos; comité aprueba diseños.
- **Métricas de Éxito**: KPIs definidos por proyecto; revisiones trimestrales.
- **Cumplimiento Normativo**: Auditorías externas anuales; documentación de compliance.
- **Gestión de Riesgos**: Evaluaciones de riesgo en cada release; planes de contingencia.
- **Entrenamiento Continuo**: Capacitación en seguridad y mejores prácticas obligatoria.

## Principios de Diseño y Código Limpio

Estos principios guían el desarrollo de software de alta calidad, mantenibilidad y escalabilidad. Son obligatorios en todo el código.

- **SOLID**: Principios para diseño orientado a objetos.
  - Single Responsibility: Cada clase una sola responsabilidad.
  - Open-Closed: Abierto a extensión, cerrado a modificación.
  - Liskov Substitution: Subtipos sustituibles por sus tipos base.
  - Interface Segregation: Interfaces específicas en lugar de generales.
  - Dependency Inversion: Depender de abstracciones, no concretas.
- **DRY (Don't Repeat Yourself)**: Evitar duplicación de código. Usar funciones, clases o módulos reutilizables.
- **KISS (Keep It Simple, Stupid)**: Mantener soluciones simples. Evitar over-engineering.
- **Clean Code**: Código legible, expresivo y bien estructurado. Nombres descriptivos, funciones cortas, comentarios mínimos.
- **Result Pattern**: Usar tipos Result para manejar errores en lugar de excepciones. Mejora previsibilidad y evita silent failures.
- **Resilience Pattern**: Diseñar para fallos: circuit breakers, retries, timeouts. Asegurar continuidad del servicio.
- **Uso Negado de Try-Catch como Deuda Técnica**: Evitar try-catch excesivo o genérico, ya que enmascara errores y complica debugging. Considerado deuda técnica porque aumenta complejidad de mantenimiento y reduce fiabilidad. Usar en su lugar: Result Pattern, validaciones upfront, o manejo específico de excepciones conocidas.

## Arquitectura Limpia (Clean Architecture)

La Arquitectura Limpia promueve separación de preocupaciones, testabilidad y mantenibilidad. En Fibex Telecom, evaluamos proyectos para decidir entre la versión normal (básica) y la estandarizada profesional (más estructurada). La elección depende de complejidad del proyecto: usar básica para simples, profesional para escalables.

### Versión Normal (Clean Architecture Básica)

Basada en Uncle Bob's Clean Architecture: capas concéntricas con dependencias hacia el centro.

- **Capas**:
  - Entities: Reglas de negocio centrales (independientes de frameworks).
  - Use Cases / Interactors: Lógica de aplicación, orquestan entities.
  - Interface Adapters: Adaptadores para UI, persistencia (Controllers, Gateways).
  - Frameworks & Drivers: Frameworks externos (DB, web frameworks).
- **Reglas**: Dependencias solo hacia adentro; inyección de dependencias.
- **Cuándo Usar**: Proyectos medianos; fácil de implementar; buena separación.

### Versión Estandarizada Profesional (Hexagonal/Onion Architecture)

Evolución más estructurada, enfatiza puertos y adaptadores (Hexagonal) o capas de cebolla (Onion).

- **Capas**:
  - Domain: Entities y reglas de negocio puras.
  - Application: Use cases, comandos/queries.
  - Infrastructure: Adaptadores externos (repositorios, APIs externas).
  - Presentation: Controllers, DTOs.
- **Puertos y Adaptadores**: Interfaces (puertos) definen contratos; adaptadores implementan (ej. DB adapters).
- **Reglas**: Domain independiente; application depende solo de domain; infrastructure depende de application.
- **Cuándo Usar**: Proyectos complejos/escalables; mejor para microservicios; facilita testing y cambios.

**Decisión**: Evaluar tamaño, equipo y requisitos. Básica para inicio rápido; profesional para largo plazo. Comité de arquitectura aprueba elección.

## Implementación Básica de Clean Architecture por Lenguaje/Framework

A continuación, estructuras de carpetas completas para implementar Clean Architecture en los lenguajes y frameworks aprobados. Cada una sigue capas con subcarpetas para entities, services, utils, etc.

### TypeScript - NestJS (Backend)

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── use-cases/
│   ├── services/
│   └── dto/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── config/
│   └── database/
├── presentation/
│   ├── controllers/
│   ├── guards/
│   ├── interceptors/
│   └── modules/
└── main.ts
```

### TypeScript - Next.js (Frontend)

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── hooks/
│   ├── services/
│   └── types/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── utils/
├── lib/
└── app/
```

### TypeScript - Angular

```
src/
├── app/
│   ├── domain/
│   │   ├── entities/
│   │   ├── services/
│   │   └── utils/
│   ├── application/
│   │   ├── services/
│   │   └── guards/
│   ├── infrastructure/
│   │   ├── adapters/
│   │   └── config/
│   ├── presentation/
│   │   ├── components/
│   │   ├── modules/
│   │   └── routing/
│   └── core/
├── assets/
├── environments/
└── main.ts
```

### TypeScript - React

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── hooks/
│   ├── services/
│   └── context/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── styles/
│   └── utils/
├── lib/
└── index.tsx
```

### TypeScript - Vue.js

```
src/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── composables/
│   ├── services/
│   └── types/
├── infrastructure/
│   ├── api/
│   ├── adapters/
│   └── config/
├── presentation/
│   ├── components/
│   ├── views/
│   ├── layouts/
│   ├── router/
│   ├── store/
│   └── styles/
├── utils/
└── main.js
```

### Python - Django

```
myproject/
├── myapp/
│   ├── domain/
│   │   ├── models.py
│   │   ├── services.py
│   │   └── utils.py
│   ├── application/
│   │   ├── views.py
│   │   ├── forms.py
│   │   └── services.py
│   ├── infrastructure/
│   │   ├── repositories.py
│   │   ├── adapters.py
│   │   └── config.py
│   ├── presentation/
│   │   ├── templates/
│   │   ├── static/
│   │   └── controllers.py
│   ├── migrations/
│   └── __init__.py
├── manage.py
└── settings.py
```

### Python - FastAPI

```
project/
├── domain/
│   ├── models.py
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── routers/
│   ├── dependencies/
│   ├── services/
│   └── dto/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── database/
│   └── config/
├── presentation/
│   ├── routes/
│   ├── controllers/
│   └── templates/
├── main.py
└── requirements.txt
```

### Python - Flask

```
project/
├── app/
│   ├── domain/
│   │   ├── models.py
│   │   ├── services/
│   │   └── utils/
│   ├── application/
│   │   ├── blueprints/
│   │   ├── services/
│   │   └── forms/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   ├── adapters/
│   │   └── config/
│   ├── presentation/
│   │   ├── templates/
│   │   ├── static/
│   │   └── routes/
│   └── __init__.py
├── config.py
├── run.py
└── requirements.txt
```

### PHP - Laravel

```
app/
├── Domain/
│   ├── Entities/
│   ├── Services/
│   └── Utils/
├── Application/
│   ├── UseCases/
│   ├── Services/
│   └── DTO/
├── Infrastructure/
│   ├── Repositories/
│   ├── Adapters/
│   ├── Config/
│   └── Database/
├── Presentation/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/
│   └── Resources/
├── Console/
├── Exceptions/
├── Http/
└── Providers/
```

### Dart - Flutter

```
lib/
├── domain/
│   ├── entities/
│   ├── services/
│   └── utils/
├── application/
│   ├── blocs/
│   ├── cubits/
│   └── services/
├── infrastructure/
│   ├── repositories/
│   ├── adapters/
│   ├── api/
│   └── config/
├── presentation/
│   ├── widgets/
│   ├── screens/
│   ├── blocs/
│   ├── theme/
│   └── utils/
├── core/
├── main.dart
└── pubspec.yaml
```
