//seccion que sera el contenedor de mis productos
let productsContainer = document.getElementById("productsContainer");

let botonCarrito = document.getElementById("boton-carrito")
//agregado arreglo que ingresaran al carrito
let carrito = [];
let totalProductos = 0

//declaro array con mis productos
const productos = [
    { id: 1, img: "./img/pepperoni.png", product: "Pepperoni", price: 1300, desc: "Harina italiana, Mozzarella, salsa de tomate entera, pepperoni italiano real, pimiento picante, alcaparras, orégano"},
    { id: 2, img: "./img/polloychampinones.png", product: "Pollo y champiñones", price: 1400, desc: "Harina italiana, salsa a base de parmesano y crema, mozzarella, Dormula, pollo al horno, champiñones, pimientos, orégano" },
    { id: 3, img: "./img/carnemultiple.png", product: "Carne multiple", price: 1400, desc: "Salsa de tomate, mozzarella, carne de res, pepperoni, salchichas, pimientos, cebollas de Crimea, salsa de barbacoa, orégano" },
    { id: 4, img: "./img/salami.png", product: "Salami", price: 1200, desc: "Harina italiana, mozzarella, salsa de tomates enteros, salami premium, orégano" },
    { id: 5, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 6, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 7, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 8, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 9, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 10, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
    { id: 11, img: "./img/carnemultiple.png", product: "producto", price: 100, desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint ratione, dicta neque blanditiis architecto corrupti?" },
];

//traigo el contenedor del carrito
let carritoContainer = document.getElementById("carrito");
// funcion para mostrar roductos en el carrito
const mostrarCarrito = () => {
    carritoContainer.innerHTML = "";
    carrito.forEach((producto) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${producto.product}</h3>
            <b>$${producto.price}</b>
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoContainer.append(div);
        let botonCarrito = document.getElementById("boton-carrito");
        botonCarrito.textContent = ` (${totalProductos})`;
    });
        // Agregado de listeners a los botones de eliminar
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const id = boton.dataset.id;
                // Remover el producto del carrito
                carrito = carrito.filter((producto) => producto.id != id);
                totalProductos = carrito.length;
                localStorage.setItem('carrito', JSON.stringify(carrito)); // actualizar localStorage
                mostrarCarrito(); // mostrar el carrito actualizado
                Toastify({
                    text: "Eliminado",
                    duration: 2000,
                    newWindow: true,
                    gravity: "bottom",
                    position: "left",
                    style: {
                        background: "#00795b",
                    },
                }).showToast();
            });
        });
};

//funcion para buscar por id y mostrarlo por consola
const agregarProducto = (id) => {
    let producto = productos.find((item) => item.id === id);
    console.log(producto);
    carrito.push(producto);
    totalProductos++;
    mostrarCarrito();//llamo a la funcion mostrarCarrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // guarda en el localStorage
};

//leer los productos guardados en el carrito( del localstorage)
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    totalProductos = carrito.length;
    mostrarCarrito();
};

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="pizzas-container">
            <div class="aproduct">
                <img src="${producto.img}" alt="imagen del producto">
                <div class="product-desc">
                    <h3>${producto.product}</h3>
                    <p>${producto.desc}</p>
                </div>
                <b>$${producto.price}</b>
                <button id="boton${producto.id}">Agregar</button>
            </div>
        </div>
    `;
    productsContainer.append(div);
    let boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
        agregarProducto(producto.id)
        Toastify({
            text: "Agregado",
            duration: 2000,
            newWindow: true,
            gravity: "bottom",
            position: "left",
            style: {
                background: "#00795b",
            },
        }).showToast();
    });
});

