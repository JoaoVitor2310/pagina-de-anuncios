const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('../categories/Category');

router.get('/products', (req,res) => {
    res.send('Rota de produtos');
});

router.get('/admin/products/new', (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/products/newProduct', {categories: categories});
    })
});

module.exports = router;