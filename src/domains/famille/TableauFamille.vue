<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import type {ReadonlyHeaders} from '~/types/headers'
  import FormulaireFamille from '~/domains/famille/FormulaireFamille.vue'
  import SupprimerFamille from '~/domains/famille/SupprimerFamille.vue'
  import {DEFAUT_FAMILLE} from '~/domains/famille/constants/defautFamille.const'
  import {METHODE_HTTP} from '~/constants/methodeHTTP.enum'
  import type {LoadItems} from '~/types/loadItems'

  const query = ref({
    limit: 10,
    page: 1,
    sortBy: '',
  })

  const {
    data: response,
    error,
    pending,
    refresh,
  } = useFetchService<PaginedQuery<FamilleDto>>(API.famille, {
    method: METHODE_HTTP.GET,
    query: query,
    watch: [query],
  })

  /**  EMITS  **/

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
  ])

  const famille = ref<FamilleDto>()

  /**  COMPUTED   **/

  const items = computed(() => {
    return response.value?.data ?? []
  })

  const totalItems = computed(() => {
    return response.value?.meta.totalItems || -1
  })

  const itemsPerPage = computed(() => {
    return response.value?.meta.itemsPerPage || -1
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/

  function handleFormulaire(familleValue: FamilleDto) {
    famille.value = {...familleValue}
    openFormulaire.value = true
  }

  function handleDelete(familleValue: FamilleDto) {
    famille.value = {...familleValue}
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
        text="Créer une famille"
        @click="handleFormulaire(DEFAUT_FAMILLE)"
      />
    </VContainer>
    <AppDataTable
      :headers="headers"
      :items="items"
      :total-items="totalItems"
      :error="Boolean(error)"
      :loading="pending"
      :items-per-page="itemsPerPage"
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
    <FormulaireFamille
      v-if="openFormulaire && famille"
      v-model="openFormulaire"
      :famille="famille"
      @validate="handleValidate"
    />
    <SupprimerFamille
      v-if="openSupprimer && famille"
      v-model="openSupprimer"
      :famille="famille"
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
