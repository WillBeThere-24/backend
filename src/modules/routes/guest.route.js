import { Router } from 'express'
import { rsvpEvent, confirmRSVP } from '../controllers/guest.controller.js'

const guestRouter = Router()

guestRouter.get('/:id', rsvpEvent)
guestRouter.post('/:id', confirmRSVP)

export default guestRouter