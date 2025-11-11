import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// import SidebarComponent from "@/components/SidebarComponent";
// import { toast } from "sonner";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const id = (await params).id;
  if (!id) redirect("/dashboard");

  return (
    <div className="flex h-screen w-full">
      Kese ho bhai 
    </div>
  );
};

export default ChatPage;
