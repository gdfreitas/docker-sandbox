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

## Run, Create e Apply

Kubernetes está sempre evoluindo, assim como a CLI.

Temos três maneiras de criar PODs através da CLI kutectl:

- `kubectl run` (está sendo alterada para ser somente criação de pods)
- `kubectl create` (cria alguns recursos através da CLI ou YAML)
- `kubectl apply` (cria e atualiza qualquer coisa através de YAML)

## Criando Pods com `kubectl`

- Verificar se está funcionando `kubectl version`
- Há duas maneiras de fazer deploy de Pods (containers): via CLI ou YAML

- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubectl for Docker Users](https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/)

### Via CLI

- `kubectl run my-nginx --image nginx` (ignorar warning de depreciação)
  - Na versão 1.14 este comando criou um `Deployment` que criou um `ReplicaSet` que então criou um `Pod` com um container do `nginx`
- `kubectl get pods` obter lista de pods (simular ao `docker service ls`)
- `kubectl get all` obtém todos os objetos
- `kubectl delete deployment my-nginx` limpar os objetos criados

#### Escalando número de réplicas

- `kubectl run my-apache --image httpd` cria um deployment de somente 1 replica/pod
- `kubectl scale deploy/my-apache --replicas 2` escala para 2 pods
  - `kubectl scale deployment my-apache --replicas 2` comando anterior por extenso (K8s permite esta flexibilização)
  - O objeto geralmente tem suas versões abreviadas, `deploy` = `deployment` = `deployments`

#### Inspecionando Objetos

- `kubectl logs deployment/my-apache` obtém os logs do pod
  - `kubectl logs deployment/my-apache --follow --tail 1` permite seguir novos logs a partir do último 1
- `kubectl logs -l run=my-apache` obter os logs de multiplos pods baseados em um `label` que o comando `run` aplicou
  - O filtro por label tem um limite de 5 pods devido à obtenção ser custosa
  - Para melhores abordagens de mullti-node logs olhar o [Stern: viewing at the CLI](https://github.com/wercker/stern)
- `kubectl describe pod/my-apache-xxxx-yyyy` obtém a descrição de um determinado pod, incluindo eventos

#### Teste de resiliêncie dos Pods

- `kubectl get pods -w` obter lista de pods com a flag de watch para observar alterações
- `kubectl delete pod/my-apache-xxxx-yyyy` deleta um pod
- Observar o Pod sendo recriado

## Expondo Portas do Kubernetes

- `kubectl expose` cria um **Service** para Pods existentes
- Um **Service** é um endereço para Pods, é necessário para conectar a Pods
- CoreDNS permite resolver services por nome
- Há diferentes tipos de services
  - **ClusterIP** (default) é único e irá obter IP virtual interno no cluster (visível somente de dentro do cluster por nodes e pods através de suas respectivas portas)
  - **NodePort** deve ser utilizado para external, aloca um _high port_ para cada node, a porta é aberta em todos os IPs do node
  - **LoadBalancer** é mais utilizado em cloud, que permite controlar um endpoint externo de load balancer para o cluster (ex: AWS ELB, etc)
  - **ExternalName** é usado para quando aplicacoes do cluster precisam acessar recurso externos, adiciona CNAME DNS para o CoreDNS

- [Service - Documentation](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Service Types - Tutorial](https://kubernetes.io/docs/tutorials/services/)

### Criando um service com ClusterIP

- `kubectl get pods -w` observar alterações
- `kubectl create deployment httpenv --image=bretfisher/httpenv` criar um servidor http utilizando código de exemplo
- `kubectl scale deployment httpenv --replicas=5` escalar 5 replicas para podermos ter mais de um container
- `kubectl expose deployment httpenv --port 8888` expor através de um service a porta 8888
- `kubectl get service` obter os services
- `kubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash` como o ClusterIP só é visível dentro do cluster, no Docker Desktop temos que rodar um outro pod para testar o `curl`
  - Após a criação do container, basta executar `curl httpenv:8888` e obter a resposta que são as variáveis de ambiente do container

- [Using Services - Tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/)

### Criando um service NodePort

- `kubectl expose deployment httpenv --port 8888 --name httpenv-np --type NodePort` expoe o NodePort para permitir acesso através do host IP

- Ao obter `kubectl get all` percebe-se a criação do NodePort, entretanto é importante dizer que a lógica de leitura das portas é o inverso do docker, ficando no caso `CONTAINER_PORT:HOST_PORT`

```log
NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/httpenv      ClusterIP   10.105.84.186   <none>        8888/TCP         9m27s
service/httpenv-np   NodePort    10.108.34.168   <none>        8888:30079/TCP   60s
service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          94m
```

- No log acima entõa no NodePort temos no host a porta 30079 exposta, do intervalo permitido (`30000-32767`) por serem portas altas, evitam conflitos.

- Os serviços abaixo são _aditivos_ e cada tipo de serviço cria o serviço acima
  - ClusterIP
  - NodePort
  - LoadBalancer

- [NodePort - Documentation](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport)

### Criando um service LoadBalancer

- `kubectl expose deployment httpenv --port 8888 --name httpenv-lb --type LoadBalancer` criar o load balancer
- `curl localhost:8888` na maquina host para testar o loadbalancer
- `kubectl delete service/httpenv service/httpenv-np service/httpenv-lb deployment/httpenv` cleanup

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
