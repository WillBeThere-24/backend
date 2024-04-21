import { Router } from 'express'
import { createEvent, myEvents, getEvent, inviteGuest, eventGuests, rsvpEvent, confirmRSVP, editEvent, deleteEvent } from '../controllers/event.controller.js'
import { protect } from "../../common/middlewares/protect.js";

const eventRouter = Router()

eventRouter.use(protect);

eventRouter.post('/', createEvent)
eventRouter.get('/', myEvents)
eventRouter.get('/:id', getEvent)
eventRouter.post('/:id/invite', inviteGuest)
eventRouter.get('/:id/guests', eventGuests)
eventRouter.get('/:id/rsvp', rsvpEvent)
eventRouter.post('/:id/rsvp', confirmRSVP)
eventRouter.patch('/:id', editEvent)
eventRouter.delete('/:id', deleteEvent)

export default eventRouter