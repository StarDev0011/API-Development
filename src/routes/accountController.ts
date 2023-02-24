/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Get, Path, Route } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { Account, AccountService } from '../services/accountService'

@Route('account')
@provideSingleton(AccountController)
export class AccountController {
  constructor(@inject(AccountService) private accountService: AccountService) {
  }

  /**
   * Return la list of all accounts
   * @returns {Promise<Array<Account>>}
   */
  @Get('list')
  public async getAccountList(): Promise<Array<Account>> {
    return Promise
      .resolve(this.accountService.list())
      .then((result: Array<Account>) => {
        return result
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Return an individual account from the account Id
   * @param {string} accountId
   * @returns {Promise<Account | Record<string, unknown>>}
   */
  @Get('id/{accountId}')
  public async getAccount(@Path() accountId: string): Promise<Account | Record<string, unknown>> {
    return Promise
      .resolve(decodeURIComponent(accountId))
      .then((decodedId: string) => {
        return this.accountService.account(decodedId)
      })
      .then((result: Account | null) => {
        return result ?? {}
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Retrieve Account List by category
   * @param {string} category
   * @returns {Promise<Array<Account>>}
   */
  @Get('category/{category}')
  public async accountCategory(@Path() category: string): Promise<Array<Account>> {
    return Promise
      .resolve(decodeURIComponent(category))
      .then((decodedCategory?: string | null) => {
        return this.accountService.view(decodedCategory)
      })
      .then((result: Array<Account>) => {
        return result
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }
}
