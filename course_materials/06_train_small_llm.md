# Module 6: নিজের ছোট এলএলএম ট্রেনিং (Train Your Own Small LLM)

আমরা গত মডিউলে ট্রান্সফর্মার আর্কিটেকচার বানিয়েছি। আজ আমরা শিখবো কীভাবে এই আর্কিটেকচারকে ডেটা দিয়ে ট্রেইন করতে হয় যাতে সে চ্যাটজিপিটির মতো টেক্সট জেনারেট করতে পারে।

## ১. ল্যাঙ্গুয়েজ মডেলিং কী?
ল্যাঙ্গুয়েজ মডেলিংয়ের মূল কাজ হলো **'Next Token Prediction'**। একটি বাক্যের কিছু অংশ দেখে পরের শব্দটি কী হবে তা আন্দাজ করাই হলো ট্রেনিং।

## ২. ট্রেনিং ডেটা ফরম্যাট
মডেলকে আমরা একটি টেক্সট ফাইল দিই। সে নিজেই সেখান থেকে ইনপুট (X) এবং পরের টোকেন (y) তৈরি করে নেয়।
উদাহরণ: "I love AI" -> In: "I love", Target: "AI"

---

## 💡 বাস্তব জীবনের উদাহরণ (Analogy)

ভাবুন একটি ছোট বাচ্চাকে আপনি নামতা শেখাচ্ছেন।
আপনি তাকে বলছেন "দুই এক্কে..." এবং সে বলছে "দুই"। আপনি বলছেন "দুই দুগুণে..." এবং সে বলছে "চার"।
এখানে আপনার কথাগুলো হলো ইনপুট এবং বাচ্চার প্রতিটি উত্তর হলো 'Next Token Prediction'। বার বার ভুল করার পর এবং আপনার সংশোধন (Loss update) পাওয়ার পর সে নামতা মুখস্থ করে ফেলে।

---

## 🧠 গাণিতিক ধারণা (Math Intuition)

ট্রেনিংয়ের সময় আমরা **Cross Entropy Loss** ব্যবহার করি। এটি প্রেডিকশন এবং একচুয়াল টোকেনের মধ্যে পার্থক্য বের করে।
মডেল যদি বলে "আম" আসার সম্ভাবনা ৯০%, কিন্তু আসলে আসলো "জাম", তবে লস বেশি হবে। অপ্টিমাইজার (Adam) তখন এই লস কমানোর চেষ্টা করবে।

---

## 💻 কোড ইমপ্লিমেন্টেশন (Training Loop in PyTorch)

```python
import torch
import torch.nn as nn
import torch.optim as optim

# ১. ড্রামি ডেটাসেট (Simple IDs)
# ধরুন আমাদের ভোকাবুলারি সাইজ ১০
vocab_size = 10
data = torch.tensor([1, 2, 3, 4, 1, 2, 5, 6, 1, 2, 7]) # কিছু টোকেন আইডি

# ২. মডেল প্যারামিটারস
embed_dim = 16
hidden_dim = 16

# ৩. একটি অতি সাধারণ ল্যাঙ্গুয়েজ মডেল
class SimpleLM(nn.Module):
    def __init__(self, vocab_size, embed_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.fc = nn.Linear(embed_dim, vocab_size)

    def forward(self, x):
        embedded = self.embedding(x)
        logits = self.fc(embedded)
        return logits

model = SimpleLM(vocab_size, embed_dim)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# ৪. ট্রেনিং লুপ
for epoch in range(50):
    # ইনপুট এবং টার্গেট তৈরি (Next token pattern)
    inputs = data[:-1]
    targets = data[1:]

    # Forward Pass
    logits = model(inputs)
    
    # Loss Calculation
    loss = criterion(logits, targets)

    # Backward Pass & Update
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 10 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")
```

---

## 📊 আউটপুট উদাহরণ (Output)

```text
Epoch 0, Loss: 2.3842
Epoch 20, Loss: 1.2104
Epoch 40, Loss: 0.4512
```

> [!TIP]
> **Scaling:** আমরা এখানে খুব ছোট মডেল ট্রেইন করেছি। কিন্তু যখন এই একই প্রসেস বিলিয়ন বিলিয়ন ডেটা এবং বিশাল জিপিইউতে চলে, তখন সেটি জিপিটি-৪ এর মতো বুদ্ধিমান হয়ে ওঠে।
