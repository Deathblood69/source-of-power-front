import {Genre} from '~/domains/personne/enum/genre.enum'
import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
import type {PersonneDto} from '~/domains/personne/dto/personnage.dto'

export function preparerLibelleRelation(
  personnes: PersonneDto[],
  relation: TypeRelation,
  personneId: string,
) {
  const personne = personnes.find((item) => item.id === personneId)
  const typesRelations = getLibelleRelationByGenre(personne?.genre)

  let libelle = ''
  switch (relation) {
    case TypeRelation.PARENT:
      libelle = typesRelations.parent
      break
    case TypeRelation.ENFANT:
      libelle = typesRelations.enfant
      break
    case TypeRelation.MARIAGE:
      libelle = typesRelations.mariage
      break
    case TypeRelation.DIVORCE:
      libelle = typesRelations.divorce
  }
  return libelle
}

function getLibelleRelationByGenre(genre?: Genre) {
  const libelle = {
    parent: '',
    enfant: '',
    mariage: '',
    divorce: '',
  }
  switch (genre) {
    case Genre.HOMME:
      libelle.parent = 'Père de'
      libelle.enfant = 'Fils de'
      libelle.mariage = 'Marié à'
      libelle.divorce = 'Divorcé de'
      break
    case Genre.FEMME:
      libelle.parent = 'Mere de'
      libelle.enfant = 'Fille de'
      libelle.mariage = 'Mariée à'
      libelle.divorce = 'Divorcée de'
      break
    default:
      libelle.parent = 'Parent de'
      libelle.enfant = 'Enfant de'
      libelle.mariage = 'Marié à'
      libelle.divorce = 'Divorcé de'
      break
  }
  return libelle
}
