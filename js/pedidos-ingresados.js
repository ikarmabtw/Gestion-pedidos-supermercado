"use strict";

(function () {
    "use strict";

    if (document.body.getAttribute("data-vista") !== "pedidos-ingresados") {
        return;
    }

    var contenedorTabla = document.getElementById("tabla-pedidos-contenedor");
    var ayudaSeleccion = document.getElementById("ayuda-seleccion");
    var botonEditar = document.getElementById("btn-editar");
    var botonEliminar = document.getElementById("btn-eliminar");
    var titulo = document.getElementById("titulo-ingresados");
    var pedidoSeleccionado = null;

    function crearEncabezado(texto, alineacionDerecha) {
        var encabezado = document.createElement("th");
        encabezado.scope = "col";
        encabezado.textContent = texto;
        if (alineacionDerecha) {
            encabezado.className = "tabla-pedidos__derecha";
        }
        return encabezado;
    }

    function crearTabla() {
        var tabla = document.createElement("table");
        tabla.className = "tabla-pedidos";

        var caption = document.createElement("caption");
        caption.className = "detalle-solo-lectores";
        caption.textContent = "Lista de pedidos ingresados";
        tabla.appendChild(caption);

        var encabezado = document.createElement("thead");
        var filaEncabezado = document.createElement("tr");
        var encabezadoSeleccion = crearEncabezado("", false);
        var textoSeleccion = document.createElement("span");
        textoSeleccion.className = "detalle-solo-lectores";
        textoSeleccion.textContent = "Seleccionar";
        encabezadoSeleccion.appendChild(textoSeleccion);
        filaEncabezado.appendChild(encabezadoSeleccion);
        filaEncabezado.appendChild(crearEncabezado("Número Pedido", false));
        filaEncabezado.appendChild(crearEncabezado("Nombre Completo", false));
        filaEncabezado.appendChild(crearEncabezado("Correo", false));
        filaEncabezado.appendChild(crearEncabezado("Teléfono", false));
        filaEncabezado.appendChild(crearEncabezado("Total", true));
        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);

        var cuerpo = document.createElement("tbody");
        tabla.appendChild(cuerpo);
        return { tabla: tabla, cuerpo: cuerpo };
    }

    function crearCelda(texto, alineacionDerecha) {
        var celda = document.createElement("td");
        celda.textContent = texto;
        if (alineacionDerecha) {
            celda.className = "tabla-pedidos__derecha";
        }
        return celda;
    }

    function actualizarBotones() {
        var haySeleccion = pedidoSeleccionado !== null;
        botonEditar.disabled = !haySeleccion;
        botonEliminar.disabled = !haySeleccion;
        ayudaSeleccion.hidden = haySeleccion || contenedorTabla.querySelector("tbody tr[data-pedido]") === null;
    }

    function seleccionarFila(casilla, fila, pedido) {
        if (casilla.checked) {
            // Desmarca el resto antes de guardar la única fila seleccionada.
            var casillas = contenedorTabla.querySelectorAll(".tabla-pedidos__casilla");
            Array.prototype.forEach.call(casillas, function (otraCasilla) {
                otraCasilla.checked = false;
                otraCasilla.closest("tr").classList.remove("tabla-pedidos__fila--seleccionada");
            });
            casilla.checked = true;
            fila.classList.add("tabla-pedidos__fila--seleccionada");
            pedidoSeleccionado = pedido;
        } else if (pedidoSeleccionado &&
            Number(pedidoSeleccionado.numero) === Number(pedido.numero)) {
            pedidoSeleccionado = null;
            fila.classList.remove("tabla-pedidos__fila--seleccionada");
        }

        actualizarBotones();
    }

    function agregarFilaPedido(cuerpo, pedido) {
        var fila = document.createElement("tr");
        fila.setAttribute("data-pedido", String(pedido.numero));

        var celdaSeleccion = document.createElement("td");
        celdaSeleccion.className = "tabla-pedidos__celda-seleccion";
        var casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.className = "tabla-pedidos__casilla";
        casilla.setAttribute("aria-label", "Seleccionar pedido " + pedido.numero);
        casilla.addEventListener("change", function () {
            seleccionarFila(casilla, fila, pedido);
        });
        celdaSeleccion.appendChild(casilla);
        fila.appendChild(celdaSeleccion);

        fila.appendChild(crearCelda(String(pedido.numero), false));
        fila.appendChild(crearCelda(pedido.nombre, false));
        fila.appendChild(crearCelda(pedido.correo, false));
        fila.appendChild(crearCelda(pedido.telefono, false));
        fila.appendChild(crearCelda(
            window.Validaciones.formatearCLP(pedido.total),
            true
        ));
        cuerpo.appendChild(fila);
    }

    function dibujarTabla() {
        var pedidos = window.Datos.listarPedidos();
        var elementosTabla = crearTabla();

        while (contenedorTabla.firstChild) {
            contenedorTabla.removeChild(contenedorTabla.firstChild);
        }

        if (pedidos.length === 0) {
            var filaVacia = document.createElement("tr");
            var celdaVacia = document.createElement("td");
            celdaVacia.colSpan = 6;
            celdaVacia.className = "tabla-pedidos__sin-pedidos";
            celdaVacia.textContent = "No hay pedidos ingresados.";
            filaVacia.appendChild(celdaVacia);
            elementosTabla.cuerpo.appendChild(filaVacia);
        } else {
            pedidos.forEach(function (pedido) {
                agregarFilaPedido(elementosTabla.cuerpo, pedido);
            });
        }

        contenedorTabla.appendChild(elementosTabla.tabla);
        actualizarBotones();
    }

    function editarPedido() {
        if (!pedidoSeleccionado) {
            return;
        }
        window.location.href = "pedidos.html?editar=" + pedidoSeleccionado.numero;
    }

    function eliminarPedido() {
        if (!pedidoSeleccionado) {
            return;
        }

        var pedido = pedidoSeleccionado;
        window.Modal.mostrar({
            tipo: "confirmar",
            titulo: "Eliminar pedido",
            mensaje: "¿Está seguro de que desea eliminar el Pedido N° " +
                pedido.numero + " – " + pedido.nombre + "?",
            textoCancelar: "Cancelar",
            textoAceptar: "Confirmar",
            alAceptar: function () {
                window.Datos.eliminarPedido(pedido.numero);
                pedidoSeleccionado = null;
                // La tabla se vuelve a consultar aunque el pedido ya no exista.
                dibujarTabla();
                titulo.focus();
            }
        });
    }

    botonEditar.addEventListener("click", editarPedido);
    botonEliminar.addEventListener("click", eliminarPedido);
    dibujarTabla();
}());
