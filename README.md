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
-Responsável por retornar todos os produtos cadastrados no banco de dados. Respostas: json com produtos OU erro 404 não encontrado.

### GET /categories
-Responsável por retornar todas as categorias cadastradas no banco de dados. Respostas: json com categorias OU erro 404 não encontrado.

### GET /product/ + ID
-Responsável por retornar um produto específico através do ID. Respostas: json do produto OU erro 400 sintaxe errada OU erro 404 não encontrado.

### POST /auth
-Responsável logar um usuário, que já deve ter sido criado antes no sistema pelo login normal. Respostas: mensagem de login com sucesso e o token de autenticação OU erro 400 sintaxe errada OU erro 401 falha interna OU 401 credenciais inválidas OU 404 não encontrado

### POST /product
-Responsável por cadastrar um produto no banco de dados. Nesse endpoint, o usuário deve estar logado enviar no corpo. Respostas: OK status 200 OU erro 404 não encontrado OU erro 400 sintase incorreta.

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
