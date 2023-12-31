const Pool = require("pg").Pool;
require('dotenv').config();
const pool = new Pool({
    user: process.env.PG_USER,
    password:  process.env.PG_PASSWORD,
    host: process.env.HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    ssl:true
});
module.exports = pool;