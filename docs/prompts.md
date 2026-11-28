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
| P3  |   2   | 3, 8, 9, 10 | Perfiles, menús y bloqueo por URL directa | Reemplazado por P3-b | Matías|
| P3-b|   2   | 2, 3, 8, 9, 10| Perfiles, bienvenida por perfil y bloqueo por URL directa|Completado|Matías|
| P4  |   3   | 4, 5 | Base compartida: datos de prueba, validaciones y modal reutilizable|[pendiente]| [por asignar]|
| P5  |   3   | 4    | Vista Pedidos: formulario de cliente, validaciones y modales| [pendiente]|[por asignar]|
| P6  |   3   | 4, 6 | Vista Pedidos Detalle Pedido (buscador, cálculos en CLP, filas y total)| [pendiente]| [por asignar]|
| P7  |   3   | 5, 9 | Vista Pedidos Ingresados: tabla, selección única y eliminar| [pendiente] | [por asignar]|
| P8  |   3   | 4, 5 | Editar pedido desde Pedidos Ingresados|[pendiente]|[por asignar]|
| P9  |   3   | 2    | Tarjetas del dashboard del perfil user | [pendiente] | [por asignar] |


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
- **Fecha:** 24-11-2027
- **Herramienta:** Geminis + Claude
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

## P3-b - Perfiles, bienvenida por perfil y bloqueo por URL directa (RIU 2, 3, 8, 9, 10), versión corregida

- **Fecha:** 27-11-2026
- **Herramienta:** Copilot + Claude + correciones manuales
- **Ejecutado por:** Matías
- **Hito / RIU:** Hito 2 / RIU 2, RIU 3, RIU 8, RIU 9 y RIU 10
- **Origen:** corrección del P3, que no se ejecutó. Se alinea con el código que ya existe (P1 y P2-b) y con los mockups MK_04 y MK_05 (dashboard por perfil) y MK_22 y MK_34 (acceso restringido).
- **Cambios respecto al P3:** (1) se quita la segregación de menús, porque `js/layout.js` ya la hace desde el P1; pasa a ser solo una verificación; (2) se quita el cierre de sesión, porque ya está en `js/auth.js` desde el P2-b; (3) el guardia de rutas se define como archivo nuevo `js/auth-guard.js`, sin tocar `layout.js`; (4) el modal de acceso denegado sigue MK_22 y MK_34 ("Acceso restringido", sin borde rojo) y reutiliza las clases de modal que ya existen; (5) el bloqueo redirige al dashboard del perfil y muestra el modal ahí, como en MK_22, así el contenido protegido nunca se muestra; (6) se agrega el encabezado del dashboard ("Panel de usuario" o "Panel de administrador" y el saludo "Bienvenido, nombre"), de MK_04 y MK_05; las tarjetas con cifras se programan en los Hitos 3 y 4, cuando existan datos; (7) se agrega la protección contra el botón Atrás del navegador después de cerrar sesión; (8) se actualiza el contexto (el login ya existe) y la tabla de validación incluye casos negativos y de límite.
- **Archivos afectados:** `js/auth-guard.js` (nuevo), `js/app.js` (hoy vacío), `css/styles.css` (solo reglas nuevas) y las 6 vistas de `views/` (etiqueta `<script>` del guardia en el `<head>`; `dashboard.html` además enlaza `app.js`). No se modifican `js/layout.js`, `js/auth.js` ni `js/validaciones.js`.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en control de acceso en el cliente (perfiles y rutas), accesibilidad web (WCAG AA) y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout") cuando hay sesión.
- Login: index.html y js/auth.js. auth.js guarda la sesión, programa el clic de #btn-logout (elimina "sesion" de sessionStorage y vuelve a index.html) y está cargado en las 7 páginas. Usuarios de prueba: admin / admin1234 y user / user1234.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> con data-vista igual a dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento, y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Hoy los scripts van al final del <body>: primero layout.js y luego auth.js.
- css/styles.css ya define los tokens de diseño y los estilos del modal: .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones y .modal__volver.
- Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 2: una vez logado, se carga una vista tipo dashboard cuyo BODY muestra "Bienvenido USUARIO (nombre del usuario)" y las opciones del menú según el tipo de usuario; el botón Cerrar sesión debe estar siempre visible arriba a la derecha.
- RIU 3: existen dos tipos de usuario, user y admin, con perfiles y funcionalidades distintas.
- RIU 5: la vista Pedidos Ingresados solo se carga cuando el usuario se loga exitosamente; de lo contrario permanece oculta.
- RIU 8: el perfil admin solo carga Home, Productos y Procesamiento de Pedido.
- RIU 9: el perfil user solo carga Home, Pedidos y Pedidos Ingresados.
- RIU 10: admin no puede acceder a las funcionalidades de user, y user no puede acceder a las de admin.

Mockups de referencia:
- MK_04 (dashboard user) y MK_05 (dashboard admin): en la misma fila, el título "Panel de usuario" o "Panel de administrador" a la izquierda y el saludo "Bienvenido, nombre" en azul a la derecha. Debajo hay tarjetas con cifras: NO se programan en este prompt.
- MK_22 (user) y MK_34 (admin): el dashboard del perfil con la capa oscura y un modal centrado con ícono de alerta a la izquierda del título "Acceso restringido", el mensaje "No tiene permisos para acceder a esta sección." y un botón rojo "Volver" a la derecha. Sin borde rojo, con el mismo diseño de los modales de login.

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro. Prohibido usar frameworks, librerías o CDN.
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="".
- Prohibido usar fetch() (el proyecto se abre con doble clic o Live Server).
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño: azul #0057B8, blanco #FFFFFF, celeste #CCD8E8, texto #1F1F1F, texto secundario #595959, rojo #DB0B00. Fuente Geist local. Encabezados de 20 px, textos de 14 px. No agregues colores nuevos.
- Comentarios en español y código simple.

C – CLARIDAD EN LA TAREA
Programa el control de acceso por perfil y el encabezado del dashboard. NO modifiques js/layout.js, js/auth.js ni js/validaciones.js. NO vuelvas a programar los menús ni el cierre de sesión: ya existen. Cumple estas condiciones verificables:

1. Mapa de permisos y archivo nuevo js/auth-guard.js:
- Define un único objeto de permisos indexado por data-vista, por ejemplo: dashboard: ["admin","user"], pedidos: ["user"], "pedidos-ingresados": ["user"], productos: ["admin"], "producto-form": ["admin"], procesamiento: ["admin"]. Sin condicionales repetidos por vista. Una vista que no aparezca en el mapa se trata como no permitida.
- El script se carga en el <head> de cada vista de views/, sin defer ni async, y lo primero que hace es ocultar la página (document.documentElement.hidden = true) para que no se vea ni un instante contenido no autorizado. Solo la muestra (hidden = false) cuando el acceso queda confirmado, una vez cargado el DOM (DOMContentLoaded).
- La sesión se lee con sessionStorage.getItem("sesion") dentro de un try/catch. La sesión es válida solo si es un objeto con perfil "admin" o "user".

2. Sin sesión válida (RIU 2 y 5):
- Si no existe "sesion", el JSON es inválido o el perfil no es "admin" ni "user", y se abre cualquier vista de views/, redirige de inmediato a ../index.html con location.replace, sin mostrar contenido.

3. Acceso cruzado por URL directa (RIU 10):
- Si hay sesión válida pero el perfil no está permitido en esa vista (user en productos, producto-form o procesamiento; admin en pedidos o pedidos-ingresados), guarda sessionStorage["acceso_restringido"] = "1" y redirige con location.replace a dashboard.html (respetando data-raiz). El contenido de la vista protegida nunca se muestra.
- Al cargar views/dashboard.html con sesión válida, si existe esa marca, la elimina y muestra el modal de acceso restringido.

4. Modal de acceso restringido:
- Estructura idéntica a los modales del login: <div class="modal-capa"> con un <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-titulo" aria-describedby="modal-mensaje"> que contiene <img class="modal__icono" src="[raiz]assets/img/alerta.svg" alt="" aria-hidden="true">, <h2 class="modal__titulo" id="modal-titulo">Acceso restringido</h2>, <p class="modal__mensaje" id="modal-mensaje">No tiene permisos para acceder a esta sección.</p> y <div class="modal__acciones"> con un único <button type="button" class="modal__volver">Volver</button>.
- Reutiliza las clases de css/styles.css que ya existen: no escribas CSS nuevo para el modal ni agregues borde rojo.
- Al abrirse, el foco queda en "Volver" y Tab no puede salir del modal. Tanto Volver como Escape cierran el modal y dejan al usuario en el dashboard.

5. Encabezado del dashboard por perfil (RIU 2 y 3), en js/app.js:
- Solo actúa si data-vista es "dashboard" y hay sesión válida. Dentro de <main id="contenido"> cambia el <h1> a "Panel de usuario" (perfil user) o "Panel de administrador" (perfil admin) y agrega a su derecha, en la misma fila, el saludo "Bienvenido, " seguido de sesion.nombre (si el nombre viene vacío, usa sesion.usuario), en color azul #0057B8 con tamaño de 20 px y peso normal.
- No programes las tarjetas con cifras ni lo que va debajo del encabezado.
- En css/styles.css agrega solo las reglas nuevas necesarias para esta fila (por ejemplo .panel-encabezado y .panel-bienvenida): título y saludo en una fila con espacio entre ambos; en pantallas de hasta 700 px, uno debajo del otro.

6. Botón Atrás del navegador:
- Si la página se restaura desde la caché al presionar Atrás (evento pageshow con event.persisted verdadero), vuelve a ejecutar la comprobación (por ejemplo con window.location.reload()), de modo que después de cerrar sesión no se vea una vista protegida.

7. Accesibilidad y responsivo:
- Contraste mínimo WCAG AA. Al cerrar el modal, el foco pasa al <h1> del dashboard (agrega tabindex="-1" por JS).
- Sin scroll horizontal en anchos de 375 y 320 px.

8. Verificación (no programes nada nuevo): confirma en la checklist que el menú por perfil (RIU 8 y 9) y el botón Cerrar sesión (RIU 2) siguen funcionando sin cambios de código.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo organizas el mapa de permisos para evitar condicionales repetidos en cada HTML.
2. En qué orden se ejecutan auth-guard.js, layout.js, auth.js y app.js al cargar una vista, y por qué nunca se muestra contenido no autorizado.
3. Cómo pasas el aviso de acceso restringido desde la vista bloqueada hasta el dashboard, y cómo evitas que el modal reaparezca al recargar.
4. Cómo resuelves las rutas relativas ("" y "../") en las redirecciones y en la imagen del ícono.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- js/auth-guard.js (completo).
- js/app.js (completo).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
- views/dashboard.html (completo, con auth-guard.js en el <head> y layout.js, auth.js y app.js al final del <body>).
- views/productos.html (completo, como ejemplo de vista protegida). Aclara que las otras 4 vistas llevan la misma línea del <head>.
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos (por ejemplo, cómo simular ambos perfiles desde la consola antes de probar con el login).
(b) Una checklist que verifique una por una las 8 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos que no estén justificados por los requerimientos o los mockups.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
Copilot entregó los siguientes archivos:

- `js/auth-guard.js` (nuevo): mapa único de permisos por vista; oculta la página hasta confirmar el acceso; redirige a `index.html` si no hay sesión válida; redirige al dashboard con la marca `acceso_restringido` si el perfil no tiene permiso; muestra el modal "Acceso restringido" en el dashboard y vuelve a comprobar al usar el botón Atrás.
- `js/app.js`: encabezado del dashboard por perfil ("Panel de usuario" o "Panel de administrador") con el saludo "Bienvenido, nombre" en azul.
- `css/styles.css`: reglas nuevas para `.panel-encabezado` y `.panel-bienvenida`, con una columna en pantallas de hasta 700 px.
- `views/*.html` (6 vistas): se agregó el `<script>` del guardia en el `<head>`; `dashboard.html` además enlaza `app.js`.

No se modificaron `js/layout.js`, `js/auth.js` ni `js/validaciones.js`. El código cumplió las condiciones del prompt y no produjo errores en la consola; lo único que no coincidía con los mockups era el estilo de los botones del menú.

### Problemas detectados al probarlo
Al comparar el dashboard y el modal con MK_04, MK_05, MK_22 y MK_34:

- Los botones del menú salían todos blancos con texto azul, y el de la vista actual llevaba una franja azul abajo. En los mockups el botón de la vista actual es blanco con texto azul y los demás son transparentes con borde y texto blancos. 

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1  | Botones del menú todos blancos y la vista actual con franja azul | css/styles.css (.menu-principal a, .menu-principal a[aria-current="page"], .menu-principal a:hover) | Botones normales con fondo transparent y texto --blanco; la vista actual con fondo --blanco y texto --azul-marca (se quitó el box-shadow); en :hover se agregó color: var(--azul-marca) |Igualar lo establecido en MOCKUPS, y mantener el texto legible al pasar el mouse |

### Validación

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Negativo | 2 y 5 | Abrir `views/dashboard.html` sin sesión | Redirige a `index.html` sin mostrar contenido | Al abrir `views/dashboard.html` sin sesión redirige a `index.html` y no se ve el panel. (Sin captura.) | Sí |
| CP02 | Validación | Negativo | 2 y 5 | Abrir sin sesión `pedidos`, `pedidos-ingresados`, `productos`, `producto-form` y `procesamiento` (una por una) | Las cinco redirigen a `index.html` | Las cinco vistas redirigen a `index.html` sin mostrar contenido. (Sin captura.) | Sí |
| CP03 | Validación | Límite | 2 y 5 | Con `sesion` = `"esto no es json"`, abrir `views/pedidos.html` | Redirige a `index.html`, sin errores en consola | Redirige a `index.html` y la consola no muestra errores. (Sin captura.) | Sí |
| CP04 | Validación | Límite | 3 y 10 | Con `sesion` = `{"perfil":"superadmin"}`, abrir `views/productos.html` | Redirige a `index.html` | El perfil no válido se trata como sin sesión y redirige a `index.html`. (Sin captura.) | Sí |
| CP05 | Validación | Positivo | 2, 3 y 9 | Entrar como `user` | Dashboard con "Panel de usuario", "Bienvenido, [nombre]" en azul y menú Home, Pedidos, Pedidos Ingresados | El dashboard muestra "Panel de usuario" a la izquierda y "Bienvenido, User Mercado Sur" en azul (#0057B8) a la derecha, en la misma fila. El menú muestra Home, Pedidos y Pedidos Ingresados. Captura: `P3b-CP05-dashboard-user.png`. | Sí |
| CP06 | Validación | Positivo | 2, 3 y 8 | Entrar como `admin` | Dashboard con "Panel de administrador", "Bienvenido, [nombre]" en azul y menú Home, Productos, Procesamiento de Pedido | El dashboard muestra "Panel de administrador" y "Bienvenido, Administrador Mercado Sur" en azul. El menú muestra Home, Productos y Procesamiento de Pedido. Captura: `P3b-CP06-dashboard-admin.png`. | Sí |
| CP07 | Validación | Positivo | 9 | Con `user`, abrir `pedidos.html` y `pedidos-ingresados.html` por URL | Ambas cargan normalmente | Ambas vistas cargan normalmente, sin modal ni redirección. (Sin captura.) | Sí |
| CP08 | Validación | Positivo | 8 | Con `admin`, abrir `productos.html`, `producto-form.html` y `procesamiento.html` por URL | Las tres cargan normalmente | Las tres vistas cargan normalmente, sin modal ni redirección. (Sin captura.) | Sí |
| CP09 | Validación | Negativo | 10 | Con `user`, abrir `views/productos.html` por URL | Redirige al dashboard y muestra el modal "Acceso restringido"; Productos no se ve | Redirige al dashboard y muestra el modal "Acceso restringido" con "No tiene permisos para acceder a esta sección."; la vista Productos no se ve. Captura: `P3b-CP09-user-bloqueo-productos.png`. | Sí |
| CP10 | Validación | Negativo | 10 | Con `user`, abrir `producto-form.html` y `procesamiento.html` por URL | Igual que CP09 en ambas | En ambas redirige al dashboard y muestra el modal "Acceso restringido". (Sin captura; es la misma pantalla de CP09.) | Sí |
| CP11 | Validación | Negativo | 10 | Con `admin`, abrir `pedidos.html` y `pedidos-ingresados.html` por URL | Redirige al dashboard y muestra el modal "Acceso restringido" | En ambas redirige al dashboard y muestra el modal "Acceso restringido". Captura: `P3b-CP11-admin-bloqueo-pedidos.png`. | Sí |
| CP12 | Validación | Positivo | 10 | Comparar el modal con `MK_22` (user) y `MK_34` (admin) | Ícono a la izquierda del título, sin borde rojo, botón Volver rojo a la derecha | Es el mismo modal de CP09 (user) y CP11 (admin) y coincide con MK_22 y MK_34: ícono de alerta a la izquierda del título, sin borde rojo, capa gris detrás y botón rojo "Volver" a la derecha. Se revisó en las capturas de CP09 y CP11. | Sí |
| CP13 | Validación | Límite | 10 | En el modal: ver el foco, presionar Tab, Escape y Volver | Foco en Volver; Tab no sale del modal; Escape y Volver lo cierran y se queda en el dashboard | Al abrirse el foco queda en "Volver" y Tab no sale del modal. Escape y Volver lo cierran, se queda en el dashboard y el foco pasa al título "Panel de usuario". (Sin captura.) | Sí |
| CP14 | Validación | Límite | 10 | Tras cerrar el modal, recargar con F5 | El modal no reaparece | Tras cerrar el modal y recargar con F5 el modal no reaparece. (Sin captura.) | Sí |
| CP15 | Validación | Límite | 10 | Con `user`, abrir `views/productos.html?x=1#abc` | Se bloquea igual que CP09 | Se bloquea igual que CP09: redirige al dashboard y muestra el modal "Acceso restringido". (Sin captura.) | Sí |
| CP16 | Validación | Límite | 2 y 10 | Entrar como `admin`, abrir Productos, cerrar sesión y presionar Atrás | No se ve Productos; termina en `index.html` | Después de cerrar sesión y presionar Atrás no se ve Productos y termina en `index.html`. (Sin captura.) | Sí |
| CP17 | Verificación | Positivo | 2 | Botón Cerrar sesión en las 6 vistas, con `user` y con `admin` | Visible arriba a la derecha y vuelve a `index.html` | Se probó en las vistas que cada perfil puede abrir (3 con `user` y 4 con `admin`; en las demás el guardia redirige). El botón se ve arriba a la derecha, elimina `sesion` y vuelve a `index.html` en todas. (Sin captura.) | Sí |
| CP18 | Verificación | Positivo | 1 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/validaciones.js` | Sin cambios | El comando no muestra cambios en los tres archivos. (Sin captura.) | Sí |
| CP19 | Verificación | Positivo | 2 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos; consola abierta en las 7 páginas | 0 resultados y consola sin errores | La búsqueda en los `.html`, `.js` y `.css` da 0 resultados y la consola no muestra errores en `index.html` ni en las vistas. (Sin captura.) | Sí |
| CP20 | Validación | Límite | 2 | Anchos de 375 y 320 px en el dashboard y en el modal | Encabezado y modal adaptados, sin scroll horizontal | A 375 y 320 px el dashboard y el modal "Acceso restringido" aparecen y se adaptan al ancho, sin scroll horizontal; el saludo pasa debajo del título. Capturas: `P3b-CP20-375-modal.png` y `P3b-CP20-320-modal.png`. | Sí |

---

## P4 - Base compartida: datos de prueba, validaciones y modal reutilizable (RIU 4 y 5, soporte)

- **Fecha:** 28-11-2026
- **Herramienta:** Copilot + Claude + correciones manuales
- **Ejecutado por:** Carlos
- **Hito / RIU:** Hito 3 / RIU 4 y RIU 5 (soporte de las vistas del perfil user)
- **Origen:** prompt nuevo. Prepara lo que usarán P5 a P9 para no repetir código: datos y almacenamiento (js/data.js), validaciones (js/validaciones.js) y modales (js/modal.js). Los datos de prueba salen de MK_13 (productos) y MK_10 (pedidos); los modales siguen MK_08, MK_09, MK_23 y MK_36.
- **Archivos afectados:** `js/data.js`, `js/validaciones.js`, `js/modal.js` (nuevo), `assets/img/exito.svg` (nuevo), `css/styles.css` (solo reglas nuevas) y etiquetas `<script>` en `views/pedidos.html`, `views/pedidos-ingresados.html` y `views/dashboard.html`. No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js` ni `js/app.js`.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en JavaScript puro (ES6+), manejo de datos en el navegador con localStorage, validación de formularios, ventanas modales accesibles (WCAG AA) y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3: programación de las interfaces del perfil user (vistas Pedidos y Pedidos Ingresados). Este prompt (P4) NO crea ninguna pantalla nueva: deja listos tres módulos compartidos (datos, validaciones y modales) que usarán los prompts P5 a P9, para que ninguno repita datos, validaciones ni modales. Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- Los archivos js/data.js y js/validaciones.js existen pero están vacíos (0 bytes). js/modal.js no existe todavía.
- js/auth.js y js/auth-guard.js tienen cada uno su propio modal interno. Se dejan como están; el módulo nuevo js/modal.js es para las vistas del Hito 3.

Requerimientos que se apoyan (texto del documento de requerimientos):
- RIU 4, campos del formulario de Pedidos: Nombre completo (solo texto, máximo 255 caracteres); RUN (alfanumérico, máximo 255 caracteres, formato con puntos, guión y dígito verificador, en caso de K debe ser en mayúscula, ejemplo 12.345.678-K); Teléfono (numérico, máximo 12 dígitos, formato CÓDIGO PAÍS + NÚMERO, ejemplo +56987654321); Correo electrónico (alfanumérico, formato CORREO + @ + DOMINIO + . + EXTENSIÓN, ejemplo nombre@apellido.cl); Dirección (alfanumérico, máximo 255 caracteres); Cantidad (numérico, valor máximo 100); los valores monetarios se muestran en peso chileno.
- RIU 4: si un producto tiene cantidad igual a cero queda deshabilitado y no debe cargarse en el selector desplegable.
- RIU 5: la vista Pedidos Ingresados muestra NUMERO PEDIDO, NOMBRE COMPLETO, CORREO, TELEFONO y TOTAL de los pedidos ingresados en la vista Pedidos.

Mockups de referencia:
- MK_13 (tabla de Productos): datos de los productos de prueba.
- MK_10 (tabla de Pedidos Ingresados): datos de los pedidos de prueba.
- MK_08 (modal "Campos obligatorios"), MK_09 (modal "Vaciar formulario", con Cancelar y Confirmar), MK_23 (modal de éxito "Pedido enviado") y MK_36 (modal informativo "No se puede eliminar la fila"): todos tienen ícono a la izquierda del título, mensaje debajo y botones abajo a la derecha, sobre la capa oscura, con el mismo diseño del modal "Acceso restringido".

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa los tres módulos compartidos. NO modifiques js/layout.js, js/auth.js, js/auth-guard.js ni js/app.js. No programes ninguna pantalla, formulario ni tabla. Cumple estas condiciones verificables:

1. Archivo js/data.js (objeto global window.Datos):
- Estructura: una función autoejecutable con "use strict". No usa el DOM. Es el único archivo del proyecto que usa localStorage. Claves: "ms_productos" y "ms_pedidos", ambas con un arreglo en JSON.
- Datos de prueba de productos (12; número, nombre, cantidad, valor en pesos, estado):
  3001, Leche Entera 1L, 120, 1190, Habilitado
  3002, Tallarines 400g, 85, 1200, Habilitado
  3003, Arroz Grado 1 1kg, 60, 1500, Habilitado
  3004, Aceite Vegetal 900ml, 0, 2790, Deshabilitado
  3005, Coca-Cola 1.5L, 45, 2190, Habilitado
  3007, Pan de Molde 500g, 70, 1790, Habilitado
  3008, Azúcar 1kg, 90, 1390, Habilitado
  3009, Agua Cristal 2L, 90, 1050, Habilitado
  3010, Tallo de Apio, 40, 890, Habilitado
  3011, Huevos Blancos x12, 35, 3290, Habilitado
  3012, Yogurt Natural 1L, 25, 1690, Habilitado
  3013, Detergente Líquido 3L, 18, 6990, Habilitado
- Datos de prueba de pedidos (5; número, nombre, RUN, teléfono, correo, dirección, detalle como cantidad × producto, total). Cada línea del detalle guarda el valor unitario del producto en ese momento y valorVenta = cantidad × valorUnitario:
  1001, María Pérez, 12.345.678-K, +56911111111, maria@correo.cl, Av. Libertad 123, 2 × 3002 y 3 × 3003, total 6900
  1002, Juan Soto, 9.876.543-2, +56922222222, juan@correo.cl, Calle Los Aromos 456, 2 × 3002 y 4 × 3003, total 8400
  1003, Ana Díaz, 15.234.567-8, +56933333333, ana@correo.cl, Pasaje Las Rosas 78, 3 × 3001, 3 × 3007 y 4 × 3011, total 22100
  1004, Pedro Rojas, 11.222.333-4, +56944444444, pedro@correo.cl, Av. Central 900, 2 × 3010, 1 × 3009 y 4 × 3011, total 15990
  1005, Luisa Vera, 18.765.432-1, +56955555555, luisa@correo.cl, Camino Real 321, 3 × 3001, 1 × 3005 y 1 × 3013, total 12750
  El nombre del producto de cada línea se toma del catálogo anterior.
- Si una clave no existe, o su contenido no es un arreglo válido de objetos, se vuelve a sembrar con estos datos de prueba. Todo acceso a localStorage va dentro de try/catch; si localStorage no está disponible, los datos viven solo en memoria y la página no se rompe.

2. Funciones públicas de window.Datos (los nombres y el comportamiento exactos están en el contrato de más abajo): listarProductos(), listarProductosPedibles(), listarPedidos(), obtenerPedido(numero), guardarPedido(pedido), eliminarPedido(numero), calcularTotal(detalle) y restablecer().
- Todas devuelven copias: modificar lo que devuelven no puede alterar los datos internos.
- guardarPedido asigna el número siguiente (mayor número existente + 1, mínimo 1001) solo cuando pedido.numero es null; calcula el total con calcularTotal; si el número ya existe, reemplaza ese pedido sin cambiar su número ni su posición.
- listarPedidos devuelve siempre los pedidos ordenados por número ascendente.

2.1 Contrato público que debes implementar (este mismo texto se copiará después a los prompts P5 a P9):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

3. Archivo js/validaciones.js (objeto global window.Validaciones). Son funciones puras: no usan el DOM ni localStorage. Cada función recibe el valor tal como lo escribió el usuario y le quita los espacios del inicio y del final antes de validar:
- nombre(t): vacío → {valido:false, mensaje:"Campo obligatorio."}; más de 255 caracteres → "Máximo 255 caracteres."; solo se aceptan letras (incluidas tildes, ñ y ü) y espacios, y cualquier otro carácter → "Nombre inválido. Use solo letras y espacios."
- run(t): vacío → "Campo obligatorio."; debe cumplir /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/ (puntos, guión y dígito verificador; la K debe ser mayúscula) y, si no cumple, → "RUN inválido. Formato esperado: 12.345.678-K". NO calcules el dígito verificador: el ejemplo del propio requerimiento (12.345.678-K) no es un dígito real, y solo se pide validar el formato.
- telefono(t): vacío → "Campo obligatorio."; debe cumplir /^\+\d{10,12}$/ (signo + y de 10 a 12 dígitos) y, si no cumple, → "Teléfono inválido. Formato esperado: +56987654321".
- correo(t): vacío → "Campo obligatorio."; más de 255 caracteres → "Máximo 255 caracteres."; debe cumplir /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/ y, si no cumple, → "Correo inválido. Formato esperado: nombre@apellido.cl".
- direccion(t): vacío → "Campo obligatorio."; más de 255 caracteres → "Máximo 255 caracteres."; solo se aceptan letras (con tildes y ñ), números, espacios y los signos . , # - / ° º, y cualquier otro carácter → "Dirección inválida. Use letras, números y . , # - /"
- cantidad(v): v puede venir como texto o número; vacío → "Campo obligatorio."; debe ser un número entero de 1 a 100, y si no lo es (letras, decimales, 0, negativos o mayores que 100) → "Ingrese un número entre 1 y 100."
- formatearCLP(n): devuelve "$" seguido del entero con punto como separador de miles, sin decimales (1200 → "$1.200"; 22100 → "$22.100"; 0 → "$0"). No uses Intl ni toLocaleString: arma el texto a mano para que no dependa del idioma del navegador. Si n no es un número válido, devuelve "$0".
- normalizar(t): devuelve el texto en minúsculas y sin tildes ni diéresis (por ejemplo con normalize("NFD") y quitando los signos diacríticos), y la ñ pasa a n.
- contiene(textoCompleto, busqueda): devuelve true si normalizar(textoCompleto) contiene de forma consecutiva normalizar(busqueda). Ejemplos: contiene("Agua Cristal 2L", "tal") es true (coincide en medio de una palabra); contiene("Azúcar 1kg", "AZU") es true; contiene("Leche Entera 1L", "tal") es false.

4. Archivo js/modal.js (objeto global window.Modal), un solo modal abierto a la vez, construido con createElement y textContent:
- Estructura: la misma de los modales existentes: <div class="modal-capa"> con un <div class="modal modal--[tipo]" role="alertdialog" aria-modal="true" aria-labelledby="modal-titulo" aria-describedby="modal-mensaje"> que contiene <img class="modal__icono" alt="" aria-hidden="true">, <h2 class="modal__titulo" id="modal-titulo">, <p class="modal__mensaje" id="modal-mensaje"> y <div class="modal__acciones"> con los botones. La ruta del ícono se arma con data-raiz del <body>.
- Tipos: "error" (ícono assets/img/alerta.svg, un botón Aceptar azul); "exito" (ícono assets/img/exito.svg, un botón Aceptar azul); "aviso" (ícono alerta.svg, título y mensaje en azul, un botón Aceptar azul); "confirmar" (ícono alerta.svg, dos botones en este orden: Cancelar con el estilo de borde azul y Confirmar en rojo). Los botones usan las clases .boton y su variante. Los textos de los botones son "Aceptar" (por defecto; en "confirmar" es "Confirmar") y "Cancelar", y se pueden cambiar con textoAceptar y textoCancelar.
- Callbacks: alAceptar se ejecuta al pulsar Aceptar o Confirmar; alCancelar al pulsar Cancelar; alCerrar se ejecuta siempre al final, después de los otros. Si no se pasan, no pasa nada.
- Teclado y foco: al abrirse, el foco queda en el botón Aceptar (en "confirmar" queda en Cancelar, que es la opción segura). Tab y Shift+Tab giran solo entre los botones del modal y no pueden salir de él, aunque el usuario haya hecho clic antes en la capa oscura (por eso el control de teclado se escucha en document mientras el modal está abierto y se quita al cerrar). Escape equivale a Aceptar en los modales de un solo botón y a Cancelar en "confirmar". Un clic en la capa oscura fuera del modal no lo cierra.
- Al cerrarse, el foco vuelve al elemento que lo tenía antes de abrir el modal, salvo que un callback haya movido el foco a otro elemento.
- Si se llama a Modal.mostrar con otro modal abierto, el anterior se reemplaza. Modal.estaAbierto() indica si hay uno abierto.

5. Íconos nuevos: crea assets/img/exito.svg (círculo con una marca de verificación, 24 × 24, color #0057B8, mismo estilo de trazo que alerta.svg).

6. css/styles.css, solo reglas nuevas agregadas al final (no modifiques ni borres ninguna regla existente ni la clase .modal__volver del login):
- En :root agrega dos tokens nuevos, permitidos porque los mockups los usan: --gris-calculado: #E5E5E5 (celdas calculadas y deshabilitadas) y --borde-tabla: #D9D9D9 (líneas de tablas).
- Botón genérico .boton: alto mínimo 40 px, ancho mínimo 120 px, sin borde redondeado, fuente Geist de 14 px y peso 600, cursor pointer. Variantes: .boton--azul (fondo azul #0057B8, texto blanco), .boton--rojo (fondo rojo #DB0B00, texto blanco) y .boton--borde (fondo transparente, borde de 1 px azul, texto azul). En :disabled: fondo --gris-deshabilitado, texto blanco, sin borde y cursor not-allowed. Anillo de foco visible igual al de los demás botones del proyecto.
- .modal--exito (sin cambios de color; solo para distinguirlo) y .modal--aviso (título y mensaje en color --azul-marca).
- .modal__acciones con separación de 16 px entre botones.

7. Vistas: agrega etiquetas <script> (sin código dentro) al final del <body>, después de auth.js:
- views/pedidos.html y views/pedidos-ingresados.html: data.js, validaciones.js y modal.js, en ese orden.
- views/dashboard.html: solo data.js, y antes de app.js.
No cambies nada más en esas vistas.

8. Accesibilidad y responsivo:
- Contraste mínimo WCAG AA. Los botones del modal se ven con el anillo de foco.
- En anchos de 375 y 320 px el modal no se corta ni genera scroll horizontal; los botones pueden pasar a una columna.

9. Verificación (no programes nada nuevo): confirma en la checklist que js/layout.js, js/auth.js, js/auth-guard.js y js/app.js no cambiaron, y que el modal "Acceso restringido" y el login siguen funcionando igual.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo organizas js/data.js (carga, siembra y guardado) para que nunca se rompa con datos corruptos o sin localStorage.
2. Por qué las funciones de validaciones.js son puras y cómo reutilizas normalizar dentro de contiene.
3. Cómo evitas que Tab o Escape se escapen del modal cuando el usuario hace clic fuera de él.
4. Cómo restauras el foco al cerrar el modal sin pisar el foco que ponga un callback.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- js/data.js (completo).
- js/validaciones.js (completo).
- js/modal.js (completo).
- assets/img/exito.svg (completo).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
- views/pedidos.html, views/pedidos-ingresados.html y views/dashboard.html (completos, solo con las etiquetas <script> nuevas).
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos y cómo probar cada módulo desde la consola del navegador (por ejemplo, Datos.listarPedidos(), Validaciones.run("12.345.678-K") y Modal.mostrar({tipo: "confirmar", titulo: "Prueba", mensaje: "Mensaje"})).
(b) Una checklist que verifique una por una las 9 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
Copilot generó los archivos js/data.js (270 líneas) y js/validaciones.js (127 líneas) con el contenido pedido, además de js/modal.js (nuevo), assets/img/exito.svg (nuevo), reglas nuevas al final de css/styles.css y las etiquetas <script> en views/pedidos.html, views/pedidos-ingresados.html y views/dashboard.html. No modificó js/layout.js, js/auth.js, js/auth-guard.js ni js/app.js.

- data.js: window.Datos con las 8 funciones del contrato, 12 productos y 5 pedidos de prueba, resiembra ante datos corruptos y funcionamiento en memoria si localStorage no está disponible.
- validaciones.js: window.Validaciones con las validaciones de los campos, formatearCLP, normalizar y contiene.
- modal.js: window.Modal con los tipos error, exito, aviso y confirmar, control de foco y teclado.
- styles.css: tokens nuevos, clases .boton y variantes, .modal--exito, .modal--aviso y una media query para 375 px.

### Problemas detectados al probarlo
- Con sesión admin, al abrir una vista restringida (modal "Acceso restringido") y en los modales del login, a 375 px y 320 px el botón "Volver" pasó de 120 px a ocupar todo el ancho del modal, y cambió el espaciado lateral. La media query nueva de styles.css era global y afectaba a los modales de auth.js y auth-guard.js, que no debían cambiar (CP17).
- Si un callback de Modal.mostrar (alAceptar o alCancelar) lanza un error, alCerrar no se ejecuta y el foco no vuelve al elemento que abrió el modal.
- El resto de los casos (CP01 a CP16 y CP18) dio el resultado esperado, sin errores en consola.

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1  | La media query de 375px afectaba a los modales del login y de "Acceso restringido"|css/styles.css |Se acotaron las reglas con .modal:has(.boton) y se quitó el max-height del .modal |Esos modales usan .modal__volver, no .boton, y debían quedar iguales. El max-heigth no tenia overflow y desbordaría al fondo |
| 2  | Un error en un callback saltaba alCerrar y la restauración del foco| js/modal.js| En cerrar() los callbacks se dejaron con un try/finally anidados| alCerrar y el foco siempre deben ejecutarse, aunque falle un callback|

Nota: por un error de orden, el código generado por la IA y las correcciones manuales quedaron en un mismo commit. Las correcciones 1 y 2 de la tabla se aplicaron sobre el código original de Copilot antes de ese commit.

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P4-CPxx-nombre.png`. Una misma captura de la consola puede cubrir varios casos seguidos.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Verificación | Positivo | 4 y 5 | En la consola de `pedidos.html`: `Datos.listarProductos().length` | 12 productos; el 3004 tiene cantidad 0 y estado Deshabilitado | Devolvió 12 productos; el 3004 tiene cantidad 0 y estado Deshabilitado. Captura `P4-CP01-CP05-consola-datos.png` | Sí |
| CP02 | Verificación | Positivo | 4 | `Datos.listarProductosPedibles().length` y buscar el 3004 en ese resultado | 11 productos; el 3004 (Aceite Vegetal 900ml) no aparece | Devolvió 11 y la búsqueda del 3004 dio false. Captura `P4-CP01-CP05-consola-datos.png` | Sí |
| CP03 | Verificación | Positivo | 5 | `Datos.listarPedidos().map(p => p.total)` y comparar con `Datos.calcularTotal(p.detalle)` de cada pedido | 5 pedidos (1001 a 1005) con totales 6900, 8400, 22100, 15990 y 12750, y calcularTotal coincide con cada total | Los 5 pedidos con totales 6900, 8400, 22100, 15990 y 12750; `calcularTotal` coincide en todos. Captura `P4-CP01-CP05-consola-datos.png` | Sí |
| CP04 | Validación | Límite | 4 y 5 | Escribir `localStorage.setItem('ms_pedidos', '{{')` en la consola y recargar `pedidos.html` | La página carga sin errores y `Datos.listarPedidos()` devuelve de nuevo los 5 pedidos de prueba | Con `ms_pedidos` en `'{{'`, `Datos.listarPedidos().length` devolvió 5. Captura `P4-CP01-CP05-consola-datos.png` | Sí |
| CP05 | Verificación | Positivo | 4 y 5 | `Datos.guardarPedido({numero:null, nombre:'Prueba', run:'1.111.111-1', telefono:'+56912345678', correo:'a@b.cl', direccion:'Calle 1', detalle:[]})`, luego `Datos.eliminarPedido(1006)` y `Datos.restablecer()` | El pedido nuevo recibe el número 1006 (6 pedidos); eliminarPedido devuelve true y quedan 5; restablecer deja los datos de prueba | El pedido nuevo recibió el 1006 (6 pedidos); `eliminarPedido` devolvió true y quedaron 5; tras `restablecer()` hay 5 pedidos. Captura `P4-CP01-CP05-consola-datos.png` | Sí |
| CP06 | Verificación | Positivo | 4 | `Validaciones.run('12.345.678-K')`, `run('12345678-K')` y `run('12.345.678-k')` | El primero es válido; los otros dos devuelven valido false con el mensaje "RUN inválido. Formato esperado: 12.345.678-K" | El primero es válido; los otros dos devolvieron valido false con ese mensaje. Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP07 | Verificación | Límite | 4 | `Validaciones.telefono('+56987654321')`, `telefono('987654321')` y `telefono('+5698765432101234')` | Solo el primero es válido; los otros devuelven "Teléfono inválido. Formato esperado: +56987654321" | Solo el primero es válido; los otros dos devolvieron "Teléfono inválido. Formato esperado: +56987654321". Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP08 | Verificación | Límite | 4 | `Validaciones.correo('maria@correo.cl')` y `correo('maria@correo')` | El primero es válido; el segundo devuelve "Correo inválido. Formato esperado: nombre@apellido.cl" | El primero es válido; el segundo devolvió "Correo inválido. Formato esperado: nombre@apellido.cl". Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP09 | Verificación | Límite | 4 | `Validaciones.nombre('María Pérez')`, `nombre('Ana123')` y `nombre('a'.repeat(256))` | El primero es válido; el segundo devuelve el mensaje de nombre inválido y el tercero "Máximo 255 caracteres." | El primero es válido; el segundo devolvió "Nombre inválido. Use solo letras y espacios." y el tercero "Máximo 255 caracteres.". Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP10 | Verificación | Límite | 4 | `Validaciones.cantidad(1)`, `cantidad(100)`, `cantidad(0)`, `cantidad(101)`, `cantidad('2.5')` y `cantidad('abc')` | Solo 1 y 100 son válidos; los otros devuelven "Ingrese un número entre 1 y 100." | Solo 1 y 100 son válidos; 0, 101, '2.5' y 'abc' devolvieron "Ingrese un número entre 1 y 100.". Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP11 | Verificación | Positivo | 4 | `Validaciones.formatearCLP(1200)`, `formatearCLP(22100)` y `formatearCLP(0)` | Devuelve "$1.200", "$22.100" y "$0" | Devolvió "$1.200", "$22.100" y "$0". Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP12 | Verificación | Positivo | 4 | `Validaciones.contiene('Agua Cristal 2L','tal')`, `contiene('Azúcar Granulada 1kg','AZU')` y `contiene('Leche Entera 1L','tal')` | Devuelve true, true y false | Devolvió true, true y false. Captura `P4-CP06-CP12-consola-validaciones.png` | Sí |
| CP13 | Validación | Positivo | 4 | En `pedidos.html` ejecutar `Modal.mostrar({tipo:'error', titulo:'Campos obligatorios', mensaje:'Debe completar los campos obligatorios para continuar.'})` y repetir con los tipos exito, aviso y confirmar | Cada tipo se ve como MK_08 (error), MK_23 (éxito), MK_36 (aviso, título azul) y MK_09 (confirmar, con Cancelar y Confirmar); el ícono de éxito es una marca de verificación azul | Los 4 tipos se vieron como en los mockups. Captura solo del tipo confirmar: `P4-CP13-modal-confirmar.png` | Sí |
| CP14 | Validación | Límite | 4 | Con un modal "confirmar" abierto: ver el foco, hacer clic en la capa oscura, presionar Tab varias veces y Escape | El foco inicial está en Cancelar; Tab no sale del modal ni después del clic en la capa; Escape cierra como Cancelar; el modal no se cierra al hacer clic fuera | El foco inicial quedó en Cancelar; el clic en la capa no cerró el modal; Tab alternó solo entre Cancelar y Confirmar; Escape cerró como Cancelar. Sin captura | Sí |
| CP15 | Validación | Límite | 4 | Abrir un modal desde un botón con el teclado y cerrarlo con Escape | El foco vuelve al botón que abrió el modal | Al cerrar con Escape el foco volvió al botón de origen. Sin captura | Sí |
| CP16 | Validación | Límite | 4 | Modal "confirmar" a 375 y 320 px de ancho | El modal se adapta, no se corta ni genera scroll horizontal | A 375 y 320 px el modal se adaptó, los botones pasaron a columna y no hubo scroll horizontal. Sin captura | Sí |
| CP17 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/app.js` y probar login y acceso restringido | Sin cambios en los 4 archivos; el login y el modal "Acceso restringido" siguen funcionando igual | El diff salió vacío; el login y el modal "Acceso restringido" funcionan igual que antes, también a 375 y 320 px tras la corrección 1. Sin captura | Sí |
| CP18 | Verificación | Positivo | 4 y 5 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en `pedidos.html`, `pedidos-ingresados.html` y `dashboard.html` | 0 resultados y consola sin errores | 0 resultados en la búsqueda y consola sin errores en las 3 vistas. Sin captura | Sí |
---

## P5 - Vista Pedidos: formulario del cliente, validaciones y modales (RIU 4)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** [por asignar]
- **Hito / RIU:** Hito 3 / RIU 4
- **Origen:** prompt nuevo. Usa `js/data.js`, `js/validaciones.js` y `js/modal.js` del P4. Se alinea con los mockups MK_06, MK_08, MK_09, MK_23 y MK_26. La tabla Detalle Pedido queda para el P6; mientras no exista, el pedido se guarda con detalle vacío (es solo para probar).
- **Archivos afectados:** `views/pedidos.html`, `js/pedidos.js`, `css/styles.css` (solo reglas nuevas) y `assets/img/` (tarjeta-id.svg, telefono.svg, correo.svg, ubicacion.svg y ayuda.svg, nuevos). No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js` ni los módulos del P4.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en formularios accesibles (WCAG AA), validación en el cliente y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3, perfil user. Este prompt (P5) programa la vista Pedidos: el formulario con los datos del cliente, sus validaciones, los modales y los botones Borrar y Enviar. La tabla Detalle Pedido la programa el P6 en el mismo formulario; aquí solo se deja su lugar. Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- views/pedidos.html hoy solo tiene el <h1>Pedidos</h1> y un <div class="contenedor-vacio">. js/pedidos.js existe pero está vacío (0 bytes).

Módulos compartidos que entregó el P4 (ya existen; NO se reescriben ni se modifican):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

Contrato de la tabla Detalle Pedido (la entrega el P6 en js/pedido-detalle.js y puede NO existir todavía): window.PedidoDetalle con obtener() (arreglo de filas completas {cantidad, productoNumero, producto, valorUnitario, valorVenta}), validar() (devuelve {valido: boolean, sinProductos: boolean, filasIncompletas: number} y resalta las filas con error), limpiar() (deja 5 filas en blanco), cargar(detalle) (carga filas y completa hasta 5) y total() (número). Si window.PedidoDetalle no existe, el formulario trata el detalle como un arreglo vacío y no marca error por el detalle.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 4, Vista Pedidos: formulario accesible mediante la pestaña Pedidos. Campos: Nombre completo (solo texto, máximo 255 caracteres); RUN (alfanumérico, máximo 255 caracteres, formato con puntos, guión y dígito verificador, en caso de K debe ser en mayúscula, ejemplo 12.345.678-K); Teléfono (numérico, máximo 12 dígitos, formato CÓDIGO PAÍS + NÚMERO, ejemplo +56987654321); Correo electrónico (formato CORREO + @ + DOMINIO + . + EXTENSIÓN, ejemplo nombre@apellido.cl); Dirección (alfanumérico, máximo 255 caracteres); tabla Detalle pedido; botones al final: Borrar (con modal de confirmación) y Enviar.
- RIU 4, acciones: los campos son todos obligatorios; si el usuario hace clic en Enviar, debe mostrar un modal indicando error y destacar el o los campos no completados.
- RIU 9: el perfil user solo ve Home, Pedidos y Pedidos Ingresados.

Mockups de referencia:
- MK_06 (Pedidos vacío): título "Pedidos" y debajo "* Campos obligatorios". Los campos van en dos columnas: fila 1 con Nombre completo * (izquierda) y RUN * con un ícono de ayuda (?) (derecha); fila 2 con Teléfono * con (?) y Correo electrónico * con (?); fila 3 con Dirección * a todo el ancho. Después va el subtítulo "Detalle Pedido" (la tabla es del P6) y, al final a la derecha, los botones Borrar (rojo) y Enviar (azul). Cada campo tiene un ícono a la izquierda (persona, tarjeta de identidad, teléfono, sobre, ubicación) y un ejemplo en el placeholder.
- MK_08 (modal "Campos obligatorios"): ícono de alerta, título "Campos obligatorios", mensaje "Debe completar los campos obligatorios para continuar." y botón azul "Aceptar". Detrás, los campos vacíos con borde rojo.
- MK_09 (modal "Vaciar formulario"): mensaje "¿Desea vaciar los campos?" con los botones Cancelar y Confirmar.
- MK_23 (modal de éxito): "Pedido enviado" y "Pedido N° 1006 enviado con éxito." con botón azul "Aceptar".
- MK_26 (errores de formato): el campo con error lleva borde rojo y un ícono de alerta dentro, a la derecha; debajo, un texto rojo con un ícono de alerta pequeño, por ejemplo "Teléfono inválido. Formato esperado: +56987654321". Sobre el RUN se muestra un recuadro azul "Formato esperado: 12.345.678-K" (es el tooltip del ícono de ayuda).

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa el formulario de la vista Pedidos. No modifiques js/layout.js, js/auth.js, js/auth-guard.js ni los módulos compartidos del P4. No programes la tabla Detalle Pedido (P6), la vista Pedidos Ingresados (P7) ni la edición de pedidos (P8). Usa window.Datos, window.Validaciones y window.Modal; no repitas sus reglas ni sus textos. Cumple estas condiciones verificables:

1. Estructura de views/pedidos.html (completo):
- Se mantienen: <body data-raiz="../" data-vista="pedidos">, el <header id="app-header">, el <footer id="app-footer"> y el script de auth-guard.js en el <head>. Al final del <body> se mantienen layout.js, auth.js, data.js, validaciones.js y modal.js (en ese orden) y se agrega pedidos.js al final.
- Dentro de <main id="contenido" class="contenido-principal">: <h1 id="titulo-pedidos" tabindex="-1">Pedidos</h1>, <p class="login__nota">* Campos obligatorios</p> y un <form id="form-pedido" novalidate>.
- Dentro del formulario: los 5 campos; después <section aria-labelledby="titulo-detalle"> con <h2 id="titulo-detalle">Detalle Pedido</h2> y un <div id="detalle-pedido"></div> vacío (el P6 lo llena); por último <div class="pedido-acciones"> con <button type="button" id="btn-borrar" class="boton boton--rojo">Borrar</button> y <button type="submit" id="btn-enviar" class="boton boton--azul">Enviar</button>, alineados a la derecha.

2. Campos (cada uno con <label for>, un ícono, el <input> y un <p> de error con aria-live="polite", reutilizando las clases .login__campo, .login__entrada y .login__error sin renombrarlas):
- #nombre: etiqueta "Nombre completo *", ícono usuario.svg, type="text", maxlength="255", autocomplete="name", placeholder "Ej.: María Pérez".
- #run: etiqueta "RUN *" con un botón de ayuda (?), type="text", maxlength="12", placeholder "Ej.: 12.345.678-K".
- #telefono: etiqueta "Teléfono *" con (?), type="text" con inputmode="numeric" y autocomplete="tel", maxlength="13" (el signo + y hasta 12 dígitos), placeholder "Ej.: +56987654321".
- #correo: etiqueta "Correo electrónico *" con (?), type="text" con inputmode="email" y autocomplete="email", maxlength="255", placeholder "Ej.: nombre@apellido.cl".
- #direccion: etiqueta "Dirección *", type="text", maxlength="255", autocomplete="street-address", placeholder "Ej.: Av. Libertad 123".
- Íconos nuevos en assets/img/ (24 × 24, trazo azul #0057B8, mismo estilo de alerta.svg): tarjeta-id.svg (RUN), telefono.svg, correo.svg, ubicacion.svg y ayuda.svg (círculo con signo de interrogación). El de nombre es usuario.svg, que ya existe.
- Los placeholders usan el color --texto-secundario, igual que el login.

3. Escritura en los campos (filtros mientras el usuario escribe):
- Nombre: no deja escribir dígitos ni símbolos; solo letras (con tildes, ñ y ü) y espacios.
- RUN: convierte la k minúscula en K mayúscula y solo acepta dígitos, puntos, guión y K.
- Teléfono: solo acepta dígitos y un signo + únicamente al inicio.
- Los filtros se hacen quitando los caracteres no permitidos del valor, sin impedir que se pegue texto (se limpia al pegar).

4. Validación de formato (reutiliza Validaciones.nombre, run, telefono, correo y direccion):
- Se valida al salir del campo (evento blur) y otra vez al enviar. Un campo vacío no muestra error al salir de él; solo se marca al enviar.
- Con error: el contenedor del campo recibe una clase de error (por ejemplo .login__entrada--error, con borde rojo --rojo y un ícono de alerta a la derecha dentro del campo), el input lleva aria-invalid="true" y aria-describedby apuntando al <p> de error, y el <p> muestra el mensaje que devolvió Validaciones, en rojo y con el ícono alerta.svg pequeño a la izquierda del texto (MK_26).
- En cuanto el valor pasa a ser válido (al escribir), el error se quita solo, y también aria-invalid y la clase de error.

5. Íconos de ayuda (?):
- Son <button type="button"> con aria-label ("Ayuda sobre el RUN", "Ayuda sobre el teléfono" y "Ayuda sobre el correo electrónico") y aria-describedby apuntando a su tooltip.
- El tooltip es un recuadro azul (#0057B8, texto blanco) con role="tooltip": "Formato esperado: 12.345.678-K" (RUN), "Formato esperado: +56987654321" (teléfono) y "Formato esperado: nombre@apellido.cl" (correo). Aparece al pasar el mouse y al enfocar el botón con el teclado, y desaparece al salir. Se hace con CSS (:hover y :focus-visible); no uses JavaScript para esto.

6. Botón Enviar (evento submit del formulario; pulsar Enter en un campo también lo dispara):
- Primero se detecta qué campos están vacíos (después de quitar los espacios del inicio y del final). Si el detalle existe (window.PedidoDetalle), se llama a PedidoDetalle.validar().
- Si hay campos vacíos o PedidoDetalle.validar() indica que no hay productos o que hay filas incompletas: marca esos campos vacíos con el error (borde rojo y el texto "Campo obligatorio.") y muestra Modal.mostrar({tipo: "error", titulo: "Campos obligatorios", mensaje: "Debe completar los campos obligatorios para continuar.", textoAceptar: "Aceptar"}). Al cerrar el modal, el foco va al primer campo con error.
- Si no hay campos vacíos pero sí errores de formato: no se abre el modal; se muestran los errores en línea y el foco va al primer campo con error. Nunca se guarda un pedido con errores.
- Si todo es válido: arma el pedido {numero: null, nombre, run, telefono, correo, direccion, detalle, total} (texto sin espacios sobrantes; detalle = PedidoDetalle.obtener() si existe, o un arreglo vacío si no existe; total = Datos.calcularTotal(detalle)), lo guarda con Datos.guardarPedido y muestra Modal.mostrar({tipo: "exito", titulo: "Pedido enviado", mensaje: "Pedido N° [número asignado] enviado con éxito."}). Al pulsar Aceptar (o Escape) se vacía el formulario sin pedir confirmación y el foco vuelve al campo Nombre.

7. Botón Borrar:
- Abre Modal.mostrar({tipo: "confirmar", titulo: "Vaciar formulario", mensaje: "¿Desea vaciar los campos?"}). Con Cancelar o Escape no se cambia nada. Con Confirmar se vacían los 5 campos, se quitan todos los errores y se llama a PedidoDetalle.limpiar() si existe. El foco vuelve al campo Nombre.

8. Organización de js/pedidos.js (completo): una función autoejecutable con "use strict" que solo actúa si data-vista es "pedidos". Funciones pequeñas con nombres claros (por ejemplo leerFormulario, limpiarFormulario, marcarError, quitarError, validarFormulario). Expón window.FormularioPedido = {leer, limpiar, validar} para que el P8 pueda reutilizarlas sin duplicar código.

9. css/styles.css: agrega solo las reglas nuevas necesarias (clases que empiecen con .form-pedido, .pedido-, .campo-ayuda, .tooltip- y el modificador de error de los campos): rejilla de dos columnas con espacio entre ellas; el campo Dirección ocupa las dos columnas; .pedido-acciones alineado a la derecha con 16 px entre botones; el título "Detalle Pedido" con 20 px y peso 600 (igual que los encabezados). No modifiques las reglas de .login__*.

10. Accesibilidad y responsivo:
- Orden de tabulación lógico: Nombre, RUN, (?) del RUN, Teléfono, (?), Correo, (?), Dirección, Borrar y Enviar. Contraste mínimo WCAG AA. Los errores no dependen solo del color: llevan texto e ícono.
- En pantallas de hasta 700 px los campos pasan a una sola columna y los botones pueden apilarse. Sin scroll horizontal en anchos de 375 y 320 px.

11. Verificación (no programes nada nuevo): confirma en la checklist que el menú del perfil user, el botón Cerrar sesión y el bloqueo para el perfil admin (que ve "Acceso restringido" al abrir pedidos.html) siguen funcionando sin cambios.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo reutilizas las clases .login__campo, .login__entrada y .login__error y qué modificador nuevo agregas para el estado de error.
2. Cómo implementas los filtros de escritura sin romper el pegado de texto ni el cursor.
3. En qué orden revisas campos vacíos, errores de formato y detalle al pulsar Enviar, y por qué.
4. Cómo dejas conectado el detalle (window.PedidoDetalle) sin que el formulario falle mientras el P6 no exista.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- views/pedidos.html (completo).
- js/pedidos.js (completo).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
- assets/img/tarjeta-id.svg, telefono.svg, correo.svg, ubicacion.svg y ayuda.svg (completos).
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos (por ejemplo, qué pasa con el detalle mientras no exista el P6, y cómo volver a los datos de prueba con Datos.restablecer() después de probar).
(b) Una checklist que verifique una por una las 11 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | | | | |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P5-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Positivo | 4 y 9 | Entrar como `user` y abrir Pedidos | Se ve el formulario de MK_06: título "Pedidos", "* Campos obligatorios", 5 campos con etiqueta con asterisco, ícono y ejemplo "Ej.:", y los botones Borrar (rojo) y Enviar (azul) abajo a la derecha | | |
| CP02 | Validación | Negativo | 4 | Con el formulario vacío, presionar Enviar | Modal "Campos obligatorios" (MK_08); los 5 campos quedan con borde rojo y "Campo obligatorio."; al cerrar, el foco va a Nombre | | |
| CP03 | Validación | Negativo | 4 | Completar solo Nombre y RUN válidos y presionar Enviar | Modal "Campos obligatorios" y solo Teléfono, Correo y Dirección quedan resaltados | | |
| CP04 | Validación | Límite | 4 | Escribir `12345678-K` en RUN y salir del campo | Error en línea: "RUN inválido. Formato esperado: 12.345.678-K", con borde rojo y aria-invalid | | |
| CP05 | Validación | Límite | 4 | Escribir `12.345.678-k` en RUN | La k se convierte sola en K mayúscula y el valor queda válido | | |
| CP06 | Validación | Límite | 4 | Escribir `abc987` en Teléfono; luego `987654321` y salir del campo | Solo quedan los dígitos (`987`); con `987654321` aparece "Teléfono inválido. Formato esperado: +56987654321" (MK_26) | | |
| CP07 | Validación | Límite | 4 | Escribir más de 12 dígitos en Teléfono | No deja escribir más allá del signo + y 12 dígitos | | |
| CP08 | Validación | Límite | 4 | Escribir `maria@correo` en Correo y salir del campo | Error: "Correo inválido. Formato esperado: nombre@apellido.cl" | | |
| CP09 | Validación | Límite | 4 | Escribir `Ana123` en Nombre | Los dígitos no se escriben; queda `Ana` | | |
| CP10 | Validación | Límite | 4 | Pegar 300 caracteres en Nombre y en Dirección | Cada campo se corta en 255 caracteres | | |
| CP11 | Validación | Positivo | 4 | Pasar el mouse y luego enfocar con Tab el (?) de RUN, Teléfono y Correo | Aparece el recuadro azul "Formato esperado: ..." con el ejemplo de cada campo, y desaparece al salir | | |
| CP12 | Validación | Positivo | 4 | Corregir un campo que tenía error escribiendo un valor válido | El error, el borde rojo y aria-invalid desaparecen al escribir | | |
| CP13 | Validación | Positivo | 4 | Completar todos los campos con datos válidos y presionar Enviar (sin la tabla del P6) | Modal "Pedido enviado": "Pedido N° 1006 enviado con éxito." (MK_23) y `Datos.listarPedidos().length` es 6 | | |
| CP14 | Validación | Positivo | 4 | Presionar Aceptar en el modal de éxito | El formulario queda vacío, sin errores, y el foco vuelve a Nombre | | |
| CP15 | Validación | Positivo | 4 | Con datos escritos, presionar Borrar, luego Cancelar y de nuevo Borrar y Confirmar | Modal "Vaciar formulario" (MK_09); Cancelar no borra nada; Confirmar vacía todo y quita los errores | | |
| CP16 | Validación | Límite | 4 | Navegar con teclado: Tab por todos los campos, abrir un modal, usar Tab y Escape | Orden lógico Nombre, RUN, (?), Teléfono, (?), Correo, (?), Dirección, Borrar, Enviar; dentro del modal Tab no sale y Escape lo cierra | | |
| CP17 | Validación | Límite | 4 | Probar el formulario a 375 y 320 px de ancho | Una sola columna, sin scroll horizontal, botones visibles | | |
| CP18 | Validación | Negativo | 10 | Iniciar sesión como `admin` y abrir `views/pedidos.html` por URL | Modal "Acceso restringido" en el dashboard (regresión de P3-b) | | |
| CP19 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/data.js js/validaciones.js js/modal.js` | Sin cambios en los 6 archivos | | |
| CP20 | Verificación | Positivo | 4 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en Pedidos | 0 resultados y consola sin errores | | |

---

## P6 - Vista Pedidos: Detalle Pedido con buscador, cálculos en CLP, filas y total (RIU 4)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** [por asignar]
- **Hito / RIU:** Hito 3 / RIU 4 (y la regla de cantidad cero del RIU 6)
- **Origen:** prompt nuevo. Continúa el P5 en la misma vista: llena el contenedor `#detalle-pedido`. Se alinea con los mockups MK_06, MK_07, MK_28, MK_35, MK_36 y MK_36b. Interpreta MK_35 así: una fila con cantidad 0 queda en gris, no suma y su producto no se ofrece en las otras filas.
- **Archivos afectados:** `js/pedido-detalle.js` (nuevo), `views/pedidos.html` (solo la etiqueta `<script>`), `css/styles.css` (solo reglas nuevas) y `assets/img/` (flecha-abajo.svg y flecha-arriba.svg, nuevos). No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js` ni los módulos del P4; `js/pedidos.js` solo si se necesita un ajuste mínimo, que se registra.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en tablas editables, selectores desplegables con buscador accesibles (patrón combobox/listbox de WAI-ARIA), cálculos con moneda (peso chileno) y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3, perfil user. Este prompt (P6) programa la tabla Detalle Pedido dentro de la vista Pedidos: buscador de productos desde 3 letras, cálculos en pesos chilenos, total y las reglas de agregar y eliminar fila. El formulario del cliente y los botones Borrar y Enviar ya existen (P5). Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- views/pedidos.html (P5) ya contiene <form id="form-pedido"> con los 5 campos, <section aria-labelledby="titulo-detalle"> con <h2 id="titulo-detalle">Detalle Pedido</h2> y un <div id="detalle-pedido"></div> VACÍO (aquí va todo lo de este prompt), y luego <div class="pedido-acciones"> con los botones Borrar y Enviar. Al final del <body> están layout.js, auth.js, data.js, validaciones.js, modal.js y pedidos.js.
- js/pedidos.js (P5) ya valida el formulario, guarda el pedido y vacía el formulario; llama a window.PedidoDetalle (obtener, validar, limpiar) solo si existe. Este prompt crea ese objeto.

Módulos compartidos que entregó el P4 (ya existen; NO se reescriben ni se modifican):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

Contrato que debe cumplir este prompt (lo usan P5 y P8): window.PedidoDetalle con
- obtener(): arreglo de las filas completas y activas, cada una {cantidad, productoNumero, producto, valorUnitario, valorVenta}.
- validar(): devuelve {valido, sinProductos, filasIncompletas}; resalta las filas con error.
- limpiar(): deja la tabla con 5 filas en blanco y el Total en $0.
- cargar(detalle): carga las filas de un pedido y completa con filas en blanco hasta tener al menos 5 y siempre al menos 1 fila en blanco.
- total(): suma de valorVenta de las filas completas y activas.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 4, Detalle pedido: tabla con al menos cinco filas y cuatro columnas (Cantidad, Producto, Valor unitario, Valor venta). Dos columnas completables y dos deshabilitadas. Incluye dos botones en la parte superior izquierda de la tabla (agregar fila y eliminar fila). Cantidad: campo numérico, valor máximo no debe superar 100. Producto: selector desplegable con buscador; al ingresar 3 letras ya debe arrojar resultados, y las coincidencias deben ser palabras que contengan estas 3 letras de manera consecutiva (ejemplo: "tal" → "tallarines", "tallo de apio", etc.). Total: campo numérico deshabilitado.
- RIU 4, acciones: al ingresar cantidad y producto, los campos valor unitario y valor venta deben mostrarse y calcularse automáticamente con valores monetarios (peso chileno); Valor Venta = Cantidad × Valor Unitario. Si un producto tiene cantidad igual a cero queda deshabilitado automáticamente y no debe cargarse en el selector. Reglas de los botones: los productos ya ingresados no pueden eliminarse al eliminar filas; como mínimo debe haber una fila en blanco cuando se hace clic en eliminar fila; si se llega a más de 10 productos, la tabla se ajusta y se carga un scroll para desplazarse arriba o abajo. El campo Total calcula la suma de Valor Venta de todos los productos ingresados.

Mockups de referencia:
- MK_06: tabla vacía con 5 filas. Botones "Agregar fila" y "Eliminar fila" (azules, pegados) arriba a la izquierda de la tabla. Encabezado azul con "Cantidad *" y debajo "Máx. 100", "Producto *", "Valor Unitario" y "Valor Venta" (estas dos alineadas a la derecha). Las celdas de Valor Unitario y Valor Venta tienen fondo gris claro. Debajo de la tabla, a la derecha, la etiqueta "Total" y un campo gris claro con el valor (texto azul, alineado a la derecha).
- MK_07: filas completas (por ejemplo 2 · Tallarines 400g · $1.200 · $2.400 y 3 · Arroz Grado 1 1kg · $1.500 · $4.500), con una flecha hacia abajo a la derecha del producto. El selector abierto en una fila vacía muestra una caja con borde azul: arriba el campo de búsqueda con el texto escrito (por ejemplo "tal") y una flecha hacia arriba, debajo la lista de resultados (la primera opción resaltada en celeste #CCD8E8) y al final un texto gris "1 resultado".
- MK_35: el mismo selector con "tal" muestra solo el texto "0 resultados". Una fila con Cantidad 0 aparece completa en gris (cantidad, producto y valores en gris claro y la flecha apagada).
- MK_28: tabla con más de 10 productos y una barra de scroll vertical azul a la derecha; el encabezado se mantiene visible.
- MK_36: modal informativo "No se puede eliminar la fila" y "Las filas con un producto cargado no se pueden eliminar. Solo se pueden eliminar filas en blanco."; las filas con producto aparecen resaltadas con borde rojo detrás del modal.
- MK_36b: modal informativo "Debe quedar al menos una fila en blanco" y "No es posible eliminar más filas. La tabla debe mantener como mínimo una fila en blanco disponible."

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa la tabla Detalle Pedido. No modifiques js/layout.js, js/auth.js, js/auth-guard.js ni los módulos compartidos del P4. Si el P5 necesita un ajuste mínimo en js/pedidos.js, indícalo aparte y no lo reescribas. No programes el formulario del cliente (P5), la vista Pedidos Ingresados (P7) ni la edición (P8). Usa window.Datos, window.Validaciones y window.Modal. Cumple estas condiciones verificables:

1. Archivo nuevo js/pedido-detalle.js. Función autoejecutable con "use strict" que solo actúa si data-vista es "pedidos". Construye con createElement dentro de #detalle-pedido: una barra con los botones "Agregar fila" y "Eliminar fila" (type="button", clase .boton .boton--azul, pegados arriba a la izquierda), un contenedor con scroll que envuelve la tabla, y debajo, a la derecha, la etiqueta "Total" y el campo de total. Expón window.PedidoDetalle con los 5 métodos del contrato. En views/pedidos.html agrega la etiqueta <script src="../js/pedido-detalle.js"></script> antes de pedidos.js (entrega el archivo completo).

2. Tabla (<table>, con <caption> oculto visualmente que diga "Detalle del pedido", <thead> y <tbody>):
- Encabezado con 4 columnas: "Cantidad *" con "Máx. 100" debajo, "Producto *", "Valor Unitario" y "Valor Venta" (estas dos con el texto alineado a la derecha). Fondo azul #0057B8 y texto blanco.
- Al cargar la vista y con limpiar(): 5 filas en blanco. Cada fila tiene alto fijo de 44 px.
- Columna Cantidad: <input type="text" inputmode="numeric" maxlength="3"> con aria-label "Cantidad, fila N", texto alineado a la derecha. Solo deja escribir dígitos.
- Columna Producto: el selector con buscador (condición 3).
- Columnas Valor Unitario y Valor Venta: celdas NO editables (no son campos de entrada), con fondo --gris-calculado, texto azul y alineado a la derecha, en formato Validaciones.formatearCLP. Usa los tokens existentes y los dos nuevos del P4 (--gris-calculado y --borde-tabla para las líneas).
- Campo Total: un <output> o <input disabled> con la etiqueta "Total", fondo --gris-calculado, texto azul alineado a la derecha, siempre con formato CLP (por ejemplo "$6.900"); empieza en "$0".

3. Selector de producto con buscador (patrón combobox):
- Cada celda de producto muestra el producto elegido (o vacío) con una flecha hacia abajo a la derecha (ícono nuevo assets/img/flecha-abajo.svg y flecha-arriba.svg, 16 × 16, azul). Al hacer clic o pulsar Enter o la flecha hacia abajo sobre la celda, se abre una caja con borde azul de 2 px bajo la celda: arriba un <input type="text" role="combobox" aria-expanded="true" aria-controls="[id de la lista]" aria-autocomplete="list" aria-label="Buscar producto, fila N"> para buscar y una flecha hacia arriba; debajo una lista <ul role="listbox"> con <li role="option"> y al final un texto gris con el número de resultados.
- Los resultados aparecen solo cuando el texto de búsqueda tiene 3 o más letras (después de quitar espacios). Con menos de 3 letras la lista queda vacía y el texto gris dice "Escriba al menos 3 letras".
- Una opción coincide si Validaciones.contiene(nombreDelProducto, texto) es true: el texto debe aparecer de forma consecutiva en cualquier parte del nombre, no solo al inicio, sin distinguir mayúsculas ni tildes. Ejemplo con los datos de prueba: "tal" devuelve exactamente "Tallarines 400g", "Tallo de Apio" y "Agua Cristal 2L" (en ese orden, el del catálogo). "Aceite Vegetal 900ml" también contiene "tal", pero NO debe aparecer porque está deshabilitado.
- El texto del pie dice "N resultados" ("1 resultado" en singular y "0 resultados" cuando no hay coincidencias).
- Las opciones salen SOLO de Datos.listarProductosPedibles() (productos habilitados con cantidad mayor que 0) menos los productos que estén en una fila con cantidad 0 en la misma tabla (condición 6). Se permite repetir un mismo producto en filas distintas (el RIU no lo prohíbe).
- Teclado: Flecha abajo y arriba mueven la opción resaltada (aria-activedescendant); Enter elige la opción resaltada; Escape cierra sin elegir y devuelve el foco a la celda; Tab cierra la caja. Con el mouse, clic en una opción la elige. La primera opción queda resaltada (fondo --campo).
- Al elegir un producto se cierra la caja, la celda muestra su nombre y el foco vuelve a la celda. Solo puede haber una caja abierta a la vez, y se cierra al hacer clic fuera de ella. La caja se abre sobre la tabla sin mover las demás filas (posición absoluta dentro de un contenedor relativo) y no queda cortada por el scroll de la tabla.

4. Cálculos en pesos chilenos:
- Al elegir un producto, la celda Valor Unitario muestra el valor del producto con formato CLP. Cuando además la cantidad es válida (Validaciones.cantidad), la celda Valor Venta muestra cantidad × valor unitario. Si falta alguno de los dos, la celda Valor Venta queda vacía.
- Cualquier cambio de cantidad o de producto recalcula la fila y el Total al instante. Si se borra el producto, las dos celdas calculadas quedan vacías.
- Total = suma de Valor Venta de todas las filas completas y activas.

5. Cantidad máxima y errores de cantidad:
- Si la cantidad escrita no es válida (más de 100, o vacía en una fila que ya tiene producto) la celda queda con borde rojo, aria-invalid="true" y, debajo del campo, un texto rojo corto con el mensaje de Validaciones.cantidad ("Ingrese un número entre 1 y 100."); mientras esté inválida, Valor Venta queda vacío y la fila no suma al Total. El error se quita solo al corregir. Una cantidad de 100 es válida y de 101 no.

6. Cantidad cero (RIU 4 y MK_35):
- Si el usuario escribe 0 en Cantidad, la fila queda deshabilitada: el selector de producto no se puede abrir, y la fila se ve en gris (texto en gris claro, flecha apagada) como en MK_35. La celda Valor Venta muestra "$0" en gris y la fila NO suma al Total ni sale en obtener().
- El campo Cantidad de esa fila sigue editable para que el usuario pueda corregirlo: al escribir un valor de 1 a 100 la fila se reactiva y vuelve a calcular.
- Mientras una fila tenga cantidad 0 y un producto elegido, ese producto no aparece como opción en el selector de las demás filas (esto reproduce MK_35, donde "tal" da "0 resultados").

7. Botón "Agregar fila": agrega una fila en blanco al final de la tabla, pasa el foco al campo Cantidad de esa fila y la lleva a la vista dentro del scroll.

8. Botón "Eliminar fila" (una fila en blanco es la que no tiene ni cantidad ni producto):
- Si hay 2 o más filas en blanco: elimina la última fila en blanco de la tabla.
- Si hay exactamente 1 fila en blanco: no elimina nada y muestra Modal.mostrar({tipo: "aviso", titulo: "Debe quedar al menos una fila en blanco", mensaje: "No es posible eliminar más filas. La tabla debe mantener como mínimo una fila en blanco disponible."}).
- Si no hay ninguna fila en blanco (todas tienen producto o cantidad): no elimina nada y muestra Modal.mostrar({tipo: "aviso", titulo: "No se puede eliminar la fila", mensaje: "Las filas con un producto cargado no se pueden eliminar. Solo se pueden eliminar filas en blanco."}) y mientras el modal está abierto las filas con datos se resaltan con borde rojo (se quita al cerrarlo, con alCerrar).
- Una fila con datos nunca se elimina con este botón. Al cerrar cualquiera de los dos modales el foco vuelve al botón "Eliminar fila".

9. Scroll con más de 10 filas: el contenedor de la tabla tiene una altura máxima equivalente a 10 filas más el encabezado y overflow-y: auto; con 11 o más filas aparece el scroll vertical dentro de la tabla (la página no crece), y el encabezado queda fijo arriba (position: sticky). Con menos de 11 filas no hay scroll. En pantallas angostas la tabla se desplaza horizontalmente solo dentro de su contenedor (la página nunca tiene scroll horizontal).

10. Métodos de window.PedidoDetalle:
- obtener(): devuelve solo las filas con producto elegido y cantidad válida de 1 a 100 (las de cantidad 0 o en blanco no salen). Cada una con cantidad (número), productoNumero, producto (nombre), valorUnitario y valorVenta (números).
- validar(): devuelve {valido, sinProductos, filasIncompletas}. sinProductos es true si obtener() está vacío. filasIncompletas cuenta las filas que tienen solo uno de los dos datos (cantidad o producto) o cantidad inválida; esas filas se resaltan con borde rojo y aria-invalid. valido es true solo si hay al menos un producto y ninguna fila incompleta. Una fila en blanco no es error.
- limpiar(): deja 5 filas en blanco, sin errores, y el Total en $0.
- cargar(detalle): vacía la tabla, carga una fila por cada línea del detalle (cantidad, producto y los valores guardados en la línea; valorUnitario y valorVenta se muestran con los valores de la línea, no con los actuales del catálogo) y agrega filas en blanco hasta tener al menos 5 filas y al menos 1 en blanco. Si el producto de una línea ya no está disponible en el selector, igual se muestra con su nombre.
- total(): el Total actual como número.

11. Integración con el formulario del P5 (no reescribas pedidos.js; solo si hace falta un ajuste mínimo para que funcione, indícalo): al pulsar Enviar, window.PedidoDetalle.validar() decide si se muestra el modal "Campos obligatorios"; al guardar, el pedido lleva detalle = obtener() y total = Datos.calcularTotal(detalle); y Borrar con confirmación llama a limpiar().

12. css/styles.css: agrega solo las reglas nuevas (clases que empiecen con .detalle-, .selector-producto y .tabla-detalle). Reutiliza .boton, .boton--azul, los tokens y el estilo de foco existente. Las celdas de cantidad y producto con fondo blanco y texto azul; el borde de las celdas con --borde-tabla; el foco de las celdas con el mismo anillo del resto del proyecto.

13. Accesibilidad y responsivo:
- Contraste mínimo WCAG AA (texto azul sobre --gris-calculado incluido). Cada campo y cada selector tiene un nombre accesible con el número de fila. Los errores llevan texto, no solo color.
- Sin scroll horizontal de la página en anchos de 375 y 320 px.

14. Verificación (no programes nada nuevo): confirma en la checklist que el formulario del P5 (validaciones, modal "Campos obligatorios", Borrar y Enviar) sigue funcionando igual.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo guardas el estado de cada fila (cantidad, producto elegido, estado de error y fila deshabilitada) y cómo recalculas una fila y el Total sin repetir código.
2. Cómo filtras las opciones del selector (productos pedibles, búsqueda desde 3 letras y exclusión de productos en filas con cantidad 0).
3. Cómo implementas el teclado del selector y cómo evitas que la caja abierta quede cortada por el scroll de la tabla.
4. Cómo decides qué hace "Eliminar fila" en cada uno de los tres casos.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- js/pedido-detalle.js (completo).
- views/pedidos.html (completo, con la etiqueta <script> nueva).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
- assets/img/flecha-abajo.svg y assets/img/flecha-arriba.svg (completos).
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos (por ejemplo, qué pasa con una fila cuyo producto ya no está disponible al cargar un pedido, y que se permite repetir producto en filas distintas).
(b) Una checklist que verifique una por una las 14 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | | | | |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P6-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Positivo | 4 | Entrar como `user` y abrir Pedidos | Debajo de "Detalle Pedido" hay Agregar fila y Eliminar fila arriba a la izquierda, una tabla con 5 filas en blanco y las columnas Cantidad * (Máx. 100), Producto *, Valor Unitario y Valor Venta, y el campo Total en $0 (MK_06) | | |
| CP02 | Validación | Positivo | 4 | Intentar escribir o enfocar para escribir en Valor Unitario, Valor Venta y Total | Las tres son celdas/campos no editables con fondo gris claro y texto azul | | |
| CP03 | Validación | Límite | 4 | Abrir el selector de una fila y escribir `ta` | No muestra opciones y el pie dice "Escriba al menos 3 letras" | | |
| CP04 | Validación | Positivo | 4 | Escribir `tal` en el buscador | Aparecen "Tallarines 400g", "Tallo de Apio" y "Agua Cristal 2L" (coincide en medio de la palabra) y el pie dice "3 resultados"; "Aceite Vegetal 900ml" no aparece (MK_07) | | |
| CP05 | Validación | Límite | 4 | Escribir `AZU` y luego `xyz` | `AZU` encuentra "Azúcar Granulada 1kg" (sin distinguir mayúsculas ni tildes, "1 resultado"); `xyz` muestra "0 resultados" | | |
| CP06 | Validación | Límite | 4 y 6 | Escribir `ace` en el buscador | "0 resultados": el Aceite Vegetal (cantidad 0, Deshabilitado) nunca se ofrece | | |
| CP07 | Validación | Positivo | 4 | Cantidad 2 y producto Tallarines 400g | Valor Unitario $1.200 y Valor Venta $2.400 | | |
| CP08 | Validación | Positivo | 4 | Cambiar la cantidad de esa fila a 3 | Valor Venta pasa a $3.600 y el Total se actualiza al instante | | |
| CP09 | Validación | Positivo | 4 | Fila 1: 2 × Tallarines 400g; fila 2: 3 × Arroz Grado 1 1kg | Valor Venta $2.400 y $4.500; Total $6.900 (MK_07) | | |
| CP10 | Validación | Límite | 4 | Escribir `abc`, luego `101` y luego `100` en Cantidad de una fila con producto | Las letras no se escriben; con `101` hay borde rojo, "Ingrese un número entre 1 y 100." y Valor Venta vacío; `100` es válido y calcula | | |
| CP11 | Validación | Límite | 4 y 6 | Fila con producto Tallarines 400g y cantidad `0`; luego buscar `tal` en otra fila | La fila queda en gris (MK_35), Valor Venta $0 en gris y no suma al Total; en la otra fila `tal` ya no ofrece Tallarines; al cambiar la cantidad a 2 la fila se reactiva | | |
| CP12 | Validación | Positivo | 4 | Presionar Agregar fila | Se agrega una fila en blanco al final y el foco queda en su Cantidad | | |
| CP13 | Validación | Positivo | 4 | Con 5 filas en blanco, presionar Eliminar fila | Queda una fila menos (4) | | |
| CP14 | Validación | Negativo | 4 | Dejar una sola fila en blanco (las demás con producto) y presionar Eliminar fila | Modal "Debe quedar al menos una fila en blanco" (MK_36b) y no se elimina nada | | |
| CP15 | Validación | Negativo | 4 | Completar todas las filas con productos y presionar Eliminar fila | Modal "No se puede eliminar la fila" (MK_36); las filas con datos se resaltan con borde rojo mientras está abierto y no se elimina nada | | |
| CP16 | Validación | Límite | 4 | Llegar a 11 o más filas | La tabla muestra scroll vertical interno con el encabezado fijo (MK_28) y la página no crece; con 10 filas o menos no hay scroll | | |
| CP17 | Validación | Negativo | 4 | Fila con solo cantidad (sin producto) y otra con solo producto (sin cantidad); presionar Enviar | Las dos filas se resaltan y aparece el modal "Campos obligatorios" | | |
| CP18 | Validación | Positivo | 4 y 5 | Completar el formulario y 2 productos y presionar Enviar; luego `Datos.obtenerPedido(1006)` en la consola | Modal "Pedido enviado"; el pedido guardado tiene el detalle de las dos filas y el total correcto | | |
| CP19 | Validación | Positivo | 4 | Con datos en la tabla presionar Borrar y Confirmar | La tabla vuelve a 5 filas en blanco y el Total a $0 | | |
| CP20 | Validación | Límite | 4 | Usar solo teclado en el selector: Enter para abrir, flechas, Enter para elegir, Escape y Tab | Se puede abrir, moverse, elegir y cerrar solo con teclado; Escape devuelve el foco a la celda | | |
| CP21 | Validación | Límite | 4 | Probar la tabla a 375 y 320 px | La tabla se desplaza solo dentro de su contenedor; la página no tiene scroll horizontal | | |
| CP22 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/data.js js/validaciones.js js/modal.js` y `git diff js/pedidos.js` | Sin cambios en los 6 archivos; si `pedidos.js` cambió, el cambio es mínimo y está registrado | | |
| CP23 | Verificación | Positivo | 4 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en Pedidos | 0 resultados y consola sin errores | | |

---

## P7 - Vista Pedidos Ingresados: tabla, selección única y eliminar (RIU 5 y 9)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** [por asignar]
- **Hito / RIU:** Hito 3 / RIU 5 y RIU 9
- **Origen:** prompt nuevo. Lee los pedidos que guarda el P5 (con el detalle del P6) a través de `js/data.js`. Se alinea con MK_10, MK_11 y MK_12. El botón Editar solo navega a `pedidos.html?editar=[número]`; la carga del formulario es del P8.
- **Archivos afectados:** `views/pedidos-ingresados.html`, `js/pedidos-ingresados.js` (nuevo) y `css/styles.css` (solo reglas nuevas). No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js` ni los módulos del P4.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en tablas de datos con selección, accesibilidad web (WCAG AA) y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3, perfil user. Este prompt (P7) programa la vista Pedidos Ingresados: la tabla con los pedidos guardados, la selección de una sola fila y los botones Editar y Eliminar. Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- views/pedidos-ingresados.html hoy solo tiene el <h1>Pedidos Ingresados</h1> y un <div class="contenedor-vacio">; sus scripts al final son layout.js, auth.js, data.js, validaciones.js y modal.js. js/pedidos-ingresados.js no existe todavía.
- La vista Pedidos (P5 y P6) guarda los pedidos con Datos.guardarPedido; esta vista los lee con Datos.listarPedidos().

Módulos compartidos que entregó el P4 (ya existen; NO se reescriben ni se modifican):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 5, Vista Pedidos Ingresados: visualizar los datos ingresados en la vista Pedidos en una tabla con los campos NUMERO PEDIDO, NOMBRE COMPLETO, CORREO, TELEFONO y TOTAL. Esta vista solo se carga cuando el usuario se loga exitosamente; de lo contrario permanece oculta. Cada fila de la tabla debe tener una columna con un checkbox a la izquierda del campo NUMERO PEDIDO (permitiendo seleccionar solo una fila). Al final de la lista se agregan dos botones: Editar (carga los datos del pedido seleccionado en la vista Pedido para modificación) y Eliminar (muestra un mensaje de advertencia en un modal para confirmar la eliminación).
- RIU 5, acciones: el usuario podrá editar o eliminar un registro solo al hacer clic en el checkbox de una fila. El sistema prohibirá seleccionar dos filas o más simultáneamente. El sistema debe exigir al usuario que escoja o seleccione una fila antes de editar o eliminar.
- RIU 9: el perfil user solo ve Home, Pedidos y Pedidos Ingresados.

Mockups de referencia:
- MK_10 (sin selección): título "Pedidos Ingresados"; tabla con encabezado azul y columnas [casilla] · "Número Pedido" · "Nombre Completo" · "Correo" · "Teléfono" · "Total" (Total alineado a la derecha, en formato CLP). Debajo de la tabla el texto de ayuda gris "Seleccione un pedido para editar o eliminar". A la derecha, los botones Editar y Eliminar DESHABILITADOS (grises).
- MK_11 (con una fila seleccionada): la casilla marcada, la fila resaltada en celeste (#CCD8E8), y los botones Editar (azul) y Eliminar (rojo) habilitados.
- MK_12 (modal de eliminación): ícono de alerta, título "Eliminar pedido", mensaje "¿Está seguro de que desea eliminar el Pedido N° 1001 – María Pérez?" y botones Cancelar y Confirmar.

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa la vista Pedidos Ingresados. No modifiques js/layout.js, js/auth.js, js/auth-guard.js ni los módulos compartidos del P4. No programes la carga del pedido en el formulario (P8). Usa window.Datos, window.Validaciones y window.Modal. Cumple estas condiciones verificables:

1. views/pedidos-ingresados.html (completo): se mantienen <body data-raiz="../" data-vista="pedidos-ingresados">, el header, el footer, auth-guard.js en el <head> y los scripts layout.js, auth.js, data.js, validaciones.js y modal.js; se agrega pedidos-ingresados.js al final. Dentro de <main id="contenido" class="contenido-principal">: <h1 id="titulo-ingresados" tabindex="-1">Pedidos Ingresados</h1>, un contenedor con scroll horizontal propio (por si la pantalla es angosta) que envuelve la <table>, el texto de ayuda <p id="ayuda-seleccion"> y <div class="pedido-acciones"> con <button type="button" id="btn-editar" class="boton boton--azul" disabled>Editar</button> y <button type="button" id="btn-eliminar" class="boton boton--rojo" disabled>Eliminar</button>, alineados a la derecha.

2. Tabla (se arma con createElement en js/pedidos-ingresados.js, con <caption> oculto visualmente "Lista de pedidos ingresados", <thead> y <tbody>):
- Encabezado azul #0057B8 con texto blanco: una primera columna vacía para las casillas (con <th scope="col"> y texto oculto "Seleccionar") y "Número Pedido", "Nombre Completo", "Correo", "Teléfono" y "Total" (este último alineado a la derecha).
- Una fila por cada pedido de Datos.listarPedidos(), en orden ascendente por número. Cada fila tiene un <input type="checkbox"> con aria-label "Seleccionar pedido [número]" y las celdas con número, nombre, correo, teléfono y total con Validaciones.formatearCLP.
- Si no hay pedidos, la tabla muestra una sola fila con el texto "No hay pedidos ingresados." ocupando todas las columnas, y los botones quedan deshabilitados.
- Líneas de la tabla con --borde-tabla y la fila resaltada con --campo (tokens existentes).

3. Selección de una sola fila (RIU 5):
- La selección se hace solo con las casillas (no con un clic en la fila). Al marcar una casilla, cualquier otra que estuviera marcada se desmarca, de modo que nunca haya dos filas seleccionadas. Al desmarcar la casilla seleccionada, no queda ninguna fila seleccionada.
- La fila seleccionada se resalta con el fondo --campo (MK_11) y su casilla tiene aria-checked/estado marcado.
- Los botones Editar y Eliminar están deshabilitados (disabled) hasta que haya una fila seleccionada y se vuelven a deshabilitar si se quita la selección. El texto de ayuda "Seleccione un pedido para editar o eliminar" se ve mientras no haya selección y se oculta cuando la hay.

4. Botón Eliminar:
- Abre Modal.mostrar({tipo: "confirmar", titulo: "Eliminar pedido", mensaje: "¿Está seguro de que desea eliminar el Pedido N° [número] – [nombre]?"}) con los datos del pedido seleccionado (el guion es " – ", con espacios).
- Con Cancelar o Escape no pasa nada y la selección se mantiene. Con Confirmar se llama a Datos.eliminarPedido(número), se vuelve a dibujar la tabla (sin selección y con los botones deshabilitados) y el foco pasa al título "Pedidos Ingresados".

5. Botón Editar (solo la parte de esta vista; la carga del formulario es del P8): al pulsarlo, navega a pedidos.html agregando el número del pedido seleccionado, es decir, location.href = "pedidos.html?editar=" + número. No guardes nada en sessionStorage ni en localStorage para esto.

6. Acceso (RIU 5): la vista ya está protegida por js/auth-guard.js (sin sesión no se muestra; el perfil admin ve "Acceso restringido"). No lo reprogrames; solo verifícalo en la checklist.

7. js/pedidos-ingresados.js (completo): función autoejecutable con "use strict" que solo actúa si data-vista es "pedidos-ingresados". Funciones pequeñas con nombres claros (por ejemplo dibujarTabla, seleccionarFila, actualizarBotones). Los datos se leen de Datos al cargar la vista y después de cada eliminación.

8. css/styles.css: agrega solo las reglas nuevas necesarias (clases que empiecen con .tabla-pedidos y .ayuda-seleccion) y reutiliza .boton, .boton--azul, .boton--rojo, .pedido-acciones, los tokens y el anillo de foco existente. Las casillas deben verse claramente (borde azul, 20 × 20 px como mínimo para el área de clic) y tener foco visible. El texto de ayuda con --texto-secundario.

9. Accesibilidad y responsivo:
- Contraste mínimo WCAG AA. Los botones deshabilitados usan el atributo disabled (no solo el color). Cada casilla tiene un nombre accesible.
- En anchos de 375 y 320 px la tabla se desplaza solo dentro de su contenedor; la página no tiene scroll horizontal.

10. Verificación (no programes nada nuevo): confirma en la checklist que el menú del perfil user, el botón Cerrar sesión y el bloqueo del perfil admin siguen funcionando sin cambios, y que los pedidos que se guardan en la vista Pedidos aparecen aquí.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo dibujas la tabla con createElement y cómo la vuelves a dibujar después de eliminar.
2. Cómo garantizas que nunca haya más de una fila seleccionada y cómo actualizas los botones y el texto de ayuda.
3. Cómo armas el mensaje del modal de eliminación con el número y el nombre.
4. Cómo pasas el número del pedido a la vista Pedidos sin usar almacenamiento.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- views/pedidos-ingresados.html (completo).
- js/pedidos-ingresados.js (completo).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos (por ejemplo, cómo volver a los datos de prueba con Datos.restablecer()).
(b) Una checklist que verifique una por una las 10 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | | | | |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P7-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Positivo | 5 y 9 | Entrar como `user` y abrir Pedidos Ingresados (con los datos de prueba) | Tabla de MK_10: 5 pedidos (1001 a 1005) con Número Pedido, Nombre Completo, Correo, Teléfono y Total en CLP ($6.900, $8.400, $22.100, $15.990 y $12.750), casilla a la izquierda, el texto "Seleccione un pedido para editar o eliminar" y Editar y Eliminar deshabilitados | | |
| CP02 | Validación | Positivo | 5 | Marcar la casilla del pedido 1001 | Fila resaltada en celeste (MK_11), Editar (azul) y Eliminar (rojo) habilitados y el texto de ayuda oculto | | |
| CP03 | Validación | Negativo | 5 | Marcar la casilla del 1001 y luego la del 1002 | Solo queda marcada la del 1002; nunca hay dos filas seleccionadas | | |
| CP04 | Validación | Límite | 5 | Desmarcar la casilla seleccionada | Ninguna fila queda seleccionada, los dos botones vuelven a deshabilitarse y reaparece el texto de ayuda | | |
| CP05 | Validación | Negativo | 5 | Hacer clic en el texto de una fila (fuera de la casilla) | No se selecciona nada: solo funciona con la casilla | | |
| CP06 | Validación | Positivo | 5 | Seleccionar el 1001 y presionar Eliminar | Modal "Eliminar pedido": "¿Está seguro de que desea eliminar el Pedido N° 1001 – María Pérez?" con Cancelar y Confirmar (MK_12) | | |
| CP07 | Validación | Límite | 5 | En ese modal presionar Cancelar y luego repetir con Escape | El modal se cierra, el pedido sigue en la tabla y la selección se mantiene | | |
| CP08 | Validación | Positivo | 5 | Presionar Confirmar en el modal de eliminación | El pedido 1001 desaparece, la tabla queda sin selección con los botones deshabilitados y `Datos.listarPedidos().length` es 4 | | |
| CP09 | Validación | Límite | 5 | Eliminar todos los pedidos de la lista | La tabla muestra "No hay pedidos ingresados." y los botones quedan deshabilitados; con `Datos.restablecer()` y recargar vuelven los 5 | | |
| CP10 | Validación | Positivo | 5 | Seleccionar el 1003 y presionar Editar | La URL pasa a `pedidos.html?editar=1003` (la carga del formulario se prueba en el P8) | | |
| CP11 | Validación | Positivo | 4 y 5 | Enviar un pedido nuevo desde Pedidos y abrir Pedidos Ingresados | El pedido nuevo aparece al final de la lista con su número, nombre, correo, teléfono y total | | |
| CP12 | Validación | Negativo | 5 y 10 | Sin sesión abrir `views/pedidos-ingresados.html`; luego iniciar sesión como `admin` y abrirla | Sin sesión redirige a `index.html`; como admin muestra el modal "Acceso restringido" en el dashboard | | |
| CP13 | Validación | Límite | 5 | Usar solo teclado: Tab hasta una casilla, Espacio para marcarla, Tab hasta Editar o Eliminar | Se puede seleccionar y accionar con teclado y el foco es visible | | |
| CP14 | Validación | Límite | 5 | Probar la vista a 375 y 320 px | La tabla se desplaza solo dentro de su contenedor; la página no tiene scroll horizontal | | |
| CP15 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/data.js js/validaciones.js js/modal.js` | Sin cambios en los 6 archivos | | |
| CP16 | Verificación | Positivo | 5 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en Pedidos Ingresados | 0 resultados y consola sin errores | | |

---

## P8 - Editar pedido desde Pedidos Ingresados (RIU 4 y 5)

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** [por asignar]
- **Hito / RIU:** Hito 3 / RIU 4 y RIU 5
- **Origen:** prompt nuevo. Une P5, P6 y P7: el botón Editar de Pedidos Ingresados abre `pedidos.html?editar=[número]` y esta entrada carga el pedido y lo actualiza al enviar. Se alinea con MK_27 y MK_29. Se usa el parámetro de la URL en vez de una marca guardada en el navegador para que no queden estados viejos.
- **Archivos afectados:** `js/pedidos.js` (se extiende) y, solo si hace falta un ajuste mínimo, `js/pedido-detalle.js`. No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js`, los módulos del P4 ni `js/pedidos-ingresados.js`.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en JavaScript puro (ES6+), flujos de edición de datos en formularios, accesibilidad web (WCAG AA) y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3, perfil user. Este prompt (P8) completa el flujo Editar: cuando la vista Pedidos se abre desde el botón Editar de Pedidos Ingresados, carga el pedido en el formulario y en la tabla Detalle Pedido, y al enviar lo actualiza (sin crear uno nuevo). Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- Vista Pedidos (P5 y P6): views/pedidos.html con <h1 id="titulo-pedidos" tabindex="-1">Pedidos</h1>, <form id="form-pedido">, js/pedidos.js (valida, guarda con Datos.guardarPedido y expone window.FormularioPedido = {leer, limpiar, validar}) y js/pedido-detalle.js (expone window.PedidoDetalle con obtener, validar, limpiar, cargar y total).
- Vista Pedidos Ingresados (P7): el botón Editar navega a pedidos.html?editar=[número del pedido seleccionado].

Módulos compartidos que entregó el P4 (ya existen; NO se reescriben ni se modifican):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 5: el botón Editar carga los datos del pedido seleccionado en la vista Pedido para modificación.
- RIU 4: se mantienen todas las reglas del formulario y de la tabla Detalle Pedido (campos obligatorios, formatos, cálculos en pesos chilenos).

Mockups de referencia:
- MK_27 (Editar Pedido): igual a la vista Pedidos pero con el título "Editar Pedido N° 1001" (el número del pedido), debajo "* Campos obligatorios", los campos cargados con los datos del pedido (María Pérez, 12.345.678-K, +56911111111, maria@correo.cl, Av. Libertad 123), la tabla con las líneas del pedido (2 · Tallarines 400g · $1.200 · $2.400 y 3 · Arroz Grado 1 1kg · $1.500 · $4.500) más filas en blanco, el Total $6.900 y los botones Borrar (rojo) y Enviar (azul).
- MK_29 (modal de éxito): ícono de verificación, título "Pedido actualizado", mensaje "Pedido N° 1001 actualizado con éxito." y botón azul "Aceptar".

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa el modo edición de la vista Pedidos. No modifiques js/layout.js, js/auth.js, js/auth-guard.js ni los módulos compartidos del P4. No cambies las reglas de validación, los textos de los modales de P5 y P6 ni la tabla de Pedidos Ingresados; solo extiende js/pedidos.js (y, si hace falta, un ajuste mínimo en js/pedido-detalle.js que indicarás aparte). Cumple estas condiciones verificables:

1. Entrada al modo edición (en js/pedidos.js, al cargar la vista Pedidos):
- Lee el parámetro "editar" de la URL con URLSearchParams(window.location.search). Es válido solo si es un número entero positivo y Datos.obtenerPedido(número) devuelve un pedido. En ese caso la vista entra en modo edición con ese pedido.
- Si el parámetro no existe, no es un número o el pedido no existe (por ejemplo, ya fue eliminado), la vista queda en modo normal (formulario vacío, título "Pedidos") sin mostrar errores, y si había un parámetro inválido se limpia de la URL con history.replaceState.
- La dirección pedidos.html?editar=1001 debe seguir funcionando al recargar la página (F5): sigue en modo edición con los datos que están guardados. Abrir Pedidos desde el menú siempre entra en modo normal.

2. Carga de datos en modo edición:
- El título pasa a "Editar Pedido N° [número]" (con un espacio normal entre "N°" y el número) y el foco queda en ese <h1>.
- Los 5 campos se llenan con los datos del pedido (sin errores de validación en ese momento) y la tabla se llena con PedidoDetalle.cargar(pedido.detalle) (las líneas con los valores que tenían guardados, más filas en blanco hasta 5 y al menos 1 en blanco). El Total mostrado es el del detalle.
- Agrega window.FormularioPedido.cargar(pedido) a la API que dejó el P5 para llenar los campos.

3. Botón Enviar en modo edición:
- Hace las mismas validaciones que en modo normal (campos vacíos → modal "Campos obligatorios"; errores de formato en línea; detalle con al menos un producto y sin filas incompletas).
- Si todo es válido, guarda con Datos.guardarPedido usando el MISMO número del pedido (numero: [número], no null), con los datos nuevos y el detalle actual, de modo que se actualiza el pedido y no se crea uno nuevo. Luego muestra Modal.mostrar({tipo: "exito", titulo: "Pedido actualizado", mensaje: "Pedido N° [número] actualizado con éxito."}).
- Al pulsar Aceptar (o Escape) se navega a pedidos-ingresados.html con location.replace, para que el usuario vea el pedido actualizado en la tabla.

4. Botón Borrar en modo edición: funciona igual que en modo normal (modal "Vaciar formulario"; Confirmar vacía los campos y la tabla). El título sigue siendo "Editar Pedido N° [número]" y un Enviar posterior actualiza ese mismo pedido (con la validación normal, es decir, no se puede enviar vacío).

5. No se pierden datos si el usuario sale sin guardar: nada se guarda hasta pulsar Enviar. Si el usuario abre Pedidos desde el menú después de haber estado editando, ve el formulario vacío en modo normal.

6. Regresión del modo normal: en modo normal Enviar sigue creando un pedido nuevo con el número siguiente y mostrando "Pedido enviado" (P5), y el formulario y la tabla se comportan igual que antes.

7. Accesibilidad y responsivo: el título cambia con texto real (no con una imagen); el foco inicial en el título permite a un lector de pantalla anunciar "Editar Pedido N° ...". Sin scroll horizontal de la página en anchos de 375 y 320 px.

8. Verificación (no programes nada nuevo): confirma en la checklist que el bloqueo del perfil admin (que ve "Acceso restringido" al abrir pedidos.html?editar=1001), el menú del perfil user y el botón Cerrar sesión siguen funcionando sin cambios.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo detectas el modo edición y por qué usar el parámetro de la URL es más seguro que guardar una marca en sessionStorage o localStorage.
2. Cómo reutilizas la validación y el guardado de P5 sin duplicar código, y cómo logras que guardar con el mismo número actualice en vez de crear.
3. Qué pasa si el pedido a editar ya no existe o el parámetro es inválido.
4. Cómo cargas el detalle en la tabla sin recalcular los valores con los precios actuales del catálogo.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- js/pedidos.js (completo, con los cambios integrados).
- js/pedido-detalle.js solo si hubo un ajuste mínimo: indica exactamente qué se cambia, o confirma que no hace falta.
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos (por ejemplo, que tras actualizar se vuelve a Pedidos Ingresados).
(b) Una checklist que verifique una por una las 8 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | | | | |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P8-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Positivo | 5 | En Pedidos Ingresados seleccionar el 1001 y presionar Editar | Se abre `pedidos.html?editar=1001` con el título "Editar Pedido N° 1001" y "* Campos obligatorios" (MK_27); el foco queda en el título | | |
| CP02 | Validación | Positivo | 5 | Revisar los campos del formulario en modo edición | Nombre María Pérez, RUN 12.345.678-K, Teléfono +56911111111, Correo maria@correo.cl y Dirección Av. Libertad 123, sin errores | | |
| CP03 | Validación | Positivo | 5 y 4 | Revisar la tabla Detalle Pedido en modo edición | Fila 1: 2 · Tallarines 400g · $1.200 · $2.400; fila 2: 3 · Arroz Grado 1 1kg · $1.500 · $4.500; más filas en blanco (al menos 5 en total y 1 en blanco); Total $6.900 | | |
| CP04 | Validación | Positivo | 5 | Cambiar el teléfono a `+56999999999` y presionar Enviar | Modal "Pedido actualizado": "Pedido N° 1001 actualizado con éxito." (MK_29) | | |
| CP05 | Validación | Positivo | 5 | Presionar Aceptar y revisar Pedidos Ingresados | Vuelve a Pedidos Ingresados; sigue habiendo 5 pedidos, el 1001 conserva su número y su posición, y con `Datos.obtenerPedido(1001).telefono` se ve `+56999999999` | | |
| CP06 | Validación | Positivo | 4 y 5 | Editar el 1001, cambiar la cantidad de Arroz de 3 a 4 y enviar | El Total del 1001 en Pedidos Ingresados pasa a $8.400 y el detalle guardado tiene valorVenta $6.000 en la línea del arroz | | |
| CP07 | Validación | Negativo | 4 y 5 | En modo edición dejar Dirección vacía y presionar Enviar | Modal "Campos obligatorios" y Dirección resaltada; no se guarda nada | | |
| CP08 | Validación | Negativo | 4 y 5 | En modo edición poner `maria@correo` en Correo y presionar Enviar | Error de formato en línea y no se guarda nada | | |
| CP09 | Validación | Límite | 5 | Abrir `pedidos.html?editar=9999` y `pedidos.html?editar=abc` | En ambos casos el formulario queda normal (título "Pedidos", vacío), sin errores en consola y sin el parámetro en la URL | | |
| CP10 | Validación | Positivo | 5 | Después de editar, abrir Pedidos desde el menú | Formulario vacío en modo normal con el título "Pedidos" | | |
| CP11 | Validación | Límite | 5 | En modo edición presionar F5 | Sigue en modo edición con los datos guardados del pedido (los cambios no guardados se pierden) | | |
| CP12 | Validación | Límite | 5 | En modo edición presionar Borrar y Confirmar; luego completar los datos y Enviar | Se vacían campos y tabla, el título sigue "Editar Pedido N° 1001" y al enviar se actualiza el mismo pedido (no se crea el 1006) | | |
| CP13 | Validación | Positivo | 4 y 5 | En modo normal completar un pedido nuevo y enviar | Se crea el pedido 1006 con el modal "Pedido enviado" (regresión de P5) | | |
| CP14 | Validación | Positivo | 5 | Editar un pedido y luego eliminar otro desde Pedidos Ingresados | Ambas acciones funcionan y la tabla muestra los datos actualizados | | |
| CP15 | Validación | Negativo | 5 y 10 | Iniciar sesión como `admin` y abrir `views/pedidos.html?editar=1001` por URL | Modal "Acceso restringido" en el dashboard | | |
| CP16 | Validación | Límite | 5 | Probar el modo edición a 375 y 320 px | Sin scroll horizontal de la página; la tabla se desplaza solo en su contenedor | | |
| CP17 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/data.js js/validaciones.js js/modal.js js/pedidos-ingresados.js` | Sin cambios en los 7 archivos | | |
| CP18 | Verificación | Positivo | 5 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en el modo edición | 0 resultados y consola sin errores | | |

---

## P9 - Tarjetas del dashboard del perfil user (RIU 2), opcional

- **Fecha:** [pendiente]
- **Herramienta:** [pendiente]
- **Ejecutado por:** [por asignar]
- **Hito / RIU:** Hito 3 / RIU 2
- **Origen:** pendiente que dejó el P3-b ("las tarjetas con cifras se programan en los Hitos 3 y 4, cuando existan datos"). Usa los pedidos de `js/data.js`. Se alinea con MK_04. Las tarjetas del perfil admin quedan para el Hito 4.
- **Archivos afectados:** `js/app.js` (se extiende) y `css/styles.css` (solo reglas nuevas). No se modifican `js/layout.js`, `js/auth.js`, `js/auth-guard.js` ni los módulos del P4.

### Prompt completo

```
R – ROL
Actúa como desarrollador frontend senior experto en HTML5 semántico, CSS3 y JavaScript puro (ES6+), especializado en paneles de resumen (dashboards) accesibles y código simple y comentado para estudiantes principiantes.

E – ENFOQUE
Continuamos el Sistema de Gestión de Pedidos de la cadena de supermercados Mercado Sur. Estamos en el Hito 3, perfil user. Este prompt (P9, opcional) programa las dos tarjetas con cifras del dashboard del perfil user, que quedaron pendientes en el P3-b porque aún no existían datos. Estado actual del proyecto (NO se reescribe):
- Plantilla base: js/layout.js genera una sola vez el HEAD y el FOOT, arma los menús según el perfil de la sesión y marca la vista actual con aria-current="page". También crea el botón Cerrar sesión (id="btn-logout"). NO se modifica.
- Login y sesión: index.html y js/auth.js. Contrato de sesión: sessionStorage["sesion"] = {"usuario": "...", "nombre": "...", "perfil": "admin" | "user"}. Usuarios de prueba: admin / admin1234 y user / user1234 (el user se llama "User Mercado Sur"). NO se modifica.
- Control de acceso: js/auth-guard.js (en el <head> de las 6 vistas, sin defer) oculta la página hasta confirmar el acceso, redirige si no hay sesión y bloquea con el modal "Acceso restringido" a un perfil que abre la vista del otro (el perfil user solo puede usar dashboard, pedidos y pedidos-ingresados). NO se modifica.
- Cada vista de views/ tiene <body data-raiz="../" data-vista="..."> (dashboard, pedidos, pedidos-ingresados, productos, producto-form o procesamiento) y contiene <header id="app-header">, <main id="contenido" class="contenido-principal"> y <footer id="app-footer">. Los scripts van al final del <body>: primero layout.js y luego auth.js, y después los propios de la vista.
- css/styles.css ya define los tokens (--azul-marca #0057B8, --blanco, --campo #CCD8E8, --texto-principal #1F1F1F, --texto-secundario #595959, --rojo #DB0B00, --gris-deshabilitado #9E9E9E, --tam-titulo 20px, --tam-texto 14px, fuente Geist local) y estas clases: .contenido-principal, .login__campo (etiqueta + campo), .login__entrada (campo con ícono a la izquierda y borde azul al enfocar), .login__error, .login__nota ("* Campos obligatorios"), .modal-capa, .modal, .modal__icono, .modal__titulo, .modal__mensaje, .modal__acciones, .panel-encabezado y .panel-bienvenida.
- Íconos existentes en assets/img/: alerta.svg, usuario.svg, llave.svg, ojo.svg, ojo-oculto.svg, logo.svg, facebook.svg, instagram.svg y linkedin.svg.
- js/app.js solo actúa en el dashboard (data-vista="dashboard") con sesión válida: cambia el <h1> a "Panel de usuario" o "Panel de administrador", lo agrupa en una fila .panel-encabezado con el saludo "Bienvenido, nombre" (.panel-bienvenida) y NO programa las tarjetas. views/dashboard.html ya carga data.js antes de app.js (P4).

Módulos compartidos que entregó el P4 (ya existen; NO se reescriben ni se modifican):
- js/data.js expone window.Datos. Es el ÚNICO archivo que usa localStorage (claves "ms_productos" y "ms_pedidos", en JSON):
  Datos.listarProductos() devuelve una copia del arreglo de productos {numero, nombre, cantidad, valor, estado} (estado: "Habilitado" o "Deshabilitado").
  Datos.listarProductosPedibles() devuelve solo los productos con estado "Habilitado" y cantidad mayor que 0.
  Datos.listarPedidos() devuelve una copia del arreglo de pedidos, ordenado por numero ascendente.
  Datos.obtenerPedido(numero) devuelve el pedido o null.
  Datos.guardarPedido(pedido) si pedido.numero es null crea el pedido con el siguiente número (mínimo 1001); si el número ya existe, lo actualiza; devuelve el pedido guardado.
  Datos.eliminarPedido(numero) devuelve true o false.
  Datos.calcularTotal(detalle) devuelve la suma de valorVenta.
  Datos.restablecer() vuelve a cargar los datos de prueba.
  Un pedido es {numero, nombre, run, telefono, correo, direccion, detalle: [{cantidad, productoNumero, producto, valorUnitario, valorVenta}], total}.
- js/validaciones.js expone window.Validaciones. nombre(t), run(t), telefono(t), correo(t), direccion(t) y cantidad(v) devuelven {valido: boolean, mensaje: string} (mensaje vacío si es válido). formatearCLP(n) devuelve texto como "$1.200". normalizar(t) devuelve el texto en minúsculas y sin tildes. contiene(textoCompleto, busqueda) devuelve true si el texto contiene la búsqueda de forma consecutiva, sin distinguir mayúsculas ni tildes.
- js/modal.js expone window.Modal.mostrar({tipo, titulo, mensaje, textoAceptar, textoCancelar, alAceptar, alCancelar, alCerrar}). tipo es "error", "exito", "aviso" o "confirmar". Solo hay un modal abierto a la vez. Escape equivale a Aceptar en los modales de un botón y a Cancelar en "confirmar". Modal.estaAbierto() devuelve true o false.
- css/styles.css: tokens --gris-calculado (#E5E5E5) y --borde-tabla (#D9D9D9); botones .boton con las variantes .boton--azul, .boton--rojo y .boton--borde (todos con estado :disabled); y los modificadores .modal--exito y .modal--aviso.

Requerimientos que se implementan (texto del documento de requerimientos):
- RIU 2: una vez logado, se carga una vista tipo dashboard cuyo BODY muestra "Bienvenido USUARIO".
- RIU 5: la vista Pedidos Ingresados muestra los pedidos ingresados en la vista Pedidos.
- RIU 9: el perfil user solo ve Home, Pedidos y Pedidos Ingresados.

Mockups de referencia:
- MK_04 (dashboard user): debajo del encabezado, dos tarjetas lado a lado con borde fino y esquinas redondeadas. Tarjeta 1: título "Pedidos Ingresados", una cifra grande en azul (5), el texto "registrados" y el enlace subrayado "Ver pedidos". Tarjeta 2: título "Último pedido", una cifra grande en azul (1005), el texto "ingresado" y el enlace subrayado "Ver pedido 1005".

Restricciones técnicas:
- HTML5, CSS3 y JavaScript puro (ES6+). Prohibido usar frameworks, librerías o CDN. Sin módulos ES (type="module"): el proyecto se abre con doble clic o con Live Server y los archivos comparten objetos globales (window.Datos, window.Validaciones, window.Modal).
- Prohibido CSS o JS embebido: nada de <style>, <script> con código dentro del HTML, atributos onclick ni style="". Para cambiar estilos desde JS usa clases CSS.
- Prohibido usar fetch().
- Prohibido usar innerHTML: crea los elementos con createElement y textContent.
- Rutas relativas: en views/ llevan ../ y se leen de data-raiz.
- Tokens de diseño existentes; no agregues colores fuera de los tokens (salvo los que el prompt indique expresamente).
- Comentarios en español y código simple, con funciones pequeñas y nombres claros.

C – CLARIDAD EN LA TAREA
Programa las tarjetas del dashboard del perfil user. No modifiques js/layout.js, js/auth.js, js/auth-guard.js ni los módulos compartidos del P4. No programes las tarjetas del perfil admin (son del Hito 4) y no cambies el encabezado del dashboard ni el modal de acceso restringido. Cumple estas condiciones verificables:

1. En js/app.js (completo, con lo que ya tiene más lo nuevo): solo cuando data-vista es "dashboard" y el perfil de la sesión es "user", crea con createElement, debajo del encabezado y dentro de <main id="contenido">, un contenedor .panel-tarjetas con dos tarjetas (<section class="tarjeta" aria-labelledby="...">). Con el perfil admin no se crea ninguna tarjeta.

2. Tarjeta "Pedidos Ingresados": <h2> con el título, la cifra Datos.listarPedidos().length (en un <p class="tarjeta__cifra">), el texto "registrados" y un enlace <a href="pedidos-ingresados.html"> con el texto "Ver pedidos".

3. Tarjeta "Último pedido": <h2> con el título, la cifra con el mayor número de pedido (el último de Datos.listarPedidos(), que va ordenado ascendente), el texto "ingresado" y un enlace <a href="pedidos-ingresados.html"> con el texto "Ver pedido [número]". El enlace lleva a la vista Pedidos Ingresados sin seleccionar nada.
- Si no hay pedidos: la primera tarjeta muestra la cifra "0" con el texto "registrados"; la segunda muestra el guion "–" como cifra, el texto "sin pedidos" y no muestra enlace.

4. Datos al día: las cifras se calculan al cargar el dashboard y también cuando la página se restaura con el botón Atrás (el guardia ya recarga la página en ese caso, no repitas ese código). Las cifras salen de Datos; no las escribas fijas.

5. css/styles.css: agrega solo las reglas nuevas (.panel-tarjetas, .tarjeta, .tarjeta h2, .tarjeta__cifra, .tarjeta__texto): dos columnas iguales con 19 px de separación; cada tarjeta con borde de 1 px --borde-tabla, esquinas redondeadas de 8 px y relleno de 24 px; el título de 20 px y peso 600; la cifra de 48 px, peso 700 y color --azul-marca; el texto de 14 px en --texto-secundario; los enlaces en --azul-marca, subrayados, con el anillo de foco existente. En pantallas de hasta 700 px, las tarjetas pasan a una sola columna.

6. Accesibilidad y responsivo: contraste mínimo WCAG AA; cada tarjeta es una región con su título; los enlaces tienen un texto claro. Sin scroll horizontal en anchos de 375 y 320 px.

7. Verificación (no programes nada nuevo): confirma en la checklist que el encabezado ("Panel de usuario" y el saludo), el modal "Acceso restringido" (que se abre sobre este mismo dashboard), el menú del perfil user y el botón Cerrar sesión siguen funcionando igual.

RAZONAMIENTO PASO A PASO
Antes de escribir el código, explica brevemente en una lista numerada:
1. Cómo agregas las tarjetas sin tocar la lógica que ya tiene app.js (encabezado y modal).
2. Cómo obtienes la cifra del último pedido y qué muestras cuando no hay pedidos.
3. Cómo te aseguras de que las tarjetas del admin no se creen.
Después de esta explicación, entrega el código.

E – ESTRUCTURA (FORMATO DE SALIDA)
Entrega cada archivo en un bloque de código separado, encabezado por su ruta exacta:
- js/app.js (completo).
- css/styles.css (solo las reglas nuevas, indicando que se agregan al final).
Comentarios claros en español dentro del código. Al final agrega:
(a) Una lista breve de supuestos técnicos.
(b) Una checklist que verifique una por una las 7 condiciones de la sección C.

T – TONO
Profesional, claro y funcional. Explicaciones breves y directas, sin relleno. No agregues elementos, textos ni reglas que no estén justificados por los requerimientos, los mockups o este prompt.

A – AUDIENCIA
Estudiantes de segundo año de Ingeniería Informática, principiantes en desarrollo web, que van a leer, probar y corregir el código a mano. Por eso: simple y comentado. Los usuarios finales son personal de una cadena de supermercados con distintos niveles de experiencia tecnológica.
```

### Resultado generado
[pendiente: se completa después de ejecutar el prompt]

### Problemas detectados al probarlo
- [pendiente]

### Correcciones manuales

| N° | Problema | Archivo | Corrección | Por qué |
|----|----------|---------|------------|---------|
| 1 | | | | |

### Validación

Las capturas de cada prueba se guardan en `docs/evidencias/` con el formato `P9-CPxx-nombre.png`.

| ID | Tipo | Caso | RIU | Prueba | Resultado esperado | Resultado real | OK |
|----|------|------|-----|--------|--------------------|----------------|----|
| CP01 | Validación | Positivo | 2 y 5 | Entrar como `user` con los datos de prueba y mirar el dashboard | Debajo del encabezado hay dos tarjetas (MK_04): "Pedidos Ingresados" con la cifra 5 y "registrados", y "Último pedido" con la cifra 1005 e "ingresado", con los enlaces "Ver pedidos" y "Ver pedido 1005" | | |
| CP02 | Validación | Positivo | 5 | Hacer clic en "Ver pedidos" y en "Ver pedido 1005" | Ambos llevan a Pedidos Ingresados, sin ninguna fila seleccionada | | |
| CP03 | Validación | Positivo | 4 y 5 | Enviar un pedido nuevo desde Pedidos (queda el 1006) y volver al dashboard | Las tarjetas muestran 6 y 1006, con el enlace "Ver pedido 1006" | | |
| CP04 | Validación | Positivo | 5 | Eliminar el último pedido desde Pedidos Ingresados y volver al dashboard | Las cifras bajan en una unidad y "Último pedido" muestra el número más alto que queda | | |
| CP05 | Validación | Límite | 5 | Eliminar todos los pedidos y abrir el dashboard | Primera tarjeta con 0 "registrados"; segunda con "–", "sin pedidos" y sin enlace; luego `Datos.restablecer()` devuelve los datos de prueba | | |
| CP06 | Validación | Positivo | 2 y 3 | Iniciar sesión como `admin` | El dashboard del admin solo muestra el encabezado "Panel de administrador" y el saludo, sin tarjetas (las del admin son del Hito 4) | | |
| CP07 | Validación | Límite | 5 | Ir al dashboard desde Pedidos Ingresados con el botón Atrás del navegador | Las cifras se muestran actualizadas (no quedan valores viejos) | | |
| CP08 | Validación | Negativo | 10 | Como `user`, abrir `views/productos.html` por URL | Modal "Acceso restringido" sobre el dashboard con las tarjetas visibles detrás (regresión de P3-b) | | |
| CP09 | Validación | Límite | 2 | Probar el dashboard a 375 y 320 px | Las tarjetas pasan a una columna, sin scroll horizontal | | |
| CP10 | Verificación | Positivo | 1, 2 y 10 | `git diff --ignore-space-at-eol js/layout.js js/auth.js js/auth-guard.js js/data.js js/validaciones.js js/modal.js` | Sin cambios en los 6 archivos | | |
| CP11 | Verificación | Positivo | 2 | Búsqueda de `<style`, `onclick`, `style="`, `fetch(` e `innerHTML` en los archivos y consola abierta en el dashboard | 0 resultados y consola sin errores | | |

---