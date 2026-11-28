"use strict";

(function () {
    "use strict";

    function resultado(valido, mensaje) {
        return { valido: valido, mensaje: valido ? "" : mensaje };
    }

    function nombre(t) {
        var texto = String(t === null || t === undefined ? "" : t).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (texto.length > 255) {
            return resultado(false, "Máximo 255 caracteres.");
        }
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/.test(texto)) {
            return resultado(false, "Nombre inválido. Use solo letras y espacios.");
        }
        return resultado(true, "");
    }

    function run(t) {
        var texto = String(t === null || t === undefined ? "" : t).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/.test(texto)) {
            return resultado(false, "RUN inválido. Formato esperado: 12.345.678-K");
        }
        return resultado(true, "");
    }

    function telefono(t) {
        var texto = String(t === null || t === undefined ? "" : t).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (!/^\+\d{10,12}$/.test(texto)) {
            return resultado(false, "Teléfono inválido. Formato esperado: +56987654321");
        }
        return resultado(true, "");
    }

    function correo(t) {
        var texto = String(t === null || t === undefined ? "" : t).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (texto.length > 255) {
            return resultado(false, "Máximo 255 caracteres.");
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(texto)) {
            return resultado(false, "Correo inválido. Formato esperado: nombre@apellido.cl");
        }
        return resultado(true, "");
    }

    function direccion(t) {
        var texto = String(t === null || t === undefined ? "" : t).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (texto.length > 255) {
            return resultado(false, "Máximo 255 caracteres.");
        }
        if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü .,#\-\/°º]+$/.test(texto)) {
            return resultado(false, "Dirección inválida. Use letras, números y . , # - /");
        }
        return resultado(true, "");
    }

    function cantidad(v) {
        var texto = String(v === null || v === undefined ? "" : v).trim();
        if (texto === "") {
            return resultado(false, "Campo obligatorio.");
        }
        if (!/^\d+$/.test(texto)) {
            return resultado(false, "Ingrese un número entre 1 y 100.");
        }
        var numero = Number(texto);
        if (!Number.isInteger(numero) || numero < 1 || numero > 100) {
            return resultado(false, "Ingrese un número entre 1 y 100.");
        }
        return resultado(true, "");
    }

    function formatearCLP(n) {
        var numero = Number(n);
        if (!Number.isFinite(numero)) {
            return "$0";
        }
        var entero = Math.trunc(numero);
        var negativo = entero < 0;
        var texto = String(negativo ? Math.abs(entero) : entero);
        var partes = [];
        while (texto.length > 3) {
            partes.unshift(texto.slice(-3));
            texto = texto.slice(0, -3);
        }
        partes.unshift(texto);
        return "$" + (negativo ? "-" : "") + partes.join(".");
    }

    function normalizar(t) {
        var texto = String(t === null || t === undefined ? "" : t).toLowerCase();
        texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return texto.replace(/ñ/g, "n");
    }

    function contiene(textoCompleto, busqueda) {
        return normalizar(textoCompleto).indexOf(normalizar(busqueda)) !== -1;
    }

    window.Validaciones = {
        nombre: nombre,
        run: run,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        cantidad: cantidad,
        formatearCLP: formatearCLP,
        normalizar: normalizar,
        contiene: contiene
    };
}());