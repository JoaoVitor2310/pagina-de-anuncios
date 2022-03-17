const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');
const User = require('../users/User');

const Product = connection.define('products', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    // photo:{
    //     type: Sequelize.BLOB('long'),
    //     allowNull: true
    // },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Product.belongsTo(Category)//, User);
Category.hasMany(Product);
//Product.belongsTo(User);
//User.hasMany(Product);

Product.sync({force: false});

module.exports = Product;