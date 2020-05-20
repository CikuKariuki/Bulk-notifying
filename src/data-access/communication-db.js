import Id from '../Id'
import dotenv from 'dotenv'

dotenv.config()

export default function makeCommunication ({ makeCommunicationDb }){
    return Object.freeze({
        createSMS
    })
    async function createSMS({ id: _id = Id.makeId(), ...sms_details }){
        //sms_details = data specified in entity, groupid, merchantid ... initiatedon
        const db = await makeCommunicationDb()
        const result = await db
        .collection(process.env.smsCollection)
        .insertOne({ _id, ...sms_details })

        const { _id: id, ...insertedInfo } = result.ops[0]
        return { id, ...insertedInfo}
    }
}