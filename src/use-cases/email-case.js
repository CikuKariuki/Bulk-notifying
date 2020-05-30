import { makeEmail } from '../notifications'

export default function makeSendEmail({ communicationDb, responses, emailSend }){
    return async function startSendEmail({ ...data }){
        console.log(data)
        
        let email_notification

        try {
            email_notification = makeEmail(data)
        }
        catch(e){
            return responses.inputErrorResponse(e.message)
        }
        try {
            const emailCreate = await communicationDb.createEmail({
                group_id: email_notification.getGroupId(),
                merchant_id: email_notification.getMerchantId(),
                merchant_email: email_notification.getMerchantEmail(),
                message: email_notification.getMessage(),
                subject: email_notification.getSubject(),
                initiated_on: email_notification.getInitiatedOn()

            })
            // start sending email, call emailSend frm email-action and send email in payload
            await emailSend.startSendEmail({ message: email_notification.getMessage() })
            return responses.successResponse(emailCreate)
        }
        catch(e){
            return responses.serverErrorResponse(e.message, "logged from email-case.js")
        }
    }
}