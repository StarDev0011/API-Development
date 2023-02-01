/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Controller, Get, Route } from 'tsoa'
import { Version, VersionService } from '../services/versionService'


@Route('version')
export class VersionController extends Controller {
  /**
   * Return the current API version info
   * @returns {Promise<Version>}
   */
  @Get()
  public async versionGet(): Promise<Version> {
    return Promise.resolve(new VersionService())
      .then((service: VersionService) => {
        return service.get()
      })
      .then((result: Version) => {
        return result
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
