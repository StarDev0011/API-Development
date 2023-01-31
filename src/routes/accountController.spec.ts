import { isArray, isPlainObject } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

type TestAccountTuple = [ string | undefined ]

const suiteURL = '/api/v1/account'

describe('AccountController', () => {

  describe('List', () => {
    const testURL: string = `${suiteURL}/list`
    const accountCount = 21

    it(`Get ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .expect(response => response.body.length == accountCount)
        .then(() => {
          done()
        })
    })
  })

  describe.each<TestAccountTuple>([
    [ '635f0fc381285df6d6ccd265' ]
  ])('Account %s', (accountId?: string) => {
    const testURL = `${suiteURL}/${accountId || ''}`

    it(`Get ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .then(() => {
          done()
        })
    })
  })

})
