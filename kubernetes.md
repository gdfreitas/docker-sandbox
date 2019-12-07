# Kubernetes (K8s)

É o orquestrador de containers mais popular atualmente. Foi lançado em 2015 pelo Google e atualmente é mantido por uma comunidade Open-Source onde a Google participa.

Assim como o Docker Swarm, um orquestador é responsável por orquestrar a distribuição de cargas de trabalho _(containers)_ em um conjunto de servidores _(nodes)_.

Orquestradores provêm um conjunto de recursos via APIs ou CLIs para efetuar o gerenciamento dos containers através dos servidores.

O K8s em si não é restrito ao runtime do Docker para containers (apesar de padrão), mas permite atuar também com outros containers runtime como o [_containerd_](https://containerd.io/) e _[cri-o](https://cri-o.io/)_

`kubectl` - _"cube control"_ é a CLI para lidar com o Kubernetes

Muitas Clouds fornecem o Kubernetes como serviço, fornecendo acesso às APIs ou GUIs para fazer o gerenciamento, algumas ainda fazem distribuições de suas próprias versões com suas ferramentas em conjunto.

## Por que utilizar K8s

- Primeiramente é necessário saber o porque precisa-se de orquestração, nem toda solução necessita
- Uma formula simples é `Benefício da orquestração = Número servidores + Frequência alterações`
  - Ou seja, quanto maior o número de servidores e maior a frequência de alterações maior o benefício da orquestração
- E então deve-se decidir qual orquestrador utilizar, as duas mais famosas plataformas de orquestração são Docker Swarm e Kubernetes pois rodam em qualquer cloud, data centers, e até possívelmente em ambientes menores como IoTs
- Se decidir por Kubernetes, é necessário então decidir qual distribuição
  - Cloud ou _self-managed_ (Docker Enterprise, Rancher, OpenShift, Canonical, VMWare PKS)
  - O ideal é optar por algum da [Kubernetes Certified Distributions](https://kubernetes.io/partners/#conformance) pois o `.yaml` que define a infraestrutura será o máximo compatível entre estas distribuições caso haja o desejo de mudar.
- Uma diferença entre K8s e Swarm é que para o K8s é necessário algumas ferramentas para facilitar o uso (Ex: soluções de autenticação, admnistração web, etc)
  - Sendo assim raramente será utilizado o K8s puro direto do repositório, geralmente será optado por alguma distribuição

- [Kubernetes Home Page](https://kubernetes.io/)
- [History of Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)

## Kubernetes ou Swarm

- Kubernetes e Swarm são ambos orquestradores de containers
- Ambos possuem plataformas sólidas com apoio de seus fornecedores

### Swarm

- É obtido em conjunto com o Docker, sendo uma plataforma única de containers
- É fácil de efetuar deploy e gerenciar
- Segue a regra do 80/20. Possuindo 20% das funcionalidades do Kubernetes, atendendo a 80% dos casos de uso
- Roda em qualquer lugar que o Docker rode (local, cloud, datacenter, ARM devices [IoT, embedded, raspberry pi], windows, 32-bit, etc)
- Seguro por padrão (TLS, encrypts database secrets, etc)
- É mais fácil de entender caso passe por problemas, devido a conter menos componentes entre as partes

### Kubernetes

- Possui muito mais funcionalidades e cobre maior casos de usos
- Possui maior suporte das Clouds atualmente para deploy/management
- Companhias de infraestrutura também estão fazendo suas distribuições, como VMWAre, Red Hat, etc
- Possui maior adoção e suporte da comunidade
- _"Kubernetes first"_ suporte de fornecedores como Jenkins da CloudBeeds

## Terminologia Básica

- **Kubernetes** é todo o sistema de orquestração, também chamado de **K8s** _(k-eights)_ ou _Kube_
- **Kubectl** é a CLI para se comunicar com o Kubenetes e gerenciar os apps, também chamado de **kube control**
- **Node** é um único server de um cluster Kubernetes (assim como no Swarm)
- **Kubelet** é um container que irá rodar um pequeno agente em cada node para permitir que o node consiga se comunicar com o master do Kubernetes.
  - Lembrando que o Swarm não precisa desse agente devido a comunicação já estar embutida no Docker
- **Control Plane** as vezes também chamado de _Master_, é o responsável por gerenciar o cluster, figura similar ao Manager do Swarm.
  - Inclui API server, scheduler, controller manager, etcd (similar ao RAFT do swarm para key-value), core dns, entre outros

- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/#master-components)

## Instalação

- Há diversas maneiras de instalar, iremos focar na mais fácil para aprendizagem
- **Docker Desktop**: habilitar no menu _Settings > Kubernetes_
  - Configura tudo que for necessário dentro da Linux VM existente no Docker
- **Docker Toolbox on Windows** instalar o [MiniKube](https://github.com/kubernetes/minikube/releases/)
  - Utiliza VirtualBox para criar a Linux VM
- **Linux Host ou VM** instalar [MicroK8s](https://github.com/ubuntu/microk8s)
  - Instala o K8s diretamente no sistema operacional
  - Dica, criar o alias no shell `.bash_profile` > `alias kubectl=microk8s.kubectl`
- **Kubernetes in a Browser**: assim como tem o _play-with-moby_ para o Docker, temos o [`http://play-with-k8s.com`](http://play-with-k8s.com) e o [`http://katacoda.com`](https://www.katacoda.com/courses/kubernetes/playground)

## Kubernetes Container Abstractions

- [**Pod**](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) significa um ou mais containers rodando junto em um único **_Node_**
  - É a unidade mais básica de um _deployment_, containers sempre estão dentro de pods
- **Controller** é utilizado para criar ou atualizar pods e outros objetos
  - Possui um monte de tipos, **Deployment**, **ReplicaSet**, **StatefulSet**, **DaemonSet**, **Job**, **CronJob**, etc
- [**Service**](https://kubernetes.io/docs/concepts/services-networking/service/) é um endpoint da rede que permite conexão com um cluster/pod
- [**Namespace**](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) grupos para permitir agrupar e filtrar objetos de um cluster

## Kubernetes Run, Create e Apply

Kubernetes está sempre evoluindo, assim como a CLI.

Temos três maneiras de criar PODs através da CLI kutectl:

- `kubectl run` (algumas features estão sendo depreciadas para ser utilizado somente em criação de pods)
- `kubectl create` (cria alguns recursos através da CLI ou YAML)
- `kubectl apply` (cria ou atualiza qualquer coisa através de YAML)

## Criando Pods com `kubectl`

- Verificar se está funcionando `kubectl version`
- Há duas maneiras de fazer deploy de Pods (containers): via CLI ou YAML
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubectl for Docker Users](https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/)

### Via CLI

- `kubectl run my-nginx --image nginx` _(ignorar warning de depreciação)_
  - Na versão 1.14 este comando criou um `Deployment controller` que criou um `ReplicaSet controller` que então criou os `Pods`, que no caso é uma única replica do `nginx`
- `kubectl get pods` obter lista de pods (simular ao `docker service ls`)
- `kubectl get all` obtém todos os objetos
- `kubectl delete deployment my-nginx` limpar os objetos criados

## Escalando ReplicaSets

- `kubectl run my-apache --image httpd` cria um deployment de somente 1 replica/pod
- `kubectl scale deploy/my-apache --replicas 2` escala para 2 pods
  - Há diferentes sintaxes no comando acima, podendo ser executado também assim: `kubectl scale deployment my-apache --replicas 2`
  - O objeto geralmente tem suas versões abreviadas, `deploy` = `deployment` = `deployments`

O que aconteceu quando utilizamos o comando `scale`?

1. A `spec` de `Deployment` foi atualizada para 2 replicas
1. O `ReplicaSet` controller atualizou a quantidade de pods para 2
1. O `Control Plane` atribuiu um `node` para o novo pod
1. O `Kubelet` viu que um pod era necessário e startou o container naquele node

### Inspecionando _Deployment Objects_

- `kubectl get pods` obtém lista dos pods
  - a flag `-w` pode ser utilizada para ter uma experiência de `watch`, atualizando em alguns segundos

#### Log

Este comando obtém os logs de pods

- `kubectl logs deployment/my-apache` por padrão irá descrever a quantidade de pods que achou para o _name_, mas irá mostrar os logs de somente 1 _(diferente do Swarm)_
- `kubectl logs deployment/my-apache --follow --tail 1` permite seguir novos logs a partir do último 1
- `kubectl logs -l run=my-apache` obter os logs de multiplos pods baseados em um `selector`, neste caso um `label` que todos os pods possuem aplicado através do comando `run`
  - O filtro por label tem um limite de 5 pods devido à obtenção de logs de múltiplos `nodes` ser custosa
  - Para melhores abordagens de mullti-node logs olhar o [**Stern: Multi pod and container log tailing for Kubernetes**](https://github.com/wercker/stern)

#### Describe

Este comando obtém uma série de informações sobre o pod como: labels, IP, namespace, nodes, horário de início, lista de eventos, etc. É simular ao comando `inspect` do Swarm

- `kubectl describe pod/my-apache-xxxx-yyyy` obter de um determinado pod_name
- `kubectl describe pods` obter de todos os pods

### Resiliência de pods

- `kubectl get pods -w` observar lista de pods
- `kubectl delete pod/my-apache-xxxx-yyyy` deletar um pod específico e observar a orquestração que irá recriá-lo

## Expondo Portas do Kubernetes através de services

- `kubectl expose` cria um **Service** para Pods existentes
- Um **Service** é um endereço persistente para Pods permitindo então um acesso externo
- CoreDNS permite resolver **Services** por nome
- E para gerênciar o tráfego, (obter IP, porta, etc) há diferentes tipos de **Services**
  - **ClusterIP** (default) É utilizado para comunicação interna do cluster, onde aloca um IP virtual, sendo então visível somente de dentro do cluster por Nodes e Pods através de suas respectivas portas.
  - **NodePort** É utilizado para acessos externos ao cluster, aloca um _high port_ para cada node, a porta é aberta em todos os IPs do node
  - **LoadBalancer** É mais utilizado em Clouds, sendo em sua essência automação para criar um services NodePort+ClusterIP, permitindo controlar um endpoint externo de Load Balancer para gerênciar o tráfego que chega no Cluster. Requer um provedor de infraestrutura (Ex: AWS ELB, etc)
  - **ExternalName** É usado para quando aplicações do Cluster precisam acessar recurso externos. Não é utilizado por Pods, mas sim para dar a Pods DNS Names de algum recurso externo ao Kubernetes.

- [Service - Documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Service Types - Tutorial](https://kubernetes.io/docs/tutorials/services/)

### Criando um Service com ClusterIP

Executar o comando abaixo em um terminal separado para observar as alterações

```sh
kubectl get pods -w
```

Criar um deployment de uma imagem que retorna as variáveis de ambiente do host ao acessar via CURL

```sh
kubectl create deployment httpenv --image=bretfisher/httpenv
```

Escalar 5 replicas para podermos ter mais de um container

```sh
kubectl scale deployment httpenv --replicas=5
```

Expor através de um Service a porta `8888`

```sh
kubectl expose deployment httpenv --port 8888
```

Obter lista de services e verificar a criação do novo Service do tipo ClusterIP expondo 8888/TCP

```sh
kubectl get service
```

#### Testar via Docker Desktop

Como o ClusterIP é visível somente dentro do Cluster e ao utilizar o Docker Desktop, a maquina host não têm acesso direto ao cluster que estará rodando numa Linux VM, então é necessáriorodar um outro pod para testar o `curl`

```sh
kubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash
```

Após a criação do container, basta executar o curl abaixo e obter a resposta que são as variáveis de ambiente do container

```bash
curl httpenv:8888
```

#### Testar via Linux host

No linux, a maquina que estiver rodando o Kubernetes terá acesso a todos os recursos normalmente, basta executar o curl

```sh
curl CLUSTER_IP:8888 # Obter através do "kubectl get service"
```

- [Using Services - Tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/)

### Criando um Service NodePort

Continuando o exemplo acima, expor o NodePort para permitir acesso através do host IP

```sh
kubectl expose deployment httpenv --port 8888 --name httpenv-np --type NodePort
```

Obter a lista de objetos para verificar a criação do NodePort

```sh
kubectl get all
```

**Importante** A lógica de interpretação das portas é o inverso do Docker, ficando no caso `CONTAINER_PORT:HOST_PORT`

```log
NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/httpenv      ClusterIP   10.105.84.186   <none>        8888/TCP         9m27s
service/httpenv-np   NodePort    10.108.34.168   <none>        8888:30079/TCP   60s
service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          94m
```

Percebe-se através do log acima que o NodePort está na _high port_ 30079 do host (do intervalo permitido de `30000` até `32767`)

Para testar no Docker Desktop basta acessar `http://localhost:30079`

Os serviços abaixo podem ser interpretados como _aditivos_ e cada tipo de serviço cria o serviço acima

- ClusterIP
- NodePort (+ClusterIP)
- LoadBalancer (+NodePort+ClusterIP)

- [NodePort - Documentation](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport)

### Criando um service LoadBalancer

Continuando o exemplo acima, se estiver no Docker Destkop, o qual provê um LoadBalancer embutido, podemos testá-lo (não é possível no `kubeadm`, `minikube` ou `microk8s`)

```sh
kubectl expose deployment httpenv --port 8888 --name httpenv-lb --type LoadBalancer
```

Executar `curl` na maquina host para testar o LoadBalancer

```sh
curl localhost:8888
```

Efetuar a limpeza

```sh
kubectl delete service/httpenv service/httpenv-np service/httpenv-lb deployment/httpenv
```

### Kubernetes Services DNS

- Começando com 1.11, DNS interno é provisionado pelo CoreDNS
- Assim como no Swarm, é um _DNS-Based Service Discovery_
- Até então estamos utilizando hostnames para acessar os Services Ex: `curl <hostname>`
- Mas isso só funciona com Services dentro do mesmo Namespace `kubectl get namespaces`
- Services tambem posuem os FQDN (Fully Qualified Domain Name) `curl <hostname>.<namespace>.svc.cluster.local`
  - `svc` significa service

- [Kubernetes DNS Specification](https://github.com/kubernetes/dns/blob/master/docs/specification.md)
- [CoreDNS for Kubernetes](https://www.coredns.io/plugins/kubernetes/)

## Técnicas para Gerenciamento

- Os comandos que utilizamos via CLI (run, create, expose) fazem o uso de _helper templates_ chamados de _"generators"_
- Esses templates possuem propriedades padrões para facilitar a execução via CLI, para não termos que preenche-los
- Todo recurso do Kubernetes possui uma _specification_, também chamado de _"spec"_
- Podemos obter a saída destes templates através da flag `--dry-run -o yaml`
- `kubectl create deployment sample --image nginx --dry-run -o yaml`

```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    creationTimestamp: null
    labels:
      app: sample
    name: sample
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: sample
    strategy: {}
    template:
      metadata:
        creationTimestamp: null
        labels:
          app: sample
      spec:
        containers:
        - image: nginx
          name: nginx
          resources: {}
  status: {}
  ```

- `kubectl create job sample --image nginx --dry-run -o yaml`

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  creationTimestamp: null
  name: sample
spec:
  template:
    metadata:
      creationTimestamp: null
    spec:
      containers:
      - image: nginx
        name: sample
        resources: {}
      restartPolicy: Never
status: {}
```

- Também podemos testar com o expose
- `kubectl create deploy test --image nginx` criar um deployment
- `kubectl expose deploy test --port 80 --dry-run -o yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: test
  name: test
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: test
status:
  loadBalancer: {}
```

- `kubectl delete deploy test` apagar o deployment

- [kubectl Usage Convenctions - Documentation](https://kubernetes.io/docs/reference/kubectl/conventions/)

## O futuro do kubectl run

- [Kubectl Usage Best Practices - Documentation](https://kubernetes.io/docs/reference/kubectl/conventions/#best-practices)
