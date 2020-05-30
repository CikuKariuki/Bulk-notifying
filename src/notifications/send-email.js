export default function buildMakeEmail() {
    return function makeSendEmail({
        group_id,
        merchant_id,
        merchant_email,
        message,
        subject

    } = {}) {
        if (!group_id) {
            throw new Error('Group ID must be provided')
        }
        if (!merchant_id) {
            throw new Error('Merchant ID must be provided')
        }
        if(!merchant_email){
            throw new Error('Merchant email must be provided')
        }
        if (!message) {
            throw new Error("You must provide a message")
        }
        if(!subject){
            throw new Error("You must include a subject!")
        }

        return Object.freeze({
            getGroupId: () => group_id,
            getMerchantId: () => merchant_id,
            getMerchantEmail: () => merchant_email,
            getMessage: () => message,
            getSubject: () => subject,
            getInitiatedOn: () =>Date.now()
        })
    }
}
