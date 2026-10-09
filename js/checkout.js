// Confirmación de la compra

function pagar() {
  const mensaje = document.getElementById('mensaje-pago');
  const metodo = document.getElementById('metodo-pago').value;
  const total = document.getElementById('total').textContent;
  mensaje.textContent = '✅ Compra confirmada: ' + total + ' con ' + metodo + '.';
  carrito.length = 0;
  renderCarrito();
}

document.getElementById('btn-pagar').addEventListener('click', pagar);

Tienda.listo('checkout');
