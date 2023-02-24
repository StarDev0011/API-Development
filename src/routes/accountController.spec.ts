/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { get, isArray, isNull, isPlainObject, sampleSize } from 'lodash'
import request from 'supertest'
import { app } from '../app'
import { Account } from '../models/account'

type TestAccountTuple = [string | null, number]

const suiteURL = '/api/v1/account'
const account = require('../../data/source/account.json')
const accountSample: Array<Account> = sampleSize(account, 5)
const accountsAndCategories: Array<TestAccountTuple> = [
  ['VERTICAL RESPONSE', 24],
  ['PEOPLE AND FAMILIES', 64],
  ['GIBBERISH', 0],
  [null, 100],
]

describe('AccountController', () => {

  describe.each<TestAccountTuple>(
    accountsAndCategories,
  )('Account List %s', (category: string | null, expectedCount: number) => {
    const path = isNull(category) ? 'list' : 'category'
    const testURL: string = `${suiteURL}/${path}/${category ?? ''}`

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

  describe.each<Account>(
    accountSample,
  )(`Account '${account._id}'`, (account: Account) => {
    const accountId = get(account, '_id', '')
    const testURL = `${suiteURL}/id/${encodeURIComponent(accountId)}`

    it(`Should GET ${testURL}`, async() => {
      const response = await request(app)
        .get(testURL)
        .set('Accept', 'application/json')

      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(isPlainObject(response.body)).toBeTruthy()
      expect(get(response, 'body._id')).toEqual(accountId)
    })
  })

})
