const fs = require("fs");
const path = require("path");

const mdLinks = (inputPath, options) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if (fs.existsSync(inputPath)) {
      // Identificar si la ruta es absoluta
      const esAbsoluta = path.isAbsolute(inputPath);

      if (!esAbsoluta) {
        // Si no es absoluta: convertir a absoluta
        inputPath = path.resolve(inputPath);
        resolve("Ruta convertida");
      } else {
        // Si es absoluta
        resolve("Es absoluta");
      }

      // Aquí puedes agregar la lógica para verificar si es un archivo o directorio
    } else {
      // Si no existe la ruta: reject
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};

