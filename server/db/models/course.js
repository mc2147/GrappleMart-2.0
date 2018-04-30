const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  title: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    unique: false,
  },
  videoURLs: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    unique: false,
  },
  thumbnailURL: {
    type: Sequelize.STRING,
    defaultValue: "thumbnail.png",    
  }
})

module.exports = Course
