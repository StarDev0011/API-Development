/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Account } from './account'
import { Query } from './search'

export interface Database {
  accountById(accountId: string): Promise<Account | null>

  accountList(category?: string | null): Promise<Array<Account>>

  queryItem(queryId: string): Promise<Query | null>

  queryList(): Promise<Array<Query>>

  querySave(query: Query): Promise<string>
}
