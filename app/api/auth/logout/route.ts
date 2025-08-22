import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';
import { addTokenToBlacklist } from '../../../../lib/token-blacklist';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = JWTUtils.extractTokenFromHeader(authHeader);

    if (token) {
      const payload = JWTUtils.verifyToken(token);
      if (payload) {
        addTokenToBlacklist(token);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'خروج موفقیت‌آمیز بود'
    });

  } catch {
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}