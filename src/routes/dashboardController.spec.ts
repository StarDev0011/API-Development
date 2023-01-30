import { isArray } from 'lodash'
import request from 'supertest'
import { app } from '../app'

const suiteURL = '/api/v1/dashboard'

describe('DashboardController', () => {

  describe('Dashboard', () => {
    it(`Get ${suiteURL}`, done => {
      request(app)
        .get(suiteURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .expect(response => response.body.length > 0)
        .then(() => {
          done()
        })
    })
  })

})
