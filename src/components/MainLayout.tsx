"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  weeks: any[];
}

export default function MainLayout({ children, weeks }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden w-full relative">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar weeks={weeks} onNoteClick={() => setIsSidebarOpen(false)} />
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-500 md:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        {/* Mobile Header Toggle */}
        <header className="flex items-center px-4 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 md:hidden sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-3 font-bold text-slate-900 tracking-tight">AI Masterclass</span>
        </header>

        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          {children}
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-500/5 blur-[100px] -z-10 rounded-full" />
        </div>
      </main>
    </div>
  );
}
