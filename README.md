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

## Container

- *Definição:* é uma instância de uma _imagem_ rodando como processo;

### Características de containers

- É possível ter inúmeros contâiners rodando a partir da mesma imagem;
- Containers são somente processos rodando na máquina host, limitados aos recursos que podem acessar, acabam quando o processo para.
- Possui uma **segregação de processos** no mesmo Kernel (isolamento);
  - A partir de um processo, permite criar subprocessos isolados da máquina host;
- Possui um **sistema de arquivos** criados a partir de uma imagem docker;
- Ambientes leves e portáteis no qual aplicações são executadas;
- Encapsula todos os binários e bibliotecas necessárias para execução de uma aplicação;
- Também é chamado como algo entre **chroot** e uma **VM**;
  - **chroot** é uma forma de direcionar uma nova pasta raiz para um determinado processo, uma forma primitiva de "aprisionar" o processo à este escopo de arquivos/pastas;
  - **VM** nível de isolamento máximo, novo O.S, binários, arquivos, kernel, libs, etc.

## Imagem

- *Definição:* é um composto com os binários, códigos-fontes, bibliotecas, etc que compõe uma aplicação;

### Características imagens

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

## Cheatsheet

Exibir um resumo dos comandos disponíveis e uma breve descrição para cada  

- `docker`

Exibir a versão do client (cli: linha de comando) e do server (Engine: no windows é chamado de serviço, no mac/linux é chamado de daemon):

- `docker version`

Exibir todas as configurações da engine do docker:

- `docker info`

Hello World! no Docker:

- `docker container run hello-world` irá baixar esta imagem do Docker Hub e irá imprimir uma mensagem de "Hello World" no log do container.

- `docker container run --publish 80:80 nginx`
  - baixa a última versão da imagem do `nginx` do Docker Hub
  - cria um container com esta imagem em um novo processo
  - `--publish 80:80` publica/expõe a porta 80 do computador host na porta 80 interna do container, direcionando todo tráfego do localhost para o container. Pode ser utilizada a abreviação `-p 80:80`. Sequência: `<PORTA_HOST:PORTA_CONTAINER>`
- `docker container run -p 80:80 --detach nginx`
  - `--detach` permite a execução do container em background, liberando a linha de comando. Pode ser utilizada a abreviação `-d`

Iniciar, parar, reiniciar um container:

- `docker container start/stop/restart CONTAINER NAME or ID`

**Observação** É necessário somente os 3 primeiros dígitos do id para ser único e docker conseguir identificar qual container está sendo referenciado.

Exibir lista dos containers/images/volumes/networks:

- `docker container ls`, `docker container ps`, `docker container list`
- Por padrão lista somente containers rodando, com a flag `-a` lista histórico de containers criados.
- Em adição a flag anterior se colocado `q` irá listar somente os ids dos containers.

Consultando os logs de um container específico:

- `docker container logs CONTAINER_NAME` (pode ser utilizado as `-f` para seguir automaticamente o log, e `-t` para exibir timestamp nas mensagens)

Consultar os processos rodando em um container específico:

- `docker container top CONTAINER_NAME`

**Atenção!**

- `docker container run ID` sempre cria um novo container;
- `docker container start ID` inicializa um container que já existe e que foi parado;

**Observação**: O nome de um container deve ser sempre único, e se não especifícarmos na criação, o docker cria automaticamente um nome aleatório para o container com base em uma lista open-source de nomes e sobrenomes de hackers e cientistas famosos.

Especificando um nome para o container:

- `docker container run --publish 80:80 --detach --name CONTAINER_NAME nginx`

Definindo variáveis de ambiente:

- `-e` ou `-env`
  - Exemplo: `-env MYSQL_RANDOM_ROOT_PASSWORD=yes`

Remover os containers criados:

- `docker container rm IDs...`

- `docker container rm $(docker container ls -aq)`

**Dica:** como visto no segundo exemplo, é permitido executar outros comandos como por exemplo listar todos os ids de containers criados e utiliza-los como argumentos de um comando.

**Observação:** o docker nào permite remover containers que estão ativos como medida de segurança, logo é preciso parar o container para posteriormente remove-lo. Entretanto, o comando `docker container rm` permite a flag `-f` para forçar a remoção dos containers, o que permite remover containers que estão rodando.

### Windows 10 - Como visualizar os processos que estão rodando no computador host (Moby VM)

- Baixar imagem e inicializar container interativo `docker run -it --rm --privileged --pid=host justincormack/nsenter1`
- Visualizar os processos que estão rodando `ps aux`
  - Filtrar a saída por um termo específico `ps aux | grep mongo`

### O que realmente acontece quando executado o comando `docker container run`

1. O docker procura pela imagem localmente no computador em um repositório chamado de "image cache".
2. Se não encontrar, busca no repositório remoto (por padrão é o Docker Hub)
3. Busca a última versão da imagem (padrão quando não é especificado versão. Ex `nginx:latest`)
4. Cria um novo container baseado na imagem e prepara para inicializar
5. Atribui um IP virtual na rede privada do docker engine;
6. Quando específicado uma publicação (`--publish PORT:PORT`) expoe a porta na máquina host e direciona todo tráfego para a porta de dentro do container.
7. Inicializa o container usando o comando ("CMD") no Dockerfile da imagem.

### Exercício 1

Rodar três containers: `nginx` na porta 80:80, `mysql` 3306:3306, `httpd` 8080:80, todos em modo detach e nomeados apropriadamente.

Ao criar o container do `mysql` deve ser usado a opção `--env` ou `-e` para passar a variável de ambiente `MYSQL_RANDOM_ROOT_PASSOWORD=yes`

Usar o `docker container logs` no container do mysql para achar a senha aleatória que foi gerada na inicialização.

**Resolução:**

Lembrando: `-d` = `--detach`, `-p` = `--publish`, `-e` = `--env`

- `docker container run -d --name db -p 3306:3306  -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql`
- `docker container run -d --name webserver -p 8080:80 httpd`
- `docker container run -d --name proxy -p 80:80 nginx`

### Monitoramento de containers

Listar os processos de um container específico:

- `docker container top CONTAINER_NAME`

Inspecionar informações (metadados: startup, config, volumes, networking, etc) de um container específico:

- `docker container inspect CONTAINER_NAME`

Obter estatísticas de performance de todos os containers

- `docker container stats`

### Shell

#### O comando `run`

Inicializar um novo container no modo interativo

- `docker container run -it`

Executar comandos adicionais em um container existente

- `docker container exec -it`

Exemplo 1: `docker container run -it --name proxy nginx bash`

**Importante:** no Exemplo 1 acima foi sobrescrito o comando inicial da imagem do nginx para executar o `bash` para podermos listar os arquivos que estão dentro do container no modo interativo. Entretanto, ao sair do bash, o container exitou, Por quê? Isso ocorre devido ao ciclo de vida dos containers serem baseados no ciclo de vida do comando que o inicializa.

Exemplo 2: `docker container run -it ubuntu`

A imagem do ubuntu já tem por padrão no seu comando de inicialização o `bash`, após exitar o container é exitado também. Vale ressaltar que, para inicializar este container novamente não é com a flag `-it`, e sim com `-ai`, exemplo: `docker container start -ai ubuntu`

#### O comando `exec`

Com este comando é possível executar um comando e inicializar um outro processo dentro de um container específico, e contráriando o `run` não afeta o processo root/ciclo de vida do container.

Exemplo: `docker container exec -it CONTAINER_NAME bash`

#### Alpine

É uma imagem muito pequena do linux (4MB, a do ubuntu é 84MB), que não conta com o `bash` por exemplo. Entretanto possui `sh` e que através dele é possível instalar o `bash` utilizando o comando `apk` que é o package manager desta distribuição. Mais em: [Package Management Basics: apt, uym, dnf, pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg)

Exemplo: `docker container run -it alpine sh`

## Network

O docker usa o conceito de "Batteries included, but removable", que basicamente diz que, o que precisa para funcionar você já tem, mas se quiser customizar, você pode!

- None Network (completamente isolado, sem interfaceamento de rede)
- Bridge Network (Padrão)
- Host Network
- Overlay Network (Swarm)

### Tráfego e Firewalls

Como as redes do docker movem pacotes para dentro e para fora.

**Componentes:** Internet Física | Host PC | Docker Network | Container

Ao criar um container e "anexá-lo" com uma rede virtual do tipo bridge (padrão), esta rede é automaticamente anexada à interface de rede da máquina host. Quando especificado que libere uma porta `-p 80:80`, irá fazer com que a porta 80 seja liberada na interface de rede da máquina host e automaticamente enviar tudo que chegue através desta porta para a rede virtual para a porta 80 do container que foi criado dentro desta rede.

Isto permite criar múltiplos containers dentro de uma mesma rede não expondo portas caso não seja necessário. Ex: banco de dados.

Visualizar as redes disponíveis do Docker:

- `docker network ls`

Visualizar as portas sendo utilizadas em um container específico:

- `docker container port CONTAINER_NAME`

Inspecionar as configurações de rede um container:

- `docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost`

**Observação:** o `--format` permite formatar a saída do inspect no padrão da linguagem Go (linguagem em que o Docker é desenvolvido), permitindo neste exemplo acima, acessar o nó do json em que contém as propriedades de Network. Mais em: [Docker's --format option for filtering cli output](https://docs.docker.com/config/formatting/)

Rodar um container com o tipo de rede **Network None**:

- `docker container run -d --net none debian`

Rodar um container com com a imagem alpine e verificar interfaces de rede com o comando ifconfig:

- modo bridge: `docker container run --rm alpine ash -c "ifconfig"`
- modo none: `docker container run --rm --net none alpine ash -c "ifconfig"`

Inspecionar uma rede do docker: `docker network inspect bridge`

Criando 2 containers para testar ping entre eles:

- `docker container run -d --name container1 alpine sleep 1000`  
- `docker container exec -it container2 ping 172.17.0.2`

Criando uma rede com base em um driver que já existe: `docker network create --driver bridge rede_nova`

## TODO: reorganizar documentação

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
- [Docker | Docs - Networking Overview](https://docs.docker.com/network/)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Curso Docker - Cod3r](https://www.udemy.com/curso-docker/)
- [Docker Documentation](https://docs.docker.com/)
