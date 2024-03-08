import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'

export interface MembreFamille extends PersonnageDto {
  pids: string[]
  mid: string
  fid: string
  divorced: string[]
}
