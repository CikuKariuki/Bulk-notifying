import notificationUseCases from '../use-cases'
import notFound from './not-found'
import makeNotifications from './notifications'
import createPostUpload from './post-uploads'
import { addUpload } from '../use-cases'
import makeEmails from './email-controller' 

const notifications = makeNotifications({ notificationUseCases })
const emails = makeEmails({ notificationUseCases })
const postUpload = createPostUpload({ addUpload })

// consolidate controllers in a variable called controller
const controllers = Object.freeze({
    notFound,
    notifications,
    postUpload,
    emails
})

export default controllers
export { notFound, notifications, postUpload, emails }