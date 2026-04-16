import Link from "next/link";
import { Sparkles, Brain, Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 text-center" lang="bn">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles size={14} className="animate-pulse" /> Frontier AI Learning Path
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text">0 to Modern</span> <br />
          <span className="glow-text">Agentic AI</span>
        </h1>
        
        <p className="text-xl text-dim max-w-2xl mx-auto leading-relaxed">
          মেশিন লার্নিং-এর জগত এখন আপনার হাতের মুঠোয়। টেকনিক্যাল বা নন-টেকনিক্যাল—সবার জন্য সহজভাবে ডিজাইন করা হয়েছে এই মাস্টারক্লাস।
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/lesson/ai-basics" 
            className="px-8 py-4 rounded-xl bg-primary text-background font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,242,255,0.3)]"
          >
            কোর্সটি শুরু করুন
          </Link>
          <a 
            href="https://github.com/shariaralphabyte/gpt_gemini_masterclass" 
            className="px-8 py-4 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
          >
            GitHub-এ দেখুন
          </a>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-24">
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
          <div key={i} className="glass p-8 rounded-2xl text-left hover:border-white/20 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
            <p className="text-sm text-dim leading-relaxed">{feature.desc}</p>
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
