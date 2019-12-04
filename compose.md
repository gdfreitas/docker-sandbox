# Docker Compose

## [Documentation](https://docs.docker.com/compose/compose-file/#dockerfile)

## Instalação

- Já vem incluso no **Docker Desktop** ou **Docker Toolbox** (Windows/Mac)
- Linux `pip install docker-compose`

- Verificar versão após instalar `docker-compose version`

Suas releases podem ser acompanhadas no [github](https://github.com/docker/compose/releases), visto que é uma ferramenta à parte do Docker.

## Componentes

Quando se fala de docker compose, podemos identificar 2 grandes componentes que podem ser utilizados separadamente ou juntos, para fazer diferentes coisas.

### Compose CLI (`docker-compose`)

É a ferramenta de linha de comando, que tem seu design feito com base no fluxo de trabalho de um desenvolvedor, para ambientes de desenvolvimento e de testes no intuito de gerenciar múltiplos containers.

Como a CLI conversa diretamente com o docker daemon, é praticamente um substituto do CLI do docker.

**Importante:** **Não é uma ferramenta para produção**

**Observação sobre DNS:** Similar ao RUN que atribui o nome do container como hostname, no compose é utilizado o service_name como hostname no DNS do Docker.

### Exemplo candidato ao uso do Compose

Comando bastante longo que se torna um belo candidato ao uso do compose, evitando assim criação de shell scripts por exemplo.

```sh
docker run -p 8080:3000 -p 9229:9229 -e NODE_ENV=development -v $(pwd):/app/yournodeapp ../node_modules/.bin/nodemon --inspect=0.0.0.0:9229 ./bin/www
```

### O arquivo de Compose

Representa o arquivo YAML que descreve uma solução para containers, networks, volumes, etc

### YAML

- É um arquivo para descrever dados simples de forma que possa ser serializada e processada por alguma ferramenta posteriormente.
- Muitas ferramentas de mercado a utilizam, como Docker, Kubernetes, Amazon, etc.
- Comparando com JSON, XML o foco do YATML é ser de fácil de leitura para humanos, utilizando pares de _chave: valor_ e identação com espaços

- [YAML Get Started](https://yaml.org/start.html)
- [YAML Ref Card](https://yaml.org/refcard.html)

### Compose YAML

Para utilizar com o Docker compose, temos algumas especificações

- Por padrão o nome do arquivo é `docker-compose.yml`, porém pode ser nomeado de qualquer maneira é somente utilizar o `-f` no comando para especificar o arquivo que será utilizado.
- Possui suas próprias versões: `1`, `2`, `2.1`, `3`, `3.7`, [... versions](https://docs.docker.com/compose/compose-file/compose-versioning/)
- Diferenças entre versão 2 e 3, não são substituíveis, possuem diferentes objetivos:
  - A **versão 2** é para ser utilizado em _single-node_, ou seja, única maquina, à exemplo Dev/Test.
  - A **versão 3** é para ser utilizada em _multi-node_, ou sejha, em orquestrações, através do Docker Swarm, por exemplo.

### Formato de um Compose YAML

`docker-compose.yml`

```yaml
version: '3.1'  # Se nenhuma versão for especificada é assumido v1. O recomendado é no mínimo v2

services:  # Containers, mesmo que um "docker run"

  servicename: # Um nome amigável pois também será o nome no DNS dentro da redenetwork
    image: # É opcional caso seja utilizado o "build" para fazer o build da imagem (faz no formato <diretorio_corrente_service_name>), caso não seja feito o build, deve haver o nome:tag da imagem a ser utilizada
    command: # Opcional, com o intuito de substituir o CMD padrão específicado pela imagem
    environment: # Opcional, mesmo que um "-e" no "docker run"
    volumes: # Opcional, mesmo que um "-v" no "docker run"

  servicename2:
    # ...

volumes: # Opcional mesmo que um "docker volume create"

networks: # Opcional mesmo que um "docker network create"
```

## Principais comandos

### Compose UP

É o comando "faz tudo", faz o build/pull das imagens caso ainda não existam, cria os volumes, redes, containers, inicializa os containers em modo _detached_

```sh
docker compose up
```

### Compose DOWN

É o comando "remove tudo", para os containers e remove os containers, redes e volumes

```sh
docker compose down
```

Aqui algumas flags podem ser utilizadas:

- `-v`, `--volumes` remove automaticamente todos os *named volumes*
- `-t`, `--timeout` permite especificar um tempo de timeout para executar o shutdown _(Default: 10)_
- `--rmi all/local` permite remover todas as imagens utilizadas por qualquer serviço / remover somente imagens que não possuem nenhuma tag customizada pelo campo _image_

### Comandos para um Service específico

Muitos comandos podem ter o service_name como opção

- **build** para fazer o build/rebuild da imagem de um determinado serviço
- **stop** para parar determinado serviço

### Outros comandos

- **ps** para listar os serviços, com mais detalhes que o do Docker
- **push**, **exec**, **logs** da mesma maneira que no Docker CLI

## Exercícios

### Exercício 01

Criar arquivo de Compose para o projeto abaixo e testar comandos do compose

> [A aplicação pode ser encontrada em **dockerfile-nodejs-app**](samples/dockerfile-nodejs-app)

### Exercício 01: Resolução

```yaml
version: '2.2'

services:
  web:
    image: sample-02 # Opcional, caso removido, iria criar a imagem com o nome "dockerfile-nodejsapp_web"
    init: true
    build: .
    ports:
      - "3000:3000"
```

- `docker-compose up` e modo detached `-d`
- Para recriar imagens `docker-compose build --no-cache`
- Para remover imagens criadas pelo Compose do projeto `docker-compose down --rm local`
- `docker-compose ps` exibir nome, comando, estado e portas dos serviços para o Compose
- `docker-compose logs` para exibir todos os logs
- `docker-compose logs web` para exibir todos do service **web**
- `docker-compose exec web sh` executar shell dentro do service/container
- No shell da imagem de origem do Alpine, instalar o CURL `apk add --update curl`
- Adicionar o curl permanentemente na imagem, editando o Dockerfile `RUN apk add --update curl`
- Verificar que ao executra `docker-compose up -d` novamente o serviço não será atualizado pois a imagem já existe
- Para forçar a recriação deve ser utilizado `docker-compose up -d --build`

## Referências

- [Documentação para referência](https://docs.docker.com/compose/reference/)
- [Docker Docs - Compose file versions and upgrading](https://docs.docker.com/compose/compose-file/compose-versioning/)
- [Docker Docs - Don't use Links! It's a legacy feature of compose, and isn't needed](https://docs.docker.com/compose/compose-file/#links)
- [Docker Docs - Compose file build options - Docker Docs](https://docs.docker.com/compose/compose-file/#build)
- [Docker Docs - Using Multiple Compose Files](https://docs.docker.com/compose/extends/#multiple-compose-files)
- [Docker Docs - Using Compose Files In Production](https://docs.docker.com/compose/production/)
- [Docker Docs - Healthcheck in Compose files](https://docs.docker.com/compose/compose-file/#healthcheck)

___

- [Bret's anser to "just one host": use Swarm or docker-compose?](https://github.com/BretFisher/ama/issues/8)
- [3 Docker Compose features for improving team development workflow](https://www.oreilly.com/ideas/3-docker-compose-features-for-improving-team-development-workflow)
