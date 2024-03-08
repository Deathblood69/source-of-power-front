import type {AbstractDTO} from '~/domains/dto.abstract'

export interface UserDTO extends AbstractDTO {
  lastName: string
  firstName: string
  username: string
  password: string
}
