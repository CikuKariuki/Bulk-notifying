import makeSmsSender from './sms-action'
import communicationDb from '../data-access'
import axios from 'axios'

export async function makeAxios(){
    return axios
}
const smsSend = makeSmsSender({ makeAxios, communicationDb })
export default smsSend
//smsSend allows us to export the function makeSmsSender which is the function that sends sms'