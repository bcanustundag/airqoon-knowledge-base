import os
import re
from datetime import datetime

raw_dir = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/raw/github_repos"
wiki_sources_dir = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/wiki/sources"
index_file = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/index.md"
log_file = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/log.md"

os.makedirs(wiki_sources_dir, exist_ok=True)

repos = []

for filename in os.listdir(raw_dir):
    if not filename.endswith(".md"):
        continue
    filepath = os.path.join(raw_dir, filename)
    with open(filepath, "r") as f:
        content = f.read()
    
    repo_name = filename[:-3]
    
    # Extract title
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else repo_name
    
    # Extract description (first paragraph)
    paragraphs = re.split(r'\n\s*\n', content)
    description = ""
    for p in paragraphs:
        if p.strip() and not p.strip().startswith('#') and not p.strip().startswith('!['):
            description = p.strip().replace('\n', ' ')
            break
            
    # Create wiki/sources file
    today = datetime.now().strftime("%Y-%m-%d")
    source_content = f"""---
title: "{title}"
type: source
tags: [github, repository, code]
created: {today}
updated: {today}
sources: ["raw/github_repos/{filename}"]
---

# {title}

**Repository:** `{repo_name}`
**Source File:** `raw/github_repos/{filename}`

## Description
{description}

## Content Overview
This repository contains the source code for {title}. Further synthesis is required to extract deep architectural details.

## Related Entities
- [[Airqoon]]
"""
    
    source_filepath = os.path.join(wiki_sources_dir, filename)
    with open(source_filepath, "w") as f:
        f.write(source_content)
        
    repos.append({"name": repo_name, "title": title, "desc": description[:100] + "..." if len(description) > 100 else description})

# Update index.md
with open(index_file, "r") as f:
    index_content = f.read()

sources_list = "\n".join([f"- [[{r['name']}]] - {r['title']}" for r in sorted(repos, key=lambda x: x['name'])])

if "## Sources" in index_content:
    # Append to existing
    index_content = index_content.replace("## Sources", f"## Sources\n\n### GitHub Repositories\n{sources_list}\n")
else:
    index_content += f"\n\n## Sources\n\n### GitHub Repositories\n{sources_list}\n"

with open(index_file, "w") as f:
    f.write(index_content)

# Update log.md
log_entry = f"## [{today}] ingest | Ingested {len(repos)} GitHub repositories into wiki/sources\n"
with open(log_file, "a") as f:
    f.write(log_entry)

print(f"Processed {len(repos)} repositories successfully.")
