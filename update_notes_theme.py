import os
import re

BASE_DIR = r"c:\Users\hp\Desktop\Projects\Sarvottam\sarvottam-institiute\grade10\notes"

THEMES = {
    "Physics": {
        "background": "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        "h1_color": "#2c5364",
        "h1_border": "#2c5364",
        "th_bg": "#2c5364"
    },
    "Chemistry": {
        "background": "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        "h1_color": "#134e5e",
        "h1_border": "#134e5e",
        "th_bg": "#134e5e"
    },
    "Biology": {
        "background": "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        "h1_color": "#11998e",
        "h1_border": "#11998e",
        "th_bg": "#11998e"
    }
}

def update_file(filepath, subject):
    if subject not in THEMES:
        return
    
    theme = THEMES[subject]
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace Body Background
    content = re.sub(r"body\s*\{[^}]*background:[^;]*;", f"body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: {theme['background']};", content)
    
    # Replace H1 Color and Border
    content = re.sub(r"h1\s*\{[^}]*color:[^;]*;", f"h1 {{ color: {theme['h1_color']};", content)
    content = re.sub(r"border-bottom:\s*3px\s*solid\s*[^;]*;", f"border-bottom: 3px solid {theme['h1_border']};", content)
    
    # Replace TH Background
    content = re.sub(r"th\s*\{[^}]*background-color:[^;]*;", f"th {{ background-color: {theme['th_bg']};", content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {filepath}")

for root, dirs, files in os.walk(BASE_DIR):
    for file in files:
        if file.endswith(".html"):
            # Determine subject from directory name
            subject = os.path.basename(root)
            update_file(os.path.join(root, file), subject)
