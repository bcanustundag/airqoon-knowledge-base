import re
from pathlib import Path

replacements = {
    "Unit L": "wiki/entities/unit-l",
    "Airqoon Lens": "wiki/entities/airqoon-lens",
    "Baris Can Ustundag": "wiki/entities/baris-can-ustundag",
    "Low-Cost Air Sensors": "wiki/concepts/low-cost-air-sensors",
    "Perimeter Monitoring": "wiki/concepts/perimeter-monitoring",
    "CEN/TS 17660-1": "wiki/concepts/en17660-standard"
}

wiki_dir = Path("wiki")
all_files = list(wiki_dir.glob("**/*.md"))

for f in all_files:
    content = f.read_text()
    new_content = content
    for display_text, path in replacements.items():
        # Replace exact [[Display Text]] with [[path|Display Text]]
        # Need to be careful not to replace already fixed ones.
        # Use regex to find [[Display Text]] where there's no pipe.
        pattern = re.compile(r'\[\[' + re.escape(display_text) + r'\]\]')
        new_content = pattern.sub(f'[[{path}|{display_text}]]', new_content)
    
    # Fix the truly broken ones in airquest
    if f.name == "airquest-symposium-poster.md":
        new_content = new_content.replace("[[AirQuest]]", "AirQuest")
        new_content = new_content.replace("[[Interreg BSB]]", "Interreg BSB")

    if new_content != content:
        f.write_text(new_content)
        print(f"Fixed links in {f}")
