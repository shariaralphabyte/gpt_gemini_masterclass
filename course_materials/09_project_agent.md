# Final Project: Your Own Agent – নিজের এআই এজেন্ট তৈরি ও লঞ্চ করা

অভিনন্দন! আপনি কোর্সের শেষ ধাপে পৌঁছে গেছেন। এখন সময় হয়েছে অর্জিত জ্ঞানকে কাজে লাগিয়ে আপনার প্রথম **Autonomous AI Agent** তৈরি করার।

## ১. প্রজেক্টের লক্ষ্য
আমরা এমন একটি এজেন্ট তৈরি করবো যা:
1. আপনার প্রশ্নের উত্তর দিতে পারবে (LLM Power)।
2. ইন্টারনেটে সার্চ করে তথ্য বের করতে পারবে (Google Search Tool)।
3. নিজের মতো করে চিন্তা করে সিদ্ধান্ত নিতে পারবে (Agentic reasoning)।

## ২. প্রয়োজনীয় টুলস
আমরা এই প্রজেক্টের জন্য ব্যবহার করবো:
- **Python:** মূল ভাষা।
- **Groq বা Google Gemini API:** ফ্রিতে ব্যবহারের জন্য।
- **LangChain বা CrewAI:** এজেন্ট ফ্রেমওয়ার্ক।

## ৩. কোডিং শুরু (ধাপে ধাপে)

### ধাপ ১: পরিবেশ সেটআপ
প্রথমে প্রয়োজনীয় লাইব্রেরি ইনস্টল করুন:
```bash
pip install langchain-google-genapi langchain-community google-search-results
```

### ধাপ ২: এজেন্ট তৈরি
নিচের কোডটি ব্যবহার করে আপনার এজেন্টের মূল লুপ তৈরি করুন:

```python
from langchain_google_genapi import ChatGoogleGenerativeAI
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType

# আপনার API Key সেট করুন
llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key="YOUR_KEY")

# এজেন্টকে 'হাত' বা টুল দেওয়া
tools = [
     Tool(
        name="Search",
        func=search_func, # আপনার সার্চ ফাংশন
        description="ইন্টারনেট থেকে সরাসরি তথ্য খোঁজার জন্য প্রয়োজন"
    )
]

# এজেন্ট চালু করা
agent = initialize_agent(
    tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True
)

agent.run("আজকের ঢাকা শহরের আবহাওয়া কেমন?")
```

## ৪. এজেন্টকে হোস্ট করা (Deployment)
আপনার এজেন্টকে আপনি নিচের মাধ্যমগুলোতে পাবলিশ করতে পারেন:
- **Telegram Bot:** আপনার নিজের পার্সোনাল টেলিগ্রাম বট হিসেবে।
- **Streamlit:** একটি সুন্দর ওয়েব ইউজার ইন্টারফেস (UI) দেওয়ার জন্য।
- **Hugging Face Spaces:** ফ্রিতে হোস্ট করার জন্য সেরা জায়গা।

## ৫. পরবর্তী যাত্রা
এজেন্টিক এআই একটি দ্রুত পরিবর্তনশীল ক্ষেত্র। আপনি এখন যা শিখেছেন তা কেবল শুরু। নিয়মিত নতুন নতুন **Tool Calling** এবং **Multi-agent systems** নিয়ে এক্সপেরিমেন্ট করতে থাকুন।

---
🙌 **শুভকামনা! আপনার তৈরি করা এআই এজেন্টের লিংক আমাদের সাথে শেয়ার করতে ভুলবেন না!**
