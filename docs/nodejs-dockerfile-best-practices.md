# Dockerfile - Best Practices for Node.js

- Utilizar o `COPY` em vez do `ADD`

> O `ADD` tem outras funções como baixar coisas da Internet, untar, deszipar, etc

- Não é necessário instalar o `npm` ou `yarn` é recomendado utilizar as versões dos mesmos que vêm empactadas junto com a imagem do Node que estiver utilizando, em casos extremos caso seja necessário uma versão específica, deve-se instalar através do build do Dockerfile.

- Utilizar `node` no `CMD` do Dockerfile, por algumas razões, ao utilizar o clássico `npm start`, isso irá inicializar o node como um subprocesso do npm, adicionando complexidade e camadas desnessárias ao programa. Dockerfiles devem representar exatamente o que irá acontecer, sem necessiamente dependender do conhecimento do script do npm para conhecer que tipo de processo será inicializado. Há cenários em que o processo do npm não repassa corretamente os signals de um kill por exemplo para o subprocesso do Node.

- Sempre priorizar o uso do `WORKDIR` (criar [se não existir] e acessar) em vez do `RUN mkdir XXX`, exceto quando for necessário determinar permissões através do `chown`

- Priorizar versões pares da imagem do Node.js, visto que representam major releases / LTS (Long Term Support), versões ímpares tendem à serem designadas à versões de release/experimental [Node.js Release Schedule](https://github.com/nodejs/Release#release-schedule)
- Não utilizar a tag `:latest`
- Priorizar início de uso com imagens `:debian` visto que todas as imagens por padrão usam a do debian como imagem base e aos poucos migrando para `:alpine`, sendo que em grandes apps o Alpine pode não possuir alguma dependência necessária para o projeto. Evitar utilizar imagens `:slim` e `:onbuild`