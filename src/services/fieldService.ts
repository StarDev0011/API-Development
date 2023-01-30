import { Dictionary, isUndefined, keys, mapValues, omit, pickBy, reduce, startCase, trim } from 'lodash'
import { Content, Field, FieldAttributes, FieldCatalog } from '../models/field'

const fieldCatalog = require('../../data/source/fields.json') as FieldCatalog

const fieldNames = keys(fieldCatalog) || [] as const
type FieldName = typeof fieldNames[number]

function contentToObject(contents: Array<Content>): Dictionary<string> {
  return reduce(contents, (contentObject: Dictionary<string>, content: Content) => {
    contentObject[content.key] = content.value
    return contentObject
  }, {})
}

export class FieldService {
  public async fieldContent(fieldName: FieldName): Promise<Dictionary<string>> {
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
          return <FieldCatalog>pickBy(fieldCatalog, (_: Field, key: FieldName) => key === fieldName)
        }
      })
      .then((relevantFields: FieldCatalog) => {
        return <FieldCatalog>pickBy(relevantFields, (column: Field) => column.selectable)
      })
      .then((selectableFields: FieldCatalog) => {
        return <FieldAttributes | void>mapValues(selectableFields, (field: Field, key: FieldName) => {
          let res = omit(field, [ 'options' ])
          res.label = res.label || startCase(key)
          return res
        })
      })
      .then((result: FieldAttributes | void) => {
        return result || {}
      })
  }
}
