import type {AbstractDTO} from '~/domains/dto.abstract'

export interface RelationDto extends AbstractDTO {
  personne: string
  type: string
  relatedPersonne: string
}
