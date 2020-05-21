import makeCommunication from "./communication-db";
import mongodb from 'mongodb'
import createContactsDb from './contacts-db'

const MongoClient = mongodb.MongoClient
const url = process.env.COMMUNICATIONS_DB_URL
const communicationDbName = process.env.COMMUNICATIONS_DB
const contactsDbName = process.env.CONTACTS_DB

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  })

export async function makeCommunicationDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
 
  return client.db(communicationDbName)
}

// contacts db connection
export async function makeContactsDb (){
  if(!client.isConnected()) {
    await client.connect()
  }
  return client.db(contactsDbName)
}

const communicationDB = makeCommunication({ makeCommunicationDb})
const contactsDb = createContactsDb ({ makeContactsDb })
export default { communicationDB, contactsDb}
// might break because of exporting two items