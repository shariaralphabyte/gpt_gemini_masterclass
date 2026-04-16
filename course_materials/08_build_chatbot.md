# Module 8: নিজের চ্যাটবট তৈরি (No API Chatbot)

আমরা এখন পর্যন্ত মডেল ট্রেইন করেছি এবং সে কীভাবে সিদ্ধান্ত নেয় তা জেনেছি। আজ আমরা আমাদের মডেলের চারপাশে একটি ‘ইন্টারফেস’ বা চ্যাট সিস্টেম বানাবো। এতে থাকবে মেমোরি এবং নির্দিষ্ট নিয়ম।

## ১. ডিকোডিং টেকনিক (Decoding)
মডেল থেকে টেক্সট বের করার দুটি জনপ্রিয় উপায়:
*   **Greedy Decoding:** সবসময় সর্বোচ্চ সম্ভাবনার শব্দটি বেছে নেওয়া। এটি অনেক সময় বোরিং বা একই কথা বারবার বলে এমন হতে পারে।
*   **Temperature Sampling:** একটু র্যান্ডমনেস যোগ করা যাতে উত্তরগুলো মানুষের মতো বৈচিত্র্যময় হয়।

## ২. কনভারসেশন মেমোরি (Memory)
এলএলএম সাধারণত কোনো স্মৃতি ধরে রাখে না। তাই আমাদের প্রতিটি প্রশ্নের সাথে আগের উত্তরগুলোও যুক্ত করে আবার পাঠাতে হয়।

---

## 💡 বাস্তব জীবনের উদাহরণ (Analogy)

ভাবুন আপনি একজন কবির ইন্টারভিউ নিচ্ছেন।
*   **Greedy:** কবি সবসময় প্রতিটি প্রশ্নের ডিকশনারি থেকে সবচেয়ে সাধারণ উত্তর দিচ্ছেন। (খুবই কাঠখোট্টা!)
*   **Temperature:** কবি একটু চিন্তা করে নতুন শব্দ ব্যবহার করছেন, যাতে উত্তরটা সুন্দর হয়।
*   **Memory:** কবি আপনার আগের কথাগুলো মনে রেখে প্রাসঙ্গিক উত্তর দিচ্ছেন।

---

## 🧠 গাণিতিক ধারণা (Math Intuition)

**Temperature ($T$):** সফটম্যাক্স করার আগে আমরা স্কোরগুলোকে $T$ দিয়ে ভাগ করি।
$$P_i = \frac{\exp(Z_i / T)}{\sum \exp(Z_j / T)}$$

*   যদি $T$ কম হয় (যেমন ০.২), মডেল আত্মবিশ্বাসী এবং 'Greedy' হয়।
*   যদি $T$ বেশি হয় (যেমন ০.৮), মডেল বেশি সৃজনশীল এবং রিস্কী হয়।

---

## 💻 কোড ইমপ্লিমেন্টেশন (Chat Logic with Memory)

```python
import torch

def generate_text(model, input_ids, max_len=10, temperature=1.0):
    generated = input_ids
    
    for _ in range(max_len):
        # ১. প্রেডিকশন
        logits = model(generated)
        last_logit = logits[-1, :] / temperature
        
        # ২. স্যাম্পলিং
        probs = torch.softmax(last_logit, dim=-1)
        next_id = torch.multinomial(probs, num_samples=1)
        
        # ৩. অ্যাপেন্ড (Append)
        generated = torch.cat([generated, next_id])
        
        # শব্দ শেষ হলে থামুন (Stop token)
        if next_id == 0: break 
        
    return generated

# চ্যাট মেমোরি ডিজাইন
chat_history = []

def chat(user_input):
    global chat_history
    # সিস্টেম প্রম্পট যোগ করা
    system_prompt = "You are a helpful AI assistant."
    
    # মেমোরি সহ বাক্য তৈরি
    full_prompt = f"System: {system_prompt}\nHistory: {chat_history}\nUser: {user_input}\nAI:"
    
    # মডেল থেকে টেক্সট জেনারেট করা (Concept)
    response = "আমি আপনাকে সাহায্য করতে পারি!" # Model output mock
    
    # মেমোরিতে সেভ রাখা
    chat_history.append({"user": user_input, "ai": response})
    return response

print(chat("এআই কী?"))
```

---

## 📊 আউটপুট উদাহরণ (Output)

```text
User: এআই কী?
AI: আমি আপনাকে সাহায্য করতে পারি! এআই হলো আর্টিফিশিয়াল ইন্টেলিজেন্স যা...
```

> [!TIP]
> **System Prompts:** এটি মডেলকে একটি বিশেষ 'চরিত্র' দেয়। যেমন- শিক্ষক, ডাক্তার বা কোডিং এসিস্ট্যান্ট। আমরা সিম্পল টেক্সট প্রিপেন্ডিং এর মাধ্যমে এটি করি।
