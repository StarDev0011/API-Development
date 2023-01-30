import { isPlainObject, isUndefined, keys } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

type TestContentTuple = [ string | undefined ]
type TestAttributesTuple = [ string | undefined, number ]

const suiteURL: string = '/api/v1/field'

describe(`FieldController`, () => {

  describe.each<TestContentTuple>([
    [ 'Language' ],
    [ 'Role' ],
    [ 'Interests' ]
  ])('Field Content', (fieldName?: string) => {
    const field: string = isUndefined(fieldName) ? '' : fieldName + ''
    const testURL = `${suiteURL}/content/${field}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .expect(response => keys(response.body).length > 0)
        .then(() => {
          done()
        })
    })
  })

  describe.each<TestAttributesTuple>([
    [ 'HonorificPrefix', 1 ],
    [ 'HonorificSuffix', 1 ],
    [ undefined, 20 ]
  ])('Field Attributes', (fieldName: string | undefined, keyCount: number) => {
    const query: string = isUndefined(fieldName) ? '/' : `?field=${fieldName}`
    const testURL = `${suiteURL}/attributes${query}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .expect(response => keys(response.body).length === keyCount)
        .then(() => {
          done()
        })
    })
  })

})
