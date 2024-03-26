<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import SelectFamille from '~/domains/famille/SelectFamille.vue'
  import {DEFAUT_FAMILLE} from '~/domains/famille/constants/defautFamille.const'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
  import type {RelationDto} from '~/domains/relation/dto/relation.dto'
  import {Genre} from '~/domains/personne/enum/genre.enum'

  const query = ref({
    limit: 10,
    page: 1,
    sortBy: '',
  })

  const {data: response} = useFetchService<PaginedQuery<FamilleDto>>(
    API.famille,
    {
      method: METHODE_HTTP.GET,
      query: query,
      watch: [query],
    },
  )

  /**  EMITS  **/

  /**  REFS  **/

  const familleId = ref<string>('')

  /**  COMPUTED   **/

  const items = computed(() => {
    return response.value?.data ?? []
  })

  const selectedFamille = computed(() => {
    const famille = items.value.find((item) => item.id === familleId.value)
    return famille ? formatterFamille(famille) : undefined
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/

  function formatterFamille(famille: FamilleDto) {
    return famille.membres.map((membre: PersonneDto) => {
      const parents = membre.relations.filter(
        (e) => e.type === TypeRelation.ENFANT,
      )
      const pere = parents.find((relation: RelationDto) => {
        return relation.relatedPersonne.genre === Genre.HOMME
      })?.relatedPersonne.id

      const mere = parents.find((relation: RelationDto) => {
        return relation.relatedPersonne.genre === Genre.FEMME
      })?.relatedPersonne.id

      return {
        id: membre.id,
        nom: membre.nom,
        prenom: membre.prenom,
        fid: pere,
        mid: mere,
      }
    })
  }
</script>

<template>
  <VContainer>
    <SelectFamille
      v-model="familleId"
      :familles="items"
    />
    <pre>
      {{ selectedFamille }}
    </pre>
    <AppArbreFamille
      v-if="selectedFamille"
      v-model="selectedFamille"
    />
  </VContainer>
</template>

<style scoped></style>
