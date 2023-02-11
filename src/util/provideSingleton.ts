/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { interfaces } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'

export { fluentProvide }

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
