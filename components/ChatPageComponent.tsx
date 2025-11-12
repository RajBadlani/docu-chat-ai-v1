"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

const ChatPageComponent = ({ pdfId }: { pdfId: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await fetch(`/api/pdf/${pdfId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch PDF");
        const data = await res.json();
        setUrl(data?.data?.pdfUrl);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch the PDF"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
  }, [pdfId]);

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel
          defaultSize={40}
          minSize={30}
          className=" p-2 "
        >
          {loading && (
            <div className="flex items-center justify-center h-full text-gray-600">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          )}
          {url && (
            <iframe
              src={url}
              className="h-full w-full overflow-hidden rounded-lg border border-gray-200"
            />
          )}
        </ResizablePanel>
        <ResizableHandle className="bg-gray-400 hover:bg-blue-400 cursor-col-resize transition-colors duration-200" />
        <ResizablePanel
          defaultSize={60}
          minSize={50}
          className=""
        >
          Two
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatPageComponent;
