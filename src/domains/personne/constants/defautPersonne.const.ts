import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'
import {Genre} from '~/domains/personne/enum/genre.enum'

export const DEFAUT_PERSONNE: PersonneDto = {
  nom: '',
  prenom: '',
  dateNaissance: '',
  genre: Genre.HOMME,
  famille: '',
  relations: [],
}
