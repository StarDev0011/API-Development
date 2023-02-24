/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { ObjectId } from 'mongodb'

export interface Search extends FieldAttribute {
  content: Array<Content>
}

export interface SearchCatalog extends Record<string, Search> {
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

export interface FieldAttributes extends Record<string, FieldAttribute> {
}

export interface Query {
  _id?: string | ObjectId
  owner: string
  name: string
  group: string | null
  comment: string | null
  attributes: Record<string, unknown>
}
