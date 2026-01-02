import { auth } from '@@/server/utils/serverAuth'

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event))
})
