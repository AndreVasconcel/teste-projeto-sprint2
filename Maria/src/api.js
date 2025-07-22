const express = require('express');
const { lerRss } = require('./rss-reader');
const { salvarDadosLocalmente } = require('./s3-handler');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

const port = 3000;


app.get('/extrair-rss', async (req, res) => {
  try {
    const noticias = await lerRss();
    salvarDadosLocalmente(noticias);
    res.json(noticias);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha ao extrair o RSS', detalhes: erro.message });
  }
});


app.get('/noticias', (req, res) => {
  try {
    console.log('Tentando ler noticias.json');
    const dados = JSON.parse(fs.readFileSync(__dirname + '/noticias.json', 'utf8'));
    console.log('Dados lidos:', dados);
    res.json(dados);
  } catch (erro) {
    console.error('Erro ao carregar notícias:', erro);
    res.status(500).json({ erro: 'Falha ao carregar as notícias', detalhes: erro.message });
  }
});


app.get('/noticias/filtrar', (req, res) => {
  try {
    console.log('Tentando ler noticias.json para filtro');
    const dados = JSON.parse(fs.readFileSync(__dirname + '/noticias.json', 'utf8'));
    console.log('Dados lidos para filtro:', dados);
    const filtradas = dados.filter(noticia => {
      const tituloLower = noticia.title.toLowerCase();
      return (
        tituloLower.includes('inss') ||
        tituloLower.includes('aposentadoria') ||
        tituloLower.includes('previdência') ||
        tituloLower.includes('pensão') ||
        tituloLower.includes('benefício') ||
        tituloLower.includes('saúde') ||
        tituloLower.includes('reforma') ||
        tituloLower.includes('idoso') ||
        tituloLower.includes('teto') ||
        tituloLower.includes('contribuição')
      );
    });
    console.log('Filtradas:', filtradas);
    res.json(filtradas);
  } catch (erro) {
    console.error('Erro no filtro:', erro);
    res.status(500).json({ erro: 'Falha ao carregar as notícias filtradas', detalhes: erro.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});