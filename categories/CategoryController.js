const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const isOwner = require('../middlewares/isOwner');

const Product = require('../products/Product');
const Category = require('./Category');

router.get('/admin/categories/new', (req,res) => {
    res.render('admin/categories/newCategory', {user: req.session.user});
});

router.post('/categories/save', (req,res) => {
    let title = req.body.title;
    if(title != undefined){
        Category.findOne({where: {
            title: title
        }}).then( category => {
            if(category == undefined){
                Category.create({
                    title: title,
                    slug: slugify(title)
                }).then(() => {
                    res.redirect('/categories/page/1');
                })
            }else
            res.redirect('/admin/categories/new');
        })
        
    }else{  
        res.redirect('/admin/categories/new');
    }
});

router.get('/categories/page/:num', (req,res) => {
    let page = req.params.num;
    let offset;
    if(page == isNaN || page == 1){
        offset = 0;
    }else{
        offset = (Number(page) - 1) * 4;
    }
    Category.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
        //include: [{model: Category}]
    }).then(categories => {
        let next;
        if(offset + 4 >= categories.count){
            next = false;
        }else{
            next = true;
        }
        let result = {
            page: Number(page),
            next: next,
            categories: categories
        }
        // if(Number(page) == 0 || Number(page) ==1 ){
        //     res.render('index', {products: products});
        // }
        Product.findAll().then(products => {
            res.render('admin/categories/pagecategories', {result: result, products: products, user: req.session.user});
        });
    });
    // Category.findAll().then(categories => {
    //     res.render('admin/categories/pageCategories', {categories: categories});
    // });
});

router.get('/category/:slug', (req,res) => {
    let slug = req.params.slug;
    Category.findOne({where:{
        slug: slug
    }}).then( category => {
        if(category != undefined){
            Product.findAll().then(products => {
                res.render('categoryPage', {products: products, category: category, user: req.session.user});
            });
        }else{
            res.redirect('/');
        }
    });
});

router.get('/admin/categories', isOwner, (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/categories', {categories: categories, user: req.session.user})
    }); // Só eu vou acessar essa rota para manter um controle das categorias
});

router.get('/admin/categories/edit/:id', (req,res) => {
    let id = req.params.id;
    if(id != isNaN){
        Category.findByPk(id).then(category => {
            res.render('admin/categories/editCategory', {category: category, user: req.session.user});
        }).catch(error => {
            res.redirect('/categories');
        })
    }else{
        res.redirect('/categories');
    }
});

router.post('/categories/update', (req,res) => {
    let id = req.body.id;
    let title = req.body.title;
    Category.update({title: title, slug: slugify(title)}, {
        where:{
            id: id
        }
    }).then(() =>{
        res.redirect('/categories', {user: req.session.user});
    })
});

router.post('/categories/delete', (req, res) => {
    let id = req.body.id;
    Category.findByPk(id).then( category => {
        Product.destroy({where:{
            categoryId: id
        }}).then(() => {
            Category.destroy({where:{id: id}}).then(() => {
                res.redirect('/');
            })
        })
    }).catch(() => {
        res.redirect('/categories');
    })
});

module.exports = router;