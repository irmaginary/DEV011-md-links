const fs = require("fs");
const path = require("path");
// const axios = require("axios");
// const { Remarkable } = require("remarkable");

const mdLinks = (inputPath, validate) => {
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
      const verifExtension = path.extname(inputPath).toLowerCase();
      if (mdExtensiones.includes(verifExtension)) {
        console.log("Es un archivo Markdown.");

        // Leer y extraer enlaces 
        fs.readFile(inputPath, "utf-8", (err, contenidoMarkdown) => {
          if (err) {
            console.error(`Error al leer el archivo: ${err.message}`);
            reject(err);
          }else{
            const regex =  /\[([^\]]+)\]\(([^)]+)\)/g;
            const links = [];
            let match;
            while((match = regex.exec(contenidoMarkdown)) !== null) {
              links.push({
                href: match[2], //extrae URL
                text: match[1], //extrae tíulo
                file: inputPath, //extrae ruta
              });
            }
            resolve(links);
          }
      });
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
