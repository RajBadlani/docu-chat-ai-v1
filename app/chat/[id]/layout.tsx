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
          className={` transition-all duration-300 ease-in-out ${
            !isCollapsed ? "w-72" : "w-16"
          }`}
        >
          <SidebarComponent isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}/>
        </div>
        <div className="flex-1 bg-pattern w-full overflow-x-hidden transition-all duration-300">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
