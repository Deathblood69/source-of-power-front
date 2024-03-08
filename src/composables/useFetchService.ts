import type {API} from '~/constants/api.const'

/**
 * Fonction qui surcouche le composable useFetch
 * @param path Chemin vers l'api du backend
 * @param options Objet contenant les options useFetch
 */
export function useFetchService<E>(path: API, options?: Object) {
  const {...props} = options ?? {}
  const config = useRuntimeConfig()
  return useFetch<E>(path, {
    baseURL: config.public.NUXT_BASE_URL,
    credentials: 'include',
    watch: false,
    ...props,
  })
}
