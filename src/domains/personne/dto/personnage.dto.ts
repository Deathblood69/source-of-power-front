import type {RelationDto} from '~/domains/relation/dto/relation.dto'
import type {AbstractDTO} from '~/domains/dto.abstract'
import {Genre} from '~/domains/personnage/enum/genre.enum'

export interface PersonnageDto extends AbstractDTO {
  nom: string
  prenom: string
  dateNaissance: string
  famille: string
  genre: Genre
  relations: RelationDto[]
}
