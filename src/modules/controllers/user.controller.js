import { catchAsync } from '../../common/utils/errorHandler.js'
import { UserModel } from '../schemas/user.schema.js'
import { AppResponse } from '../../common/utils/appResponse.js'
import { UserEntityTransformer } from '../../common/transformers/entityTransformer.js';

export const getUser = catchAsync(async (req, res) => {
    const { user } = req;
    return AppResponse(
      res,
      200,
      UserEntityTransformer(user),
      "Current user fetched successfully",
    );
});

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await UserModel.findByIdAndDelete(user);

    return AppResponse(res, 204, null, "User deleted successfully");
});
  

