<script lang="ts" setup>
  import type {Credentials} from '~/types/credentials'
  import {isDevelopment} from 'std-env'
  import {FORM_RULES} from '~/constants/formRules.const'
  import type {Erreur} from '~/types/erreur'

  /**  PROPS **/
  interface Props {
    modelValue: Credentials
    pending: boolean
    error?: Erreur
    defaultUsers?: Credentials[]
  }

  const props = defineProps<Props>()

  /**  EMITS **/
  type Emits = {
    'update:modelValue': [value: Credentials]
    errorConnection: []
  }

  const emit = defineEmits<Emits>()

  /**  REFS **/
  const passwordVisible = ref(false)
  const isDev = ref(isDevelopment)
  const openNewError = ref(true)

  /**  COMPUTED **/
  const user = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  // Computed pour afficher l'icône du champ password.
  const computedIconPassword = computed(() =>
    passwordVisible.value ? 'mdi-eye' : 'mdi-eye-off',
  )

  // Computed pour afficher le message d'erreur de connexion.
  const computedErrorMessage = computed(() => {
    if (!props.pending) {
      openNewError.value = true
    }
    return (
      (['401', '404'].some((code) => props.error?.message.includes(code)) &&
        'Veuillez saisir des identifiants valides svp.') ||
      (props.error?.message.includes('406') &&
        'Votre compte est bloqué !  Veuillez réessayer dans 20 minutes.')
    )
  })
</script>

<template>
  <VCheckbox
    v-if="isDevelopment"
    v-model="isDev"
    label="Mode Développement"
  />
  <VTextField
    v-if="!isDev"
    v-model="user.username"
    :rules="[FORM_RULES.required]"
    aria-label="Identifiant"
    label="Identifiant"
  />

  <VTextField
    v-if="!isDev"
    v-model="user.password"
    :rules="[FORM_RULES.required]"
    :type="passwordVisible ? 'text' : 'password'"
    aria-label="Mot de passe"
    label="Mot de passe"
  >
    <template #append-inner>
      <VIcon
        :icon="computedIconPassword"
        @click="passwordVisible = !passwordVisible"
      />
    </template>
  </VTextField>
  <VSelect
    v-if="isDev"
    v-model="user"
    :items="defaultUsers"
    :return-object="true"
    aria-label="Profils"
    item-title="username"
    label="Profil"
  />

  <VAlert
    v-if="computedErrorMessage"
    v-model="openNewError"
    :closable="true"
    :text="computedErrorMessage"
    density="compact"
    title="Erreur connexion"
    type="error"
    variant="outlined"
  />
</template>
