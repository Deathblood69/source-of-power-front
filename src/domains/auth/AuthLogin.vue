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
  <VCard width="30%">
    <AppForm
      :closable="false"
      :loading="loadingForm"
      :title="config.public['NOM']"
      @validate="handleConnect"
    >
      <VCardText>
        <FormCredentials
          v-model="credentials"
          :pending="authStore.pending"
          :error="authStore.error"
          :default-users="defaultProfils"
        />
      </VCardText>
      <template #actions="{validate, loading}">
        <VCardActions>
          <AuthLoginBtn
            :loading="loading"
            @click="validate"
          />
        </VCardActions>
      </template>
    </AppForm>
  </VCard>
</template>
