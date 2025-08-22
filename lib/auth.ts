import { Collection } from 'mongodb';
import { IUser, IUserResponse, IUserLogin, IUserRegister, UserModel } from '../models/User';
import { PasswordUtils } from './password';
import { JWTUtils } from './jwt';
import { connectToMongo } from './db';

export interface AuthResult {
  success: boolean;
  message: string;
  user?: IUserResponse;
  token?: string;
}

export class AuthService {
  private static async getUserCollection(): Promise<Collection<IUser>> {
    const db = await connectToMongo();
    return db.collection<IUser>(UserModel.collectionName);
  }

  static async register(userData: IUserRegister): Promise<AuthResult> {
    try {
      const { username, email, password } = userData;

      // Validate input
      if (!UserModel.validateEmail(email)) {
        return {
          success: false,
          message: 'فرمت ایمیل نامعتبر است'
        };
      }

      if (!UserModel.validateUsername(username)) {
        return {
          success: false,
          message: 'نام کاربری باید بین ۳ تا ۲۰ کاراکتر باشد و فقط شامل حروف، اعداد و خط تیره باشد'
        };
      }

      if (!UserModel.validatePassword(password)) {
        return {
          success: false,
          message: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
        };
      }

      const collection = await this.getUserCollection();

      // Check if user already exists
      const existingUser = await collection.findOne({
        $or: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      });

      if (existingUser) {
        return {
          success: false,
          message: 'کاربری با این ایمیل یا نام کاربری قبلاً ثبت شده است'
        };
      }

      // Hash password
      const hashedPassword = await PasswordUtils.hashPassword(password);

      // Create new user
      const newUser: IUser = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        role: 'user',
        emailVerified: false
      };

      const result = await collection.insertOne(newUser);
      
      if (!result.insertedId) {
        return {
          success: false,
          message: 'خطا در ایجاد کاربر'
        };
      }

      // Get the created user
      const createdUser = await collection.findOne({ _id: result.insertedId });
      if (!createdUser) {
        return {
          success: false,
          message: 'خطا در بازیابی اطلاعات کاربر'
        };
      }

      const sanitizedUser = UserModel.sanitizeUser(createdUser);
      const token = JWTUtils.generateToken(sanitizedUser);

      return {
        success: true,
        message: 'ثبت نام با موفقیت انجام شد',
        user: sanitizedUser,
        token
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'خطای داخلی سرور در هنگام ثبت نام'
      };
    }
  }

  static async login(loginData: IUserLogin): Promise<AuthResult> {
    try {
      const { email, password } = loginData;

      if (!email || !password) {
        return {
          success: false,
          message: 'ایمیل و رمز عبور الزامی است'
        };
      }

      const collection = await this.getUserCollection();

      // Find user by email
      const user = await collection.findOne({ 
        email: email.toLowerCase() 
      });

      if (!user) {
        return {
          success: false,
          message: 'ایمیل یا رمز عبور نادرست است'
        };
      }

      if (!user.isActive) {
        return {
          success: false,
          message: 'حساب کاربری غیرفعال است. لطفاً با پشتیبانی تماس بگیرید'
        };
      }

      // Verify password
      const isPasswordValid = await PasswordUtils.comparePassword(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'ایمیل یا رمز عبور نادرست است'
        };
      }

      // Update last login
      await collection.updateOne(
        { _id: user._id },
        { 
          $set: { 
            lastLogin: new Date(),
            updatedAt: new Date()
          } 
        }
      );

      const sanitizedUser = UserModel.sanitizeUser(user);
      const token = JWTUtils.generateToken(sanitizedUser);

      return {
        success: true,
        message: 'ورود با موفقیت انجام شد',
        user: sanitizedUser,
        token
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'خطای داخلی سرور در هنگام ورود'
      };
    }
  }

  static async getUserById(userId: string): Promise<IUserResponse | null> {
    try {
      const collection = await this.getUserCollection();
      const { ObjectId } = await import('mongodb');
      
      const user = await collection.findOne({ 
        _id: new ObjectId(userId) 
      });

      if (!user || !user.isActive) {
        return null;
      }

      return UserModel.sanitizeUser(user);
    } catch (error) {
      console.error('Get user by ID error:', error);
      return null;
    }
  }

  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<AuthResult> {
    try {
      const collection = await this.getUserCollection();
      const { ObjectId } = await import('mongodb');

      // Remove sensitive fields that shouldn't be updated directly
      const { ...safeUpdateData } = updateData;

      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { 
          $set: { 
            ...safeUpdateData,
            updatedAt: new Date()
          } 
        }
      );

      if (result.matchedCount === 0) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      const updatedUser = await collection.findOne({ _id: new ObjectId(userId) });
      if (!updatedUser) {
        return {
          success: false,
          message: 'Failed to retrieve updated user'
        };
      }

      return {
        success: true,
        message: 'User updated successfully',
        user: UserModel.sanitizeUser(updatedUser)
      };

    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        message: 'Internal server error during update'
      };
    }
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<AuthResult> {
    try {
      const collection = await this.getUserCollection();
      const { ObjectId } = await import('mongodb');

      const user = await collection.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Verify current password
      const isCurrentPasswordValid = await PasswordUtils.comparePassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Validate new password
      if (!UserModel.validatePassword(newPassword)) {
        return {
          success: false,
          message: 'New password must be at least 6 characters long'
        };
      }

      // Hash new password
      const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);

      // Update password
      await collection.updateOne(
        { _id: new ObjectId(userId) },
        { 
          $set: { 
            password: hashedNewPassword,
            updatedAt: new Date()
          } 
        }
      );

      return {
        success: true,
        message: 'Password changed successfully'
      };

    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Internal server error during password change'
      };
    }
  }
}