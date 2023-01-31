/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Body, Controller, Get, Post, Route } from 'tsoa'
import { Access, AccessCredentials, AccessRegister, AccessUser, AcknowledgeRequest } from '../models/access'
import { AccessService } from '../services/accessService'

@Route('access')
export class AccessController extends Controller {
  private readonly accessService = new AccessService()

  /**
   * Authenticate a registered login account
   * @param {AccessCredentials} requestBody
   * @returns {Promise<Access | AcknowledgeRequest>}
   */
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

  /**
   * Return the list of current staff
   * @returns {Promise<Array<Access> | AcknowledgeRequest>}
   */
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

  /**
   * Register a new public login account
   * @param {AccessRegister} requestBody
   * @returns {Promise<AcknowledgeRequest>}
   */
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

  /**
   * Reset the password for a registered login
   * @param {AccessUser} requestBody
   * @returns {Promise<AccessService>}
   */
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
