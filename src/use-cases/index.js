import makeSendSMS from "./sms-case";
import communicationDb from '../data-access'
import responses from '../responses'
import smsSend from '../notification-actions'
import createAddUpload from './add-upload'
import { emailSend } from '../notification-actions'
import makeSendEmail from './email-case'

const sendEmail = makeSendEmail({ communicationDb, responses, emailSend})
const sendSMS = makeSendSMS({ communicationDb, responses, smsSend })
const addUpload = createAddUpload({ communicationDb })


const notificationUseCase = Object.freeze({
    sendSMS,
    sendEmail,
    addUpload,
})

export default notificationUseCase
export { sendSMS, sendEmail, addUpload }