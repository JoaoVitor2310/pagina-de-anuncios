const Sequelize = require('sequelize');

const connection =  new Sequelize('pagina-anuncios', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;