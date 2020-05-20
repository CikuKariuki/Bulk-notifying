import makeSmsSender from './sms-action'
import axios from 'axios'

export async function makeAxios(){
    return axios
}
const smsSend = makeSmsSender({ makeAxios })
export default smsSend
//smsSend allows us to export the function makeSmsSender which is the function that sends sms'