# Docker Image - Exercício 1

1. Dockerizar uma aplicação existente em Node.js
2. Criar o Dockerfile. Construir, Testar, Publicar para o Docker Hub, Apagar local, Rodar novamente.
3. Utilizar versão oficial do Alpine para o `node` 6.x image

## Resolução

- Implementado o Dockerfile conforme os requisitos documentado por um "desenvolvedor" dentro do Dockerfile deste diretório (os comentários do dev foram mantidos)
- Criado o `.dockerignore` e definido arquivos/diretórios que não devem ser levados para imagem.
- Construir a imagem `docker image build -t testnode .`
- Rodar o container com a imagem `docker container run --rm -p 80:3000 nodetest`