# Infraestructura y DevOps

Este documento cubre los estándares relacionados con el despliegue, la contenerización y CI/CD.

## Plataforma de Despliegue

### Nuevos proyectos

Para los nuevos desarrollos, se va a utilizar AWS para el despliegue de la infraestructura.

TODO: Definición de arquitectura base con el proveedor de gestión de la nube AWS y atender los requerimiento de cada proyecto específico.

## Seguridad

TODO: Mover esto a su propia sección.

- **Seguridad de contraseñas (Argon2)**:

  - Estándar: Argon2id con parámetros recomendados (p. ej., memoryCost ≥ 64MB, timeCost 2–4, parallelism acorde a CPU).
  - Uso: incluir `salt` único por usuario, versión de parámetros en el hash para facilitar recalibración futura.
  - Migración: al autenticar, detectar hashes antiguos (bcrypt/scrypt) y rehash con Argon2id tras éxito.

  TODO: En base a los nuevos desarrollos definir claramente los estándares para gestionar contraseñas.

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
- A través de AWS se deben configurar los dominio y separación de ambientes con nombres distintos para las aplicaciones o API's, por ejemplo, app-dev.fibextelecom.com o api-dev.fibetelecom.com para ambiente de desarrollo.

## Gestión de logs

- Formato legible y estructurado: timestamp, nivel, `traceId`, mensaje y campos clave; evitar JSON crudo innecesario.
- Centralización: enviar logs a un agregador (p. ej., Loki/ELK) con retención por entorno.
- Niveles: `debug` (desarrollo), `info` (flujo normal), `warn` (anomalías recuperables), `error` (fallos). Nunca registrar PII o secretos.
- Correlación: propagar `traceId` y `spanId` desde el gateway/middleware a todos los servicios.

TODO: Definir políticas de gestión de logs y manejo centralizado.

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
