import {type Genre} from '~/domains/personne/enum/genre.enum'
import type {RelationDto} from '~/domains/relation/dto/relation.dto'
import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export class MembreFamille implements PersonneDto {
  id: string
  nom: string
  prenom: string
  dateNaissance: string
  genre: Genre
  famille: string
  relations: RelationDto[]

  pids: string[]
  mid: string
  fid: string
  divorced: string[]

  constructor(
    personne: PersonneDto,
    pids: string[],
    mid: string,
    fid: string,
    divorced: string[],
  ) {
    this.id = personne.id
    this.nom = personne.nom
    this.prenom = personne.prenom
    this.dateNaissance = personne.dateNaissance
    this.genre = personne.genre
    this.famille = personne.famille
    this.relations = personne.relations
    this.pids = pids
    this.mid = mid
    this.fid = fid
    this.divorced = divorced
  }
}
