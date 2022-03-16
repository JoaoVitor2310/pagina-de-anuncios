const express = require('express');
const router = express.Router();
//const Category = require('')
const slugify = require('slugify');
const Product = require('../products/Product');
const Category = require('./Category');

router.get('/admin/categories/new', (req,res) => {
    res.render('admin/categories/newCategory');
});

router.post('/categories/save', (req,res) => {
    let title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/categories');
        })
    }else{  
        res.redirect('/admin/categories/new');
    }
});

router.get('/categories', (req,res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/categories', {categories: categories})
    });
});

router.get('/admin/categories/edit/:id', (req,res) => {
    let id = req.params.id;
    if(id != isNaN){
        Category.findByPk(id).then(category => {
            res.render('admin/categories/editCategory', {category: category});
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
        res.redirect('/categories');
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