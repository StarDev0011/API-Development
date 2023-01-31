import { Controller, Get, Path, Route } from 'tsoa'
import { Account } from '../models/account'
import { AccountService } from '../services/accountService'

const accountService = new AccountService()

@Route('account')
export class AccountController extends Controller {
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
