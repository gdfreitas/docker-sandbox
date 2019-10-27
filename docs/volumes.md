# Docker Volumes

## Tempo de vida de containers e dados persistentes

- Containers são usualmente imutáveis e efêmeros (marcados por ciclos de vida curtos)
- "Infraestrutura Imutável": design-goal, best-practice, só re-deploy, sem alterações
- Este é o cenário ideal, porém, o que acontece com as bases de dados? ou dados únicos?
- O Docker possui características para garantir esta "separação de interesses"
- É conhecido como "Persistent Data" e pode ser definido de duas formas: Volumes e Bind Mounts:
  - **Volumes**: criam um local especial fora do sistema de arquivos do container (Unix File System)
  - **Bind mounts**: vincula diretórios do container à diretórios do host

Exibir os volumes existentes

```docker
docker volume ls
```

Limpar volumes em uso ou não:

```docker
docker volume prune
```

Definir um nome para o volume através do comando run:

```docker
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -v mysql-db:/var/lib/mysql mysql
```

**Importante:** por padrão o Docker cria os volumes com hashes e mesmo após parar e remover os containers os volumes ficam armazenados, ficando difícil de identificar, caso seja necessário saber a qual container aquele volume pertenceu.

Criar volumes manualmente (permite utilizar drivers e labels customizados)

```docker
docker volume create
```

Definir um **bind mounting** (só é permitido através do comando `container run`, não é permitido através do Dockerfile):

```docker
docker container run -d --name nginx -p 80:80 -v ${pwd}:/usr/share/nginx/html nginx
```

**Observação:** a palavra chave `${pwd}` (print current directory) no windows 10 só funciona através do powershell.

[Docker Volumes - Exercício 1](basics/volumes_assingment_1.md)
[Docker Volumes - Exercício 2](basics/volumes-assingment-2/volumes_assingment_2.md)

## Referências

- [Docker Docs - Docker Storage: manage data in Docker](https://docs.docker.com/storage/)
