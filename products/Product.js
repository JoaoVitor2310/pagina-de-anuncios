const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Product = connection.define('products', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    price:{
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

Product.belongsTo(Category);
Category.hasMany(Product);


Product.sync({force: false});

module.exports = Product;