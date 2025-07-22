const Parser = require('rss-parser');
const parser = new Parser();

async function lerRss() {
    try {
        const noticias = await parser.parseURL('https://res.stj.jus.br/hrestp-c-portalp/RSS.xml');
        return noticias.items.map(item => ({
            title: item.title || 'Sem título',
            link: item.link || 'Sem link',
            pubDate: item.pubDate || 'Sem data',
            description: item.contentSnippet || 'Sem descrição'
        }));

        return noticias;
    }   catch (erro) {
        console.error('Erro ao ler RSS:', erro);
        throw erro;
    }
}

module.exports = { lerRss };
