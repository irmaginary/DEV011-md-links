const { mdLinks } = require("../index.js");

describe("mdLinks", () => {
  it("should...", () => {
    console.log("FIX ME!");
  });
  // it('should return a Promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
});

describe("mdLinks", () => {
  it("debe rechazar cuando la ruta no existe", () => {
    return mdLinks("rutaFalsa/archivoFalso.md").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });
});
