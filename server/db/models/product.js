const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "",
    unique: false,
    // unique: false,
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: "",
    unique: false,
  },
  fileURL: {
    type: Sequelize.STRING,
    defaultValue: "",
    unique: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    unique: false,
  },
  countryPurchases: {
    type: Sequelize.JSON,
    defaultValue: {},
  }
})

// db.sync({force: true})

module.exports = Product
