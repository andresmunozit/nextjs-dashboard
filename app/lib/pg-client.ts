import { Client } from 'pg';

const connectionString = process.env.POSTGRES_URL

export const client = new Client({ connectionString });

client.connect()
