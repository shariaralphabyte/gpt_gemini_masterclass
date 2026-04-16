"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Lesson {
  id: string;
  title: string;
  slug: string;
}

interface Week {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface SidebarProps {
  weeks: Week[];
  onNoteClick?: () => void;
}

export default function Sidebar({ weeks, onNoteClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-full glass border-r border-black/5 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-black/5">
        <h1 className="text-xl font-bold gradient-text">AI Masterclass</h1>
        <p className="text-xs text-dim mt-1 font-medium">Build LLM from Scratch • shariar99</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {weeks.map((week) => (
          <div key={week.id} className="space-y-2">
            <h3 className="text-[10px] font-bold text-dim uppercase tracking-[0.2em] px-2">
              {week.title}
            </h3>
            <div className="space-y-1">
              {week.lessons.map((lesson) => {
                const href = `/lesson/${lesson.slug}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={lesson.id}
                    href={href}
                    onClick={onNoteClick}
                    className={`block px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {lesson.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-black/5 text-[10px] text-dim leading-relaxed">
        Created by <span className="font-bold text-slate-800">shariar99</span> &copy; 2026 <br/>
      </div>
    </div>
  );
}
