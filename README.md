# Kontacts

<p>
Html | Css | JavaScript | React | Heroku <br><br>
Single page em React utilizando hooks personalizados e próprios do React, Bibliotecas, requisições assíncronas com uso de token, API de contexto, roteamento de páginas e responsividade.
</p>

Acesse no [site](https://dashboard.heroku.com/apps/front-crud-pnttel/)<br>

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)

<br>

```bash
#Fazer o fork do repositório para sua conta

#Executar git clone do seu fork no terminal para clonar o repositório
```

<br>

## Passos para montar o ambiente local

1. Instalar o Yarn

```sh
npm install -g Yarn
```

3. Instalar dependências:

```sh
yarn install
```


 4. 🔒 Environment

Por padrão, após a instalação das dependências a aplicação vem com um módulo de configuração que pode ler todas as variáveis ​​de ambiente do arquivo `.env`.
Utilizando de uma boa prática, a url da api que busca a cotação do dollar deve ser configurada como variável de ambiente. Então, você deve configurar a variável de ambiente com o valor da url base para pesquisa.

```bash
# Crie um arquivo .env usando de exemplo o arquivo .env.example
$ cp .env.example .env
```

| Key                       | Description                                                          | Default Value              |
| ------------------------- | -------------------------------------------------------------------- | -------------------------- |
| REACT_APP_BASE_URL        | URL BASE DA API DE COTAÇÃO                                           | https://exemplodeurl.com   |



5. Start da aplicação:

```sh
yarn start
```

6. Aplicação disponível em **http://localhost:3000**

###### tags: `JavaScript` `Html`  `Css`  `React`  `Heroku`