import { Body, Controller, Get, Post, Route } from 'tsoa'
import { Access, AccessCredentials, AccessRegister, AccessUser, AcknowledgeRequest } from '../models/access'
import { AccessService } from '../services/accessService'

@Route('access')
export class AccessController extends Controller {
  private readonly accessService = new AccessService()

  @Post('authenticate')
  public async authenticate(@Body() requestBody: AccessCredentials): Promise<Access | AcknowledgeRequest> {
    return this.accessService
      .authenticate(requestBody)
      .then((result: Access) => {
        return result
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(404)
        return err
      })
  }

  @Get('staff')
  public async getStaff(): Promise<Array<Access> | AcknowledgeRequest> {
    return this.accessService
      .listStaff()
      .then((result: Array<Access>) => {
        return result
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  @Post('register')
  public async registerContact(@Body() requestBody: AccessRegister): Promise<AcknowledgeRequest> {
    return this.accessService
      .registerContact(requestBody)
      .then(() => {
        return new AcknowledgeRequest()
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  @Post('reset')
  public async resetPassword(@Body() requestBody: AccessUser): Promise<AccessService> {
    return this.accessService
      .forgotPassword(requestBody)
      .then((isExisting: boolean) => {
        if(!isExisting) {
          throw new Error('Account does not exist')
        }

        return new AcknowledgeRequest()
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
