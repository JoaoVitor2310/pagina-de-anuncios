const express = require('express');
const app = express();
const connection = require('./database/database');
const categoriesController = require('./categories/CategoryController');
const productsController = require('./products/ProductsController');
const usersController = require('./users/UsersController');

const Category = require('./categories/Category');
const Product = require('./products/Product');
const User = require('./users/User');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'anything', cookie: {maxAge: 259200000}
}));
//O certo seria usar o Redis, mas nesse caso como é um projeto mais simples, vamos fazer com o meu computador msm

app.use(express.urlencoded({extended: false}));
app.use(express.json());

connection
    .authenticate()
    .then(() => {
        console.log('Conexão estabelecida com o banco de dados');
    }).catch(error => {
        console.log(error)
})

app.use('/', categoriesController);
app.use('/', productsController);
app.use('/', usersController);

app.get('/', (req,res) => {
    
    Product.findAll({
        order:[ ['id','DESC'] ],
        limit: 4
    }).then( products => {
        res.render('index', {products: products});
    });
});

app.listen(3000, () => {
    console.log('O servidor está online na porta 3000');
});