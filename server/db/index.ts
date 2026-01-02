import { drizzle } from 'drizzle-orm/node-postgres'
import fs from 'fs'

const db = drizzle({
  connection: {
    user: process.env.NUXT_H_PG_USER,
    database: process.env.NUXT_H_PG_NAME,
    port: 5432,
    host: process.env.NUXT_H_PG_HOST,
    password: process.env.NUXT_H_PG_PASS,
    ssl: { ca: fs.readFileSync('./server/db/config/sqlca.pem').toString() },
  },
})

export { db }
