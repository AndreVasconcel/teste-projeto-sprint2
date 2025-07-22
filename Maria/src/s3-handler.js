const fs = require('fs');

function salvarDadosLocalmente(dados) {
  try {
    fs.writeFileSync(__dirname + '/noticias.json', JSON.stringify(dados, null, 2));
    console.log('Dados salvos em src/noticias.json');
  } catch (erro) {
    console.log('Erro ao salvar os dados:', erro);
    throw erro;
  }
}

module.exports = { salvarDadosLocalmente };