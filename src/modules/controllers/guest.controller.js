import AppError from '../../common/utils/appError.js'
import { AppResponse } from '../../common/utils/appResponse.js';
import { catchAsync } from '../../common/utils/errorHandler.js'
import { EventModel } from "../schemas/event.schema.js";
import { GuestModel } from '../schemas/guest.schema.js';

export const rsvpEvent = catchAsync(async (req, res) => {
  const event = await EventModel.findById(req.params.id)

  if (!event) {
    throw new AppError("req.params.id", 400);
  }

  const guest = await GuestModel.findOne({'event': event, '_id': req.query.guest})
  
  if (event.isPrivate && !guest) {
    throw new AppError('This event is private.', 400);
  }

  return AppResponse(res, 200, "", {"event": event, "guest": guest});
})

export const confirmRSVP = catchAsync(async (req, res) => {
  const event = await EventModel.findById(req.params.id)

  if (!event) {
    throw new AppError('Event does not exists', 400);
  }

  const guest = await GuestModel.findOne({'event': event, '_id': req.query.guest})

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