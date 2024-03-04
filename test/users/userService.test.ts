import jwt from 'jsonwebtoken';
import User from '../../src/entities/User';
import UserService from '../../src/users/services/userService';

jest.mock('jsonwebtoken');
jest.mock('../../src/entities/User');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('registers a new user successfully', async () => {
      const mockToken = 'mockToken';
      const mockUser = new User(); // create a mock user instance as needed

      (User.findOne as jest.Mock).mockResolvedValueOnce(null);
      (User.prototype.save as jest.Mock).mockResolvedValueOnce(mockUser);
      (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

      const result = await UserService.registerUser('username', 'email@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: 'username' }, { email: 'email@example.com' }] });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, 'mockSecret', { expiresIn: '1h' });

      expect(result).toEqual({
        status: 201,
        isSuccess: true,
        message: 'User registered successfully',
        payload: mockToken,
      });
    });

    it('fails to register an existing user', async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({}); // assuming an existing user is found

      const result = await UserService.registerUser('existingUsername', 'existing@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: 'existingUsername' }, { email: 'existing@example.com' }] });
      expect(User.prototype.save).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();

      expect(result).toEqual({
        status: 200,
        isSuccess: false,
        message: 'User already exists',
      });
    });

    it('handles internal server error during registration', async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('Some database error'));

      const result = await UserService.registerUser('username', 'email@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: 'username' }, { email: 'email@example.com' }] });
      expect(User.prototype.save).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();

      expect(result).toEqual({
        status: 500,
        isSuccess: false,
        message: 'Internal Server Error',
      });
    });
  });

  describe('authenticateUser', () => {
    it('authenticates a user successfully', async () => {
      const mockToken = 'mockToken';
      const mockUser = new User(); // create a mock user instance as needed

      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

      const result = await UserService.authenticateUser('email@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'email@example.com', password: 'password' });
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, 'mockSecret', { expiresIn: '1h' });

      expect(result).toEqual({
        status: 200,
        isSuccess: true,
        message: 'Authentication successful',
        payload: mockToken,
      });
    });

    it('fails to authenticate a non-existing user', async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);

      const result = await UserService.authenticateUser('nonexisting@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexisting@example.com', password: 'password' });
      expect(jwt.sign).not.toHaveBeenCalled();

      expect(result).toEqual({
        status: 401,
        isSuccess: false,
        message: 'Authentication failed. User not found.',
      });
    });

    it('handles internal server error during authentication', async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('Some database error'));

      const result = await UserService.authenticateUser('email@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'email@example.com', password: 'password' });
      expect(jwt.sign).not.toHaveBeenCalled();

      expect(result).toEqual({
        status: 500,
        isSuccess: false,
        message: 'Internal Server Error',
      });
    });
  });
});
