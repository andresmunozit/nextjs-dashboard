const { Client } = require('pg')

const connectionString = process.env.POSTGRES_URL

const client = new Client({ connectionString })

// async function connect() {
//   try {
//     await pool.connect()
//     console.log('Pool connected:', await pool.query('SELECT NOW()'))
//   } catch(e) {
//     console.error('Error connecting to the database:', e)
//   }
// }

// connect()

// const query = async function(sentence, values) {
//   return pool.query(sentence, values)
// }

module.exports = { client }
