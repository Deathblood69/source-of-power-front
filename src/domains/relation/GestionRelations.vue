<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import {API} from '~/constants/api.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
  import type {ReadonlyHeaders} from '~/types/headers'
  import {Genre} from '~/domains/personne/enum/genre.enum'
  import type {RelationDto} from '~/domains/relation/dto/relation.dto'

  /**  REFS  **/

  const form = ref<RelationDto>({
    personne: '',
    type: '',
    relatedPersonne: '',
  })

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

  const {data: responsePersonnes} = useFetchService<PaginedQuery<PersonneDto>>(
    API.personne,
    {
      method: METHODE_HTTP.GET,
    },
  )

  const queryRelations = computed(() => {
    return {['filter.personne.id']: `$eq:${form.value.personne}`}
  })

  const {data: responseRelations, refresh} = useFetchService<
    PaginedQuery<PersonneDto>
  >(API.relation, {
    method: METHODE_HTTP.GET,
    query: queryRelations,
    immediate: false,
  })

  /**  COMPUTED   **/

  const personnes = computed(() => {
    return responsePersonnes.value?.data ?? []
  })

  const relations = computed(() => {
    return Object.values(TypeRelation)
  })

  const relationsPersonne = computed(() => {
    return responseRelations.value?.data ?? []
  })

  watch(form.value, () => {
    if (form.value.personne) {
      refresh()
    }
  })

  /**  METHODS  **/

  function addRelation() {
    console.log(form.value)
  }

  function getLibelleRelationByGenre(genre?: Genre) {
    const libelle = {
      parent: '',
      enfant: '',
      mariage: '',
      divorce: '',
    }
    switch (genre) {
      case Genre.HOMME:
        libelle.parent = 'Père de'
        libelle.enfant = 'Fils de'
        libelle.mariage = 'Marié à'
        libelle.divorce = 'Divorcé de'
        break
      case Genre.FEMME:
        libelle.parent = 'Mere de'
        libelle.enfant = 'Fille de'
        libelle.mariage = 'Mariée à'
        libelle.divorce = 'Divorcée de'
        break
      default:
        libelle.parent = 'Parent de'
        libelle.enfant = 'Enfant de'
        libelle.mariage = 'Marié à'
        libelle.divorce = 'Divorcé de'
        break
    }
    return libelle
  }

  function preparerLibelleRelation(relation: TypeRelation, personneId: string) {
    const personne = personnes.value.find((item) => item.id === personneId)
    const typesRelations = getLibelleRelationByGenre(personne?.genre)

    let libelle = ''
    switch (relation) {
      case TypeRelation.PARENT:
        libelle = typesRelations.parent
        break
      case TypeRelation.ENFANT:
        libelle = typesRelations.enfant
        break
      case TypeRelation.MARIAGE:
        libelle = typesRelations.mariage
        break
      case TypeRelation.DIVORCE:
        libelle = typesRelations.divorce
    }
    return libelle
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
      title: preparerLibelleRelation(relation, personneId),
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
        class="personnes"
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
            :items="relations"
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
            :items="personnes"
            :item-props="itemsPropsPersonne"
            item-value="id"
          />
        </VCol>
        <VCol
          cols="12"
          sm="2"
        >
          <VBtn
            text="Ajouter"
            @click="addRelation"
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
    gap: 1em;
  }

  .personnes {
    gap: 1em;
  }
</style>
