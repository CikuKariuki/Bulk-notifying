import makeSmsSender from './sms-action'
import communicationDb from '../data-access'
import axios from 'axios'
import makeEmailSender from './email-action';

export async function makeAxios(){
    return axios
}
const smsSend = makeSmsSender({ makeAxios, communicationDb })
const emailSend = makeEmailSender({ communicationDb})

export default smsSend
export { emailSend }
//smsSend allows us to export the function makeSmsSender which is the function that sends sms'