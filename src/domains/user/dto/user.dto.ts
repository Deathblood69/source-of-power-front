import type {AbstractDto} from '~/domains/AbstractDto'

export interface UserDTO extends AbstractDto {
  lastName: string
  firstName: string
  username: string
  password: string
}
