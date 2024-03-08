import type {RelationDto} from '~/domains/relation/dto/relation.dto'
import type {AbstractDto} from '~/domains/AbstractDto'

export interface PersonnageDto extends AbstractDto {
  nom: string
  prenom: string
  dateNaissance: string
  famille: string
  relations: RelationDto[]
}
