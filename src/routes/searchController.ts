/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { isUndefined } from 'lodash'
import { Body, Controller, Get, Path, Post, Query, Route } from 'tsoa'
import { QueryCatalog, QueryItem, SearchService } from '../services/searchService'

const searchService = new SearchService()

@Route('search')
export class SearchController extends Controller {
  /**
   * Return a Mapping of fields that can be queried
   * @param {string} field
   * @returns {Promise<Dictionary<string>>}
   */
  @Get('field/{field}')
  public async getFieldContent(@Path() field: string): Promise<Record<string, string>> {
    return Promise
      .resolve(searchService)
      .then((service: SearchService) => {
        return service.fieldContent(field)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  /**
   * Return a mapping of a particular field's attributes
   * @param {string} field
   * @returns {Promise<Dictionary<string>>}
   */
  @Get('attributes')
  public async getFieldAttributes(@Query() field?: string): Promise<Record<string, string>> {
    return Promise
      .resolve(searchService)
      .then((service: SearchService) => {
        return service.fieldAttributes(field)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
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
      .resolve(searchService)
      .then((service: SearchService) => {
        return service.queryList(owner)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
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
      .resolve(searchService)
      .then((service: SearchService) => {
        return service.queryItem(queryId)
      })
      .then((result: QueryItem | undefined) => {
        if(isUndefined(result)) {
          throw new Error(`Cannot locate Query Id ${queryId}`)
        }

        return result
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
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
      .resolve(searchService)
      .then((service: SearchService) => {
        return service.querySave(queryItem)
      })
      .then((result: string) => {
        return {queryId: result}
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
