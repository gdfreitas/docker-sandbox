# Docker for Node.js

## Dockerfile: melhores práticas para Node.js

- Utilizar o `COPY` em vez do `ADD`

> O `ADD` tem outras funções como baixar coisas da Internet, untar, deszipar, etc

- Não é necessário instalar o `npm` ou `yarn` é recomendado utilizar as versões dos mesmos que vêm empactadas junto com a imagem do Node que estiver utilizando, em casos extremos caso seja necessário uma versão específica, deve-se instalar através do build do Dockerfile.

- Utilizar `node` no `CMD` do Dockerfile, por algumas razões, ao utilizar o clássico `npm start`, isso irá inicializar o node como um subprocesso do npm, adicionando complexidade e camadas desnessárias ao programa. Dockerfiles devem representar exatamente o que irá acontecer, sem necessiamente dependender do conhecimento do script do npm para conhecer que tipo de processo será inicializado. Há cenários em que o processo do npm não repassa corretamente os signals de um kill por exemplo para o subprocesso do Node.

- Sempre priorizar o uso do `WORKDIR` (criar [se não existir] e acessar) em vez do `RUN mkdir XXX`, exceto quando for necessário determinar permissões através do `chown`

- Priorizar versões pares da imagem do Node.js, visto que representam major releases / LTS (Long Term Support), versões ímpares tendem à serem designadas à versões de release/experimental [Node.js Release Schedule](https://github.com/nodejs/Release#release-schedule)
- Não utilizar a tag `:latest`
- Priorizar início de uso com imagens `:debian` visto que todas as imagens por padrão usam a do debian como imagem base e aos poucos migrando para `:alpine`, sendo que em grandes apps o Alpine pode não possuir alguma dependência necessária para o projeto. Evitar utilizar imagens `:slim` e `:onbuild`

> `:alpine` images são pequenas, com o mínimo de "coisas" instaladas, sendo assim focadas em segurança, visto que diminui as portas para vulnerabilidade.

- Não rodar containers com o usuário `root` que é padrão das imagens, a fim de reduzir sempre os riscos.
  - Por padrão a imagem do Node já possui o usuário `node`, porém desabilitado.
  - Sempre usar os utilitarios que requerem o `root` (`apt`/`apk`, `npm i -g`) **antes** de trocar de usuário.
  - Instalar dependencias do `npm i` **depois** de trocar usuário.
  - Algumas permissões de escrita podem ser necessárias, fazer através de `chown node:node`

- Para alterar usuário no Dockerfile `USER node`, assim os comandos delimitados por `RUN`, `CMD` e `ENTRYPOINT` passarão a respeitar o usuário, os outros ainda executarão como `root`
  - Uma alternativa para o `WORKDIR` (sempre executa com usuário `root`) para criar um diretório utilizando permissões do usuário `node` é criar manualmente: `RUN mkdir app && chown -R node:node .`
  - Após definir o usuário node, ao executar `docker compose exec` por padrão você irá ser o usuário `node` no container, para alterar basta executar o exec assim: `docker-compose exec -u root`

- Ao descrever imagens no intuito de obter eficiência (tempo de build e tamanho), deve ser considerado os tópicos abaixo:
  - Escolher uma imagem de `FROM` adequada, fixar ao mínimo uma versão major, em uma imagen de produção definir até o patch, se necessário. Experimentar utilizar imagens `alpine` pelas vantagens vistas acima.
  - A ordem dos comandos do Dockerfile são bastante importantes, prestar atenção a fim de otimizar ao máximo as camadas em cache.
  - Evitar copiar todo o fonte antes de executar o `npm install`, desta maneira, toda alteração de fonte irá causar uma instalação de dependências novamente. O correto é copiar somente o `package.json` e `package-lock.json`, em seguida instalar as dependências e depois copiar os arquivos fonte, em uma camada abaixo.
    - Dica para copiar um arquivo opcionalmente (se não existir não irá falhar) quando deseja-se ser bastante literal no Dockerfile (o que é bastante recomendado), para isso coloca-se um asterisco ao final do arquivo, exemplo `COPY package.json package-lock.json* ./`
  - Gerenciadores de pacotes a nivel de host, executar somente um `apt-get && apt-get install` por Dockerfile e colocá-lo no topo do arquivo.

- [Dockerfile USER docs](https://docs.docker.com/engine/reference/builder/#user)
- [Docker file COPY docs](https://docs.docker.com/engine/reference/builder/#copy)
- [Difference between chmod and chown](https://www.unixtutorial.org/difference-between-chmod-and-chown)

## Controlando o Processo do Node em Containers

- O Docker deve ser a camada intermediária e não será preciso `nodemon`, `forever` ou `pm2` no servidor.
  - O `nodemon` entretanto pode ser utilizado em desenvolvimento por causa do `watch file`
- O Docker irá gerenciar corretamente o processo (iniciar, parar, reiniciar, controle de healthcheck)
- O Docker irá gerenciar multiplos containers da mesma imagem ("replicas/tasks", "multi-thread")
- Por padrão tanto `npm` quanto `node` não escutam por sinais de shutdown por padrão, o que é essencial em um ambiente Docker.

### Problema do PID 1

- PID 1 (identificador de processo) é o primeiro processo em um sistema (ou container), e este têm basicamente dois trabalhos: remover _"zombie"_ processes e passar signals para sub-processes
- Zombie processes não é um grande problema com Node

### CMD for Healthy Shutdown

- Signals são utilizado pelo Docker para se comunicar com o processo  _Ex: "Opa, quero parar a execução deste container"_
- O Docker utiliza os signals do Linux para parar um app (`SIGINT` / `SIGTERM` / `SIGKILL`)
  - `SIGINT` e `SIGTERM` permitem _graceful stop_, o `SIGKILL` o processo não tem nem a chance de responder.
  - O npm não responde a esses comandos (por isso deve ser evitado em imagens Docker para executar processos).
  - O Node.js por padrão não responde, mas pode ser implementado via código.

- Ao utilizar o Tini para ser o init process do container, ele irá remover o container logo quando receber um sigint ou sigterm (ctrl+c em terminais linux/mac ou docker stop windows)
- Quando não utiliza-se o Tini ao enviar os signals para remover, o Docker aguardará 10 segundos e irá efetuar o kill do processo (caso a aplicação não esteja preparada para responder o sigterm/sigint)
- [Dockerfile Assignment - Testes com e sem o Tini](resources/docker-mastery-for-nodejs/assignment-dockerfile)
- [Sample Graceful Shutdown](resources/docker-mastery-for-nodejs/sample-graceful-shutdown)

- [Docker Docs: Inject --init into docker run for process management](https://docs.docker.com/engine/reference/run/#specify-an-init-process)
- [Tini: "A tiny but valid init for containers"](https://github.com/krallin/tini)
- [hapi.js - API Framework](https://hapijs.com/)

## Multi-stage Builds

- Funcionalidade adicionada na versão 17.06 (mid-2017)
- Permite a criação de multiplas imagens de um único arquivo Dockerfile, perfeito para diferentes ambientes.
- Permite além da facilidade de ter um único arquivo, segurança e melhor aproveitamento de espaço entre imagens.
- É chamado também como "artifact only images"

- Como o build pode ser feito de um Dockerfile com multiplos stages?
- Por padrão irá ser feito top-down e o ultimo que irá ser levado em consideração no comando `docker build -t myapp .`
- Para um **stage** específico deve ser utilizado o comando `docker build -t myapp:prod --target prod .`

- [Sample Multi Stage](resources/docker-mastery-for-nodejs/sample-multi-stage)

- [Docker Docs - Use multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Advanced multi-stage build patterns](https://medium.com/@tonistiigi/advanced-multi-stage-build-patterns-6f741b852fae)
- [DockerCon Video: Supercharged Docker Build with BuildKit](https://www.youtube.com/watch?v=kkpQ_UZn2uo)
- [Docker Docs: Build Enhancements in 18.09](https://docs.docker.com/develop/develop-images/build_enhancements/)
- [GitHub: BuildKit needs support for docker-compose](https://github.com/moby/buildkit/issues/685)
- [Docker Docs: Using SSH to access private data in builds](https://docs.docker.com/develop/develop-images/build_enhancements/#using-ssh-to-access-private-data-in-builds)
- [BuildKit "frontends" Including Cache](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md)

## Cloud Native App Guidelines

- [The Twelve-Factor App](https://12factor.net/) possui 12 princípios design de aplicações distribuídas, escrito pelo time do Heroku.

- Utilizar variáveis de ambiente para configuração
- Logar para _stdout/stderr_
- Fixar todas as versões da aplicação, até o `npm`
- Graceful exit utilizando _SIGTERM/INIT_
- Criar o `.dockerignore`

### Config [Twelve-Factor App - Config](https://12factor.net/config)

- Armazenar configurações de ambiente como _Environment Variables_
- Docker e Docker Compose atuam muito bem como multiplas opções de variáveis de ambiente
- Lecay Apps: Usar CMD ou ENTRYPOINT script com _envsubst_  para passar Environment Variables para config files
- Ex: `hostname`, `remote api dns`

- [Advanced Node.js Project Structure Tutorial](https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/)
- [Using Environment Vars in Nginx Configuration](https://docs.docker.com/samples/library/nginx/#using-environment-variables-in-nginx-configuration)
- [Templated Nginx configuration with Bash and Docker](https://thepracticalsysadmin.com/templated-nginx-configuration-with-bash-and-docker/)
- [envsubst example for use in Nginx](https://stackoverflow.com/questions/44804974/dynamic-default-conf-of-nginx-in-docker)

### Logs [Twelve-Factor App - Config](https://12factor.net/logs)

- Apps não devem rotear ou transportar logs para nenhum outro local que não seja `stdout` ou `strerr`
- `console.log()` funciona pois irá por padrão para o _standard output_
- [Winston](https://github.com/winstonjs/winston), [Bunyan](https://github.com/trentm/node-bunyan) e [Morgan](https://github.com/expressjs/morgan) são as opções mais utilizadas para controlar os leveis de verbosidade de logs no Node.js

- [Winston Logging with the console transport](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport)

### .dockerignore

- Prevenir carregar imagens com arquivos desnecessários como: `.git/`, `node_modules/`, `npm-debug`, `docker-compose*.yml`
- Não é necessário mas é importante que esteja na imagem: `Dockerfile` e `README.md`

- [gitignore docs, use for .dockerignore](https://git-scm.com/docs/gitignore)
- [.gitignore generator, also useful for .dockerignore](https://www.gitignore.io/)
- [More .dockerignore examples](https://blog.codeship.com/leveraging-the-dockerignore-file-to-create-smaller-images/)

### Migrating Traditional Apps

- "Traditional Apps" = Pré-Docker App
- [Assignment MTA](resources/docker-mastery-for-nodejs/assignment-mta)

## Compose

- Utilizar o _docker-compose_ para desenvolvimento local
- Versão 2 é ideal para desenvolvimento local
  - Versão 3 do .yaml é mais voltada para _swarm ou kubernetes apps_ (não possui o *depends_on* e outros controles de hardwares específicos que existe no v2)

- [O que FAZER e o que NÃO FAZER em compose files](resources/docker-mastery-for-nodejs/compose-tips)

- [Docker Docs: Compose file v2](https://docs.docker.com/compose/compose-file/compose-versioning/#version-21)

### Bind-Mounting Code: Optimizing for Performance

- [Mac Docker file caching performance improvements](https://blog.docker.com/2017/05/user-guided-caching-in-docker-for-mac/)
- [Docker on Mac's file system sharing details](https://docs.docker.com/docker-for-mac/osxfs/)
- [Performance tuning for volume mounts on Mac](https://docs.docker.com/docker-for-mac/osxfs-caching/)
- [Background Sync Tool, and alternative to bind-mounts.](https://github.com/cweagans/docker-bg-sync)
- [Docker for Windows alternate setups with WSL](https://www.reddit.com/r/docker/comments/8hp6v7/setting_up_docker_for_windows_and_wsl_to_work/)

- [Exemplo de .dockerignore para não enviar node_modules para imagem](resources/docker-mastery-for-nodejs/sample-sails)
- [Exemplo Strapi](resources/docker-mastery-for-nodejs/sample-strapi)

- [Nodemon Config Files](https://github.com/remy/nodemon#config-files)
- [Exemplo Nodemon](resources/docker-mastery-for-nodejs/sample-nodemon)

### Healthchecks for _depends_on_

- [Exemplo de health-check no Compose para aprimorar uso do Depends-on](resources/docker-mastery-for-nodejs/depends-on)

- [Compose v2 depends_on Docs](https://docs.docker.com/compose/compose-file/compose-file-v2/#depends_on)
- [Compose File v2 Healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v2/#healthcheck)
- [Example DB Healthchecks from Docker](https://github.com/docker-library/healthcheck)

### Making Microservices Easier with Compose

- [Exemplo de proxy local](resources/docker-mastery-for-nodejs/sample-local-proxy)

- [Localhost Certificates](https://letsencrypt.org/docs/certificates-for-localhost/)
- [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy)
- [Use dnsmasq rather then etc hosts for dev](https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/)
- [Use nginx-proxy + dnsmasq](https://medium.com/@sumankpaul/use-nginx-proxy-and-dnsmasq-for-user-friendly-urls-during-local-development-a2ffebd8b05d)
- [Traefik Proxy](https://traefik.io/)
- [Docker + CORS Discussion 1](https://github.com/docker-solr/docker-solr/issues/182)
- [Docker + CORS Discussion 2](https://github.com/jwilder/nginx-proxy/issues/804)
- [Wildcard DNS for everyone](http://xip.io/)

### Node.js Remote Docker Debugging

- [Exemplo de remote debugging com Typescript](resources/docker-mastery-for-nodejs/typescript)
- [Assignment Compose](resources/docker-mastery-for-nodejs/assignment-sweet-compose)

- [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Debugging TypeScript in a Docker Container](https://github.com/Microsoft/vscode-recipes/tree/master/Docker-TypeScript)
- [ts-node readme](https://github.com/TypeStrong/ts-node)

## Images Production Ready

### Avoiding devDependencies in Prod

- Production stages: `npm i --only=production`
- Development stages: `npm i --only=development`
- CI stages: `npm ci` (instala diretamente do _package-lock_) é mais rápido.
- Garantir que `NODE_ENV` esteja definido

- [Exemplo de Multi-stage Build](resources/docker-mastery-for-nodejs/multi-stage-deps)

### Dockerfile Comments, Arguments and Labels

- Imprimir informações de configuração do npm `npm config list`

- [Exemplo Dockerfile Labels](resources/docker-mastery-for-nodejs/dockerfile-labels)

- [Dockerfile LABEL info in Docs](https://docs.docker.com/engine/reference/builder/#label)
- [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/)
- [OCI standard label format](https://github.com/opencontainers/image-spec/blob/master/annotations.md)
- [Dockerfile ARG info in Docs](https://docs.docker.com/engine/reference/builder/#arg)

### Running Tests During Image Builds

- `RUN npm test` em um stage específico, também é sugere-se utilizar para linting
- Rodar somente testes unitários em build time, não rodar automações, etc

- [Exemplo Multi-stage for Tests](resources/docker-mastery-for-nodejs/multi-stage-test)

- [Docker Hub Advanced options for autobuild and autotest](https://docs.docker.com/docker-hub/builds/advanced/)
- [Node Hero - Node.js Unit Testing Tutorial](https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/)

### Security Scanning During Image Build

- `RUN npm audit`

- [Exemplo Multi-stage for scanning](resources/docker-mastery-for-nodejs/multi-stage-scanning)

- [10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)
- [10 npm Security Best Practices](https://kubedex.com/container-scanning/)
- [Part 2: Follow up on Container Scanning](https://kubedex.com/follow-up-container-scanning-comparison/)
- [Docker image scanning how-to](https://sysdig.com/blog/container-security-docker-image-scanning/)
- [29 Docker security tools compared](https://sysdig.com/blog/20-docker-security-tools/)

### CI Automated Testing and Proper Image Tags

- [How to deal with docker-compose CI exit codes](https://stackoverflow.com/questions/29568352/using-docker-compose-with-ci-how-to-deal-with-exit-codes-and-daemonized-linked)
- [Hadolint, a Dockerfile linter](https://github.com/hadolint/hadolint)
- [dockerfilelint, An opinionated Dockerfile linter](https://github.com/replicatedhq/dockerfilelint)
- [Docker Hub automated repo testing with docker-compose](https://docs.docker.com/docker-hub/builds/automated-testing/)
- [Docker tag "latest" confusion](https://container-solutions.com/docker-latest-confusion/)

### Adding Healthchecks

- [Exemplo com 03 diferentes opções de healthcheck](resources/docker-mastery-for-nodejs/healthchecks)

- [Dockerfile HEALTHCHECK docs](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Effective Docker Healthchecks for Node.js](https://medium.com/@patrickleet/effective-docker-healthchecks-for-node-js-b11577c3e595)

### Assignment

- [Assingment Ultimate Node Dockerfile](resources/docker-mastery-for-nodejs/ultimate-node-dockerfile)
- [Aqua Microscanner](https://github.com/aquasecurity/microscanner)

## Running Production Node.js Containers

- Utilizar múltiplas réplicas ao invés de PM2 ou forever
- Começar com 1-2 replicas por CPU
- Para testes unitários utilizar uma única replica
- Para testes de integração utilizar multiplas replicas

### Por que não utilizar Docker Compose CLI em produção?

- [Bret's anser to "just one host": use Swarm or docker-compose?](https://github.com/BretFisher/ama/issues/8)

### Node.js Containers with Proxies

- [5 Performance tips for Node.js apps](https://www.nginx.com/blog/5-performance-tips-for-node-js-applications/)
- [A few proxy examples in YAML for Swarm](https://github.com/BretFisher/dogvscat)

### Container Replacement and Connection Management

- [godaddy terminus for graceful shutdown](https://github.com/godaddy/terminus)
- [Graceful shutdown with Node.js and Kubernetes](https://blog.risingstack.com/graceful-shutdown-node-js-kubernetes/)
- [Express.js Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)
- [Stoppable, tracking connections and graceful HTTP shutdown](https://github.com/hunterloftis/stoppable)
- [Browncoat: It aims to misbehave. Testing shutdown, blue/green, and rolling updates.](https://github.com/BretFisher/browncoat)

### Node.js with Container Orchestration

- [Exemplo de orquestração](resources/docker-mastery-for-nodejs/sample-result-orchestration)

- [Socket.io with Redis for multi-container](https://github.com/socketio/socket.io-redis)

### Node.js with Docker Swarm

- [Exemplo de Swarm com o app de votação](resources/docker-mastery-for-nodejs/sample-swarm)

- ["dogvs.cat" Sample apps and YAML for Swarm](https://github.com/BretFisher/dogvscat)
