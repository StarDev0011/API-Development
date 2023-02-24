/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { get, has, isArray, isPlainObject, isUndefined, keys, sampleSize } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import { Query } from '../models/search'
import DoneCallback = jest.DoneCallback

type TestContentTuple = [string | undefined]
type TestAttributesTuple = [string | undefined, number]

const suiteURL: string = '/api/v1/search'
const queryCatalog: Array<Query> = require('../../data/source/query.json')
const querySample: Array<Query> = sampleSize(queryCatalog, 2)


describe(`SearchController`, () => {

  describe.each<TestContentTuple>([
    ['Language'],
    ['Role'],
    ['Interests'],
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
        .end(done)
    })
  })

  describe.each<TestAttributesTuple>([
    ['HonorificPrefix', 1],
    ['HonorificSuffix', 1],
    [undefined, 20],
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
        .end(done)
    })
  })

  describe('Query List', () => {
    const testURL = `${suiteURL}/query/list/`
    const expectedCount = 2

    // noinspection DuplicatedCode
    it(`Should GET ${testURL}`, async() => {
      const response = await request(app)
        .get(testURL)
        .set('Accept', 'application/json')

      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(isArray(response.body)).toBeTruthy()
      expect(response.body.length).toEqual(expectedCount)
    })
  })

  describe.each<Query>(
    querySample,
  )('Query Item', (query: Query) => {
    const queryId = get(query, '_id')
    const testURL = `${suiteURL}/query/id/${queryId}`

    it(`Should GET ${testURL}`, async() => {
      const response = await request(app)
        .get(testURL)
        .set('Accept', 'application/json')

      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(isPlainObject(response.body)).toBeTruthy()
      expect(has(response.body, '_id')).toBeTruthy()
      expect(response.body).toMatchObject(query)
    })
  })

  describe('Save Query', () => {
    const testURL = `${suiteURL}/query`
    const testQuery = {
      'owner': 'tester.01@njcdd.org',
      'name': 'Test List',
      'group': null,
      'comment': null,
      'attributes': {},
    }

    it(`Should POST ${testURL}`, async() => {
      const response = await request(app)
        .post(testURL)
        .type('json')
        .send(testQuery)
        .set('Accept', 'application/json')

      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(isPlainObject(response.body)).toBeTruthy()
      expect(has(response.body, '_id')).toBeTruthy()
      expect(response.body._id).toMatch(/[a-z0-9]{24}/)
    })
  })

})
