import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';
import { connectToMongo } from '../../../../lib/db';
import { UserModel, IUser } from '../../../../models/User';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication token not found' },
        { status: 401 }
      );
    }

    const decoded = JWTUtils.verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const db = await connectToMongo();
    const usersCollection = db.collection<IUser>(UserModel.collectionName);

    // Find user by ID from token
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated' },
        { status: 401 }
      );
    }

    const sanitizedUser = UserModel.sanitizeUser(user);

    return NextResponse.json({
      success: true,
      user: sanitizedUser
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}