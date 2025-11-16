import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ChatPageComponent from "@/components/ChatPageComponent";
import { prisma } from "@/lib/prisma";
import { s3GetUrl } from "@/lib/s3";


const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const id = (await params).id;
  if (!id) redirect("/dashboard");

  const pdf = await prisma.pdf.findUnique({
    where: {
      id: id,
      userId: session.user.id, 
    },
  });

  if (!pdf) {
    return <div>PDF not found</div>;
  }

  const pdfUrl = await s3GetUrl(pdf.key);

  return (
    <div className="flex h-screen w-full">
      <ChatPageComponent pdfId={id} pdfUrl={pdfUrl} />
      
    </div>
  );
};

export default ChatPage;
