import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer('id').generatedByDefaultAsIdentity().primaryKey(),
  fullName: text('full_name').notNull(),
  emailAddress: text('email_address').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text('username').unique(),
  displayUsername: text('display_username'),
  role: text('role', { enum: ['user', 'admin'] })
    .default('user')
    .notNull(),
  banned: boolean('banned').default(false),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  lang: text('lang', { enum: ['de', 'en'] })
    .default('de')
    .notNull(),
})

export const sessions = pgTable(
  'sessions',
  {
    id: integer('id').generatedByDefaultAsIdentity().primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    impersonatedBy: text('impersonated_by'),
  },
  (table) => [index('sessions_userId_idx').on(table.userId)],
)

export const accounts = pgTable(
  'accounts',
  {
    id: integer('id').generatedByDefaultAsIdentity().primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('accounts_userId_idx').on(table.userId)],
)

export const verifications = pgTable(
  'verifications',
  {
    id: integer('id').generatedByDefaultAsIdentity().primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verifications_identifier_idx').on(table.identifier)],
)

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))
