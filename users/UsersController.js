const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');


router.get('/admin/users', (req,res) => {
    User.findAll().then( users => {
        res.render('admin/users/usersList', {users: users, user: req.session.user});
    });
});

router.get('/admin/users/create', (req,res) => {
    res.render('admin/users/createUser', {user: req.session.user});
});

router.post('/users/create', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/login');
            }).catch(e => {
                res.render('/admin/users/create', {user: req.session.user});
            })
        }else{
            res.redirect('/admin/users/create');
        }
    })
    //res.render('admin/users/createUser');
});

router.get('/login', (req,res) => {
    res.render('admin/users/login', {user: req.session.user});
});

router.post('/authenticate', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                let id = user.id;
                res.redirect('/admin/myproducts/' + id);
            }else{
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }
    });
    //res.render('admin/users/login');
});

router.get('/logout', adminAuth,(req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

module.exports = router;