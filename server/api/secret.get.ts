import { requireAuth } from '../utils/require-auth'

export default defineEventHandler({
  onRequest: [requireAuth],
  handler: async (event) => {
    setResponseStatus(event, 201, 'Secret data')
    return { message: 'Secret data', user: event.context.auth }
  },
})
