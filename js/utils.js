// Funciones de apoyo compartidas

function redondear(n) {
  return Math.round(n * 100) / 100;
}

function formatearMoneda(n) {
  return CONFIG.moneda + ' ' + redondear(n).toFixed(2);
}

Tienda.listo('utils');
