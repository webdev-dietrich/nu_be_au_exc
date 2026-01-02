import { defineConfig } from 'drizzle-kit'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schemas',
  out: './server/db/migrations',

  dbCredentials: {
    host: process.env.NUXT_H_PG_HOST as string,
    user: process.env.NUXT_H_PG_USER as string,
    port: 5432,
    password: process.env.NUXT_H_PG_PASS as string,
    database: process.env.NUXT_H_PG_NAME as string,
    ssl: { ca: fs.readFileSync(path.join(__dirname, 'config', 'sqlca.pem')) },
  },

  migrations: {
    table: 'ba-migrations-table',
    schema: 'public',
  },
})
