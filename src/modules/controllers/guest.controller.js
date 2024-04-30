import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { catchAsync } from '../../common/utils/errorHandler.js'
import { sendRSVPConfirmationMailTemplate } from '../../common/templates/rsvpConfirm.js'
import { sendMail } from '../../common/utils/sendMail.js'
import { UserModel } from '../schemas/user.schema.js'
import { EventModel } from '../schemas/event.schema.js'
import { GuestModel } from '../schemas/guest.schema.js'

export const rsvpEvent = catchAsync(async (req, res) => {
    const event = await EventModel.findById(req.params.id)

    if (!event) {
        throw new AppError('Event does not exist', 400)
    }

    if (event.start < Date.now()) {
        throw new AppError('Event start time has elapsed', 405);
    }

    const guest = await GuestModel.findOne({
        event: event,
        _id: req.query.guest,
    })

    if (event.isPrivate && !guest) {
        throw new AppError('This event is private.', 400)
    }

    if (guest && guest.attending !== null) {
        throw new AppError('You have already responded to this event. To modify your RSVP response, please register to the application.', 401)
    }

    return AppResponse(res, 200, '', { event: event, guest: guest })
})

export const confirmRSVP = catchAsync(async (req, res) => {
    const event = await EventModel.findById(req.params.id)

    if (!event) {
        throw new AppError('Event does not exists', 400)
    }

    const guest = await GuestModel.findOne({
        event: event,
        _id: req.query.guest,
    })

    if (event.isPrivate && !guest) {
        throw new AppError('This event is private.', 400)
    }

    let guestResponse

    if (!guest) {
        guestResponse = await GuestModel.create({
            ...req.body,
            event: event,
        })
    } else {
        guestResponse = await GuestModel.findByIdAndUpdate(guest, req.body, {
            new: true,
        })
    }


    if (guestResponse.attending) {
        const date = new Date(event.start)
        const user = await UserModel.findById(event.user._id)
        const joinPlusOnes = guestResponse.plus_ones.map(guest => guest.name).join(', ');
        const eventItems = guestResponse.items.join(", ")

        const plus = joinPlusOnes ? `<span>We're delighted to have ${joinPlusOnes} and you join us for this exciting event</span>` : `<span>We're delighted to have you join us for this exciting event</span>`;
        const reminder = eventItems ? `<span>Remember to come along with ${eventItems}.</span>` : `<span></span>`;
        
        const template = sendRSVPConfirmationMailTemplate({
            eventName: event.name,
            organizerName: user.name,
            date: date,
            location: event.location,
            plusMessage: plus,
            reminderMessage: reminder,
            guest: guestResponse.name,
        })

        await sendMail(guestResponse.email, `RSVP Confirmation for ${event.name}`, template)

        return AppResponse(
            res,
            200,
            'Thank you for accepting to attend our event. The event details will be sent to your mail.',
            guestResponse
        )
    } else {
        return AppResponse(
            res,
            200,
            'Ouch, we hope to see you next time',
            guestResponse
        )
    }
})
