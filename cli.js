const { mdLinks } = require("./index.js");
mdLinks("README copy.md")
  .then((res) => {console.log(res)})
  .catch((error) => {
    console.log(error);
  });
