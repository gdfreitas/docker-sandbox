# Docker

Repositório destinado à conceitos e práticas com Docker

## O que é Docker

É uma plataforma que permite a criação e execução de aplicações de maneira rápida e prática através de pacotes de software em unidades padronizadas chamadas de contêineres os quais possuem tudo que o software precisa para ser executado, incluindo bibliotecas, ferramentas de sistema, código e runtime. O docker permite implantar, escalar e mover rapidamente aplicações em qualquer ambiente, otimizando a utilização de recursos.

### História

O docker foi lançado em 2013 como um projeto open-source por uma empresa chamada **.cloud (dot cloud)** que era uma empresa de hospedagem que atualmente não existe mais. Após um ano do lançamento desta tecnologia, ela se tornou tão grande que eles fecharam a antiga empresa e abriram uma nova chamada **Docker Inc**.

### Quais as vantagens do Docker em relação às tradicionais Máquinas Virtuais

1. Rapidez, agilidade _"Docker is all about speed"_
  1.1 Em vários sentidos: para desenvolver, construir, testar, lançar, atualizar e recuperar
2. O consumo de recursos é muito menor com o Docker
  2.2 Herda o Kernel e entre outros recursos da máquina host
3. Supondo que um a inicialização de um container leva 1seg, a mesma operação em uma máquina virtual com o sistema operacional inteiro, levaria cerca de 1min;

## Principais características

- Não é um sistema de virtualização tradicional (VM - Virtual Machine)
- É uma engine de administração de containers (ambiente/serviço isolado da maquina host)
- É baseado em uma tecnologia de serviços LXC (Linux Containers);
- Open Source e escrito em Go (linguagem)
- Host e container compartilham o Kernel (menor consumo, otimização, etc)
- Empacota software com vários níveis de isolamento (memória, cpu, rede, etc)

## Docker Editions

- Docker CE (Community Edition): grátis para uso
- Docker EE (Enterprise Edition): pago
  - Recomendado para grandes empresas, possui suporte 24/7, diretivas de seguranças em imagens, certificado em plataformas específicas, entre outros diversos produtos extras.

### Versions

- `Stable` versão estável, testada, etc.
- `Edge` permite download antecipado, lançamentos mensais, a cada 4 meses esta versão vira um versão estável.

### Installation

Três principais tipos instalações: Direct, Mac/Windows e Cloud

- Linux [diferente por distribuição](https://store.docker.com/)
  - Evitar usar gerenciador de pacotes
  - `curl -sSL https://get.docker.com/ | sh`

- [Windows](https://www.docker.com/docker-windows) (ou Docker Toolbox para versões diferente da 10 Pro/Enterprise)

- Mac (ou Docker Toolbox)
  - Evitar uso do _brew_

- Cloud: AWS/Azure/Google, versões do docker, com características/aplicações específicas da empresa que está distribuindo.

## [Containers](/docs/containers.md)

## [Images](/docs/images.md)

> [Dockerfile Best Practices for Node.js](/docs/nodejs-dockerfile-best-practices.md)

## [Network](/docs/network.md)

## [Volumes](/docs/volumes.md)

## [Compose](/docs/compose.md)

## [Swarm](/docs/swarm.md)

## [Registry](/docs/registry.md)

## Referências

- [Docker Documentation - Get Started](https://docs.docker.com/get-started/)
- [Docker Mastery: The Complete Toolset From a Docker Captain](https://www.udemy.com/docker-mastery)
- [Docker Master For Node.JS](https://www.udemy.com/docker-mastery-for-nodejs)
- [Docker Mastery: Github Repository](https://github.com/bretfisher/udemy-docker-mastery)
- [Docker | Docs - Networking Overview](https://docs.docker.com/network/)
  - [Node.js Docker Good Defaults - BretFisher @ Github](https://github.com/BretFisher/node-docker-good-defaults)
  - [PHP Docker Good Defaults - BretFisher @ Github](https://github.com/BretFisher/php-docker-good-defaults)
- [Awesome Docker @ Github](https://github.com/veggiemonk/awesome-docker)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Training - Play with Docker](http://training.play-with-docker.com/)
- [The Future of Docker Swarm - Brett Fisher](https://www.bretfisher.com/the-future-of-docker-swarm/)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Article About the DCA (Docker Certificated Associate](https://www.bretfisher.com/docker-certified-associate/)
- [Docker Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Everything You Thought You Already Knew About Orchestration @ Youtube](https://www.youtube.com/watch?v=Qsv-q8WbIZY)
- [The Moby Project](https://github.com/moby/moby)
- [Container Scanning Comparision](https://kubedex.com/follow-up-container-scanning-comparison/)
- [Alpine Linux Docker Images, are they really more secure?](https://www.youtube.com/watch?v=e2pAkcqYCG8)
- [Docker Course at Udemy @ Cod3r](https://www.udemy.com/curso-docker/)
