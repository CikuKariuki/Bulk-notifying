import { makeSMS } from '../notifications'

export default function makeSendSMS({ communicationDb, responses, smsSend }) {
    return async function startSendSMS({ ...data }) {
        // console.log(data) // returns the message, merchant_id and group_id
        const server_err_msg = "An error has occured while processing your request"
        let sms_notification

       
        try {
            sms_notification = makeSMS(data)
            // invoke entity ensure everything that is required is there.
        }
        catch (e) {
            return responses.inputErrorResponse(e.message)
        }
        try {
            // console.log(sms_notification)

            const smsCreate = await communicationDb.createSMS({
                group_id: sms_notification.getGroupId(),
                merchant_id: sms_notification.getMerchantId(),
                message: sms_notification.getMessage(),
                sms_counter: sms_notification.getSmsCount(),
                initiated_on: sms_notification.getInitiatedOn()
            })
            // start send sms, call smsSend from sms-action and send message in payload
            await smsSend.startSendSMS({ message: sms_notification.getMessage(), group_id: sms_notification.getGroupId(), merchant_id: sms_notification.getMerchantId() })
            return responses.successResponse(smsCreate)
        }
        catch (e) {
            return responses.serverErrorResponse(e.message, server_err_msg)
        }
    }
}