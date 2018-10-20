# Docker Network - Exercício 1

Utilizar containers para testar a ferramenta `curl` em diferentes ditribuições do linux.

Utilizar dois terminais para inicializar o bash no `centos:7` e `ubuntu:14.04` utilizando modo `-it`.

Utilizar `--rm` na criação do container para que quando finalizar seu ciclo de vida seja deletado.

Garantir que `curl` está instalado na última versão para cada distro:

**ubuntu**: `apt-get update && apt-get install curl`

**centos**: `yum update curl` e verificar a versão `curl version`

## Resolução

### CentOS 7

```docker
docker container run --rm --name centos -it centos:7 bash
```

_bash@root:_

```sh
yum update curl
curl --version ==> 7.29.0
```

### Ubuntu 14.04

```docker
docker container run --rm --name ubuntu -it ubuntu:14.04 bash
```

_bash@root:_

```sh
apt-get update && apt-get install curl
curl --version ==> 7.35.0
```