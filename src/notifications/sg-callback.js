export default function buildMakeSGCallback({}){
    return function makeSGCallback({
        email,
        event,
        julla_id,
        sg_event_id,
        initiatedOn = Date.now()
    } = {}){
        if(!email || !event || !julla_id|| !sg_event_id){
            throw new Error ("There are empty parameters")
        }
        return Object.freeze({
            getEmail: () => email,
            getEvent: () => event,
            getJullaId: ()=> julla_id,
            getEventId: () => sg_event_id,
            getReceivedOn: () => initiatedOn
        })
    }
}