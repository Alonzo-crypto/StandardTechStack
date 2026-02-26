# Aseguramiento de la Calidad (QA)

## Estándar vigente

Este documento define el **estándar obligatorio** de QA para Fibex Telecom.

- **Cumplimiento**: se aplica a todos los repositorios, servicios y aplicaciones, incluyendo trabajo de terceros.
- **Excepciones**: cualquier relajación de umbrales o bypass de controles requiere justificación técnica y aprobación explícita.

## Quality Gates (obligatorios)

Los siguientes controles son **bloqueantes**: si fallan, el PR no se puede fusionar. Cada repositorio debe implementarlos con la herramienta equivalente de su stack.

Niveles:

- **Estándar**: productos internos o de impacto moderado.
- **TELCO Crítico**: sistemas con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Categoría | Gate | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Estilo | Formateo automático | Sin diffs | Sin diffs | Sí |
| Calidad | Lint | 0 errores | 0 errores | Sí |
| Correctitud | Type-check (cuando aplique) | 0 errores | 0 errores | Sí |
| Pruebas | Unit tests | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| Pruebas | Integration tests | Flujos críticos cubiertos en CI | Flujos críticos + regresión de rutas críticas en CI | Sí |
| Pruebas | E2E (cuando aplique) | Flujos críticos en `main`/release | Flujos críticos + regresión de rutas críticas en `main`/release | Sí |
| Seguridad | Secret scanning | 0 hallazgos | 0 hallazgos | Sí |
| Seguridad | Dependency scanning | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Seguridad | SAST | 0 hallazgos High sin excepción | 0 hallazgos Medium/High sin excepción | Sí |
| Seguridad | DAST (apps expuestas) | 0 hallazgos High sin excepción | 0 hallazgos Medium/High sin excepción | Sí |
| Supply chain | SBOM (cuando aplique) | Generada por release | Generada por release + preservada como artefacto | Sí |
| Operación | Evidencia CI | Artefactos y reportes en PR/build | Artefactos, reportes y métricas de calidad en PR/build | Sí |

En Fibex Telecom, el Aseguramiento de la Calidad (QA) es un pilar fundamental para garantizar que nuestros productos sean confiables, seguros y de alta calidad. Este documento establece los estándares completos de la industria para QA, incluyendo estrategias de prueba, herramientas automatizadas, análisis estático, integración continua y mejores prácticas. Siguiendo estos estándares, aseguramos la entrega de software robusto, minimizamos riesgos y promovemos una cultura de mejora continua.

El QA abarca desde la prevención de defectos en el código hasta la validación exhaustiva en entornos de producción, integrando prácticas como TDD (Test-Driven Development), BDD (Behavior-Driven Development) y DevOps. Todos los equipos deben adoptar estos estándares para mantener la excelencia en nuestros desarrollos.

## Estrategias de Pruebas

Implementamos una pirámide de pruebas equilibrada, priorizando pruebas unitarias y escalando hacia pruebas de integración y end-to-end (E2E). Cada tipo de prueba tiene herramientas y estándares específicos.

### Pruebas Unitarias

- **Propósito**: Validar unidades individuales de código (funciones, métodos, clases) en aislamiento.
- **Cobertura**: Mínimo 80% de cobertura de código.
- **Herramientas**:
  - Jest (JavaScript/TypeScript): Framework rápido con mocking y assertions.
  - JUnit (Java)
  - NUnit (.NET)
  - pytest (Python): Frameworks estándar por lenguaje.
- **Estándares**: Usar TDD; escribir pruebas antes del código; mocks para dependencias externas.

### Pruebas de Integración

- **Propósito**: Verificar la interacción entre componentes o servicios.
- **Herramientas**:
  - Postman/Newman: Para APIs REST.
  - TestContainers: Para pruebas con contenedores reales (bases de datos, servicios).
  - Cypress: Para integraciones frontend-backend.
- **Estándares**: Incluir en CI; probar flujos críticos de datos.

### Pruebas End-to-End (E2E)

- **Propósito**: Simular el comportamiento del usuario real en el sistema completo.
- **Herramientas**:
  - Selenium: Automatización de navegadores.
  - Cypress: Para aplicaciones web modernas.
  - Appium: Para aplicaciones móviles.
- **Estándares**: Ejecutar en entornos staging; cubrir escenarios críticos de negocio.

### Pruebas de Rendimiento y Carga

- **Propósito**: Evaluar el rendimiento bajo carga normal y pico.
- **Herramientas**:
  - JMeter: Para pruebas de carga y estrés.
  - Gatling: Escalable para simulaciones de alto volumen.
  - Lighthouse: Para métricas de rendimiento web.
- **Estándares**: Definir SLAs (tiempos de respuesta < 2s); pruebas continuas en CI/CD.

### Pruebas de Seguridad

- **Propósito**: Identificar vulnerabilidades y riesgos de seguridad.
- **Herramientas**:
  - OWASP ZAP: Escáner de vulnerabilidades.
  - Snyk: Análisis de dependencias y contenedores.
  - Burp Suite: Pruebas de penetración.
- **Estándares**: Integrar SAST/DAST en pipelines; cumplir con estándares como OWASP Top 10.

### Pruebas de Accesibilidad

- **Propósito**: Asegurar que el software sea usable por personas con discapacidades.
- **Herramientas**:
  - axe-core: Librería para pruebas automáticas.
  - WAVE: Evaluación manual asistida.
- **Estándares**: Cumplir WCAG 2.1 AA; incluir en E2E.

### Pruebas de Regresión

- **Propósito**: Verificar que cambios nuevos no rompan funcionalidades existentes.
- **Herramientas**:
  - Suites automatizadas con herramientas arriba mencionadas.
- **Estándares**: Ejecutar en cada commit; usar smoke tests para validaciones rápidas.

## Análisis Estático y Calidad de Código

El análisis estático identifica problemas en el código sin ejecutarlo, mejorando la mantenibilidad y seguridad.

- **SonarQube** (`https://www.sonarsource.com/products/sonarqube/`): Plataforma integral para análisis estático, detección de code smells, vulnerabilidades, duplicaciones y métricas de mantenibilidad. Soporta múltiples lenguajes.
- **ESLint/Prettier** (JavaScript/TypeScript): Linting y formateo automático para consistencia de código.
- **Pylint/Black** (Python): Análisis estático y formateo.
- **Checkstyle/SpotBugs** (Java): Verificación de estilo y detección de bugs.
- **Roslyn Analyzers** (.NET): Análisis integrado en compiladores.
- **Bandit** (Python): Enfoque en seguridad.
- **Dependabot/Snyk**: Análisis de vulnerabilidades en dependencias.

**Estándares**: Integrar en pre-commit hooks; umbrales estrictos (ej. deuda técnica < 5%, cobertura > 80%); reportes automáticos en PRs.

## Revisión de Código Asistida por IA

- **CodeRabbit** (`https://www.coderabbit.ai/`): Asistente de IA para revisiones automáticas en PRs, sugiriendo mejoras de estilo, corrección y mejores prácticas.
- **GitHub Copilot**: Sugerencias en tiempo real durante codificación.
- **DeepCode/SonarLint**: Extensiones IDE para feedback inmediato.
- **CodeClimate**: Análisis de complejidad y mantenibilidad.

**Estándares**: Usar IA como complemento a revisiones humanas; configurar reglas personalizadas por proyecto.

## Integración Continua y Automatización (CI/CD)

QA se integra plenamente en pipelines de CI/CD para feedback rápido.

- **Herramientas**:
  - GitHub Actions, Jenkins: Para automatización de builds y tests.
  - Docker/TestContainers: Para entornos de prueba consistentes.
- **Estándares**:
  - Ejecutar tests en cada PR; bloquear merges si fallan.
  - Paralelizar tests para velocidad.
  - Monitoreo continuo con dashboards (ej. Grafana para métricas).

## Métricas y Reportes

- **Cobertura de Código**: Usar JaCoCo, Istanbul; reportar en SonarQube.
- **Deuda Técnica**: Cuantificar y rastrear mejoras.
- **MTTR/MTBF**: Métricas de fiabilidad.
- **Reportes**: Dashboards en herramientas para manejar alertas automáticas.

**Gestión de Deuda Técnica**: Asignar responsables; planes de refactorización; no acumular > 10% de deuda.

## Lineamientos Generales

- **Integración Obligatoria**: Todas las verificaciones QA deben integrarse en CI/CD; no permitir merges sin pasar tests y análisis.
- **Pirámide de Pruebas**: Mantener proporción 70% unitarias, 20% integración, 10% E2E; ajustar por proyecto.
- **Cobertura Mínima**: 80% para unitarias; 100% para código crítico.
- **TDD/BDD**: Adoptar en nuevos desarrollos; escribir tests antes de código.
- **Revisor Obligatorio**: Mínimo 2 revisiones por PR; usar checklists estándar.
- **Gestión de Deuda Técnica**: No exceder 5% de deuda; planes mensuales de reducción.
- **Documentación**: Tests documentados; casos de uso claros; reportes de bugs detallados.
- **Seguridad Primero**: Escáneres SAST/DAST en cada build; cumplimiento OWASP.
- **Accesibilidad**: Pruebas WCAG en releases; inclusión en E2E.
- **Rendimiento**: SLAs definidos; monitoreo continuo.
- **Automatización**: >90% de tests automatizados; flujos manuales solo para exploratorios.
- **Feedback Rápido**: Tests en <10 min; feedback en PRs inmediato.
- **Mejora Continua**: Retrospectivas QA trimestrales; actualización de herramientas.
- **Falsos Positivos**: Documentar y suprimir con justificación; no ignorar globalmente.
- **Entrenamiento**: Capacitación anual en QA para todo el equipo.

## Consideraciones Finales

- La calidad es un requisito no funcional y debe tratarse como un entregable: ninguna entrega se considera lista sin evidencia automatizada (tests, análisis estático, y resultados en CI/CD).
- Los umbrales (cobertura, deuda técnica, tiempos de feedback) pueden endurecerse por criticidad del sistema; cualquier relajación requiere justificación técnica y aprobación.
- Todas las decisiones de QA deben poder auditarse (artefactos de build, reportes, trazas y resultados), especialmente en sistemas con impacto TELCO.
