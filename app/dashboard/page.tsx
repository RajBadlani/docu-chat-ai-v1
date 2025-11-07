"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";
import UploadPdfComponent from "@/components/UploadPdfComponent";
import PdfViewerComponent from "@/components/PdfViewerComponent";


const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const pdfDetails = await prisma.pdf.findMany({
    where: { userId: session.user.id },
    select: { name: true, key: true, userId: true },
  });

  console.log(pdfDetails);

  return (
    <>
        <div className="min-h-screen w-full bg-pattern px-4 sm:px-6 lg:px-12 py-6">
      <header className="flex items-center justify-between gap-4 px-2 sm:px-4 py-2">
        <div>
          <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
            Upload PDF Document
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-800 max-w-3xl">
            Upload your PDF documents and start a smart conversation — powered
            by AI.
          </p>
        </div>
        <div className=" mr-20 cursor-pointer">
          {session ? (
            <SignOutButton
              name={session.user.name}
              email={session.user.email}
              accountVerified={session.user.emailVerified}
              subscription="Free"
            />
          ) : (
            <p className="text-sm text-gray-500">No session found</p>
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-start gap-6 mt-6 mx-auto w-full max-w-4xl">
        {/* <UploadComponent /> */}
          <UploadPdfComponent/>
        {/* Info box */}
        <PdfViewerComponent/>
      </main>
    </div>
    </>
  )
};

export default DashboardPage;
