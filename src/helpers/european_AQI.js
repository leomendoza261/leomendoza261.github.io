function obtenerCalidadAire(indice) {
    if (indice >= 0 && indice <= 10) {
      return "Bueno";
    } else if (indice > 10 && indice <= 20) {
      return "Aceptable";
    } else if (indice > 20 && indice <= 25) {
      return "Moderado";
    } else if (indice > 25 && indice <= 50) {
      return "Deficiente";
    } else if (indice > 50 && indice <= 75) {
      return "Muy deficiente";
    } else if (indice > 75 && indice <= 800) {
      return "Extremadamente deficiente";
    } else {
      return "Valor no válido";
    }
  }

export default obtenerCalidadAire