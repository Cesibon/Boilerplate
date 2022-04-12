require('dotenv').config();
const Sequelize = require('sequelize')
const pg = require('pg');

const models = require('./models');
const {sequelize} = require('./config')

module.exports = class Manager {
    static #master = new Sequelize('postgres', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
    static app = models.appDB(sequelize)
    static #projects = {}

    static async getProjectDatabase(dbName) {
        // create the db and ignore any errors, for example if it already exists.
        if(Manager.#projects[dbName]) return Manager.#projects[dbName]
    }

    static async createProjectDatabase(dbName) {
        // create the db and ignore any errors, for example if it already exists.

        await Manager.#master.query('CREATE DATABASE ' + dbName, {
            type: Sequelize.QueryTypes.RAW
        })
        Manager.#projects[dbName] = Manager.#connect(dbName)
        return Manager.#projects[dbName]

    }

    static async deleteProjectDatabase(dbName) {
        // create the db and ignore any errors, for example if it already exists.
        await Manager.#master.query('DROP DATABASE ' + dbName, {
            type: Sequelize.QueryTypes.RAW
        })
        return true
    }

    static async #connect(DB_NAME) {
        return new Sequelize(DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        });
    }

}