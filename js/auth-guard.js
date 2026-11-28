// Oculta la vista hasta confirmar que la sesión tiene permiso para verla.
document.documentElement.hidden = true;

(function () {
    "use strict";

    var permisosPorVista = {
        dashboard: ["admin", "user"],
        pedidos: ["user"],
        "pedidos-ingresados": ["user"],
        productos: ["admin"],
        "producto-form": ["admin"],
        procesamiento: ["admin"]
    };

    function leerSesion() {
        try {
            return JSON.parse(sessionStorage.getItem("sesion"));
        } catch (error) {
            return null;
        }
    }

    function esSesionValida(sesion) {
        return Boolean(
            sesion &&
            typeof sesion === "object" &&
            !Array.isArray(sesion) &&
            (sesion.perfil === "admin" || sesion.perfil === "user")
        );
    }

    function mostrarModalAcceso() {
        var raiz = document.body.getAttribute("data-raiz") || "";
        var tituloDashboard = document.querySelector("#contenido h1");
        var capa = document.createElement("div");
        capa.className = "modal-capa";

        var modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("role", "alertdialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "modal-titulo");
        modal.setAttribute("aria-describedby", "modal-mensaje");

        var icono = document.createElement("img");
        icono.className = "modal__icono";
        icono.src = raiz + "assets/img/alerta.svg";
        icono.alt = "";
        icono.setAttribute("aria-hidden", "true");

        var titulo = document.createElement("h2");
        titulo.className = "modal__titulo";
        titulo.id = "modal-titulo";
        titulo.textContent = "Acceso restringido";

        var mensaje = document.createElement("p");
        mensaje.className = "modal__mensaje";
        mensaje.id = "modal-mensaje";
        mensaje.textContent = "No tiene permisos para acceder a esta sección.";

        var acciones = document.createElement("div");
        acciones.className = "modal__acciones";

        var botonVolver = document.createElement("button");
        botonVolver.type = "button";
        botonVolver.className = "modal__volver";
        botonVolver.textContent = "Volver";

        function cerrarModal() {
            capa.remove();
            if (tituloDashboard) {
                tituloDashboard.focus();
            }
        }

        botonVolver.addEventListener("click", cerrarModal);
        modal.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                evento.preventDefault();
                cerrarModal();
            } else if (evento.key === "Tab") {
                evento.preventDefault();
                botonVolver.focus();
            }
        });

        acciones.appendChild(botonVolver);
        modal.appendChild(icono);
        modal.appendChild(titulo);
        modal.appendChild(mensaje);
        modal.appendChild(acciones);
        capa.appendChild(modal);
        document.body.appendChild(capa);
        botonVolver.focus();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var cuerpo = document.body;
        var raiz = cuerpo.getAttribute("data-raiz") || "";
        var vista = cuerpo.getAttribute("data-vista") || "";
        var sesion = leerSesion();

        if (!esSesionValida(sesion)) {
            window.location.replace(raiz + "index.html");
            return;
        }

        var perfilesPermitidos = permisosPorVista[vista] || [];
        if (perfilesPermitidos.indexOf(sesion.perfil) === -1) {
            sessionStorage.setItem("acceso_restringido", "1");
            window.location.replace(raiz + "views/dashboard.html");
            return;
        }

        document.documentElement.hidden = false;

        if (vista === "dashboard" && sessionStorage.getItem("acceso_restringido") === "1") {
            sessionStorage.removeItem("acceso_restringido");
            mostrarModalAcceso();
        }
    });

    window.addEventListener("pageshow", function (evento) {
        if (evento.persisted) {
            window.location.reload();
        }
    });
}());
