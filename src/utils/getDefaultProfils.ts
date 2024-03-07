import type {Credentials} from '~/types/credentials'

/**
 * Récupère la liste des profils en mode dev
 * Pour la connexion développeur
 */
export function getDefaultProfils(): Credentials[] {
  return [
    {
      username: 'd.dev',
      password: 'dev',
    },
  ] satisfies Credentials[]
}
