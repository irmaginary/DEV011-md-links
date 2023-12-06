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

const crearObj = (data, file) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(data)) !== null) {
    links.push({
      href: match[2], //extrae URL
      text: match[1], //extrae título
      file //extrae ruta
    });
    return links;
}
}


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
  crearObj
};

