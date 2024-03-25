<script lang="ts" setup>
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import {Genre} from '~/domains/personne/enum/genre.enum'
  import type {PaginedQuery} from '~/types/paginedQuery'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'

  const {data: response} = useFetchService<PaginedQuery<FamilleDto>>(
    API.famille,
    {
      method: METHODE_HTTP.GET,
    },
  )

  const familles = computed(() => {
    return response.value?.data ?? []
  })

  const form = defineModel<PersonneDto>({
    required: true,
  })
</script>

<template>
  <VTextField
    v-model="form.nom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    aria-label="Nom"
    label="Nom"
  />
  <VTextField
    v-model="form.prenom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    aria-label="Prénom"
    label="Prénom"
  />
  <VTextField
    v-model="form.dateNaissance"
    label="Date de naissance"
    type="date"
  />
  <VSelect
    v-model="form.genre"
    :items="Object.values(Genre)"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    aria-label="Genre"
    label="Genre"
  />
  <VSelect
    v-model="form.famille"
    :items="familles"
    item-title="nom"
    item-value="id"
    :return-object="false"
    aria-label="Famille"
    label="Famille"
  />
</template>
