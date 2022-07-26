import { UserRole } from '../enums/user-role'

export class User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole

  constructor (id: string, email: string, firstName: string, lastName: string, role: UserRole) {
    this.id = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
  }
}
