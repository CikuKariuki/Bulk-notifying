import makeCommunication from "./communication-db";
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.COMMUNICATIONS_DB_URL
const communicationDbName = process.env.COMMUNICATIONS_DB

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  })

export async function makeCommunicationDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
 
  return client.db(communicationDbName)
}

const communicationDB = makeCommunication({ makeCommunicationDb})
export default communicationDB
