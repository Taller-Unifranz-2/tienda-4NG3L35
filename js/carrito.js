// Carrito de compras

const TEXTO_BOTON = 'Añadir 🛒';

const carrito = [];

function agregarAlCarrito(id) {
  const producto = PRODUCTOS.find(function (p) { return p.id === id; });
  if (producto) carrito.push(producto);
  renderCarrito();
}

function subtotalCarrito() {
  return redondear(carrito.reduce(function (suma, p) { return suma + p.precio; }, 0));
}

function renderCarrito() {
  const lista = document.getElementById('carrito');
  lista.innerHTML = carrito.length
    ? carrito.map(function (p) { return '<li>' + p.nombre + ' · Bs ' + p.precio.toFixed(2) + '</li>'; }).join('')
    : '<li class="vacio">Tu carrito está vacío</li>';
  const subtotal = subtotalCarrito();
  document.getElementById('subtotal').textContent = 'Bs ' + subtotal.toFixed(2);
  const total = typeof calcularTotal === 'function' ? calcularTotal(subtotal) : subtotal;
  document.getElementById('total').textContent = 'Bs ' + total.toFixed(2);
}

document.querySelectorAll('.boton-agregar').forEach(function (boton) {
  boton.textContent = TEXTO_BOTON;
});

document.addEventListener('click', function (e) {
  const boton = e.target.closest('.boton-agregar');
  if (boton) agregarAlCarrito(Number(boton.dataset.id));
});

renderCarrito();

Tienda.listo('carrito');
