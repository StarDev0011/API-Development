/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Container, decorate, inject, injectable } from 'inversify'
import { buildProviderModule } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { Database, MongoDatabase } from './services/mongoDatabase'
import { provideSingleton } from './util/provideSingleton'

// Create a new container tsoa can use
const iocContainer = new Container({autoBindInjectable: true})

decorate(injectable(), Controller)         // Make tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())
iocContainer.bind<Database>('MongoDatabase').to(MongoDatabase)

export { iocContainer, provideSingleton, inject, injectable }
