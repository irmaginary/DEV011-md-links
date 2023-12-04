const { mdLinks } = require("./index.js");
mdLinks("README copy.md", false)
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})
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
