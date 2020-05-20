import Id from '../Id'
import buildMakeSMS from './send-sms'

const makeSMS = buildMakeSMS({Id})


const entityService = Object.freeze({
  makeSMS
  })
  
export default entityService
export { makeSMS }


