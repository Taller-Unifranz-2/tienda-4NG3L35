// Precios, IVA y catálogo

const IVA = 0.13;

function calcularTotal(subtotal) {
  return redondear(subtotal * (1 + IVA));
}

function mostrarPrecio(n) {
  return formatearMoneda(n);
}

function renderCatalogo() {
  const contenedor = document.getElementById('catalogo');
  contenedor.innerHTML = PRODUCTOS.map(function (p) {
    return '<article class="producto">' +
      '<h3>' + p.nombre + '</h3>' +
      '<p class="precio">' + mostrarPrecio(p.precio) + '</p>' +
      '<button class="boton boton-agregar" data-id="' + p.id + '" type="button"></button>' +
      '</article>';
  }).join('');
}

renderCatalogo();

Tienda.prueba('IVA del 13%: Bs 100 + IVA = Bs 113', function () {
  return calcularTotal(100) === 113;
});

Tienda.listo('precios');
