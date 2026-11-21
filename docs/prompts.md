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

|Prueba  | Resultado Esperado  | Resultado Real  | OK  |
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
- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** Matías
- **Hito / RIU:** Hito 2 / RIU 3, RIU 8, RIU 9 y RIU 10
- **Origen:** evolución de la plantilla base del Hito 2, ampliada para incorporar control de acceso basado en roles, segregación de menús y bloqueo por URL directa.
- **Archivos afectados:** 'css/styles.css', 'js/layout.js', 'views/*.html (views/dashboard.html', 'views/productos.html', 'views/producto-form.html', 'views/procesamiento.html', 'views/pedidos.html' y 'views/pedidos-ingresados.html)'.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en seguridad en el cliente (control de acceso basado en roles), accesibilidad web (WCAG AA) y arquitectura modular sin dependencias externas para sistemas de gestión empresarial y supermercados.

E – ENFOQUE
Continuamos con el desarrollo del Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. En la etapa anterior se construyó la plantilla base (HEAD / BODY / FOOT) y su inyección dinámica mediante js/layout.js. Ahora debemos implementar formalmente la segregación de perfiles (admin y user), la renderización estricta de menús según el rol activo y la protección activa contra acceso cruzado o navegación no autenticada mediante URL directa.

- Stack: HTML5, CSS3 y JavaScript puro. Prohibido usar frameworks, librerías externas o CDN.
- Restricciones técnicas: Prohibido CSS o JS embebido (nada de <style>, <script> con código en línea ni atributos onclick). Prohibido usar fetch() (el proyecto se ejecuta abriendo los archivos directamente en el navegador o mediante Live Server).
- Archivos: index.html en la raíz; css/styles.css; js/layout.js; Vistas en views/: dashboard.html, pedidos.html, pedidos-ingresados.html, productos.html, producto-form.html, procesamiento.html.
- Las rutas desde views llevan ../ (por ejemplo ../css/styles.css).
- La ruta base se lee de un atributo data-raiz en <body> ("" en index.html y "../" en views/).
- Contrato de sesión: la sesión se guarda en sessionStorage con la clave "sesion" y la forma {"usuario": "...", "nombre": "...", "perfil": "admin"|"user"}. layout.js solo lee esa clave; el login se programa en otro prompt.
- Matriz de permisos por perfil (Contrato de Rutas): Sin sesión activa: Solo puede acceder a index.html. Cualquier intento de abrir una ruta dentro de views/ redirige inmediatamente a ../index.html. Perfil user (RIU 9): Acceso permitido únicamente a views/dashboard.html (Home), views/pedidos.html (Pedidos) y views/pedidos-ingresados.html (Pedidos Ingresados). Perfil admin (RIU 8): Acceso permitido únicamente a views/dashboard.html (Home), views/productos.html (Productos), views/producto-form.html (Formulario de producto) y views/procesamiento.html (Procesamiento de Pedido).
- Sistema de Diseño (tokens existentes): Azul corporativo #0057B8 (HEAD, FOOT, botones primarios), blanco #FFFFFF (fondo de BODY y texto sobre azul), celeste claro #CCD8E8 (fondo de modales e inputs), texto principal #1F1F1F, rojo #DB0B00 (botón Cerrar sesión, alertas y botón Volver en modales). Tipografía local Geist (assets/fonts/Geist-VariableFont_wght.ttf) con respaldo sans-serif.

C - CLARIDAD EN LA TAREA
Programa el control de perfiles, el renderizado dinámico de menús en cabecera y pie de página, el cierre de sesión y el bloqueo de acceso cruzado por URL directa. No programes aún el formulario de login ni los formularios de negocio de pedidos o productos. Cumple estrictamente estas condiciones verificables:

1.	Segregación de Menús en HEAD y FOOT (RIU 3, 8 y 9):
- Al cargar cualquier vista, js/layout.js lee sessionStorage.getItem("sesion").
- Si el perfil es "user", renderiza en el <nav aria-label="Menú principal"> y en los hipervínculos del FOOT exclusivamente: Home (dashboard.html), Pedidos (pedidos.html) y Pedidos Ingresados (pedidos-ingresados.html).
- Si el perfil es "admin", renderiza exclusivamente: Home (dashboard.html), Productos (productos.html) y Procesamiento de Pedido (procesamiento.html).
- El enlace correspondiente a la vista actual recibe el atributo aria-current="page" y una clase visual activa diferenciada.

2.	Dashboard de Bienvenida por Perfil (RIU 2 y 3):
- En views/dashboard.html, al detectar sesión válida, inyecta en el <main id="contenido"> el saludo en color azul #0057B8: "Bienvenido, [NOMBRE DEL USUARIO]".

3.	Control de Acceso Cruzado por URL Directa (RIU 10):
- Si un usuario autenticado con perfil "user" intenta abrir manualmente por URL views/productos.html, views/producto-form.html o views/procesamiento.html (o viceversa, un "admin" intenta abrir views/pedidos.html o views/pedidos-ingresados.html), js/auth-guard.js debe interceptar la carga antes de mostrar el contenido de <main>.
- El sistema oculta/vacía el contenido de <main id="contenido"> y despliega un diálogo modal centrado con fondo celeste claro #CCD8E8, borde superior o acento rojo #DB0B00, accesible (role="alertdialog", aria-modal="true"), con el mensaje exacto: "No tiene permisos para acceder a esta sección" y un único botón rojo #DB0B00 con texto blanco "Volver".
- Al hacer clic en "Volver" (o presionar Escape), redirige automáticamente a dashboard.html correspondiente a su perfil.

4.	Protección de Rutas sin Sesión:
- Si no existe la clave "sesion" en sessionStorage (o el JSON es inválido) y se intenta abrir cualquier vista dentro de views/, se redirige de inmediato a ../index.html sin renderizar el cuerpo de la página.

5.	Funcionalidad del Botón Cerrar Sesión (RIU 2):
- En todas las vistas autenticadas, el botón Cerrar sesión (id="btn-logout", fondo rojo #DB0B00, texto blanco #FFFFFF) ubicado en la esquina superior derecha del HEAD elimina "sesion" de sessionStorage mediante sessionStorage.removeItem("sesion") y redirige a index.html (respetando data-raiz).

6.	Accesibilidad y Diseño Responsivo:
- El modal de acceso denegado (RIU 10) debe atrapar el foco del teclado en el botón "Volver" al abrirse y cumplir contraste mínimo WCAG AA (#1F1F1F sobre #CCD8E8 y #FFFFFF sobre #DB0B00).

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:

1.	Cómo organizas el mapa de permisos por ruta y perfil para evitar condicionales repetidos en cada HTML.
2.	En qué orden exacto se ejecuta layout.js al cargar una vista para garantizar que nunca se filtre contenido no autorizado antes de mostrar el modal del RIU 10.
3.	Cómo manejas la resolución de rutas relativas ("" vs "../") tanto en redirecciones como en los enlaces dinámicos del menú y del footer.
Después de esta explicación, entrega el código.

E - ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta: css/styles.css (solo las reglas nuevas o actualizadas para estados activos del menú, tarjeta de dashboard y modal de acceso denegado); js/layout.js; views/dashboard.html (y un ejemplo representativo de vista protegida como views/productos.html mostrando cómo se vinculan ambos scripts).
Incluye comentarios claros en español dentro del código. Al final agrega:

- (a) Una lista breve de supuestos técnicos tomados (por ejemplo, cómo probar ambos perfiles manualmente desde la consola del navegador antes de conectar el login).
- (b) Una checklist de verificación que compruebe el cumplimiento de cada una de las 6 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos que no estén justificados por los requerimentos; cuando falte una definición visual, usa soluciones convencionales de sitios de supermercados.

A – AUDIENCIA
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

|Prueba  | Resultado Esperado  | Resultado Real  | OK  |
|--------|---------------------|-----------------|-----|
| Abrir una vista de `views/` sin sesión en `sessionStorage` | Redirección inmediata a `../index.html` sin mostrar contenido |  |  |
| Simular sesión `user` en `views/dashboard.html` | Menú con Home, Pedidos, Pedidos Ingresados |  |  |
| Simular sesión `admin` en `views/dashboard.html` | Menú con Home, Productos, Procesamiento de Pedido |  |  |
| Abrir `views/productos.html` por URL con sesión `user` | Contenido oculto |  |  |
| Abrir `views/pedidos.html` por URL con sesión `admin` | Contenido oculto |  |  |
| Presionar el botón "Cerrar sesión" | Elimina `"sesion"` de `sessionStorage` y redirige a `index.html` |  |  |
---
