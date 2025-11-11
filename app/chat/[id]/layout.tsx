"use client"

import SidebarComponent from "@/components/SidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";


export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed , setIsCollapsed] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen ">
        <div
          className={`bg-red-200 transition-all duration-300 ${
            !isCollapsed ? "w-73" : "w-19"
          }`}
        >
          <SidebarComponent isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}/>
        </div>
        <div className="flex-1 bg-blue-300 transition-all duration-300">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
