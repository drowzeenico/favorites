const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
 
module.exports = session({
  store: new pgSession({
    conObject: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    }
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});