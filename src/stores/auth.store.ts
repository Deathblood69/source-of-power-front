import {defineStore} from 'pinia'
import {API} from '~/constants/api.const'
import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
import type {UserDTO} from '~/domains/user/dto/user.dto'
import type {Erreur} from '~/types/erreur'

export const useAuthStore = defineStore('auth', () => {
  const credentials = ref<{username: string; password: string}>({
    username: '',
    password: '',
  })

  const {data, refresh, error, pending} = useFetchService<UserDTO>(API.login, {
    method: METHODE_HTTP.POST,
    body: credentials,
    immediate: false,
  })

  const erreur = computed(() => {
    let erreur: Erreur | undefined
    if (error.value) {
      erreur = {
        message: error.value?.message,
      }
    }
    return erreur
  })

  const user = ref<UserDTO>()

  const isConnected = computed(() => {
    return !!user.value
  })

  async function handleConnexion() {
    credentials.value = {username: 'd.dev', password: 'dev'}
    await refresh()
    if (data.value) {
      user.value = data.value
    }
    return isConnected.value
  }

  function handleDeconnexion() {
    user.value = undefined
  }

  return {
    isConnected,
    error: erreur,
    pending,
    handleConnexion,
    handleDeconnexion,
  }
})
