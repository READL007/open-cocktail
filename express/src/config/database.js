const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './cocktails.db',
  logging: false,
});

module.exports = sequelize;