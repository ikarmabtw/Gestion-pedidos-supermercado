(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var cuerpo = document.body;
        if (cuerpo.getAttribute("data-vista") !== "dashboard") {
            return;
        }

        var sesion;
        try {
            sesion = JSON.parse(sessionStorage.getItem("sesion"));
        } catch (error) {
            return;
        }

        if (
            !sesion ||
            typeof sesion !== "object" ||
            Array.isArray(sesion) ||
            (sesion.perfil !== "admin" && sesion.perfil !== "user")
        ) {
            return;
        }

        var principal = document.getElementById("contenido");
        var titulo = principal ? principal.querySelector("h1") : null;
        if (!principal || !titulo) {
            return;
        }

        var nombre = typeof sesion.nombre === "string" ? sesion.nombre.trim() : "";
        if (!nombre) {
            nombre = typeof sesion.usuario === "string" ? sesion.usuario : "";
        }

        var fila = document.createElement("div");
        fila.className = "panel-encabezado";

        titulo.textContent = sesion.perfil === "admin" ? "Panel de administrador" : "Panel de usuario";
        titulo.setAttribute("tabindex", "-1");
        fila.appendChild(titulo);

        var bienvenida = document.createElement("p");
        bienvenida.className = "panel-bienvenida";
        bienvenida.textContent = "Bienvenido, " + nombre;
        fila.appendChild(bienvenida);

        principal.insertBefore(fila, principal.firstChild);
    });
}());