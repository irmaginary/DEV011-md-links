const fs = require("fs");
const path = require("path");

const mdLinks = (inputPath, options) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if (fs.existsSync(inputPath)) {
      // Identificar si la ruta es absoluta
      const esAbsoluta = path.isAbsolute(inputPath);
      // Si la ruta no es absoluta, convertirla
      if (!esAbsoluta) {
        inputPath = path.resolve(inputPath);
        console.log("Ruta convertida");
      } else {
        // Si es absoluta
        console.log("Es absoluta");
      }

      // Verificar si es un archivo o directorio comprobando extensión de md
      const mdExtensiones = [
        ".md",
        ".mkd",
        ".mdwn",
        ".mdown",
        ".mdtxt",
        ".mdtext",
        ".markdown",
        ".text",
      ];
      const verifExtension = path.extname(inputPath).toLocaleLowerCase();
      if (mdExtensiones.includes(verifExtension)) {
        console.log("Es un archivo Markdown.");
      } else {
        console.log("No es un archivo Markdown.");
      }

      //resolve();
    } else {
      // Si no existe la ruta: reject
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};
