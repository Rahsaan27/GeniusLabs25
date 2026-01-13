import { NextRequest, NextResponse } from 'next/server';
import {
  getUserAchievements,
  unlockAchievement,
  getAchievementsWithStatus,
  checkAndUnlockAchievements,
  getUserProfile,
} from '@/services/profile';

// GET /api/achievements?email=user@example.com
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

    const achievements = await getAchievementsWithStatus(email);

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

// POST /api/achievements - Unlock a specific achievement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, achievementId } = body;

    if (!email || !achievementId) {
      return NextResponse.json(
        { error: 'Email and achievementId are required' },
        { status: 400 }
      );
    }

    const achievement = await unlockAchievement(email, achievementId);

    return NextResponse.json({ success: true, achievement });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return NextResponse.json(
      { error: 'Failed to unlock achievement' },
      { status: 500 }
    );
  }
}

// PUT /api/achievements - Check and unlock all eligible achievements
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const profile = await getUserProfile(email);
    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    const newAchievements = await checkAndUnlockAchievements(email, profile);

    return NextResponse.json({
      success: true,
      newAchievements,
      count: newAchievements.length,
    });
  } catch (error) {
    console.error('Error checking achievements:', error);
    return NextResponse.json(
      { error: 'Failed to check achievements' },
      { status: 500 }
    );
  }
}
