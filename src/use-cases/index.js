import makeSendSMS from "./sms-case";
import communicationDb from '../data-access'
import responses from '../responses'
import smsSend from '../notification-actions'
import createAddUpload from './add-upload'


const sendSMS = makeSendSMS({ communicationDb, responses, smsSend })
const addUpload = createAddUpload({ communicationDb })


const notificationUseCase = Object.freeze({
    sendSMS, //add for email here and don't forget to export individually
    addUpload,
})

export default notificationUseCase
export { sendSMS, addUpload }