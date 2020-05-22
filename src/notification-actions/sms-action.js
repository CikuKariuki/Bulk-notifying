import dotenv from "dotenv";
dotenv.config()
// how do we get info from group_id in communications db contats collection to be pushed into an array here
// here we write code to send the sms, hence sms action
export default function makeSmsSender({ makeAxios }) {
    return Object.freeze({
        startSendSMS
    })
    async function startSendSMS({ ...messageInfo }) {
        // messageInfo is the body, merchant_id and message
        const axios = await makeAxios()
        var array = ["254776776096","254727766302"]
        // for (i=array[0]; i<=array.length; i++){}
        array.forEach(function phone(item, index, arr){
            item = arr[index]
        const data = {
            "api_key": process.env.smsApiKey,
            "service_id": 0,
            "mobile": item, //input array of numbers from contactsdb look how notifications looped through, but first how csvitems was ooped through.
            "response_type": "json",
            "shortcode": "Ciku",
            "message": messageInfo.message
        }
        axios.post('https://api.tililsms.com/sms/v3/sendsms', data)
        .then((response)=>{
            console.log(response.data, "response data")
            // response data is the response from tilil that includes balance in your account
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    }
}