import { NextRequest, NextResponse } from "next/server";
import { MessageService } from "@/lib/message-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cohortId, userId, userName, content, type, isAdminMessage } = body;

    if (!cohortId || !userId || !userName || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = await MessageService.createMessage({
      cohortId,
      userId,
      userName,
      content,
      type,
      isAdminMessage,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get("cohortId");
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (cohortId) {
      const messages = await MessageService.getMessagesByCohort(cohortId, limit);
      return NextResponse.json(messages);
    }

    if (userId) {
      const messages = await MessageService.getMessagesByUser(userId, limit);
      return NextResponse.json(messages);
    }

    return NextResponse.json(
      { error: "Either cohortId or userId is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}