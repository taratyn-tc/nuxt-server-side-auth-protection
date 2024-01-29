import { NuxtAuthHandler } from '#auth';

import { User } from 'next-auth'
import { CredentialInput, CredentialsConfig } from 'next-auth/providers'

interface IWithNameAndId {
  id: string
  name: string
}

const CREDENTIALS: Record<'username' | 'password', CredentialInput> = {
  username: {type: 'text', label: 'Username'},
  password: {type: 'password', label: 'Password'},
}
const TESTING_USER: User = {
  id: 'testing',
}

export type ICredentialProviderConfig = IWithNameAndId & Partial<CredentialsConfig>

export const EnvProvider = function (config: ICredentialProviderConfig): CredentialsConfig {
  return {
    credentials: CREDENTIALS,
    authorize: (credentials: Record<string, string> | undefined): User | null => {
      if (credentials &&
        credentials.username === process.env.TEST_USER_NAME &&
        credentials.password === process.env.TEST_USER_PASSWORD) {
        return TESTING_USER
      }
      return null
    },
    ...config,
    type: 'credentials',
  }
}


const nuxtAuthHandler = NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,
  providers: [
    EnvProvider({
      id: 'testing',
      name: 'Testing',
    }),],
  debug: true,
  // make sure this is in sync with the `secure` cookie option in the CSRF Token module
  useSecureCookies: false,
})

export default nuxtAuthHandler
