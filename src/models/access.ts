export interface Access {
  dn: string
  firstNamae: string
  lastName: string
  displayName: string
  mail: string
  account: string
  roles: Array<Role>
  isAuthenticated?: boolean
}

export interface AccessCredentials extends AccessUser {
  password: string
}

export interface AccessRegister extends AccessUser {
  firstName: string,
  lastName: string
}

export interface AccessUser {
  userName: string
}

export class AcknowledgeRequest {
  message: string = 'Request received'
}

export enum Role {
  admin,
  manager,
  operator
}

