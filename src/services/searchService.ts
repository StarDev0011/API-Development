/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import {
  filter,
  find,
  get,
  isPlainObject,
  isString,
  isUndefined,
  keys,
  mapValues,
  omit,
  pickBy,
  reduce,
  startCase,
  trim
} from 'lodash'
import { Content, FieldAttributes, QueryCatalog, QueryItem, Search, SearchCatalog } from '../models/search'

export { QueryCatalog, QueryItem }

const fieldCatalog = require('../../data/source/search.json') as SearchCatalog
const queryCatalog = require('../../data/source/query.json') as QueryCatalog

const fieldNames = keys(fieldCatalog) || [] as const
type FieldName = typeof fieldNames[number]

function contentToObject(contents: Array<Content>): Record<string, string> {
  return reduce(contents, (contentObject: Record<string, string>, content: Content) => {
    contentObject[content.key] = content.value
    return contentObject
  }, {})
}

async function isValidOwner(owner: string): Promise<void> {
  return Promise
    .resolve(isString(owner))
    .then((result: boolean) => {
      if(!result) {
        throw new Error(`Invalid Query Owner: ${owner}`)
      }

      return
    })
}

async function isValidQuery(query: QueryItem): Promise<void> {
  return Promise
    .resolve(isPlainObject(query))
    .then((result: boolean) => {
      if(!result) {
        throw new Error(`Invalid Query: ${query}`)
      }

      return
    })
    .then(() => {
      return isValidOwner(get(query, 'owner'))
    })
    .then(() => {
      return
    })

}

export class SearchService {
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
          let res = omit(field, [ 'options' ])
          res.label = res.label || startCase(key)
          return res
        })
      })
      .then((result: FieldAttributes | void) => {
        return result || {}
      })
  }

  public async queryList(owner?: string | null): Promise<QueryCatalog> {
    return Promise
      .resolve(queryCatalog)
      .then((catalog: QueryCatalog) => {
        return owner ? filter(catalog, [ 'owner', owner ]) : catalog
      })
  }

  public async queryItem(queryId: string): Promise<QueryItem | undefined> {
    return Promise
      .resolve(queryCatalog)
      .then((catalog: QueryCatalog) => {
        return find(catalog, [ '_id.$oid', queryId ])
      })
  }

  public async querySave(query: QueryItem): Promise<string> {
    return isValidQuery(query)
      .then(() => {
        return get(query, '_id.$oid') || ''
      })
  }
}
