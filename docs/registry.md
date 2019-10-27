# Docker Registry

Uma repositório (registry) de imagens deve fazer parte do seu plano de containers.

Além do Docker Hub, exitem outras inumeras opções, como [podem ser vistas aqui](https://github.com/veggiemonk/awesome-docker#registry)

## [Docker Hub](https://hub.docker.com)

- É o mais popular repositório público de imagens docker
- Também contém processo de image building, o que não faz parte de um registry
- Vincula contas do GitHub e BitBucket para realizar auto-build de images automatizados via CI através de web hooks nos commits
- Permissionamentos, organizações, etc

### Rodando Registry Local

- Permite gerenciar seu próprio image registry
- É parte do docker/distribution no Github
- Não possui todas as features do Hub e outros, não possui web UI, é somente o básico de autenticação
- Em seu core, é uma web API e um storage system, e é escrito na linguagem Go, assim como Docker
- Para storage suporta local, s3, azure, alibaba, google cloud e openstack swift.
- Roda por padrão como uma web api na porta 5000
- Basta utilizar o comando `docker container run -d -p 5000:5000 --name registry -v $(pwd)/registry-data:/var/lib/registry registry`
- Para fazer o push de imagens, deve ser utilizado a tag do repositório, para isto, iremos baixar a imagem hello-world para utilizar de exemplo `docker pull hello-world`
- Para criar a tag `docker tag hello-world 127.0.0.1:5000/hello-world`
- `docker push 127.0.0.1:5000/hello-world`
