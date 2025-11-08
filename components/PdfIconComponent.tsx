"use client";

import { Eye, Trash, Loader2 ,MessageSquare} from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PDFIconProps {
  pdfId : string;
  isIngested : boolean ;
}

const PdfIconComponent = ({ pdfId , isIngested } : PDFIconProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [ingested, setIngested] = useState(isIngested);
  const [loadingIngestion, setLoadingIngestion] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleView = async () => {
    if (loadingDelete) return;
    try {
      const res = await fetch(`/api/pdf/${pdfId}`);
      if (!res.ok) throw new Error("Failed to fetch PDF");
      const data = await res.json();
      window.open(data.data.pdfUrl, "_blank");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to view PDF"
      );
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const res = await fetch(`/api/pdf/${pdfId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete the PDF");
      router.refresh();
      toast.success("File deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete the PDF"
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleClick = async () => {
    if(ingested){
      toast.info("This PDF is already ingested — ready to chat!");
      return;
    }
    setLoadingIngestion(true);
    try {
      const res = await fetch("/api/pdf/ingest", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({pdfId}),
      });

      const data = await res.json();

      if (!res.ok) {
      throw new Error(data.message || "Failed to ingest the PDF");
    }
      toast.success(  data.message || "PDF ingested successfully !");
      setIngested(true)
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to ingest the PDF"
      );
    } finally {
      setLoadingIngestion(false);
    }
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={handleView}
        title="View PDF"
        aria-label="View PDF"
        disabled={loadingDelete}
        className={`transition-transform duration-150 hover:scale-105 cursor-pointer ${
          loadingDelete
            ? "cursor-not-allowed opacity-50"
            : "hover:text-blue-600"
        }`}
      >
        <Eye width={22} height={22} />
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button
            title="Delete PDF"
            aria-label="Delete PDF"
            disabled={loadingDelete}
            className={`transition-transform duration-150 hover:scale-105 ${
              loadingDelete
                ? "cursor-not-allowed opacity-50"
                : "hover:text-red-600"
            }`}
          >
            {loadingDelete ? (
              <Loader2
                className="animate-spin text-red-400"
                width={20}
                height={20}
              />
            ) : (
              <Trash width={20} height={20} />
            )}
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete PDF?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loadingDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loadingDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loadingDelete ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Chat Button */}
      <Button
      onClick={handleClick}
        disabled={loadingDelete || loadingIngestion }
        className={`bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm font-medium 
          transition-all duration-200 hover:bg-blue-700 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loadingDelete || loadingIngestion ? (
          <Loader2 className="animate-spin text-white w-4 h-4" />
        ) : (
          <>
          <MessageSquare className="w-4 h-4" />
            <span>{isIngested ? "Chat Ready ✅" : "Chat"}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default PdfIconComponent;
