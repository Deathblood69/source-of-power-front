<script lang="ts" setup>
  import {PATHS} from '~/constants/paths.const'
  import type {Credentials} from '~/types/credentials'
  import {getDefaultProfils} from '~/utils/getDefaultProfils'
  import FormCredentials from '~/domains/auth/FormCredentials.vue'
  import AuthLoginBtn from '~/domains/auth/AuthLoginBtn.vue'

  const config = useRuntimeConfig()

  const router = useRouter()

  const authStore = useAuthStore()

  const loadingForm = ref(false)

  const credentials = ref<Credentials>({
    username: '',
    password: '',
  })

  const defaultProfils = computed(() => getDefaultProfils())

  async function handleConnect() {
    await authStore.handleConnexion()
    await router.push(PATHS.accueil)
  }
</script>

<template>
  <AppForm
    :closable="false"
    :loading="loadingForm"
    :title="config.public['NOM']"
    width="30%"
    @validate="handleConnect"
  >
    <FormCredentials
      v-model="credentials"
      :pending="authStore.pending"
      :error="authStore.error"
      :default-users="defaultProfils"
    />
    <template #actions="{validate, loading}">
      <AuthLoginBtn
        :loading="loading"
        @click="validate"
      />
    </template>
  </AppForm>
</template>
