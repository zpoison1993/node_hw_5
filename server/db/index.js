const Sequelize = require('sequelize')
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, 'config'))[env]

const sequelize = new Sequelize(`postgres://${config.username}:${config.password}@${config.host}/${config.database}`, config)

module.exports = sequelize
