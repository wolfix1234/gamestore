import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  role: 'user' | 'admin';
  lastLogin?: Date;
  emailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export interface IUserResponse {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
  role: 'user' | 'admin';
  lastLogin?: Date;
  emailVerified: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  static collectionName = 'users';

  static sanitizeUser(user: IUser): IUserResponse {
    return {
      id: user._id?.toString() || '',
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      isActive: user.isActive,
      role: user.role,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified
    };
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  static validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
  }
}