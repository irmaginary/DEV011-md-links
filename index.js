const { verificarExistencia, convertirRutaAbsoluta, verificarExtensionMarkdown, leerContenidoMarkdown } = require("./functions.js");

const mdLinks = (inputPath, validate) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if (verificarExistencia(inputPath)) {
      // Identificar si la ruta es absoluta
      const esAbsoluta = convertirRutaAbsoluta(inputPath);
      // Si la ruta no es absoluta, convertirla
      if (!esAbsoluta) {
        inputPath = convertirRutaAbsoluta(inputPath);
        console.log("Ruta convertida");
      } else {
        // Si es absoluta
        console.log("Es absoluta");
      }
      // Verificar si es un archivo o directorio comprobando extensión de md
      if (verificarExtensionMarkdown(inputPath)) {
        console.log("Es un archivo Markdown.");

        // Leer y extraer enlaces 
        leerContenidoMarkdown(inputPath)
          .then(contenidoMarkdown => {
            const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
            const links = [];
            let match;
            while ((match = regex.exec(contenidoMarkdown)) !== null) {
              links.push({
                href: match[2], //extrae URL
                text: match[1], //extrae título
                file: inputPath, //extrae ruta
              });
            }
            resolve(links);
          })
          .catch(err => reject(err));
      } else {
        console.log("No es un archivo Markdown.");
        reject("No es un archivo Markdown.");
      }
    } else {
      // Si no existe la ruta: reject
      console.log("La ruta no existe");
      reject("La ruta no existe");
    }
  });
};

module.exports = {
  mdLinks,
};

