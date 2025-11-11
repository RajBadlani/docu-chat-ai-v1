"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { ChevronLeft, ChevronRight, Search, Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { ScrollArea } from "./ui/scroll-area";
import { authClient } from "@/lib/auth-client";

const SidebarComponent = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) =>{

  const { data: session } = authClient.useSession();
  interface PdfItem {
    id: string;
    name: string;
    createdAt: string;
    size: number;
  }
  const [pdfList, setPdfList] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }
    let isMounted = true;
    async function fetchPdfs() {
      try {
        setLoading(true);
        const response = await fetch("/api/pdf");
        if (!response.ok) throw new Error("Failed to fetch the PDFs");
        const res = await response.json();
        const pdfs = res?.data ?? [];
        if (isMounted) setPdfList(pdfs);
      } catch (error) {
        if (isMounted)
          setError(
            error instanceof Error ? error.message : "Something went wrong"
          );
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPdfs();

    return () => {
      isMounted = false;
    };
  }, [session]);

  return (
    <Sidebar
      className={cn(
        "border-r bg-white transition-all duration-300 ease-linear h-screen overflow-y-hidden",
        isCollapsed ? "w-16 pl-2 pt-2" : "w-72"
      )}
    >
      <SidebarHeader>
        {!isCollapsed ? (
          <div className="flex items-center justify-between px-2 pt-2 pb-4 border-b ">
            <h2 className="text-lg font-semibold">Docu Chat AI</h2>
            <ChevronRight
              className="h-6 w-6 bg-blue-200 rounded-full p-1 cursor-pointer text-blue-800"
              onClick={handleCollapse}
            />
          </div>
        ) : (
          <ChevronLeft
            className="h-6 w-6 bg-blue-200 rounded-full p-1 cursor-pointer text-blue-800"
            onClick={handleCollapse}
          />
        )}
      </SidebarHeader>

      <SidebarContent className="p-3">
        {!isCollapsed ? (
          <div className="relative mb-2">
            <div className="py-1.5 px-3 flex justify-center items-center bg-gray-50 border rounded-lg shadow-xs gap-3 cursor-pointer ">
              <Upload className="h-4 w-4 " />
              <p>Upload PDF</p>
            </div>
          </div>
        ) : (
          <Upload
            className=" h-4 w-4 text-gray-800 my-2 cursor-pointer"
            onClick={handleCollapse}
          />
        )}

        {!isCollapsed ? (
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversation"
              className="pl-8 bg-gray-50"
            />
          </div>
        ) : (
          <Search
            className=" h-4 w-4 text-gray-800 my-2 cursor-pointer"
            onClick={handleCollapse}
          />
        )}

        <SidebarGroup className="flex-1 overflow-hidden">
          {!isCollapsed && (
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Uploaded PDF(s)
            </h3>
          )}

          {!isCollapsed && loading && (
            <div className=" flex items-center justify-center py-4">
              {" "}
              <Spinner className="h-6 w-6" />{" "}
            </div>
          )}
          {!isCollapsed && error && <div>Error : {error}</div>}
          {!isCollapsed && pdfList.length > 0 && (
            <ScrollArea className="h-[55vh] w-full rounded-md border bg-blue-50 p-3 shadow-inner ">
              <div className="space-y-2 ">
                {pdfList.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="group flex flex-col gap-1 rounded-lg border border-transparent bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-gray-200 cursor-pointer"
                  >
                    <h2
                      className="
            font-semibold
            text-gray-800
            text-sm
            leading-snug
            wrap-break-word
            whitespace-normal
            overflow-visible
            w-full
          "
                    >
                      {pdf.name}
                    </h2>

                    {/* Info row below name */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1 flex-wrap">
                      <p>
                        {pdf.size
                          ? `${(pdf.size / 1024).toFixed(1)} KB • `
                          : ""}
                        Uploaded{" "}
                        {new Date(pdf.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}
                      </p>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {new Date(pdf.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <div
          className={cn(
            "flex items-center justify-between",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex items-center gap-2">
            <User width={32} height={32} className="rounded-full bg-blue-100 p-2 text-blue-800" />
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">{session?.user.name}</p>
                <p className="text-xs text-gray-400">Free Plan</p>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
