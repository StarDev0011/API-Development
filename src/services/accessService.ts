import { filter, first, get, has, isArray, lowerCase, split, toString, values } from 'lodash'
import isEmail from 'validator/lib/isEmail'
import { Access, AccessCredentials, AccessRegister, AccessUser, AcknowledgeRequest } from '../models/access'

export { Access, AccessCredentials, AccessRegister, AccessUser, AcknowledgeRequest }

const accessData: Record<string, Access> = require('../../data/source/access.json')

export class AccessService {
  public async authenticate(credentials: AccessCredentials): Promise<Access> {
    return Promise
      .resolve(lowerCase(first(split(credentials.userName, '@'))))
      .then((password) => {
        if(lowerCase(credentials.password) !== password) {
          throw new Error('Cannot locate this user name or password')
        }

        return
      })
      .then(() => {
        return has(accessData, credentials.userName)
      })
      .then((isExising: boolean) => {
        if(!isExising) {
          throw new Error('Cannot locate this user name or password')
        }

        return get(accessData, credentials.userName) as Access
      })
      .then((result: Access) => {
        return result
      })
  }

  public async forgotPassword(user: AccessUser): Promise<boolean> {
    return Promise
      .resolve(has(accessData, user.userName))
      .then((result: boolean) => {
        return result
      })
  }

  public async listStaff(): Promise<Array<Access>> {
    return Promise.resolve(this.staff())
  }

  public async registerContact(register: AccessRegister): Promise<AccessService> {
    return Promise
      .resolve(has(accessData, register.userName))
      .then((result: boolean) => {
        if(result) {
          throw new Error(`Account ${register.userName} already exists`)
        }

        return
      })
      .then(() => {
        if(!isEmail(register.userName)) {
          throw new Error('User name must be a valid email address')
        }

        return
      })
      .then(() => {
        if(!toString(register.firstName).match(/^[a-z]+[a-z -']*[a-z]+$/gi)) {
          throw new Error(`Invalid first name: ${register.firstName}`)
        }

        return
      })
      .then(() => {
        if(!toString(register.lastName).match(/^[a-z]+[a-z -']*[a-z]+$/gi)) {
          throw new Error(`Invalid last name: ${register.firstName}`)
        }

        return new AccessService()
      })
  }

  private staff(): Array<Access> {
    return filter(values<Access>(accessData), (access: Access) => {
      return isArray(access.roles) && access.roles.length > 0
    })
  }

}
