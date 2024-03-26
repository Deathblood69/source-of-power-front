<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
  import type {ReadonlyHeaders} from '~/types/headers'
  import {DEFAUT_RELATION} from '~/domains/relation/constants/defautRelation.const'
  import {preparerLibelleRelation} from '~/domains/relation/utils/getLibelleRelationByGenre'
  import type {RelationCreateDto} from '~/domains/relation/dto/relationCreate.dto'

  /**  REFS  **/

  const form = ref<RelationCreateDto>({...DEFAUT_RELATION})

  const headers = ref<ReadonlyHeaders>([
    {
      title: 'Type de relation',
      key: 'type',
      align: 'start',
      sortable: true,
    },
    {
      title: 'Nom',
      key: 'relatedPersonne.nom',
      align: 'start',
      sortable: true,
    },
    {
      title: 'Prénom',
      key: 'relatedPersonne.prenom',
      align: 'start',
      sortable: true,
    },
  ])

  /**  REQUETES  **/

  // Récupération de la liste des personnes

  const {data: getPersonnes, refresh: refreshPersonne} = useFetchService<
    PaginedQuery<PersonneDto>
  >(API.personne, {
    method: METHODE_HTTP.GET,
  })

  // Récupération des relations d'une personne

  const queryRelations = computed(() => {
    return {['filter.personne.id']: `$eq:${form.value.personne}`}
  })

  const {data: getRelations, refresh: refreshRelations} = useFetchService<
    PaginedQuery<PersonneDto>
  >(API.relation, {
    method: METHODE_HTTP.GET,
    query: queryRelations,
    immediate: false,
  })

  // Création d'une relation

  const {refresh: refreshCreate} = useFetchService<PaginedQuery<PersonneDto>>(
    API.relation,
    {
      method: METHODE_HTTP.POST,
      body: form,
      immediate: false,
    },
  )

  /**  COMPUTED   **/

  const personnes = computed(() => {
    return (
      getPersonnes.value?.data.filter(
        (e) => e.id !== form.value.relatedPersonne,
      ) ?? []
    )
  })

  const relatedPersonnes = computed(() => {
    return (
      getPersonnes.value?.data.filter((e) => e.id !== form.value.personne) ?? []
    )
  })

  const relationsPersonne = computed(() => {
    return getRelations.value?.data ?? []
  })

  const idPersonne = computed(() => {
    return form.value.personne
  })

  /**  LIFE CYCLE   **/

  watch(idPersonne, () => {
    if (idPersonne.value) {
      refreshRelations()
    }
  })

  /**  METHODS  **/

  async function addRelation() {
    await refreshCreate()
    await refreshRelations()
  }

  async function resetForm() {
    form.value = {...DEFAUT_RELATION}
    await refreshPersonne()
  }

  function itemsPropsPersonne(item: PersonneDto) {
    return item
      ? {
          title: `${item.nom} ${item.prenom}`,
          subtitle: '',
        }
      : {title: '', subtitle: ''}
  }

  function itemPropsRelation(relation: TypeRelation, personneId: string) {
    return {
      title: preparerLibelleRelation(personnes.value, relation, personneId),
      subtitle: '',
    }
  }
</script>

<template>
  <VContainer class="container">
    <h2>Gestion des relations</h2>
    <VContainer>
      <VRow
        no-gutters
        class="gap"
      >
        <VCol
          cols="12"
          sm="3"
        >
          <VSelect
            v-model="form.personne"
            label="Personne 1"
            :items="personnes"
            :item-props="itemsPropsPersonne"
            item-value="id"
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <VSelect
            v-model="form.type as TypeRelation"
            label="Relation"
            :items="Object.values(TypeRelation)"
            :item-props="(item) => itemPropsRelation(item, form.personne)"
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <VSelect
            v-model="form.relatedPersonne"
            label="Personne 2"
            :items="relatedPersonnes"
            :item-props="itemsPropsPersonne"
            item-value="id"
          />
        </VCol>
        <VCol
          cols="12"
          sm="2"
          style="
            display: flex;
            flex-direction: row;
            gap: 1em;
            justify-content: center;
          "
        >
          <VBtn
            text="Ajouter"
            @click="addRelation"
          />
          <VBtn
            text="Reset"
            @click="resetForm"
          />
        </VCol>
      </VRow>
    </VContainer>
    <VDataTableVirtual
      v-if="relationsPersonne"
      :headers="headers"
      :items="relationsPersonne"
    />
  </VContainer>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .gap {
    gap: 1em;
  }
</style>
