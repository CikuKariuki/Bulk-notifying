export default function startSendEmail({ makeSendgrid }){
    return Object.freeze({
        sendEmail
    })

    async function sendEmail({...messageInfo}){
        const Email = await makeSendgrid()
        
        const results = await Email
        .send(messageInfo)
        .then( response => {
            return {response}
        })
        .catch( error => {
            console.log(error);
        });
      
     
       
 }

}