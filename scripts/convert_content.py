import os
import json
import re

def convert_md_to_json(source_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(source_dir):
        if filename.endswith(".md"):
            with open(os.path.join(source_dir, filename), "r", encoding="utf-8") as f:
                content = f.read()
                
                # Extract title (first H1)
                title_match = re.search(r"^# (.*)", content, re.MULTILINE)
                title = title_match.group(1) if title_match else filename
                
                # Remove the title from body to avoid duplication
                body = re.sub(r"^# .*\n", "", content, count=1).strip()
                
                lesson_data = {
                    "id": filename.replace(".md", ""),
                    "title": title,
                    "content": body
                }
                
                output_filename = filename.replace(".md", ".json")
                with open(os.path.join(output_dir, output_filename), "w", encoding="utf-8") as out_f:
                    json.dump(lesson_data, out_f, ensure_ascii=False, indent=2)
                print(f"Converted {filename} -> {output_filename}")

if __name__ == "__main__":
    SOURCE = "course_materials"
    OUTPUT = "src/data/lessons"
    convert_md_to_json(SOURCE, OUTPUT)
