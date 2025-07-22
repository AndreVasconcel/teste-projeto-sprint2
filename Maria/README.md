# Projeto 2 (Sprint 2 e 3)

Avaliação das segunda e terceira sprints do Scholarship Compass UOL para formação em Inteligência Artificial para AWS.

***

## Execução (Código Fonte)

Faça uma API em JavaScript/NodeJS implementada em Docker na AWS para extrair informações relevantes de um site com conteúdo em formato RSS. Esta aplicação deve salvar os dados em arquivo JSON dentro de um bucket S3, e permitir a consulta do conteúdo salvo através de uma página html.

**Especificações**:

1. Escolher um site de conteúdo público com RSS (como notícias, blogs, etc. e **deve ser diferente dos demais squads**);
2. Desenvolver uma API para extrair parte o conteúdo RSS do site;
3. Salvar o conteúdo extraído em arquivo JSON dentro de um bucket S3;
4. Subir esta API utilizando Docker;
5. Criar uma página html para fazer consultas à API construída em NodeJS (pode ser bem simples, o layout não será avaliado);
6. Exemplo de RSS com NodeJS:
    * [Create an RSS Reader in Node](https://sabe.io/tutorials/rss-reader-node)

## Docker

Execução em Docker, dentro da AWS Cloud.

* Subir o projeto NodeJS em Docker na cloud AWS.
* O grupo pode ficar livre quanto à estratégia adotada para executar o Docker na AWS.
* Exemplos de como executar:
  * [Deploy Node js Application on AWS EC2 Server](https://youtu.be/VHzeoDK6L0c?feature=shared)
  * [Docker na AWS: EC2 ou Elastic Beanstalk? O que é melhor?](https://youtu.be/TJSK9MRPZs4?si=FCm_lDQWIVEUAHlj)

***

## O que será avaliado?

* Uso do projeto em NodeJS;
* Solução em Docker;
* Projeto em produção na cloud AWS;
* Seguir as atividades na ordem proposta;
* Subir códigos no git ao longo do desenvolvimento;
* Organização geral do código fonte:
  * Estrutura de diretórios;
  * Estrutura da lógica de negócio;
  * Divisão de responsabilidades em arquivos/diretórios distintos;
  * Otimização do código fonte (evitar duplicações de código);
* Objetividade do README.md;
* Modelo de organização da equipe para o desenvolvimento do projeto;
* Página criada com acesso online.

***

## Entrega

* **O trabalho será feito em squad**;
* Criar uma branch no repositório com o formato squad-número (exemplo: squad-1);
* Conferir se o site de interesse já não foi escolhido por outro squad;
* Subir o trabalho na branch do squad com um README.md:
  * Documentar detalhes sobre como a avaliação foi desenvolvida;
  * Relatar dificuldades conhecidas;
  * Descrever como utilizar o sistema;
  * Fornecer a URL para acesso à página;
* 🔨 Disponibilizar o código fonte desenvolvido (observar estruturas de diretórios);
* Colocar o arquivo com a configuração nginx (se utilizado).
* O prazo e o repositório de entrega estão descritos nas **Informações** iniciais do curso no AIR Learning.
***