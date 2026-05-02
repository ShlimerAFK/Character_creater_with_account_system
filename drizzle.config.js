require('dotenv/config');


module.exports = {
  schema: './src/schema.js',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_PATH,
  },
};

