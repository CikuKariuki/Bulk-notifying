export default function buildMakeSMS() {
    return function makeSendSMS({
        group_id,
        merchant_id,
        message,
        subject

    } = {}) {
        if (!group_id) {
            throw new Error('Group ID must be provided')
        }
        if (!merchant_id) {
            throw new Error('Merchant ID must be provided')
        }
        if (!message) {
            throw new Error("You must provide a message")
        }
        // to count how many sms' have been sent.
        let sms_counter=1, message_length = message.length
        if(message_length > 144){
            sms_counter = Math.ceil(message_length/144)
        } 

        return Object.freeze({
            getGroupId: () => group_id,
            getMerchantId: () => merchant_id,
            getMessage: () => message,
            getSubject: () => subject,
            getSmsCount: () => sms_counter,
            getInitiatedOn: () =>Date.now()
        })
    }
}
