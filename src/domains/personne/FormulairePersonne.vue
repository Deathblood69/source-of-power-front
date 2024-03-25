<script setup lang="ts">
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import FormPersonne from '~/domains/personne/FormPersonne.vue'

  /**  PROPS  **/

  interface Props {
    personne: PersonneDto
  }

  const props = defineProps<Props>()

  /**  EMITS  **/

  type Emits = {
    validate: []
  }

  const emit = defineEmits<Emits>()

  /**  REFS  **/

  const open = defineModel<boolean>({
    default: false,
  })

  const openError = ref(true)

  const errorMessage = ref<string>('')

  /**  COMPUTED   **/

  const modeUpdate = computed(() => {
    return Boolean(props.personne.id)
  })

  const titre = computed(() => {
    return modeUpdate.value ? 'Modifier une personne' : 'Ajouter une personne'
  })

  const methode = computed(() => {
    return modeUpdate.value ? METHODE_HTTP.PUT : METHODE_HTTP.POST
  })

  /**  REQUETES   **/

  const {error, refresh} = useFetchService<string>(API.personne, {
    method: methode,
    body: props.personne,
    immediate: false,
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/

  function handleDialog() {
    open.value = !open.value
  }

  async function handleValidate() {
    await refresh()
    if (!error.value) {
      emit('validate')
      handleDialog()
    } else {
      const statusCode = error.value?.statusCode
      let message

      switch (statusCode) {
        case 400:
          message = 'La création a échouée'
          break
        case 409:
          message = "La personne n'existe pas"
          break
      }
      errorMessage.value = message ?? ''
      openError.value = true
    }
  }
</script>

<template>
  <AppDialog
    :title="titre"
    :model-value="open"
  >
    <AppForm
      title=""
      @validate="handleValidate"
      @cancel="handleDialog"
    >
      <FormPersonne :model-value="personne" />
      <VAlert
        v-if="errorMessage"
        v-model="openError"
        :closable="true"
        :text="errorMessage"
        density="default"
        title="Erreur"
        type="error"
        variant="outlined"
      />
    </AppForm>
  </AppDialog>
</template>
