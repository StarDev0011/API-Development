/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Account, AccountView } from './account'

export interface Database {
  accountById(accountId: string): Promise<Account | null>

  accountList<T extends Account | AccountView>(category?: string | null): Promise<Array<T>>
}
