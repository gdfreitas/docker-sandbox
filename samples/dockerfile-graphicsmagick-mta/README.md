# MTA _Migrating Traditional Apps_

Este exemplo foi utilizado para praticar a migração de uma aplicação tradicional para containers

Esta aplicação de linha de comando efetua um scan no diretório `./in` e altera o nível de "preto" através de um processo chamado _Charkcoal_ utilizando a ferramenta GraphicsMagick e joga os arquivos atualizados num diretório `./out`

A aplicação requer Node.js v8.X

Os logs são gravados em arquivos em `./logs` através do módulo `winston`

É necessário ter os binários do GraphicsMagick instalados no container `apt-get install -y graphicsmagick`

A aplicação é inicializada a partir do `index.js`
