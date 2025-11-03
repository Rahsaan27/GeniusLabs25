import { NextRequest, NextResponse } from "next/server";
import { getUserProgress, updateUserProgress } from "@/services/user-progress";

/**
 * GET /api/user-progress/[moduleId]?userId=xxx
 * Get progress for a specific module
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const progress = await getUserProgress(userId, moduleId);

    if (!progress) {
      return NextResponse.json(
        { error: "Progress not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching module progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch module progress" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user-progress/[moduleId]
 * Update progress for a specific module
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await request.json();
    const { userId, ...updates } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const progress = await updateUserProgress({
      userId,
      moduleId,
      ...updates,
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error updating module progress:", error);
    return NextResponse.json(
      { error: "Failed to update module progress" },
      { status: 500 }
    );
  }
}
