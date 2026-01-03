import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle({
  connection: {
    user: process.env.NUXT_H_PG_USER,
    database: process.env.NUXT_H_PG_NAME,
    port: 5432,
    host: process.env.NUXT_H_PG_HOST,
    password: process.env.NUXT_H_PG_PASS,
  },
})

export { db }
