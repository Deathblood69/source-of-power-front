<script setup lang="ts">
  import type {ReadonlyHeaders} from '~/types/headers'

  /**  PROPS  **/

  interface Props {
    headers: ReadonlyHeaders
    items: any[]
    totalItems: number
    itemsPerPage: number
    loading: boolean
    search?: string
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
    item-value="name"
  >
    <template #item.actions="{item}">
      <slot
        :item="item"
        name="actions"
      />
    </template>
  </VDataTableServer>
</template>

<style scoped></style>
