let pedido = 3;
let tituloCarrito = document.querySelector("#titulo-carrito");
let imgCartVacio = document.querySelector("#img-carrito-vacio");
let h3CartVacio = document.querySelector("#h3-carrito-vacio");
let containerCarrito = document.querySelector("#container-carrito");

let productos = [
  {
    nombre: "Producto 1",
    cantidad: 2,
    precio: 125.0,
    imagen: "./images/producto1.jpg",
  },
  {
    nombre: "Producto 2",
    cantidad: 1,
    precio: 75.0,
    imagen: "./images/producto2.jpg",
  },
  {
    nombre: "Producto 3",
    cantidad: 3,
    precio: 45.0,
    imagen: "./images/producto3.jpg",
  },
];

function actualizarCarrito() {
  // Actualizar título
  tituloCarrito.textContent = `Your cart (${pedido})`;

  if (pedido > 0) {
    // Ocultar elementos de carrito vacío
    imgCartVacio.style.display = "none";
    h3CartVacio.style.display = "none";

    // Mostrar tabla de pedidos
    mostrarTablaPedidos();
  } else {
    // Mostrar elementos de carrito vacío
    imgCartVacio.style.display = "block";
    h3CartVacio.style.display = "block";

    // Remover tabla si existe
    const tablaExistente = containerCarrito.querySelector(".tabla-pedidos");
    if (tablaExistente) {
      tablaExistente.remove();
    }
  }
}

function mostrarTablaPedidos() {
  // Remover tabla anterior si existe
  const tablaAnterior = containerCarrito.querySelector(".tabla-pedidos");
  if (tablaAnterior) {
    tablaAnterior.remove();
  }

  // Crear tabla de pedidos
  const tabla = document.createElement("div");
  tabla.className = "tabla-pedidos w-full";

  // Calcular total
  const total = productos.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  tabla.innerHTML = `
        ${productos
          .map(
            (producto) => `
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <!-- Contenido a la izquierda -->
                <div class="flex-1">
                    <!-- Nombre del artículo arriba -->
                    <div class="text-sm text-gray-600 mb-1">${
                      producto.nombre
                    }</div>
                   
                    <div class="flex items-center gap-1 text-sm">
                        <div class="text-gray-600">${producto.cantidad}x</div>
                        
                        <div class="text-gray-600">${producto.precio.toFixed(
                          2
                        )}</div>
                        
                        <div class="font-bold text-gray-800">$${(
                          producto.precio * producto.cantidad
                        ).toFixed(2)}</div>
                    </div>
                </div>
                
               
                <div class="pl-4">
                    <button class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500">
                        <img src="./imges/icon-remove-item.svg" alt="Eliminar" class="w-4 h-4">
                    </button>
                </div>
            </div>
        `
          )
          .join("")}
        
        <!-- Total de la orden -->
        <div class="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
            <span class="font-semibold text-gray-600">Orden Total:</span>
            <span class="font-bold text-lg text-gray-800">$${total.toFixed(
              2
            )}</span>
        </div>
    `;

  // Agregar tabla al contenedor
  containerCarrito.appendChild(tabla);
}

// Función para quitar pedidos
function quitarPedido() {
  if (pedido > 0) {
    pedido--;
    actualizarCarrito();
  }
}

// Inicializar carrito
actualizarCarrito();
