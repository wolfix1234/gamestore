import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/middleware';
import { AuthService } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    try {
      const body = await req.json();
      const { currentPassword, newPassword, confirmPassword } = body;

      // Basic validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        return NextResponse.json(
          {
            success: false,
            message: 'Current password, new password, and confirm password are required'
          },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          {
            success: false,
            message: 'New password and confirm password do not match'
          },
          { status: 400 }
        );
      }

      if (currentPassword === newPassword) {
        return NextResponse.json(
          {
            success: false,
            message: 'New password must be different from current password'
          },
          { status: 400 }
        );
      }

      const result = await AuthService.changePassword(
        user.userId,
        currentPassword,
        newPassword
      );

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            message: result.message
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: result.message
        },
        { status: 200 }
      );

    } catch (error) {
      console.error('Change password API error:', error);
      
      return NextResponse.json(
        {
          success: false,
          message: 'Internal server error'
        },
        { status: 500 }
      );
    }
  });
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}