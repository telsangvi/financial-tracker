import jwt from 'jsonwebtoken';
import User from '../../entities/User';

export default class UserService {
  public static async registerUser(
    username: string,
    email: string,
    password: string,
  ) {
    try {
      console.log('register');
      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return {
          status: 200,
          isSuccess: false,
          message: 'User already exists',
        };
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password,
      });

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Respond with success message and token
      return {
        status: 201,
        isSuccess: true,
        message: 'User registered successfully',
        payload: token,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal Server Error',
      };
    }
  }

  public static async authenticateUser(email: string, password: string) {
    try {
      // Find the user by email and password
      const user = await User.findOne({ email, password });

      // Check if the user exists
      if (!user) {
        return {
          status: 401,
          isSuccess: false,
          message: 'Authentication failed. User not found.',
        };
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Respond with success message and token
      return {
        status: 200,
        isSuccess: true,
        message: 'Authentication successful',
        payload: token,
      };
    } catch (error) {
      console.error('Error authenticating user:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal Server Error',
      };
    }
  }
}
