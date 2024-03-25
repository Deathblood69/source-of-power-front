<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import type {ReadonlyHeaders} from '~/types/headers'
  import FormulairePersonne from '~/domains/personne/FormulairePersonne.vue'
  import SupprimerPersonne from '~/domains/personne/SupprimerPersonne.vue'
  import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
  import {DEFAUT_PERSONNE} from '~/domains/personne/constants/defautPersonne.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {LoadItems} from '~/types/loadItems'

  /**  REFS  **/

  const openFormulaire = ref<boolean>(false)
  const openSupprimer = ref<boolean>(false)

  const headers = ref<ReadonlyHeaders>([
    {
      title: 'Nom',
      key: 'nom',
      align: 'start',
      sortable: true,
    },
    {
      title: 'Prénom',
      key: 'prenom',
      align: 'start',
      sortable: true,
    },
    {
      title: 'Date de naissance',
      key: 'dateNaissance',
      align: 'start',
      sortable: true,
    },
    {
      title: 'Genre',
      key: 'genre',
      align: 'start',
      sortable: true,
    },
  ])

  const personne = ref<PersonneDto>()

  const query = ref({
    limit: 10,
    page: 1,
    sortBy: '',
  })

  const {
    data: response,
    pending,
    refresh,
  } = useFetch<PaginedQuery<FamilleDto>>(API.personne, {
    method: METHODE_HTTP.GET,
    query: query,
    watch: [query],
  })

  /**  COMPUTED   **/

  const items = computed(() => {
    return response.value?.data ?? []
  })

  const totalItems = computed(() => {
    return response.value?.meta.totalItems ?? -1
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/

  function handleFormulaire(familleValue: PersonneDto) {
    personne.value = {...familleValue}
    openFormulaire.value = true
  }

  function handleDelete(familleValue: PersonneDto) {
    personne.value = {...familleValue}
    openSupprimer.value = true
  }

  async function handleValidate() {
    await refresh()
  }

  function handleRefresh(params: LoadItems) {
    // Met à jour la page
    query.value.page = params.page

    // Met à jour le nombre d'éléments par page
    query.value.limit = params.itemsPerPage

    // Met à jour le tri
    if (params.sortBy.length > 0) {
      const replacedSortBy = params?.sortBy[0]?.key?.replace(/\[\d+]/g, '')
      query.value.sortBy = `${replacedSortBy}:${params.sortBy[0].order.toUpperCase()}`
    } else {
      query.value.sortBy = ''
    }
  }
</script>

<template>
  <VContainer class="container">
    <VContainer class="boutons">
      <VBtn
        text="Rafraichir"
        @click="refresh"
      />
      <VBtn
        text="Créer une personne"
        @click="handleFormulaire(DEFAUT_PERSONNE)"
      />
    </VContainer>
    <AppDataTable
      :headers="headers"
      :items="items"
      :total-items="totalItems"
      :loading="pending"
      :items-per-page="query.limit"
      :page="query.page"
      :refresh="handleRefresh"
    >
      <template #actions="{item}">
        <VBtn
          icon="mdi-pencil"
          @click="handleFormulaire(item)"
        />
        <VBtn
          icon="mdi-delete"
          @click="handleDelete(item)"
        />
      </template>
    </AppDataTable>
    <FormulairePersonne
      v-if="openFormulaire && personne"
      v-model="openFormulaire"
      :personne="personne"
      @validate="handleValidate"
    />
    <SupprimerPersonne
      v-if="openSupprimer && personne"
      v-model="openSupprimer"
      :personne="personne"
      @validate="handleValidate"
    />
  </VContainer>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .boutons {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }
</style>
