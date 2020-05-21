import response from './http-response'

export default function createPostUpload({ addUpload }) {
    return async function postUpload(uploadInfo) {
        try {
            // const merchant_id = httpRequest.params.merchant_id
            // const group_id = httpRequest.body.group_id
            const posted = await addUpload({ ...uploadInfo })
            return response.httpResponse(posted)

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
}