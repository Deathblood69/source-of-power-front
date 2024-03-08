import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'
import {type Genre} from '~/domains/personnage/enum/genre.enum'
import type {RelationDto} from '~/domains/relation/dto/relation.dto'

export class MembreFamille implements PersonnageDto {
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
    personnage: PersonnageDto,
    pids: string[],
    mid: string,
    fid: string,
    divorced: string[],
  ) {
    this.id = personnage.id
    this.nom = personnage.nom
    this.prenom = personnage.prenom
    this.dateNaissance = personnage.dateNaissance
    this.genre = personnage.genre
    this.famille = personnage.famille
    this.relations = personnage.relations
    this.pids = pids
    this.mid = mid
    this.fid = fid
    this.divorced = divorced
  }
}
