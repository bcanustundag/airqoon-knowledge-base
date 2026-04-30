import os
import subprocess
import glob

def extract_text_from_docx(filepath):
    try:
        # Use textutil to extract text and output to stdout
        result = subprocess.run(['textutil', '-convert', 'txt', '-stdout', filepath], 
                                capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error extracting docx: {e}"

def extract_metadata_from_pdf(filepath):
    try:
        # Use mdls to get metadata
        result = subprocess.run(['mdls', filepath], capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error extracting pdf metadata: {e}"

def main():
    directory = "raw/articles/UlkuAlverSahin"
    print(f"--- Ingesting Directory: {directory} ---\n")
    
    for root, dirs, files in os.walk(directory):
        for f in files:
            if f.startswith('.'): continue
            filepath = os.path.join(root, f)
            print(f"=== {filepath} ===")
            if f.lower().endswith('.docx'):
                text = extract_text_from_docx(filepath)
                # Print first 500 characters
                print(text[:1000])
                print("...\n")
            elif f.lower().endswith('.pdf'):
                # Extract metadata
                meta = extract_metadata_from_pdf(filepath)
                # Filter for Title, Subject, Keywords
                meta_lines = [line for line in meta.split('\n') if any(k in line for k in ['kMDItemTitle', 'kMDItemSubject', 'kMDItemKeywords', 'kMDItemDisplayName'])]
                print('\n'.join(meta_lines))
                print("\n")

if __name__ == "__main__":
    main()
