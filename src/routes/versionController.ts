/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Get, Route } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { Version, VersionService } from '../services/versionService'


@Route('version')
@provideSingleton(VersionController)
export class VersionController {
  constructor(@inject(VersionService) private versionService: VersionService) {
  }

  /**
   * Return the current API version info
   * @returns {Promise<Version>}
   */
  @Get()
  public async versionGet(): Promise<Version> {
    return Promise
      .resolve(this.versionService.get())
      .then((result: Version) => {
        return result
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }
}
