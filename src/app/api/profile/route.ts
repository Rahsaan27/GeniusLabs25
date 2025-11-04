import { NextRequest, NextResponse } from 'next/server';
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  updateUserStats,
} from '@/services/profile';

// GET /api/profile?email=user@example.com
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    let profile = await getUserProfile(email);

    // If profile doesn't exist, create one
    if (!profile) {
      profile = await createUserProfile(email);
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create or update profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, displayName, bio, avatarUrl } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if profile exists
    let profile = await getUserProfile(email);

    if (!profile) {
      // Create new profile
      profile = await createUserProfile(email, displayName);
    } else {
      // Update existing profile
      const updates: any = {};
      if (displayName !== undefined) updates.displayName = displayName;
      if (bio !== undefined) updates.bio = bio;
      if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

      if (Object.keys(updates).length > 0) {
        profile = await updateUserProfile(email, updates);
      }
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// PATCH /api/profile - Update profile settings
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, ...updates } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const profile = await updateUserProfile(email, updates);

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error updating profile settings:', error);
    return NextResponse.json(
      { error: 'Failed to update profile settings' },
      { status: 500 }
    );
  }
}

// PUT /api/profile/stats - Update user stats
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, stats } = body;

    if (!email || !stats) {
      return NextResponse.json(
        { error: 'Email and stats are required' },
        { status: 400 }
      );
    }

    const profile = await updateUserStats(email, stats);

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error updating user stats:', error);
    return NextResponse.json(
      { error: 'Failed to update user stats' },
      { status: 500 }
    );
  }
}
