<script lang="ts" setup>
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

  const form = defineModel<PersonneDto>({
    required: true,
  })
</script>

<template>
  <VTextField
    v-model="form.nom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    aria-label="Nom de la personne"
    label="Nom de la personne"
  />
</template>
