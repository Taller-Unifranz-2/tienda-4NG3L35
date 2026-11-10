// Métodos de pago

// Los métodos ahora vienen de la configuración
const METODOS_PAGO = CONFIG.pagos.metodos;

function renderPagos() {
  const select = document.getElementById('metodo-pago');
  select.innerHTML = METODOS_PAGO.map(function (m) {
    return '<option value="' + m + '">' + m + '</option>';
  }).join('');
}

renderPagos();

Tienda.listo('pagos');
