/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isArray } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

const suiteURL = '/api/v1/access'
const acknowledge = {message: 'Request received'}


describe('AccessController', () => {

  describe('Access', () => {

    describe('Authenticate', () => {
      const testURL: string = `${suiteURL}/authenticate`

      it(`POST ${testURL}`, (done: DoneCallback) => {
        request(app)
          .post(testURL)
          .type('json')
          .send({'userName': 'admin@njcdd.org', 'password': 'admin'})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(done)
      })
    })

    describe('Register', () => {
      const testURL: string = `${suiteURL}/register`

      it(`POST ${testURL}`, (done: DoneCallback) => {
        request(app)
          .post(testURL)
          .type('json')
          .send({'userName': 'new@njcdd.org', 'firstName': 'New', 'lastName': 'Person'})
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(acknowledge)
          .end(done)
      })
    })

    describe('Reset', () => {
      const testURL: string = `${suiteURL}/reset`

      it(`POST ${testURL}`, (done: DoneCallback) => {
        request(app)
          .post(testURL)
          .type('json')
          .send({'userName': 'operator@njcdd.org'})
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(acknowledge)
          .end(done)
      })
    })

    describe('Staff', () => {
      const testURL: string = `${suiteURL}/staff`

      it(`GET ${testURL}`, (done: DoneCallback) => {
        request(app)
          .get(testURL)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(response => isArray(response.body))
          .expect(response => response.body.length > 0)
          .end(done)
      })
    })

  })
})
