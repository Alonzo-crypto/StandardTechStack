# Infraestructura y DevOps

## Estándar vigente

Este documento define el **estándar obligatorio** de infraestructura y DevOps para Fibex Telecom.

- **Cumplimiento**: se aplica a todos los servicios y aplicaciones desplegados por Fibex o por terceros.
- **Excepciones**: requieren justificación técnica, evaluación de riesgo y aprobación explícita.

Este documento cubre los estándares relacionados con el despliegue, la contenerización y CI/CD.

## Quality Gates de CI/CD (obligatorios)

Los siguientes controles son **bloqueantes** para merges a `develop`, `qa` y `main`.

Niveles:

- **Estándar**: sistemas internos o de impacto moderado.
- **TELCO Crítico**: sistemas con SLA estricto, alta exposición, impacto operacional/regulatorio o criticidad de red.

| Gate | Evidencia | Estándar | TELCO Crítico | Bloquea merge |
|---|---|---:|---:|:---:|
| Lint/Format | Job CI + artefacto/reporte | 0 errores | 0 errores | Sí |
| Tests | Job CI + reporte de cobertura | Cobertura >= 80% global; 100% en código crítico | Cobertura >= 90% global; 100% en código crítico | Sí |
| SAST | Reporte (SonarQube/Semgrep u equivalente) | 0 hallazgos High sin excepción | 0 hallazgos Medium/High sin excepción | Sí |
| Secret scanning | Reporte (Gitleaks u equivalente) | 0 hallazgos | 0 hallazgos | Sí |
| Dependency scanning | Reporte (Snyk/Dependabot u equivalente) | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Container scanning (si aplica) | Reporte (Trivy u equivalente) | 0 High/Critical sin excepción | 0 High/Critical sin excepción | Sí |
| Build reproducible | Artefacto versionado/imagen con digest | Generado en CI (nunca local) | Generado en CI + firmado cuando aplique | Sí |

## Release y trazabilidad (obligatorio)

- Toda imagen/artefacto desplegable debe poder trazarse a commit SHA, versión y pipeline.
- Prohibido desplegar artefactos no generados por CI.
- Versionado: SemVer cuando aplique; tags y releases auditables.

## Plataforma de Despliegue

### Nuevos proyectos

Para nuevos desarrollos, el estándar corporativo es **AWS** para el despliegue de infraestructura y servicios gestionados.

La ejecución puede variar por sede/entorno, manteniendo coherencia operativa y de seguridad:

| Sede / contexto | Estándar de despliegue | Uso típico |
|---|---|---|
| Caracas | VPS on‑premise (servidores físicos) + Docker (Compose/Swarm según necesidad) | Residencia local, baja latencia, dependencia de infraestructura local |
| Valencia | Railway como plataforma gestionada por defecto; Dokploy como alternativa controlada | Time‑to‑market, operación simplificada, apps estándar |
| Nuevos proyectos (corporativo) | AWS | Sistemas críticos, escalabilidad, cumplimiento, servicios gestionados y gobierno centralizado |

La arquitectura base de AWS debe definirse por el comité de arquitectura y seguridad, incluyendo como mínimo: cuentas por entorno, IAM por rol, red (VPC/subnets), observabilidad, backups, y estrategia de despliegue.

## Seguridad

Este apartado define mínimos de seguridad aplicables a todos los proyectos, independientemente del proveedor de infraestructura.

- **Seguridad de contraseñas (Argon2)**:

  - Estándar: Argon2id con parámetros recomendados (p. ej., memoryCost ≥ 64MB, timeCost 2–4, parallelism acorde a CPU).
  - Uso: incluir `salt` único por usuario, versión de parámetros en el hash para facilitar recalibración futura.
  - Migración: al autenticar, detectar hashes antiguos (bcrypt/scrypt) y rehash con Argon2id tras éxito.

  - Operación: recalibrar parámetros al menos semestralmente o ante cambios de hardware/amenazas; registrar versión de parámetros para auditoría.

## Contenerización

- **Estándar**: Todos los servicios de backend deben ser contenerizados usando [Docker](https://www.docker.com/).
- **Dockerfile**: Cada servicio debe incluir un `Dockerfile` de múltiples etapas para producir una imagen de producción pequeña, optimizada y segura.

## CI/CD

- **Plataforma**: [GitHub Actions](https://github.com/features/actions) es el estándar para todos los pipelines de CI/CD.
- **Workflows Requeridos**: Cada proyecto debe incluir workflows para:
  - **Linting y Formateo**: Ejecutar en cada push a cualquier rama.
  - **Pruebas**: Ejecutar pruebas unitarias y de integración en cada push a `develop` y ramas de funcionalidades.
  - **Construcción (Build)**: Crear un build de producción y una imagen de contenedor en cada merge a `develop`.
  - **Despliegue**: Automatizar el despliegue a entornos de staging/producción.

## Gestión de Paquetes

- **Estándar**: [pnpm](https://pnpm.io/) es el gestor de paquetes requerido para todos los proyectos de TypeScript/JavaScript para asegurar una gestión de dependencias eficiente y determinista.

## Gestión de dominios e IPs

- Dominios: centralizar DNS en un proveedor único. Usar `A/AAAA` para IPs y `CNAME` para subdominios. Habilitar DNSSEC cuando sea posible.
- TLS: certificados automáticos (Let's Encrypt) y renovación continua. Forzar `HTTPS` y HSTS.
- IPs: documentar IPs públicas por entorno y servicio. Aplicar allowlists en paneles sensibles.
- Routing: usar `www` → apex con redirección 301; configurar `robots.txt` y `sitemap.xml` en sitios públicos.
- A través de AWS se deben configurar los dominios y la separación de ambientes con nombres distintos para las aplicaciones o APIs, por ejemplo, `app-dev.fibextelecom.com` o `api-dev.fibextelecom.com` para ambiente de desarrollo.

## Gestión de logs

- Formato legible y estructurado: timestamp, nivel, `traceId`, mensaje y campos clave; evitar JSON crudo innecesario.
- Centralización: enviar logs a un agregador (p. ej., Loki/ELK) con retención por entorno.
- Niveles: `debug` (desarrollo), `info` (flujo normal), `warn` (anomalías recuperables), `error` (fallos). Nunca registrar PII o secretos.
- Correlación: propagar `traceId` y `spanId` desde el gateway/middleware a todos los servicios.

- Retención mínima: definir por entorno (dev menor, prod mayor) y por requerimiento regulatorio. Cualquier excepción debe estar justificada y aprobada.

### Sistemas existentes

#### Caracas

- **VPS en servidores físicos (on‑premise)**: Para cargas que requieran residencia local o baja latencia en Caracas.
  - Requisitos mínimos: virtualización KVM/Proxmox o equivalente, discos SSD/NVMe, redundancia eléctrica/red.
  - Sistema base: Ubuntu LTS actualizado, SSH con claves, `ufw` con política `deny` por defecto, fail2ban.
  - Contenerización: Docker + Docker Compose o Docker Swarm para agrupación simple.
  - Observabilidad: métricas (Prometheus/node_exporter), logs centralizados (Loki o alternativa), alertas (Alertmanager).
  - Backups: snapshots diarios de volúmenes y copias off‑site cifradas.
  - Seguridad: TLS con Let's Encrypt, renovación automática; firewall perimetral; acceso VPN para paneles internos.

#### Valencia

- **Estándar**: Todas las nuevas aplicaciones deben diseñarse para ser desplegadas en el proveedor de nube **Railway**.
- **Serverless**: Para los servicios aplicables (ej., APIs, funciones pequeñas), se prefiere el despliegue serverless para reducir la carga operativa.

- **Railway (Valencia)**:

  - Despliegue: auto‑build con Dockerfile o buildpacks. Variables de entorno en el panel; secretos nunca en el código.
  - Bases de datos gestionadas: preferir instancias administradas; habilitar backups automáticos y réplicas si están disponibles.
  - Red y seguridad: dominios personalizados con TLS, restricciones de IP si hace falta, env vars por entorno (dev/stage/prod).
  - Observabilidad: logs en tiempo real, métricas de CPU/memoria; configurar alertas en umbrales críticos.

- **Dokploy (alternativa)**:

  - Uso: cuando se requiera control de infraestructura autopropia o multi‑tenant simplificado.
  - Prácticas: definir plantillas de despliegue con imágenes mínimas, healthchecks HTTP/TCP, y políticas de reinicio.

- **Funciones serverless**:

  - Consideraciones: timeouts, cold starts y límites de memoria; usar patrones idempotentes para reintentos.
  - Disparadores: HTTP, cron, colas/eventos. Mantener funciones pequeñas, con dependencias mínimas.
  - Seguridad: autenticación obligatoria, validación de entrada estricta, límites de tasa por función.
