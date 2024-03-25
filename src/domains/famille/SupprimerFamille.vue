<script setup lang="ts">
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

  /**  REQUETES   **/

  const {refresh} = useFetchService(`${API.famille}/${props.famille.id}`, {
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
      {{ `Voulez vous supprimer la famille ${famille.nom}?` }}
    </AppForm>
  </AppDialog>
</template>
