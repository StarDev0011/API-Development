/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import config from 'config'
import {find, isNull, isString, isUndefined, startsWith, trim} from 'lodash'
import {Collection, Db, MongoClient, ObjectId} from 'mongodb'
import {Account, AccountView} from '../models/account'

export {Account, AccountView}

const accounts: Array<Account> = require('../../data/source/account.json')

async function findSampleAccount(accountId: string): Promise<Account> {
  return Promise
  .resolve(find(accounts, ['_id.$oid', accountId]))
  .then((result: Account | undefined) => {
    if(isUndefined(result)) {
      throw new Error(`Cannot locate account with ID ${accountId}`)
    } else {
      return result
    }
  })
}

export class AccountService {
  private accountCollection: Collection | undefined

  constructor(collectionName: string = 'account') {
    const dbUrl = process.env.NJCDD_MONGODB_URI

    console.log(dbUrl)
    if(isString(dbUrl) && startsWith(dbUrl, 'mongodb')) {
      this.connectToDatabase(dbUrl, collectionName)
      .then((collection: Collection) => {
        this.accountCollection = collection
      })
    }
  }

  public accountList = async(): Promise<Array<Account>> => {
    return Promise
    .resolve(this.accountCollection)
    .then(async(accountCollection: Collection | undefined) => {
      if(isUndefined(accountCollection)) {
        console.log(`Returning list from test data`)
        return accounts as Array<Account>
      } else {
        try {
          console.log(`Running list query against db collection '${accountCollection.collectionName}'`)
          return (await accountCollection.find({}).toArray()) as unknown as Array<Account>
        } catch(error) {
          console.error(error)
          throw error
        }
      }
    })
    .then((result: Array<Account>) => {
      console.log(`Returning list of ${result.length} accounts`)
      return result
    })
  }

  public getAccount = async(accountId: string): Promise<Account | null> => {
    return Promise
    .resolve(this.accountCollection)
    .then(async(accountCollection: Collection | undefined) => {
      if(isUndefined(accountCollection)) {
        console.log(`Returning account from test data`)
        return findSampleAccount(accountId)
      } else {
        const query = {
          _id: new ObjectId(accountId)
        }

        console.log(`Running account query for id ${accountId}`)
        return (await accountCollection.findOne(query)) as unknown as Account
      }
    })
  }

  public view = async(category?: string | null): Promise<Array<AccountView>> => {
    return Promise
    .resolve(this.accountCollection)
    .then((accountCollection: Collection | undefined) => {
      if(isUndefined(accountCollection)) {
        throw new Error('Query on test data is not enabled')
      }

      return accountCollection
    })
    .then(async(accountCollection: Collection) => {
      console.log(`Running query  for '${category ?? "*"}' against db view '${accountCollection.collectionName}'`)

      const query: object = !isString(category) || trim(category).length == 0 ?
        {} :
        {category: trim(decodeURIComponent(category))}
      return (await accountCollection.find(query).toArray()) as unknown as Array<AccountView>
    })
    .then((result: Array<AccountView>) => {
      return result
    })
  }

  private connectToDatabase = async(dbUrl: string, collection: string = 'account'): Promise<Collection> => {
    return Promise
    .resolve(new MongoClient(dbUrl))
    .then((client: MongoClient | undefined | null) => {
      if(isUndefined(client) || isNull(client)) {
        throw new Error('Invalid database connection string')
      }

      return client.connect()
    })
    .then((connectedClient: MongoClient | undefined | null) => {
      if(isUndefined(connectedClient) || isNull(connectedClient)) {
        throw new Error('Failed to connect to database')
      }

      return connectedClient.db(config.get('api.mongodb.database'))
    })
    .then((db: Db) => {
      return db.collection(config.get(`api.mongodb.collections.${collection}`))
    })
  }
}
