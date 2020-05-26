import notificationUseCases from '../use-cases'
import notFound from './not-found'
import makeNotifications from './notifications'
import createPostUpload from './post-uploads'
import { addUpload, } from '../use-cases'
import makePostSGCallback from './post-sg-callback'

const SgCallbackPoster  = makePostSGCallback({postSGCallback})
const notifications = makeNotifications({ notificationUseCases })
const postUpload = createPostUpload({ addUpload })

// consolidate controllers in a variable called controller
const controller = Object.freeze({
    notFound,
    notifications,
    postUpload,
    SgCallbackPoster
})

export default controller
export { notFound, notifications, postUpload, SgCallbackPoster }