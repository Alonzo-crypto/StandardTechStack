# Bases de datos

Las bases de datos que se utilizan actualmente en Fibex son Redis, MongoDB, PostgreSQL y MySQL.

## Redis

- Caso de uso recomendado: caché de lectura/escritura, rate limiting, colas ligeras, locks distribuidos.
- Operación: preferir persistencia AOF para durabilidad; configurar expiraciones (TTL) explícitas; usar réplicas y cluster si se requiere alta disponibilidad.
- Buenas prácticas:
  - Diseñar claves con prefijos claros por dominio (p. ej., `auth:sessions:{id}`).
  - Siempre definir TTL en datos temporales para evitar crecimiento no controlado.
  - Usar `pipeline`/`multi` para reducir latencia; considerar Lua para operaciones atómicas complejas.
  - Evitar almacenar PII o cargas grandes; mantener valores pequeños y serializaciones eficientes.

## MongoDB

- Caso de uso recomendado: documentos flexibles, eventos, catálogos, auditorías con esquemas que evolucionan.
- Modelado:
  - Embebido para lecturas locales y alta cohesión; referencias para relaciones N:N o crecimiento ilimitado.
  - Índices compuestos, TTL para datos efímeros, y validación de esquema con JSON Schema.
  - Límite de documento ~16 MB: segmentar anexos/binaries fuera de la colección (p. ej., S3/GridFS cuando sea necesario).
- Operación: replicaset por defecto; sharding solo con evidencia de necesidad; copias de seguridad con `mongodump`/`snapshot`.
- Rendimiento: proyecciones para reducir payload, agregaciones con etapas selectivas tempranas, evitar `$where`.

## PostgreSQL

- Caso de uso recomendado: transaccional fuerte, integridad referencial, reporting, analítica ligera.
- Modelado y rendimiento:
  - Normalización cuidadosa; usar `ENUM`/tablas de referencia para dominios controlados.
  - Índices adecuados (BTREE por defecto; GIN/GiST para JSONB, búsquedas de texto, geoespacial).
  - Particionamiento en tablas muy grandes; mantenimiento con `VACUUM (AUTO)` y `ANALYZE`.
  - Pooling de conexiones (p. ej., PgBouncer) en servicios con alta concurrencia.
- Seguridad: SSL/TLS, mínimos privilegios por rol, cifrado en reposo donde aplique, RLS en multi‑tenant.
- Migraciones: usar la herramienta de migraciones del proyecto; nunca mutar esquemas manualmente en producción.

## MySQL

- Caso de uso recomendado: OLTP, compatibilidad con ecosistemas existentes, cargas de lectura intensiva con réplicas.
- Buenas prácticas:
  - Motor `InnoDB` por defecto; `utf8mb4` para soporte completo de Unicode.
  - Diseño de índices según consultas reales (usar `EXPLAIN` regularmente).
  - Cambios de esquema con ventanas controladas; para tablas grandes, estrategias online (p. ej., herramientas tipo pt‑online‑schema‑change).
- Operación: réplica para escalado de lectura; backups consistentes; monitoreo de slow query log.


## Selección rápida

- Redis: caché, contadores, locks, colas simples.
- MongoDB: documentos flexibles y evolución rápida de esquema.
- PostgreSQL: integridad y transacciones complejas.
- MySQL: OLTP con ecosistema MySQL existente.
