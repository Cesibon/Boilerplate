'use strict';
require('module-alias/register')
require('dotenv').config();
const { sequelize, User } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (async() => {
      try {
        await sequelize.sync({force: true})
        
        const user = await User.create({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
          email: process.env.ADMIN_EMAIL,
          isAdmin: true
        })
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    })()
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
