/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isUndefined, keys, mapValues, omit, pickBy, reduce, startCase, trim } from 'lodash'
import { inject, provideSingleton } from '../ioc'
import { Content, FieldAttribute, FieldAttributes, Query, Search, SearchCatalog } from '../models/search'
import config from 'config'
import { Database } from '../models/database'

export { FieldAttribute, FieldAttributes, Query }

const fieldCatalog = require('../../data/source/search.json') as SearchCatalog
const apiRuntimeEnv = config.get<string>('api.env')
const runtimeDatabase = config.get<string>(`api.database.runtime.${apiRuntimeEnv}`)

const fieldNames = keys(fieldCatalog) || [] as const
type FieldName = typeof fieldNames[number]

function contentToObject(contents: Array<Content>): Record<string, string> {
  return reduce(contents, (contentObject: Record<string, string>, content: Content) => {
    contentObject[content.key] = content.value
    return contentObject
  }, {})
}

@provideSingleton(SearchService)
export class SearchService {
  constructor(@inject(runtimeDatabase) private database: Database) {
  }

  public async fieldContent(fieldName: FieldName): Promise<Record<string, string>> {
    return Promise
      .resolve(fieldName)
      .then((field) => {
        const result: string = trim(field)

        if(result.length < 1) {
          throw new Error('No field name was provided')
        } else {
          return result
        }
      })
      .then((field) => {
        return contentToObject(fieldCatalog[field].content)
      })
  }

  public async fieldAttributes(fieldName?: FieldName): Promise<FieldAttributes> {
    return Promise
      .resolve()
      .then(() => {
        if(isUndefined(fieldName)) {
          return fieldCatalog
        } else {
          return <SearchCatalog>pickBy(fieldCatalog, (_: Search, key: FieldName) => key === fieldName)
        }
      })
      .then((relevantFields: SearchCatalog) => {
        return <SearchCatalog>pickBy(relevantFields, (column: Search) => column.selectable)
      })
      .then((selectableFields: SearchCatalog) => {
        return <FieldAttributes | void>mapValues(selectableFields, (field: Search, key: FieldName) => {
          let res = omit(field, ['options'])
          res.label = res.label || startCase(key)
          return res
        })
      })
      .then((result: FieldAttributes | void) => {
        return result || {}
      })
  }

  public async queryList(): Promise<Array<Query>> {
    return Promise
      .resolve(this.database.queryList())
  }

  public async queryItem(queryId: string): Promise<Query | null> {
    return Promise
      .resolve(this.database.queryItem(queryId))
  }

  public async querySave(query: Query): Promise<string> {
    return Promise
      .resolve(this.database.querySave(query))
  }
}
