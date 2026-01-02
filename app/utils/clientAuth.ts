import { createAuthClient } from 'better-auth/vue'
import { inferAdditionalFields, usernameClient, adminClient } from 'better-auth/client/plugins'
import { ac, admin, user } from '@@/server/utils/permissions'

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields({
    user: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      role: { type: ['user', 'admin'] },
      lang: { type: ['de', 'en'] },
    },
  }),
  usernameClient(),
  adminClient({
    ac,
    roles: {
      admin,
      user,
    },
  }),
  ],
})

export const canCreateProject = await authClient.admin.hasPermission({
  permissions: {
    project: ['create'],
  },
})

export type Session = typeof authClient.$Infer.Session
