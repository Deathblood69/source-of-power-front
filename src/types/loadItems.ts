import type {Sort} from '~/types/sort'

export interface LoadItems {
  page: number
  itemsPerPage: number
  sortBy: Sort[]
  groupBy?: string[]
  search?: string
}
