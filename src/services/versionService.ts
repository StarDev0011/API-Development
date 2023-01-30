import * as pkg from '../../package.json'
import { Version } from '../models/version'

export class VersionService {
  public get(): Version {
    return {
      name: pkg.name || 'unknown',
      version: pkg.version || 'unknown',
      description: pkg.description || 'unknown',
      documentation: 'https://njcdd-api.dev.local/api-docs'
    }
  }
}
