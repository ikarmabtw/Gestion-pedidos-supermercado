"use strict";

(function () {
    "use strict";

    if (document.body.getAttribute("data-vista") !== "pedidos") {
        return;
    }

    var contenedor = document.getElementById("detalle-pedido");
    if (!contenedor) {
        return;
    }

    var raiz = document.body.getAttribute("data-raiz") || "";
    var filas = [];
    var filaActiva = null;
    var opcionesActuales = [];
    var indiceOpcionActiva = -1;
    var contadorIds = 0;
    var solicitudAperturaSelector = 0;
    var tabla;
    var cuerpoTabla;
    var contenedorTabla;
    var mensajeError;
    var campoTotal;
    var cajaSelector;
    var campoBusqueda;
    var listaOpciones;
    var pieResultados;
    var botonEliminar;

    contenedor.classList.add("detalle-contenedor");

    function crearElemento(etiqueta, clase, texto) {
        var elemento = document.createElement(etiqueta);
        if (clase) {
            elemento.className = clase;
        }
        if (texto !== undefined) {
            elemento.textContent = texto;
        }
        return elemento;
    }

    function crearInterfaz() {
        var barraBotones = crearElemento("div", "detalle-botones");
        var botonAgregar = crearElemento("button", "boton boton--azul", "Agregar fila");
        botonEliminar = crearElemento("button", "boton boton--azul", "Eliminar fila");
        var lineaInferior = crearElemento("div", "detalle-inferior");
        var grupoTotal = crearElemento("div", "detalle-total");
        var etiquetaTotal = crearElemento("label", "", "Total");
        var tablaCaption;
        var encabezado;
        var filaEncabezado;
        var textosEncabezado = [
            { titulo: "Cantidad *", ayuda: "Máx. 100" },
            { titulo: "Producto *" },
            { titulo: "Valor Unitario", clase: "tabla-detalle__texto-derecha" },
            { titulo: "Valor Venta", clase: "tabla-detalle__texto-derecha" }
        ];

        botonAgregar.type = "button";
        botonEliminar.type = "button";
        botonAgregar.addEventListener("click", agregarFila);
        botonEliminar.addEventListener("click", eliminarFila);
        barraBotones.appendChild(botonAgregar);
        barraBotones.appendChild(botonEliminar);

        contenedorTabla = crearElemento("div", "detalle-scroll");
        tabla = crearElemento("table", "tabla-detalle");
        tablaCaption = crearElemento("caption", "detalle-solo-lectores", "Detalle del pedido");
        encabezado = document.createElement("thead");
        filaEncabezado = document.createElement("tr");

        textosEncabezado.forEach(function (item) {
            var celda = document.createElement("th");
            celda.scope = "col";
            if (item.clase) {
                celda.className = item.clase;
            }
            celda.appendChild(document.createTextNode(item.titulo));
            if (item.ayuda) {
                celda.appendChild(crearElemento("span", "tabla-detalle__ayuda", item.ayuda));
            }
            filaEncabezado.appendChild(celda);
        });

        encabezado.appendChild(filaEncabezado);
        cuerpoTabla = document.createElement("tbody");
        tabla.appendChild(tablaCaption);
        tabla.appendChild(encabezado);
        tabla.appendChild(cuerpoTabla);
        contenedorTabla.appendChild(tabla);

        lineaInferior.appendChild(mensajeError = crearElemento("p", "detalle-error"));
        mensajeError.id = "detalle-error";
        mensajeError.setAttribute("aria-live", "polite");
        grupoTotal.appendChild(etiquetaTotal);
        campoTotal = crearElemento("output", "detalle-total__campo", window.Validaciones.formatearCLP(0));
        campoTotal.id = "detalle-total";
        campoTotal.setAttribute("aria-labelledby", "detalle-total-etiqueta");
        etiquetaTotal.id = "detalle-total-etiqueta";
        grupoTotal.appendChild(campoTotal);
        lineaInferior.appendChild(grupoTotal);

        cajaSelector = crearElemento("div", "selector-producto__caja");
        cajaSelector.hidden = true;
        var encabezadoBusqueda = crearElemento("div", "selector-producto__busqueda");
        campoBusqueda = document.createElement("input");
        campoBusqueda.type = "text";
        campoBusqueda.setAttribute("role", "combobox");
        campoBusqueda.setAttribute("aria-expanded", "true");
        campoBusqueda.setAttribute("aria-autocomplete", "list");
        campoBusqueda.setAttribute("aria-label", "Buscar producto");
        campoBusqueda.id = "selector-producto-busqueda";
        listaOpciones = document.createElement("ul");
        listaOpciones.className = "selector-producto__lista";
        listaOpciones.setAttribute("role", "listbox");
        listaOpciones.id = "selector-producto-lista";
        campoBusqueda.setAttribute("aria-controls", listaOpciones.id);
        var flechaArriba = document.createElement("img");
        flechaArriba.className = "selector-producto__flecha";
        flechaArriba.src = raiz + "assets/img/flecha-arriba.svg";
        flechaArriba.alt = "";
        flechaArriba.setAttribute("aria-hidden", "true");
        encabezadoBusqueda.appendChild(campoBusqueda);
        encabezadoBusqueda.appendChild(flechaArriba);
        pieResultados = crearElemento("p", "selector-producto__resultados");
        cajaSelector.appendChild(encabezadoBusqueda);
        cajaSelector.appendChild(listaOpciones);
        cajaSelector.appendChild(pieResultados);

        contenedor.appendChild(barraBotones);
        contenedor.appendChild(contenedorTabla);
        contenedor.appendChild(lineaInferior);
        contenedor.appendChild(cajaSelector);

        campoBusqueda.addEventListener("input", actualizarOpciones);
        campoBusqueda.addEventListener("keydown", controlarTecladoSelector);
        contenedorTabla.addEventListener("scroll", cerrarSelector);
        window.addEventListener("resize", function () {
            solicitudAperturaSelector += 1;
            cerrarSelector();
        });
        document.addEventListener("pointerdown", cerrarAlHacerClicFuera);
    }

    function crearFila() {
        contadorIds += 1;
        var fila = {
            id: contadorIds,
            producto: null,
            error: null,
            guardados: false,
            valorUnitario: null,
            valorVenta: null
        };
        var elementoFila = document.createElement("tr");
        var celdaCantidad = document.createElement("td");
        var celdaProducto = document.createElement("td");
        var celdaUnitario = document.createElement("td");
        var celdaVenta = document.createElement("td");
        var campoCantidad = document.createElement("input");
        var botonProducto = document.createElement("button");
        var textoProducto = crearElemento("span", "selector-producto__texto");
        var flechaAbajo = document.createElement("img");

        fila.elemento = elementoFila;
        fila.celdaCantidad = celdaCantidad;
        fila.celdaProducto = celdaProducto;
        fila.celdaUnitario = celdaUnitario;
        fila.celdaVenta = celdaVenta;
        fila.campoCantidad = campoCantidad;
        fila.botonProducto = botonProducto;
        fila.textoProducto = textoProducto;
        fila.valorUnitario = null;
        fila.valorVenta = null;

        elementoFila.className = "tabla-detalle__fila";
        celdaCantidad.className = "tabla-detalle__celda tabla-detalle__celda--cantidad";
        celdaProducto.className = "tabla-detalle__celda tabla-detalle__celda--producto";
        celdaUnitario.className = "tabla-detalle__celda tabla-detalle__celda--calculada";
        celdaVenta.className = "tabla-detalle__celda tabla-detalle__celda--calculada";
        campoCantidad.type = "text";
        campoCantidad.inputMode = "numeric";
        campoCantidad.maxLength = 3;
        campoCantidad.className = "detalle-cantidad";
        campoCantidad.setAttribute("aria-label", "Cantidad, fila " + (filas.length + 1));
        campoCantidad.dataset.fila = String(filas.length + 1);
        campoCantidad.addEventListener("input", function () {
            campoCantidad.value = campoCantidad.value.replace(/[^0-9]/g, "").slice(0, 3);
            fila.guardados = false;
            actualizarFila(fila, true);
        });

        botonProducto.type = "button";
        botonProducto.className = "selector-producto__boton";
        botonProducto.setAttribute("aria-haspopup", "listbox");
        botonProducto.setAttribute("aria-expanded", "false");
        botonProducto.setAttribute("aria-label", "Producto, fila " + (filas.length + 1));
        botonProducto.appendChild(textoProducto);
        flechaAbajo.src = raiz + "assets/img/flecha-abajo.svg";
        flechaAbajo.alt = "";
        flechaAbajo.setAttribute("aria-hidden", "true");
        botonProducto.appendChild(flechaAbajo);
        botonProducto.addEventListener("click", function () {
            abrirSelector(fila);
        });
        botonProducto.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " " || evento.key === "ArrowDown") {
                evento.preventDefault();
                abrirSelector(fila);
            }
        });

        celdaCantidad.appendChild(campoCantidad);
        celdaProducto.appendChild(botonProducto);
        elementoFila.appendChild(celdaCantidad);
        elementoFila.appendChild(celdaProducto);
        elementoFila.appendChild(celdaUnitario);
        elementoFila.appendChild(celdaVenta);
        filas.push(fila);
        cuerpoTabla.appendChild(elementoFila);
        actualizarFila(fila, false);
        return fila;
    }

    function cantidadEsCero(fila) {
        return /^0+$/.test(fila.campoCantidad.value.trim());
    }

    function cantidadValida(fila) {
        return window.Validaciones.cantidad(fila.campoCantidad.value).valido;
    }

    function filaEnBlanco(fila) {
        return fila.campoCantidad.value.trim() === "" && !fila.producto;
    }

    function actualizarMensajeError() {
        var indice = filas.findIndex(function (fila) {
            return Boolean(fila.error);
        });
        mensajeError.textContent = indice < 0
            ? ""
            : "Fila " + (indice + 1) + ": " + filas[indice].error;
    }

    function actualizarPresentacionError(fila) {
        var tieneError = Boolean(fila.error);
        fila.celdaCantidad.classList.toggle("tabla-detalle__celda--error", tieneError);
        fila.celdaProducto.classList.toggle("tabla-detalle__celda--error", tieneError);
        if (tieneError) {
            fila.campoCantidad.setAttribute("aria-invalid", "true");
            fila.campoCantidad.setAttribute("aria-describedby", mensajeError.id);
        } else {
            fila.campoCantidad.removeAttribute("aria-invalid");
            fila.campoCantidad.removeAttribute("aria-describedby");
        }
    }

    function actualizarDeshabilitada(fila) {
        var deshabilitada = cantidadEsCero(fila);
        fila.elemento.classList.toggle("tabla-detalle__fila--deshabilitada", deshabilitada);
        fila.botonProducto.disabled = deshabilitada;
        fila.botonProducto.setAttribute("aria-expanded",
            filaActiva === fila && !cajaSelector.hidden ? "true" : "false");
    }

    function calcularTotal() {
        return filas.reduce(function (suma, fila) {
            if (fila.producto && !cantidadEsCero(fila) && cantidadValida(fila)) {
                suma += Number(fila.valorVenta) || 0;
            }
            return suma;
        }, 0);
    }

    function actualizarFila(fila, cambioUsuario) {
        var textoCantidad = fila.campoCantidad.value.trim();
        var esCero = cantidadEsCero(fila);
        var resultadoCantidad = window.Validaciones.cantidad(textoCantidad);

        if (cambioUsuario && textoCantidad !== "" && !esCero && !resultadoCantidad.valido) {
            fila.error = resultadoCantidad.mensaje;
        } else if (esCero || (filaEnBlanco(fila))) {
            fila.error = null;
        } else if (fila.error && resultadoCantidad.valido && fila.producto) {
            fila.error = null;
        }

        fila.textoProducto.textContent = fila.producto ? fila.producto.nombre : "";
        fila.celdaUnitario.textContent = fila.producto
            ? window.Validaciones.formatearCLP(fila.valorUnitario)
            : "";

        if (esCero) {
            fila.celdaVenta.textContent = window.Validaciones.formatearCLP(0);
        } else if (fila.guardados && fila.producto && resultadoCantidad.valido) {
            fila.celdaVenta.textContent = window.Validaciones.formatearCLP(fila.valorVenta);
        } else if (fila.producto && resultadoCantidad.valido) {
            fila.valorUnitario = Number(fila.producto.valor);
            fila.valorVenta = Number(textoCantidad) * fila.valorUnitario;
            fila.celdaUnitario.textContent = window.Validaciones.formatearCLP(fila.valorUnitario);
            fila.celdaVenta.textContent = window.Validaciones.formatearCLP(fila.valorVenta);
        } else {
            fila.valorVenta = null;
            fila.celdaVenta.textContent = "";
        }

        if (!fila.producto) {
            fila.valorUnitario = null;
            fila.valorVenta = null;
            fila.celdaUnitario.textContent = "";
        }

        actualizarDeshabilitada(fila);
        actualizarPresentacionError(fila);
        actualizarMensajeError();
        campoTotal.textContent = window.Validaciones.formatearCLP(calcularTotal());
    }

    function obtenerProductosDisponibles() {
        var excluidos = filas.filter(function (fila) {
            return fila.producto && cantidadEsCero(fila);
        }).map(function (fila) {
            return String(fila.producto.numero);
        });
        return window.Datos.listarProductosPedibles().filter(function (producto) {
            return excluidos.indexOf(String(producto.numero)) < 0;
        });
    }

    function abrirSelector(fila) {
        if (fila.botonProducto.disabled) {
            return;
        }
        cerrarSelector();
        solicitudAperturaSelector += 1;
        var solicitudActual = solicitudAperturaSelector;
        fila.elemento.scrollIntoView({ block: "nearest", inline: "nearest" });
        window.requestAnimationFrame(function () {
            if (solicitudActual !== solicitudAperturaSelector || fila.botonProducto.disabled) {
                return;
            }
            filaActiva = fila;
            fila.botonProducto.setAttribute("aria-expanded", "true");
            cajaSelector.hidden = false;

            var rectCelda = fila.celdaProducto.getBoundingClientRect();
            var rectContenedor = contenedor.getBoundingClientRect();
            var anchoContenedor = contenedor.clientWidth;
            var ancho = Math.min(anchoContenedor, Math.max(220, rectCelda.width));
            var izquierda = Math.max(0, Math.min(
                rectCelda.left - rectContenedor.left,
                anchoContenedor - ancho
            ));
            var arriba = rectCelda.top - rectContenedor.top;
            // Estas coordenadas dependen de la celda visible y son la excepción permitida a los estilos desde JS.
            cajaSelector.style.top = arriba + "px";
            cajaSelector.style.left = izquierda + "px";
            cajaSelector.style.width = ancho + "px";
            campoBusqueda.setAttribute("aria-label", "Buscar producto, fila " +
                (filas.indexOf(fila) + 1));
            campoBusqueda.value = "";
            actualizarOpciones();
            campoBusqueda.focus();
        });
    }

    function limpiarListaOpciones() {
        while (listaOpciones.firstChild) {
            listaOpciones.removeChild(listaOpciones.firstChild);
        }
    }

    function actualizarNumeracionFilas() {
        filas.forEach(function (fila, indice) {
            fila.campoCantidad.setAttribute("aria-label", "Cantidad, fila " + (indice + 1));
            fila.botonProducto.setAttribute("aria-label", "Producto, fila " + (indice + 1));
            fila.campoCantidad.dataset.fila = String(indice + 1);
        });
    }

    function pintarOpcionActiva() {
        var opciones = listaOpciones.querySelectorAll('[role="option"]');
        opciones.forEach(function (opcion, indice) {
            var activa = indice === indiceOpcionActiva;
            opcion.classList.toggle("selector-producto__opcion--activa", activa);
            opcion.setAttribute("aria-selected", activa ? "true" : "false");
        });
        if (indiceOpcionActiva >= 0 && opciones[indiceOpcionActiva]) {
            campoBusqueda.setAttribute("aria-activedescendant",
                opciones[indiceOpcionActiva].id);
            opciones[indiceOpcionActiva].scrollIntoView({ block: "nearest" });
        } else {
            campoBusqueda.removeAttribute("aria-activedescendant");
        }
    }

    function actualizarOpciones() {
        limpiarListaOpciones();
        var busqueda = campoBusqueda.value.trim();
        var letras = busqueda.replace(/\s/g, "");
        if (letras.length < 3) {
            opcionesActuales = [];
            indiceOpcionActiva = -1;
            pieResultados.textContent = "Escriba al menos 3 letras";
            campoBusqueda.removeAttribute("aria-activedescendant");
            return;
        }

        opcionesActuales = obtenerProductosDisponibles().filter(function (producto) {
            return window.Validaciones.contiene(producto.nombre, busqueda);
        });
        indiceOpcionActiva = opcionesActuales.length > 0 ? 0 : -1;
        opcionesActuales.forEach(function (producto, indice) {
            var opcion = crearElemento("li", "selector-producto__opcion", producto.nombre);
            contadorIds += 1;
            opcion.id = "selector-producto-opcion-" + contadorIds;
            opcion.setAttribute("role", "option");
            opcion.setAttribute("aria-selected", indice === indiceOpcionActiva ? "true" : "false");
            opcion.addEventListener("click", function () {
                elegirProducto(producto);
            });
            listaOpciones.appendChild(opcion);
        });
        pieResultados.textContent = opcionesActuales.length === 1
            ? "1 resultado"
            : opcionesActuales.length + " resultados";
        pintarOpcionActiva();
    }

    function elegirProducto(producto) {
        if (!filaActiva) {
            return;
        }
        var fila = filaActiva;
        fila.producto = {
            numero: producto.numero,
            nombre: producto.nombre,
            valor: Number(producto.valor)
        };
        fila.guardados = false;
        actualizarFila(fila, false);
        cerrarSelector();
        fila.botonProducto.focus();
    }

    function cerrarSelector() {
        if (cajaSelector.hidden) {
            return;
        }
        if (filaActiva) {
            filaActiva.botonProducto.setAttribute("aria-expanded", "false");
        }
        cajaSelector.hidden = true;
        filaActiva = null;
        opcionesActuales = [];
        indiceOpcionActiva = -1;
    }

    function cerrarAlHacerClicFuera(evento) {
        if (cajaSelector.hidden) {
            solicitudAperturaSelector += 1;
            return;
        }
        var destino = evento.target;
        if (cajaSelector.contains(destino) ||
            (filaActiva && filaActiva.botonProducto.contains(destino))) {
            return;
        }
        cerrarSelector();
    }

    function controlarTecladoSelector(evento) {
        if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
            evento.preventDefault();
            if (opcionesActuales.length === 0) {
                return;
            }
            var avance = evento.key === "ArrowDown" ? 1 : -1;
            indiceOpcionActiva = (indiceOpcionActiva + avance + opcionesActuales.length) %
                opcionesActuales.length;
            pintarOpcionActiva();
        } else if (evento.key === "Enter") {
            evento.preventDefault();
            if (indiceOpcionActiva >= 0) {
                elegirProducto(opcionesActuales[indiceOpcionActiva]);
            }
        } else if (evento.key === "Escape") {
            evento.preventDefault();
            var boton = filaActiva ? filaActiva.botonProducto : null;
            cerrarSelector();
            if (boton) {
                boton.focus();
            }
        } else if (evento.key === "Tab") {
            evento.preventDefault();
            var botonCelda = filaActiva ? filaActiva.botonProducto : null;
            cerrarSelector();
            if (botonCelda) {
                botonCelda.focus();
            }
        }
    }

    function agregarFila() {
        var fila = crearFila();
        fila.campoCantidad.focus();
        fila.elemento.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    function resaltarFilasConDatos(resaltar) {
        filas.forEach(function (fila) {
            var tieneDatos = !filaEnBlanco(fila);
            fila.elemento.classList.toggle("tabla-detalle__fila--resaltada", resaltar && tieneDatos);
        });
    }

    function eliminarFila() {
        var filasBlancas = filas.filter(filaEnBlanco);
        if (filasBlancas.length >= 2) {
            var ultima = filasBlancas[filasBlancas.length - 1];
            ultima.elemento.remove();
            filas.splice(filas.indexOf(ultima), 1);
            actualizarNumeracionFilas();
            botonEliminar.focus();
            return;
        }

        if (filasBlancas.length === 1) {
            window.Modal.mostrar({
                tipo: "aviso",
                titulo: "Debe quedar al menos una fila en blanco",
                mensaje: "No es posible eliminar más filas. La tabla debe mantener como mínimo una fila en blanco disponible.",
                alCerrar: function () {
                    botonEliminar.focus();
                }
            });
            return;
        }

        resaltarFilasConDatos(true);
        window.Modal.mostrar({
            tipo: "aviso",
            titulo: "No se puede eliminar la fila",
            mensaje: "Las filas con un producto cargado no se pueden eliminar. Solo se pueden eliminar filas en blanco.",
            alCerrar: function () {
                resaltarFilasConDatos(false);
                botonEliminar.focus();
            }
        });
    }

    function filaIncompleta(fila) {
        var textoCantidad = fila.campoCantidad.value.trim();
        if (cantidadEsCero(fila) || (textoCantidad === "" && !fila.producto)) {
            fila.error = null;
            return false;
        }

        var resultado = window.Validaciones.cantidad(textoCantidad);
        if (!resultado.valido) {
            fila.error = resultado.mensaje;
            return true;
        }
        if (!fila.producto) {
            fila.error = "Seleccione un producto.";
            return true;
        }
        fila.error = null;
        return false;
    }

    function obtener() {
        return filas.filter(function (fila) {
            return fila.producto && !cantidadEsCero(fila) && cantidadValida(fila);
        }).map(function (fila) {
            return {
                cantidad: Number(fila.campoCantidad.value),
                productoNumero: fila.producto.numero,
                producto: fila.producto.nombre,
                valorUnitario: Number(fila.valorUnitario),
                valorVenta: Number(fila.valorVenta)
            };
        });
    }

    function validar() {
        var incompletas = 0;
        filas.forEach(function (fila) {
            if (filaIncompleta(fila)) {
                incompletas += 1;
            }
            actualizarPresentacionError(fila);
        });
        actualizarMensajeError();
        campoTotal.textContent = window.Validaciones.formatearCLP(calcularTotal());
        var sinProductos = obtener().length === 0;
        return {
            valido: !sinProductos && incompletas === 0,
            sinProductos: sinProductos,
            filasIncompletas: incompletas
        };
    }

    function limpiar() {
        cerrarSelector();
        while (cuerpoTabla.firstChild) {
            cuerpoTabla.removeChild(cuerpoTabla.firstChild);
        }
        filas = [];
        mensajeError.textContent = "";
        for (var indice = 0; indice < 5; indice += 1) {
            crearFila();
        }
        campoTotal.textContent = window.Validaciones.formatearCLP(0);
    }

    function cargar(detalle) {
        cerrarSelector();
        while (cuerpoTabla.firstChild) {
            cuerpoTabla.removeChild(cuerpoTabla.firstChild);
        }
        filas = [];
        mensajeError.textContent = "";

        (Array.isArray(detalle) ? detalle : []).forEach(function (linea) {
            var fila = crearFila();
            var catalogo = window.Datos.listarProductos().find(function (producto) {
                return String(producto.numero) === String(linea.productoNumero);
            });
            fila.campoCantidad.value = String(linea.cantidad);
            fila.producto = linea.producto ? {
                numero: linea.productoNumero,
                nombre: linea.producto,
                valor: Number(linea.valorUnitario)
            } : (catalogo ? {
                numero: catalogo.numero,
                nombre: catalogo.nombre,
                valor: Number(linea.valorUnitario)
            } : null);
            fila.valorUnitario = Number(linea.valorUnitario);
            fila.valorVenta = Number(linea.valorVenta);
            fila.guardados = true;
            actualizarFila(fila, false);
        });

        var blancas = filas.filter(filaEnBlanco).length;
        while (filas.length < 5 || blancas < 1) {
            crearFila();
            blancas += 1;
        }
        campoTotal.textContent = window.Validaciones.formatearCLP(calcularTotal());
    }

    function enfocarError() {
        var filaConError = filas.find(function (fila) {
            return Boolean(fila.error);
        });
        var filaObjetivo = filaConError || filas.find(filaEnBlanco) || filas[0];
        if (!filaObjetivo) {
            return false;
        }
        filaObjetivo.campoCantidad.focus();
        filaObjetivo.elemento.scrollIntoView({ block: "nearest", inline: "nearest" });
        return true;
    }

    crearInterfaz();
    for (var indiceInicial = 0; indiceInicial < 5; indiceInicial += 1) {
        crearFila();
    }

    window.PedidoDetalle = {
        obtener: obtener,
        validar: validar,
        limpiar: limpiar,
        cargar: cargar,
        total: calcularTotal,
        enfocarError: enfocarError
    };
}());
