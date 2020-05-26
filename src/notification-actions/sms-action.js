import dotenv from "dotenv";
dotenv.config()

// how do we get info from group_id in communications db contats collection to be pushed into an array here
// here we write code to send the sms, hence sms action
export default function makeSmsSender({ makeAxios, communicationDb }) {
    return Object.freeze({
        startSendSMS
    })
    async function startSendSMS({ ...messageInfo }) {
        // messageInfo is group_id and message as specified in use case
        let phoneArray = []
        const group_id = messageInfo.group_id
        const merchant_id = messageInfo.merchant_id
        const contact = await communicationDb.findByGroupId({ group_id: group_id })
        contact.forEach(function (element, index, item) {

            const merchantsArray = contact[index].merchants //returns arrays with objects [{}], [{}]
            merchantsArray.forEach((elem, ind, item) => {
                const merch_id = merchantsArray[ind].merchant_id
            // verify that merchant id and group id are in the same object
                if(merch_id == merchant_id){
                phoneArray.push(contact[index].phone)
            }
            })
        })
        console.log("Numbers sent to:", phoneArray)

        const axios = await makeAxios()
        //    loop through the found phone numbers and send the text
        phoneArray.forEach(function(phone, index, array) {
            phone = array[index]
            const data = {
                "api_key": process.env.smsApiKey,
                "service_id": 0,
                "mobile": phone, //input array of numbers from contactsdb look how notifications looped through, but first how csvitems was ooped through.
                "response_type": "json",
                "shortcode": "Tilil",
                "message": messageInfo.message
            }
            axios.post('https://api.tililsms.com/sms/v3/sendsms', data)
                .then((response) => {
                    console.log(response.data, "response data")
                    // response data is the response from tilil that includes balance in your account
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
}