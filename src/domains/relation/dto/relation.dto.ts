import type {TypeRelation} from '../enum/typeRelation.enum'
import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'
import type {AbstractDto} from '~/domains/AbstractDto'

export interface RelationDto extends AbstractDto {
  personnage: PersonnageDto
  type: TypeRelation
  relatedPersonnage: PersonnageDto
}
