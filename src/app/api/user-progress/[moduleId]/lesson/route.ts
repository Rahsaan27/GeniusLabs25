import { NextRequest, NextResponse } from "next/server";
import { markLessonCompleted } from "@/services/user-progress";

/**
 * POST /api/user-progress/[moduleId]/lesson
 * Mark a lesson as completed
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await request.json();
    const { userId, lessonId } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: "userId and lessonId are required" },
        { status: 400 }
      );
    }

    const progress = await markLessonCompleted(userId, moduleId, lessonId);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error marking lesson completed:", error);
    return NextResponse.json(
      { error: "Failed to mark lesson as completed" },
      { status: 500 }
    );
  }
}
