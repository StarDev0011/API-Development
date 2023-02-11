/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isString, isUndefined } from 'lodash'
import { Body, Get, Path, Post, Query, Route } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { FieldAttributes, QueryCatalog, QueryItem, SearchService } from '../services/searchService'

@Route('search')
@provideSingleton(SearchController)
export class SearchController {
  constructor(@inject(SearchService) private searchService: SearchService) {
  }

  /**
   * Return a Mapping of fields that can be queried
   * @param {string} field
   * @returns {Promise<Dictionary<string>>}
   */
  @Get('field/{field}')
  public async getFieldContent(@Path() field: string): Promise<Record<string, string>> {
    return Promise
      .resolve(decodeURIComponent(field))
      .then((decodedField: string) => {
        return this.searchService.fieldContent(decodedField)
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Return a mapping of a particular field's attributes
   * @param {string} field
   * @returns {Promise<Dictionary<string>>}
   */
  @Get('attributes')
  public async getFieldAttributes(@Query() field?: string): Promise<FieldAttributes> {
    return Promise
      .resolve(isString(field) ? decodeURIComponent(field) : undefined)
      .then((decodedField?: string) => {
        return this.searchService.fieldAttributes(decodedField)
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Return a array of saved queries
   * @param {string | null} owner
   * @returns {Promise<QueryCatalog>}
   */
  @Get('queries')
  public async getQueries(@Query() owner?: string | null): Promise<QueryCatalog> {
    return Promise
      .resolve(isString(owner) ? decodeURIComponent(owner) : undefined)
      .then((decodedOwner?: string) => {
        return this.searchService.queryList(decodedOwner)
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Return an individual query by Query Id
   * @param {string} queryId
   * @returns {Promise<QueryItem>}
   */
  @Get('query/{queryId}')
  public async getQuery(@Path() queryId: string): Promise<QueryItem> {
    return Promise
      .resolve(decodeURIComponent(queryId))
      .then((decodedId: string) => {
        return this.searchService.queryItem(decodedId)
      })
      .then((result: QueryItem | undefined) => {
        if(isUndefined(result)) {
          throw new Error(`Cannot locate Query Id ${queryId}`)
        }

        return result
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }

  /**
   * Save a query as an updated item or a new item. Omit '_id' field for a new query.
   * @param {QueryItem} queryItem
   * @returns {Promise<Dictionary<string>>} Query Id
   */
  @Post('query')
  public async saveQuery(@Body() queryItem: QueryItem): Promise<Record<string, string>> {
    return Promise
      .resolve(this.searchService.querySave(queryItem))
      .then((result: string) => {
        return {queryId: result}
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }
}
