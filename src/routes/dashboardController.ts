/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Get, Route } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { Dashboard, DashboardService } from '../services/dashboardService'

@Route('dashboard')
@provideSingleton(DashboardController)
export class DashboardController {
  constructor(@inject(DashboardService) private dashboardService: DashboardService) {
  }

  /**
   * Return an array containing dashboard items
   * @returns {Promise<Dashboard>}
   */
  @Get()
  public async getDashboard(): Promise<Dashboard> {
    return Promise
      .resolve(this.dashboardService.items())
      .then((result: Dashboard) => {
        return result
      })
      .catch((err: Error | string) => {
        console.error(err)
        throw err instanceof Error ? err : new Error(err)
      })
  }
}
