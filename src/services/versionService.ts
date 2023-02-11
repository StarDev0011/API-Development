/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import * as pkg from '../../package.json'
import { provideSingleton } from '../ioc'
import { Version } from '../models/version'

export { Version }

@provideSingleton(VersionService)
export class VersionService {
  public get(): Version {
    return {
      name: pkg.name || 'unknown',
      version: pkg.version || 'unknown',
      description: pkg.description || 'unknown',
      documentation: 'https://njcdd-api.dev.local/api-docs',
    }
  }
}
