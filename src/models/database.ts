/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Account } from './account'

export interface Database {
  accountById(accountId: string): Promise<Account | null>

  accountList(category?: string | null): Promise<Array<Account>>
}
