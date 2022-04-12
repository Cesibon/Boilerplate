"use strict";

const {
  DataTypes
} = require("sequelize");


const sequelize = require('./config/config')


const db = {};
db.User = require('./User')(sequelize, DataTypes);

db.sequelize = sequelize;

module.exports = db;