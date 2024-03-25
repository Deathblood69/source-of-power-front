<script lang="ts" setup>
  import type {FamilleDto} from '~/domains/personne/dto/personne.dto'
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'

  const form = defineModel<FamilleDto>({
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
