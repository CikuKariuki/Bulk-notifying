import makeSendSMS from "./sms-case";
import communicationDb from '../data-access'
import responses from '../responses'
import smsSend from '../notification-actions'

const sendSMS = makeSendSMS({ communicationDb, responses, smsSend })

const notificationUseCase = Object.freeze({
    sendSMS //add for email here and don't forget to export individually
})

export default notificationUseCase
export { sendSMS }