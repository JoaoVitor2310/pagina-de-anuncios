const Sequelize = require('sequelize');

const connection =  new Sequelize('pagina-anuncios', 'b8031a0f0ba516', 'f7789314', {
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql', 
    timezone: '-03:00'
});//mysql://b8031a0f0ba516:f7789314@us-cdbr-east-05.cleardb.net/heroku_41dbae5411a97ad?reconnect=true

module.exports = connection;