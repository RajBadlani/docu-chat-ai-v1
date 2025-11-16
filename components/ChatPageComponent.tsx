"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatbotComponent from "./ChatbotComponent";

export default function ChatPageComponent({
  pdfId,
  pdfUrl,
}: {
  pdfId: string;
  pdfUrl: string;
}) {
  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30} className="p-2">
          <iframe
            src={pdfUrl}
            className="h-full w-full rounded-lg border border-gray-200 overflow-hidden"
          />
        </ResizablePanel>

        <ResizableHandle className="bg-gray-400 hover:bg-blue-400 cursor-col-resize transition-colors duration-200" />

        <ResizablePanel defaultSize={60} minSize={50} className="p-3">
          <ChatbotComponent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
