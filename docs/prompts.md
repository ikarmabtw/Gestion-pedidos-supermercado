# Registro de prompts e IA - Evaluación 3 (Interfaces de Usuario)

## 1. Herramientas utilizadas
| Herramienta  | Para qué la usamos  |
|--------------|---------------------|
| GitHub Copilot | Generar o editar los archivos dentro de VS Code  |
| Claude         | Refinar el prompt y revisar el código generado  |
| Gemini         | Definir prompts iniciales (borradores)  |

## 2. Método
Los prompts siguen el método RECETA (Clase 7):
- **R - Rol:** define la identidad o la profesión desde la cual la IA debe responder.
- **E - Enfoque:** explica la situación actual, los antecedentes o problema a resolver.
- **C - Claridad en la tarea:** detalla la acción exacta que la IA debe ejecutar.
- **E - Estructura:** especifica el formato de salida deseado.
- **T - Tono:** determina el estilo de comunicación y la personalidad del texto.
- **A - Audiencia:** indica a quién va dirigido el mensaje final.

Además de RECETA, cada prompt incluye una sección de razonamiento paso a paso donde la IA explica sus decisiones antes de entregar el código.

Cómo se aplica RECETA al desarrollo del código:
- E (Enfoque) incluye el stack, la estructura de archivos y los contratos entre módulos.
- C (Claridad) incluye las condiciones numeradas que se pueden verificar una por una.
- E (Estructura) define cómo se entregan los archivos (un bloque por archivo, con su ruta).

Reglas del equipo:

- Un prompt tiene solo una entrada. Un prompt que ya fue registrado no se editará, si se necesita repetir, se crea una entrada nueva (por ejemplo P1-b).
- Cada entrada tiene dos commits: uno con el código tal como lo generó la IA y otro con las correcciones manuales.
- Los resultados y las pruebas se escriben solo después de ejecutarlos de verdad.

## 3. Índice de prompts

| ID  | Hito  | RIU  | Descripción  | Estado | Ejecutado por  | 
|-----|-------|------|--------------|--------|----------------|
| P1  |   2   | 1    | Plantilla base HEAD/BODY/FOOT | [pendiente] | Carlos |
| P2  |   2   | 2    | Login, bloqueo a 3 intentos y modales | [pendiente] |Ivania|
| P3  |   2   | 3, 8, 9, 10 | Perfiles, menús y bloqueo por URL directa | [pendiente] | Matías|


## P1 - Plantilla base HEAD / BODY / FOOT (RIU 1)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** Carlos
- **Hito / RIU:** Hito 2 / RIU 1
- **Origen:** evolución del Prompt 0 de la Evaluación 2 (plantilla de diseño), reescrito para programar.
- **Archivos afectados:** 'css/styles.css', 'js/layout.js', 'index.html', 'views/*.html'

### Prompt completo

```
R - ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), con experiencia en accesibilidad web (WCAG AA) y diseño responsivo para sistemas de comercio electrónico y supermercados.

E - ENFOQUE
Estamos construyendo el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. En la evaluación anterior se diseñaron las interfaces (wireframes y mockups); ahora se programan. Las vistas comparten una plantilla con tres secciones (HEAD, BODY, FOOT) y solo el BODY cambia según el requerimiento. Existen dos perfiles de usuario: admin y user.
- Stack: HTML5, CSS3 y JavaScript puro. Sin frameworks, librerías ni CDN.
- Prohibido CSS o JS embebido: nada de <style>, <script> con código ni atributos onclick.
- Prohibido usar fetch() (el proyecto se abre con doble clic o con Live Server).
- Archivos: index.html en la raíz; css/styles.css; js/layout.js; vistas en views/: dashboard.html, pedidos.html, pedidos-ingresados.html, productos.html, producto-form.html, procesamiento.html.
- Las rutas desde views llevan ../ (por ejemplo ../css/styles.css).
- La ruta base se lee de un atributo data-raiz en <body> ("" en index.html y "../" en views/).
- Contrato de sesión: la sesión se guarda en sessionStorage con la clave "sesion" y la forma {"usuario": "...", "nombre": "...", "perfil": "admin"|"user"}. layout.js solo lee esa clave; el login se programa en otro prompt.
- Colores: azul de marca #0057B8 (HEAD, FOOT, botones primarios, íconos y texto del botón HOME), blanco #FFFFFF (fondo del BODY y texto sobre azul), fondo de campos #CCD8E8, texto principal #1F1F1F, texto secundario y placeholders #595959 (contraste mínimo WCAG AA), rojo #DB0B00 (solo para acciones destructivas, alertas y el botón "Cerrar Sesión"), gris #9E9E9E (texto elementos deshabilitados). 
- Tipografía: Geist, cargada localmente con @font-face desde el archivo assets/fonts/Geist-VariableFont_wght.ttf (fuente variable, usar format("truetype") y font-weight: 100 900). Sin CDN ni Google Fonts, con respaldo sans-serif. Se usan los pesos 400 y 600. Encabezados de 20px, textos de formularios y tablas de 14px y botones de 14px en peso 600.
- Logo: ícono de carrito de compras junto al texto "MERCADO SUR", en blanco sobre el HEAD azul. Usa el archivo assets/img/logo.svg. mediante una etiqueta <img> con atributo alt

C - CLARIDAD EN LA TAREA
Programa la plantilla comun HEAD / BODY / FOOT y aplicala a las 7 vistas. En este prompt construye solo la plantilla: el BODY de cada vista lleva únicamente un titulo y contenedor vacío. No programes login, bloqueo por intentos, control de acceso ni lógica de negocio. Cumple estas condiciones:
1. HEAD
    - Logo de la cadena en la parte superior izquierda y, debajo una barra de menú con <nav aria-label="Menú principal">.
    - La primera opción siempre es HOME.
    - El menú depende del perfil leído de la sesión:
        · sin sesión: solo Home (enlaza a index.html);
        · user: Home, Pedidos, Pedidos Ingresados (RIU 9);
        · admin: Home, Productos, Procesamiento de Pedido (RIU 8).
    - Con sesión, Home enlaza a views/dashboard.html.
    - Con sesión, botón "Cerrar sesión" (id="btn-logout") rojo #DB0B00 conn texto blanco, en la parte superior derecha, siempre visible. Solo se renderiza; su comportamiento se programa en otro prompt.
    - Botones del menú como en el mockup: rectángulos con fondo blanco y texto azul #0057B8 sobre el HEAD azul.
    - La opción de la vista actual lleva aria-current="page".
2. BODY 
    - Es el <main id="contenido"> de cada vista, entre HEAD y FOOT.
    - No modifica ni reemplaza el HEAD ni el FOOT.
3. FOOT 
    - Repite los mismos enlaces del menú del HEAD, según el perfil, como hipervínculos de texto.
    - Incluye copyright de la empresa "© 2026 MERCADO SUR. Todos los derechos reservados.", enlaces a otros sitios de interés y a redes sociales (Facebook, Instagram, LinkedIn).
    - Los enlaces externos llevan target="_blank" y rel="noopener noreferrer".
4. Consistencia
    - HEAD y FOOT se generan una sola vez desde js/layout.js y se inyectan en <header id="app-header"> y <footer id="app-footer">, que cada vista trae vacíos.
    - Lo único propio de cada vista es el contenido de <main>.
    - Cada vista enlaza css/styles.css y js/layout.js con la ruta relativa correcta.
5. Accesibilidad y responsivo
    - Etiquetas semánticas <header>, <nav>, <main>, <footer>; foco visible; constraste mínimo WCAG AA.
    - Diseño responsivo para computador, tablet y móvil (menú que se adaptan en pantallas angostas).
    - Colores y tipografía como variables CSS en :root.

RAZONAMIENTO PASO A PASO 
Antes de escribir código, explica brevemente: (1) cómo calculas la ruta base en cada vista, (2) cómo evitas duplicar HEAD y FOOT, (3) cómo eliges el menú según el perfil. Despues entrega el código.

E - ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, titulado con su ruta: css/styles.css, js/layout.js, index.html y las 6 vistas de views/. Con comentarios en español. Al final agrega: (a) una lista de supuestos que tomaste y (b) una checklist que verifique cada condición de C.

T - TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno.No agregues elementos que no estén justificados por los requerimentos; cuando falte una definición visual, usa soluciones convencionales de sitios de supermercados.

A - AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales de la interfaz son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.

```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correciones manuales
|N°  | Problema  | Archivo  | Correción  | Por qué  |
|----|-----------|----------|------------|----------|
| 1  | | | | |

### Validación 

|Prueba  | Resultado Esperado  | Resultado real  | OK  |
|--------|---------------------|-----------------|-----|
|Abrir index.html sin sesión | Menú solo con Home | | |
|Simular sesión user | Menú con Home, Pedidos, Pedido Ingresado | | |
|Simular sesión admin | Menú con Home, Productos, Procesamiento de Pedido | | |
|Comparar HEAD y FOOT entre dos vistas | Idénticos | | |
|Abrir una vista desde views/ | CSS y JS cargan (sin errores de consola) | | |
|Reducir el ancho de la ventana | Menú se adapta | | |
---

## P2 - Login, bloqueo a 3 intentos y modales (RIU 2)
[Se completa cuando lo ejecuten.]

## P3 - Perfiles, menús y bloqueo por URL directa (RIU 3, 8, 9, 10)
[Se completa cuando lo ejecuten.]

