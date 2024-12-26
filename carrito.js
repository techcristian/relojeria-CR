/* traemos del almacenamiento local los productos agregados */
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprarCarrito= document.querySelector("#comprar-carrito");   
const botonVaciarCarrito= document.querySelector("#vaciar-carrito");
let subTotal=document.querySelector("#sub-total");
let total=document.querySelector("#total");

function cargarProductosCarrito(){
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    
    contenedorCarritoProductos.innerHTML="";
    
    productosEnCarrito.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
   <img
    class="carrito-producto-imagen"
    src= ${producto.imagen}
    alt=${producto.titulo}
  />
  <div class="items-carrito">
    <div class="item-carrito">
      <div class="carrito-producto-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
      </div>
      <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
      </div>
      <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>${producto.precio}</p>
      </div>
      <div class="carrito-precio-descuento">
        <small>Precio Descuento</small>
        <p class="carrito-precio-off">${producto.precio - producto.precio*0.10}</p>
        <p class="carrito-descuento">
          <span class="numero-descuento">10</span>% OFF
        </p>
      </div>
      <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>${(producto.precio - producto.precio*0.10)*producto.cantidad}</p>
      </div>
    </div>
    <button class="carrito-producto-eliminar" id=${producto.id}>
      <i class="fa-solid fa-trash"></i>Eliminar
    </button>
  </div>
      `;
      contenedorCarritoProductos.append(div);
  
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  };
  actualizarBotonesEliminar();
  actualizarsubTotal()
  actualizarTotal()
};

cargarProductosCarrito();
function actualizarBotonesEliminar(){
  botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach(boton=>{
    boton.addEventListener("click", eliminarCarrito);
  })

};

function eliminarCarrito(e){
  const idBoton = e.currentTarget.id;
  const index= productosEnCarrito.findIndex(producto => producto.id === idBoton);
  productosEnCarrito.splice(index,1);
  cargarProductosCarrito();

  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
};
/*boton vaciar carrito*/
botonVaciarCarrito.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
  productosEnCarrito.length=0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
};

function actualizarsubTotal(){
  subTotal.innerText= productosEnCarrito.reduce((acc,producto)=> acc+((producto.precio-producto.precio*0.10)* producto.cantidad),0);
  
}
function actualizarTotal(){
  total.innerText= productosEnCarrito.reduce((acc,producto)=> acc+((producto.precio-producto.precio*0.10)* producto.cantidad),0);
  
}
/*boton comprar carrito */
botonComprarCarrito.addEventListener("click",comprarCarrito);
function comprarCarrito(){
  productosEnCarrito.length=0;
  localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");

}



/*<div class="carrito-producto">
<img
  class="carrito-producto-imagen"
  src="imgs/reloj-rolex1.jpg"
  alt="carrito-01"
/>
<div class="items-carrito">
  <div class="item-carrito">
    <div class="carrito-producto-titulo">
      <small>Titulo</small>
      <h3>Rolex 01</h3>
    </div>
    <div class="carrito-producto-cantidad">
      <small>Cantidad</small>
      <p>1</p>
    </div>
    <div class="carrito-producto-precio">
      <small>Precio</small>
      <p>$75000</p>
    </div>
    <div class="carrito-precio-descuento">
      <small>Precio Descuento</small>
      <p class="carrito-precio-off">$67.500</p>
      <p class="carrito-descuento">
        <span class="numero-descuento">10</span>% OFF
      </p>
    </div>
    <div class="carrito-producto-subtotal">
      <small>Subtotal</small>
      <p>$67500</p>
    </div>
  </div>
  <button class="carrito-producto-eliminar">
    <i class="fa-solid fa-trash"></i>Eliminar
  </button>
</div>
</div>*/