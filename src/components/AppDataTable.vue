<script setup lang="ts">
  import type {ReadonlyHeaders} from '~/types/headers'
  import type {LoadItems} from '~/types/loadItems'

  /**  PROPS  **/

  interface Props {
    headers: ReadonlyHeaders
    items: any[]
    totalItems: number
    itemsPerPage: number
    loading: boolean
    search?: string
    page?: number
    error?: boolean
    refresh?: (params: LoadItems) => void
  }

  const props = defineProps<Props>()

  /**  EMITS  **/

  /**  REFS  **/

  /**  COMPUTED   **/

  const tableHeaders = computed(() => {
    return (
      props.headers?.concat([
        {
          title: 'Actions',
          key: 'actions',
          align: 'end',
          sortable: false,
          minWidth: '160px',
        },
      ]) ?? []
    )
  })

  const keys = computed(() => {
    return tableHeaders.value?.map((header: {key: string}) => header.key) || []
  })

  /**  LIFECYCLE  **/

  /**  METHODS  **/
</script>

<template>
  <VDataTableServer
    :headers="tableHeaders"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :search="search"
    :page="page"
    item-value="name"
    @update:options="refresh"
  >
    <template v-slot:no-data>
      <VAlert
        v-if="error"
        variant="text"
        type="error"
        text="Erreur lors de la récupération des données."
      />
      <VAlert
        v-else
        variant="text"
        type="warning"
        text="Aucune donnée."
      />
    </template>
    <template
      v-for="key in keys"
      v-slot:[`item.${key}`]="props"
    >
      <slot
        :name="key"
        v-bind="props"
      >
        {{ props.value }}
      </slot>
    </template>
  </VDataTableServer>
</template>
