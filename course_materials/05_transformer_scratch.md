# Module 5: স্ক্র্যাচ থেকে ট্রান্সফর্মার (Build in PyTorch)

আজকের মডিউলটি এই কোর্সের সবচেয়ে চ্যালেঞ্জিং কিন্তু আকর্ষণীয় অংশ। আমরা চ্যাটজিপিটির ব্রেইন বা 'Transformer' আর্কিটেকচারটি পাইটর্চ (PyTorch) ব্যবহার করে হাতে কলমে বানাবো।

## ১. ট্রান্সফর্মার আর্কিটেকচার
একটি ট্রান্সফর্মার মূলত অনেকগুলো ব্লকের সমষ্টি। প্রতিটি ব্লকে থাকে:
*   Embedding & Positional Encoding
*   Multi-Head Attention
*   Layer Norm & Feedforward Network

---

## 💡 বাস্তব জীবনের উদাহরণ (Analogy)

ভাবুন একটি লাইব্রেরিতে অনেকগুলো বই আছে।
*   **Embedding:** বইগুলোর নামকে একটি বিশেষ ডিজিটাল কোড দেওয়া।
*   **Positional Encoding:** বইগুলো কত নম্বর তাকে (Shelf) আছে তার সিরিয়াল দেওয়া।
*   **Self-Attention:** আপনি যখন একটি বই পড়েন, তখন ওই বইয়ের কোন অধ্যায়টির সাথে অন্য কোন অধ্যায়ের মিল আছে তা বোঝা।

---

## 🧠 গাণিতিক ধারণা (Math Intuition)

**Positional Encoding:** যেহেতু ট্রান্সফর্মার সব শব্দ একসাথে প্রসেস করে, তাই তাকে শব্দের সিরিয়াল বোঝাতে আমরা সাইন (Sin) এবং কস (Cos) ওয়েভ ব্যবহার করি:
$$PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d_{model}})$$

---

## 💻 কোড ইমপ্লিমেন্টেশন (Step-by-Step PyTorch)

```python
import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(SelfAttention, self).__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads

        # Query, Key, Value ম্যাট্রিক্স
        self.queries = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.keys = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.values = nn.Linear(self.head_dim, self.head_dim, bias=False)
        self.fc_out = nn.Linear(heads * self.head_dim, embed_size)

    def forward(self, values, keys, queries, mask):
        N = queries.shape[0]
        value_len, key_len, query_len = values.shape[1], keys.shape[1], queries.shape[1]

        # ১. হেড অনুযায়ী স্প্লিট করা
        # Shape: (N, query_len, heads, head_dim)
        values = values.reshape(N, value_len, self.heads, self.head_dim)
        keys = keys.reshape(N, key_len, self.heads, self.head_dim)
        queries = queries.reshape(N, query_len, self.heads, self.head_dim)

        # ২. Dot Product Attention
        # energy shape: (N, heads, query_len, key_len)
        energy = torch.einsum("nqhd,nkhd->nhqk", [queries, keys])

        if mask is not None:
            energy = energy.masked_fill(mask == 0, float("-1e20"))

        # ৩. Softmax দিয়ে অ্যাটেনশন ওয়েট বের করা
        attention = torch.softmax(energy / (self.embed_size ** (1/2)), dim=3)

        # ৪. ভ্যালুর সাথে গুণ করা
        out = torch.einsum("nhql,nlhd->nqhd", [attention, values]).reshape(
            N, query_len, self.heads * self.head_dim
        )

        return self.fc_out(out)

# ৫. টেস্টিং
embed_size = 256
heads = 8
x = torch.randn((1, 10, embed_size)) # (Batch, Seq_Len, Embed_Size)
model = SelfAttention(embed_size, heads)
output = model(x, x, x, mask=None)

print(f"ইনপুট শেপ: {x.shape}")
print(f"আউটপুট শেপ: {output.shape}")
```

---

## 📊 আউটপুট উদাহরণ (Output)

```text
ইনপুট শেপ: torch.Size([1, 10, 256])
আউটপুট শেপ: torch.Size([1, 10, 256])
```

> [!IMPORTANT]
> **Tensor Shapes:** ট্রান্সফর্মার মডেল বানানোর সময় ইনপুট এবং আউটপুট শেপ সমান রাখা হয় (যেমন- ২৫৬), যাতে আমরা একটি ব্লকের ওপর আরেকটি ব্লক বসাতে পারি। একেই বলা হয় 'Residual Connection'।
