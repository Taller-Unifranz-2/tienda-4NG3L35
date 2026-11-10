// Cupones de descuento
const CUPONES = {
  UNIFRANZ10: 0.10,
  TALLER20: 0.20
};

function aplicarCupon(subtotal, codigo) {
  const descuento = CUPONES[codigo] || 0;
  return subtotal * (1 - descuento);
}
