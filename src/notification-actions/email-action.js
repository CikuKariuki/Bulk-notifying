export default function makeEmailSender({ communicationDb }) {
    return Object.freeze({
        startSendEmail
    })
    async function startSendEmail({ ...messageInfo }) {
        console.log(messageInfo,"in actions")
        // what does messageInfo contain?
        // using Twilio SendGrid's v3 Node.js Library
        const msg = {
            to: 'phyllissheeko@gmail.com',
            from: 'phyllissheeko@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
            // console.log(error.response.body.errors[0].message)
        })
        res.send("Okay, email sent")
    }
}