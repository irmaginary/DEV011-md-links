const { validateLinks } = require("../functions");
//const mdLinks = require("../index");

const mockLinks = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'README copy.md'
    }
  ]

describe("validateLinks", () => {
    it('Debe validar el elemento href', (done) => {
        validateLinks(mockLinks).then((res) => {
            expect(res).toEqual([
                {
                  href: 'https://es.wikipedia.org/wiki/Markdown',
                  text: 'Markdown',
                  file: 'README copy.md',
                  status: 200,
                  statusText: 'OK',
                }
              ])
        })
        done()
    })

})