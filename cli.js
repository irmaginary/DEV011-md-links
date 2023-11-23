const { mdLinks } = require("./index.js");
mdLinks("/Users/ru/Desktop/DEV011-md-links/DEV011-md-links/docs/01-milestone.md")
  .then((res) => {console.log(res)})
  .catch((error) => {
    console.log(error);
  });
