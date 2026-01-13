import { NextRequest, NextResponse } from "next/server";
import { createUserProgress, getAllUserProgress, deleteUserProgress } from "@/services/user-progress";

/**
 * GET /api/user-progress?userId=xxx
 * Get all progress for a user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const progress = await getAllUserProgress(userId);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch user progress" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user-progress
 * Create new progress record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, moduleId, currentLesson } = body;

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: "userId and moduleId are required" },
        { status: 400 }
      );
    }

    const progress = await createUserProgress({
      userId,
      moduleId,
      currentLesson,
    });

    return NextResponse.json({ progress }, { status: 201 });
  } catch (error) {
    console.error("Error creating user progress:", error);
    return NextResponse.json(
      { error: "Failed to create user progress" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user-progress?userId=xxx&moduleId=xxx
 * Delete progress record for a specific module
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const moduleId = searchParams.get("moduleId");

    if (!userId || !moduleId) {
      return NextResponse.json(
        { error: "userId and moduleId are required" },
        { status: 400 }
      );
    }

    await deleteUserProgress(userId, moduleId);

    return NextResponse.json({ message: "Progress deleted successfully" });
  } catch (error) {
    console.error("Error deleting user progress:", error);
    return NextResponse.json(
      { error: "Failed to delete user progress" },
      { status: 500 }
    );
  }
}
