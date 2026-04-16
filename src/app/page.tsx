import Link from "next/link";
import { Sparkles, Brain, Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 text-center" lang="bn">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles size={14} className="animate-pulse" /> Frontier AI Learning Path
        </div>
        
        <h1 className="text-4xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]">
          <span className="gradient-text">0 to Modern</span> <br />
          <span className="text-slate-800">Agentic AI</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          মেশিন লার্নিং-এর জগত এখন আপনার হাতের মুঠোয়। টেকনিক্যাল বা নন-টেকনিক্যাল—সবার জন্য সহজভাবে ডিজাইন করা হয়েছে এই মাস্টারক্লাস।
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/lesson/01_ai_fundamentals" 
            className="px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-primary text-white font-bold text-base md:text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] w-full sm:w-auto"
          >
            কোর্সটি শুরু করুন
          </Link>
          <a 
            href="https://github.com/shariaralphabyte/gpt_gemini_masterclass" 
            className="px-8 md:px-10 py-4 md:py-5 rounded-2xl glass border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            GitHub-এ দেখুন
          </a>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-28">
        {[
          {
            icon: <Brain className="text-primary" />,
            title: "Next Token Prediction",
            desc: "ChatGPT বা Gemini কীভাবে শব্দ সাজায় তার পেছনের গণিত।"
          },
          {
            icon: <Cpu className="text-secondary" />,
            title: "MoE Architecture",
            desc: "আধুনিক ফ্রন্টিয়ার মডেলগুলোর বিশাল এবং দ্রুত হওয়ার রহস্য।"
          },
          {
            icon: <Zap className="text-accent" />,
            title: "Tool Calling",
            desc: "আপনার এআই-কে হাত এবং চোখ দিন যাতে সে নিজে কাজ করতে পারে।"
          }
        ].map((feature, i) => (
          <div key={i} className="glass p-10 rounded-3xl text-left border-black/[0.03] hover:border-primary/20 transition-all group hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-xl font-black mb-4 text-slate-900 leading-tight">{feature.title}</h3>
            <p className="text-base text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Decorative footer element */}
      <div className="mt-32 text-dim text-xs opacity-50">
        Designed for the Bangladeshi Tech Community &bull; 2026
      </div>
    </div>
  );
}
