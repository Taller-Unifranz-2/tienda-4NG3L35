// Métodos de pago

const METODOS_PAGO = ['Efectivo', 'QR'];

function renderPagos() {
  const select = document.getElementById('metodo-pago');
  select.innerHTML = METODOS_PAGO.map(function (m) {
    return '<option>' + m + '</option>';
  }).join('');
}

renderPagos();

Tienda.listo('pagos');
