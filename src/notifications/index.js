import Id from '../Id'
import buildMakeSMS from './send-sms'
import buildCreateUpload from './contacts'
import buildMakeEmail from './send-email'

const makeEmail = buildMakeEmail()
const makeSMS = buildMakeSMS()
const createUpload = buildCreateUpload({ Id }) 
//ensures every contact is stored with an id

const entityService = Object.freeze({
  makeSMS,
  makeEmail,
  createUpload
})

export default entityService
export { makeSMS, makeEmail, createUpload }


