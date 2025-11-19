import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { similaritySearch } from "@/lib/rag/similartiySearch";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  const userId = session.user.id;

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const lastMessage = messages[messages.length - 1];

    const textPart = lastMessage.parts.find((p) => p.type === "text") as
      | { type: "text"; text: string }
      | undefined;

    if (!textPart) {
      return NextResponse.json(
        { status: false, message: "No text message found" },
        { status: 400 }
      );
    }

    const queryMessage = textPart.text;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfId = (lastMessage.metadata as any).pdfId;
    if (!pdfId) {
      return NextResponse.json(
        { status: false, message: "pdfId missing" },
        { status: 400 }
      );
    }

    const docs = await similaritySearch({
      query: queryMessage,
      userId,
      pdfId,
      topK: 5,
    });

    const noContext = docs.length === 0;
    if (noContext) {
      const result = streamText({
        model: google("gemini-2.0-flash"),
        messages: convertToModelMessages(messages),
      });
      return result.toUIMessageStreamResponse();
    }

    const context = docs
      .map((doc) => {
        const meta = doc.metadata || {};
        const page = meta["loc.pageNumber"] ?? "Unknown";
        const from = meta["loc.lines.from"] ?? "Unknown";
        const to = meta["loc.lines.to"] ?? "Unknown";

        return `
        [PDF_PAGE: ${page}]
        [PDF_LINES: ${from} - ${to}]

        ${doc.pageContent}
        `;
      })
      .join("\n---\n");

    const systemText = `You are a highly knowledgeable assistant.

When the user's question is related to the PDF, use the PDF context provided below.
- Understand it.
- Explain clearly in your own words.
- ALWAYS include the page number and line range in your answer.

Format example:
"Based on Page 12 (Lines 40-55): <your explanation>"

If the question is NOT related to the PDF:
- Answer normally.
- Do NOT say "I cannot find this in the document" unless the question is clearly PDF-specific.

PDF CONTEXT:
${context}`;

    const systemMessage = {
      role: "system" as const,
      content: systemText,
    };

    const modelMessages = [systemMessage, ...convertToModelMessages(messages)];

    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error occurred:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
