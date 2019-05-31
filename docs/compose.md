# Docker Compose

## [Documentation](https://docs.docker.com/compose/compose-file/#dockerfile)

## Para que serve

- Configurar relacionamento entre containers;
- Salvar configuração de container docker em um arquivo de fácil leitura;
- Criar ambientes de desenvolvimentos de fácil e rápido inicialização;
- Composto por 2 formas relacionadas:
  - Arquivo YAML que descreve uma solução para containers, networks, volumes.
  - CLI tool `docker-compose` utilizada para local dev/test automation a partir dos arquivos YAML.

### YAML

- Possui suas próprias versões: 1, 2, 2.1, 3, 3.1
- Pode ser utilizada com o comando `docker-compose` em ambientes locais e de testes
- E também pode ser utilizado diretamente com o `docker` em produção com Swarm (v1.13)
- Por padrão o nome do arquivo é `docker-compose.yml`, porém pode ser nomeado de qualquer maneira é somente utilizar o `-f` no comando para especificar o arquivo que será utilizado.

### `docker-compose` [reference](https://docs.docker.com/compose/reference/)

- **Não é uma ferramenta para produção**, é utilizada somente em ambientes dev e test;
- Os comandos mais utilizados são:
  - `docker compose up` configura volumes/redes e inicaliza todos os containers
  - `docker compose down` para todos os containers e remove containers/volumes/redes
    - `-v`, `--volumes` remove automaticamente todos os *named volumes*
    - `-t`, `--timeout` permite especificar um tempo de timeout para executar o shutdown _(Default: 10)_
    - `--rmi all/local` permite remover todas as imagens utilizadas por qualquer serviço / remover somente imagens que não possuem nenhuma tag customizada pelo campo _image_
- Permite adicionar configuração de build da imagem;
