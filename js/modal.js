"use strict";

(function () {
    "use strict";

    var capaActual = null;
    var modalActual = null;
    var botonesActuales = [];
    var elementoAnterior = null;
    var opcionesActuales = null;

    function obtenerBotones() {
        if (!modalActual) {
            return [];
        }
        return Array.prototype.slice.call(modalActual.querySelectorAll("button:not(:disabled)"));
    }

    function ejecutarCallback(callback) {
        if (typeof callback === "function") {
            callback();
        }
    }

    function cerrar(callbackAccion, callbackCerrar) {
        if (!capaActual) {
            return;
        }

        var capaQueSeCierra = capaActual;
        var elementoRestaurar = elementoAnterior;

        capaActual = null;
        modalActual = null;
        botonesActuales = [];
        opcionesActuales = null;
        document.removeEventListener("keydown", controlarTeclado);
        capaQueSeCierra.remove();

        // Aunque un callback falle, siempre se ejecuta alCerrar
        // y se restaura el foco.
        try {
            ejecutarCallback(callbackAccion);
        } finally {
            try {
                ejecutarCallback(callbackCerrar);
            } finally {
                var activo = document.activeElement;
                var callbackMovioElFoco = activo &&
                    activo !== document.body &&
                    !capaQueSeCierra.contains(activo);

                if (!callbackMovioElFoco && elementoRestaurar &&
                    typeof elementoRestaurar.focus === "function" &&
                    document.documentElement.contains(elementoRestaurar)) {
                    elementoRestaurar.focus();
                }

                elementoAnterior = null;
            }
        }
    }

    function controlarTeclado(evento) {
        if (!capaActual) {
            return;
        }

        if (evento.key === "Escape") {
            evento.preventDefault();
            if (opcionesActuales.tipo === "confirmar") {
                cerrar(opcionesActuales.alCancelar, opcionesActuales.alCerrar);
            } else {
                cerrar(opcionesActuales.alAceptar, opcionesActuales.alCerrar);
            }
            return;
        }

        if (evento.key !== "Tab") {
            return;
        }

        botonesActuales = obtenerBotones();
        if (botonesActuales.length === 0) {
            evento.preventDefault();
            return;
        }

        var indiceActual = botonesActuales.indexOf(document.activeElement);
        if (indiceActual === -1) {
            evento.preventDefault();
            botonesActuales[0].focus();
            return;
        }

        var siguiente = evento.shiftKey ? indiceActual - 1 : indiceActual + 1;
        if (siguiente < 0) {
            evento.preventDefault();
            botonesActuales[botonesActuales.length - 1].focus();
        } else if (siguiente >= botonesActuales.length) {
            evento.preventDefault();
            botonesActuales[0].focus();
        }
    }

    function mostrar(opciones) {
        opciones = opciones || {};
        var tipo = ["error", "exito", "aviso", "confirmar"].indexOf(opciones.tipo) >= 0
            ? opciones.tipo
            : "error";

        if (!capaActual) {
            elementoAnterior = document.activeElement;
        }

        if (capaActual) {
            capaActual.remove();
        }
        document.removeEventListener("keydown", controlarTeclado);

        var raiz = document.body.getAttribute("data-raiz") || "";
        var capa = document.createElement("div");
        capa.className = "modal-capa";

        var modal = document.createElement("div");
        modal.className = "modal modal--" + tipo;
        modal.setAttribute("role", "alertdialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "modal-titulo");
        modal.setAttribute("aria-describedby", "modal-mensaje");

        var icono = document.createElement("img");
        icono.className = "modal__icono";
        icono.alt = "";
        icono.setAttribute("aria-hidden", "true");
        icono.src = tipo === "exito"
            ? raiz + "assets/img/exito.svg"
            : raiz + "assets/img/alerta.svg";

        var titulo = document.createElement("h2");
        titulo.className = "modal__titulo";
        titulo.id = "modal-titulo";
        titulo.textContent = opciones.titulo || "";

        var mensaje = document.createElement("p");
        mensaje.className = "modal__mensaje";
        mensaje.id = "modal-mensaje";
        mensaje.textContent = opciones.mensaje || "";

        var acciones = document.createElement("div");
        acciones.className = "modal__acciones";

        var aceptar = document.createElement("button");
        aceptar.type = "button";
        aceptar.className = tipo === "confirmar"
            ? "boton boton--rojo"
            : "boton boton--azul";
        aceptar.textContent = opciones.textoAceptar ||
            (tipo === "confirmar" ? "Confirmar" : "Aceptar");

        var cancelar = null;
        if (tipo === "confirmar") {
            cancelar = document.createElement("button");
            cancelar.type = "button";
            cancelar.className = "boton boton--borde";
            cancelar.textContent = opciones.textoCancelar || "Cancelar";
            cancelar.addEventListener("click", function () {
                cerrar(opciones.alCancelar, opciones.alCerrar);
            });
            acciones.appendChild(cancelar);
        }

        aceptar.addEventListener("click", function () {
            cerrar(opciones.alAceptar, opciones.alCerrar);
        });
        acciones.appendChild(aceptar);

        modal.appendChild(icono);
        modal.appendChild(titulo);
        modal.appendChild(mensaje);
        modal.appendChild(acciones);
        capa.appendChild(modal);
        document.body.appendChild(capa);

        capaActual = capa;
        modalActual = modal;
        opcionesActuales = {
            tipo: tipo,
            alAceptar: opciones.alAceptar,
            alCancelar: opciones.alCancelar,
            alCerrar: opciones.alCerrar
        };
        botonesActuales = obtenerBotones();
        document.addEventListener("keydown", controlarTeclado);

        if (tipo === "confirmar" && cancelar) {
            cancelar.focus();
        } else {
            aceptar.focus();
        }
    }

    function estaAbierto() {
        return Boolean(capaActual);
    }

    window.Modal = {
        mostrar: mostrar,
        estaAbierto: estaAbierto
    };
}());
