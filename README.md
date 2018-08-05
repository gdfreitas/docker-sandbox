# Docker

## Conceitos

- Não é um sistema de virtualização tradicional;
- É uma engine de administração de containers (ambiente/serviço isolado da maquina host);
- É baseado em uma tecnologia de serviços LXC (Linux Containers);
- Open Source e escrito em Go (linguagem);
- Sistema de virtualização baseado em software;
- Host e container compartilham o Kernel (menor consumo, otimização);
- Empacota software com vários níveis de isolamento (memória, cpu, rede, etc);

### Por que não utilizar uma VM (Virtual Machine)

- O consumo de recursos é muito menor em containers;
- O docker herda o Kernel e entre outros recursos da máquina host;
- A inicialização de um container levaria 1s, e da máquina virtual com o sistema operacional inteiro, levaria 1m;

### O que são containers

- Possui uma **segregação de processos** no mesmo Kernel (isolamento);
  - A partir de um processo, permite criar subprocessos isolados da máquina host;
- Possui um **sistema de arquivos** criados a partir de uma imagem docker;
- Ambientes leves e portáteis no qual aplicações são executadas;
- Encapsula todos os binários e bibliotecas necessárias para execução de uma App;
- Algo entre **chroot** e uma **VM**;
  - **chroot** é uma forma de direcionar uma nova pasta raiz para um determinado processo, uma forma primitiva de "aprisionar" o processo à este escopo de arquivos/pastas;
  - **VM** nível de isolamento máximo, novo O.S, binários, arquivos, kernel, libs, etc.

### O que são imagens Docker

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

### Arquitetura

- Client  
  - CLI (interface de linha de comando)
  - REST API (também disponibilizada para gerenciamento)
  - Kitematic (ferramenta gráfica para gerenciamento)
- Host
  - DAEMON (Docker Engine, entre outros nomes)
  - Images (Cache local das que foram baixadas do Registry)
  - Containers
- Registry
  - repositórios, o principal é Docker Hub

## Uso básico do Docker

- Instalar o Docker Community Edition conforme OS;
- HelloWorld do Docker `docker container run hello-world`

### Comandos e exemplos

- O comando `run` é um agregado de 4 comandos:

  1. `docker image pull` baixar imagem do registry para maquina local;  
  2. `docker container create` cria o container;  
  3. `docker container start` inicializa o container;  
  4. `docker container exec` executa o container em modo interativo;  

- listar os containers (flag `-a` exibe um histórico dos containers, `q` lista somente os IDs):
  1. `docker container ls`
  2. `docker container ps`
  3. `docker container list`

- iniciar, reiniciar, parar um container: `docker container start/stop/restart CONTAINER_NAME`

- exibir logs de um container: `docker container logs CONTAINER_NAME`

- inspecionar informações sobre o container: `docker container inspect CONTAINER_NAME`

- exibir o sistema que está sendo executado dentro do container: `docker container exec daemon-basic uname -or`

- listar as imagens que estão presentes no container: `docker image ls`

- listar os volumes que estão presentes no container: `docker volume ls`

- remover imagens ou containers:  
  1. `docker image rm IMAGE_ID`
  2. `docker container rm CONTAINER_ID`

- parar todos os containers `docker container stop $(docker container ls -aq)`

- remover todos os containers `docker container rm $(docker container ls -aq)`

- remover todas as imagens `docker image rm $(docker image -q)`

- executa o container e automaticamente remove, não aparecendoo na lista do comando `ps -a` `docker container run --rm debian bash --version`

- executa o container com duas flags, `i` significa modo interativo, e `t` permite acesso ao terminal do container. `docker container run -it debian bash`  

- cria um container nomeando conforme parâmetro, nomes únicos. `docker container run --name MEU_CONTAINER -it debian bash`  

- inicializa um container, reaproveitando o que já foi gerado `docker container start -ai MEU_CONTAINER`  

- porta externa seria a porta que seria exposta pelo container, e a porta interna que o serviço vai ser inicializado `docker container run -p PORTA_EXTERNA:PORTA_INTERNA NOME_IMAGEM`  
  - Ex: `docker container run -p 8080:80 nginx`

- mapear volume `docker container run -p PORTA_EXTERNA:PORTA_INTERNA -v DIRETORIO_MAQUINA_HOST:DIRETORIO_CONTAINER IMAGEM`  
  - Ex: `docker container run -p 8080:80 -v D:/dev/git/docker/volume/html:/usr/share/nginx/html nginx`

- rodar container em modo Daemon (background, sem interatividade) `docker container run -d --name daemon-basic -p 8080:80 -v D:/dev/git/docker/volume/html:/usr/share/nginx/html nginx`

- construir uma imagem (conforme Dockerfile) `docker image build -t NOME_IMAGEM DIRETORIO_IMAGEM`
  - Ex: `docker image build -t custom-image-build .`

- construir uma imagem passando argumentos `docker image build --build-arg S3_BUCKET=myapp -t custom-image-args .`
  - subir um container com esta imagem e dar um echo no argumento `docker container run custom-image-args bash -c 'echo $S3_BUCKET'`

- utilizar filtro no comando docker image inspect `docker image inspect --format="{{index .Config.Labels \"maintainer\"}}" custom-image-args`
