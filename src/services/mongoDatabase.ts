/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import config from 'config'
import { isNull, isUndefined } from 'lodash'
import { Collection, Db, Document, MongoClient, ObjectId } from 'mongodb'
import { injectable } from '../ioc'
import { Account, AccountView } from '../models/account'
import { Database } from '../models/database'

export { Account, AccountView, Database }

const mongodbUrl: string = config.get('api.database.mongodb.url')
const databaseName: string = config.get('api.database.name')
const accountCollectionName: string = config.get('api.database.table.account')
const accountViewCollectionName: string = config.get('api.database.table.accountView')

@injectable()
export class MongoDatabase implements Database {
  private readonly mongoClient: MongoClient
  private readonly db: Db

  constructor() {
    this.mongoClient = new MongoClient(mongodbUrl)
    this.db = this.mongoClient.db(databaseName)
  }

  public get databaseName(): string | null {
    return (this.db && this.db.databaseName) || null
  }

  public accountById = async(accountId: string): Promise<Account | null> => {
    return Promise
      .resolve(this.db.collection(accountCollectionName))
      .then((collection: Collection) => {
        const query = {
          _id: new ObjectId(accountId),
        }

        return collection.findOne(query)
      })
      .then((document: Document | null) => {
        return isNull(document) ? null : document as Account
      })
  }

  public accountList = async <T extends Account | AccountView>(category?: string | null): Promise<Array<T>> => {
    const collectionName: string = isUndefined(category) ? accountCollectionName : accountViewCollectionName

    return Promise
      .resolve(this.db.collection(collectionName))
      .then((collection: Collection) => {
        return collection.find({}).toArray()
      })
      .then((documents: Array<Document>) => {
        return documents as Array<T>
      })
  }

}
