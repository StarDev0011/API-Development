/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isPlainObject } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

const suiteURL = '/api/v1/dashboard'

describe('DashboardController', () => {

  describe('Dashboard', () => {
    it(`GET ${suiteURL}`, (done: DoneCallback) => {
      request(app)
        .get(suiteURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .expect(response => response.body.length === 6)
        .end(done)
    })
  })

})
