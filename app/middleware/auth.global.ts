import { authClient } from '@/utils/clientAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    if (to.path === '/users/dashboard') {
      return navigateTo('/users/authentication')
    }
  }
  if (session.value) {
    if (from.path === '/users/authentication') {
      return navigateTo('/users/dashboard')
    }
  }
  else {
    return
  }
})
