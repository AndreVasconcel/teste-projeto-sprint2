async function extrairERecarregar() {
      try {
        const resposta = await fetch('http://localhost:3000/extrair-rss');
        if (!resposta.ok) throw new Error('Erro ao atualizar os dados');
        console.log('Dados atualizados com sucesso');
        carregarNoticias();
      } catch (erro) {
        console.error('Erro ao atualizar:', erro);
        alert('Falha ao atualizar as notícias. Verifique o servidor.');
      }
    }

    async function carregarNoticias() {
      try {
        const resposta = await fetch('http://localhost:3000/noticias/filtrar');
        if (!resposta.ok) throw new Error('Erro ao carregar os dados');
        const dados = await resposta.json();
        const lista = document.getElementById('lista-noticias');
        lista.innerHTML = '';
        if (dados.erro) {
          lista.innerHTML = '<li>Erro: ' + dados.erro + '</li>';
        } else if (Array.isArray(dados) && dados.length === 0) {
          lista.innerHTML = '<li></li>';
        } else if (Array.isArray(dados)) {
          dados.forEach(noticia => {
            const li = document.createElement('li');
            li.innerHTML = `
              <a href="${noticia.link}" target="_blank">${noticia.title}</a>
              <br><small>${noticia.pubDate}</small>
              <br>${noticia.description}
            `;
            lista.appendChild(li);
          });
        } else {
          lista.innerHTML = '<li>Formato de dados inválido.</li>';
        }
      } catch (erro) {
        console.error('Erro ao carregar:', erro);
        alert('Falha ao carregar as notícias. Tente novamente.');
      }
    }

    window.onload = carregarNoticias;