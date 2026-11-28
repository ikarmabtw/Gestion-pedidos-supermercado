"use strict";

(function () {
    "use strict";

    if (document.body.getAttribute("data-vista") !== "pedidos") {
        return;
    }

    var formulario = document.getElementById("form-pedido");
    var idsCampos = ["nombre", "run", "telefono", "correo", "direccion"];
    var validadores = {
        nombre: "nombre",
        run: "run",
        telefono: "telefono",
        correo: "correo",
        direccion: "direccion"
    };

    function obtenerElementoError(id) {
        return document.getElementById("error-" + id);
    }

    function obtenerEntrada(id) {
        return document.getElementById(id).parentElement;
    }

    function leerFormulario() {
        var datos = {};
        idsCampos.forEach(function (id) {
            datos[id] = document.getElementById(id).value.trim();
        });
        return datos;
    }

    function limpiarContenido(elemento) {
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function quitarError(id) {
        var campo = document.getElementById(id);
        var entrada = obtenerEntrada(id);
        var mensaje = obtenerElementoError(id);
        var icono = entrada.querySelector(".form-pedido__alerta-entrada");

        entrada.classList.remove("login__entrada--error");
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
        if (icono) {
            icono.remove();
        }
        limpiarContenido(mensaje);
    }

    function marcarError(id, texto) {
        var campo = document.getElementById(id);
        var entrada = obtenerEntrada(id);
        var mensaje = obtenerElementoError(id);
        var raiz = document.body.getAttribute("data-raiz") || "";
        var iconoEntrada = entrada.querySelector(".form-pedido__alerta-entrada");
        var iconoMensaje = document.createElement("img");
        var textoMensaje = document.createTextNode(texto);

        entrada.classList.add("login__entrada--error");
        campo.setAttribute("aria-invalid", "true");
        campo.setAttribute("aria-describedby", mensaje.id);

        if (!iconoEntrada) {
            iconoEntrada = document.createElement("img");
            iconoEntrada.className = "form-pedido__alerta-entrada";
            iconoEntrada.alt = "";
            iconoEntrada.setAttribute("aria-hidden", "true");
            iconoEntrada.src = raiz + "assets/img/alerta.svg";
            entrada.appendChild(iconoEntrada);
        }

        limpiarContenido(mensaje);
        iconoMensaje.src = raiz + "assets/img/alerta.svg";
        iconoMensaje.alt = "";
        iconoMensaje.setAttribute("aria-hidden", "true");
        mensaje.appendChild(iconoMensaje);
        mensaje.appendChild(textoMensaje);
    }

    function validarCampo(id, obligatorio) {
        var campo = document.getElementById(id);
        var valor = campo.value.trim();

        if (valor === "") {
            if (obligatorio) {
                marcarError(id, "Campo obligatorio.");
                return { valido: false, vacio: true };
            }
            quitarError(id);
            return { valido: true, vacio: true };
        }

        var resultado = window.Validaciones[validadores[id]](valor);
        if (!resultado.valido) {
            marcarError(id, resultado.mensaje);
            return { valido: false, vacio: false };
        }

        quitarError(id);
        return { valido: true, vacio: false };
    }

    function validarCampos(obligatorio) {
        var resultado = {
            valido: true,
            vacios: [],
            errores: []
        };

        idsCampos.forEach(function (id) {
            var estado = validarCampo(id, obligatorio);
            if (!estado.valido) {
                resultado.valido = false;
                resultado.errores.push(id);
            }
            if (estado.vacio && obligatorio) {
                resultado.vacios.push(id);
            }
        });

        return resultado;
    }

    function primerCampoConError() {
        return idsCampos.find(function (id) {
            return document.getElementById(id).getAttribute("aria-invalid") === "true";
        });
    }

    function enfocarPrimerCampoConError(idAlternativo) {
        var id = primerCampoConError() || idAlternativo;
        if (id) {
            document.getElementById(id).focus();
        }
    }

    function obtenerDetalle() {
        // El detalle es opcional hasta que el módulo P6 esté disponible.
        return window.PedidoDetalle ? window.PedidoDetalle.obtener() : [];
    }

    function limpiarFormulario() {
        idsCampos.forEach(function (id) {
            document.getElementById(id).value = "";
            quitarError(id);
        });

        if (window.PedidoDetalle) {
            window.PedidoDetalle.limpiar();
        }
        document.getElementById("nombre").focus();
    }

    function filtrarValor(campo, tipo) {
        var valorOriginal = campo.value;
        var inicio = campo.selectionStart;
        var fin = campo.selectionEnd;
        var textoHastaInicio = valorOriginal.slice(0, inicio);
        var textoHastaFin = valorOriginal.slice(0, fin);
        var valorLimpio = limpiarValor(valorOriginal, tipo);
        var inicioLimpio = limpiarValor(textoHastaInicio, tipo).length;
        var finLimpio = limpiarValor(textoHastaFin, tipo).length;

        // Reubica el cursor según los caracteres permitidos que quedaron antes de él.
        if (valorOriginal !== valorLimpio) {
            campo.value = valorLimpio;
            campo.setSelectionRange(inicioLimpio, finLimpio);
        }
    }

    function pegarTexto(evento, campo, tipo) {
        if (!evento.clipboardData) {
            return;
        }

        evento.preventDefault();
        var inicio = campo.selectionStart;
        var fin = campo.selectionEnd;
        var antes = campo.value.slice(0, inicio);
        var despues = campo.value.slice(fin);
        var textoPegado = limpiarValor(evento.clipboardData.getData("text"), tipo);
        var espacioDisponible = campo.maxLength - antes.length - despues.length;

        // Limpiar antes del límite evita perder caracteres válidos al pegar texto con símbolos.
        textoPegado = textoPegado.slice(0, Math.max(0, espacioDisponible));
        campo.value = antes + textoPegado + despues;
        var posicion = antes.length + textoPegado.length;
        campo.setSelectionRange(posicion, posicion);
        campo.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function limpiarValor(valor, tipo) {
        if (tipo === "nombre") {
            return valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü ]/g, "");
        }
        if (tipo === "run") {
            return valor.toUpperCase().replace(/[^0-9.K-]/g, "");
        }

        var resultado = "";
        for (var indice = 0; indice < valor.length; indice += 1) {
            var caracter = valor.charAt(indice);
            if (/[0-9]/.test(caracter)) {
                resultado += caracter;
            } else if (caracter === "+" && resultado.length === 0) {
                resultado += caracter;
            }
        }
        return resultado;
    }

    function conectarFiltros() {
        idsCampos.forEach(function (id) {
            var campo = document.getElementById(id);
            campo.addEventListener("input", function () {
                if (id === "nombre" || id === "run" || id === "telefono") {
                    filtrarValor(campo, id);
                }
                if (campo.getAttribute("aria-invalid") === "true") {
                    validarCampo(id, false);
                }
            });
            if (id === "nombre" || id === "run" || id === "telefono") {
                campo.addEventListener("paste", function (evento) {
                    pegarTexto(evento, campo, id);
                });
            }
        });
    }

    function conectarValidaciones() {
        idsCampos.forEach(function (id) {
            var campo = document.getElementById(id);
            campo.addEventListener("blur", function () {
                validarCampo(id, false);
            });
        });
    }

    function validarFormulario() {
        var estado = validarCampos(true);
        return estado.valido;
    }

    function enviarFormulario(evento) {
        evento.preventDefault();

        // Primero se resuelven los obligatorios para decidir si corresponde mostrar el modal.
        var resultadoCampos = validarCampos(true);
        var resultadoDetalle = window.PedidoDetalle
            ? window.PedidoDetalle.validar()
            : { valido: true, sinProductos: false, filasIncompletas: 0 };
        var hayErrorDetalle = !resultadoDetalle.valido ||
            resultadoDetalle.sinProductos ||
            resultadoDetalle.filasIncompletas > 0;
        var hayCamposVacios = resultadoCampos.vacios.length > 0;

        if (hayCamposVacios || hayErrorDetalle) {
            window.Modal.mostrar({
                tipo: "error",
                titulo: "Campos obligatorios",
                mensaje: "Debe completar los campos obligatorios para continuar.",
                textoAceptar: "Aceptar",
                alCerrar: function () {
                    enfocarPrimerCampoConError("nombre");
                }
            });
            return;
        }

        if (!resultadoCampos.valido) {
            enfocarPrimerCampoConError("nombre");
            return;
        }

        var datos = leerFormulario();
        var detalle = obtenerDetalle();
        var pedido = {
            numero: null,
            nombre: datos.nombre,
            run: datos.run,
            telefono: datos.telefono,
            correo: datos.correo,
            direccion: datos.direccion,
            detalle: detalle,
            total: window.Datos.calcularTotal(detalle)
        };
        var pedidoGuardado = window.Datos.guardarPedido(pedido);

        window.Modal.mostrar({
            tipo: "exito",
            titulo: "Pedido enviado",
            mensaje: "Pedido N° " + pedidoGuardado.numero + " enviado con éxito.",
            textoAceptar: "Aceptar",
            alAceptar: limpiarFormulario
        });
    }

    function confirmarBorrado() {
        window.Modal.mostrar({
            tipo: "confirmar",
            titulo: "Vaciar formulario",
            mensaje: "¿Desea vaciar los campos?",
            textoCancelar: "Cancelar",
            textoAceptar: "Confirmar",
            alAceptar: limpiarFormulario
        });
    }

    conectarFiltros();
    conectarValidaciones();
    formulario.addEventListener("submit", enviarFormulario);
    document.getElementById("btn-borrar").addEventListener("click", confirmarBorrado);

    window.FormularioPedido = {
        leer: leerFormulario,
        limpiar: limpiarFormulario,
        validar: validarFormulario
    };
}());