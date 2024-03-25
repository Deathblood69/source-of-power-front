import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export interface FamilleDto {
  id?: string
  nom: string
  membres: PersonneDto[]
}
