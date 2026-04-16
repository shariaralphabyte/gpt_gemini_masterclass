"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface LessonPlayerProps {
  lesson: {
    id: string;
    title: string;
    content: string;
  };
  navigation: {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
  };
}

export default function LessonPlayer({ lesson, navigation }: LessonPlayerProps) {
  return (
    <div className="flex-1 overflow-y-auto" lang="bn">
      {/* Header Area */}
      <div className="sticky top-0 z-10 glass px-8 py-6 flex items-center justify-between border-b border-black/5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{lesson.title}</h2>
            <div className="text-[10px] text-dim uppercase tracking-widest mt-0.5 font-bold">
              Agentic AI Masterclass &bull; Lesson {lesson.id}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navigation.prev && (
            <Link
              href={`/lesson/${navigation.prev.slug}`}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-dim hover:text-slate-900 border border-black/5 shadow-sm"
              title={navigation.prev.title}
            >
              <ChevronLeft size={20} />
            </Link>
          )}
          {navigation.next && (
            <Link
              href={`/lesson/${navigation.next.slug}`}
              className="p-2 rounded-xl bg-primary hover:bg-primary/90 transition-all text-white shadow-[0_4px_14px_rgba(37,99,235,0.39)] flex items-center gap-2 px-4 py-2 text-sm font-bold"
            >
              Next Lesson <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <article className="prose prose-slate max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b border-slate-100 pb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-4 text-slate-800" {...props} />,
              p: ({node, ...props}) => <p className="text-lg leading-relaxed text-slate-700 mb-6" {...props} />,
              li: ({node, ...props}) => <li className="text-slate-700 mb-2" {...props} />,
              code: ({node, inline, className, children, ...props}: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                    {match && (
                      <div className="bg-slate-50 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 flex justify-between tracking-widest">
                        <span>{match[1]}</span>
                      </div>
                    )}
                    <pre className="p-6 bg-slate-900 overflow-x-auto text-sm font-mono text-cyan-300">
                      <code>{children}</code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-primary/5 px-2 py-0.5 rounded-md text-primary font-bold text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="my-10 p-8 bg-slate-50 border-l-4 border-primary rounded-r-2xl italic text-xl text-slate-700 leading-relaxed font-medium shadow-sm" {...props} />
              ),
              a: ({node, ...props}) => <a className="text-primary font-bold hover:underline" {...props} />
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-dim">
           {navigation.prev ? (
             <div className="text-sm">
                <span className="block text-[10px] uppercase mb-1 font-bold">Previous</span>
                <Link href={`/lesson/${navigation.prev.slug}`} className="hover:text-primary transition-colors font-medium">
                  {navigation.prev.title}
                </Link>
             </div>
           ) : <div />}
           
           {navigation.next ? (
             <div className="text-sm text-right">
                <span className="block text-[10px] uppercase mb-1 font-bold">Next</span>
                <Link href={`/lesson/${navigation.next.slug}`} className="hover:text-primary transition-colors font-bold text-primary">
                  {navigation.next.title}
                </Link>
             </div>
           ) : <div />}
        </div>
      </div>
    </div>
  );
}
