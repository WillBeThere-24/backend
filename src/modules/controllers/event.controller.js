import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js';
import { catchAsync } from '../../common/utils/errorHandler.js'
import { EventModel } from "../schemas/event.schema.js";
import { GuestModel } from '../schemas/guest.schema.js';
import { UserModel } from '../schemas/user.schema.js';

export const createEvent = catchAsync(async (req, res) => {
    const { user } = req;
    const checkExisting = await EventModel.findOne({'name': req.body.name, 'user': user});
    const checkSubdomain = await EventModel.findOne({'subdomain': req.body.subdomain});
    
    // Please assist with the validations

    // Validation start
    if (checkExisting) {
      throw new AppError('Event already exists', 409);
    }

    if (checkSubdomain) {
      throw new AppError('Subdomain already exists. Please use another subdomain.', 409);
    }

    // if (req.body.start > Date()) {
    //   throw new AppError('Start date should be at a later date', 409);
    // }

    // if (req.body.start > req.body.end) {
    //   throw new AppError('End date should be after start date', 409);
    // }
    // Validation End

    const event = await EventModel.create(req.body);

    return AppResponse(res, 201, "Event Created Successfully", event)
})

export const myEvent = catchAsync(async (req, res) => {
  const user = await UserModel.findOne({'_id': req.query.id}) // Replace with auth user
  const subdomain = req.subdomain

  if (subdomain == req.get('host')) {
    const events = await EventModel.find({'user': user})

    return AppResponse(res, 200, "", events)
  } 

  const event = await EventModel.findOne({'user': user, 'subdomain': req.subdomain}) // Check if event belongs to user
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  return AppResponse(res, 200, "", event);
})

export const inviteGuest = catchAsync(async (req, res) => {
  const user = await UserModel.findOne({'_id': req.query.id}) // Replace with auth user
  const event = await EventModel.findOne({'user': user, 'subdomain': req.subdomain}) // Check if event belongs to user
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  const checkInvitee = await GuestModel.findOne({'email': req.body.email, 'event': event})

  if (checkInvitee) {
    throw new AppError('Invite already sent to guest', 409);
  }

  const guest = await GuestModel.create({
    ...req.body,
    'event': event,
  });

  // Send mail to guest

  return AppResponse(res, 201, "Guest has been sent an invite to your event", guest)
})

export const eventGuests = catchAsync(async (req, res) => {
  const user = await UserModel.findOne({'_id': req.query.id}) // Replace with auth user
  const event = await EventModel.findOne({'user': user, 'subdomain': req.subdomain}) // Check if event belongs to user
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  const guests = await GuestModel.find({'event': event})

  return AppResponse(res, 200, "", guests);
})

export const rsvpEvent = catchAsync(async (req, res) => {
  const event = await EventModel.findOne({'subdomain': req.subdomain});
  
  if (!event) {
    throw new AppError('Event does not exists', 400);
  }

  const guest = await GuestModel.findOne({'event': event, 'email': req.query.email})

  if (event.isPrivate && !guest) {
    throw new AppError('This event is private.', 400);
  }

  return AppResponse(res, 200, "", {"event": event,"guest": guest});
})

export const confirmRSVP = catchAsync(async (req, res) => {
  const event = await EventModel.findOne({'subdomain': req.subdomain});
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  const guest = await GuestModel.findOne({'event': event, 'email': req.query.email})

  if (event.isPrivate && !guest) {
    throw new AppError('This event is private.', 400);
  }

  let guestResponse;

  if (!guest) {
    guestResponse = await GuestModel.create({
      ...req.body,
      "event": event
    });
  } else {
    guestResponse = await GuestModel.findByIdAndUpdate(guest, req.body, {new: true});
  }

  if (guestResponse.attending) {
    // Send mail with event details (location)
    return AppResponse(res, 200, "Thank you for accepting to attend our event. The event details will be sent to your mail.", guestResponse);
  } else {
    return AppResponse(res, 200, "Ouch, we hope to see you next time", guestResponse);
  }
})

export const editEvent = catchAsync(async (req, res) => {
  // Check auth user
  const event = await EventModel.findOne({'user': req.body.user, 'subdomain': req.subdomain}) // Check if event belongs to user
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  const updatedEvent = await EventModel.findByIdAndUpdate(event, req.body, {new: true});

  return AppResponse(res, 200, "Event Updated successfully", updatedEvent);
})

export const deleteEvent = catchAsync(async (req, res) => {
  // Check auth user
  const event = await EventModel.findOne({'user': req.query.id, 'subdomain': req.subdomain}) // Check if event belongs to user
  
  if (!event) {
    throw new AppError('Event does not exists', 409);
  }

  await EventModel.findByIdAndDelete(event);

  return AppResponse(res, 204, "Event Deleted", null);
})
