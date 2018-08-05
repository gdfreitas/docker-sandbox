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