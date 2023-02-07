/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import request from 'supertest'
import { app } from '../app'

const suiteURL: string = '/api/v1/version'

describe('VersionController', () => {

  // TODO: Create request(app) here
  beforeEach(() => {

  })

  // TODO: Tear down request(app) to close database
  afterEach(() => {

  })

  describe('Version', () => {
    it(`GET ${suiteURL}`, done => {
      request(app)
        .get(suiteURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(() => {
          done()
        })
    })
  })

})
