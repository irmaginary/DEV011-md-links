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
const axios = require("axios");

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


const validateLinks = (links) => {
  const verifArray = links.map((i) => {
    const newItem = {...i};
    return axios.get(newItem.href)
    .then((res) => {
      newItem.status = res.status;
      newItem.statusText = res.statusText;
      return newItem;
    })
    .catch((error) => {
      newItem.status = !error.response ? 404 : error.response.status;
      newItem.statusText = "error";
      return newItem;
      });
  });
  return Promise.all(verifArray);
}

module.exports = {
  verificarExistencia,
  convertirRutaAbsoluta,
  verificarExtensionMarkdown,
  leerContenidoMarkdown,
  validateLinks,
};

