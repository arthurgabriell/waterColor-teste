const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'sistema_escolar',
    'root',
    'ArthurGabriel040817',
    {
        host: 'localhost',
        dialect: 'sqlite'
    }
);

module.exports = sequelize;