import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { FileText } from "lucide-react";
import PdfIconComponent from "./PdfIconComponent";

const PdfUploadComponent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const userPdfs = await prisma.pdf.findMany({
    where: { userId: session.user.id },
    select: { name: true, size: true, id: true , isIngested : true },
  });

  return (
    <section className="w-full bg-white rounded-lg p-4 sm:p-6 shadow">
      <div className="flex flex-col gap-4 h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[220px]">
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold">Uploaded PDF(s)</h3>
          <p className="text-xs text-gray-500">
            {userPdfs.length} PDF(s) uploaded
          </p>
        </div>

        
        <div className="flex flex-col gap-3 rounded border border-dashed border-gray-200 bg-gray-50 p-4 overflow-auto">
          {userPdfs.length > 0 ? (
            userPdfs.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between border border-gray-300 rounded-lg p-3 w-full bg-white hover:shadow-sm transition"
              >
                {/* Left side: Icon + Name + Size */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText width={28} height={28} className="text-blue-500 shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-sm sm:text-base truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>

                {/* Right side: Future action buttons */}
                <div className="flex items-center gap-3">
                  <PdfIconComponent pdfId={file.id} isIngested={file.isIngested}/>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
              Please upload a PDF
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PdfUploadComponent;
