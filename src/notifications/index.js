import Id from '../Id'
import buildMakeSMS from './send-sms'
import buildCreateUpload from './contacts'

const makeSMS = buildMakeSMS()
const createUpload = buildCreateUpload({ Id }) //ensures every contact is stored with an id

const entityService = Object.freeze({
  makeSMS,
  createUpload
})

export default entityService
export { makeSMS, createUpload }


