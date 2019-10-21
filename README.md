# Docker

Repositório destinado à conceitos e práticas com Docker

## O que é Docker

É uma plataforma que permite a criação e execução de aplicações de maneira rápida e prática através de pacotes de software em unidades padronizadas chamadas de contêineres os quais possuem tudo que o software precisa para ser executado, incluindo bibliotecas, ferramentas de sistema, código e runtime. O docker permite implantar, escalar e mover rapidamente aplicações em qualquer ambiente, otimizando a utilização de recursos.

### História

O docker foi lançado em 2013 como um projeto open-source por uma empresa chamada **.cloud (dot cloud)** que era uma empresa de hospedagem que atualmente não existe mais. Após um ano do lançamento desta tecnologia, ela se tornou tão grande que eles fecharam a antiga empresa e abriram uma nova chamada **Docker Inc**.

### Quais as vantagens do Docker em relação às tradicionais Máquinas Virtuais

- Rapidez, agilidade _"Docker is all about speed"_
  - Em vários sentidos: para desenvolver, construir, testar, lançar, atualizar e recuperar
- O consumo de recursos é muito menor com o Docker
  - Herda o Kernel e entre outros recursos da máquina host
- Supondo que um a inicialização de um container leva 1seg, a mesma operação em uma máquina virtual com o sistema operacional inteiro, levaria cerca de 1min;

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

- Linux [(diferente por distribuição)](https://store.docker.com/)
  - É recomendado que evite utilizar gerenciador de pacotes
  - CLI `curl -sSL https://get.docker.com/ | sh`

- [Mac](https://docs.docker.com/docker-for-mac/)
  - É recomendado que evite utilizar gerenciador de pacotes como o _brew_
  - [Download](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

- [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
  - ... ou Docker Toolbox para versões diferente da 10 Pro/Enterprise
  - [Docker Docs - Docker for Windows](https://docs.docker.com/docker-for-windows/)
  - [Docker Docs - Docker for Windows: FAQ](https://docs.docker.com/docker-for-windows/faqs/)

- Cloud: AWS/Azure/Google, versões do docker, com características/aplicações específicas da empresa que está distribuindo.

## Docker Concepts

Nas documentações abaixo é abordado suas características, aplicado exemplos, etc.

- [Containers](/docs/containers.md)
- [Images](/docs/images.md)
- [Network](/docs/network.md)
- [Volumes](/docs/volumes.md)
- [Compose](/docs/compose.md)
- [Swarm](/docs/swarm.md)
- [Registry](/docs/registry.md)

- [Using Docker with Node.js](/docs/nodejs.md)

## References

### Docker Documentation

- [Docker Docs - Get Started](https://docs.docker.com/get-started/)
- [Docker Docs - Networking Overview](https://docs.docker.com/network/)
- [Docker Docs - Docker's --format option for filtering](https://docs.docker.com/config/formatting/)
- [Docker Docs - Images and Containers From Docker Docs](https://docs.docker.com/storage/storagedriver/)
- [Docker Docs - Dockerfile Command Details](https://docs.docker.com/engine/reference/builder/)
- [Docker Docs - Docker Storage: manage data in Docker](https://docs.docker.com/storage/)
- [Docker Docs - Compose File Version Differences](https://docs.docker.com/compose/compose-file/compose-versioning/)
- [Docker Docs - Don't use Links! It's a legacy feature of compose, and isn't needed](https://docs.docker.com/compose/compose-file/#links)
- [Docker Docs - Compose file build options - Docker Docs](https://docs.docker.com/compose/compose-file/#build)
- [Docker Docs - Deploy services to a swarm](https://docs.docker.com/engine/swarm/services/)
- [Docker Docs - Windows Hyper-V driver for docker-machine](https://docs.docker.com/machine/drivers/hyper-v/)
- [Docker Docs - Use swarm mode routing mesh](https://docs.docker.com/engine/swarm/ingress/)
- [Docker Docs - Features Not Supported In Stack Deploy](https://docs.docker.com/compose/compose-file/#not-supported-for-docker-stack-deploy)
- [Docker Docs - Manage sensitive data with Docker secrets (Lots of good reading and examples)](https://docs.docker.com/engine/swarm/secrets/)
- [Docker Docs - Secrets In Compose Files](https://docs.docker.com/compose/compose-file/#secrets-configuration-reference)
- [Docker Docs - Using Multiple Compose Files](https://docs.docker.com/compose/extends/#multiple-compose-files)
- [Docker Docs - Using Compose Files In Production](https://docs.docker.com/compose/production/)
- [Docker Docs - Service Update command](https://docs.docker.com/engine/reference/commandline/service_update/)
- [Docker Docs - HEALTHCHECK in Dockerfile](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Docker Docs - Healthcheck in Compose files](https://docs.docker.com/compose/compose-file/#healthcheck)
- [Docker Docs - Registry Configuration Docs](https://docs.docker.com/registry/configuration/)
- [Docker Docs - Registry Garbage Collection](https://docs.docker.com/registry/garbage-collection/)
- [Docker Docs - Use Registry As A "Mirror" of Docker Hub](https://docs.docker.com/registry/recipes/mirror/)
- [Docker Docs - QEMU Emulator in Docker Desktop for Mac/Windows](https://docs.docker.com/docker-for-mac/multi-arch/)
- [Docker Docs - Docker Build Documentation](https://docs.docker.com/engine/reference/commandline/build/)
- [Docker Docs - ENTRYPOINT in Dockerfiles](https://docs.docker.com/engine/reference/builder/#entrypoint)
- [Docker Docs - ENTRYPOINT Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint)

## Repositories

- [Docker Mastery: Github Repository](https://github.com/bretfisher/udemy-docker-mastery)
- [Node.js Docker Good Defaults - BretFisher @ Github](https://github.com/BretFisher/node-docker-good-defaults)
- [PHP Docker Good Defaults - BretFisher @ Github](https://github.com/BretFisher/php-docker-good-defaults)
- [Awesome Docker @ Github](https://github.com/veggiemonk/awesome-docker)
- [The Moby Project](https://github.com/moby/moby)
- [Docker for the Virtualization Admin - EBook](https://github.com/mikegcoleman/docker101/blob/master/Docker_eBook_Jan_2017.pdf)
- [List of Official Docker Images](https://github.com/docker-library/official-images/tree/master/library)
- [Docker Compose Release Downloads (good for Linux users that need to download manually)](https://github.com/docker/compose/releases)
- [Production Servers: Compose vs. Swarm](https://github.com/BretFisher/ama/issues/8)
- [PHP Laravel Good Defaults with Docker](https://github.com/BretFisher/php-docker-good-defaults)
- [Only one host for production, should I use docker-compose or Swarm](https://github.com/BretFisher/ama/issues/8)
- [Those Same ENV's overwritten with docker-compose.yml](https://github.com/BretFisher/php-docker-good-defaults/blob/master/docker-compose.yml)
- [Simple example of using Docker ENV's to create custom app config](https://github.com/BretFisher/php-docker-good-defaults/blob/master/docker-php-entrypoint)
- [Docker MySQL Official Image Entrypoint Script that creates ENV's from files (for secrets)](https://github.com/docker-library/mysql/blob/a7a737f1eb44db467c85c8229df9d886dd63460e/8.0/docker-entrypoint.sh#L21-L41)
- [3 Docker Compose features for improving team development workflow](https://www.oreilly.com/ideas/3-docker-compose-features-for-improving-team-development-workflow)
- [My Examples of using Traefik with Swarm](https://github.com/BretFisher/dogvscat)
- [image2docker for windows container](https://github.com/docker/communitytools-image2docker-win)
- [image2docker linux container](https://github.com/docker/communitytools-image2docker-linux)

## Articles & Videos

- [Play with Docker](https://labs.play-with-docker.com/)
- [Training - Play with Docker](http://training.play-with-docker.com/)
- [The Future of Docker Swarm - Brett Fisher](https://www.bretfisher.com/the-future-of-docker-swarm/)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Article About the DCA (Docker Certificated Associate](https://www.bretfisher.com/docker-certified-associate/)
- [Docker Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Everything You Thought You Already Knew About Orchestration @ Youtube](https://www.youtube.com/watch?v=Qsv-q8WbIZY)
- [Container Scanning Comparision](https://kubedex.com/follow-up-container-scanning-comparison/)
- [Alpine Linux Docker Images, are they really more secure?](https://www.youtube.com/watch?v=e2pAkcqYCG8)
- [Cgroups, namespaces, and beyond: what are containers made from? @ Youtube](https://www.youtube.com/watch?v=sK5i-N34im8)
- [Package Management Basics: apt, yum, dnf, pkg](https://www.digitalocean.com/community/tutorials/package-management-basics-apt-yum-dnf-pkg)
- [DNS: Why It’s Important and How It Works](https://dyn.com/blog/dns-why-its-important-how-it-works/)
- [How DNS Works - Ebook](https://howdns.works/)
- [Round-robin DNS](https://en.wikipedia.org/wiki/Round-robin_DNS)
- [An introduction to immutable infrastructure](https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure)
- [The 12-Factor App (Everyone Should Read: Key to Cloud Native App Design, Deployment, and Operation)](https://12factor.net/)
- [12 Fractured Apps (A follow-up to 12-Factor, a great article on how to do 12F correctly in containers)](https://medium.com/@kelseyhightower/12-fractured-apps-1080c73d481c#.cjvkgw4b3)
- [YAML - Quick Reference Card](https://yaml.org/refcard.html)
- [Docker 1.12 Swarm Mode Deep Dive Part 1: Topology](https://www.youtube.com/watch?v=dooPhkXT9yI)
- [Docker 1.12 Swarm Mode Deep Dive Part 2: Orchestration](https://www.youtube.com/watch?v=_F6PSP-qhdA)
- [Heart of the SwarmKit: Topology Management (slides)](https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management)
- [Heart of the SwarmKit: Store, Topology & Object Model (YouTube)](https://www.youtube.com/watch?v=EmePhjGnCXY)
- [Raft Consensus Visualization (Our Swarm DB and how it stays in sync across nodes)](http://thesecretlivesofdata.com/raft/)
- [Docker Swarm Firewall Ports](https://www.bretfisher.com/docker-swarm-firewall-ports/)
- [Bret Fisher Docker and DevOps @ Podcast](https://www.bretfisher.com/podcast/)
- [Bret Fisher Docker and DevOps @ Youtube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg)
- [Alpine Linux](https://alpinelinux.org/)
- [CVE Database](https://cve.mitre.org/)
- [Blog on CVE Scanners and their effectiveness on Alpine images](https://kubedex.com/follow-up-container-scanning-comparison/)
- [Three places to control different docker IP subnet settings](https://serverfault.com/questions/916941/configuring-docker-to-not-use-the-172-17-0-0-range/942176#942176)
- [Alex Ellis' Raspberry Pi blog posts](https://blog.alexellis.io/tag/raspberry-pi/)
- [Using TLS for Localhost](https://letsencrypt.org/docs/certificates-for-localhost/)
- [Traefik Proxy](https://traefik.io/)
- [Docker and ARM announcement](https://www.theregister.co.uk/2019/04/24/docker_arm_collaberation/)
- [AWS ARM A1 instances](https://aws.amazon.com/pt/blogs/aws/new-ec2-instances-a1-powered-by-arm-based-aws-graviton-processors/)
- [QEMU](https://www.qemu.org/)
- [ENTRYPOINT vs CMD](http://www.johnzaccone.io/entrypoint-vs-cmd-back-to-basics/)
- [image2docker demo](https://www.youtube.com/watch?v=YVfiK72Il5A)

## Docker Courses at Udemy

- [Docker Mastery: The Complete Toolset From a Docker Captain](https://www.udemy.com/docker-mastery)
- [Docker Master For Node.JS](https://www.udemy.com/docker-mastery-for-nodejs)
- [Docker Course at Udemy @ Cod3r](https://www.udemy.com/curso-docker/)
