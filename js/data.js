"use strict";

(function () {
    "use strict";

    var CLAVE_PRODUCTOS = "ms_productos";
    var CLAVE_PEDIDOS = "ms_pedidos";
    var productos = null;
    var pedidos = null;

    var productosPrueba = [
        { numero: 3001, nombre: "Leche Entera 1L", cantidad: 120, valor: 1190, estado: "Habilitado" },
        { numero: 3002, nombre: "Tallarines 400g", cantidad: 85, valor: 1200, estado: "Habilitado" },
        { numero: 3003, nombre: "Arroz Grado 1 1kg", cantidad: 60, valor: 1500, estado: "Habilitado" },
        { numero: 3004, nombre: "Aceite Vegetal 900ml", cantidad: 0, valor: 2790, estado: "Deshabilitado" },
        { numero: 3005, nombre: "Coca-Cola 1.5L", cantidad: 45, valor: 2190, estado: "Habilitado" },
        { numero: 3007, nombre: "Pan de Molde 500g", cantidad: 70, valor: 1790, estado: "Habilitado" },
        { numero: 3008, nombre: "Azúcar 1kg", cantidad: 90, valor: 1390, estado: "Habilitado" },
        { numero: 3009, nombre: "Agua Cristal 2L", cantidad: 90, valor: 1050, estado: "Habilitado" },
        { numero: 3010, nombre: "Tallo de Apio", cantidad: 40, valor: 890, estado: "Habilitado" },
        { numero: 3011, nombre: "Huevos Blancos x12", cantidad: 35, valor: 3290, estado: "Habilitado" },
        { numero: 3012, nombre: "Yogurt Natural 1L", cantidad: 25, valor: 1690, estado: "Habilitado" },
        { numero: 3013, nombre: "Detergente Líquido 3L", cantidad: 18, valor: 6990, estado: "Habilitado" }
    ];

    var pedidosPrueba = [
        {
            numero: 1001,
            nombre: "María Pérez",
            run: "12.345.678-K",
            telefono: "+56911111111",
            correo: "maria@correo.cl",
            direccion: "Av. Libertad 123",
            detalle: [
                { cantidad: 2, productoNumero: 3002, producto: "Tallarines 400g", valorUnitario: 1200, valorVenta: 2400 },
                { cantidad: 3, productoNumero: 3003, producto: "Arroz Grado 1 1kg", valorUnitario: 1500, valorVenta: 4500 }
            ],
            total: 6900
        },
        {
            numero: 1002,
            nombre: "Juan Soto",
            run: "9.876.543-2",
            telefono: "+56922222222",
            correo: "juan@correo.cl",
            direccion: "Calle Los Aromos 456",
            detalle: [
                { cantidad: 2, productoNumero: 3002, producto: "Tallarines 400g", valorUnitario: 1200, valorVenta: 2400 },
                { cantidad: 4, productoNumero: 3003, producto: "Arroz Grado 1 1kg", valorUnitario: 1500, valorVenta: 6000 }
            ],
            total: 8400
        },
        {
            numero: 1003,
            nombre: "Ana Díaz",
            run: "15.234.567-8",
            telefono: "+56933333333",
            correo: "ana@correo.cl",
            direccion: "Pasaje Las Rosas 78",
            detalle: [
                { cantidad: 3, productoNumero: 3001, producto: "Leche Entera 1L", valorUnitario: 1190, valorVenta: 3570 },
                { cantidad: 3, productoNumero: 3007, producto: "Pan de Molde 500g", valorUnitario: 1790, valorVenta: 5370 },
                { cantidad: 4, productoNumero: 3011, producto: "Huevos Blancos x12", valorUnitario: 3290, valorVenta: 13160 }
            ],
            total: 22100
        },
        {
            numero: 1004,
            nombre: "Pedro Rojas",
            run: "11.222.333-4",
            telefono: "+56944444444",
            correo: "pedro@correo.cl",
            direccion: "Av. Central 900",
            detalle: [
                { cantidad: 2, productoNumero: 3010, producto: "Tallo de Apio", valorUnitario: 890, valorVenta: 1780 },
                { cantidad: 1, productoNumero: 3009, producto: "Agua Cristal 2L", valorUnitario: 1050, valorVenta: 1050 },
                { cantidad: 4, productoNumero: 3011, producto: "Huevos Blancos x12", valorUnitario: 3290, valorVenta: 13160 }
            ],
            total: 15990
        },
        {
            numero: 1005,
            nombre: "Luisa Vera",
            run: "18.765.432-1",
            telefono: "+56955555555",
            correo: "luisa@correo.cl",
            direccion: "Camino Real 321",
            detalle: [
                { cantidad: 3, productoNumero: 3001, producto: "Leche Entera 1L", valorUnitario: 1190, valorVenta: 3570 },
                { cantidad: 1, productoNumero: 3005, producto: "Coca-Cola 1.5L", valorUnitario: 2190, valorVenta: 2190 },
                { cantidad: 1, productoNumero: 3013, producto: "Detergente Líquido 3L", valorUnitario: 6990, valorVenta: 6990 }
            ],
            total: 12750
        }
    ];

    function copiar(valor) {
        return JSON.parse(JSON.stringify(valor));
    }

    function esArregloDeObjetos(valor) {
        return Array.isArray(valor) && valor.every(function (elemento) {
            return elemento && typeof elemento === "object" && !Array.isArray(elemento);
        });
    }

    function esArregloValido(clave, valor) {
        if (!esArregloDeObjetos(valor)) {
            return false;
        }
        if (clave === CLAVE_PRODUCTOS) {
            return valor.every(function (producto) {
                return Object.prototype.hasOwnProperty.call(producto, "numero") &&
                    Object.prototype.hasOwnProperty.call(producto, "nombre") &&
                    Object.prototype.hasOwnProperty.call(producto, "cantidad") &&
                    Object.prototype.hasOwnProperty.call(producto, "valor") &&
                    Object.prototype.hasOwnProperty.call(producto, "estado");
            });
        }
        if (clave === CLAVE_PEDIDOS) {
            return valor.every(function (pedido) {
                return Object.prototype.hasOwnProperty.call(pedido, "numero") &&
                    Object.prototype.hasOwnProperty.call(pedido, "nombre") &&
                    Object.prototype.hasOwnProperty.call(pedido, "run") &&
                    Object.prototype.hasOwnProperty.call(pedido, "telefono") &&
                    Object.prototype.hasOwnProperty.call(pedido, "correo") &&
                    Object.prototype.hasOwnProperty.call(pedido, "direccion") &&
                    Object.prototype.hasOwnProperty.call(pedido, "detalle") &&
                    Object.prototype.hasOwnProperty.call(pedido, "total");
            });
        }
        return false;
    }

    function leerClave(clave) {
        try {
            var texto = localStorage.getItem(clave);
            if (texto === null) {
                return null;
            }
            var valor = JSON.parse(texto);
            return esArregloValido(clave, valor) ? valor : null;
        } catch (error) {
            return null;
        }
    }

    function escribirClave(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            // Si localStorage falla, los datos continúan disponibles en memoria.
        }
    }

    function cargarDatos() {
        var productosGuardados = leerClave(CLAVE_PRODUCTOS);
        var pedidosGuardados = leerClave(CLAVE_PEDIDOS);

        productos = productosGuardados === null ? copiar(productosPrueba) : copiar(productosGuardados);
        pedidos = pedidosGuardados === null ? copiar(pedidosPrueba) : copiar(pedidosGuardados);

        if (productosGuardados === null) {
            escribirClave(CLAVE_PRODUCTOS, productos);
        }
        if (pedidosGuardados === null) {
            escribirClave(CLAVE_PEDIDOS, pedidos);
        }
    }

    function listarProductos() {
        return copiar(productos);
    }

    function listarProductosPedibles() {
        var pedibles = productos.filter(function (producto) {
            return producto.estado === "Habilitado" && producto.cantidad > 0;
        });
        return copiar(pedibles);
    }

    function listarPedidos() {
        var ordenados = pedidos.slice().sort(function (a, b) {
            return Number(a.numero) - Number(b.numero);
        });
        return copiar(ordenados);
    }

    function obtenerPedido(numero) {
        var pedido = pedidos.find(function (item) {
            return Number(item.numero) === Number(numero);
        });
        return pedido ? copiar(pedido) : null;
    }

    function calcularTotal(detalle) {
        if (!Array.isArray(detalle)) {
            return 0;
        }
        return detalle.reduce(function (total, linea) {
            var valor = Number(linea.valorVenta);
            return total + (Number.isFinite(valor) ? valor : 0);
        }, 0);
    }

    function guardarPedido(pedido) {
        var pedidoGuardado = pedido ? copiar(pedido) : {};
        var posicion = -1;

        if (pedidoGuardado.numero === null || pedidoGuardado.numero === undefined) {
            var mayor = 1000;
            pedidos.forEach(function (item) {
                var numero = Number(item.numero);
                if (Number.isSafeInteger(numero) && numero > mayor) {
                    mayor = numero;
                }
            });
            pedidoGuardado.numero = mayor + 1;
        } else {
            posicion = pedidos.findIndex(function (item) {
                return Number(item.numero) === Number(pedidoGuardado.numero);
            });
        }

        pedidoGuardado.detalle = Array.isArray(pedidoGuardado.detalle) ? pedidoGuardado.detalle : [];
        pedidoGuardado.total = calcularTotal(pedidoGuardado.detalle);

        if (posicion >= 0) {
            pedidoGuardado.numero = pedidos[posicion].numero;
            pedidos[posicion] = pedidoGuardado;
        } else {
            pedidos.push(pedidoGuardado);
        }

        escribirClave(CLAVE_PEDIDOS, pedidos);
        return copiar(pedidoGuardado);
    }

    function eliminarPedido(numero) {
        var posicion = pedidos.findIndex(function (item) {
            return Number(item.numero) === Number(numero);
        });
        if (posicion < 0) {
            return false;
        }
        pedidos.splice(posicion, 1);
        escribirClave(CLAVE_PEDIDOS, pedidos);
        return true;
    }

    function restablecer() {
        productos = copiar(productosPrueba);
        pedidos = copiar(pedidosPrueba);
        escribirClave(CLAVE_PRODUCTOS, productos);
        escribirClave(CLAVE_PEDIDOS, pedidos);
    }

    cargarDatos();

    window.Datos = {
        listarProductos: listarProductos,
        listarProductosPedibles: listarProductosPedibles,
        listarPedidos: listarPedidos,
        obtenerPedido: obtenerPedido,
        guardarPedido: guardarPedido,
        eliminarPedido: eliminarPedido,
        calcularTotal: calcularTotal,
        restablecer: restablecer
    };
}());