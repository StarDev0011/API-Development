/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import request from 'supertest'
import { app } from '../app'

const suiteURL: string = '/api/v1/version'

describe('VersionController', () => {

  describe('Version', () => {
    it(`GET ${suiteURL}`, done => {
      request(app)
        .get(suiteURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done)
    })
  })

})
