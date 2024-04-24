import { UserEntityTransformer } from '../../common/transformers/entityTransformer.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import { catchAsync } from '../../common/utils/errorHandler.js';
import { UserModel } from '../schemas/user.schema.js';
import { compareData, signData, setCookie } from "../../common/utils/helper.js";
import { ENVIRONMENT } from '../../common/config/environment.js';


export const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate user data
    if (!name || !email || !password ) {
      throw new AppError('All fields are required', 400);
    }
  
    // Check if user already exists in the database
    const existingUser = await UserModel.findOne({'email': email});
    
    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    // Create a new user object
    const newUser = await UserModel.create(req.body);

  // Return success response
  return AppResponse(res, 201, 'Registration successful', UserEntityTransformer(newUser));
})

export const login = catchAsync(async (req, res) => {
    // Extract user data from request body
    const { email, password } = req.body;
  
    // Validate user data
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const user = await UserModel.findOne({'email': email});

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    // Check if password is correct
    const isPasswordCorrect = await compareData(password, user.password);
    
    if (!isPasswordCorrect) {
        throw new AppError("Invalid credentials", 401);
    }

    const accessToken = signData(
      { id: user.id },
      ENVIRONMENT.JWT.ACCESS_KEY,
      ENVIRONMENT.JWT_EXPIRES_IN.ACCESS
    );
  
    setCookie(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });

    const refreshToken = signData(
      { id: user.id },
      ENVIRONMENT.JWT.REFRESH_KEY,
      ENVIRONMENT.JWT_EXPIRES_IN.REFRESH
    );
    setCookie(res, 'refreshToken', refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
    const updatedUser = await UserModel.findByIdAndUpdate(user.id, {refreshToken});
  
    // Return success response
    return AppResponse(res, 200, 'Login successful', UserEntityTransformer(updatedUser));
});  