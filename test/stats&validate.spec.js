const { stats } = require("../functions");

const mockLinks = [
  {
    href: 'https://es.javascript.info/recursion',
    text: 'Qué es la recursividad y cómo crear funciones recursivas - javascript.info',
    file: 'README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial',
    file: 'README.md',
    status: 404,
    statusText: 'FAIL'
  },
  {
    href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
    text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
    file: 'README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
    text: 'Asíncronía en js',
    file: 'README.md',
    status: 404,
    statusText: 'FAIL'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',
    text: 'Patrones para coincidencia de caracteres con expresiones regulares - mozilla.org',
    file: 'README.md',
    status: 200,
    statusText: 'OK'
  },
];
describe("stats", () => {
    it("Debe mostrar la cuenta de los links, los links únicos y los rotos", () => {
      const result = stats(mockLinks);
  
      expect(result).toEqual({
        countLinks: 5,
        uniqueLinks: 5,
        brokenLinks: 2,
      });
    });
  });

// describe("validateLinks", () => {
// it('Debe omitir status y status text si el elemento es falso', (done) => {
//   validateLinks(mockLinks).catch((err) => {
//     expect(err).toEqual([
//       {
//         href: 'https://es.wikipedia.org/wiki/Markdown',
//         text: 'Markdown',
//         file: 'README copy.md',
//         status: 404,
//         statusText: 'error',
//       }
//     ])
//   })
//   done()
// })
// });