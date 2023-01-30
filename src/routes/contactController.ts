import { Controller, Get, Path, Route } from 'tsoa'
import { Contact } from '../models/contact'
import { ContactService } from '../services/contactService'

const contactService = new ContactService()

@Route('contact')
export class ContactController extends Controller {
  @Get('list')
  public async getContactList(): Promise<Array<Contact>> {
    return Promise
      .resolve(contactService)
      .then((service: ContactService) => {
        return service.contactList()
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }

  @Get('document/{contactId}')
  public async getContact(@Path() contactId: string): Promise<Contact> {
    return Promise
      .resolve(contactService)
      .then((service: ContactService) => {
        return service.getContactDocument(contactId)
      })
      .catch((err) => {
        console.error(err)
        this.setStatus(400)
        return err
      })
  }
}
