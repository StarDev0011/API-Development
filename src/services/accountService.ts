/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import config from 'config'
import { inject, provideSingleton } from '../ioc'
import { Account } from '../models/account'
import { Database } from '../models/database'

export { Account }

const runtimeDatabase = config.get<string>('api.database.runtime')

@provideSingleton(AccountService)
export class AccountService {
  constructor(@inject(runtimeDatabase) private database: Database) {
  }

  public list = async(): Promise<Array<Account>> => {
    return await this.database.accountList()
  }

  public view = async(category?: string | null): Promise<Array<Account>> => {
    return await this.database.accountList(category)
  }

  public account = async(accountId: string): Promise<Account | null> => {
    return await this.database.accountById(accountId)
  }
}
