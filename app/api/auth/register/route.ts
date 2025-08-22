import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';
import { connectToMongo } from '../../../../lib/db';
import { PasswordUtils } from '../../../../lib/password';
import { UserModel, IUser } from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!UserModel.validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!UserModel.validateUsername(username)) {
      return NextResponse.json(
        { success: false, message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' },
        { status: 400 }
      );
    }

    if (!UserModel.validatePassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const db = await connectToMongo();
    const usersCollection = db.collection<IUser>(UserModel.collectionName);

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return NextResponse.json(
        { success: false, message: `User with this ${field} already exists` },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await PasswordUtils.hashPassword(password);

    // Create user
    const newUser: IUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      role: 'user',
      emailVerified: false
    };

    const result = await usersCollection.insertOne(newUser);
    newUser._id = result.insertedId;

    const sanitizedUser = UserModel.sanitizeUser(newUser);
    const token = JWTUtils.generateToken(sanitizedUser);

    return NextResponse.json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}