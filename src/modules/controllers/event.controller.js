import { sendRSVPMailTemplate } from '../../common/templates/rsvp.js'
import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { uploadFile } from '../../common/utils/cloudinary.js'
import { catchAsync } from '../../common/utils/errorHandler.js'
import { formatDate } from '../../common/utils/helper.js'
import { sendEmail } from '../../common/utils/resend.js'
import { EventModel } from '../schemas/event.schema.js'
import { GuestModel } from '../schemas/guest.schema.js'
import { ItemModel } from '../schemas/item.schema.js'

export const createEvent = catchAsync(async (req, res) => {
    const { user, file } = req
    const checkExisting = await EventModel.findOne({
        name: req.body.name,
        user: user,
    })

    if (checkExisting) {
        throw new AppError('Event already exists', 409)
    }

    if (!file) {
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
    const imageUrl = await uploadFile('WillBeThere', file)
    const event = await EventModel.create({
        user: user,
        image: imageUrl.secure_url,
        ...req.body,
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

export const myRSVPs = catchAsync(async (req, res) => {
    const { user } = req

    const rsvps = await GuestModel.find({ email: user.email }).populate('event')

    return AppResponse(
        res,
        200,
        'All events for user retrieved successfully',
        rsvps
    )
})

export const inviteGuest = catchAsync(async (req, res) => {
    const { user } = req
    const { name, email } = req.body
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
    const date = formatDate(event.start)
    const template = sendRSVPMailTemplate({
        name,
        organizerName: event.user.name,
        date: date,
        url: `https://willbethere.netlify.app/rsvp/${event.id}`,
    })
    await sendEmail(email, `You are invited to ${event.name} Event`, template)

    const guest = await GuestModel.create({
        ...req.body,
        event: event,
    })

    // Send mail to guest

    return AppResponse(
        res,
        201,
        'Guest has been sent an invite mail to your event',
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

export const addEventItem = catchAsync(async (req, res) => {
    const { user } = req
    const event = await EventModel.findOne({ user: user, _id: req.params.id })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    const item = await ItemModel.create({
        event: event,
        ...req.body,
    })

    return AppResponse(res, 201, 'Item Created Successfully', item)
})

export const getEventItems = catchAsync(async (req, res) => {
    const { user } = req
    const event = await EventModel.findOne({ user: user, _id: req.params.id })

    if (!event) {
        throw new AppError('Event does not exists', 409)
    }

    const items = await ItemModel.find({ event: event })

    return AppResponse(res, 200, 'Items Fetched Successfully', items)
})

export const toggleShowEventItem = catchAsync(async (req, res) => {
    const { user } = req
    let item = await ItemModel.findOne({
        user: user,
        event: req.params.event,
        _id: req.params.id,
    })
    console.log

    if (!item) {
        throw new AppError('Item does not exists', 409)
    }

    item.show = !item.show
    item.save()

    return AppResponse(res, 200, 'Item toggled successfully', item)
})

export const deleteEventItem = catchAsync(async (req, res) => {
    const { user } = req
    let item = await ItemModel.findOne({
        user: user,
        event: req.params.event,
        _id: req.params.id,
    })

    if (!item) {
        throw new AppError('Item does not exists', 409)
    }

    await ItemModel.findByIdAndDelete(item)

    return AppResponse(res, 204, 'Item Deleted', null)
})
