require('dotenv').config()
const { client } = require('./pg-client')
const bcrypt = require('bcrypt')
const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data')

async function seedUsers(client) {
  try {
    // Enable uuid-ossp extension
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create users table
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    
    console.log('Created "users" table')

    // Insert data on users table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.query(`
            INSERT INTO users (id, name, email, password)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING;
          `,
          [user.id, user.name, user.email, hashedPassword],
        );
      })
    );

    console.log('Inserted users:', insertedUsers.length)
  } catch(err) {
    console.error('Error seeding users:', err)
  }
}

async function seedInvoices(client) {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `);

    console.log('Created "invoices" table')

    const insertedInvoices = await Promise.all(
      invoices.map((invoice) => {
        return client.query(`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `,
        [invoice.customer_id, invoice.amount, invoice.status, invoice.date])
      })
    );

    console.log('Inserted invoices:', insertedInvoices.length)
  } catch(err) {
    console.error('Error seeding invoices:', err)
  }
}

async function seedCustomers(client) {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    // Create the customers table if it doesn't exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );`
    )

    console.log('Created "customers" table')

    const insertedCustomers = await Promise.all(
      customers.map((customer) => {
        return client.query(`
          INSERT INTO customers (id, name, email, image_url)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `,
        [customer.id, customer.name, customer.email, customer.image_url])  
      })
    );

    console.log('Inserted customers:', insertedCustomers.length);
  } catch(err) {
    console.error('Error seeding customers:', err)
  }
}

async function seedRevenue(client) {
  try {    
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

    await client.query(`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      )
    `)

    console.log('Created "revenue" table')

    const insertedRevenues = await Promise.all(
      revenue.map((rev) => {
        return client.query(`
          INSERT INTO revenue (month, revenue)    
          VALUES ($1, $2)
          ON CONFLICT (month) DO NOTHING;
        `,
        [rev.month, rev.revenue],
        );
      })
    );

    console.log('Inserted revenue count:', insertedRevenues.length);
  } catch(err) {
    console.error('Error seeding revenue', err);
  }
}

async function main() {
  await client.connect()
  await seedUsers(client)
  await seedInvoices(client)
  await seedCustomers(client)
  await seedRevenue(client)
  await client.end()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
