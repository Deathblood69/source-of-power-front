<script lang="ts" setup>
  /** PROPS **/
  interface Props {
    title?: string
    subtitle?: string
    loading?: boolean
    closable?: boolean
    libelleValider?: string
    libelleAnnuler?: string
    width?: string
  }

  withDefaults(defineProps<Props>(), {
    title: '',
    loading: false,
    subtitle: '',
    closable: true,
    width: undefined,
    libelleValider: 'Valider',
    libelleAnnuler: 'Annuler',
  })

  /** REFS **/
  const afterClickLoading = ref(false)

  const form = ref()

  /** EMITS **/
  type Emits = {
    validate: []
    cancel: []
  }

  const emit = defineEmits<Emits>()

  /** METHODS **/
  /**
   * Valide le formulaire et exécute la fonction handleClickValidForm
   * si le formulaire est valide.
   * @return void
   */
  async function handleValidate(event: Event) {
    event.preventDefault()
    const {valid} = await form.value.validate()
    valid && emit('validate')
  }
</script>

<template>
  <VForm
    ref="form"
    :disabled="loading || afterClickLoading"
    @keydown.enter.capture.stop="handleValidate"
  >
    <slot />
  </VForm>

  <slot
    name="actions"
    :validate="handleValidate"
    :loading="afterClickLoading"
  >
    <VContainer class="container">
      <VBtn
        :loading="afterClickLoading"
        variant="flat"
        color="primary"
        :text="libelleValider"
        @click="handleValidate"
      />
      <VBtn
        :text="libelleAnnuler"
        @click="emit('cancel')"
      />
    </VContainer>
  </slot>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    gap: 1em;
  }
</style>
