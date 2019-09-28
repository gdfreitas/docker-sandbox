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

- [Docker Docs: Inject --init into docker run for process management](https://docs.docker.com/engine/reference/run/#specify-an-init-process)
- [Tini: "A tiny but valid init for containers"](https://github.com/krallin/tini)
- [hapi.js - API Framework](https://hapijs.com/)
