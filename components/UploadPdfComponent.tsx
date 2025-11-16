"use client";

import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const UploadPdfComponent = () => {
  const [uploading, setIsUploading] = useState(false);
  const router = useRouter();
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdf = e.target.files?.[0];
    if (!pdf) return;
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (pdf.size > MAX_FILE_SIZE) {
      toast.error("Please upload a file smaller than 25 MB.");
      return;
    }
    if (pdf.type != "application/pdf") {
      toast.error("Only pdf files are allowed");
      return;
    }
    setIsUploading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfName: pdf.name,
          pdfType: pdf.type,
          pdfSize: pdf.size,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get upload url");
      }
      const data = await response.json();

      const uploadPdf = await fetch(data.data.uploadUrl, {
        method: "PUT",
        body: pdf,
        headers: { "Content-Type": pdf.type },
      });
      if (!uploadPdf.ok) {
        throw new Error("Upload failed ! Please try again later");
      }
      const save = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pdf.name,
          size: pdf.size,
          key: data.data.key,
        }),
      });
      const saveRes = await save.json();
      if (!save.ok) throw new Error(saveRes.error || "Failed to save the file");
      router.refresh();
      toast.success("PDF uploaded successfully !");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };
  return (
    <>
      <section className="w-full bg-white rounded-lg p-4 sm:p-6 shadow">
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer block w-full rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
        >
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={handleFile}
          />

          <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[220px]">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-blue-50 rounded-2xl mb-4">
              <CloudUpload className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>

            <h2 className="font-semibold text-base sm:text-lg">
              Drag & drop PDF files here
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              or click to browse and select files
            </p>

            <div className="flex justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm sm:text-base cursor-pointer"
                disabled={uploading}
              >
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {uploading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Spinner />
                      Uploading...
                    </div>
                  ) : (
                    " Browse files "
                  )}
                </label>
              </Button>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              Maximum file size: <strong>25MB</strong> per file
            </p>
          </div>
        </label>
      </section>
    </>
  );
};

export default UploadPdfComponent;
