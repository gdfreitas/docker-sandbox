# Docker Volumes - Exercício 2

## Bind Mounts

- Usar Jekyll "Static Site Generator" para inicializar um local web server;
- Não necessáriamente precisa ser um desenvolvedor web: este exemplo é uma ponte entre acesso à arquivo local e aplicativos rodando em containers;
- Editar arquivos no computador host usando ferramentas como Visual Studio Code;
- O container detecta estas alterações nos arquivos do host e atualiza o web server;
- Utilizar imagem do bretfisher para servir jekyll:

```docker
docker run -p 80:4000 -v ${pwd}:/site bretfisher/jekyll-serve
```

- Atualizar o navegador e verificar alterações;
- Criar novos arquivos em `_posts/` e verificar alterações no site;