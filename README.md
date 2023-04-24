# 🚀 Coffee Delivery API

Este é um projeto ao estilo e-commerce o qual tem por fim por em pratica a utilização de toda bagagem adquirida ao decorrer do curso de front end e do curso de back end da Rocketseat. onde criei uma API para armazenar usuários, cafés e compras, além de ter criado um sistema de email para notificar um novo usuário e para recuperar senha.

## 📒 Aprendizados

- Utilização de Typescript em todo o projeto
- Aplicação de um sistema de autenticação com e-mail e senha
- Envio de e-mail automático para recuperação de conta
- Configuração da AWS ( S3 e EC2 )
- Configuração do dominio pela Google 
- Manejo de variáveis ambiente para produção e desenvolvimento

## 🔨 Ferramentas

- Node.Js
- Express
- Typescript
- AWS (Banco de dados e servidor da API)
- Git e GitHub

## 📁 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs](https://nodejs.org/en/), [Docker](https://www.docker.com) e [Docker Compose](https://docs.docker.com/compose/install/)  Instalado em seu computador.

### 🌀 Clonando o repositório
```
# Clone este repositório
$ git clone https://github.com/ViniOliver01/coffee-delivery-api

```
### ▶️ Rodando a Aplicação

```
# Instale as dependências
$ yarn install ou npm install

# Montando o banco de dados pelo docker-compose
$ docker-compose up -d

# Rodando as migrations do typeorm
$ yarn typeorm migration:run ou npm run typeorm migration:run

# Execute o expo
$ yarn dev ou npm run dev

```
## 🧑 Autor

<h4>Vinicius de Oliveira</h4>
  <a href="mailto:vinioliver.dev@gmail.com?" target="blank"><img align="center" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt=""/></a>
    <a href="https://www.linkedin.com/in/vinioliver01" target="blank"><img align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="https://www.linkedin.com/in/vinioliver01"/></a>
    <a href="https://wa.me/5515996990748" target="blank"><img align="center" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="+55 15 996990748"/></a>
    <a href="https://github.com/ViniOliver01" target="_blank"><img align="center" src="https://img.shields.io/badge/github.io-gray?style=for-the-badge&logo=github&logoColor=white" ></a>
