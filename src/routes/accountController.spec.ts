/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isArray, isPlainObject, isUndefined } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import DoneCallback = jest.DoneCallback

type TestAccountTuple = [string | undefined]

const suiteURL = '/api/v1/account'
const longWait = 15000

describe('AccountController', () => {

  // TODO: Create request(app) here
  beforeEach(() => {

  })

  // TODO: Tear down request(app) to close database
  afterEach(() => {

  })

  describe('List', () => {
    const testURL: string = `${suiteURL}/list`
    const accountCount = 21

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .expect(response => response.body.length == accountCount)
        .end(done)
    }, longWait)
  })

  describe.each<TestAccountTuple>([
    ['635f115e81285df6d6ce2acd'],
    ['635f100e81285df6d6ccf66a'],
    ['635f116181285df6d6ce2d56'],
  ])('Account %s', (accountId?: string) => {
    const _accountId = isUndefined(accountId) ? '' : encodeURIComponent(accountId)
    const testURL = `${suiteURL}/id/${_accountId}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isPlainObject(response.body))
        .end(done)
    })
  })

  describe.each<TestAccountTuple>([
    ['Vertical Response'],
    ['Mailing List'],
    [undefined],
  ])('Account View %s', (category?: string) => {
    const query = isUndefined(category) ? '' : `?category=${encodeURIComponent(category)}`
    const testURL = `${suiteURL}/view/${query}`

    it(`GET ${testURL}`, (done: DoneCallback) => {
      request(app)
        .get(testURL)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => isArray(response.body))
        .end(done)
    }, longWait)
  })

})
