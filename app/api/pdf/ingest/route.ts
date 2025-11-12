import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ingestion } from "@/lib/rag/ingestion";
import { s3GetUrl } from "@/lib/s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const { pdfId } = await req.json();
    if (!pdfId)
      return NextResponse.json(
        { success: false, message: "PDF id not found" },
        { status: 400 }
      );

    const pdf = await prisma.pdf.findUnique({
      where: { id: pdfId, userId: session.user.id },
    });
    if (!pdf)
      return NextResponse.json(
        { success: false, message: "PDF not found" },
        { status: 400 }
      );
    if (pdf.isIngested) {
      return NextResponse.json(
        { success: true, message: "PDF ingested — ready to chat!" },
        { status: 200 }
      );
    }
    const pdfUrl = await s3GetUrl(pdf.key);
    if (!pdfUrl)
      return NextResponse.json(
        { success: false, message: "Failed to fetch the PDF" },
        { status: 400 }
      );

    const response = await ingestion({
      pdfUrl,
      pdfName: pdf.name,
      pdfId,
      userId: session.user.id,
    });
    if (!response.status)
      return NextResponse.json(
        { success: false, message: "Ingestion failed" },
        { status: 400 }
      );
      
    await prisma.pdf.update({
      where: { id: pdfId },
      data: { isIngested: true },
    });
    return NextResponse.json(
      { success: true, message: "PDF ingested successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Error occured ${error}`);
    return NextResponse.json({ error: "Ingestion failed" }, { status: 500 });
  }
}
