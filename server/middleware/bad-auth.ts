import { getServerSession } from '#auth'

const ALLOWED_PATHS= ['/api/auth/']
export default eventHandler(async (event) => {
  if  (ALLOWED_PATHS.some(p => event.path.startsWith(p))) {
    // this means we're allowed to proceed regardless of whether we're logged in or not.
    return
  }
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }
})
