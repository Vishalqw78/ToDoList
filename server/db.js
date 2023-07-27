const Pool = require("pg").Pool;
require('dotenv')
const pool = new Pool({
    user: "postgres",
    password: "qwerty123",
    host: "localhost",
    port: 5432,
    database: "apptodo"
});
module.exports = pool;