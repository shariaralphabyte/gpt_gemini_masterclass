# Module 10: এজেন্টে টুল যোগ করা (Adding Tools to Agent)

গত মডিউলে আমরা লুপ শিখেছি। আজ আমরা শিখবো কীভাবে সেই লজিক ব্যবহার করে আমাদের এআই এজেন্টে বাস্তব কাজের টুল (Tools) যোগ করা যায়। একটি এজেন্ট আসলে কতটুকু শক্তিশালী হবে তা নির্ভর করে সে কত ভালো টুল ব্যবহার করতে পারে তার ওপর।

## ১. টুল কী?
টুল হলো সাধারণ পাইথন ফাংশন যা চ্য্যাটবট নিজে ডিক্লেয়ার বা কল করতে পারে।
*   **File Tool:** ফাইল পড়া বা লেখা।
*   **Calc Tool:** ম্যাথ সলভ করা।
*   **Web Tool:** ইন্টারনেট থেকে ডেটা আনা।

## ২. টুল রেজিস্ট্রেশন (Function Connection)
আমরা মডেলকে একটি লিস্ট দিই যেখানে প্রতিটি টুলের নাম এবং কাজের বিবরণ থাকে। যখন মডেল টেক্সট জেনারেট করে, সে এই নামগুলো ব্যবহার করে।

---

## 💡 বাস্তব জীবনের উদাহরণ (Analogy)

ভাবুন আপনি একজন ইলেকট্রিশিয়ানকে ডেকেছেন।
সে তার সাথে একটি টুলবক্স (Toolbox) নিয়ে এসেছে। তাতে আছে স্ক্রু-ড্রাইভার, প্লায়ার্স এবং মিটার।
ইলেকট্রিশিয়ান (Model) যখন সমস্যা দেখে, সে তার ড্রয়ার থেকে সঠিক যন্ত্রটি (Tool) বের করে কাজ করে। আমাদের এজেন্টের ক্ষেত্রে এই ড্রয়ারটি হলো আমাদের পাইথন কোড।

---

## 🧠 গাণিতিক ধারণা (Math Intuition)

এখানে কোনো জটিল সূত্র নেই, তবে **Parsing Logic** গুরুত্বপূর্ণ।
মডেলের আউটপুট যদি হয় `{"action": "search", "params": "Dhaka weather"}`, তবে প্রোগ্রামকে নিখুঁতভাবে এই স্ট্রিং থেকে প্যারামিটার আলাদা করতে হয়। একে বলা হয় **Input Space Mapping**।

---

## 💻 কোড ইমপ্লিমেন্টেশন (Building Real Tools)

```python
import os

# ১. টুল ডিফাইন করা (Real Python Functions)
def read_file(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return f.read()
    return "Error: File not found."

def calculate(expression):
    try:
        return eval(expression)
    except:
        return "Error: Invalid math."

# ২. টুল ডিকশনারি (Tool Registry)
tools = {
    "read_notes": read_file,
    "math_solve": calculate
}

# ৩. এজেন্ট এক্সিকিউশন (Execution)
def execute_agent_action(action_str):
    # ধরুন মডেল এই স্ট্রিং-টি দিয়েছে: "[CALL: math_solve(25 * 4)]"
    if "[CALL:" in action_str:
        # স্ট্রিং থেকে ফাংশন নাম এবং ইনপুট আলাদা করা
        content = action_str.split("[CALL:")[1].split("]")[0]
        func_name, params = content.split("(")
        params = params.replace(")", "")
        
        # ফাংশনটি কল করা
        if func_name.strip() in tools:
            result = tools[func_name.strip()](params)
            return f"Observation: {result}"
    
    return "Error: Unknown action."

# ৪. ট্রায়াল
test_output = "[CALL: math_solve(25 * 4)]"
print(f"এজেন্ট আউটপুট থেকে প্রসেস করা রেজাল্ট: {execute_agent_action(test_output)}")
```

---

## 📊 আউটপুট উদাহরণ (Output)

```text
এজেন্ট আউটপুট থেকে প্রসেস করা রেজাল্ট: Observation: 100
```

> [!TIP]
> **Safety Note:** টুল ব্যবহার করার সময় সবসময় `Security` এর কথা মাথায় রাখতে হবে। যেমন- `eval()` ফাংশন বিপজ্জনক হতে পারে। রিয়েল প্রজেক্টে আমরা আরও নিরাপদ পদ্ধতি ব্যবহার করি।
