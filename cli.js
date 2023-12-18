const { mdLinks } = require("./index.js");
const { stats } = require("./functions.js");

const args = process.argv.slice(2);
const validate = args.includes("--validate");
const statsOption = args.includes("--stats");
const filePath = args.find(arg => !arg.startsWith("--"));

console.log("ruta: " + filePath);
console.log("option: " + validate);
console.log("stats: " + statsOption);

if (!filePath) {
  console.error("Error: Debes proporcionar la ruta del archivo");
} else {
  mdLinks(filePath, validate)
    .then((results) => {
      if (statsOption) {
        const statistics = stats(results, validate);
        if (validate && statsOption) {
          console.log("Estadísticas:", statistics);
        } else {
          console.log("Estadísticas:", {
            countLinks: statistics.countLinks,
            uniqueLinks: statistics.uniqueLinks,
          });
        }
      } else {
        console.log("Enlaces encontrados:", results);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
