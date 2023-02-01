import { DashboardItem } from '../models/dashboard'

export { DashboardItem }

const dashboardData: Array<DashboardItem> = require('../../data/source/dashboard.json')

export class DashboardService {
  public async items(): Promise<Array<DashboardItem>> {
    return Promise.resolve(dashboardData)
  }
}
