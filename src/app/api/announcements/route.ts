import { NextRequest, NextResponse } from "next/server";
import { createAnnouncement, getAnnouncementsByCohort } from "@/services/announcements";
import { getUserRole } from "@/services/user-roles";

/**
 * GET /api/announcements?cohortId=xxx
 * Get all announcements for a cohort
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cohortId = searchParams.get("cohortId");

    if (!cohortId) {
      return NextResponse.json(
        { error: "cohortId is required" },
        { status: 400 }
      );
    }

    const announcements = await getAnnouncementsByCohort(cohortId);
    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/announcements
 * Create a new announcement (admin/educator only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cohortId, title, content, createdBy, priority, userEmail } = body;

    if (!cohortId || !title || !content || !createdBy || !userEmail) {
      return NextResponse.json(
        { error: "cohortId, title, content, createdBy, and userEmail are required" },
        { status: 400 }
      );
    }

    // Check if user has permission to create announcements
    const userRole = await getUserRole(userEmail);
    if (userRole !== 'admin' && userRole !== 'educator' && userRole !== 'superadmin') {
      return NextResponse.json(
        { error: "Insufficient permissions. Only admins and educators can create announcements" },
        { status: 403 }
      );
    }

    const announcement = await createAnnouncement({
      cohortId,
      title,
      content,
      createdBy,
      priority,
    });

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}
