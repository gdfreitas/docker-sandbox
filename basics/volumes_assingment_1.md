# Docker Volumes - Exercício 1

## Named Volumes

- Upgrade de database com containers.
- Criar um container do **postgres** com um volume nomeado **psql-data** usando a versão **9.6.1**.
- Utilizar o Docker Hub para conhecer onde o path do volume é criado por padrão e as versões que serão utilizadas.
- Verificar logs e parar o container.
- Criar um novo container do **postgres** com o mesmo volume nomeado utilizado anteriormente porém com a versão **9.6.2** do **postgres**.
- Verificar logs para validar.

**Importante:** este upgrade só irá funcionar corretamente entre versões patch (MAJOR.MINOR.PATCH), a maioria dos bancos de dados SQLs requerem comandos manuais para migrarem versões minor/major (limitação de banco de dados)

## Resolução

```docker
docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1
docker container logs psql -f
docker volume ls
docker container run -d --name psql2 -v psql:/var/lib/postgresql/data postgres:9.6.2
```

Verificou-se que todo o processo de criação do banco não foi necessário na segunda etapa, pois estava utilizando um volume que já havia sido inicializado. upgrade ok!