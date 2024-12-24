/* Creacion de un array con productos */
const productos = [
  {
    id: "Rolex-01",
    titulo: "Rolex 01",
    imagen: "imgs/reloj-rolex1.jpg",
    categoria: {
      nombre: "Rolex",
      id: "Rolex"
    },
    precio: 75000
  },
  {
    id: "Rolex-02",
    titulo: "Rolex 02",
    imagen: "imgs/reloj-rolex2.webp",
    categoria: {
      nombre: "Rolex",
      id: "Rolex"
    },
    precio: 90000
  },
  {
    id: "Rolex-03",
    titulo: "Rolex 03",
    imagen: "imgs/reloj-rolex3.webp",
    categoria: {
      nombre: "Rolex",
      id: "Rolex"
    },
    precio: 120000
  },
  {
    id: "Casio-01",
    titulo: "Casio 01",
    imagen: "imgs/reloj-casio1.webp",
    categoria: {
      nombre: "Casio",
      id: "Casio"
    },
    precio: 750000
  },
  {
    id: "Casio-02",
    titulo: "Casio 02",
    imagen: "imgs/reloj-casio2.webp",
    categoria: {
      nombre: "Casio",
      id: "Casio"
    },
    precio: 90000
  },
  {
    id: "Casio-03",
    titulo: "Casio 03",
    imagen: "imgs/reloj-casio3.webp",
    categoria: {
      nombre: "Casio",
      id: "Casio"
    },
    precio: 120000
  },
  {
    id: "Zenith-01",
    titulo: "Zenith 01",
    imagen: "imgs/reloj-zenith1.webp",
    categoria: {
      nombre: "Zenith",
      id: "Zenith"
    },
    precio: 75000
  },
  {
    id: "Zenith-02",
    titulo: "Zenith 02",
    imagen: "imgs/reloj-zenith2.webp",
    categoria: {
      nombre: "Zenith",
      id: "Zenith"
    },
    precio: 90000
  },
  {
    id: "Zenith-03",
    titulo: "Zenith 03",
    imagen: "imgs/reloj-zenith3.webp",
    categoria: {
      nombre: "Zenith",
      id: "Zenith"
    },
    precio: 120000
  },
  {
    id: "Seiko-01",
    titulo: "Seiko 01",
    imagen: "imgs/reloj-seiko1.webp",
    categoria: {
      nombre: "Seiko",
      id: "Seiko"
    },
    precio: 75000
  },
  {
    id: "Seiko-02",
    titulo: "Seiko 02",
    imagen: "imgs/reloj-seiko2.webp",
    categoria: {
      nombre: "Seiko",
      id: "Seiko"
    },
    precio: 90000
  },
  {
    id: "Seiko-03",
    titulo: "Seiko 03",
    imagen: "imgs/reloj-seiko3.webp",
    categoria: {
      nombre: "Seiko",
      id: "Seiko"
    },
    precio: 120000
  }
];
/*variables desde el DOM*/
const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar;
const numerito = document.querySelector("#numerito");
/*variables de menu principal mobil*/
const hamburguesa = document.querySelector(".menu");
const enlaces = document.querySelectorAll(".navegacion a");

/* funciones */

function mostrarMenu() {
  hamburguesa.addEventListener("click", () => {
    document.querySelector(".navegacion").classList.toggle("ocultar");
  });
}
mostrarMenu();

function cerrarMenu() {
  enlaces.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const seccion = document.querySelector(e.target.attributes.href.value);
      console.log(seccion);
      cambioSeccion(seccion);

      if (e.target.tagName === "A") {
        document.querySelector(".navegacion").classList.add("ocultar");
      }
    });
  });
}
cerrarMenu();

/* función scroll navegación */
function cambioSeccion(seccion) {
  seccion.scrollIntoView({
    behavior: 'smooth'
  });
}

/*funcion que crea cada tarjeta de productos*/
function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img
              class="producto-imagen"
              src="${producto.imagen}"
              alt="${producto.titulo}"
            />
            <div class="producto-detalles">
              <h4 class="producto-titulo">${producto.titulo}</h4>
              <div class="contenedor-descuento">
                <p class="producto-precio">${producto.precio}</p>
                <p class="descuento">
                  <span class="numero-descuento">10</span>% OFF
                </p>
              </div>
              <p class="precio-off">${producto.precio- producto.precio*0.10}</p>
              <button class="producto-agregar" type="submit" id=${producto.id}>
                Agregar carrito
              </button>
           
            </div>
    `;
    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
};

/*cargamos todos los productos*/
cargarProductos(productos);

/* recorremos cada boton del aside de la sectcion productos y filtramos por categoria*/
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => { boton.classList.remove("active") })
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
      const tituloProducto = productos.find(producto => producto.categoria.id === e.currentTarget.id);
      tituloPrincipal.innerText = tituloProducto.categoria.nombre;
      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los relojes";
      cargarProductos(productos);
    }

  });

})
/*al seleccionar cada boton de categoria el boton de agregar se vuelve a crear en la funcion cargarProductos(), por eso debemos volver a obtener la nueva clase (agregar-producto) de cada boton y en el cual podemos aplicar el evento "click". */
function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  })
};
/*funcion que agrega a un array el producto seleccionado con el evento, buscandolo en el array de productos y comparando su id de producto.*/
let productosEnCarrito;
let productosEnCarritoLs = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLs) {
  productosEnCarrito = JSON.parse(productosEnCarritoLs);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);
  if (productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;

  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumerito();
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

/*Sumar Productos en el carrito */
function actualizarNumerito() {
 let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}

/*mobil de carrito index
 */



/*   <button class="producto-comprar" type="submit" id=${producto.id}>Comprar</button>*/