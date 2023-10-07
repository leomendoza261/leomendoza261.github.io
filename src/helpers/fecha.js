function formatearFecha(fechaString) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', opciones);
  }

export default formatearFecha