import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { s3UploadUrl } from "@/lib/s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { pdfName, pdfType, pdfSize } = await request.json();
    if (!pdfName || !pdfType || !pdfSize)
      return NextResponse.json(
        { success: false, message: "Please provide all details" },
        { status: 400 }
      );
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (pdfSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large (max 25MB" },
        { status: 400 }
      );
    }
    if (!pdfType.startsWith("application/pdf")) {
      return NextResponse.json(
        { success: false, message: "Only PDF files allowed" },
        { status: 400 }
      );
    }

    const updatedPdfName = `${pdfName}-${Date.now()}`;
    const { uploadUrl, key } = await s3UploadUrl(
      session.user.id,
      updatedPdfName,
      pdfType
    );
    return NextResponse.json(
      {
        success: true,
        message: "PDF Uploaded Successfully ",
        data: {
          uploadUrl: uploadUrl,
          key: key,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating upload URL:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {

    const pdfs = await prisma.pdf.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        size: true,
        isIngested: true,
        createdAt: true,
        user : true 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        message: pdfs.length > 0 ? "PDFs found" : "No PDFs uploaded yet",
        data: pdfs,
      },
      { status: 200 }
    );

  } catch (error) {
    
    console.error("Error in fetching PDF's :", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
