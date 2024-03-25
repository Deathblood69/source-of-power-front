<script setup lang="ts">
  /**  PROPS  **/
  import type {PaginedQuery} from '~/types/paginedQuery'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import {API} from '~/constants/api.const'
  import type {ReadonlyHeaders} from '~/types/headers'
  import FormulairePersonne from '~/domains/personne/FormulairePersonne.vue'
  import SupprimerPersonne from '~/domains/personne/SupprimerPersonne.vue'
  import {DEFAUT_FAMILLE} from '~/domains/famille/constants/defautFamille.const'

  const {
    data: response,
    pending,
    refresh,
    execute,
  } = useFetchService<PaginedQuery<FamilleDto>>(API.personne)

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
    console.log('test')
    execute()
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
      :loading="pending"
      :items-per-page="itemsPerPage"
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
      v-if="openFormulaire && famille"
      v-model="openFormulaire"
      :famille="famille"
      @validate="handleValidate"
    />
    <SupprimerPersonne
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
