import os
import re
from pathlib import Path

wiki_dir = Path("wiki")
all_files = list(wiki_dir.glob("**/*.md"))
file_names = {f.name.lower(): f for f in all_files}
file_basenames = {f.stem.lower(): f for f in all_files}

link_pattern = re.compile(r'\[\[(.*?)\]\]')

links = {}
for f in all_files:
    content = f.read_text()
    found_links = link_pattern.findall(content)
    # Get the actual link target (before the pipe)
    links[f] = [link.split('|')[0].strip() for link in found_links]

broken_links = []
inbound_counts = {f: 0 for f in all_files}

# Add links from index.md
index_path = Path("index.md")
if index_path.exists():
    index_content = index_path.read_text()
    index_links = [link.split('|')[0].strip() for link in link_pattern.findall(index_content)]
    for link in index_links:
        t_name = link.split('/')[-1].lower()
        t_stem = t_name[:-3] if t_name.endswith('.md') else t_name
        
        if t_stem in file_basenames:
            inbound_counts[file_basenames[t_stem]] += 1

# Check links
for f, f_links in links.items():
    for link in f_links:
        # Ignore external or special links if any
        t_name = link.split('/')[-1].lower()
        t_stem = t_name[:-3] if t_name.endswith('.md') else t_name
        
        # In Obsidian, spaces might be used instead of hyphens if the file has spaces, 
        # but our files have hyphens. Let's check both literal and slugified.
        slugified_stem = t_stem.replace(' ', '-')
        
        if t_stem in file_basenames:
            inbound_counts[file_basenames[t_stem]] += 1
        elif slugified_stem in file_basenames:
            # It's a broken link that can be auto-fixed by slugifying
            broken_links.append((str(f), link, f"Auto-fixable to: {slugified_stem}"))
            inbound_counts[file_basenames[slugified_stem]] += 1
        else:
            if t_stem not in ["log", "claude", "activity log", "system schema"]:
                broken_links.append((str(f), link, "Truly broken"))

orphans = [str(f) for f, count in inbound_counts.items() if count == 0 and f.name not in ['overview.md', 'index.md']]

print("=== TRULY BROKEN LINKS ===")
for src, link, status in broken_links:
    if status == "Truly broken":
        print(f"{src}: {link}")

print("\n=== AUTO-FIXABLE LINKS (Missing hyphens/case mismatch) ===")
for src, link, status in broken_links:
    if status != "Truly broken":
        print(f"{src}: {link} -> {status}")

print("\n=== ORPHAN PAGES ===")
for orphan in orphans:
    print(orphan)
