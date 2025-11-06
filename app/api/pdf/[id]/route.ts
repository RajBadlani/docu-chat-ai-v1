import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { s3DeleteUrl, s3GetUrl } from "@/lib/s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json(
        { success: false, message: "PDF Id not found" },
        { status: 400 }
      );
    const userId = session.user.id;

    const pdf = await prisma.pdf.findUnique({
      where: { id: id, userId: userId },
    });
    if (!pdf)
      return NextResponse.json(
        { success: false, message: "PDF not found" },
        { status: 400 }
      );

    const pdfUrl = await s3GetUrl(pdf?.key as string);
    if (!pdfUrl)
      return NextResponse.json(
        { success: false, message: "Unable to fetch the PDF" },
        { status: 400 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "PDF found successfully",
        data: { pdfId: id, pdfName: pdf?.name, pdfUrl: pdfUrl },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json(
        { success: false, message: "Pdf ID not found " },
        { status: 400 }
      );

    const pdf = await prisma.pdf.findUnique({
      where: { id: id },
      select: { key: true, userId: true },
    });
    if (!pdf || pdf.userId !== session.user.id)
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );

    await s3DeleteUrl(pdf.key);
    await prisma.pdf.delete({
      where: { id: id },
    });

    return NextResponse.json({
      success: true,
      message: "PDF deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
