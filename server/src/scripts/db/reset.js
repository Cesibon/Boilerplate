
require('module-alias/register')

const { sequelize } = require('../models');

(async ()=>{
    try {
        await sequelize.sync({force: true})
    } catch (error) {
        console.error(error)
    }
})()
