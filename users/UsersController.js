const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const session = require('express-session');

router.get('/admin/users', (req,res) => {
    User.findAll().then( users => {
        res.render('admin/users/usersList', {users: users});
    });
});

router.get('/admin/users/create', (req,res) => {
    res.render('admin/users/createUser');
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
                res.redirect('/');
            }).catch(e => {
                res.render('/admin/users/create');
            })
        }else{
            res.redirect('/admin/users/create');
        }
    })
    //res.render('admin/users/createUser');
});

router.get('/login', (req,res) => {
    res.render('admin/users/login');
});

module.exports = router;