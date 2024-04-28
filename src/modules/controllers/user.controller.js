import { catchAsync } from '../../common/utils/errorHandler.js'
import { UserModel } from '../schemas/user.schema.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { UserEntityTransformer } from '../../common/transformers/entityTransformer.js';
import { GuestModel } from '../schemas/guest.schema.js';
import { EventModel } from '../schemas/event.schema.js';

export const getUser = catchAsync(async (req, res) => {
    const { user } = req;
    const events = (await EventModel.find({"user": user})).length
    const rsvps = (await GuestModel.find({"email": user.email})).length

    return AppResponse(
      res,
      200,
      "Current user fetched successfully",
      {
        "user": UserEntityTransformer(user),
        "events": events,
        "rsvps": rsvps
      },
    );
});

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await UserModel.findByIdAndDelete(user);

    return AppResponse(res, 204, "User deleted successfully", null);
});
  

