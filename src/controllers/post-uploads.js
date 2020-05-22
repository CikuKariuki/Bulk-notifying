export default function createPostUpload ({ addUpload }){
    return async function postUpload (uploadInfo){
        try{
            const posted = await addUpload ({
                ...uploadInfo
            })
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: {
                    "status": 200,
                    "message": "Contacts have successfully been uploaded"
                }
            }
        }
        catch (e){
            console.log("In post-deals", e)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}