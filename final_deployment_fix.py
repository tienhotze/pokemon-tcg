import os
import re

def fix_filenames_and_data():
    # 1. Rename files on the filesystem
    images_dir = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'public', 'images', 'pokemon_base_set')
    renamed_files = False
    if not os.path.isdir(images_dir):
        print(f"Error: Directory not found at {images_dir}")
        return

    for filename in os.listdir(images_dir):
        if '#' in filename:
            new_filename = filename.replace('#', '-')
            old_path = os.path.join(images_dir, filename)
            new_path = os.path.join(images_dir, new_filename)
            try:
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {new_filename}")
                renamed_files = True
            except OSError as e:
                print(f"Error renaming {filename}: {e}")

    if not renamed_files:
        print("No files with '#' found to rename. Proceeding to check data file.")

    # 2. Update the data file to match
    js_file_path = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'src', 'data', 'base_set_cards.js')
    if not os.path.exists(js_file_path):
        print(f"Error: Data file not found at {js_file_path}")
        return

    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if '#' in content:
        new_content = content.replace('#', '-')
        with open(js_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated image paths in {js_file_path} to remove '#' characters.")
    else:
        print("No '#' characters found in the data file. No changes needed.")

if __name__ == "__main__":
    fix_filenames_and_data()
