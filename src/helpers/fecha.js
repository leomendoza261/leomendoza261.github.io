function formatearFecha(fechaString) {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fecha = new Date(fechaString);
  fecha.setHours(fecha.getHours() + 3); // Ajusta la fecha para la zona horaria de Buenos Aires (UTC+3)
  return fecha.toLocaleDateString('es-AR', opciones);
}

export default formatearFecha;
