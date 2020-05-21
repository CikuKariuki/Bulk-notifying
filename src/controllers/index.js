import notificationUseCases from '../use-cases'
import notFound from './not-found'
import makeNotifications from './notifications'
import createPostUpload from './post-uploads'
import { addUpload } from '../use-cases'

const notifications = makeNotifications({ notificationUseCases })
const postUpload = createPostUpload({ addUpload })

// consolidate controllers in a variable called controller
const controller = Object.freeze({
    notFound,
    notifications,
    postUpload
})

export default controller
export { notFound, notifications, postUpload }