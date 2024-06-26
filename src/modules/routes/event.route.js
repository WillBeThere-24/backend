import { Router } from 'express'
import {
    createEvent,
    myEvents,
    getEvent,
    myRSVPs,
    inviteGuest,
    eventGuests,
    editEvent,
    deleteEvent,
    addEventItem, 
    getEventItems, 
    toggleShowEventItem, 
    deleteEventItem
} from '../controllers/event.controller.js'
// import guestRouter from './guest.route.js'
import { protect } from '../../common/middlewares/protect.js'
import upload from '../../common/utils/multer.js'

const eventRouter = Router()

eventRouter.use(protect)

eventRouter.post('/', upload.single('image'), createEvent)
eventRouter.get('/', myEvents)
eventRouter.get('/myrsvps', myRSVPs)
eventRouter.get('/:id', getEvent)
eventRouter.post('/:id/invite', inviteGuest)
eventRouter.get('/:id/guests', eventGuests)
eventRouter.patch('/:id', editEvent)
eventRouter.delete('/:id', deleteEvent)
eventRouter.post('/:id/item', addEventItem)
eventRouter.get('/:id/item', getEventItems)
eventRouter.post('/:event/toggle/item/:id', toggleShowEventItem)
eventRouter.delete('/:event/item/:id', deleteEventItem)

// eventRouter.use('/rsvp', guestRouter)

export default eventRouter
