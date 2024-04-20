import { Router } from 'express'
import { createEvent, myEvent, inviteGuest, eventGuests, rsvpEvent, confirmRSVP, editEvent, deleteEvent } from '../controllers/event.controller.js'
import { protect } from "../../common/middlewares/protect.js";

const eventRouter = Router()

eventRouter.use(protect);

eventRouter.post('/', createEvent)
eventRouter.get('/', myEvent)
eventRouter.post('/invite', inviteGuest)
eventRouter.get('/guests', eventGuests)
eventRouter.get('/rsvp', rsvpEvent)
eventRouter.post('/rsvp', confirmRSVP)
eventRouter.patch('/', editEvent)
eventRouter.delete('/', deleteEvent)

export default eventRouter