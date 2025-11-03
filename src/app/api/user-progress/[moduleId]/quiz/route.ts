import { NextRequest, NextResponse } from "next/server";
import { updateQuizScore } from "@/services/user-progress";

/**
 * POST /api/user-progress/[moduleId]/quiz
 * Update quiz score
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await request.json();
    const { userId, quizId, score } = body;

    if (!userId || !quizId || score === undefined) {
      return NextResponse.json(
        { error: "userId, quizId, and score are required" },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json(
        { error: "score must be a number between 0 and 100" },
        { status: 400 }
      );
    }

    const progress = await updateQuizScore(userId, moduleId, quizId, score);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error updating quiz score:", error);
    return NextResponse.json(
      { error: "Failed to update quiz score" },
      { status: 500 }
    );
  }
}
