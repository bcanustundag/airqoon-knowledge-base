import os
import re
from pathlib import Path

wiki_dir = Path("wiki")
all_files = list(wiki_dir.glob("**/*.md"))
file_names = {f.name: f for f in all_files}
file_basenames = {f.stem: f for f in all_files}

link_pattern = re.compile(r'\[\[(.*?)\]\]')

links = {}
for f in all_files:
    content = f.read_text()
    found_links = link_pattern.findall(content)
    links[f] = [link.split('|')[0] for link in found_links]

# 1. Broken links
broken_links = []
for f, f_links in links.items():
    for link in f_links:
        # Link can be 'filename', 'filename.md', 'folder/filename', 'folder/filename.md'
        target_name = link.split('/')[-1]
        if not target_name.endswith('.md'):
            target_name += '.md'
            
        target_stem = target_name[:-3]
        
        # Check if target exists
        if target_name not in file_names and target_stem not in file_basenames and target_stem != "log" and target_stem != "CLAUDE":
             broken_links.append((str(f), link))

# 2. Orphan pages (no inbound links, ignoring index.md and overview.md)
inbound_counts = {f: 0 for f in all_files}
index_path = Path("index.md")
if index_path.exists():
    index_content = index_path.read_text()
    index_links = link_pattern.findall(index_content)
    for link in index_links:
        link_target = link.split('|')[0]
        t_name = link_target.split('/')[-1]
        t_stem = t_name[:-3] if t_name.endswith('.md') else t_name
        if t_stem in file_basenames:
            inbound_counts[file_basenames[t_stem]] += 1

for f, f_links in links.items():
    for link in f_links:
        t_name = link.split('/')[-1]
        t_stem = t_name[:-3] if t_name.endswith('.md') else t_name
        if t_stem in file_basenames:
            inbound_counts[file_basenames[t_stem]] += 1

orphans = [str(f) for f, count in inbound_counts.items() if count == 0 and f.name not in ['overview.md', 'index.md']]

print("=== BROKEN LINKS ===")
for src, link in broken_links:
    print(f"{src}: {link}")

print("\n=== ORPHAN PAGES ===")
for orphan in orphans:
    print(orphan)

