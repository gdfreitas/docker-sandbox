# Docker Containers

É, de forma resumida, uma instância de uma _imagem_ executando como processo.

## Características

- É possível ter inúmeros contâiners executando a partir da mesma imagem;
- Containers são somente processos executando na máquina host, limitados aos recursos que podem acessar, acabam quando o processo para.
- Possui uma **segregação de processos** no mesmo Kernel (isolamento);
  - A partir de um processo, permite criar subprocessos isolados da máquina host;
- Possui um **sistema de arquivos** criados a partir de uma imagem docker;
- Ambientes leves e portáteis no qual aplicações são executadas;
- Encapsula todos os binários e bibliotecas necessárias para execução de uma aplicação;
- Também é chamado como algo entre **chroot** e uma **VM**;
  - **chroot** é uma forma de direcionar uma nova pasta raiz para um determinado processo, uma forma primitiva de "aprisionar" o processo à este escopo de arquivos/pastas;
  - **VM** nível de isolamento máximo, novo O.S, binários, arquivos, kernel, libs, etc.

## Hello World! no Docker

```sh
docker container run hello-world
```

Irá baixar esta imagem do Docker Hub e irá imprimir uma mensagem de "Hello World" no log do container.

### O que acontece quando executado o comando RUN

1. O docker procura pela imagem localmente no computador em um repositório chamado de "image cache".
2. Se não encontrar, busca no repositório remoto (por padrão é o Docker Hub)
3. Busca a última versão da imagem (padrão quando não é especificado versão. Ex `nginx:latest`)
4. Cria um novo container baseado na imagem e prepara para inicializar
5. Atribui um IP virtual na rede privada do docker engine
6. Quando específicado uma publicação (`--publish PORT:PORT`) expoe a porta na máquina host e direciona todo tráfego para a porta de dentro do container.
7. Inicializa o container usando o comando `CMD` no Dockerfile da imagem.

## Executando imagem do _nginx_

```sh
docker container run --publish 5000:80 nginx
```

1. Baixa a última versão da imagem do `nginx` do Docker Hub
2. Cria um container com esta imagem em um novo processo.
3. A flag `--publish PORTA_HOST:PORTA_CONTAINER` expõe a porta `5000` do host e redireciona todo seu tráfego para a porta `80` do container, direcionando todo tráfego do localhost para o container. Pode ser utilizada a abreviação `-p`

Um erro irá ser percebido caso a porta do host já esteja sendo utilizada por outro processo ou até mesmo outro container.

## Execução em background (_detached_)

```sh
docker container run -p 80:80 --detach nginx
```

A flag `--detach` permite a execução do container em background, liberando a linha de comando. Pode ser utilizada a abreviação `-d`

## Iniciar, parar, reiniciar um container

```sh
docker container start/stop/restart CONTAINER_NAME
docker container start/stop/restart CONTAINER_ID
```

**Observação** É necessário somente os 3 primeiros dígitos do `CONTAINER_ID` para ser único e docker conseguir identificar qual container está sendo referenciado.

## Comandos comuns para listar recursos

Pode ser utilizado nos subcomandos de `container`, `image`, `volume` e `network`.

```sh
docker container ls
docker container ps
docker container list
```

- Por padrão lista somente containers rodando, com a flag `-a` lista histórico de containers criados.
- Em adição a flag anterior se colocado `q` irá listar somente os ids dos containers.

## Consultando os logs de um container

```sh
docker container logs CONTAINER_NAME
```

- Pode ser utilizado a `-f` para seguir automaticamente o log, e `-t` para exibir timestamp nas mensagens

## Consultar os processos ativos de um container

```sh
docker container top CONTAINER_NAME
```

## Container RUN vs START

```sh
docker container run IMAGE
docker container start CONTAINER_ID
```

- `run` sempre cria um novo container.
- `start` inicializa um container que já existe e que foi parado.

## Especificando um nome para o container

```sh
docker container run --publish 80:80 --detach --name CONTAINER_NAME nginx
```

**Curiosidade**: O nome de um container deve ser sempre único, e se não especifícarmos na criação, o docker cria automaticamente um nome aleatório para o container com base em uma lista open-source de nomes e sobrenomes de hackers e cientistas famosos.

## Definindo variáveis de ambiente

```sh
docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=123456 -d mysql
docker run --name mysqldb -e MYSQL_RANDOM_ROOT_PASSWORD=yes -d mysql
```

- `-e` ou `-env` pode ser utilizada para definir variáveis de ambientes para a imagem do container.

## Remover os containers criados

```sh
docker container rm CONTAINER_ID
docker container rm $(docker container ls -aq)
```

**Dica:** Na segunda linha do snippet acima, temos um agregado de comandos que facilitam a exclusão de containers, no caso em questão, um comando para listar todos os container ids criados e utiliza-los como argumentos na execução do comando de remover.

**Observação:** O docker não permite remover containers que estão ativos como medida de segurança, logo é preciso parar o container para posteriormente removê-lo. Entretanto, o comando `docker container rm` permite a flag `-f` ou `--force` para forçar a remoção dos containers, o que permite remover containers que estão rodando.

## Visualizando os processos que estão rodando no computador host (Moby VM)

Baixar imagem e inicializar container em modo interativo `-it`, visualizando os processos através de `ps aux` ou filtrando por uma saída específica `ps aux | grep mongo`

```sh
docker run -it --rm --privileged --pid=host justincormack/nsenter1
```

## Monitorando containers

Listar os processos de um container específico:

```sh
docker container top CONTAINER_NAME
```

Inspecionar informações (metadados: startup, config, volumes, networking, etc) de um container específico:

```sh
docker container inspect CONTAINER_NAME
```

Obter estatísticas de performance de todos os containers

```sh
docker container stats
```

## Acessando o shell de um container através do modo interativo

Inicializar um novo container no modo interativo

```sh
docker container run -it IMAGE
```

Executar comandos adicionais em um container existente

```sh
docker container exec -it CONTAINER_ID bash
```

## Alterando CMD através do comando RUN

```sh
docker container run -it --name proxy nginx bash
```

**Importante:** No acima foi sobrescrito o comando inicial da imagem do nginx para executar o `bash` para podermos listar os arquivos que estão dentro do container no modo interativo. Entretanto, ao sair do bash, o container exitou, Por quê? Isso ocorre devido ao ciclo de vida dos containers serem baseados no ciclo de vida do comando que o inicializa.

```sh
docker container run -it ubuntu
```

A imagem do ubuntu já tem por padrão no seu comando de inicialização o `bash`, após exitar o container é exitado também. Vale ressaltar que, para inicializar este container novamente não é com a flag `-it`, e sim com `-ai`, exemplo: `docker container start -ai ubuntu`

## Iniciando processos dentro de containers com o comando EXEC

Com este comando é possível executar um outro comando e inicializar um outro processo dentro de um container específico, e contráriando o `run` não afeta o processo root/ciclo de vida do container.

Exemplo:

```sh
docker container exec -it CONTAINER_NAME bash
```

## Atualizando propriedades do container com o comando UPDATE

Para os containers criados via docker run, é possível utilizar este comando para atualizar propriedades de limites de recursos utilizados pelo container, como memória, processamento, etc, sem necessáriamente reiniciaro container.

É possível consultar todas as propriedades disponíveis através do comando `docker container update --help`

## Curiosidade: Executando imagem Alpine

É uma imagem muito pequena do linux (4MB, a do ubuntu é 84MB) bastante utilizada em imagens do Docker.

Nela não temos o `bash` mas possui `sh` e através dele é possível instalar o `bash` utilizando o comando `apk` que é o [package manager desta distribuição](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg).

Exemplo:

```sh
docker container run -it alpine sh
```

## Exercícios

### Exercício 01

Subir 03 containers em modo _detached_ conforme instruções abaixo:

- **nginx** na porta 80:80
- **mysql** 3306:3306
- **httpd** 8080:80

Ao criar o container do **mysql** deve ser usado deve ser definido a variável de ambiente **MYSQL_RANDOM_ROOT_PASSOWORD** com o valor **yes**

Usar o `docker container logs` no container do mysql para achar a senha aleatória que foi gerada na inicialização do **mysql**

### Exercício 01: Resolução

Lembrando: `-d` é `--detach`, `-p` é `--publish`, `-e` é `--env`

```docker
docker container run -d --name db -p 3306:3306  -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker container run -d --name webserver -p 8080:80 httpd
docker container run -d --name proxy -p 80:80 nginx
```

## Referências

- [Alpine Linux Docker Images, are they really more secure?](https://www.youtube.com/watch?v=e2pAkcqYCG8)
- [Cgroups, namespaces, and beyond: what are containers made from? @ Youtube](https://www.youtube.com/watch?v=sK5i-N34im8)
- [Package Management Basics: apt, yum, dnf, pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg)
- [Container Scanning Comparision](https://kubedex.com/follow-up-container-scanning-comparison/)
