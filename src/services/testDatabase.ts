/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { injectable } from '../ioc'
import { Account } from '../models/account'
import { Database } from '../models/database'
import { filter, find, isString, isUndefined } from 'lodash'

export { Account, Database }

const account = require('../../data/source/account.json')

@injectable()
export class TestDatabase implements Database {

  public accountById = async(accountId: string): Promise<Account | null> => {
    const query = {_id: accountId}

    return this.getCollection()
      .then((collection: Array<Account>) => {
        return find(collection, query) as Account | undefined
      })
      .then((result?: Account) => {
        if(isUndefined(result)) {
          return null
        }

        return result
      })
  }

  public accountList = async(category?: string | null): Promise<Array<Account>> => {
    const query = isString(category) ? {category: category} : {}

    return this.getCollection()
      .then((collection: Array<Account>) => {
        return filter(collection, query) as Array<Account> | undefined
      })
      .then((result?: Array<Account>) => {
        if(isUndefined(result)) {
          return []
        }

        return result
      })
  }

  private getCollection = async(): Promise<Array<Account>> => {
    return Promise.resolve(account)
  }

}
