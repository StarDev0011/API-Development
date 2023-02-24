/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import config from 'config'
import { get, isNull, isString, isUndefined, unset } from 'lodash'
import { Collection, Db, Document, MongoClient, ObjectId } from 'mongodb'
import { injectable } from '../ioc'
import { Account } from '../models/account'
import { Database } from '../models/database'
import { Query } from '../models/search'

export { Account, Database }

const databaseName: string = config.get('api.database.name')
const accountCollectionName: string = config.get('api.database.table.account')
const accountViewCollectionName: string = config.get('api.database.table.accountView')
const queryCollection: string = config.get('api.database.table.query')
const mongodbUrl: string = config.get('api.database.mongodb.url') || ''
const upsertOptions = {
  upsert: true,
  returnNewDocument: true,
}


@injectable()
export class MongoDatabase implements Database {

  public accountById = async(accountId: string): Promise<Account | null> => {
    let client: MongoClient

    return Promise
      .resolve(new MongoClient(mongodbUrl))
      .then((conn: MongoClient) => {
        client = conn
        return this.getCollection(client, databaseName, accountCollectionName)
      })
      .then((collection: Collection) => {
        const query = {
          _id: new ObjectId(accountId),
        }

        return collection.findOne(query)
      })
      .then((document: Document | null) => {
        return isNull(document) ? null : document as Account
      })
      .finally(async() => {
        if(client) {
          await client.close()
        }
      })
  }

  public accountList = async(category?: string | null): Promise<Array<Account>> => {
    let client: MongoClient
    const collectionName: string = isUndefined(category) ? accountCollectionName : accountViewCollectionName
    const query = isString(category) ? {category: category} : {}

    return Promise
      .resolve(new MongoClient(mongodbUrl))
      .then((conn: MongoClient) => {
        client = conn
        return this.getCollection(client, databaseName, collectionName)
      })
      .then((collection: Collection) => {
        return collection.find(query).toArray()
      })
      .then((documents: Array<Document>) => {
        return documents as Array<Account>
      })
      .finally(async() => {
        if(client) {
          await client.close()
        }
      })
  }

  public queryItem = async(queryId: string): Promise<Query | null> => {
    let client: MongoClient

    return Promise
      .resolve(new MongoClient(mongodbUrl))
      .then((conn: MongoClient) => {
        client = conn
        return this.getCollection(client, databaseName, queryCollection)
      })
      .then((collection: Collection) => {
        return collection.findOne({_id: new ObjectId(queryId)})
      })
      .then((document: Document | null) => {
        return document as Query || null
      })
      .finally(async() => {
        if(client) {
          await client.close()
        }
      })
  }

  public queryList = async(): Promise<Array<Query>> => {
    let client: MongoClient

    return Promise
      .resolve(new MongoClient(mongodbUrl))
      .then((conn: MongoClient) => {
        client = conn
        return this.getCollection(client, databaseName, queryCollection)
      })
      .then((collection: Collection) => {
        return collection.find().toArray()
      })
      .then((documents: Array<Document>) => {
        return documents as Array<Query>
      })
      .finally(async() => {
        if(client) {
          await client.close()
        }
      })
  }

  public querySave = async(query: Query): Promise<string> => {
    let client: MongoClient

    return Promise
      .resolve(new MongoClient(mongodbUrl))
      .then((conn: MongoClient) => {
        client = conn
        return this.getCollection(client, databaseName, queryCollection)
      })
      .then((collection: Collection) => {
        let _id = get(query, '_id')
        const filter = isString(_id) ? {_id: new ObjectId(_id)} : {}

        unset(query, '_id')
        return collection.findOneAndReplace(filter, query, upsertOptions)
      })
      .then((result: Document) => {
        return get(result, '_id') as ObjectId
      })
      .then((resultId: ObjectId) => {
        return resultId.toString('hex')
      })
      .finally(async() => {
        if(client) {
          await client.close()
        }
      })
  }

  private getCollection = async(client: MongoClient, dbName: string, collectionName: string): Promise<Collection> => {
    return Promise
      .resolve(client.db(dbName))
      .then((db: Db) => {
        return db.collection(collectionName)
      })
  }

}
