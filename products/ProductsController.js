const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('../categories/Category');
const Product = require('./Product');
const adminAuth = require('../middlewares/adminAuth');

router.get('/products/page/:num', (req,res) => {
    let page = req.params.num;
    let offset;
    if(page == isNaN || page == 1){
        offset = 0;
    }else{
        offset = (Number(page) - 1) * 4;
    }
    Product.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
        //include: [{model: Category}]
    }).then( products => {
        let next;
        if(offset + 4 >= products.count){
            next = false;
        }else{
            next = true;
        }
        let result = {
            page: Number(page),
            next: next,
            products: products
        }
        // if(Number(page) == 0 || Number(page) ==1 ){
        //     res.render('index', {products: products});
        // }
        Category.findAll().then(categories => {
            res.render('admin/products/pageProducts', {result: result, categories: categories, user: req.session.user});
        });
    });
});

router.get('/admin/products/new', (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/products/newProduct', {categories: categories, user: req.session.user});
    })
});

router.get('/admin/products', adminAuth, (req,res) =>{
    Product.findAll({
        include: [{model: Category}]
    }).then(products => {
        res.render('admin/products/products', {products: products, user: req.session.user});
    });
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
        res.redirect('/products', {user: req.session.user});
    });
});

router.get('/product/:slug', (req,res) => {
    let slug = req.params.slug;
    Product.findOne({where:{
        slug: slug
    }}).then( product => {
        if(product != undefined){
            Category.findAll().then(categories => {
                res.render('productPage', {product: product, categories: categories, user: req.session.user});
            });
        }else{
            res.redirect('/');
        }
    });
});

router.post('/products/delete', (req,res) => {
    let id = req.body.id;
    if(id != undefined){
        if(id != isNaN){
            Product.destroy({where:{
                id: id
            }}).then(() => {
                res.redirect('/products', {user: req.session.user});
            }).catch(e => {
                res.redirect('/', {user: req.session.user});
            })
        }else{
            res.redirect('/', {user: req.session.user});
        }
    }else{
        res.redirect('/', {user: req.session.user});
    }
    
});

router.get('/admin/products/edit/:id', (req,res) => {
    let id = req.params.id;
    if(id != isNaN){
        Product.findByPk(id).then(product => {
            Category.findAll().then(categories =>{
                res.render('admin/products/editProduct', {product: product, categories: categories, user: req.session.user});
            })
        })    
    }
});

router.post('/products/update', (req,res) => {
    let id = req.body.id;
    let newTitle = req.body.title;
    //let newPhoto = req.body.photo;
    let newDescription = req.body.description;
    let newPrice = req.body.price;
    let newCategory = req.body.category;
    Product.update((
        {title: newTitle, description: newDescription, price: newPrice, category: newCategory},
        {where: {id:id}}))
        .then(() => {
        res.redirect('/products', {user: req.session.user});
    })

});

module.exports = router;