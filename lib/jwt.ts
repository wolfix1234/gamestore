import * as jwt from 'jsonwebtoken';
import { IUserResponse } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
}

export class JWTUtils {
  static generateToken(user: IUserResponse): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'pezeshki-app',
      audience: 'pezeshki-users'
    } as jwt.SignOptions);
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'pezeshki-app',
        audience: 'pezeshki-users'
      } as jwt.VerifyOptions) as JWTPayload;
      
      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }

  static extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader) return null;
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }
    
    return parts[1];
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: '30d' } as jwt.SignOptions
    );
  }

  static verifyRefreshToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
      if (decoded.type !== 'refresh') {
        return null;
      }
      return { userId: decoded.userId };
    } catch {
      return null;
    }
  }
}