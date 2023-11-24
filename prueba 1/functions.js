const axios = require('axios');
const Remarkable = require('remarkable');

function leerYExtraerEnlaces(archivo) {
  const contenidoMarkdown = fs.readFileSync(archivo, 'utf-8');

  // Configurar Remarkable
  const remarkable = new Remarkable();

  // Parsear el contenido Markdown
  const tokens = remarkable.parse(contentoMarkdown, {});

  // Filtrar los tokens para obtener solo los enlaces
  const enlaces = tokens
    .filter(token => token.type === 'link_open')
    .map(token => ({
      href: token.href,
      text: tokens.find(t => t.type === 'text' && t.level === token.level).content,
    }));

  return enlaces;
}