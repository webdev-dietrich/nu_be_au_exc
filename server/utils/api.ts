import { auth } from './serverAuth'

await auth.api.userHasPermission({
  body: {
    userId: 'id',
    permissions: {
      project: ['create'],
    },
  },
})
