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
}

export default function Sidebar({ weeks }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-80 h-full glass border-r border-white/10 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold gradient-text glow-text">Agentic AI Masterclass</h1>
        <p className="text-xs text-dim mt-1">0 to Modern AI Expert</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {weeks.map((week) => (
          <div key={week.id} className="space-y-2">
            <h3 className="text-sm font-semibold text-primary/80 uppercase tracking-wider px-2">
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
                    className={`block px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActive
                        ? "bg-white/10 text-white border-l-2 border-primary"
                        : "text-dim hover:bg-white/5 hover:text-white"
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

      <div className="p-4 border-t border-white/10 text-[10px] text-dim text-center">
        Created for 360infotech &copy; 2026
      </div>
    </div>
  );
}
