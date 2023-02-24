/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { ObjectId } from 'mongodb'
import { concat, filter, find, findIndex, get, isPlainObject, isString, isUndefined, pullAt } from 'lodash'
import { injectable } from '../ioc'
import { Account } from '../models/account'
import { Database } from '../models/database'
import { Query } from '../models/search'

export { Account, Database, Query }

const account = require('../../data/source/account.json')
let queryCatalog = require('../../data/source/query.json') as Array<Query>


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

  public queryItem = async(queryId: string): Promise<Query | null> => {
    return Promise
      .resolve(find<Query>(queryCatalog, {_id: queryId}))
      .then((result?: Query) => {
        return result ?? null
      })
  }

  public queryList = async(): Promise<Array<Query>> => {
    return Promise
      .resolve(queryCatalog || [])
  }

  public querySave = async(query: Query): Promise<string> => {
    return Promise.resolve(isPlainObject(query))
      .then((isOkQuery: boolean) => {
        if(!isOkQuery) {
          throw new Error('Cannot save invalid query')
        }

        return get(query, '_id', new ObjectId().toString('hex')) as string
      })
      .then((_id: string) => {
        const index = findIndex(queryCatalog, {_id: _id})

        if(index >= 0) {
          pullAt(queryCatalog, [index])
        }

        query._id = _id
        queryCatalog = concat(queryCatalog, query)
        return _id
      })
  }

  private getCollection = async(): Promise<Array<Account>> => {
    return Promise.resolve(account)
  }
}
