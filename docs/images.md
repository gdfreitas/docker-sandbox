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


Listar as imagens que estão no cache local

```docker
docker image ls
```

Baixar uma imagem (irá baixar a tag `latest` que acompanha um hash, caso a mesma já esteja no repositório local como latest, este hash será a garantia de que sejam a mesma, caso contrário baixa novamente)

```docker
docker image pull nginx
```

Exibir histórico de uma imagem imagem, contendo suas camadas:

```docker
docker history nginx
```

**Observação:** a técnica de aplicar alterações em imagens através de camadas (_layers_) diminui consideravelmente o tamanho entre essas imagens porque, como é possível identificar através do comando anterior, só irá ser considerado alterações em mesma camada, as outras camadas caso não sejam alteradas continuarão com o mesmo SHA1 hash e não serão duplicadas e não será necessário efetuar o download/upload mais de uma vez.

Exemplo: criar servidores http do `SITE A` e do `SITE B`

`MinhaImagem | Apache | Port 80 | COPY A ou COPY B`

Nota-se que as três primeiras camadas permanecem as mesmas, porém na última, existe a necessidade de copiar dois diretórios diferentes. É aí que o Docker não armazena toda a pilha de camadas para cada build para o A e para o B, as camadas que continuarem a mesma, serão baixadas somente 1 vez para ambas as builds.

**Observação:** ao iniciar um container sobre uma imagem, é criado uma layer adicional de leitura/escrita.

Inspecionar uma imagem permite verificar suas configurações, portas, comandos, variáveis de ambientes, autor, arquitetura, id, etc.

```docker
docker image inspect nginx
```

Criar tag de uma imagem:

```docker
docker image tag nginx gabrieldfreitas/nginx
```

Subir imagem para o [repositório pessoal do Docker Hub](https://hub.docker.com/u/gabrieldfreitas/) (é necessário estar autenticado `docker login`)

```docker
docker image push gabrieldfreitas/nginx
```

Construir uma imagem a partir de um Dockerfile

```docker
docker image build -t customnginx .
```

Construir uma imagem passando argumentos:

```docker
docker image build --build-arg S3_BUCKET=myapp -t custom-image-args .
```

[Docker Image - Exercício 1](basics/image-assignment-1/image_assingment_1.md)