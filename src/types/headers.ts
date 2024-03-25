import type {VDataTable} from 'vuetify/lib/components/index.mjs'

/**
 * DataTable headers. See https://vuetifyjs.com/en/components/data-tables/basics/#keys-and-values
 */
// @ts-ignore
export type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers']
