"use client";

import dynamic from "next/dynamic";

const ChatPageComponent = dynamic(() => import("@/components/ChatPageComponent"), {
  ssr: false,
});

const PdfClientWrapper = ({ pdfId }: { pdfId: string }) => {
  return <ChatPageComponent pdfId={pdfId} />;
};

export default PdfClientWrapper;
