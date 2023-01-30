import { Dictionary } from 'lodash'
import { Controller, Get, Path, Query, Route } from 'tsoa'
import { FieldService } from '../services/fieldService'

const fieldService = new FieldService()

@Route('field')
export class FieldContentController extends Controller {
  @Get('content/{field}')
  public async getFieldContent(@Path() field: string): Promise<Dictionary<string>> {
    return Promise.resolve(fieldService)
      .then((service: FieldService) => {
        return service.fieldContent(field)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  @Get('attributes')
  public async getFieldAttributes(@Query() field?: string): Promise<Dictionary<string>> {
    return Promise.resolve(fieldService)
      .then((service: FieldService) => {
        return service.fieldAttributes(field)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
