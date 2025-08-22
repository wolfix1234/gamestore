import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils, JWTPayload } from './jwt';
import { AuthService } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export async function authenticateToken(request: NextRequest): Promise<{
  success: boolean;
  user?: JWTPayload;
  error?: string;
}> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return {
        success: false,
        error: 'No token provided'
      };
    }

    const decoded = JWTUtils.verifyToken(token);
    if (!decoded) {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }

    // Optionally verify user still exists and is active
    const user = await AuthService.getUserById(decoded.userId);
    if (!user || !user.isActive) {
      return {
        success: false,
        error: 'User not found or inactive'
      };
    }

    return {
      success: true,
      user: decoded
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed'
    };
  }
}

export function createAuthResponse(error: string, status: number = 401) {
  return NextResponse.json(
    {
      success: false,
      message: error
    },
    { status }
  );
}

export async function requireAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
): Promise<NextResponse> {
  const authResult = await authenticateToken(request);
  
  if (!authResult.success || !authResult.user) {
    return createAuthResponse(authResult.error || 'Authentication required');
  }

  return handler(request, authResult.user);
}

export async function requireRole(
  request: NextRequest,
  requiredRole: string,
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
): Promise<NextResponse> {
  const authResult = await authenticateToken(request);
  
  if (!authResult.success || !authResult.user) {
    return createAuthResponse(authResult.error || 'Authentication required');
  }

  if (authResult.user.role !== requiredRole) {
    return createAuthResponse('Insufficient permissions', 403);
  }

  return handler(request, authResult.user);
}