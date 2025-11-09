import SidebarComponent from "@/components/SidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <SidebarComponent />
        {children}
      </SidebarProvider>
    </>
  );
}
