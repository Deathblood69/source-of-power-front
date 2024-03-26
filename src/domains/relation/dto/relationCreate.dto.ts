import type {AbstractDTO} from '~/domains/dto.abstract'
import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export interface RelationCreateDto extends AbstractDTO {
  personne: string
  type: string
  relatedPersonne: string
}
