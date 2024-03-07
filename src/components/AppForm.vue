<script lang="ts" setup>
  /** PROPS **/
  interface Props {
    title: string
    subtitle?: string
    loading?: boolean
    closable?: boolean
    libelleValider?: string
    libelleAnnuler?: string
    width?: string
  }

  withDefaults(defineProps<Props>(), {
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
  <VCard
    :loading="loading"
    :subtitle="subtitle"
    :title="title"
    :aria-label="title"
    :width="width"
  >
    <VBtn
      v-if="closable"
      aria-label="Close"
      variant="plain"
      icon="mdi-close"
      class="ma-1 position-absolute"
      @click="emit('cancel')"
    />
    <VCardText>
      <VForm
        ref="form"
        :disabled="loading || afterClickLoading"
        @keydown.enter.capture.stop="handleValidate"
      >
        <slot />
      </VForm>
    </VCardText>
    <VCardActions class="pa-4">
      <slot
        name="actions"
        :validate="handleValidate"
        :loading="afterClickLoading"
      >
        <VBtn
          :text="libelleAnnuler"
          @click="emit('cancel')"
        />
        <VBtn
          :loading="afterClickLoading"
          variant="flat"
          color="primary"
          :text="libelleValider"
          @click="handleValidate"
        />
      </slot>
    </VCardActions>
  </VCard>
</template>

<style scoped>
  .position-absolute {
    top: 0;
    right: 0;
  }
</style>
