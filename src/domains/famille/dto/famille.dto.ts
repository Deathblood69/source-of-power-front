import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
import type {AbstractDTO} from '~/domains/dto.abstract'

export interface FamilleDto extends AbstractDTO {
  nom: string
  membres: PersonneDto[]
}
