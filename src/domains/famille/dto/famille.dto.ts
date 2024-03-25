import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'

export interface FamilleDto {
  id?: string
  nom: string
  membres: PersonnageDto[]
}
