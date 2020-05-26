export default function makeSendEmail({communicationDb, publishFailed, emailSending, makeAxios, config, uuidv4}){
    return Object.freeze({
        emailSender
    })

    async function emailSender({...messageInfo}){ 
        const actor = messageInfo
        const message = actor.message
        const _subject = actor.subject
        const id = actor.id
        const julla_id = uuidv4()
       
        try {
            await communicationDb.createNotification({
                subject: actor.subject,
                message: actor.message,
                julla_id: julla_id,
                initiatedOn: actor.initiatedOn
            })
        } catch (err) {
          await publishFailed.sendFailedToQueue({
            subject: actor.subject,
            message: actor.message,
            julla_id: julla_id,
            initiatedOn: actor.initiatedOn
          })
        }

        const axios = await makeAxios()
        const {user_receiver_email, user_receiver_name} = await Email_User_Receiver(id, axios)
        return await startSendEmail(user_receiver_email, _subject, user_receiver_name, message, julla_id)
 }
 async function startSendEmail(receiver_email, _subject, name, message, julla_id){
     const status = process.env.PENDING

     await communicationDb.createPendingEmail({
         subject: _subject,
         message: message,
         email: receiver_email,
         julla_id: julla_id,
         status: status
     })
    return await emailSending.sendEmail({
    to: receiver_email,
    // from: process.env.EMAIL_SENDER, should be from merchant's email
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    custom_args : {
        julla_id: julla_id,
      },
    dynamic_template_data: {
        subject: _subject,
        name: name,
        message: message,
    },
    })
 }
 
}
