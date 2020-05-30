import response from './http-response'

// create a function that calls on to notifications use case and returns responses accordingly.
export default function makeEmails({ notificationUseCases }){
    async function sendEmail(httpRequest){
        try{
            // group_id will be taken as a parameter, body is the merchant_id and message
            const group_id = httpRequest.params.group_id
            const body = httpRequest.body
            const data = {...body, group_id}

            const email = await notificationUseCases.sendEmail(data)
            return response.httpResponse(email)
        }
        catch(e){
            const errorBody = {
                status: 400,
                message: {
                    error: e.message
                }
            }
            return response.httpResponse(errorBody)
        }
    }
    return Object.freeze({
        sendEmail
    })
}
// responses are got from the imported http-response file.