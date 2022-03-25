const express = require('express');
const bcrypt = require('bcryptjs');
const { default: slugify } = require('slugify');
const router = express.Router();
const Category = require('../categories/Category');
const Product = require('../products/Product');
const User = require('../users/User');
const jwt = require('jsonwebtoken');
const apiAuth = require('../middlewares/apiAuth');
const JWTSecret = 'asodihaihfduhsfdgiu';

router.get('/products', (req,res) => {
    
    let HATEOAS = [
        {
            href: 'http://pagina-de-anuncios.herokuapp.com/api/product',
            method: 'POST',
            rel: 'add_product'
        },
    ]
    
    Product.findAll().then(products => {
        res.status(200);
        res.json({products: products, _links: HATEOAS});
    })
});

router.get('/categories', (req,res) => {
    
    let HATEOAS = [
        {
            href: 'http://pagina-de-anuncios.herokuapp.com/api/category',
            method: 'POST',
            rel: 'add_category'
        },
    ]
    
    Category.findAll().then(categories => {
        res.status(200);
        res.json({categories: categories, _links: HATEOAS});
    })
});

router.get('/product/:id', (req,res) => {
    let {id} = req.params;

    if(isNaN(id)){
        res.sendStatus(400);
        res.send('Id inválido')
    }else{
        id = Number(id);
        Product.findOne({where: {
            id: id
        }}).then(product => {
            if((product == null) || (product == undefined)){
                res.sendStatus(404);
            }else{

                let HATEOAS = [
                    {
                        href: 'http://pagina-de-anuncios.herokuapp.com/api/product/' + id,
                        method: 'DELETE',
                        rel: 'delete_product'
                    },
                    {
                        href: 'http://pagina-de-anuncios.herokuapp.com/api/product/' + id,
                        method: 'PUT',
                        rel: 'edit_product'
                    }
                ]

                res.json({product: product, _links: HATEOAS});
            }
        })
    }
});

router.get('/category/:id', (req,res) => {
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
        res.send('Id inválido')
    }else{
        id = Number(id);
        Category.findOne({where: {
            id: id
        }}).then(category => {
            if((category == null) || (category == undefined)){
                res.sendStatus(404);
            }else{

                let HATEOAS = [
                    {
                        href: 'http://pagina-de-anuncios.herokuapp.com/api/category/' + id,
                        method: 'DELETE',
                        rel: 'delete_category'
                    },
                    {
                        href: 'http://pagina-de-anuncios.herokuapp.com/api/category/' + id,
                        method: 'PUT',
                        rel: 'edit_category'
                    }
                ]

                res.json({category: category, _links: HATEOAS});
            }
        })
    }
});

router.post('/product', apiAuth, (req,res) => {
    let {title, description, price, categoryId} = req.body;
    if((title == null) || (title == undefined)){
        res.sendStatus(404);
    }else if((description == null) || (description == undefined)){
        res.sendStatus(404);
    }else if((price == null) || (price == undefined)){
        res.sendStatus(404);
    }else if((categoryId == null) || (categoryId == undefined)){
        res.sendStatus(404);
    }else{
        User.findByPk(req.id).then(user => {
            Product.create({title: title,
                slug: slugify(title),
                description: description,            
                price: price,
                categoryId: categoryId,
                userId: user.id
                }).then(() => {
                    res.sendStatus(200);
                })
        })
    }
});

router.post('/category', apiAuth, (req,res) => {
    let {title} = req.body;
    if((title == null) || (title == undefined)){
        res.sendStatus(404);
    }else{
        Category.create({title: title,
                        slug: slugify(title),
                        }).then(() => {
                            res.sendStatus(200);
        })
    }
});

router.delete('/product/:id', apiAuth, (req,res) => {
    let {id} = req.params;
    let userId = req.id;
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        id = Number(id);
        Product.findOne({where: {
            id: id
        }}).then(product => {
            if((product == null) || (product == undefined)){
                res.sendStatus(404);
            }else if(product.userId != userId){
                res.sendStatus(401);
            }
            else{
                Product.destroy({where: {id: id}})
                .then(() => {
                    res.sendStatus(200);
                })
            }
        })
    }
});

router.delete('/category/:id', apiAuth, (req,res) => {
    let {id} = req.params;
    let userId = req.id;
    if(isNaN(id)){
        res.sendStatus(400);
        res.json({error: 'Id inválido'});
    }else{
        id = Number(id);
        Category.findOne({where: {
            id: id
        }}).then(category => {
            if((category == null) || (category == undefined)){
                res.sendStatus(404);
            }else if(category.userId != 1){
                res.sendStatus(401);
            }
            else{
                Category.destroy({where: {id: id}})
                .then(() => {
                    res.sendStatus(200);
                });
            }
        })
    }
});

router.put('/product/:id', apiAuth, (req,res) => {
    let {title, description, price, categoryId} = req.body;
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        id = Number(id);
        Product.findOne({where: {
            id: id
        }}).then(product => {
            if((product == null) || (product == undefined)){
                res.sendStatus(404);
            }else if(product.userId != req.id){
                res.status(401);
                res.json({error: 'Você não tem autorização para editar esse produto.'})
            }
            else{
                if(title != undefined){
                    Product.update({title: title, slug: slugify(title)}, {where: {
                        id:id
                    }}).then(() => {
                        res.sendStatus(200);
                    })
                }
                if(description != undefined){
                    Product.update({description: description}, {where: {
                        id:id
                    }}).then(() => {
                        res.sendStatus(200);
                    })
                }
                if(price != undefined){
                    Product.update({price: price}, {where: {
                        id:id
                    }}).then(() => {
                        res.sendStatus(200);
                    })
                }
                if(categoryId != undefined){
                    Product.update({categoryId: categoryId}, {where: {
                        id:id
                    }}).then(() => {
                        res.sendStatus(200);
                    })
                }
            }
        })
    }
});

router.put('/category/:id', apiAuth, (req,res) => {
    let {title} = req.body;
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        id = Number(id);
        Category.findOne({where: {
            id: id
        }}).then(category => {
            if((category == null) || (category == undefined)){
                res.sendStatus(404);
            }else if(req.id != 1){
                res.status(401);
                res.json({error: 'Você não tem autorização para editar essa categoria.'})
            }
            else{
                if(title != undefined){
                    Category.update({title: title, slug: slugify(title)}, {where: {
                        id:id
                    }}).then(() => {
                        res.sendStatus(200);
                    })
                }
            }
        })
    }
});

router.post('/auth', (req,res) => {
    let {email, password} = req.body;
    
    if((email != undefined) && (email != null)){
        User.findOne({where: {email: email}})
        .then(user => {
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                res.status(200);
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '4h'}, (err,token) => {
                    if(err){
                        res.status(401);
                        res.json({error: 'Falha interna'});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            }else{
                res.status(401);
                res.json({error: 'Credenciais inválidas'});
            }
        }).catch(() => {
            res.sendStatus(404);
        })
    }else{
        res.status(400);
        res.json({erro: 'Sintaxe errada'})
    }
});

module.exports = router;
