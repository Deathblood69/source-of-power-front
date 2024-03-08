import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'

export interface FamilleDto {
  nom: string
  membres: PersonnageDto[]
}
