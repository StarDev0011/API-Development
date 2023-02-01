/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Controller, Get, Path, Route } from 'tsoa'
import { Account, AccountService } from '../services/accountService'

const accountService = new AccountService()

@Route('account')
export class AccountController extends Controller {
  /**
   * Return la list of all accounts
   * @returns {Promise<Array<Account>>}
   */
  @Get('list')
  public async getAccountList(): Promise<Array<Account>> {
    return Promise
      .resolve(accountService)
      .then((service: AccountService) => {
        return service.accountList()
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  /**
   * Return an individual account from the account Id
   * @param {string} accountId
   * @returns {Promise<Account>}
   */
  @Get('{accountId}')
  public async getAccount(@Path() accountId: string): Promise<Account> {
    return Promise
      .resolve(accountService)
      .then((service: AccountService) => {
        return service.getAccount(accountId)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
