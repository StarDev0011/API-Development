import { Controller, Get, Route } from 'tsoa'
import { DashboardItem } from '../models/dashboard'
import { DashboardService } from '../services/dashboardService'

const dashboardService = new DashboardService()

@Route('dashboard')
export class DashboardController extends Controller {
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
