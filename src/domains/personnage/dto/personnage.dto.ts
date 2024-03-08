import type {RelationDto} from '~/domains/relation/dto/relation.dto'
import type {AbstractDto} from '~/domains/AbstractDto'
import {Genre} from "~/domains/personnage/enum/genre.enum";

export interface PersonnageDto extends AbstractDto {
  nom: string
  prenom: string
  dateNaissance: string
  famille: string
  genre: Genre
  relations: RelationDto[]
}
