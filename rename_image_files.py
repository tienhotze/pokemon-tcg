import os
import re

def rename_files():
    images_dir = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'public', 'images', 'pokemon_base_set')
    
    if not os.path.isdir(images_dir):
        print(f"Error: Directory not found at {images_dir}")
        return

    for filename in os.listdir(images_dir):
        if '#' in filename:
            new_filename = filename.replace('#', '_')
            old_path = os.path.join(images_dir, filename)
            new_path = os.path.join(images_dir, new_filename)
            os.rename(old_path, new_path)
            print(f"Renamed '{filename}' to '{new_filename}'")

if __name__ == "__main__":
    rename_files()
