import { NextRequest, NextResponse } from "next/server";
import { getUserRole, assignUserRole, getAllRoleMappings } from "@/services/user-roles";
import { UserRole } from "@/types/roles";

/**
 * GET /api/roles
 * Get user role by email or all role mappings
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    // If email provided, get specific user's role
    if (email) {
      const role = await getUserRole(email);
      return NextResponse.json({ email, role });
    }

    // Otherwise, get all role mappings (admin only)
    const allMappings = await getAllRoleMappings();
    return NextResponse.json({ mappings: allMappings });
  } catch (error) {
    console.error("Error in GET /api/roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/roles
 * Assign role to a user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role, assignedBy, cohortIds } = body;

    // Validate input
    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    // Validate role
    if (!['student', 'genius', 'educator', 'admin', 'superadmin'].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be student, genius, educator, admin, or superadmin" },
        { status: 400 }
      );
    }

    // TODO: Add authentication check - only admins should be able to assign roles
    // For now, we'll allow it for setup purposes

    const mapping = await assignUserRole(email, role as UserRole, assignedBy, cohortIds);

    return NextResponse.json({
      success: true,
      mapping
    });
  } catch (error) {
    console.error("Error in POST /api/roles:", error);
    return NextResponse.json(
      { error: "Failed to assign role" },
      { status: 500 }
    );
  }
}
