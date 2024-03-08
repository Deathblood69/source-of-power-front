export interface PaginedQuery<T> {
  data: T[]
  meta: {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: [nom: keyof T, 'ASC' | 'DESC'][]
  }
  links: {
    current: 'http://localhost:8080/api/famille?page=1&limit=20&sortBy=nom:ASC'
  }
}
