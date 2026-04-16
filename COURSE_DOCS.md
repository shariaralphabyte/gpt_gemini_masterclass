# 🌐 0 থেকে Modern Agentic AI: সম্পূর্ণ মাস্টারক্লাস

স্বাগতম! এই কোর্সটি আপনাকে নিয়ে যাবে NLP-এর মূল ধারণা থেকে শুরু করে আধুনিক **Agentic AI**-এর সর্বোচ্চ প্রযুক্তি পর্যন্ত — সম্পূর্ণ বাংলায়।

আপনি ChatGPT, Gemini বা Claude কীভাবে কাজ করে তার প্রতিটি ধাপ বুঝতে পারবেন এবং নিজেও একটি AI Agent তৈরি করতে পারবেন!

---

## 📅 ৪ সপ্তাহের কারিকুলাম

### 🟢 সপ্তাহ ১: NLP ও ট্রান্সফর্মারের জাদু
> কম্পিউটার কীভাবে ভাষা বোঝে? কেন RNN ব্যর্থ হলো?

- **[লেকচার ১: NLP-এর জাদু — Word Embeddings](course_materials/01_week1_nlp_magic.md)**
  টোকেনাইজেশন, ভেক্টর স্পেস, এবং কীভাবে শব্দের অর্থ সংখ্যায় ধরা পড়ে।

- **[লেকচার ২: Transformer — যে আর্কিটেকচার দুনিয়া বদলেছে](course_materials/02_week1_transformers.md)**
  Self-Attention, Multi-Head Attention, এবং Positional Encoding।

---

### 🟡 সপ্তাহ ২: Scaling Up — GPT ও Gemini কীভাবে শেখে?
> ট্রিলিয়ন টোকেন, হাজার GPU, এবং গোপন MoE আর্কিটেকচার।

- **[লেকচার ৩: Pre-training — ইন্টারনেট পড়ে শেখা](course_materials/03_week2_pretraining.md)**
  Large-scale Dataset, Next Token Prediction, Data ও Tensor Parallelism।

- **[লেকচার ৪: Mixture of Experts (MoE) — Gemini-এর গোপন অস্ত্র](course_materials/04_week2_moe.md)**
  Expert Networks, Router/Gating, Dense vs MoE তুলনা।

---

### 🟠 সপ্তাহ ৩: Post-Training — চ্যাটবট ও নৈতিকতা
> কাঁচা মডেলকে কীভাবে সহকারী ও নিরাপদ করা হয়।

- **[লেকচার ৫: Supervised Fine-Tuning (SFT)](course_materials/05_week3_sft.md)**
  Human Labeling, Instruction Format, Chat Template।

- **[লেকচার ৬: RLHF ও DPO — মডেলকে "ভালো মানুষ" বানানো](course_materials/06_week3_rlhf_dpo.md)**
  Reward Model, Constitutional AI (Claude), Preference Optimization।

---

### 🔴 সপ্তাহ ৪: Agentic AI — ভবিষ্যতের প্রযুক্তি
> LLM এখন শুধু চ্যাটবট নয়, এটি একটি স্বায়ত্তশাসিত কর্মী!

- **[লেকচার ৭: Agentic AI পরিচিতি — ReAct ও Chain of Thought](course_materials/07_week4_agents_intro.md)**
  CoT, ReAct Loop, এজেন্টের "Thought → Action → Observation" চক্র।

- **[লেকচার ৮: Tool Calling — এজেন্টকে হাত দেওয়া](course_materials/08_week4_tool_calling.md)**
  JSON Function Schema, Parallel Tool Calls, বাস্তব উদাহরণ।

---

## 💻 প্র্যাকটিক্যাল কোড

`pipeline_code/` ফোল্ডারে রয়েছে হাতে-কলমে শেখার জন্য Python স্ক্রিপ্ট:

- `pretrain.py`: কীভাবে একটি Base Model ট্রেন হয় তার কার্যপ্রবাহ।
- `agent_loop.py`: **একটি সম্পূর্ণ চালু ReAct Agent!** চালিয়ে দেখুন:
  ```bash
  python3 pipeline_code/agent_loop.py
  ```

---

## ✍️ কৃতজ্ঞতা

এই কোর্সটি **[Shariar Hossain](https://github.com/shariaralphabyte)** ডিজাইন ও তৈরি করেছেন।
GuppyLM প্রজেক্টের জন্য বিশেষ ধন্যবাদ **[Arman bhai](https://github.com/arman-bd)**-কে।
