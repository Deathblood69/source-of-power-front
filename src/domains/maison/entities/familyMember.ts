import type {PersonnageDto} from '~/domains/personnage/dto/personnage.dto'

export interface FamilyMember extends PersonnageDto {
  pids: string[]
  mid: string
  fid: string
  divorced: string[]
}
