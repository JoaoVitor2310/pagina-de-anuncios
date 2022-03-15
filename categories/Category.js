const Sequelize = require('sequelize');
const connection = require('../database/database');
//const Product = require('../products/Product');

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({force: false});

module.exports = Category;