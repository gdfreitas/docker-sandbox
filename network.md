# Docker Network

O docker usa o conceito de "Batteries included, but removable", que basicamente diz que, o que precisa para funcionar você já tem, mas se quiser customizar, você pode!

- None Network (completamente isolado, sem interfaceamento de rede)
- Bridge Network (Padrão)
- Host Network
- Overlay Network (Swarm)

## Tráfego e Firewalls

Como as redes do docker movem pacotes para dentro e para fora.

**Componentes:** Internet Física | Host PC | Docker Network | Container

Ao criar um container e "anexá-lo" com uma rede virtual do tipo bridge (padrão), esta rede é automaticamente anexada à interface de rede da máquina host. Quando especificado que libere uma porta `-p 80:80`, irá fazer com que a porta 80 seja liberada na interface de rede da máquina host e automaticamente enviar tudo que chegue através desta porta para a rede virtual para a porta 80 do container que foi criado dentro desta rede.

Isto permite criar múltiplos containers dentro de uma mesma rede não expondo portas caso não seja necessário. Ex: banco de dados.

**Importante** ao utilizar uma rede do tipo `host` o container será vinculado diretamente na rede do host, ganhando performance, porém, sacrificando a camada extra que o container provê como forma de segurança através das redes virtuais.

Visualizar as redes disponíveis do Docker:

```docker
docker network ls
```

Visualizar as portas sendo utilizadas em um container específico:

```docker
docker container port CONTAINER_NAME
```

Inspecionar as configurações de rede um container:

```docker
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
```

**Observação:** o `--format` permite formatar a saída do inspect no padrão da linguagem Go (linguagem em que o Docker é desenvolvido), permitindo neste exemplo acima, acessar o nó do json em que contém as propriedades de Network. Mais em: [Docker's --format option for filtering cli output](https://docs.docker.com/config/formatting/)

Inspecionar uma network

```docker
docker network inspect
```

Criar uma network

```docker
docker network create --driver
```

*Exemplo 1:* criar uma rede com base no driver padrão `bridge`

```docker
docker network create my_app_net
```

*Exemplo 2:* criar um container com uma configuração de rede específica

```docker
docker container run -d --name new_nginx --network my_app_net nginx
```

Vincular/desvincular uma network à um container

```docker
docker network connect/disconnect
```

*Exemplo 3:* vinculando uma rede à um container (Observação: é possível ter um container trabalhando com mais de uma rede)

```docker
docker network connect NETWORK_ID CONTAINER_ID
```

## Docker DNS

A engine do docker possui um "servidor de DNS" integrado que os containers utilizam como padrão.

**Observação:** o docker define por padrão que o nome do host será o nome do container, porém, podemos definir aliases.

- _Criar 02 containers em uma mesma rede a partir da imagem do `nginx` e executar um ping entre eles utilizando o nome do container como hostname._

Criar dois container na mesma rede:

```docker
docker container run -d --name my_nginx --network my_app_net nginx
docker container run -d --name new_nginx --network my_app_net nginx
```

Como a imagem do nginx não vem mais com o comando ping, temos que instalar um dentro do container:

- Executar o bash do container em modo interativo

```docker
docker container exec -it my_nginx bash
apt-get update && apt-get install -y iputils-ping
```

Verificar o ping utilizando nome dos containers

```docker
docker container exec -it my_nginx ping new_nginx
```

[Docker Network - Exercício 1](basics/network_assignment_1.md)
[Docker Network - Exercício 2](basics/network_assignment_2.md)

## Referências

- [Docker Docs - Networking Overview](https://docs.docker.com/network/)
