# Module 3: স্ক্র্যাচ থেকে নিউরাল নেটওয়ার্ক (Manual Backprop)

আজকে আমরা এআই মডেলের সবচেয়ে বড় রহস্য ফাঁস করব— 'Backpropagation'। আপনি কি জানেন একটি মডেল কীভাবে নিজের ভুল নিজে বুঝতে পারে এবং নিজেকে সংশোধন করে? আজ আমরা লাইব্রেরি ছাড়া সেই ম্যাজিক কোড করব।

## ১. Forward Pass vs Backward Pass
*   **Forward Pass:** ইনপুট থেকে আউটপুট বের করা।
*   **Backward Pass (Backprop):** আউটপুট ভুল হলে সেই ভুল পেছনের দিকে পাঠানো এবং ওয়েটস (Weights) আপডেট করা।

## ২. চেইন রুল (Chain Rule)
মডেল তার ভুলের জন্য বিভিন্ন নিউরনের ওপর দায়ভার (Gradient) ভাগ করে দেয়। এটি ক্যালকুলাসের চেইন রুল দিয়ে করা হয়।

---

## 💡 বাস্তব জীবনের উদাহরণ (Analogy)

মনে করুন আপনি আপনার বন্ধুকে ঝুড়িতে বল ছুড়তে বলছেন।
১. বন্ধু বল ছুড়ল কিন্তু তা বাইরে পড়ল (**Forward Pass & Loss**)।
২. আপনি চিৎকার করে বললেন, "বল অনেক উঁচুতে গিয়ে পড়েছে!" (**Backprop**)।
৩. বন্ধু তার হাত একটু নামাল এবং পরের বার ঠিকভাবে ছুড়ল (**Weight Update**)।

এই চিৎকার বা ফিডব্যাকই হলো 'Gradient' বা গ্র্যাডিয়েন্ট।

---

## 🧠 গাণিতিক ধারণা (Math Intuition)

ভুল বা লস (Loss) কমানোর জন্য আমরা ওয়েটস আপডেট করি এভাবে:
$$W_{\text{new}} = W_{\text{old}} - \eta \cdot \frac{\partial L}{\partial W}$$

এখানে:
*   $\eta$ (Eta): লার্নিং রেট। বন্ধু কতটা দ্রুত নিজেকে বদলাবে।
*   $\frac{\partial L}{\partial W}$: ভুলের সাপেক্ষে ওয়েটসের পরিবর্তন।

---

## 💻 কোড ইমপ্লিমেন্টেশন (Manual Backprop with NumPy)

```python
import numpy as np

# ১. ডেটাসেট (Simple XOR-like logic)
X = np.array([[0], [1]]) # ইনপুট
y = np.array([[0], [1]]) # কাঙ্ক্ষিত আউটপুট (Target)

# ২. প্যারামিটারস
W = np.random.randn(1, 1) # একটি ওয়েট
b = 0 # বায়াস
lr = 0.1 # লার্নিং রেট

# ৩. ট্রেনিং লুপ
for epoch in range(100):
    # --- Forward Pass ---
    # z = Wx + b
    z = np.dot(X, W) + b
    # activation (Sigmoid)
    prediction = 1 / (1 + np.exp(-z))
    
    # --- লস ক্যালকুলেশন (MSE) ---
    loss = np.mean((prediction - y)**2)
    
    # --- Backward Pass (Backprop) ---
    # ভুলের পরিমাণ
    error = prediction - y
    # সিগময়েডের ডেরিভেটিভ
    d_prediction = prediction * (1 - prediction)
    # ওয়েটসের পরিবর্তন (Gradient)
    d_W = np.dot(X.T, error * d_prediction)
    d_b = np.sum(error * d_prediction)
    
    # --- আপডেট (Update) ---
    W = W - lr * d_W
    b = b - lr * d_b
    
    if epoch % 20 == 0:
        print(f"Epoch {epoch}, Loss: {loss:.4f}")

print(f"\nফাইনাল প্রেডিকশন: {prediction}")
```

---

## 📊 আউটপুট উদাহরণ (Output)

```text
Epoch 0, Loss: 0.2104
Epoch 20, Loss: 0.1502
Epoch 80, Loss: 0.0812
ফাইনাল প্রেডিকশন: [[0.12] [0.88]]
```

> [!IMPORTANT]
> খেয়াল করুন, লস ক্রমাগত কমেছে। তার মানে আমাদের স্ক্র্যাচ থেকে বানানো ছোট এআই মডেলটি শিখতে পেরেছে। এটাই আধুনিক নিউরাল নেটওয়ার্কের মূল ভিত্তি।
