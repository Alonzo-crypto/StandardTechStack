# Documentación del Stack Tecnológico Estándar de FIBEX

Este directorio contiene el stack tecnológico estándar, las convenciones de codificación y las mejores prácticas para todos los nuevos proyectos de desarrollo de software en FIBEX.

----

# FIBEX Standard Technology Stack Documentation

This directory contains the standard technology stack, coding conventions, and best practices for all new software development projects at FIBEX.

## Language Selection / Selección de Idioma

- us [English](./en/README.md)
- 🇪🇸 [Español](./es/README.md)

----

## **Advertencia**

Todavía no está completo es un trabajo en progreso, estos documentos son una referencia en constante evolución. Las tecnologías y estándares descritos en los documentos son de cumplimiento obligatorio. Sin embargo, entendemos que pueden existir adaptaciones necesarias para atender los requerimientos del negocio. Dichas adaptaciones, evoluciones o sugerencias se deben ventilar, discutir y acordar para actualizar los lineamientos y estándares aquí descritos antes de las implementaciones, con mucha frecuencia la arquitectura descrita ya tiene solución a los requerimientos típicos de la empresa, pero no son tan conocidas en general. El objetivo es lograr agilidad con la estandarización y garantizar el mantenimiento y correcto funcionamiento de las plataformas. Cualquier idea o sugerencia en esa dirección será bienvenida.

## **Disclaimer**

This is not complete yet, it is a working process, these documents are a constantly evolving reference. The technologies and standards described herein are mandatory. However, we understand that adaptations may be necessary to meet business requirements. Such adaptations, evolutions, or suggestions should be raised, discussed, and agreed upon to update the guidelines and standards described here before implementation. Frequently, the architecture described already provides solutions to typical company requirements, but these may not be widely known. The goal is to achieve agility through standardization and to ensure the maintenance and proper functioning of the platforms. Any ideas or suggestions in this direction are welcome.



## Scripts

Ver `./scripts/README.md` para más detalles.
See `./scripts/README.md` for further details.

### Inicio rápido (ES)

1. Instalar y combinar documentos:
   - `cd StandardTechStack/scripts`
   - `pnpm i`
   - `pnpm run concat`
     - Salida: `../docs/StandardTechStack-en.md` y `../docs/StandardTechStack-es.md`

2. Servir los documentos localmente (Markdown renderizado a HTML):
   - `cd StandardTechStack/scripts`
   - `pnpm i`
   - `pnpm run serve -- --dir .. --port 5173`
   - Abrir `http://localhost:5173/`

### Quick start (EN)

1. Install and build combined docs:
   - `cd StandardTechStack/scripts`
   - `pnpm i`
   - `pnpm run concat`
     - Outputs: `../docs/StandardTechStack-en.md` and `../docs/StandardTechStack-es.md`

2. Serve docs locally (Markdown rendered as HTML):
   - `cd StandardTechStack/scripts`
   - `pnpm i`
   - `pnpm run serve -- --dir ../docs --port 5173`
   - Open `http://localhost:5173/`

