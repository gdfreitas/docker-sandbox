# Docker Containers - Exercício 1

Subir 03 containers em modos deatch e nomeados apropriadamente.

- **nginx** na porta 80:80
- **mysql** 3306:3306
- **httpd** 8080:80

Ao criar o container do **mysql** deve ser usado deve ser definido a variável de ambiente **MYSQL_RANDOM_ROOT_PASSOWORD** com o valor **yes**

Usar o `docker container logs` no container do mysql para achar a senha aleatória que foi gerada na inicialização do **mysql**

## Resolução

Lembrando: `-d` é `--detach`, `-p` é `--publish`, `-e` é `--env`

```docker
docker container run -d --name db -p 3306:3306  -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker container run -d --name webserver -p 8080:80 httpd
docker container run -d --name proxy -p 80:80 nginx
```