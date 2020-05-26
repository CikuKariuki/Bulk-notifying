import makeSendSMS from "./sms-case";
import communicationDb from '../data-access'
import responses from '../responses'
import smsSend from '../notification-actions'
import createAddUpload from './add-upload'
import makeSendEmail from './email-case'
import makeProcessSGCallback from './sg-callback'


const sendSMS = makeSendSMS({ communicationDb, responses, smsSend })
const sendEmail = makeSendEmail({communicationDb, emailSending, makeAxios, config, uuidv4})
const processSGCallback = makeProcessSGCallback({sendSMS, notificationsDb, nodemailerSending})
const addUpload = createAddUpload({ communicationDb })


async function makeAxios(){
    return axios
}

const notificationUseCase = Object.freeze({
    sendSMS, //add for email here and don't forget to export individually
    addUpload,
    sendEmail,
    processSGCallback
})

export default notificationUseCase
export { sendSMS, addUpload, processSGCallback, sendEmail }