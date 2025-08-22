import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';
import { connectToMongo } from '../../../../lib/db';
import { PasswordUtils } from '../../../../lib/password';
import { UserModel, IUser } from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!UserModel.validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = await connectToMongo();
    const usersCollection = db.collection<IUser>(UserModel.collectionName);

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await PasswordUtils.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await usersCollection.updateOne(
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

    return NextResponse.json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}