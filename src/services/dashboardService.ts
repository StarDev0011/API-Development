/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { provideSingleton } from '../ioc'
import { Dashboard } from '../models/dashboard'

export { Dashboard }

const dashboardData: Dashboard = require('../../data/source/dashboard.json')

@provideSingleton(DashboardService)
export class DashboardService {
  public async items(): Promise<Dashboard> {
    return Promise.resolve(dashboardData)
  }
}
