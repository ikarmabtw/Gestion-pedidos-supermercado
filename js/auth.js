"use strict";

(function () {
    var cuerpo = document.body;
    var raiz = cuerpo.getAttribute("data-raiz") || "";
    var formulario = document.getElementById("form-login");
    var usuario = document.getElementById("usuario");
    var clave = document.getElementById("clave");
    var botonVerClave = document.getElementById("btn-ver-clave");
    var botonIngresar = formulario ? formulario.querySelector('button[type="submit"]') : null;
    var tituloLogin = document.getElementById("titulo-login");
    var intentoDeCierreModal = null;
    var modalActual = null;

    // Usuarios de prueba académicos; no representan una autenticación segura.
    var usuarios = [
        { usuario: "admin", clave: "admin1234", nombre: "Administrador Mercado Sur", perfil: "admin" },
        { usuario: "user", clave: "user1234", nombre: "User Mercado Sur", perfil: "user" }
    ];

    function leerSesionValida() {
        var sesion;
        try {
            sesion = JSON.parse(sessionStorage.getItem("sesion"));
        } catch (error) {
            return false;
        }
        return Boolean(
            sesion &&
            typeof sesion === "object" &&
            !Array.isArray(sesion) &&
            (sesion.perfil === "admin" || sesion.perfil === "user")
        );
    }

    function leerIntentos() {
        var guardado = sessionStorage.getItem("intentos_login");
        if (guardado === null || guardado.trim() === "") {
            return 0;
        }
        var intentos = Number(guardado);
        return Number.isSafeInteger(intentos) && intentos >= 0 ? intentos : 0;
    }

    function mostrarModal(tipo, titulo, mensaje, textoBoton, puedeCerrarConEscape) {
        if (modalActual) {
            modalActual.remove();
        }

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
        icono.src = raiz + "assets/img/alerta.svg";
        icono.alt = "";
        icono.setAttribute("aria-hidden", "true");

        var encabezado = document.createElement("h2");
        encabezado.className = "modal__titulo";
        encabezado.id = "modal-titulo";
        encabezado.textContent = titulo;

        var texto = document.createElement("p");
        texto.className = "modal__mensaje";
        texto.id = "modal-mensaje";
        texto.textContent = mensaje;

        var acciones = document.createElement("div");
        acciones.className = "modal__acciones";

        var botonVolver = document.createElement("button");
        botonVolver.type = "button";
        botonVolver.className = "modal__volver";
        botonVolver.textContent = textoBoton;

        function cerrarModal() {
            capa.remove();
            modalActual = null;
            var alCerrar = intentoDeCierreModal;
            intentoDeCierreModal = null;
            if (alCerrar) {
                alCerrar();
            }
        }

        botonVolver.addEventListener("click", cerrarModal);
        modal.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                evento.preventDefault();
                if (puedeCerrarConEscape) {
                    cerrarModal();
                }
                return;
            }
            if (evento.key === "Tab") {
                evento.preventDefault();
                botonVolver.focus();
            }
        });

        acciones.appendChild(botonVolver);
        modal.appendChild(icono);
        modal.appendChild(encabezado);
        modal.appendChild(texto);
        modal.appendChild(acciones);
        capa.appendChild(modal);
        document.body.appendChild(capa);
        modalActual = capa;
        botonVolver.focus();
    }

    function mostrarErrorCredenciales(titulo, mensaje) {
        intentoDeCierreModal = function () {
            clave.value = "";
            usuario.focus();
        };
        mostrarModal("error", titulo, mensaje, "Volver", true);
    }

    function bloquearFormulario() {
        usuario.disabled = true;
        clave.disabled = true;
        usuario.parentElement.classList.add("login__entrada--deshabilitada");
        clave.parentElement.classList.add("login__entrada--deshabilitada");
        botonVerClave.disabled = true;
        botonIngresar.disabled = true;
        intentoDeCierreModal = function () {
            tituloLogin.focus();
        };
        mostrarModal(
            "error",
            "Cuenta bloqueada",
            "Su cuenta ha sido bloqueada por seguridad. Comuníquese con soporte.",
            "Volver",
            false
        );
    }

    function limpiarError(campo, elementoError) {
        elementoError.textContent = "";
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
    }

    var botonLogout = document.getElementById("btn-logout");
    if (botonLogout) {
        botonLogout.addEventListener("click", function () {
            sessionStorage.removeItem("sesion");
            window.location.href = raiz + "index.html";
        });
    }

    if (!formulario || !usuario || !clave || !botonVerClave || !botonIngresar) {
        return;
    }

    if (leerSesionValida()) {
        window.location.replace(raiz + "views/dashboard.html");
        return;
    }

    var errorUsuario = document.getElementById("usuario-error");
    var errorClave = document.getElementById("clave-error");

    botonVerClave.addEventListener("click", function () {
        var mostrar = clave.type === "password";
        clave.type = mostrar ? "text" : "password";
        botonVerClave.setAttribute("aria-pressed", String(mostrar));
        botonVerClave.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
        botonVerClave.querySelector("img").src = raiz + "assets/img/" + (mostrar ? "ojo-oculto.svg" : "ojo.svg");
    });

    usuario.addEventListener("input", function () {
        limpiarError(usuario, errorUsuario);
    });
    clave.addEventListener("input", function () {
        limpiarError(clave, errorClave);
    });

    var intentosIniciales = leerIntentos();
    if (intentosIniciales >= 3) {
        bloquearFormulario();
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        if (usuario.disabled || clave.disabled || botonIngresar.disabled) {
            return;
        }

        var errores = [];
        var valorUsuario = usuario.value;
        var valorClave = clave.value;

        if (valorUsuario === "") {
            errores.push({
                campo: usuario,
                elemento: errorUsuario,
                mensaje: "Ingrese su usuario."
            });
        } else if (!/^[A-Za-z0-9]+$/.test(valorUsuario)) {
            errores.push({
                campo: usuario,
                elemento: errorUsuario,
                mensaje: "Solo se permiten letras y números."
            });
        }

        if (valorClave === "") {
            errores.push({
                campo: clave,
                elemento: errorClave,
                mensaje: "Ingrese su contraseña."
            });
        } else if (!/^[A-Za-z0-9]+$/.test(valorClave)) {
            errores.push({
                campo: clave,
                elemento: errorClave,
                mensaje: "Solo se permiten letras y números."
            });
        }

        if (errores.length > 0) {
            errores.forEach(function (error) {
                error.elemento.textContent = error.mensaje;
                error.campo.setAttribute("aria-invalid", "true");
                error.campo.setAttribute("aria-describedby", error.elemento.id);
            });
            errores[0].campo.focus();
            return;
        }

        var cuenta = usuarios.find(function (elemento) {
            return elemento.usuario === valorUsuario;
        });
        var fallos = leerIntentos();

        if (!cuenta || cuenta.clave !== valorClave) {
            fallos += 1;
            sessionStorage.setItem("intentos_login", String(fallos));
            if (fallos >= 3) {
                bloquearFormulario();
                return;
            }
            if (!cuenta) {
                mostrarErrorCredenciales(
                    "Usuario inexistente",
                    "No existe el usuario en la base de datos."
                );
            } else {
                mostrarErrorCredenciales(
                    "Credenciales incorrectas",
                    "La contraseña no es correcta. Intentos restantes: " + (3 - fallos) + "."
                );
            }
            return;
        }

        sessionStorage.removeItem("intentos_login");
        sessionStorage.setItem("sesion", JSON.stringify({
            usuario: cuenta.usuario,
            nombre: cuenta.nombre,
            perfil: cuenta.perfil
        }));
        window.location.href = raiz + "views/dashboard.html";
    });
}());