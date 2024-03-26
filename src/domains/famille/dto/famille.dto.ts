import type {AbstractDTO} from '~/domains/dto.abstract'

export interface FamilleDto extends AbstractDTO {
  nom: string
  membres: string[]
}
