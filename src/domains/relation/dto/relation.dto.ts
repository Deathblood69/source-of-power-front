import type {TypeRelation} from '../enum/typeRelation.enum'
import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'
import type {AbstractDTO} from '~/domains/dto.abstract'

export interface RelationDto extends AbstractDTO {
  personnage: PersonnageDto
  type: TypeRelation
  relatedPersonnage: PersonnageDto
}
