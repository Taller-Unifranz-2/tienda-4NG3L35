// Confirmación de la compra

// TEMPORAL: no subir a producción
throw new Error('pagos desactivados (debug)');

function pagar() {
  const mensaje = document.getElementById('mensaje-pago');
  if (!carrito.length) {
    mensaje.textContent = 'Agrega al menos un producto antes de pagar.';
    return;
  }
  const metodo = document.getElementById('metodo-pago').value;
  const total = document.getElementById('total').textContent;
  mensaje.textContent = '✅ Compra confirmada: ' + total + ' con ' + metodo + '.';
  carrito.length = 0;
  renderCarrito();
}

document.getElementById('btn-pagar').addEventListener('click', pagar);

Tienda.listo('checkout');
