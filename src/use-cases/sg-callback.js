export default function makeProcessCallback({ sendSMS, communicationDb, nodemailerSending }) {
    return Object.freeze({
        callbackProcessor
    })
    async function callbackProcessor({ ...messageInfo }) {
        // "Dear"+ messageInfo.first_name is how it should be looking. 
        const unreachable_message = "Dear customer we tried to reach you via" + messageInfo.email + "but were effectively unable to. Kindly edit your email address on the Julla app in your profile page"
        const event = messageInfo.event
        const findByJullaId = await communicationDb.findByJullaId(messageInfo)

        switch (event) {
            case 'dropped':
                const email_body = {
                    email: messageInfo.email,
                    subject: findByJullaId.subject,
                    message: findByJullaId.message
                }
                await nodemailerSending.sendNodemailerEmail(email_body)
                return await communicationDb.updateEmailStatusByID(messageInfo);

            case 'bounce':
                const body = {
                    subject: findByJullaId.subject,
                    message: unreachable_message,
                    initiatedOn: messageInfo.receivedOn
                }

                await sendSMS.smsSender(body)

                return await communicationDb.updateEmailStatusByID(messageInfo);

            default:
                return await communicationDb.updateEmailStatusByID(messageInfo);
        }
    }
}