const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('../categories/Category');
const Product = require('./Product');

router.get('/products', (req,res) => {
    Product.findAll({
        include: [{model: Category}]
    }).then( products => {
        res.render('admin/products/products', {products: products});
    });
});

router.get('/admin/products/new', (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/products/newProduct', {categories: categories});
    })
});

router.post('/products/save', (req,res) => {
    let title = req.body.title;
    //let photo = req.body.photo;
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;

    Product.create({
        title: title,
        slug: slugify(title),
        // photo: photo,
        description: description,
        price: price,
        categoryId: category
    }).then( () => {
        res.redirect('/products');
    });
});

router.get('/product/:slug', (req,res) => {
    let slug = req.params.slug;
    Product.findOne({where:{
        slug: slug
    }}).then( product => {
        if(product != undefined){
            Category.findAll().then(categories => {
                res.render('productPage', {product: product, categories: categories});
            });
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;