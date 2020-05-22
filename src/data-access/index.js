import makeCommunicationDb from "./communication-db";
import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MongoClient = mongodb.MongoClient
const url = process.env.COMMUNICATIONS_DB_URL
const DbName = process.env.COMMUNICATIONS_DB

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
 
  return client.db(DbName)
}

const communicationDB = makeCommunicationDb({ makeDb})

export default communicationDB