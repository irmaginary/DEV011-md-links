//validate
//puedes usar un .map para recorrer todos los objetos y
//retornar una promesa de fetch o axios.
//Luego tu función validar puede retornar un Promise.all
//con el array de promesas resultado del .map
// return new Promise((resolve, reject) => {
//   Links.map({ status: axios.status });
// });

const fs = require("fs");
const path = require("path");

const verificarExistencia = (ruta) => {
  return fs.existsSync(ruta);
};

const convertirRutaAbsoluta = (ruta) => {
  return path.isAbsolute(ruta) ? ruta : path.resolve(ruta);
};

const verificarExtensionMarkdown = (ruta) => {
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
  const verifExtension = path.extname(ruta).toLowerCase();
  return mdExtensiones.includes(verifExtension);
};

const leerContenidoMarkdown = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf-8", (err, contenidoMarkdown) => {
      if (err) {
        console.error(`Error al leer el archivo: ${err.message}`);
        reject(err);
      } else {
        resolve(contenidoMarkdown);
      }
    });
  });
};

module.exports = {
  verificarExistencia,
  convertirRutaAbsoluta,
  verificarExtensionMarkdown,
  leerContenidoMarkdown,
};

