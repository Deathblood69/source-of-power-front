import type {ListItem} from '~/types/listItem'
import {PATHS} from '~/constants/paths.const'

export const MENU_ITEMS = ref<ListItem[]>([
  {
    icon: 'mdi-home-variant',
    libelle: 'Accueil',
    path: PATHS.accueil,
  },
  {
    icon: 'mdi-family-tree',
    libelle: 'Famille',
    path: PATHS.famille,
  },
  {
    icon: 'mdi-account',
    libelle: 'Compte',
    path: '/compte',
  },
])
