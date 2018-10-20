# Docker Network - Exercício 2

Aplicar o mecanismo de Round Robin utilizando Docker ao criar múltiplos containers que respondem à mesma rede. Criar 2 containers da imagem `elasticsearch:2`.

Utilizar o comando `--net-alias search` quando estiver criando para adicioná-los ao mesmo nome de DNS (lembrando que por padrão o Docker os coloca em uma rede do mesmo nome do container).

Executar a `alpine nslookup search` com o `--net` para verificar os dois containers com o mesmo nome de DNS. Executar `centos curl -s search:9200` com `--net` múltiplas vezes até que o campo "name" seja exibido duas vez seguidas o mesmo.

Ao fazer a requisição para o elastic search, ele devolve um json com uma propriedade "name" que é um nome aleatório gerado para cada instância do mesmo, semelhante à maneira que o Docker faz com o nome de containers. Efetuar as múltiplas requisições para verificar o balanceamento entre os 2 containers criados.

> Round Robin é um mecanismo de equilíbrio local de carga, usado pelos servidores DNS  para compartilhar e distribuir cargas entre dois ou mais servidores da rede. Entenda-se por carga de trabalho no servidor DNS, os pedidos para resolução de nomes, enviados através de consulta dos diversos clientes da rede (estações de trabalho e outros equipamentos ligados na rede). Por exemplo, pode ser utilizado para distribuir os acessos a um site de elevado volume de acessos entre dois ou mais servidores Web, os quais que contém exatamente o mesmo conteúdo. Em resumo, usando o Round robin, a um único nome DNS são associados dois ou mais endereços IP. A medida que as requisições vão chegando, o servidor DNS responde cada consulta com um dos endereços IP e depois faz uma reordenação da lista de endereços, para que na próxima requisição, um endereço IP diferente seja o primeiro da lista. Isso proporciona uma distribuição igualitária de carga entre os diversos servidores. [Júlio Battisti - Tutorial de TCP/IP](https://juliobattisti.com.br/artigos/windows/tcpip_p30.asp)

## Resolução

Criar rede:

```docker
docker network create dude
```

Criar container 1:

```docker
docker container run -d --net dude --net-alias search elasticsearch:2
```

Criar container 2:

```docker
docker container run -d --net dude --net-alias search elasticsearch:2
```

Criar container do alpine e executar o dns lookup com nome search:

```docker
docker container run --rm --net dude alpine nslookup search
```

Criar container do centos e executar curl:

```docker
docker container run --rm --net dude centos curl -s search:9200
```