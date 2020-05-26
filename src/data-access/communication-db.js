import Id from '../Id'
import dotenv from 'dotenv'

dotenv.config()

export default function makeCommunicationDb ({ makeDb }){
    return Object.freeze({
        createSMS, 
        findAll,
        findById,
        insert,
        createContact,
        findByGroupId,
        findByMerchantId,
        updateEmailStatusByID,
        createPendingEmail
    })

    async function createSMS({ id: _id = Id.makeId(), ...sms_details }){
        //sms_details = data specified in entity, groupid, merchantid ... initiatedon
        const db = await makeDb()
        const result = await db
        .collection(process.env.smsCollection)
        .insertOne({ _id, ...sms_details })

        const { _id: id, ...insertedInfo } = result.ops[0]
        return { id, ...insertedInfo}
    }

    // find everyone in db
    async function findAll() {
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({})
        return (await result.toArray()).map(({ ...found }) => ({
            ...found
        }))
    }

    // find a user guided by id
    async function findById({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({ _id })
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const { _id: id, ...info } = found[0]
        return { id, ...info }
    }

    // insert the uploaded contacts into the db
    async function insert({ _id = Id.makeId(), ...uploadInfo }) {
        const db = await makeDb()
        const result = await db
            .collection(process.env.CONTACTS_COLLECTION)
            .insertOne({ _id, ...uploadInfo.csvItem })
        const { id, ...insertedInfo } = result.ops[0]
        // console.log(insertedInfo)
        return { ...insertedInfo }
    }

    // create contact from the uploaded contact details and update the phone number
    async function createContact({ ...uploadInfo }) {
        const db = await makeDb()
        const phone = uploadInfo.phone
        //  console.log(uploadInfo.merchants[0].group_id)

        const group_id = uploadInfo.merchants[0].group_id
        const merchants = uploadInfo.merchants
        const merchant_id = uploadInfo.merchants[0].merchant_id

        const result = await db
            .collection(process.env.CONTACTS_COLLECTION)
            .updateOne({ phone }, {
                "$push": {

                    "merchants": {

                        "$each": merchants


                    },
                }

            }, { upsert: true })

        return result.modifiedCount > 0 ? { ...uploadInfo } : null
    }

    // finding merchant id ( might have to open up a little more to get access to merchant id)
    async function findByMerchantId ({ merchant_id }){
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({ merchant_id: merchant_id })
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const { ...info } = found[0]
        return { ...info }
    }
    
    // find contacts using group id.
    async function findByGroupId({ group_id }){
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({ "merchants.group_id" : group_id})
        const found = await result.toArray()
        // console.log("kklklkl", found)
        if(found.length === 0){
            return null
        }
        return found
    }
    async function updateEmailStatusByID(messageInfo){
        const msgInfo = messageInfo 
        const julla_id = msgInfo.jullaId.toString()
        const event = msgInfo.event.toString()
        const status = { $set: {status: event} };
    
        const db = await makeDb()
        const result = await db
          .collection(process.env.PENDING_EMAIL_COLLECTION)
          .updateOne({julla_id},status )
          return result.modifiedCount > 0 ? { julla_id: julla_id, msgInfo } : null
      }

      async function createPendingEmail({...notificationInfo}){
        const db = await makeDb()
        const results = await db
        .collection(process.env.PENDING_EMAIL_COLLECTION)
        .insertOne({...notificationInfo})
        const {...createdNotifications} = results.ops[0]
        return {...createdNotifications}
      }
    
}