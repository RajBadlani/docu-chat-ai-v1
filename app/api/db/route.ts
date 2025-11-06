import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const { name, size, key } = await request.json();
    if (!name || !key || !size) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.pdf.create({
      data: {
        key,
        name,
        size,
        userId: session.user.id,
      },
    });
    return NextResponse.json(
      { success: true, message: "PDF data uploaded successfully " },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error saving PDF ${error}`);
    return NextResponse.json(
      { success: false, message: "Failed to save PDF" },
      { status: 500 }
    );
  }
}
