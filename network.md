# Docker Network

O docker segue o conceito de _"Batteries included, but removable"_, que basicamente diz que, o que precisa para funcionar você já tem, mas se quiser customizar, você pode.

## Conceitos

- Ao inicializar um container, por padrão cada container é atribuído a uma rede virtual privada, chamada "bridge"
- Cada rede virtual roteia através de um _NAT Firewall_ no IP do Host, o que é orquestrado pelo Docker Daemon e que permite o container chegar à Internet por exemplo
- Todos os containers em uma rede virtual do Docker conseguem se comunicar entre si sem a necessidade do `--publish` de portas
- A melhor prática é criar uma nova rede virtual para cada aplicação
  - Exemplo 01: A rede **my_web_app** para os containers de mysql e php/apache
  - Exemplo 02: A rede **my_api** para os containers do mongodb e nodejs
- É permitido atribuir containers à mais de uma rede virtual, ou nenhuma se necessário, através da `none`
- É permitido ignorar as redes virtuais e atribuir o container diretamente no IP do Host `--net=host`

## Drivers de rede padrões

- None Network (completamente isolado, sem interfaceamento de rede)
- Bridge Network (Padrão)
- Host Network
- Overlay Network (Swarm)

## Tráfego e Firewalls

Como as redes do docker movem pacotes para dentro e para fora.

**Componentes:** Internet Física > Host PC > Docker Network > Container

Ao criar um container e "anexá-lo" com uma rede virtual do tipo bridge (padrão), esta rede é automaticamente anexada à interface de rede da máquina host. Quando especificado que libere uma porta `-p 5000:80`, irá fazer com que a porta 5000 seja liberada na interface de rede da máquina host e automaticamente redirecionar todo tráfego que chegue através desta porta para a rede virtual do Docker na porta 80 do container.

Isto permite criar múltiplos containers dentro de uma mesma rede não expondo portas caso não seja necessário. Ex: Banco de dados.

**Importante** ao utilizar uma rede do tipo `host` o container será vinculado diretamente na rede do host, ganhando performance, porém, sacrificando a camada extra que o container provê como forma de segurança através das redes virtuais.

## Visualizar os drivers de redes

```sh
docker network ls
```

## Visualizar as portas publicadas (_published_) de um container específico

```sh
docker container port CONTAINER_NAME
```

## Inspecionar as configurações de rede um container

```sh
docker container run -d -p 5000:80 --name webhost nginx
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
```

**Observação:** o `--format` permite formatar a saída do inspect no padrão da linguagem Go (linguagem em que o Docker é desenvolvido), permitindo neste exemplo acima, acessar o nó do json em que contém as propriedades de Network. Mais em: [Docker's --format option for filtering cli output](https://docs.docker.com/config/formatting/)

## Inspecionar uma rede

```sh
docker network inspect NETWORK_ID
docker network inspect NETWORK_NAME
```

## Criar uma rede

Para verificar todas as configurações possíveis, como subnets, gateways, external access, etc

```sh
docker network create --help
```

### Criar uma rede com base no driver padrão `bridge`

```sh
docker network create my_app_net
```

### Criar um container com uma configuração de rede específica

```sh
docker container run -d --name new_nginx --network my_app_net nginx
```

## Vincular/desvincular uma rede à um container

```sh
docker network connect NETWORK_ID CONTAINER_ID
docker network disconnect NETWORK_ID CONTAINER_ID
```

### Vinculando uma rede à um container

bservação: é possível ter um container trabalhando com mais de uma rede

```sh
docker network connect NETWORK_ID CONTAINER_ID
```

## DNS Naming via Docker DNS

Num ambiente tão dinâmico onde containers constantemente estão sendo criados, removidos, movidos, expandidos nós não podemos mais contar diretamente com endereços IP como maneira de se comunicar com entre componentes. E a solução para isso é chamada de _DNS Naming_.

A engine do Docker possui um servidor de DNS embutido que os containers utilizam como padrão onde o **container_name** é o equivalente ao **hostname** para os containers se comunicarem entre si.

### Provando conceito DNS

Pode ser realizada com os comandos abaixo, por meio da criação de dois containers na mesma rede no qual um enxergará o outro através de um comando ping no hostname.

Criar dois container na mesma rede:

```sh
docker network create my_app_net
docker container run -d --name my_nginx --network my_app_net nginx:alpine
docker container run -d --name new_nginx --network my_app_net nginx:alpine
```

**Observação:** Utilizar a imagem do `nginx:alpine` que possui o comando ping ou `nginx:latest` instalando através de `apt-get update && apt-get install -y iputils-ping` dentro do container.

Verificar o ping utilizando nome dos containers

```sh
docker container exec -it my_nginx ping new_nginx
```

## Exercícios

### Exercício 01

Utilizar containers para testar a ferramenta `curl` em diferentes ditribuições do linux.

Utilizar dois terminais para inicializar o bash no `centos:7` e `ubuntu:14.04` utilizando modo `-it`.

Utilizar `--rm` na criação do container para que quando finalizar seu ciclo de vida seja deletado.

Garantir que `curl` está instalado na última versão para cada distro:

**ubuntu**: `apt-get update && apt-get install curl`

**centos**: `yum update curl` e verificar a versão `curl version`

#### Exercício 01: Resolução

##### CentOS 7

```sh
docker container run --rm --name centos -it centos:7 bash
```

```sh
# $centos@root
yum update curl
curl --version # 7.29.0
```

##### Ubuntu 14.04

```sh
docker container run --rm --name ubuntu -it ubuntu:14.04 bash
```

```sh
# $ubuntu@root
apt-get update && apt-get install curl
curl --version # 7.35.0
```

___

### Exercício 2

Aplicar o mecanismo de Round Robin utilizando Docker ao criar múltiplos containers que respondem à mesma rede. Criar 2 containers da imagem `elasticsearch:2`.

Utilizar o comando `--net-alias search` quando estiver criando para adicioná-los ao mesmo nome de DNS, lembrando que por padrão o Docker seus _hostnames_ serão o mesmo do container.

Executar a `alpine nslookup search` com o `--net` para verificar os dois containers com o mesmo nome de DNS. Executar `centos curl -s search:9200` com `--net` múltiplas vezes até que o campo "name" seja exibido duas vez seguidas o mesmo.

Ao fazer a requisição para o elastic search, ele devolve um json com uma propriedade "name" que é um nome aleatório gerado para cada instância do mesmo, semelhante à maneira que o Docker faz com o nome de containers. Efetuar as múltiplas requisições para verificar o balanceamento entre os 2 containers criados.

> Round Robin é um mecanismo de equilíbrio local de carga, usado pelos servidores DNS  para compartilhar e distribuir cargas entre dois ou mais servidores da rede. Entenda-se por carga de trabalho no servidor DNS, os pedidos para resolução de nomes, enviados através de consulta dos diversos clientes da rede (estações de trabalho e outros equipamentos ligados na rede). Por exemplo, pode ser utilizado para distribuir os acessos a um site de elevado volume de acessos entre dois ou mais servidores Web, os quais que contém exatamente o mesmo conteúdo. Em resumo, usando o Round robin, a um único nome DNS são associados dois ou mais endereços IP. A medida que as requisições vão chegando, o servidor DNS responde cada consulta com um dos endereços IP e depois faz uma reordenação da lista de endereços, para que na próxima requisição, um endereço IP diferente seja o primeiro da lista. Isso proporciona uma distribuição igualitária de carga entre os diversos servidores. [Júlio Battisti - Tutorial de TCP/IP](https://juliobattisti.com.br/artigos/windows/tcpip_p30.asp)

#### Exercício 02: Resolução

Criar rede:

```sh
docker network create dude
```

Criar container 1:

```sh
docker container run -d --net dude --net-alias search elasticsearch:2
```

Criar container 2:

```sh
docker container run -d --net dude --net-alias search elasticsearch:2
```

Criar container do alpine e executar o dns lookup com nome search:

```sh
docker container run --rm --net dude alpine nslookup search
```

Criar container do centos e executar `curl`:

```sh
docker container run --rm --net dude centos curl -s search:9200
```

## Referências

- [Docker Docs - Networking Overview](https://docs.docker.com/network/)
- [Docker Docs - Docker's --format option for filtering](https://docs.docker.com/config/formatting/)
- [DNS: Why It’s Important and How It Works](https://dyn.com/blog/dns-why-its-important-how-it-works/)
- [How DNS Works - Ebook](https://howdns.works/)
- [Round-robin DNS](https://en.wikipedia.org/wiki/Round-robin_DNS)
