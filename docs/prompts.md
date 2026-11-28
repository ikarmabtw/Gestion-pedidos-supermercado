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
| P1  |   2   | 1    | Plantilla base HEAD/BODY/FOOT | Completado | Carlos |
| P2  |   2   | 2    | Login, bloqueo a 3 intentos y modales | Reemplazado por P2-b |Ivania|
| P2-b|   2   | 2    | Login, bloqueo a 3 intentos y modales| Completado | Carlos|
| P3  |   2   | 3, 8, 9, 10 | Perfiles, menús y bloqueo por URL directa | [pendiente] | Matías|


## P1 - Plantilla base HEAD / BODY / FOOT (RIU 1)

- **Fecha:** 27-11-2026
- **Herramienta:** Copilot + Claude + correcciones manuales
- **Ejecutado por:** Carlos
- **Hito / RIU:** Hito 2 / RIU 1
- **Origen:** evolución del Prompt 0 de la Evaluación 2 (plantilla de diseño), reescrito para programar.
- **Archivos afectados:** 'css/styles.css', 'js/layout.js', 'index.html', 'views/*.html', assets/img/(logo e iconos). assets/fonts/

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
La IA entregó css/styles.css, js/layout.js, index.html y las 6 vistas de views/. HEAD y FOOT se generan una sola vez desde layout.js y se integran en <header id="app-header"> y <footer id="app-footer">, el menú cambia según el perfil guardado en sessionStorage y la opción de la vista actual lleva a aria=current="page".

### Problemas detectados al probarlo
- El texto "MERCADO SUR" aparecía duplicado junto al logo.
- La IA agrego enlaces que no estaban en el prompt ("Sitio del Gobierno" y "FAO").
- El logo no se veía, quedó de un tamaño de ícono cuadrado y durante la corrección, se borró por error la regla que daba el fondo azul al HEAD.
- Las redes sociales salían como texto y el FOOT salía blanco, distinto de lo definido en MOCKUPS.
- Al agregar íconos, el FOOT dejó de dibujarse por una variable inexistente.
- El espacio entre los íconos de redes no cambiaba, y el menú y los íconos no quedaban alineados como en el mockup

### Correciones manuales
|N°  | Problema  | Archivo  | Correción  | Por qué  |
|----|-----------|----------|------------|----------|
| 1  |La IA puso el texto "MERCADO SUR" al lado del logo, y el SVG ya lo incluye (se veía duplicado)|js/layout.js | Se elimino el texto y solo se dejo la imagen con "Mercado Sur" | Evitar duplicar el nombre de la marca|
| 2  |La IA agregó enlaces que no estaban en el prompt|js/layout.js| Se eliminaron, quedan solo las redes sociales definidas| No inventar contenido fuera de requerimiento y se busca alineación con trabajo anterior|
| 3  |El color del foco (#FFBF47) no pertenece a la paleta| css/styles.css| Foco con el azul de marca, y blanco sobre HEAD y FOOT.| Respetar la paleta definida en Evaluación 2 y el contraste mínimo|
| 4  |Tamaños y fuente repetidos en varias reglas| css/styles.css| Variables --tam-- titul, --tam-- texto y --fuente en :root| Mantener los valores en un solo lugar|
| 5  |En celular el menú generaba scroll horizontal| css/styles.css| flex-wrap: wrap en las listas del menú| Evitar desborde horizontal|
| 6  |El logo se dimensionó como icono cuadrado y quedaba diminuto|css/stlyes.css| Ancho de 150px (120 px en celulares) con alto automático|El SVG del logo es horizontal|
| 7  |Al corregir el CSS se borró por error la regla .app-header, el HEAD quedó sin fondo azul y el logo blanco se volvió invisible| css/styles.css|Se restauró el fondo azul y el color blanco|El logo es blanco y necesita el HEAD azul|
| 8  |Las redes sociales salían como texto y se usan íconos| js/layout.js , assets/img/| Ícono SVG blancos como imágenes con atributo alt| Coincidir con el diseño|
| 9  | El FOOT era blanco con enlaces azules; el mockup es azul con texto blanco y tres columnas| css/styles.css|Fondo azul, enlaces balncos y grilla de 3 columnas (menú, copyright, redes)|Coherencia con diseño|
| 10 |El FOOT no se dibujaba: el atributo alt usaba una variable que no existía (red)| js/layout.js| Se corrigió para usar la variable del ciclo (elemento)| Un error de JavaScript detenía el resto del código|
| 11 | El gap entre íconos no cambiaba porque .enlaces-footer ul lo pisaba| css/styles.css| Selector .enlaces-footer, .redes-sociales con gap definitivo|Peso del selector mayor al orden en el archivo|
| 12 | El menú quedaba a 24px del borde y el logo a 64px, los íconos quedaban pegados al copyright|css/styles.css|Mismo margen de 64px en HEAD y menú, justify-self: end en las redes| Alinear con diseño previo|
| 13 |El menú decia "HOME" en mayúsculas y se definio como "Home"| js/layout.js| Texto cambiado a "Home"|Coincidir con diseño previo|

### Validación

Las capturas de cada prueba están guardadas en la carpeta `docs/evidencias/`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Verificación | Positivo | 1 | HEAD y FOOT idénticos en las 7 vistas | Idénticos; el HEAD y el FOOT salen de un solo archivo | Las 7 vistas cargan el mismo `js/layout.js` (1 coincidencia por archivo en la búsqueda). En las capturas de 6 vistas, el HEAD (logo, menú, botón Cerrar sesión) y el FOOT (menú, copyright, íconos) tienen la misma estructura y estilo; solo cambian las opciones del menú según el perfil. capturas en docs/evidencias/| Sí |
| CP02 | Verificación | Positivo | 1 | Sin CSS ni JS embebido (búsqueda de `<style`, `onclick`, `style="` y scripts con código) | 0 resultados en los `.html` | La búsqueda dio 0 resultados en los archivos `.html`: no hay CSS ni JS embebido. | Sí |
| CP03 | Verificación | Positivo | 1 | Sin errores en la consola, 7 vistas y 3 sesiones | Ningún mensaje rojo | La consola del navegador no muestra errores. | Sí |
| CP04 | Verificación | Positivo | 1 | Recursos cargan desde `views/` (pestaña Network) | Logo, íconos, CSS, JS y fuente en estado 200 | Todos los recursos cargan correctamente desde `views/`. | Sí |
| CP05 | Validación | Positivo | 1 | Comparación con el mockup `MK_01` | Logo arriba, Home debajo, footer con menú, copyright e íconos a la derecha, mismos colores | La página coincide con el mockup `MK_01`: logo arriba, Home debajo, footer con menú, copyright e íconos a la derecha, con los mismos colores. | Sí |
| CP06 | Validación | Positivo | 9 | Menú con sesión `user` | Home, Pedidos, Pedidos Ingresados y botón Cerrar sesión | El menú muestra Home, Pedidos y Pedidos Ingresados; botón rojo Cerrar sesión arriba a la derecha. | Sí |
| CP07 | Validación | Positivo | 8 | Menú con sesión `admin` | Home, Productos, Procesamiento de Pedido y botón Cerrar sesión | El menú muestra Home, Productos y Procesamiento de Pedido; botón rojo Cerrar sesión arriba a la derecha. | Sí |
| CP08 | Validación | Positivo | 1 | Menú sin sesión | Solo Home y sin botón Cerrar sesión | Solo aparece Home y no hay botón Cerrar sesión. | Sí |
| CP09 | Validación | Negativo | 8 y 9 | Cada perfil no ve opciones del otro (HEAD y FOOT) | Sin opciones cruzadas | Con `user` no aparecen Productos ni Procesamiento de Pedido; con `admin` no aparecen Pedidos ni Pedidos Ingresados, ni en el HEAD ni en el FOOT. | Sí |
| CP10 | Verificación | Negativo | 1 | Sesión corrupta (`"esto no es json"`) y perfil inválido (`{"perfil":"superadmin"}`) | La página no se rompe y se ve como sin sesión | La página no se rompió con la sesión corrupta ni con el perfil inválido. | Sí |
| CP11 | Validación | Límite | 1 | Anchos de 1920, 768, 375, 320, 701 y 700 px | Sin scroll horizontal, menú que se acomoda y FOOT en una columna en móvil | No aparece scroll horizontal en los anchos probados; el menú se acomoda y en móvil el FOOT pasa a una sola columna. | Sí |
| CP12 | Validación | Positivo | 1 | Foco visible al navegar con `Tab` | Borde blanco visible en HEAD y FOOT | Al navegar con `Tab` se ve el borde de foco blanco en el HEAD y el FOOT. | Sí |
---

## P2 - Login, bloqueo a 3 intentos y modales (RIU 2)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** Ivania
- **Hito / RIU:** Hito 2 / RIU 2
- **Origen:** prompt nuevo, parte de la plantilla base del P1 (`js/layout.js` y `css/styles.css`).
- **Archivos afectados:** `index.html`, `js/auth.js`, `css/styles.css`

### Prompt completo

```
R - ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), con experiencia en usabilidad, accesibilidad web (WCAG AA) y flujos de autenticación en el cliente para sistemas de gestión empresarial y supermercados.

E - ENFOQUE
Estamos construyendo el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Ya existe la plantilla base HEAD / BODY / FOOT (js/layout.js y css/styles.css). Según el RIU 2, la vista Index o Home es un control de acceso mediante la funcionalidad Login, con un formulario que contiene:
- Usuario: campo alfanumérico.
- Contraseña: campo alfanumérico.
- Botón Ingresar: botón para validar el ingreso de datos en los campos usuario y contraseña.

Acciones del RIU 2:
- El usuario deberá completar el formulario de Login y acceder con sus credenciales para poder ingresar al sistema.
- En caso de no existir el usuario, el sistema deberá indicar al usuario que no existe en la base de datos del sistema.
- En caso de fallar 3 veces, se bloqueará informando al usuario a través de un mensaje tipo modal.
- Una vez logueado exitosamente, se debe cargar una vista tipo dashboard (views/dashboard.html), donde el BODY muestre el saludo de bienvenida y cargue las opciones del menú según el perfil, manteniendo el botón de cerrar sesión visible arriba a la derecha.
- Cuando el usuario haga clic en el botón cerrar sesión, debe volver a cargar la vista Index o Home inicial con el formulario detallado anteriormente.

Restricciones y stack:
- Stack: HTML5, CSS3 y JavaScript puro. Sin frameworks, librerías externas ni CDN.
- Prohibido CSS o JS embebido: nada de <style>, <script> con código en línea ni atributos onclick.
- Prohibido usar fetch() (el proyecto se abre con doble clic o con Live Server).
- Archivos: index.html en la raíz; css/styles.css; js/layout.js (ya existe, no lo reescribas); js/auth.js (a crear); destino al autenticar: views/dashboard.html.
- La ruta base se lee del atributo data-raiz en <body> ("" en index.html y "../" en views/).
- Contrato de sesión: al iniciar sesión con éxito, guardar en sessionStorage con la clave "sesion" el objeto {"usuario": "...", "nombre": "...", "perfil": "admin"|"user"} y redirigir a views/dashboard.html.
- Base de usuarios local: sin backend ni fetch(), define en js/auth.js un arreglo comentado con exactamente estos usuarios de prueba: usuario "admin", contraseña "admin1234", nombre "Administrador Mercado Sur", perfil "admin"; usuario "user", contraseña "user1234", nombre "User Mercado Sur", perfil "user". Son solo datos de prueba académicos.
- Seguridad básica: los mensajes y nombres se insertan con textContent, nunca con innerHTML. Los mensajes no exponen información sensible más allá de lo que pide el RIU 2.
- Colores y tipografía: usa las variables CSS ya definidas en :root; no declares colores nuevos. Valores de referencia: azul #0057B8 (botón Ingresar y títulos), blanco #FFFFFF, fondo de campos y modales #CCD8E8, bordes #E5E5E5, texto principal #1F1F1F, texto secundario y placeholders #595959, rojo #DB0B00 (alertas, errores y bloqueo), gris #9E9E9E (elementos deshabilitados). Tipografía Geist local con respaldo sans-serif.

C - CLARIDAD EN LA TAREA
Programa el formulario de login en index.html, la validación, el conteo de intentos y el bloqueo a 3 fallos en js/auth.js, los modales del flujo y los estilos necesarios en css/styles.css. No programes el control de acceso por URL directa en views/ (RIU 10) ni la segregación de menús por perfil en rutas internas: eso corresponde a otro prompt. Cumple estas condiciones:
1. Formulario de Login en index.html (RIU 2)
    - Dentro de <main id="contenido"> muestra el formulario con campos Usuario y Contraseña, cada uno con su <label> explícito, placeholders en #595959 y fondo #CCD8E8.
    - El botón principal "Ingresar" va en #0057B8 con texto #FFFFFF.
    - Si al abrir index.html ya existe una sesión válida en sessionStorage, redirige a views/dashboard.html sin mostrar el formulario.
2. Validación de credenciales y usuario inexistente (RIU 2)
    - Al enviar el formulario, valida los datos contra la lista local de usuarios.
    - Si el usuario no existe, informa que no existe en la base de datos del sistema, con mensaje accesible o modal.
    - Si el usuario existe pero la contraseña no coincide, informa el error de credenciales e indica los intentos restantes.
    - Si las credenciales son correctas y no hay bloqueo, reinicia el contador de fallos, guarda "sesion" con {"usuario", "nombre", "perfil"} y redirige a views/dashboard.html.
3. Intentos fallidos y bloqueo a los 3 intentos (RIU 2)
    - Registra los fallos en sessionStorage con la clave "intentos_login". El contador es único por pestaña y no distingue usuario.
    - Al tercer fallo, bloquea el acceso en la sesión actual: deshabilita campos y botón con estilo deshabilitado (#9E9E9E) y muestra un modal informando el bloqueo por 3 intentos fallidos.
    - Si se recarga la página estando bloqueado, el formulario sigue deshabilitado.
4. Cierre de sesión (RIU 2)
    - El botón #btn-logout del HEAD (ya renderizado por layout.js) elimina "sesion" con sessionStorage.removeItem("sesion") y redirige a index.html respetando data-raiz.
    - Este comportamiento se programa en js/auth.js, que debe poder cargarse en las vistas de views/ además de index.html.
5. Modales del flujo de login (RIU 2)
    - Modales accesibles (role="dialog" o role="alertdialog", aria-modal="true", título, mensaje y botón de cierre) con fondo #CCD8E8, texto #1F1F1F y acento #DB0B00 para error o bloqueo, y #0057B8 para avisos.
    - Usa nombres de clase genéricos y reutilizables (por ejemplo .modal, .modal__titulo, .modal__acciones) para que otros prompts los reutilicen.
    - Al abrir un modal, mueve el foco a su botón de acción. Se cierra con el botón o con Escape, salvo el modal de bloqueo, que debe mantener visible el estado de bloqueo.
6. Accesibilidad y responsivo
    - Etiquetas semánticas, foco visible (:focus-visible) y contraste mínimo WCAG AA.
    - Diseño centrado y adaptable en computador, tablet y móvil, sin desbordamiento horizontal.

RAZONAMIENTO PASO A PASO
Antes de escribir código, explica brevemente en una lista numerada:
1. Cómo distingues usuario inexistente de contraseña incorrecta y cómo guardas "sesion" e "intentos_login" en sessionStorage sin usar fetch().
2. Cómo aplicas el bloqueo al tercer fallo y cómo lo mantienes si se recarga la página.
3. Cómo construyes y controlas los modales (apertura, cierre, Escape y foco) sin atributos onclick.
4. Cómo haces que auth.js sirva tanto en index.html como en views/ sin errores cuando faltan elementos del formulario.
Después de esta explicación, entrega el código.

E - ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, titulado con su ruta exacta: index.html; js/auth.js; css/styles.css (solo las reglas nuevas o actualizadas para el formulario de login, estados deshabilitados y modales). No incluyas js/layout.js. Con comentarios en español. Al final agrega: (a) una lista de supuestos técnicos (usuarios de prueba, comportamiento al recargar bloqueado y cómo limpiar sessionStorage para probar); (b) una checklist que verifique cada una de las 6 condiciones de C.

T - TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos que no estén justificados por los requerimientos; cuando falte una definición visual, usa soluciones convencionales de sitios de supermercados.

A - AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales de la interfaz son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

## P2-b - Login, bloqueo a 3 intentos y modales (RIU 2), versión corregida

- **Fecha:** 27-11-2026
- **Herramienta:** Copilot + Claude + correciones manuales
- **Ejecutado por:** Carlos
- **Hito / RIU:** Hito 2 / RIU 2
- **Origen:** corrección del P2, que no se ejecutó. Se alinea con los mockups MK_01 (login), MK_02 (usuario inexistente) y MK_03 (cuenta bloqueada), y agrega las validaciones pedidas en la Evaluación 2.
- **Cambios respecto al P2:** (1) se agrega `auth.js` a las 7 páginas, porque el cierre de sesión debe funcionar en `views/`; (2) íconos en los campos y botón para ver la contraseña, como en MK_01; (3) textos de los modales tomados de MK_02 y MK_03; (4) modal para contraseña incorrecta; (5) validación de campos vacíos y de caracteres, que no cuenta como intento; (6) manejo de `sessionStorage` corrupto; (7) aclaración de qué pasa al cerrar el modal de bloqueo.
- **Archivos afectados:** `index.html`, `js/auth.js`, `css/styles.css`, `assets/img/` (usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, alerta.svg) y `views/*.html` (solo la etiqueta `<script>` de `auth.js`).

### Prompt completo

```
R - ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), con experiencia en usabilidad, accesibilidad web (WCAG AA) y flujos de autenticación en el cliente para sistemas de gestión empresarial y supermercados.

E - ENFOQUE
Estamos construyendo el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Ya existe la plantilla base HEAD / BODY / FOOT (js/layout.js y css/styles.css), que genera el HEAD y el FOOT una sola vez y los inyecta en <header id="app-header"> y <footer id="app-footer">. Según el RIU 2, la vista Index o Home es un control de acceso mediante la funcionalidad Login, con un formulario que contiene:
- Usuario: campo alfanumérico.
- Contraseña: campo alfanumérico.
- Botón Ingresar: botón para validar el ingreso de datos en los campos usuario y contraseña.

Acciones del RIU 2:
- El usuario deberá completar el formulario de Login y acceder con sus credenciales para poder ingresar al sistema.
- En caso de no existir el usuario, el sistema deberá indicar al usuario que no existe en la base de datos del sistema.
- En caso de fallar 3 veces, se bloqueará informando al usuario a través de un mensaje tipo modal.
- Una vez logueado exitosamente, se carga views/dashboard.html (su contenido y el saludo se programan en otro prompt).
- Cuando el usuario haga clic en el botón cerrar sesión, debe volver a cargar la vista Index o Home inicial con el formulario de login.

Diseño de referencia (mockups aprobados en la Evaluación 2):
- MK_01: título "Iniciar sesión", texto "* Campos obligatorios", campos "Usuario *" y "Contraseña *" con ícono a la izquierda (persona y llave) y, en la contraseña, un ícono de ojo a la derecha para mostrarla u ocultarla; botón "Ingresar" de ancho completo del formulario; formulario centrado en el BODY.
- MK_02: modal centrado con ícono de alerta rojo, título "Usuario inexistente", mensaje "No existe el usuario en la base de datos." y botón rojo "Volver" alineado a la derecha. Detrás, la pantalla se oscurece con una capa gris semitransparente.
- MK_03: mismo modal con título "Cuenta bloqueada" y mensaje "Su cuenta ha sido bloqueada por seguridad. Comuníquese con soporte.", con el formulario deshabilitado detrás.

Restricciones y stack:
- Stack: HTML5, CSS3 y JavaScript puro. Sin frameworks, librerías externas ni CDN.
- Prohibido CSS o JS embebido: nada de <style>, <script> con código en línea, atributos style="" ni onclick.
- Prohibido usar fetch() (el proyecto se abre con doble clic o con Live Server).
- Archivos: index.html en la raíz; css/styles.css (ya existe); js/layout.js (ya existe, NO lo modifiques ni lo reescribas); js/auth.js (ya existe vacío, debes programarlo); destino al autenticar: views/dashboard.html.
- La ruta base se lee del atributo data-raiz en <body> ("" en index.html y "../" en views/).
- Contrato de sesión: al iniciar sesión con éxito, guardar en sessionStorage con la clave "sesion" el objeto {"usuario": "...", "nombre": "...", "perfil": "admin"|"user"} y redirigir a views/dashboard.html. layout.js lee esa clave para armar el menú.
- Base de usuarios local: sin backend ni fetch(), define en js/auth.js un arreglo comentado con exactamente estos usuarios de prueba: usuario "admin", contraseña "admin1234", nombre "Administrador Mercado Sur", perfil "admin"; usuario "user", contraseña "user1234", nombre "User Mercado Sur", perfil "user". Son solo datos de prueba académicos.
- Seguridad básica: los mensajes y nombres se insertan con textContent, nunca con innerHTML. Los mensajes no exponen información sensible más allá de lo que pide el RIU 2. Nunca se guarda la contraseña en sessionStorage.
- Colores y tipografía: usa las variables CSS ya definidas en :root (--azul-marca, --blanco, --campo, --texto-principal, --texto-secundario, --rojo, --gris-deshabilitado, --fuente, --tam-titulo, --tam-texto); no declares colores nuevos. Valores de referencia: azul #0057B8 (botón Ingresar, títulos e íconos), blanco #FFFFFF, fondo de campos y modales #CCD8E8, texto principal #1F1F1F, texto secundario y placeholders #595959, rojo #DB0B00 (alertas, errores y bloqueo), gris #9E9E9E (elementos deshabilitados). Excepción única: la capa que oscurece la pantalla detrás del modal puede ser una versión semitransparente de #1F1F1F. Tipografía Geist local con respaldo sans-serif.

C - CLARIDAD EN LA TAREA
Programa el formulario de login en index.html, la validación, el conteo de intentos y el bloqueo a 3 fallos en js/auth.js, los modales del flujo, los íconos y los estilos necesarios en css/styles.css. No programes el control de acceso por URL directa en views/ (RIU 10), ni el contenido o saludo del dashboard, ni la segregación de menús por perfil: eso corresponde a otro prompt. Cumple estas condiciones:

1. Formulario de Login en index.html (RIU 2, MK_01)
    - Dentro de <main id="contenido"> reemplaza el título "Inicio" y el contenedor vacío por: <h1> "Iniciar sesión", el texto "* Campos obligatorios" y un <form id="form-login" novalidate> centrado, de ancho máximo aproximado 320px.
    - Campo "Usuario *" y campo "Contraseña *", cada uno con su <label for> explícito, ids "usuario" y "clave", placeholders "Usuario" y "Contraseña" en #595959, fondo #CCD8E8 y atributos autocomplete="username" y autocomplete="current-password". Máximo 20 caracteres en usuario y 30 en contraseña (maxlength).
    - Íconos: dentro del campo Usuario, a la izquierda, assets/img/usuario.svg; dentro del campo Contraseña, a la izquierda, assets/img/llave.svg; ambos como <img alt="" aria-hidden="true"> en azul #0057B8.
    - Botón para ver la contraseña: <button type="button" id="btn-ver-clave"> dentro del campo Contraseña, a la derecha, con assets/img/ojo.svg. Con aria-label="Mostrar contraseña" y aria-pressed="false". Al activarlo (clic o teclado) el campo cambia entre type="password" y type="text", cambia el ícono a assets/img/ojo-oculto.svg y el aria-label a "Ocultar contraseña".
    - Botón principal <button type="submit"> "Ingresar" de ancho completo del formulario, fondo #0057B8, texto #FFFFFF, peso 600.
    - Si al abrir index.html ya existe una sesión válida en sessionStorage (JSON válido y perfil "admin" o "user"), redirige a views/dashboard.html con location.replace, sin mostrar el formulario.
    - Si "sesion" no es un JSON válido o tiene un perfil distinto de "admin" o "user", se trata como sin sesión: se muestra el formulario y no se produce ningún error en consola.

2. Validación de campos antes de revisar credenciales (RIU 2)
    - Si Usuario o Contraseña están vacíos, muestra bajo el campo vacío un mensaje en línea en #DB0B00 ("Ingrese su usuario." o "Ingrese su contraseña."), con aria-invalid="true" en el campo y el mensaje asociado por aria-describedby, y devuelve el foco al primer campo con error.
    - Si hay caracteres que no sean letras ni números (A-Z, a-z, 0-9), muestra bajo el campo el mensaje "Solo se permiten letras y números."
    - Estos errores de formato NO cuentan como intento fallido y NO consultan la lista de usuarios.
    - Los mensajes en línea se limpian cuando el usuario vuelve a escribir en el campo.

3. Validación de credenciales (RIU 2)
    - Con campos válidos, comprueba contra la lista local de usuarios.
    - Si el usuario no existe: cuenta un intento fallido y abre el modal de error con el título "Usuario inexistente" y el mensaje "No existe el usuario en la base de datos." (MK_02).
    - Si el usuario existe pero la contraseña no coincide: cuenta un intento fallido y abre el modal de error con el título "Credenciales incorrectas" y el mensaje "La contraseña no es correcta. Intentos restantes: N." (N = 3 menos los fallos acumulados).
    - Si las credenciales son correctas y no hay bloqueo: reinicia el contador (elimina "intentos_login"), guarda "sesion" con {"usuario", "nombre", "perfil"} y redirige a views/dashboard.html.
    - Al cerrar un modal de error, el campo Contraseña se vacía y el foco vuelve al campo Usuario.

4. Intentos fallidos y bloqueo a los 3 intentos (RIU 2, MK_03)
    - Registra los fallos en sessionStorage con la clave "intentos_login" (número entero). El contador es único por pestaña y no distingue usuario.
    - Si "intentos_login" no existe, no es un número o es negativo, se interpreta como 0, sin errores. Si vale 3 o más, se interpreta como bloqueado.
    - Al tercer fallo, bloquea el acceso en la sesión actual: deshabilita los dos campos, el botón de ver contraseña y el botón Ingresar con estilo deshabilitado (#9E9E9E), y abre SOLO el modal "Cuenta bloqueada" con el mensaje "Su cuenta ha sido bloqueada por seguridad. Comuníquese con soporte." (no se muestra además el modal de error del tercer intento).
    - Si se recarga la página estando bloqueado, el formulario sigue deshabilitado y el modal "Cuenta bloqueada" se vuelve a mostrar al cargar.
    - Con el formulario bloqueado no se puede enviar, ni siquiera presionando Enter.
    - Un login correcto antes del tercer fallo reinicia el contador.

5. Cierre de sesión (RIU 2)
    - El botón #btn-logout del HEAD (ya renderizado por layout.js solo cuando hay sesión) elimina "sesion" con sessionStorage.removeItem("sesion") y redirige a index.html respetando data-raiz (location.href = raiz + "index.html").
    - Este comportamiento se programa en js/auth.js, que debe cargarse en las 7 páginas (index.html y las 6 vistas de views/), SIEMPRE después de layout.js, porque layout.js crea el botón. En index.html la etiqueta es <script src="js/auth.js"></script> y en views/ es <script src="../js/auth.js"></script>.
    - Cierra la sesión sin tocar "intentos_login".
    - auth.js debe comprobar que cada elemento exista antes de usarlo (el formulario y sus campos solo existen en index.html; #btn-logout solo existe con sesión), para no generar errores en consola en las vistas de views/.

6. Modales del flujo de login (RIU 2, MK_02 y MK_03)
    - Una sola función reutilizable en auth.js que construye el modal con createElement y textContent, con parámetros: tipo ("error" o "aviso"), título, mensaje, texto del botón y si se puede cerrar con Escape.
    - Estructura: capa oscura que cubre toda la pantalla (incluidos HEAD y FOOT) y, centrado, un <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby aria-describedby> con ícono assets/img/alerta.svg (rojo #DB0B00, alt=""), título <h2 class="modal__titulo">, mensaje <p class="modal__mensaje"> y un contenedor <div class="modal__acciones"> con un único botón rojo #DB0B00, texto blanco, "Volver", alineado a la derecha.
    - Fondo del modal #CCD8E8, texto #1F1F1F, esquinas redondeadas. Variante .modal--error con acento #DB0B00 y variante .modal--aviso con acento #0057B8 (queda disponible para otros prompts).
    - Usa nombres de clase genéricos y reutilizables (.modal, .modal__titulo, .modal__mensaje, .modal__acciones, .modal--error, .modal--aviso, .modal-capa) para que otros prompts los reutilicen.
    - Al abrir un modal, mueve el foco a su botón "Volver". Mientras está abierto, el foco no puede salir del modal (como tiene un solo botón, Tab se queda en él).
    - Se cierra con el botón "Volver" o con Escape, EXCEPTO el modal de bloqueo: ese no se cierra con Escape; solo con "Volver". Al cerrarlo con "Volver", el formulario sigue deshabilitado y el foco pasa al título "Iniciar sesión" (con tabindex="-1").
    - Nunca puede haber dos modales abiertos a la vez.

7. Accesibilidad y responsivo
    - Etiquetas semánticas, foco visible con :focus-visible (en los campos, el botón de ver contraseña, Ingresar y Volver) y contraste mínimo WCAG AA.
    - Los campos deshabilitados usan atributo disabled real, no solo estilo.
    - Diseño centrado y adaptable en computador, tablet y móvil (320px mínimo), sin desbordamiento horizontal; el modal ocupa como máximo el ancho de pantalla menos un margen.

8. Integración con la plantilla base
    - No modifiques js/layout.js. No cambies el HEAD ni el FOOT. No cambies las reglas existentes de css/styles.css: solo agrega reglas nuevas al final, con un comentario de sección ("/* Login */", "/* Modales */").
    - Íconos: crea archivos SVG simples, de un solo color, sin scripts, en assets/img/: usuario.svg (persona), llave.svg (llave), ojo.svg (ojo abierto), ojo-oculto.svg (ojo tachado), todos en azul #0057B8, y alerta.svg (círculo con signo de exclamación) en rojo #DB0B00.
    - En las 6 vistas de views/ solo se agrega la etiqueta <script src="../js/auth.js"></script> después de la de layout.js; no se cambia nada más de ellas.

RAZONAMIENTO PASO A PASO
Antes de escribir código, explica brevemente en una lista numerada:
1. Cómo distingues usuario inexistente de contraseña incorrecta, cómo separas los errores de formato (que no cuentan intento) de los fallos de credenciales, y cómo guardas "sesion" e "intentos_login" en sessionStorage sin usar fetch().
2. Cómo interpretas un "intentos_login" o una "sesion" corruptos sin que se produzcan errores.
3. Cómo aplicas el bloqueo al tercer fallo y cómo lo mantienes si se recarga la página.
4. Cómo construyes y controlas los modales (apertura, cierre, Escape, foco y modal de bloqueo) sin atributos onclick.
5. Cómo haces que auth.js sirva tanto en index.html como en views/ sin errores cuando faltan elementos del formulario, y por qué se carga después de layout.js.
Después de esta explicación, entrega el código.

E - ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, titulado con su ruta exacta: index.html; js/auth.js; css/styles.css (solo las reglas nuevas, para el formulario de login, estados deshabilitados y modales); assets/img/usuario.svg; assets/img/llave.svg; assets/img/ojo.svg; assets/img/ojo-oculto.svg; assets/img/alerta.svg; y views/dashboard.html mostrando solo dónde se agrega la etiqueta <script src="../js/auth.js"></script> (indica que la misma línea va en las otras 5 vistas). No incluyas js/layout.js. Con comentarios en español. Al final agrega: (a) una lista de supuestos técnicos (usuarios de prueba, comportamiento al recargar bloqueado y cómo limpiar sessionStorage desde DevTools para probar); (b) una checklist que verifique cada una de las 8 condiciones de C.

T - TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos que no estén justificados por los requerimientos ni por los mockups MK_01 a MK_03; cuando falte una definición visual, usa soluciones convencionales de sitios de supermercados.

A - AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales de la interfaz son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```



### Resultado generado
Copilot entregó los siguientes archivos:

- `index.html`: pantalla de login con título, nota de campos obligatorios, campos Usuario y Contraseña, botón para ver la contraseña y botón Ingresar.
- `js/auth.js`: validación de campos vacíos y de caracteres permitidos; comprobación de usuario y clave contra los usuarios de prueba; contador de intentos en `sessionStorage` (`intentos_login`); bloqueo al tercer fallo, que se mantiene al recargar; modales de error con botón "Volver"; mostrar y ocultar la contraseña; redirección al dashboard cuando hay sesión; cierre de sesión.
- `css/styles.css`: estilos del login, de los mensajes de error, del estado deshabilitado y de los modales.
- `assets/img/`: `alerta.svg`, `llave.svg`, `ojo.svg`, `ojo-oculto.svg` y `usuario.svg`.
- `views/*.html` (6 vistas): se agregó la etiqueta `<script src="../js/auth.js">`.

No se modificaron `js/layout.js` ni `js/validaciones.js`. La parte funcional (validaciones, bloqueo, recarga y cierre de sesión) funcionó sin errores de consola; lo que fallaba era el diseño frente a los mockups.

### Problemas detectados al probarlo
Al comparar con MK_01, MK_02 y MK_03 (capturas `P2b-ANTES-*.png` en `docs/evidencias/`):

- El título "Iniciar sesión" salía centrado y en azul; en el mockup está alineado a la izquierda y en el color de texto principal.
- El formulario medía 320 px y los campos y el botón tenían esquinas redondeadas; el mockup usa 400 px y esquinas rectas.
- El modal mostraba el ícono arriba y centrado, con borde rojo y título rojo; en el mockup el ícono va a la izquierda del título, sin borde y con título oscuro.
- El modal medía 420 px; el mockup es más ancho (640 px).
- La capa detrás del modal era muy oscura (`rgba(31, 31, 31, 0.65)`).
- Los íconos de llave y de usuario no coincidían con los de MK_01.

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | Título centrado y azul | `css/styles.css` (`.login-contenido h1`) | `text-align` de center a left; color de azul a `--texto-principal`; `font-size: 28px`; `max-width: 400px` | Igualar MK_01 |
| 2 | Formulario de 320 px con esquinas redondeadas | `css/styles.css` (`.login__nota`, `.form-login`, `.login__entrada`, `.btn-ingresar`) | Ancho de 320 a 400 px; esquinas de 4 px a 0; alto de campos de 44 a 42 px y del botón de 44 a 40 px; separación entre campos de 16 a 19 px; `margin-top: 36px` en el botón | Igualar MK_01 |
| 3 | Modal con ícono arriba y borde rojo | `css/styles.css` (`.modal`, `.modal__icono`, `.modal__titulo`) | Grilla de 2 columnas con el ícono de 20 × 20 px a la izquierda del título; se quitó el borde rojo; título de rojo a `--texto-principal`; texto alineado a la izquierda; se eliminaron las reglas sin uso `.modal--error`, `.modal--aviso` y `.modal--aviso .modal__titulo` | Igualar MK_02 y MK_03 |
| 4 | Medidas del modal distintas al mockup | `css/styles.css` (`.modal`, `.modal__acciones`, `.modal__volver`) | Ancho de 420 a 640 px; padding `44px 32px 16px`; margen superior de las acciones de 20 a 40 px; botón Volver con `min-width` de 88 a 120 px y esquinas rectas | Igualar las proporciones de MK_02 y MK_03 |
| 5 | Capa detrás del modal muy oscura | `css/styles.css` (`.modal-capa`) | `rgba(31, 31, 31, 0.65)` cambiado a `rgba(0, 0, 0, 0.4)` | Igualar la opacidad de los mockups |
| 6 | Íconos distintos a MK_01 | `assets/img/llave.svg`, `assets/img/usuario.svg` | Se reemplazó el dibujo de ambos: llave con cabeza, agujero y paletón escalonado; usuario con cabeza y hombros. `ojo.svg` se revisó y ya coincidía, sin cambios | Igualar MK_01 |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P2b-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Verificación | Positivo | 2 | Abrir `index.html` sin sesión | Título "Iniciar sesión", "* Campos obligatorios", campos Usuario y Contraseña, botón Ingresar | Se ve el título "Iniciar sesión", "* Campos obligatorios", los campos Usuario y Contraseña y el botón Ingresar. Captura: `P2b-CP01-login.png`. | Sí |
| CP02 | Validación | Positivo | 2 | Comparación con el mockup `MK_01` | Íconos en los campos, ojo en la contraseña, botón de ancho completo, mismos colores | Coincide con MK_01: íconos en los campos, ojo en Contraseña, botón de ancho completo y mismos colores. Captura: `P2b-CP01-login.png`. | Sí |
| CP03 | Validación | Positivo | 2 | Ingresar con `admin` / `admin1234` | Redirige a `views/dashboard.html`; `sesion` con perfil `admin` en sessionStorage | Con `admin` / `admin1234` ingresa y redirige a `views/dashboard.html`. (Sin captura.) | Sí |
| CP04 | Validación | Positivo | 2 | Ingresar con `user` / `user1234` | Redirige a `views/dashboard.html`; `sesion` con perfil `user` | Con `user` / `user1234` ingresa y redirige a `views/dashboard.html`. (Sin captura.) | Sí |
| CP05 | Validación | Negativo | 2 | Ingresar con un usuario que no existe (ej. `pepito`) | Modal "Usuario inexistente" como `MK_02`; `intentos_login` = 1 | Sale el modal "Usuario inexistente" con "No existe el usuario en la base de datos.", con el ícono a la izquierda del título y sin borde rojo, como MK_02. `intentos_login` = `"1"`. Captura: `P2b-CP05-modal-usuario-inexistente.png`. | Sí |
| CP06 | Validación | Negativo | 2 | Usuario válido con clave incorrecta | Modal "Credenciales incorrectas" con "Intentos restantes: 2" (y luego 1) | Primer fallo: modal "Credenciales incorrectas" con "La contraseña no es correcta. Intentos restantes: 2." Segundo fallo: el mismo modal con "Intentos restantes: 1." Capturas: `P2b-CP06-credenciales-incorrectas-2.png` y `P2b-CP06-credenciales-incorrectas-1.png`. | Sí |
| CP07 | Validación | Negativo | 2 | Enviar con ambos campos vacíos y con uno vacío | Mensajes en línea bajo cada campo vacío; sin modal; `intentos_login` no cambia | Con ambos vacíos salen "Ingrese su usuario." e "Ingrese su contraseña." bajo cada campo, sin modal. Con solo Usuario escrito sale únicamente el mensaje bajo Contraseña; con solo la clave escrita, únicamente el de Usuario. `intentos_login` sigue en `null`. Captura: `P2b-CP07-campos-vacios.png`. | Sí |
| CP08 | Validación | Negativo | 2 | Usuario con caracteres especiales (ej. `ad$min`) | Mensaje "Solo se permiten letras y números."; no cuenta intento | Con `ad$min` sale "Solo se permiten letras y números." bajo Usuario, sin modal. `intentos_login` sigue en `null`. Captura: `P2b-CP08-caracteres-especiales.png`. | Sí |
| CP09 | Validación | Límite | 2 | Tercer fallo seguido | Solo el modal "Cuenta bloqueada" como `MK_03`; campos y botones deshabilitados en gris | Al tercer fallo aparece solo el modal "Cuenta bloqueada" con "Su cuenta ha sido bloqueada por seguridad. Comuníquese con soporte."; el botón Ingresar queda en gris. Captura: `P2b-CP09-cuenta-bloqueada.png`. | Sí |
| CP10 | Validación | Límite | 2 | Dos fallos y luego un login correcto | Entra al dashboard y `intentos_login` se elimina | Tras dos fallos, el login correcto entra al dashboard y `intentos_login` da `null`. (Sin captura.) | Sí |
| CP11 | Validación | Límite | 2 | Recargar la página estando bloqueado | Formulario sigue deshabilitado y reaparece el modal de bloqueo | Al recargar con F5 reaparece el modal "Cuenta bloqueada" con el foco en Volver y el formulario sigue deshabilitado: campos y botón en gris, sin poder escribir. Captura: `P2b-CP11-recarga-bloqueada.png`. | Sí |
| CP12 | Validación | Límite | 2 | En el modal de bloqueo, presionar Escape y luego "Volver" | Escape no lo cierra; "Volver" lo cierra y el formulario sigue deshabilitado | Escape no cierra el modal. Al presionar Volver se cierra y el formulario sigue deshabilitado, con campos y botón en gris. Captura: `P2b-CP12-bloqueo-tras-volver.png`. | Sí |
| CP13 | Validación | Positivo | 2 | Abrir `index.html` con sesión activa | Redirige a `views/dashboard.html` sin mostrar el formulario | Con sesión activa, al abrir `index.html` se queda en el dashboard sin mostrar el formulario. (Sin captura.) | Sí |
| CP14 | Verificación | Negativo | 2 | `sesion` = `"esto no es json"` y `{"perfil":"superadmin"}`; `intentos_login` = `"abc"` | Se ve el formulario normal, sin errores en consola | Con los tres valores se ve el formulario normal, sin errores en la consola. (Sin captura.) | Sí |
| CP15 | Validación | Positivo | 2 | Clic en Cerrar sesión desde el dashboard | Se elimina `sesion` y vuelve a `index.html` | "Cerrar sesión" desde el dashboard vuelve a `index.html` y `sesion` queda en `null`. (Sin captura.) | Sí |
| CP16 | Validación | Positivo | 2 | Clic en Cerrar sesión desde otra vista (ej. `views/pedidos.html`) | Se elimina `sesion` y vuelve a `index.html`; sin errores en consola | "Cerrar sesión" desde otra vista vuelve a `index.html` sin problemas. (Sin captura.) | Sí |
| CP18 | Validación | Positivo | 2 | Botón del ojo con mouse y con teclado | Muestra y oculta la contraseña; cambia ícono y `aria-label` | El botón del ojo muestra y oculta la contraseña y cambia el ícono. (Sin captura.) | Sí |
| CP19 | Verificación | Positivo | 2 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos | 0 resultados; consola sin errores en `index.html` y las 6 vistas | Las búsquedas no arrojan resultados y la consola no muestra errores. (Sin captura.) | Sí |
| CP20 | Validación | Límite | 2 | Anchos de 1920, 768, 375 y 320 px | Formulario y modal adaptados, sin scroll horizontal | Probado solo en 375 px: el formulario y el modal se adaptan al ancho y no aparece scroll horizontal. No se probó en 1920, 768 ni 320 px. Capturas: `P2b-CP20-movil-375-login.png` y `P2b-CP20-movil-375-modal.png`. | Parcial |
| CP21 | Verificación | Positivo | 1 | `git diff js/layout.js` después del prompt | Sin cambios: el HEAD y el FOOT del P1 siguen intactos | `git diff --ignore-space-at-eol js/layout.js` no muestra cambios. (Sin captura.) | Sí |

Nota: el CP17 (foco y Escape en los modales de error) se retiró del plan y no se ejecutó.

---

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
