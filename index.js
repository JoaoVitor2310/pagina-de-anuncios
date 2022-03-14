const express = require('express');
const app = express();

app.set('view engine', 'ejs');


app.get('/', (req,res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('O servidor está online na porta 3000');
});