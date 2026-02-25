# Bases de datos

Las bases de datos que se utilizan actualmente en Fibex son Redis, MongoDB, PostgreSQL y MySQL.

## Convenciones y mejores prácticas generales

Las siguientes reglas aplican a **todas** las bases de datos utilizadas en el proyecto:

- **Nomenclatura de columnas y campos en `snake_case`:** todos los nombres de columnas, campos y atributos deben escribirse en `snake_case` (palabras en minúsculas separadas por guion bajo). Ejemplo: `new_clients`, `created_at`, `user_id`.
- **Nombres en inglés:** los identificadores (columnas, tablas, colecciones, índices, claves, etc.) deben estar en **inglés**. Esto garantiza consistencia y facilita la colaboración con herramientas, librerías y equipos internacionales.
- **Nombres descriptivos y sin abreviaturas ambiguas:** usar nombres claros que expresen el propósito del campo. Preferir `invoice_total` sobre `inv_tot` o `total`.
- **Evitar palabras reservadas:** no usar palabras reservadas de SQL u otros motores como nombres de columnas o tablas (p. ej., `order`, `user`, `table`). Si es inevitable, aplicar el escape correspondiente.
- **Consistencia en tipos de datos:** definir el tipo de dato más específico y adecuado para cada campo. Evitar almacenar números como texto o fechas como cadenas.
- **Valores nulos controlados:** documentar y restringir el uso de `NULL`; preferir valores por defecto explícitos cuando tenga sentido.
- **Claves primarias:** definir siempre una clave primaria explícita. Preferir identificadores técnicos (UUID v4/v7 o serial/bigserial) sobre claves naturales cuando los datos puedan cambiar.
- **Auditoría básica:** incluir en todas las tablas/colecciones principales los campos `created_at` y `updated_at` con valores por defecto y actualización automática.
- **Migraciones versionadas:** todos los cambios de esquema deben realizarse a través de migraciones versionadas. Nunca modificar el esquema de producción de forma manual.
- **No almacenar secretos en texto plano:** contraseñas, tokens y datos sensibles deben estar hasheados o cifrados antes de persistirse.

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
