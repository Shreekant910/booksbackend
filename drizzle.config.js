const { defineConfig } = require("drizzle-kit");

const config = defineConfig({
  dialect: 'mysql', // 'mysql' | 'sqlite' | 'turso'
//   schema: './drizzle/schema.js',
schema:'./modal/index.js',
  out: './drizzle',
  dbCredentials: {
    url: 'mysql://root:Test_12345678@localhost:3306/BookStore'
}
});

module.exports = config;