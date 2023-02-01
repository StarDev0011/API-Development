import { find, isUndefined } from 'lodash'
import { Account } from '../models/account'

export { Account }

const accounts: Array<Account> = require('../../data/source/account.json')

async function findAccount(accountId: string): Promise<Account> {
  return Promise
    .resolve(find(accounts, [ '_id.$oid', accountId ]))
    .then((result: Account | undefined) => {
      if(isUndefined(result)) {
        throw new Error(`Cannot locate account with ID ${accountId}`)
      } else {
        return result
      }
    })
}

export class AccountService {
  public async accountList(): Promise<Array<Account>> {
    return Promise
      .resolve(accounts)
  }

  public async getAccount(accountId: string): Promise<Account> {
    return Promise
      .resolve(findAccount(accountId))
  }
}
