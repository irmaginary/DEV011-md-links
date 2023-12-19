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
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let links = [];
  let match;
  while ((match = regex.exec(data)) !== null) {
    //el while sigue ejecutando el match regex hasta que sea null
    links.push({
      href: match[2],
      text: match[1],
      file,
    });
  }
  return links;
};

const validateLinks = (links) => {
  const verifArray = links.map((i) => {
    const newItem = { ...i };
    return axios
      .get(newItem.href)
      .then((res) => {
        newItem.status = res.status;
        newItem.statusText = res.statusText;
        return newItem;
      })
      .catch((error) => {
        newItem.status = !error.response ? 404 : error.response.status;
        newItem.statusText = "FAIL";
        return newItem;
      });
  });

  return Promise.all(verifArray);
};

const stats = (verifArray) => {
  //primero checar si vienen validados(esto se hace en el cli.js)
  //si sí, entonces corre esta función
  const validatedLinks = verifArray;
  let countLinks = validatedLinks.length;
  let uniqueLinks = new Set(validatedLinks.map((links) => links.href)).size;
  const brokenLinks = validatedLinks.filter(
    (links) => links.statusText !== "OK"
  ).length;
   return { countLinks, uniqueLinks, brokenLinks };
  }


module.exports = {
  verificarExistencia,
  convertirRutaAbsoluta,
  verificarExtensionMarkdown,
  leerContenidoMarkdown,
  validateLinks,
  crearObj,
  stats,
};
