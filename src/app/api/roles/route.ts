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
 * Assign role to a user (Admin/SuperAdmin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Extract requesting user's email from query params or headers
    const requestingUserEmail = request.nextUrl.searchParams.get("requestingUser");

    // Authentication check - only admins and superadmins can assign roles
    if (!requestingUserEmail) {
      return NextResponse.json(
        { error: "Authentication required. Missing requesting user email." },
        { status: 401 }
      );
    }

    const requestingUserRole = await getUserRole(requestingUserEmail);
    if (requestingUserRole !== 'admin' && requestingUserRole !== 'superadmin') {
      return NextResponse.json(
        { error: "Forbidden. Only admins and superadmins can assign roles." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, role, assignedBy } = body;

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

    // Only superadmins can assign superadmin role
    if (role === 'superadmin' && requestingUserRole !== 'superadmin') {
      return NextResponse.json(
        { error: "Forbidden. Only superadmins can assign superadmin role." },
        { status: 403 }
      );
    }

    const mapping = await assignUserRole(email, role as UserRole, assignedBy || requestingUserEmail);

    return NextResponse.json({
      success: true,
      mapping
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to assign role" },
      { status: 500 }
    );
  }
}
