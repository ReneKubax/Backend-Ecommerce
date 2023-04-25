const {Client} = require('pg');

async function getConnection(){
  const client = new Client({
    host: "localhost",
    user: "nico",
    port: 5432,
    password: "admin123",
    database: "my_store"
    });
   await client.connect();
   return client;
}

module.exports = getConnection;
