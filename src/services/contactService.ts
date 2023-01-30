import { find, isUndefined } from 'lodash'
import { Contact } from '../models/contact'

const contactData: Array<Contact> = require('../../data/source/contact.json')

async function findContact(contactId: string): Promise<Contact> {
  return Promise
    .resolve(find(contactData, [ '_id.$oid', contactId ]))
    .then((result: Contact | undefined) => {
      if(isUndefined(result)) {
        throw new Error(`Cannot locate contact with ID ${contactId}`)
      } else {
        return result
      }
    })
}

export class ContactService {
  public async contactList(): Promise<Array<Contact>> {
    return Promise
      .resolve(contactData)
  }

  public async getContactDocument(contactId: string): Promise<Contact> {
    return Promise
      .resolve(findContact(contactId))
  }
}
