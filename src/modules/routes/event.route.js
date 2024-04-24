import { Router } from 'express'
import { createEvent, myEvents, getEvent, inviteGuest, eventGuests, editEvent, deleteEvent } from '../controllers/event.controller.js'
import guestRouter from './guest.route.js'
import { protect } from "../../common/middlewares/protect.js";

const eventRouter = Router()

eventRouter.use(protect);

eventRouter.post('/', createEvent)
eventRouter.get('/', myEvents)
eventRouter.get('/:id', getEvent)
eventRouter.post('/:id/invite', inviteGuest)
eventRouter.get('/:id/guests', eventGuests)
eventRouter.patch('/:id', editEvent)
eventRouter.delete('/:id', deleteEvent)

eventRouter.use('/rsvp', guestRouter)

export default eventRouter