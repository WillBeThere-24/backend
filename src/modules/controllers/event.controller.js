import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { uploadFile } from '../../common/utils/cloudinary.js'
import { catchAsync } from '../../common/utils/errorHandler.js'
import { EventModel } from '../schemas/event.schema.js'
import { GuestModel } from '../schemas/guest.schema.js'

export const createEvent = catchAsync(async (req, res) => {
    const { user, image, ...body } = req
    const checkExisting = await EventModel.findOne({
        name: req.body.name,
        user: user,
    })

    if (checkExisting) {
        throw new AppError('Event already exists', 409)
    }

    if (!image) {
        throw new AppError('Please provide an image for the event.')
    }

    // Validation start

    // if (req.body.start > Date()) {
    //   throw new AppError('Start date should be at a later date', 409);
    // }

    // if (req.body.start > req.body.end) {
    //   throw new AppError('End date should be after start date', 409);
    // }
    // Validation End
    const imageUrl = await uploadFile('WillBeThere', image)
    const event = await EventModel.create({
        user: user,
        image: imageUrl,
        ...body,
    })

    return AppResponse(res, 201, 'Event Created Successfully', event)
})

export const myEvents = catchAsync(async (req, res) => {
    const { user } = req

    const events = await EventModel.find({ user: user })

    return AppResponse(
        res,
        200,
        'All events for user retrieved successfully',
        events
    )
})

export const getEvent = catchAsync(async (req, res) => {
    const { user } = req
    const eventID = req.params.id

    const event = await EventModel.findOne({ user: user, _id: eventID })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    return AppResponse(res, 200, '', event)
})

export const inviteGuest = catchAsync(async (req, res) => {
    const { user } = req
    const eventID = req.params.id
    const event = await EventModel.findOne({ user: user, _id: eventID })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    const checkInvitee = await GuestModel.findOne({
        email: req.body.email,
        event: event,
    })

    if (checkInvitee) {
        throw new AppError('Invite already sent to guest', 409)
    }

    const guest = await GuestModel.create({
        ...req.body,
        event: event,
    })

    // Send mail to guest

    return AppResponse(
        res,
        201,
        'Guest has been sent an invite to your event',
        guest
    )
})

export const eventGuests = catchAsync(async (req, res) => {
    const { user } = req
    const eventID = req.params.id
    const event = await EventModel.findOne({ user: user, _id: eventID })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    const guests = await GuestModel.find({ event: event })

    return AppResponse(res, 200, '', guests)
})

export const editEvent = catchAsync(async (req, res) => {
    const { user } = req
    const event = await EventModel.findOne({ user: user, _id: req.params.id })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(event, req.body, {
        new: true,
    })

    return AppResponse(res, 200, 'Event Updated successfully', updatedEvent)
})

export const deleteEvent = catchAsync(async (req, res) => {
    const { user } = req
    const event = await EventModel.findOne({ user: user, _id: req.params.id })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    await EventModel.findByIdAndDelete(event)

    return AppResponse(res, 204, 'Event Deleted', null)
})
