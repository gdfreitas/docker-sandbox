# Docker Volumes

## Tempo de vida de containers e dados persistentes

- Containers são usualmente imutáveis e efêmeros (marcados por ciclos de vida curtos)
- "Infraestrutura Imutável" é um objetivo de design, uma melhor prática, só re-deploy, sem alterações
- Este é o cenário ideal, porém, o que acontece com as bases de dados? ou dados únicos?
- O Docker possui características para garantir esta "separação de interesses"
- É conhecido como **Persistent Data** e pode ser definido de duas formas: **Volumes** e **Bind mounts**:
  - **Volumes**: criam um local especial fora do sistema de arquivos do container (Unix File System)
  - **Bind mounts**: vincula diretórios do container à diretórios do host

## Exibir os volumes existentes

```docker
docker volume ls
```

## Limpar volumes em uso ou não

```docker
docker volume prune
```

## Definir um nome para o volume através do comando run

```docker
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -v mysql-db:/var/lib/mysql mysql
```

**Importante:** Por padrão o Docker cria os volumes com hashes e mesmo após parar e remover os containers os volumes ficam armazenados, ficando difícil de identificar, caso seja necessário saber a qual container aquele volume pertenceu.

## Criar volumes manualmente

Permite utilizar drivers e labels customizados

```docker
docker volume create
```

## Definir um **bind mounting**

Só é permitido através do comando `container run`, não é permitido através do Dockerfile

```docker
docker container run -d --name nginx -p 80:80 -v ${pwd}:/usr/share/nginx/html nginx
```

**Observação:** a palavra chave `${pwd}` (print current directory) no windows 10 só funciona através do powershell.

## Exercícios

### Exercício 01

- Utilizando **Named Volumes**
- Efetuar o upgrade de database com containers.
- Criar um container do **postgres** com um volume nomeado **psql-data** usando a versão **9.6.1**.
- Utilizar o Docker Hub para conhecer onde o path do volume é criado por padrão e as versões que serão utilizadas.
- Verificar logs e parar o container.
- Criar um novo container do **postgres** com o mesmo volume nomeado utilizado anteriormente porém com a versão **9.6.2** do **postgres**.
- Verificar logs para validar o funcionamento

**Importante:** Este upgrade só irá funcionar corretamente entre versões patch (MAJOR.MINOR.PATCH), a maioria dos bancos de dados SQLs requerem comandos manuais para migrarem versões minor/major (limitação de banco de dados)

### Exercício 01: Resolução

```sh
docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1
docker container logs psql -f
docker volume ls
docker container run -d --name psql2 -v psql:/var/lib/postgresql/data postgres:9.6.2
```

Verificou-se que todo o processo de criação do banco não foi necessário na segunda etapa, pois estava utilizando um volume que já havia sido inicializado. upgrade ok!

___

### Exercício 02

- Utilizar **Bind Mounts**
- Usar Jekyll que é um gerador de site estatico para inicializar um web server local
- Não necessáriamente precisa ser um desenvolvedor web: este exemplo é uma ponte entre acesso à arquivo local e aplicativos rodando em containers
- Editar arquivos no computador host usando ferramentas como Visual Studio Code
- O container detecta estas alterações nos arquivos do host e atualiza o web server
- Utilizar imagem do bretfisher para servir jekyll

### Exercício 02: Resolução

```sh
docker run -p 80:4000 -v ${pwd}:/site bretfisher/jekyll-serve
```

- Atualizar o navegador e verificar o os posts do blog
- Criar novos arquivos em `_posts/` e verificar alterações no site

> [A aplicação pode ser encontrada em **volumes-jekyll-blog-posts**](samples/volumes-jekyll-blog-posts)

## Referências

- [Docker Docs - Docker Storage: manage data in Docker](https://docs.docker.com/storage/)
- [An introduction to immutable infrastructure](https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure)
- [The 12-Factor App (Everyone Should Read: Key to Cloud Native App Design, Deployment, and Operation)](https://12factor.net/)
- [12 Fractured Apps (A follow-up to 12-Factor, a great article on how to do 12F correctly in containers)](https://medium.com/@kelseyhightower/12-fractured-apps-1080c73d481c#.cjvkgw4b3)
