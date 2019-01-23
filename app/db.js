const fs = require('fs');
let dotenv = null;
if(!process.env.DB_USER)
  dotenv = require('dotenv').config();

const options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
};

module.exports = {
  development: options,
  test: options,
  production: {
    ...options,
    dialectOptions: {
      ssl: {
        //ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      }
    }
  }
};