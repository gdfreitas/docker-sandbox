# Kubernetes (K8s)

É o orquestrador de containers mais popular atualmente. Foi lançado em 2015 pelo Google e atualmente é mantido por uma comunidade Open-Source onde a Google participa.

Assim como o Docker Swarm, um orquestador é responsável por orquestrar a distribuição de cargas de trabalho _(containers)_ em um conjunto de servidores _(nodes)_.

Orquestradores provêm um conjunto de recursos via APIs ou CLIs para efetuar o gerenciamento dos containers através dos servidores.

O K8s em si não é restrito ao runtime do Docker para containers (apesar de padrão), mas permite atuar também com outros containers runtime como o [_containerd_](https://containerd.io/) e _[cri-o]_(https://cri-o.io/)

`kubectl` - _"cube control"_ é a CLI para lidar com o Kubernetes

Muitas Clouds fornecem o Kubernetes como serviço, fornecendo acesso às APIs ou GUIs para fazer o gerenciamento, algumas ainda fazem distribuições de suas próprias versões com suas ferramentas junto.

## Por que utilizar K8s

- Primeiramente é necessário saber o porque precisa-se de orquestração
- Nem toda solução necessita de orquestração
- Uma formula simples é `Número servidores + Frequência alterações = Benefício da orquestração`
  - Ou seja, quanto maior o número de servidores e maior a frequência de alterações maior o benefício da orquestração
- E então deve-se decidir qual orquestrador utilizar, as duas mais famosas plataformas de orquestração são Docker Swarm e Kubernetes pois rodam em qualquer cloud, data centers, e até possívelmente em ambientes menores como IoTs
- Se decidir por Kubernetes, é necessário então decidir qual distribuição
  - Cloud ou _self-managed_ (Docker Enterprise, Rancher, OpenShift, Canonical, VMWare PKS)
  - O ideal é optar por algum da [Kubernetes Certified Distributions](https://kubernetes.io/partners/#conformance) pois o `.yaml` que define a infraestrutura será o máximo compatível entre estas distribuições caso haja o desejo de mudar.
- Uma diferença entre K8s e Swarm é que para o K8s é necessário algumas ferramentas em conjunto de ferramentas para facilitar o uso (Ex: soluções de autenticação, admnistração web, etc)
  - Sendo assim raramente será utilizado o K8s puro direto do repositório, geralmente será optado por alguma distribuição

- [Kubernetes Home Page](https://kubernetes.io/)
- [History of Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)

## Kubernetes ou Swarm

- Kubernetes e Swarm são ambos orquestradores de containers
- Ambos possuem plataformas sólidas com apoio de seus fornecedores

- Swarm:
  - É obtido em conjunto com o Docker, sendo uma plataforma única de containers
  - É fácil de efetuar deploy e gerenciar
  - Segue a regra do 80/20. Possuindo 20% das funcionalidades do Kubernetes, atendendo a 80% dos casos de uso
  - Roda em qualquer lugar que o Docker rode (local, cloud, datacenter, ARM devices (IoT, embedded, rasperybi), windows, 32-bit)
  - Seguro por padrão (TLS, encrypts database secrets, etc)
  - É mais fácil de entender caso passe por problemas, devido a conter menos componentes entre as partes.

- Kubernetes:
  - Possui muito mais funcionalidades e cobre maior casos de usos
  - Possui maior suporte das Clouds atualmente para deploy/manage
  - Companhias de infraestrutura também estão fazendo suas distribuições, como VMWAre, Red Hat, etc
  - Possui maior adoção e suporte da comunidade
  - _"Kubernetes first"_ suporte de fornecedores como Jenkins da CloudBeeds

## Terminologia Básica

- **Kubernetes** é todo o sistema de orquestração, também chamado de **K8s** _(k-eights)_ ou _Kube_
- **Kubectl** é a CLI para se comunicar com o Kubenetes e gerenciar os apps, também chamado de **kube control**
- **Node** é um único server de um cluster Kubernetes (assim como no Swarm)
- **Kubelet** é um container que irá rodar um pequeno agente em cada node para permitir que o node consiga se comunicar com o master do Kubernetes.
  - Lembrando que o Swarm não precisa deste agente devido a comunicação já estar embutida no Docker
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
- **Kubernetes in a Browser**: assim como tem o _play-with-moby_ para o Docker, temos o [`http://play-with-k8s.com`](http://play-with-k8s.com) e o [`http://katacoda.com`](https://www.katacoda.com/courses/kubernetes/playground)
