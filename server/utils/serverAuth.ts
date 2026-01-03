import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/index'
import * as schema from '../db/schemas/index'
import { username, admin as adminPlugin } from 'better-auth/plugins'
import { ac, admin, user } from './permissions'
import { hashPassword, verifyPassword } from './password'

export const auth = betterAuth({
  baseURL: 'https://nu-be-au-exc.vercel.app',
  basePath: '/api/auth',
  trustedOrigins: ['https://nu-be-au-exc.vercel.app', 'https://nu-be-au-gpthp1tz6-sascha-dietrichs-projects.vercel.app', 'http://localhost:3000'],
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
    schema: {
      ...schema,
      user: schema.users,
      account: schema.accounts,
      session: schema.sessions,
      verification: schema.verifications,
    },
  }),
  plugins: [
    username({
      minUsernameLength: 8,
      maxUsernameLength: 64,
      displayUsernameValidator: (displayUsername) => {
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername)
      },
    }),
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
  user: {
    modelName: 'users',
    fields: {
      name: 'fullName',
      email: 'emailAddress',
    },
    additionalFields: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      role: {
        type: ['user', 'admin'],
        required: true,
        defaultValue: 'user',
        input: false,
      },
      lang: {
        type: ['de', 'en'],
        required: true,
        defaultValue: 'de',
      },
    },
  },
  advanced: {
    database: {
      generateId: 'serial',
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1],
            },
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }) => {
      void await $fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          subject: 'Reset your password',
          text: `Hallo ${user.name},\n\nBitte klicken Sie auf den folgenden Link, um Ihr Passwort zurück zu setzen:\n\nhttp://localhost:3000/verify-email?token=${token}\n\nAllternativ können Sie auch den folgenden Link verwenden: ${url}\n\nFalls Sie diese E-Mail nicht angefordert haben, können Sie sie einfach ignorieren.\n\nVielen Dank!`,
        }),
      })
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      void await $fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          subject: 'Bitte bestätigen Sie Ihre E-Mail-Adresse',
          text: `Hallo ${user.name},\n\nBitte klicken Sie auf den folgenden Link, um Ihre E-Mail-Adresse zu bestätigen:\n\nhttp://localhost:3000/verify-email?token=${token}\n\nAllternativ können Sie auch den folgenden Bestätigungscode verwenden: ${url}\n\nFalls Sie diese E-Mail nicht angefordert haben, können Sie sie einfach ignorieren.\n\nVielen Dank!`,
        }),
      })
    },
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
})
