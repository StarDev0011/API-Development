import { Dictionary } from 'lodash'

export interface Field extends FieldAttribute {
  content: Array<Content>
}

export interface FieldCatalog extends Dictionary<Field> {
}

export interface Content {
  key: string
  value: string
  description: string | null
}

export interface FieldAttribute {
  approvalRequired: boolean
  selectable: boolean
  label?: string
}

export interface FieldAttributes extends Dictionary<FieldAttribute> {
}
