export class User {
  id: string
  email: string
  firstName: string
  lastName: string

  constructor (id: string, email: string, firstName: string, lastName: string) {
    this.id = id
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
  }
}
