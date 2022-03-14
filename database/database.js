const Sequelize = require('sequelize');

const connection =  new Sequelize('pagina-anuncios', 'root', '@Gentejv12', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;