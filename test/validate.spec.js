const { validateLinks } = require("../functions");

const mockLinks = [
  {
    href: "https://es.wikipedia.or/wiki/Markdown",
    text: "Markdown",
    file: "README copy.md",
  },
];
describe("validateLinks", () => {
  it("Debe validar el elemento href", (done) => {
    validateLinks(mockLinks).then((res) => {
      expect(res).toEqual([
        {
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
          file: "README copy.md",
          status: 200,
          statusText: "OK",
        },
      ]);
    });
    done();
  });
});

describe("validateLinks", () => {
it('Debe omitir status y status text si el elemento es falso', (done) => {
  validateLinks(mockLinks).catch((err) => {
    expect(err).toEqual([
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'README copy.md',
        status: 404,
        statusText: 'error',
      }
    ])
  })
  done()
})
});




// describe("validateLinks", () => {
//   it('debería validar el elemento href y agregar status y statusText', async () => {
//     const result = await validateLinks(mockLinks);
//     const expected = [
//       {
//         href: 'https://es.wikipedia.org/wiki/Markdown',
//         text: 'Markdown',
//         file: 'README copy.md',
//         status: 404, // Cambiado a 404 para simular un error
//         statusText: 'error',
//       }
//     ];
//     expect(result).toEqual(expected);
//   });

//   it('debería omitir status y statusText si el elemento es falso y manejar el error', async () => {
//     expect.assertions(1);
//     try {
//       await validateLinks([
//         {
//           href: 'https://es.wikipedia.org/wiki/Markdown',
//           text: 'Markdown',
//           file: 'README copy.md'
//         }
//       ]);
//     } catch (error) {
//       // La función validateLinks devuelve un array de objetos de error, por lo que se espera un array aquí
//       expect(error).toEqual([
//         {
//           href: 'https://es.wikipedia.org/wiki/Markdown',
//           text: 'Markdown',
//           file: 'README copy.md',
//           status: 404,
//           statusText: 'error',
//         }
//       ]);
//     }
//   });
// });
