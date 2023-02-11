/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { inject, provideSingleton } from '../ioc'
import { Account, AccountView } from '../models/account'
import { Database } from '../models/database'

export { Account, AccountView }

@provideSingleton(AccountService)
export class AccountService {
  constructor(@inject('MongoDatabase') private database: Database) {
    console.log(`Database: '${database.databaseName}'`)
  }

  public list = async(): Promise<Array<Account>> => {
    return await this.database.accountList<Account>()
  }

  public view = async(category?: string | null): Promise<Array<AccountView>> => {
    return await this.database.accountList<AccountView>(category)
  }

  public account = async(accountId: string): Promise<Account | null> => {
    return await this.database.accountById(accountId)
  }
}
