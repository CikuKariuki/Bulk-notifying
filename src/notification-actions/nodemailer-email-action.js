// changes from line 9 to 26 and 45.
export default function startSendNodemailerEmail({ makeNodemailer, communicationDb }) {
    return Object.freeze({
        sendNodemailerEmail
    })
    async function sendNodemailerEmail({ ...messageInfo }) {
        const transporter = await makeNodemailer()

        let emailArray = []
        const group_id = messageInfo.group_id
        const merchant_id = messageInfo.merchant_id
        const contact = await communicationDb.findByGroupId({ group_id: group_id })
        contact.forEach(function (element, index, item) {
            const merchantsArray = contact[index].merchants //returns arrays with objects [{}], [{}]
            merchantsArray.forEach((elem, ind, item) => {
                const merch_id = merchantsArray[ind].merchant_id
                const email = merchantsArray[ind].email
                // verify that merchant id and group id are in the same object
                if (merch_id == merchant_id) {
                    emailArray.push(email)
                }
            })
        })
        console.log("Emails sent to:", emailArray)
        emailArray.forEach(function (emails, index, array) {
            emails = array[index]

            const mailOptions = {
                from: process.env.EMAIL_UNAME,
                to: emails,
                subject: messageInfo.subject,
                text: messageInfo.message
            }

            const results = await transporter
                .sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            return results
        })
    }

}