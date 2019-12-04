# Criar um Multi-Service Multi-Node Web App

Objetivo criar networks, volumes e services para um webapp "cats vs. dogs"

## Diagrama básico de como os 5 services vão funcionar:

![diagram](./architecture.png)

Todas as imagens estão no Docker Hub, então deverá ser feito os comandos localmente e posteriormente executados no shell

- Duas redes "overlay" serão necessárias, chamadas `backend` e `frontend`. Nada diferente sobre como o backend irá proteger o banco de dados do frontend.

- > `docker network create -d overlay backend`
- > `docker network create -d overlay frontend`

- O banco de dados deve usar um **Named Volume** para preservar os dados. Utilizar o novo formato com `--mount` para fazer `--mount type=volume,source=db-data,target=/var/lib/postgresql/data`

### Services

- Serviço: **vote**
  - Imagem: **dockersamples/examplevotingapp_vote:before**
  - Descrição: App frontend para votar entre dogs/cats
  - Idealmente publicado na porta 80 TCP. O container escuta na porta 80 da rede **frontend**
  - 2+ replicas do container
  - > `docker service create --name vote -p 80:80 --network frontend --replicas 2 dockersamples/examplevotingapp_vote:before`

- Serviço: **redis**
  - Imagem: **redis:3.2**
  - Descrição: key/value para armazenar os votos que serão computados
  - Sem portas públicas
  - Deverá estar na rede **frontend**
  - 1 replica é necessária
  - > `docker service create --name redis --network frontend redis:3.2`

- Serviço: **worker**
  - Imagem: **dockersamples/examplevotingapp_worker**
  - Descrição: Responsável por processar o que vier do redis e armazenar os resultados no postgres
  - Sem portas públicas
  - Deverá estar na rede **frontend** e **backend**
  - 1 replica é necessária
  - > `docker service create --name worker --network frontend --network backend dockersamples/examplevotingapp_worker`

- Serviço: **db**
  - Imagem: **postgres:9.4**
  - Descrição: É necessário um named volume apontando para `/var/lib/postgresql/data`
  - Deverá estar na rede **backend**
  - 1 replica é necessária
  - > `docker service create --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data postgres:9.4`

- Serviço: **result**
  - Imagem: **dockersamples/examplevotingapp_result:before**
  - Descrição: web app que exibe os resultados
  - Roda em uma _high port_ pois é utilizada somente por admins (vamos imaginar assim)
  - Escolher uma porta qualquer, ex: 5001, pois o container roda na 80
  - Deverá estar na rede **backend**
  - 1 replica é necessária
  - > `docker service create --name result --network backend -p 5001:80 dockersamples/examplevotingapp_result:before`
