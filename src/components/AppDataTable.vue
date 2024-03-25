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
    <template #item.actions="{item}">
      <slot
        :item="item"
        name="actions"
      />
    </template>
  </VDataTableServer>
</template>
