import type {ListItem} from '~/types/listItem'
import {PATHS} from '~/constants/paths.const'

export const MENU_ITEMS = ref<ListItem[]>([
  {
    icon: 'mdi-home-variant',
    libelle: 'Accueil',
    path: PATHS.accueil,
  },
  {
    icon: 'mdi-account',
    libelle: 'Personnes',
    path: PATHS.personne,
  },
  {
    icon: 'mdi-link-variant',
    libelle: 'Relations',
    path: PATHS.relation,
  },
  {
    icon: 'mdi-human-male-female-child',
    libelle: 'Familles',
    path: PATHS.famille,
  },
])
