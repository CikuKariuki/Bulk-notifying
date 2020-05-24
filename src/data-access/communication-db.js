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
        findByGroupId
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

    async function findAll() {
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({})
        return (await result.toArray()).map(({ ...found }) => ({
            ...found
        }))
    }

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

    async function insert({ _id = Id.makeId(), ...uploadInfo }) {
        const db = await makeDb()
        const result = await db
            .collection(process.env.CONTACTS_COLLECTION)
            .insertOne({ _id, ...uploadInfo.csvItem })
        const { id, ...insertedInfo } = result.ops[0]
        // console.log(insertedInfo)
        return { ...insertedInfo }
    }

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
    
    async function findByGroupId({ group_id }) {
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({ group_id: group_id })
        const found = await result.toArray()
        if (found.length === 0) {
            return null
        }
        const { ...info } = found[0] //found [0] currently returning the first result in db only
        return { ...info }
    }
}