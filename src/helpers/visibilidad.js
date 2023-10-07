function obtenerVisibilidad(metros) {
    if (metros >= 0 && metros <= 25) {
      return "Niebla densísima, sin visibilidad.";
    } else if (metros > 25 && metros <= 50) {
      return "Niebla muy densa, sin visibilidad.";
    } else if (metros > 50 && metros <= 100) {
      return "Niebla espesa, muy poca visibilidad.";
    } else if (metros > 100 && metros <= 500) {
      return "Niebla, muy poca visibilidad.";
    } else if (metros > 500 && metros <= 1000) {
      return "Niebla, poca visibilidad.";
    } else if (metros > 1000 && metros <= 2000) {
      return "Neblina, escasa visibilidad.";
    } else if (metros > 2000 && metros <= 4000) {
      return "Neblina, poca visibilidad.";
    } else if (metros > 4000 && metros <= 10000) {
      return "Neblina, visibilidad moderada.";
    } else if (metros > 10000 && metros <= 20000) {
      return "Buena visibilidad.";
    } else if (metros > 20000 && metros <= 50000) {
      return "Muy buena visibilidad.";
    } else if (metros > 50000) {
      return "Excelente visibilidad.";
    } else {
      return "Valor no válido";
    }
  }
  
export default obtenerVisibilidad;