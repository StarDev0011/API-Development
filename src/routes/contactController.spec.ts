import { isArray, isPlainObject } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

type TestContactTuple = [ string | undefined ]

const suiteURL = '/api/v1/contact'

describe('ContactController', () => {

  describe('List', () => {
    const testURL: string = `${suiteURL}/list`
    const contactCount = 21

    it(`Get ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .expect(response => response.body.length == contactCount)
        .then(() => {
          done()
        })
    })
  })

  describe.each<TestContactTuple>([
    [ '635f0fc381285df6d6ccd265' ]
  ])('Document %s', (contactId?: string) => {
    const testURL = `${suiteURL}/document/${contactId || ''}`

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
