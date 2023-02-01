/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Controller, Get, Route } from 'tsoa'
import { DashboardItem, DashboardService } from '../services/dashboardService'

const dashboardService = new DashboardService()

@Route('dashboard')
export class DashboardController extends Controller {
  /**
   * Return an array containing dashboard items
   * @returns {Promise<Array<DashboardItem>>}
   */
  @Get()
  public async getDashboard(): Promise<Array<DashboardItem>> {
    return Promise
      .resolve(dashboardService)
      .then((service: DashboardService) => {
        return service.items()
      })
      .then((result: Array<DashboardItem>) => {
        return result
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
