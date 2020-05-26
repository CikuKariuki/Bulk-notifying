import Id from '../Id'
import buildMakeSMS from './send-sms'
import buildCreateUpload from './contacts'
import buildMakeSGCallback from './sg-callback'

const SGCallbackMake = buildMakeSGCallback({})
const makeSMS = buildMakeSMS()
const createUpload = buildCreateUpload({ Id }) 
//ensures every contact is stored with an id

const entityService = Object.freeze({
  makeSMS,
  SGCallbackMake,
  createUpload
})

export default entityService
export { makeSMS, SGCallbackMake, createUpload }


