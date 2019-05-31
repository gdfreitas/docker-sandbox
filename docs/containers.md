# Docker Containers

- **Definição:** é uma instância de uma _imagem_ executando como processo.

## Características de containers

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

___

## Hands-on

Exibir um resumo dos comandos disponíveis e uma breve descrição para cada  

```docker
docker
```

Exibir a versão do client (cli: linha de comando) e do server (Engine: no windows é chamado de serviço, no mac/linux é chamado de daemon):

```docker
docker version
```

Exibir todas as configurações da engine do docker:

```docker
docker info
```

Hello World! no Docker:

```docker
docker container run hello-world
```

- Irá baixar esta imagem do Docker Hub e irá imprimir uma mensagem de "Hello World" no log do container.

Executando imagem do _nginx_

```docker
docker container run --publish 80:80 nginx
```

1. Baixa a última versão da imagem do `nginx` do Docker Hub
2. Cria um container com esta imagem em um novo processo.
3. A flag `--publish PORTA_HOST:PORTA_CONTAINER` expõe a porta 80 do computador host na porta 80 interna do container, direcionando todo tráfego do localhost para o container. Pode ser utilizada a abreviação `-p`

Execução em background:

```docker
docker container run -p 80:80 --detach nginx
```

- `--detach` permite a execução do container em background, liberando a linha de comando. Pode ser utilizada a abreviação `-d`

Iniciar, parar, reiniciar um container:

```docker
docker container start/stop/restart CONTAINER_NAME or ID
```

**Observação** É necessário somente os 3 primeiros dígitos do id para ser único e docker conseguir identificar qual container está sendo referenciado.

Comandos genéricos para listar containers/images/volumes/networks:

```docker
docker container ls
docker container ps
docker container list
```

- Por padrão lista somente containers rodando, com a flag `-a` lista histórico de containers criados.
- Em adição a flag anterior se colocado `q` irá listar somente os ids dos containers.

Consultando os logs de um container:

```docker
docker container logs CONTAINER_NAME
```

- pode ser utilizado a `-f` para seguir automaticamente o log, e `-t` para exibir timestamp nas mensagens

Consultar os processos rodando em um container específico:

```docker
docker container top CONTAINER_NAME
```

**Atenção!**

```docker
docker container run IMAGE
docker container start ID
```

- `run` sempre cria um novo container.
- `start` inicializa um container que já existe e que foi parado.

**Curiosidade**: O nome de um container deve ser sempre único, e se não especifícarmos na criação, o docker cria automaticamente um nome aleatório para o container com base em uma lista open-source de nomes e sobrenomes de hackers e cientistas famosos.

Especificando um nome para o container:

```docker
docker container run --publish 80:80 --detach --name CONTAINER_NAME nginx
```

Definindo variáveis de ambiente:

```docker
docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=123456 -d mysql
docker run --name mysqldb -e MYSQL_RANDOM_ROOT_PASSWORD=yes -d mysql
```

- `-e` ou `-env` pode ser utilizada para definir variáveis de ambientes para a imagem do container.

Remover os containers criados:

```docker
docker container rm CONTAINER_ID
docker container rm $(docker container ls -aq)
```

**Dica:** como visto no segundo exemplo, é permitido executar outros comandos como por exemplo listar todos os ids de containers criados e utiliza-los como argumentos na execução de outro comando.

**Observação:** o docker nào permite remover containers que estão ativos como medida de segurança, logo é preciso parar o container para posteriormente remove-lo. Entretanto, o comando `docker container rm` permite a flag `-f` para forçar a remoção dos containers, o que permite remover containers que estão rodando.

### Visualizando os processos que estão rodando no computador host (Moby VM)

Baixar imagem e inicializar container interativo, visualizando os processos através de `ps aux` ou filtrando por uma saída específica `ps aux | grep mongo`

```docker
docker run -it --rm --privileged --pid=host justincormack/nsenter1
```

### O que realmente acontece quando executado o comando `docker container run`

1. O docker procura pela imagem localmente no computador em um repositório chamado de "image cache".
2. Se não encontrar, busca no repositório remoto (por padrão é o Docker Hub)
3. Busca a última versão da imagem (padrão quando não é especificado versão. Ex `nginx:latest`)
4. Cria um novo container baseado na imagem e prepara para inicializar
5. Atribui um IP virtual na rede privada do docker engine;
6. Quando específicado uma publicação (`--publish PORT:PORT`) expoe a porta na máquina host e direciona todo tráfego para a porta de dentro do container.
7. Inicializa o container usando o comando ("CMD") no Dockerfile da imagem.

[Docker Containers - Exercício 1](basics/container_assignment_1.md)

### Monitoramento de containers

Listar os processos de um container específico:

```docker
docker container top CONTAINER_NAME
```

Inspecionar informações (metadados: startup, config, volumes, networking, etc) de um container específico:

```docker
docker container inspect CONTAINER_NAME
```

Obter estatísticas de performance de todos os containers

```docker
docker container stats
```

### Container Shell

#### O comando *run*

Inicializar um novo container no modo interativo

```docker
docker container run -it
```

Executar comandos adicionais em um container existente

```docker
docker container exec -it
```

Exemplo 1:

```docker
docker container run -it --name proxy nginx bash
```

**Importante:** no acima foi sobrescrito o comando inicial da imagem do nginx para executar o `bash` para podermos listar os arquivos que estão dentro do container no modo interativo. Entretanto, ao sair do bash, o container exitou, Por quê? Isso ocorre devido ao ciclo de vida dos containers serem baseados no ciclo de vida do comando que o inicializa.

Exemplo 2:

```docker
docker container run -it ubuntu
```

A imagem do ubuntu já tem por padrão no seu comando de inicialização o `bash`, após exitar o container é exitado também. Vale ressaltar que, para inicializar este container novamente não é com a flag `-it`, e sim com `-ai`, exemplo: `docker container start -ai ubuntu`

#### O comando _exec_

Com este comando é possível executar um outro comando e inicializar um outro processo dentro de um container específico, e contráriando o `run` não afeta o processo root/ciclo de vida do container.

Exemplo:

```docker
docker container exec -it CONTAINER_NAME bash
```

#### Alpine

É uma imagem muito pequena do linux (4MB, a do ubuntu é 84MB), que não conta com o `bash` por exemplo. Entretanto possui `sh` e que através dele é possível instalar o `bash` utilizando o comando `apk` que é o package manager desta distribuição. Mais em: [Package Management Basics: apt, uym, dnf, pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg)

Exemplo:

```docker
docker container run -it alpine sh
```