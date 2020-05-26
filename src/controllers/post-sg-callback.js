export default function makePostSGCallback({postSGCallback}){
    return async function SGCallbackSender(httpRequest){
        try{
           
            const { ...notificationInfo  } = httpRequest.body 
            console.log("in email controller; ...notificationInfo\n", {...notificationInfo})
            return{
                headers:{
                    'Content-Type': 'application/json',
    
                },
                statusCode: 200,
                body: {
                    "status": 200,
                    "message": await postSGCallback({
                        ...notificationInfo
                    })
                }
            }
        }
        catch(e){
            console.log(e)
            return{
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

 