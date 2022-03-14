const express = require('express');
const app = express();
const connection = require('./database/database');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

connection
.authenticate()
.then( () => {
    console.log('Conexão estabelecida com o banco de dados');
}).catch(error => {
    console.log(error)
})

app.get('/', (req,res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('O servidor está online na porta 3000');
});