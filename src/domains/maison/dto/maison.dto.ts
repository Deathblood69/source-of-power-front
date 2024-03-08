import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'

export interface MaisonDto {
  nom: string
  personnages: PersonnageDto[]
}
