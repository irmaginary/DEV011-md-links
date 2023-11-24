const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Remarkable } = require("remarkable");

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
      const verifExtension = path.extname(inputPath).toLowerCase();
      if (mdExtensiones.includes(verifExtension)) {
        console.log("Es un archivo Markdown.");

        // Leer y extraer enlaces utilizando remarkable
        fs.readFile(inputPath, "utf-8", (err, contenidoMarkdown) => {
          if (err) {
            console.error(`Error al leer el archivo: ${err.message}`);
            reject(err);
            return;
          }
        const remarkable = new Remarkable();
        const tokens = remarkable.parse(contenidoMarkdown, {});

        // Filtrar los tokens para obtener solo los enlaces
        const urls = tokens
          .filter((token) => token.type === "inline")
          .map((token) => {
            // Extraer URLs del contenido del token
            const urlsInline = token.content.match(/\]\(([^)]+)\)/g);
            if (urlsInline) {
              return urlsInline.map((url) => url.substring(2, url.length - 1));
            }
            return [];
          })
          .flat();
        // Filtrar las URLs para excluir las que tienen #
        const urlsFiltradas = urls.filter((url) => !url.startsWith("#"));
        console.log("URLs de enlaces encontrados:");
        console.log(urlsFiltradas);
        resolve(urlsFiltradas);
      });

        // Usar axios para realizar solicitudes HTTP con las URLs extraídas
        // const solicitudesHTTP = urlsFiltradas.map((url) =>
        //   axios
        //     .get(url)
        //     .then((response) => {
        //       console.log(
        //         `Solicitud a ${url} exitosa. Estado: ${response.status}`
        //       );
        //     })
        //     .catch((error) => {
        //       console.error(
        //         `Error al realizar la solicitud a ${url}: ${error.message}`
        //       );
        //     })
        // );

        // // Esperar a que todas las solicitudes HTTP se completen antes de resolver la promesa
        // Promise.all(solicitudesHTTP)
        //   .then(() => {
        //     console.log("Todas las solicitudes HTTP completadas.");
        //     resolve(urlsFiltradas);
        //   })
        //   .catch((error) => {
        //     console.error("Error al realizar las solicitudes HTTP:", error);
        //     reject(error);
        //   });
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
