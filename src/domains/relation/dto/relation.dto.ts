import type {TypeRelation} from '../enum/typeRelation.enum'
import type {AbstractDTO} from '~/domains/dto.abstract'
import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export interface RelationDto extends AbstractDTO {
  personne: PersonneDto
  type: TypeRelation
  relatedPersonne: PersonneDto
}
