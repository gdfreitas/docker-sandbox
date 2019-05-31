# Docker Swarm

- _"Containers everywhere = New problems"_
- Como automatizamos o ciclo de vida dos containers?
- Como escalamos?
- Como garantimos que containers recriam-se sozinhos quando falham?
- Como substituir containers sem downtime? _(blue/green deploy)_
- Como controlamos/rastrear onde os containers iniciaram?
- Como criar redes virtuais entre containers?
- Como garantir que somente servidores confiáveis rodem nossos containers?
- Como armazenar secrets, keys, passwords, e acessá-los através do container?

## Swarm Mode: Built-in Orchestration

- Swarm Mode é uma solução integrada no Docker para clusterização.
- Não é relacionada ao Swarm class'fico das versões < 1.12.

## Comandos

Por padrão swarm não vem habilitado com o Docker, deve ser ativado.

```docker
docker swarm init
```

- `docker node ls`

- `docker service ls` Exibe lista dos services com quantidade de replicas
- `docker service create alpine ping 8.8.8.8`

- `docker service ps SERVICE_NAME` Exibe lista dos containers que estão rodando no service

- `docker service update SERVICE_NAME --replicas 3` Definir número de replicas do service

- `docker service rm SERVICE_NAME` Remove o service e posteriormente os containers relacionados são removidos

- `docker node ls` Exibe lista dos nodes e quem é o Líder
- `docker node update --role manager node2`  Atualiza role do node2 para manager