# 🔴 Week 4, লেকচার ৮: Tool Calling – এজেন্টকে হাত দেওয়া

আগের লেকচারে আমরা শিখেছিলাম এজেন্ট কীভাবে "ভাবে" (Chain of Thought) এবং "কাজ করে" (ReAct Loop)। এই লেকচারে আমরা দেখবো তার সবচেয়ে শক্তিশালী ক্ষমতা — **Tool Calling** বা **Function Calling**।

এটাই হলো সেই প্রযুক্তি যা দিয়ে ChatGPT ইন্টারনেটে সার্চ করে, Gemini কোড রান করে, এবং Claude আপনার Gmail পড়ে!

---

## ১. Tool Calling কী এবং কেন দরকার?

একটি LLM-এর কিছু সীমাবদ্ধতা আছে:
- সে **Real-time** তথ্য জানে না (যেমন আজকের আবহাওয়া বা শেয়ার বাজার)।
- সে গণিতে **সঠিক** নাও হতে পারে (বড় সংখ্যার গুণ-ভাগে ভুল করে)।
- সে বাইরের সিস্টেমে (ডেটাবেস, ইমেইল) **প্রবেশ করতে পারে না**।

Tool Calling এই সীমাবদ্ধতাগুলো দূর করে মডেলকে বাইরের দুনিয়ার সাথে সংযুক্ত করে।

---

## ২. এটা ঠিক কীভাবে কাজ করে?

### ধাপ ১: Tool-এর Schema (ব্লু-প্রিন্ট) দেওয়া
আমরা মডেলকে JSON ফরম্যাটে বলে দিই আমাদের কাছে কী কী টুল আছে এবং সেগুলো কীভাবে কাজ করে।

```json
{
  "name": "get_stock_price",
  "description": "একটি কোম্পানির শেয়ারের বর্তমান মূল্য জানতে এই টুলটি ব্যবহার করুন।",
  "parameters": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "কোম্পানির Stock Ticker Symbol (যেমন 'AAPL' Apple-এর জন্য)"
      }
    },
    "required": ["ticker"]
  }
}
```

এটি হুবহু সেই ফরম্যাট যা OpenAI API, Gemini API, এবং Claude API ব্যবহার করে!

### ধাপ ২: মডেল Tool Call তৈরি করে
ব্যবহারকারী জিজ্ঞেস করেন: "আজ Apple-এর শেয়ারের দাম কত?"

মডেল বুঝতে পারে তার একটি Tool লাগবে এবং একটি বিশেষ JSON Response পাঠায়:
```json
{
  "tool_call": {
    "name": "get_stock_price",
    "arguments": {"ticker": "AAPL"}
  }
}
```

### ধাপ ৩: আমাদের কোড Tool রান করে
আমাদের Python কোড এই JSON Response দেখে এবং সত্যিকারের Stock API-তে কল করে।

### ধাপ ৪: Observation ফিরিয়ে দেওয়া
API থেকে ফলাফল আসে: `{"price": "$189.30"}` — এটি মডেলকে দেওয়া হয়।

### ধাপ ৫: Final Answer
মডেল এখন উত্তর দেয়: "Apple (AAPL)-এর আজকের শেয়ার মূল্য হলো $189.30।"

---

## ৩. Multi-Tool এজেন্ট: একসাথে অনেক টুল

আধুনিক এজেন্টরা একসাথে অনেক টুল ব্যবহার করতে পারে এবং কখনো কখনো **সমান্তরালভাবে** (Parallel Tool Calls)।

**উদাহরণ:** "ঢাকা এবং লন্ডনের আজকের আবহাওয়া তুলনা করো।"

মডেল একসাথে দুটি Tool Call করে:
```json
[
  {"name": "get_weather", "arguments": {"city": "Dhaka"}},
  {"name": "get_weather", "arguments": {"city": "London"}}
]
```

দুটো API কল একসাথে চলে, তারপর মডেল তুলনামূলক উত্তর দেয়।

---

## ৪. বাস্তবে কী কী Tool ব্যবহার হয়?

| এজেন্ট | Tool |
|---|---|
| ChatGPT | Web Search, Code Interpreter, DALL-E Image Gen |
| Gemini | Google Search, Google Maps, Gmail, Calendar |
| Claude Code | File System Read/Write, Terminal Execution |
| Perplexity AI | Real-time Web Crawling |

---

## ৫. নিজে চালিয়ে দেখুন!

আমাদের প্রজেক্টের `pipeline_code/agent_loop.py` ফাইলটিই একটি সম্পূর্ণ Tool Calling সিমুলেটর।

```bash
python3 gpt_gemini_masterclass/pipeline_code/agent_loop.py
```

চালালেই দেখবেন মডেল কীভাবে Weather Tool এবং Calculator Tool কল করে নিজে নিজে সমস্যা সমাধান করে!

---

## 🎓 কোর্স সম্পন্ন — অভিনন্দন!

আপনি এখন জানেন:
1. ✅ কীভাবে শব্দ → সংখ্যা → এম্বেডিং হয় (NLP Foundations)
2. ✅ Transformer-এর Self-Attention কীভাবে কাজ করে
3. ✅ GPT/Gemini কীভাবে ট্রিলিয়ন টোকেন থেকে শেখে (Pre-training)
4. ✅ MoE দিয়ে কীভাবে একটি বিশাল কিন্তু দক্ষ মডেল তৈরি হয়
5. ✅ SFT দিয়ে Base Model → Chatbot রূপান্তর
6. ✅ RLHF/DPO দিয়ে নৈতিক ও নিরাপদ মডেল তৈরি
7. ✅ ReAct Agent কীভাবে স্বায়ত্তশাসিতভাবে কাজ করে
8. ✅ Tool Calling — AI-এর হাত-পা!

এই জ্ঞান দিয়ে আপনি এখন নিজেই Agentic AI সিস্টেম তৈরি করতে পারবেন।

**ধন্যবাদ ও শুভকামনা! 🚀**

> কোর্সটি ডিজাইন ও তৈরি করেছেন **[Shariar Hossain](https://github.com/shariaralphabyte)** | GuppyLM-এর জন্য বিশেষ কৃতজ্ঞতা **[Arman bhai](https://github.com/arman-bd)**-কে।
