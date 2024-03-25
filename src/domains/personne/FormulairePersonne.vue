<script setup lang="ts">
  import FormFamille from '~/domains/famille/FormFamille.vue'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'

  /**  PROPS  **/

  interface Props {
    famille: FamilleDto
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
    return props.famille.id !== undefined
  })

  const titre = computed(() => {
    return modeUpdate.value ? 'Modifier une famille' : 'Ajouter une famille'
  })

  const methode = computed(() => {
    return modeUpdate.value ? METHODE_HTTP.PUT : METHODE_HTTP.POST
  })

  /**  REQUETES   **/

  const {error, refresh} = useFetchService<string>(API.famille, {
    method: methode,
    body: props.famille,
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
        case 409:
          message = "La famille n'existe pas"
      }
      errorMessage.value = message ?? ''
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
      <FormFamille :model-value="famille" />
      <VAlert
        v-if="errorMessage"
        v-model="openError"
        :closable="true"
        :text="errorMessage"
        density="default"
        title="Erreur connexion"
        type="error"
        variant="outlined"
      />
    </AppForm>
  </AppDialog>
</template>

<style scoped></style>
