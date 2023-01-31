/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { get, has, isArray, isPlainObject, isUndefined, keys } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

type TestContentTuple = [ string | undefined ]
type TestAttributesTuple = [ string | undefined, number ]
type TestQueryTuple = [ string | null | undefined, number ]

const suiteURL: string = '/api/v1/search'

describe(`SearchController`, () => {

  describe.each<TestContentTuple>([
    [ 'Language' ],
    [ 'Role' ],
    [ 'Interests' ]
  ])('Search Field Content', (fieldName?: string) => {
    const field: string = isUndefined(fieldName) ? '' : fieldName + ''
    const testURL = `${suiteURL}/field/${field}`

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
  ])('Search Field Attributes', (fieldName: string | undefined, keyCount: number) => {
    const query: string = isUndefined(fieldName) ? '' : `?field=${fieldName}`
    const testURL = `${suiteURL}/attributes/${query}`

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

  describe.each<TestQueryTuple>([
    [ 'tester01@njcdd.org', 2 ],
    [ 'tester02@njcdd.org', 1 ],
    [ 'nonexistent', 0 ],
    [ undefined, 3 ],
    [ null, 3 ]
  ])('Query List', (owner: string | null | undefined, queryCount: number) => {
    const query: string = isUndefined(owner) ? '' : `?owner=${owner}`
    const testURL = `${suiteURL}/queries/${query}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .expect(response => response.body.length === queryCount)
        .then(() => {
          done()
        })
    })
  })

  describe.each<TestQueryTuple>([
    [ '1000', 6 ],
    [ '1001', 6 ]
  ])('Query Item', (queryId: string | null | undefined, queryKeyCount: number) => {
    const testURL = `${suiteURL}/query/${queryId ?? ''}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .expect(response => keys(response.body).length === queryKeyCount)
        .then(() => {
          done()
        })
    })
  })

  describe('Save Query', () => {
    const testURL = `${suiteURL}/query`
    const testQuery = {
      '_id': {
        '$oid': '9000'
      },
      'owner': 'tester.02@njcdd.org',
      'name': 'Tester02\'s Lists',
      'group': null,
      'comment': null,
      'queries': []
    }

    it(`POST ${testURL}`, done => {
      request(app)
        .post(testURL)
        .type('json')
        .send(testQuery)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .expect(response => has(response.body, 'queryId'))
        .expect(response => get(response.body, '_id.$iod') === '9000')
        .then(() => {
          done()
        })
    })
  })

})
