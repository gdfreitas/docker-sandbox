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

## Características

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

### Versões

- `Stable` versão estável, testada, etc.
- `Edge` permite download antecipado, lançamentos mensais, a cada 4 meses esta versão vira um versão estável.

### Instalação

Três principais tipos instalações: Direct, Mac/Windows e Cloud

- Linux [(diferente por distribuição)](https://store.docker.com/)
  - CLI `curl -sSL https://get.docker.com/ | sh`
  - _Não é recomendado instalar via gerenciador de pacotes da distribuição_

- [Mac](https://docs.docker.com/docker-for-mac/)
  - É recomendado que evite utilizar gerenciador de pacotes como o _brew_
  - [Download](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

- [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
  - ... ou Docker Toolbox para versões diferente da 10 Pro/Enterprise
  - [Docker Docs - Docker for Windows](https://docs.docker.com/docker-for-windows/)
  - [Docker Docs - Docker for Windows: FAQ](https://docs.docker.com/docker-for-windows/faqs/)

- Cloud: AWS/Azure/Google, versões do docker, com características/aplicações específicas da empresa que está distribuindo.

## Conceitos

Nas documentações abaixo é abordado conceitos, características, exemplos de uso, etc.

A versão do Docker e configurações da Engine podem ser consultadas `docker version && docker info`

Os comandos do Docker podem ser consultados através de `docker --help`.

Uma curiosidade é que com o passar dos anos houve uma melhora na organização dos comandos disponíveis. Pode-se perceber ao executar o comando de `--help` as divisões.

- **Commands** (formato antigo) `docker <command> (options)`
- **Management Commands** (formato novo) `docker <command> <sub-command> (options)`

Como o docker possui uma política de retrocompatibilidade, os antigos não deixarão de funcionar, mas novos comandos não estarão disponíveis no antigo formato.

### Básicos

- [Containers](containers.md)
- [Network](network.md)
- [Images](images.md)
- [Volumes](volumes.md)
- [Compose](compose.md)

### Orquestração

- [Swarm](swarm.md)
- [Kubernetes (K8s)](kubernetes.md)

### Outros

- [Using Docker with Node.js](nodejs.md)

## Referências

### Docker Docs

- [Docker Docs - Get Started](https://docs.docker.com/get-started/)
- [Docker Docs - QEMU Emulator in Docker Desktop for Mac/Windows](https://docs.docker.com/docker-for-mac/multi-arch/)

### Repositórios

- [Docker @ GitHub](https://github.com/docker)
- [Moby @ GitHub](https://github.com/moby/moby)
- [Docker Mastery @ GitHub](https://github.com/bretfisher/udemy-docker-mastery)
- [Docker Library - Official Images @ GitHub](https://github.com/docker-library/official-images/tree/master/library)
- [Docker Mastery by BretFisher @ GitHub](https://github.com/bretfisher/udemy-docker-mastery)
- [Docker Mastery for Node.js by BretFisher @ GitHub](https://github.com/bretfisher/docker-mastery-for-nodejs)

___

- [Node.js Docker Good Defaults - bretfisher @ Github](https://github.com/bretfisher/node-docker-good-defaults)
- [PHP Docker Good Defaults - bretfisher @ Github](https://github.com/bretfisher/php-docker-good-defaults)

___

- [Awesome Docker @ Github](https://github.com/veggiemonk/awesome-docker)
- [Docker for the Virtualization Admin - EBook](https://github.com/mikegcoleman/docker101/blob/master/Docker_eBook_Jan_2017.pdf)

### Artigos e Videos

- [Play with Docker](https://labs.play-with-docker.com/)
- [Training - Play with Docker](http://training.play-with-docker.com/)
- [The Future of Docker Swarm - Brett Fisher](https://www.bretfisher.com/the-future-of-docker-swarm/)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Article About the DCA (Docker Certificated Associate](https://www.bretfisher.com/docker-certified-associate/)
- [Docker Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Everything You Thought You Already Knew About Orchestration @ Youtube](https://www.youtube.com/watch?v=Qsv-q8WbIZY)
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
- [Using TLS for Localhost](https://letsencrypt.orgcertificates-for-localhost/)
- [Traefik Proxy](https://traefik.io/)
- [Docker and ARM announcement](https://www.theregister.co.uk/2019/04/24/docker_arm_collaberation/)
- [AWS ARM A1 instances](https://aws.amazon.com/pt/blogs/aws/new-ec2-instances-a1-powered-by-arm-based-aws-graviton-processors/)
- [QEMU](https://www.qemu.org/)
- [ENTRYPOINT vs CMD](http://www.johnzaccone.io/entrypoint-vs-cmd-back-to-basics/)
- [image2docker demo](https://www.youtube.com/watch?v=YVfiK72Il5A)

### Cursos sobre Docker

- [Docker Mastery: with K8s & Swarm from a Docker Captain](https://www.udemy.com/docker-mastery)
- [Docker for Node.js Projects From a Docker Captain](https://www.udemy.com/docker-mastery-for-nodejs)
- [Docker: Ferramenta essencial para Desenvolvedores](https://www.udemy.com/curso-docker/)
