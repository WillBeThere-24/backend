import { catchAsync } from '../../common/utils/errorHandler.js'
import { UserModel } from '../schemas/user.schema.js'
import { EventModel } from '../schemas/event.schema.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { UserEntityTransformer } from '../../common/transformers/entityTransformer.js';

export const getUser = catchAsync(async (req, res) => {
    const { user } = req;

    const eventCount = await user.eventCount
    const rsvpCount = await user.rsvpCount

    const latestThree = await EventModel.find({ user: user }).sort({ createdAt: -1 }).limit(3)

    return AppResponse(
      res,
      200,
      "Current user fetched successfully",
      { ...UserEntityTransformer(user), eventCount, rsvpCount, latestThree }
    );
});

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await UserModel.findByIdAndDelete(user);

    return AppResponse(res, 204, "User deleted successfully", null);
});
  

