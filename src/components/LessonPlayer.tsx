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
      <div className="sticky top-0 z-10 glass px-8 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold glow-text">{lesson.title}</h2>
            <div className="text-[10px] text-dim uppercase tracking-widest mt-0.5">
              Agentic AI Masterclass &bull; Lesson {lesson.id}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navigation.prev && (
            <Link
              href={`/lesson/${navigation.prev.slug}`}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-dim hover:text-white border border-white/5"
              title={navigation.prev.title}
            >
              <ChevronLeft size={20} />
            </Link>
          )}
          {navigation.next && (
            <Link
              href={`/lesson/${navigation.next.slug}`}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary border border-primary/20 flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              Next Lesson <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <article className="prose prose-invert prose-cyan max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-8 gradient-text" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-12 mb-6 text-primary/90 border-b border-white/5 pb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-8 mb-4 text-white/90" {...props} />,
              p: ({node, ...props}) => <p className="text-lg leading-relaxed text-white/80 mb-6" {...props} />,
              li: ({node, ...props}) => <li className="text-white/80 mb-2" {...props} />,
              code: ({node, inline, className, children, ...props}: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {match && (
                      <div className="bg-white/5 px-4 py-1.5 text-[10px] font-mono text-dim uppercase border-b border-white/5 flex justify-between">
                        <span>{match[1]}</span>
                      </div>
                    )}
                    <pre className="p-6 bg-black/40 overflow-x-auto text-sm font-mono text-cyan-300">
                      <code>{children}</code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-primary text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="my-8 p-6 bg-secondary/10 border-l-4 border-secondary rounded-r-xl italic text-lg text-white/90" {...props} />
              ),
              a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-dim">
           {navigation.prev ? (
             <div className="text-sm">
                <span className="block text-[10px] uppercase mb-1">Previous</span>
                <Link href={`/lesson/${navigation.prev.slug}`} className="hover:text-white transition-colors">
                  {navigation.prev.title}
                </Link>
             </div>
           ) : <div />}
           
           {navigation.next ? (
             <div className="text-sm text-right">
                <span className="block text-[10px] uppercase mb-1">Next</span>
                <Link href={`/lesson/${navigation.next.slug}`} className="hover:text-white transition-colors font-semibold text-primary">
                  {navigation.next.title}
                </Link>
             </div>
           ) : <div />}
        </div>
      </div>
    </div>
  );
}
