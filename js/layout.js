/* Genera una sola vez el HEAD y el FOOT compartidos por todas las vistas. */
(function () {
    "use strict";

    var cuerpo = document.body;
    var raiz = cuerpo.getAttribute("data-raiz") || "";
    var vistaActual = cuerpo.getAttribute("data-vista") || "";
    var header = document.getElementById("app-header");
    var footer = document.getElementById("app-footer");

    var sesion = null;
    try {
        sesion = JSON.parse(sessionStorage.getItem("sesion"));
    } catch (error) {
        sesion = null;
    }

    var perfil = sesion && sesion.perfil;
    if (perfil !== "admin" && perfil !== "user") {
        perfil = null;
    }

    var opciones = [];
    if (perfil) {
        opciones.push({
            texto: "Home",
            vista: "dashboard",
            ruta: raiz + "views/dashboard.html"
        });
    } else {
        opciones.push({
            texto: "Home",
            vista: "index",
            ruta: raiz + "index.html"
        });
    }

    if (perfil === "user") {
        opciones.push(
            { texto: "Pedidos", vista: "pedidos", ruta: raiz + "views/pedidos.html" },
            { texto: "Pedidos Ingresados", vista: "pedidos-ingresados", ruta: raiz + "views/pedidos-ingresados.html" }
        );
    } else if (perfil === "admin") {
        opciones.push(
            { texto: "Productos", vista: "productos", ruta: raiz + "views/productos.html" },
            { texto: "Procesamiento de Pedido", vista: "procesamiento", ruta: raiz + "views/procesamiento.html" }
        );
    }

    function crearNavegacion(claseContenedor) {
        var nav = document.createElement("nav");
        var esMenuPrincipal = claseContenedor === "menu-principal";
        nav.className = claseContenedor;
        nav.setAttribute("aria-label", esMenuPrincipal ? "Menú principal" : "Menú de pie de página");

        var lista = document.createElement("ul");
        opciones.forEach(function (opcion) {
            var elemento = document.createElement("li");
            var enlace = document.createElement("a");
            enlace.href = opcion.ruta;
            enlace.textContent = opcion.texto;
            var esVistaActual = opcion.vista === vistaActual;
            if (opcion.vista === "productos" && vistaActual === "producto-form") {
                esVistaActual = true;
            }
            if (esVistaActual) {
                enlace.setAttribute("aria-current", "page");
            }
            elemento.appendChild(enlace);
            lista.appendChild(elemento);
        });

        nav.appendChild(lista);
        return nav;
    }

    if (header) {
        var filaSuperior = document.createElement("div");
        filaSuperior.className = "header-contenedor";

        var marca = document.createElement("a");
        marca.className = "marca";
        marca.href = perfil ? raiz + "views/dashboard.html" : raiz + "index.html";

        var imagen = document.createElement("img");
        imagen.src = raiz + "assets/img/logo.svg";
        imagen.alt = "Mercado Sur";

        marca.appendChild(imagen);
    
        filaSuperior.appendChild(marca);

        if (perfil) {
            var botonCerrar = document.createElement("button");
            botonCerrar.type = "button";
            botonCerrar.id = "btn-logout";
            botonCerrar.className = "btn-logout";
            botonCerrar.textContent = "Cerrar sesión";
            filaSuperior.appendChild(botonCerrar);
        }

        header.className = "app-header";
        header.appendChild(filaSuperior);
        header.appendChild(crearNavegacion("menu-principal"));
    }

    if (footer) {
        var contenedorFooter = document.createElement("div");
        contenedorFooter.className = "footer-contenedor";

        var menuFooter = crearNavegacion("menu-footer");
        contenedorFooter.appendChild(menuFooter);

        var enlacesFooter = document.createElement("div");
        enlacesFooter.className = "enlaces-footer";

        var copyright = document.createElement("p");
        copyright.textContent = "© 2026 MERCADO SUR. Todos los derechos reservados.";
        enlacesFooter.appendChild(copyright);

        var listasEnlaces = document.createElement("ul");
        listasEnlaces.className = "redes-sociales";
        [
            { texto: "Facebook", href: "https://www.facebook.com/", icono: "facebook.svg"},
            { texto: "Instagram", href: "https://www.instagram.com/", icono: "instagram.svg"},
            { texto: "LinkedIn", href: "https://www.linkedin.com/", icono: "linkedin.svg" }
        ].forEach(function (elemento) {
            var li = document.createElement("li");
            var enlace = document.createElement("a");
            enlace.href = elemento.href;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            var icono = document.createElement("img");
            icono.src = raiz + "assets/img/" + elemento.icono;
            icono.alt = elemento.texto;

            enlace.appendChild(icono);
            li.appendChild(enlace);
            listasEnlaces.appendChild(li);
        });
        enlacesFooter.appendChild(listasEnlaces);

        contenedorFooter.appendChild(enlacesFooter);
        footer.className = "app-footer";
        footer.appendChild(contenedorFooter);
    }
}());