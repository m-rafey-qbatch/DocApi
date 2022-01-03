require('dotenv').config()
module.exports = {
      "username": process.env.USERNAME,
      "password": process.env.PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.HOST,
      "dialect": "postgres"
  }
    