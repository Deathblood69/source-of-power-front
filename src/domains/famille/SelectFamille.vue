<script setup lang="ts">
  /**  PROPS  **/
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  /**  METHODS  **/
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'

  interface Props {
    familles: FamilleDto[]
  }

  defineProps<Props>()

  const famille = defineModel({
    required: true,
  })

  /**  EMITS  **/

  /**  REFS  **/

  /**  COMPUTED   **/

  /**  LIFECYCLE  **/
</script>

<template>
  <VSelect
    v-model="famille"
    :items="familles"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    item-title="nom"
    item-value="id"
    :return-object="false"
    aria-label="Famille"
    label="Famille"
  />
</template>

<style scoped></style>
