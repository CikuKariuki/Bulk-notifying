export default function makeEmailSender({ communicationDb }) {
    return Object.freeze({
        startSendEmail
    })
    async function startSendEmail({ ...messageInfo }) {
        // messageInfo = message, merchant_email & subject
        // let emailArray =[]
        const group_id = messageInfo.group_id
        const merchant_id = messageInfo.merchant_id
        const contact = await communicationDb.findByGroupId({ group_id: group_id })
console.log(contact)

        contact.forEach(function (element, index, item) {

            const merchantsArray = contact[index].merchants //returns arrays with objects [{}], [{}]
            merchantsArray.forEach((elem, ind, item) => {
                const merch_id = merchantsArray[ind].merchant_id
                const email = merchantsArray[ind].email
                console.log(merchantsArray)
            // verify that merchant id and group id are in the same object
                if(merch_id == merchant_id){
                emailArray.push(email)
            }
            })
        })
        console.log("Emails sent to:", emailArray)
        emailArray.forEach(function(email, index, array){
            email = array[index]
        
        // using Twilio SendGrid's v3 Node.js Library
        const msg = {
            to: 'phyllissheeko@gmail.com',
            from: messageInfo.merchant_email,
            subject: messageInfo.subject,
            text: messageInfo.message,
            html: '<strong>'+ text +'</strong>',
        };
        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
            // console.log(error.response.body.errors[0].message)
        })
        res.send("Okay, email sent")
    })
    }
}