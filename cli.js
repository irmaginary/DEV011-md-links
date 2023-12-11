const { mdLinks } = require("./index.js");
const args = process.argv.slice(2);
const validate = args.includes("--validate");
const filePath = args.filter(arg => arg !== "--validate")[0];

console.log("ruta: " + filePath);
console.log("option: " + validate);

mdLinks(filePath, validate)

  .then((results) => {
    console.log("Enlaces encontrados:", results);
  })
  .catch((err) => {
    console.log(err);
  });



  // .then((res) => {console.log(res)})
  // .catch((error) => {
  //   console.log(error);
  // });
  // .then(links => {
  //   console.log(links);
  // })
  // .catch(error => {
  //   console.error(error);
  // });
