# pagina-de-anuncios

## Introdução: Bem vindo ao projeto de uma página de anuncios, nele eu fiz o frontend bem básico para poder focar no backend, pois me identifico mais do que o front, e então com alguns conhecimentos aprendidos resolvi criar esse projeto.

### Descrição: Página de anúncios com CRUD completo, podendo:
-Criar usuários com email e senha protegida com hash.
-Criar novas categorias de produtos
-Cadastrar, ler, atualizar e deletar produtos.  

### Objetivo: Exercitar os conhecimentos do backend:
-Node: com rotas, middlewares e autenticação para o sistema de login com BCRYPT e JWT.
-Banco de dados, com o MySQL através do Sequelize.
-API: Criação de uma API com os dados do banco de dados e chegar ao RESTFUL
-O frontend foi feito com Bootstrap para ficar simples, TinyMCE para edição do texto e EJS para as views.  

### Conclusão: 
-Adicionar novas funcionalidades seria interessante, como carrinho de compras, mas não é o objetivo.
-Consegui aprender bastante sobre essas tecnologias, e pretendo continuar evoluindo. 

GIF

## Link: https://pagina-de-anuncios.herokuapp.com/ 

#Documentação APi:

##Endpoints(todos possuem um prefixo: http://pagina-de-anuncios.herokuapp.com/api):
### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados. 
Respostas:  
-JSON com produtos  
-Erro 404 não encontrado.

### GET /categories
-Responsável por retornar todas as categorias cadastradas no banco de dados.  
Respostas:  
-JSON com categorias  
-Erro 404 não encontrado.

### GET /product/ + ID
-Responsável por retornar um produto específico através do ID. O id deve ser mandado direto na URL.  
Respostas:  
-JSON do produto e links de interação  
-Erro 400 sintaxe errada  
-Erro 404 não encontrado.

### GET /product/ + ID
-Responsável por retornar uma categoria específica através do ID. O id deve ser mandado direto na URL.  
Respostas:  
-JSON da categoria e links de interação  
-Erro 400 sintaxe errada  
-Erro 404 não encontrado.  

### POST /auth
-Responsável por logar um usuário por 4 horas na API, que já deve ter sido criado antes no sistema pelo login normal. O usuário deve mandar um JSON com o email e senha no corpo como no exemplo a seguir:
 ```
{
    "email": "joaovitormatosgouveia@gmail.com",
    "password": "senha"
}
```
Respostas:  
-Mensagem de login com sucesso e o token de autenticação, que deve ser armazenado(localStorage) para conseguir fazer as interações a seguir. 
-Erro 400 sintaxe errada.  
-Erro 401 falha interna.
-Erro 401 credenciais inválidas.  
-Erro 404 não encontrado.

### POST /product
-Responsável por cadastrar um novo produto no banco de dados, o usuário precisa estar logado, e enviar os dados como no exemplo a seguir:
 ```
{
    "title": "Microondas",
    "description": "Usado por 1 ano",
    "price": 300,
    "categoryId": 2
}

```
Respostas:  
-Mensagem de login com sucesso e o token de autenticação, que deve ser armazenado(localStorage) para conseguir fazer as interações a seguir. 
-Erro 400 sintaxe errada.  
-Erro 401 falha interna.
-Erro 401 credenciais inválidas.  
-Erro 404 não encontrado.

### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados

### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados

### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados

### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados

### GET /products
-Responsável por retornar todos os produtos cadastrados no banco de dados
