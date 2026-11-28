# Correcciones de la Evaluación 2 (Diseño de interfaces)

## Observaciones recibidas

| N° | Observación del profesor | Corrección en la Evaluación 3 | Dónde se evidencia | Estado |
|----|--------------------------|-------------------------------|--------------------|--------|
| 1 | El diseño debía incluir más validaciones. | Se programan las validaciones en cada interfaz: login con bloqueo a los 3 intentos y modales de error (RIU 2), validaciones y reglas de negocio de Pedidos (RIU 4), reglas de stock y uso en Productos (RIU 6) y confirmación en el procesamiento de 2 pasos (RIU 7). El plan de pruebas incluye casos negativos y de límite para cada una. | `docs/prompts.md` (casos de prueba), `js/auth.js`, `js/validaciones.js` | En curso: plan de pruebas con casos negativos y de límite aplicado en el P1 (CP09, CP10 y CP11). Login con bloqueo a 3 intentos y modales de error (RIU 2) ya programados y probados en el P2-b (`docs/prompts.md`, CP05 a CP12); siguen pendientes las validaciones de los RIU 4, 6 y 7 |
| 2 | Sin otras observaciones: el resto del diseño fue aprobado. | Se mantiene sin cambios la paleta, la tipografía y la estructura HEAD / BODY / FOOT de los mockups. | CP05 (comparación con el mockup MK_01) en `docs/prompts.md` | Aplicada |

---
