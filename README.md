# Docker

Repositório destinado à conceitos e exemplos com Docker

## O que é Docker

É uma plataforma que permite a criação e execução de aplicações de maneira rápida e prática através de pacotes de software em unidades padronizadas chamadas de contêineres que possuem tudo que o software precisa para ser executado, incluindo bibliotecas, ferramentas de sistema, código e runtime. O docker permite implantar, escalar e mover rapidamente aplicações em qualquer ambiente, otimizando a utilização de recursos.

### História

O docker foi lançado em 2013 como um projeto open-source por uma empresa chamada .cloud (dot cloud) que era uma empresa de hospedagem que atualmente não existe mais. Após um ano do lançamento o Docker se tornou tão grande que eles fecharam a antiga empresa e abriram uma nova chamada Docker Inc.

### Por que Docker? Por que não utilizar uma VM (Virtual Machine)?

- Rapidez, agilidade _"Docker is all about speed"_
  - para desenvolver, para construir, testar, lançar, atualizar e recuperar.
- O consumo de recursos é muito menor com o Docker;
  - Herda o Kernel e entre outros recursos da máquina host;
- A inicialização de um container levaria 1s, e da máquina virtual com o sistema operacional inteiro, levaria cerca de 1min;

## Principais características

- Não é um sistema de virtualização tradicional (VM - Virtual Machine)
- É uma engine de administração de containers (ambiente/serviço isolado da maquina host);
- É baseado em uma tecnologia de serviços LXC (Linux Containers);
- Open Source e escrito em Go (linguagem);
- Host e container compartilham o Kernel (menor consumo, otimização);
- Empacota software com vários níveis de isolamento (memória, cpu, rede, etc);

## Docker Editions

- Docker CE (Community Edition) e Docker EE (Enterprise Edition)
  - Community Edition (free) vs Enterprise Edition (paid)
    - recomendado para grandes empresas, possui suporte 24/7, produtos extras, certificado em plataformas específicas.

- Edge vs Stable versionamento
  - Edge (beta) todo mês é lançado uma nova versão; que virará stable no quarto mês;

- Três principaius tipos instalações: direct, mac/windows e cloud
  - Linux ([diferente por distribuição](https://store.docker.com/), não usar gerenciador de pacotes padrão)
    - `curl -sSL https://get.docker.com/ | sh`
  - [Windows](https://www.docker.com/docker-windows) (ou Docker Toolbox para versões diferente da 10 Pro/Enterprise)
  - Mac (ou Docker Toolbox, não usar brew)
  - Cloud: AWS/Azure/Google, versões do docker, com características/aplicações específicas da empresa que está distribuindo.

### Características de contêineres Docker

- Possui uma **segregação de processos** no mesmo Kernel (isolamento);
  - A partir de um processo, permite criar subprocessos isolados da máquina host;
- Possui um **sistema de arquivos** criados a partir de uma imagem docker;
- Ambientes leves e portáteis no qual aplicações são executadas;
- Encapsula todos os binários e bibliotecas necessárias para execução de uma App;
- Algo entre **chroot** e uma **VM**;
  - **chroot** é uma forma de direcionar uma nova pasta raiz para um determinado processo, uma forma primitiva de "aprisionar" o processo à este escopo de arquivos/pastas;
  - **VM** nível de isolamento máximo, novo O.S, binários, arquivos, kernel, libs, etc.

### Caracterítiscas de imagens Docker

- Modelo de sistema de arquivo somente-leitura usado para criar containers;
- Imagens são criadas através de um processo chamado **build**;
- São armazenadas em repositórios no Registry [hub.docker.com](https://hub.docker.com/explore/);
- São compostas por uma ou mais camadas, chamadas também de **layers**;
- Uma camada representa uma ou mais mudanças no sistema de arquivo;
- Uma camada é também chamada de imagem intermediária;
- A junção dessas camadas formam a imagem;
- Apenas a última camada pode ser alterada quando o container for iniciado;
- AUFS (Advanced multi-layered unification filesystem) é muito usado;
- O grande objetivo dessa estratégia de dividir uma imagem em camadas é o reuso;
- É possível compor imagens a partir de camadas de outras imagens;

### Cheatsheet

- HelloWorld:
  - `docker container run hello-world` irá baixar esta imagem do docker.hub e irá imprimir uma mensagem de hello world.

- O comando `run` é uma composição de 4 comandos:

  1. `docker image pull` baixa a imagem do registry para maquina host;  
  2. `docker container create` cria o container;  
  3. `docker container start` inicializa o container;  
  4. `docker container exec` executa comandos no container em modo interativo;  

- listar container/images/volumes/networks (flag `-a` exibe um histórico dos containers, `q` lista somente os IDs):
  1. `docker container ls`
  2. `docker container ps`
  3. `docker container list`

- iniciar, parar, reiniciar um container: `docker container start/stop/restart CONTAINER_NAME`

- exibir logs de um container: `docker container logs CONTAINER_NAME`

- inspecionar informações sobre o container: `docker container inspect CONTAINER_NAME`

- exibir o sistema que está sendo executado dentro do container: `docker container exec daemon-basic uname -or`

- remover container/image/network: `docker container rm CONTAINER_ID`

- facilitador para parar todos os containers `docker container stop $(docker container ls -aq)`
- facilitador para remover todos os containers `docker container rm $(docker container ls -aq)`

- facilitador para remover todas as imagens `docker image rm $(docker image -q)`

- executa o container e o remove automaticamente quando seu processo for parado

- executa o container com duas flags, `i` significa modo interativo, e `t` permite acesso ao terminal do container. `docker container run -it debian bash`  

- cria um container nomeando conforme parâmetro, nomes únicos. `docker container run --name MEU_CONTAINER -it debian bash`  

- inicializa um container, reaproveitando o que já foi gerado `docker container start -ai MEU_CONTAINER`  

- porta externa seria a porta que seria exposta pelo container, e a porta interna que o serviço vai ser inicializado `docker container run -p PORTA_EXTERNA:PORTA_INTERNA NOME_IMAGEM`  
  - Ex: `docker container run -p 8080:80 nginx`

- mapear volume `docker container run -p PORTA_EXTERNA:PORTA_INTERNA -v DIRETORIO_MAQUINA_HOST:DIRETORIO_CONTAINER IMAGEM`  
  - Ex: `docker container run -p 8080:80 -v D:/dev/git/docker/volume/html:/usr/share/nginx/html nginx`

- rodar container em modo Daemon (background, sem interatividade direta ao executar) `docker container run -d --name daemon-basic -p 8080:80 -v D:/dev/git/docker/volume/html:/usr/share/nginx/html nginx`

- construir uma imagem (conforme Dockerfile) `docker image build -t NOME_IMAGEM DIRETORIO_IMAGEM`
  - Ex: `docker image build -t custom-image-build .`

- construir uma imagem passando argumentos `docker image build --build-arg S3_BUCKET=myapp -t custom-image-args .`
  - subir um container com esta imagem e dar um echo no argumento `docker container run custom-image-args bash -c 'echo $S3_BUCKET'`

- utilizar filtro no comando docker image inspect `docker image inspect --format="{{index .Config.Labels \"maintainer\"}}" custom-image-args`

- login: `docker login --username=USUARIO` e então digitar a senha;

- fazer o push da imagem para o repositório (hub.docker): `docker image push gabrieldfreitas/custom-hello-world:1.0`

## Redes no Docker [Docker | Docs - Networking Overview](https://docs.docker.com/network/)

### Tipos de redes

- None Network (completamente isolado, sem interfaceamento de rede)
- Bridge Network (Padrão)
- Host Network
- Overlay Network (Swarm)

### Comandos de Rede

- visualizar as redes disponíveis `docker network ls`

- rodar um container com o tipo de rede **Network None** no modo daemon: `docker container run -d --net none debian`

- rodar um container com com a imagem alpine (distribuição do linux) e verificar interfaces com o comando ifconfig:  
  - modo bridge: `docker container run --rm alpine ash -c "ifconfig"`
  - modo none: `docker container run --rm --net none alpine ash -c "ifconfig"`

- inspecionar uma rede do docker: `docker network inspect bridge`

- criando 2 containers para testar ping entre eles: `docker container run -d --name container1 alpine sleep 1000`  
  - `docker container exec -it container2 ping 172.17.0.2`

- criando uma rede com base em um driver que já existe: `docker network create --driver bridge rede_nova`

## Docker Compose

### Comandos Docker Compose

- subir/baixar os serviços do docker-compose `docker-compose up/down` flags: `-d` para rodar em modo daemon
- `docker-compose logs -f -t` acompanhar os logs do compose
- visualizar os processos rodando `docker-compose ps`
- rodar comando psql dentro de um serviço de uma instância que está ativa chamado **db**
  - `docker-compose exec db psql -U postgres -c '\l'`
    - `-U USUARIO` informa o usuário que executará o comando. No caso o usuário é o padrão `postgres`
    - `-c COMANDO` comando que será executado. No caso `'\l'` lista os bancos de dados
  - `docker-compose exec db psql -U postgres -f /scripts/check.sql` executa um arquivo dentro da instância do docker
- abrir o bash dentro de um container `docker exec -it COTAINER_NAME bash`
- `\l` -- lista todos os bancos de dados
- `\c email_sender` -- conectar ao banco email_sender
- `\d emails` -- gere uma descrição da tabela para validar que o script `init.sql` foi executado corretamente
- `docker-compose exec db psql -U postgres -d email_sender -c 'select * from emails'` executar select em uma tabela de um banco de dados
- `docker-compose up -d --scale worker=3` escalando serviço com build customizada e escalando com 3 containers

## Referências

- [Docker Mastery: The Complete Toolset From a Docker Captain](https://www.udemy.com/docker-mastery)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Curso Docker - Cod3r](https://www.udemy.com/curso-docker/)
- [Docker Documentation](https://docs.docker.com/)
