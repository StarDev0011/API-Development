/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { Dashboard } from '../models/dashboard'

export { Dashboard }

const dashboardData: Dashboard = require('../../data/source/dashboard.json')

export class DashboardService {
  public async items(): Promise<Dashboard> {
    return Promise.resolve(dashboardData)
  }
}
