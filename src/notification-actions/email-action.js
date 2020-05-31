import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function makeEmailSender({ communicationDb }) {
    return Object.freeze({
        startSendEmail
    })
    async function startSendEmail({ ...messageInfo }) {
        
        // start with merchant_email so as those getting bccs don't get access to other customers' emails from 'to:'
        let emailArray = [messageInfo.merchant_email]
        const group_id = messageInfo.group_id
        const merchant_id = messageInfo.merchant_id
        const contact = await communicationDb.findByGroupId({ group_id: group_id })
        // loop through found contacts and obtain teir email addresses only if they are from the same merchant.
        contact.forEach(function (element, index, item) {
            const merchantsArray = contact[index].merchants
            merchantsArray.forEach((elem, ind, arr) => {
                const emailAddress = merchantsArray[ind].email
                const merch_id = merchantsArray[ind].merchant_id
                if (merch_id == merchant_id) {
                    emailArray.push(emailAddress)
                }
            })

        })
        console.log("emails sent to:", emailArray)

        // using Twilio SendGrid's v3 Node.js Library
        const msg = {
            to: emailArray[0],
            bcc: emailArray.splice(1),
            from: messageInfo.merchant_email,
            subject: messageInfo.subject,
            text: messageInfo.message,
            html: '<p>' + messageInfo.message + '</p>',
        }
        
        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
            
        })

    }
}