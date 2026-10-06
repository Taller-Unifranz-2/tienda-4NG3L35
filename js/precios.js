// Precios, IVA y catálogo

const IVA = 0.12;

function calcularTotal(subtotal) {
  return redondear(subtotal * (1 + IVA));
}

function mostrarPrecio(n) {
  return 'Bs ' + n.toFixed(2);
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


Tienda.listo('precios');
