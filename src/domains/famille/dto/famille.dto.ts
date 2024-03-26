import type {AbstractDTO} from '~/domains/dto.abstract'
import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export interface FamilleDto extends AbstractDTO {
  nom: string
  membres: PersonneDto[]
}
