const {
  verificarExistencia,
  convertirRutaAbsoluta,
  verificarExtensionMarkdown,
  leerContenidoMarkdown,
  validateLinks,
  crearObj,
} = require("./functions.js");

const mdLinks = (inputPath, validate) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if (verificarExistencia(inputPath)) {
      // Identificar si la ruta es absoluta
      const esAbsoluta = convertirRutaAbsoluta(inputPath);
      // Si la ruta no es absoluta, convertirla
      if (!esAbsoluta) {
        inputPath = convertirRutaAbsoluta(inputPath);
        //console.log("Ruta convertida");
      } 
      // Verificar si es un archivo o directorio comprobando extensión de md
      if (verificarExtensionMarkdown(inputPath)) {
        //console.log("Es un archivo Markdown.");

        // Leer y extraer enlaces
        leerContenidoMarkdown(inputPath)
          .then((contenidoMarkdown) => {
            const links = crearObj(contenidoMarkdown, inputPath);
            if (validate) {
              validateLinks(links).then((res) => resolve(res));
            } else {
              resolve(links);
            }
          })
          .catch((err) => reject(err));
      } else {
        reject("No es un archivo Markdown.");
      }
    } else {
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};
