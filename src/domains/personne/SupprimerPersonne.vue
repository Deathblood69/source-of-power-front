<script setup lang="ts">
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

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

  /**  REQUETES   **/

  const {refresh} = useFetchService(`${API.personne}/${props.personne.id}`, {
    method: METHODE_HTTP.DELETE,
    immediate: false,
  })

  /**  COMPUTED   **/

  /**  LIFECYCLE  **/

  /**  METHODS  **/

  function handleDialog() {
    open.value = !open.value
  }

  async function handleValidate() {
    await refresh()
    emit('validate')
    handleDialog()
  }
</script>

<template>
  <AppDialog
    title="Supprimer la famille"
    :model-value="open"
  >
    <AppForm
      title=""
      @validate="handleValidate"
      @cancel="handleDialog"
    >
      {{ `Voulez vous supprimer la famille ${personne.nom}?` }}
    </AppForm>
  </AppDialog>
</template>
