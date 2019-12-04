# Docker Images

- **Definição:** é um composto com os binários, códigos-fontes, bibliotecas, etc que compõe uma aplicação;

[Docker Image Specification v1.0.0](https://github.com/moby/moby/blob/master/image/spec/v1.md)

## O que é uma imagem

- Binários de uma aplicação e suas dependências
- Metadados sobre os dados da imagem e como rodá-la
- Definição oficial: "...uma imagem é uma coleção ordenada de um sistema de arquivos e os parametros de execução correspondentes para serem utilizados em conjunto com um container em seu tempo de execução..."
- Não é um S.O completo. Não tem kernel, nem módulos do kernel (drivers, etc)

## Características imagens

- O registry (repositório) padrão do Docker para imagens é chamado de Docker Hub [hub.docker.com](https://hub.docker.com/explore/);
- Modelo de sistema de arquivo somente-leitura usado para criar containers;
- Imagens são criadas através de um processo chamado **build**;
- São compostas por uma ou mais camadas, chamadas também de **layers**;
- Uma camada representa uma ou mais mudanças no sistema de arquivo;
- Uma camada é também chamada de imagem intermediária;
- A junção dessas camadas formam a imagem;
- Apenas a última camada pode ser alterada quando o container for iniciado;
- AUFS (Advanced multi-layered unification filesystem) é muito usado;
- O grande objetivo dessa estratégia de dividir uma imagem em camadas é o reuso;
- É possível compor imagens a partir de camadas de outras imagens;

## Hands-on

## Listar as imagens que estão no cache local

```docker
docker image ls
```

## Baixar uma imagem

Irá baixar a tag `latest` que acompanha um hash, caso a mesma já esteja no repositório local como latest, este hash será a garantia de que sejam a mesma, caso contrário baixa novamente.

```docker
docker image pull nginx
```

## Exibir histórico de uma imagem imagem, contendo suas camadas

```docker
docker history nginx
```

## Camadas _(layers)_ e Cache

Através do Union File System é possibilitado a identificação de alterações seriais realizadas em um sistema de arquivos, permitindo que nas construções de imagens do Docker, as camadas que não foram modificadas, sejam obitidas diretamente de um Cache já realizado anteriormente, evitando processamento, otimizando tempo e disperdício de upload/download através da rede.

Exemplo: Criar servidores HTTP do `SITE A` e do `SITE B`

- SITE A: `MinhaImagem > Apache > Port 80 > COPY A`
- SITE B: `MinhaImagem > Apache > Port 80 > COPY B`

Nota-se que as três primeiras camadas permanecem as mesmas, porém na última, existe a necessidade de copiar dois diretórios diferentes. As camadas que continuarem a mesma, serão executadas e baixadas somente 1 vez para ambas as builds.

**Observação:** Ao iniciar um container sobre uma imagem, é criado uma layer adicional de leitura/escrita acima de todas as layers existentes.

## Inspecionando

Inspecionar uma imagem permite verificar suas configurações, portas, comandos, variáveis de ambientes, autor, arquitetura, id, etc.

```docker
docker image inspect nginx
```

## Criando Tag

```docker
docker image tag nginx gabrieldfreitas/nginx
```

## Build de um Dockerfile

O Dockerfile deste exemplo pode ser encontrado em [`dockerfile-official-nginx-image`](samples/dockerfile-official-nginx-image)

```docker
docker image build -t customnginx .
```

É possível testar o sistema de cache em camadas _(layers)_ fazendo um build normal da imagem acima, e posteriormente alterando o `EXPOSE` para expor uma outra porta (Ex: 8080), ao efetuar o build novamente, somente da camada alterada para baixo será necessário efetuar o rebuild.

**Importante**: Sabendo dos sistema de cache em camadas, podemos perceber que é uma boa prática manter nas partes de baixo do arquivo as coisas que costumam ter maior chance de serem alteradas, e no topo as de menor ocorrência.

## Build com ARG

```docker
docker image build --build-arg S3_BUCKET=myapp -t custom-image-args .
```

## Manter o sistema Docker limpo com PRUNE

É possível utilizar o comando `prune` para efetuar uma limpeza nas imagens, volumes, build cache e containers.

```sh
docker image prune # Apaga somente imagens "penduradas"
docker image prune -a # Apaga todas as imagens que não estão sendo utilizadas
docker system prune # Apaga tudo
docker system df # Verificar espaço em disco utilizado
```

## Docker Registry

Uma repositório (registry) de imagens deve fazer parte do seu plano de containers.

Além do Docker Hub, exitem outras inumeras opções, como [podem ser vistas aqui](https://github.com/veggiemonk/awesome-docker#registry)

### Registry [Docker Hub](https://hub.docker.com)

- É o mais popular repositório público de imagens docker
- Também contém processo de image building, o que não faz parte de um registry
- Vincula contas do GitHub e BitBucket para realizar auto-build de images automatizados via CI através de web hooks nos commits
- Permissionamentos, organizações, etc

### Subindo imagem para o Registry

Subir imagem para o [repositório pessoal do Docker Hub](https://hub.docker.com/u/gabrieldfreitas/) (é necessário estar autenticado `docker login`)

```docker
docker image push gabrieldfreitas/nginx
```

### Rodando Registry Local

- Permite gerenciar seu próprio image registry
- É parte do docker/distribution no Github
- Não possui todas as features do Hub e outros, não possui web UI, é somente o básico de autenticação
- Em seu core, é uma web API e um storage system, e é escrito na linguagem Go, assim como Docker
- Para storage suporta local, s3, azure, alibaba, google cloud e openstack swift.
- Roda por padrão como uma web api na porta 5000
- Basta utilizar o comando `docker container run -d -p 5000:5000 --name registry -v $(pwd)/registry-data:/var/lib/registry registry`
- Para fazer o push de imagens, deve ser utilizado a tag do repositório, para isto, iremos baixar a imagem hello-world para utilizar de exemplo `docker pull hello-world`
- Para criar a tag `docker tag hello-world 127.0.0.1:5000/hello-world`
- `docker push 127.0.0.1:5000/hello-world`

## Exercícios

### Exercício 01

1. Dockerizar uma aplicação existente em Node.js
2. Criar o Dockerfile. Construir, Testar, Publicar para o Docker Hub, Apagar local, Rodar novamente.
3. Utilizar versão oficial do Alpine para o `node` 6.x image

#### Resolução

- Implementado o Dockerfile conforme os requisitos documentado por um "desenvolvedor" dentro do Dockerfile deste diretório (os comentários do dev foram mantidos)
- Criado o `.dockerignore` e definido arquivos/diretórios que não devem ser levados para imagem.
- Construir a imagem `docker image build -t testnode .`
- Rodar o container com a imagem `docker container run --rm -p 80:3000 nodetest`

> [A aplicação pode ser encontrada em **dockerfile-nodejs-app**](samples/dockerfile-nodejs-app)

## Referências

- [Docker Image Specification v1.0.0](https://github.com/moby/moby/blob/master/image/spec/v1.md)
- [Docker Docs - About storage drivers: How to properly build and store Images](https://docs.docker.com/storage/storagedriver/)
- [Docker Docs - docker build](https://docs.docker.com/engine/reference/commandline/build/)
- [Docker Docs - Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Docker Docs - HEALTHCHECK in Dockerfile](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Docker Docs - ENTRYPOINT in Dockerfiles](https://docs.docker.com/engine/reference/builder/#entrypoint)
- [Docker Docs - ENTRYPOINT Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint)
- [Docker Docs - Registry Configuration Docs](https://docs.docker.com/registry/configuration/)
- [Docker Docs - Registry Garbage Collection](https://docs.docker.com/registry/garbage-collection/)
- [Docker Docs - Use Registry As A "Mirror" of Docker Hub](https://docs.docker.com/registry/recipes/mirror/)

___

- [Docker MySQL Official Image Entrypoint Script that creates ENV's from files (for secrets)](https://github.com/docker-library/mysql/blob/a7a737f1eb44db467c85c8229df9d886dd63460e/8.0/docker-entrypoint.sh#L21-L41)
