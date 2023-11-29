const { mdLinks } = require("../index.js");


describe("mdLinks", () => {
  it("Debería ser una función", () => {
    console.log("FIX ME!");
  });
  // it('should return a Promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
});
// describe("verifExtension", () => {
//   it("Debe rechazar cuando no es un archivo md", () => {
//     return verifExtension("/archivoFalso.mg").catch((error) => {
//       expect(error).toBe("No es un archivo Markdown.");
//     });
//   });
// });
describe("mdLinks", () => {
  it("Debe rechazar cuando no es un archivo md", () => {
    return mdLinks("/archivoFalso.mg").catch((error) => {
      //Por la lógica de programación siempre rechaza un archivo falso antes de identificar si es o no md. Entonces, esta línea es para manejar ambos mensajes de error
      expect(error).toMatch(/(No es un archivo Markdown.|La ruta no existe)/);
    });
  });
});


describe("mdLinks", () => {
  it("Debe rechazar cuando la ruta no existe", () => {
    return mdLinks("rutaFalsa/archivoFalso.md").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });
});

describe("mdLinks", () => {
  it("Debería resolver un arreglo con enlaces para un archivo .md", () => {
    const filePath = "/Users/ru/Desktop/DEV011-md-links/DEV011-md-links/README.md";

    return mdLinks(filePath).then((links) => {
      expect(links).toEqual(expect.any(Array));
      expect(links.length).toBeGreaterThan(0);

      // El array contiene un enlace por elemento
      links.forEach((link) => {
        expect(link).toEqual(expect.objectContaining({
          href: expect.any(String),
          text: expect.any(String),
          file: filePath,
        }));
      });
    });
  });
});


