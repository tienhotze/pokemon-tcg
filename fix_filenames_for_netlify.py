import os

def fix_filenames():
    images_dir = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'public', 'images', 'pokemon_base_set')
    
    if not os.path.isdir(images_dir):
        print(f"Error: Directory not found at {images_dir}")
        return

    renamed_count = 0
    for filename in os.listdir(images_dir):
        if '#' in filename:
            new_filename = filename.replace('#', '-')
            old_path = os.path.join(images_dir, filename)
            new_path = os.path.join(images_dir, new_filename)
            try:
                os.rename(old_path, new_path)
                print(f"Renamed '{filename}' to '{new_filename}'")
                renamed_count += 1
            except OSError as e:
                print(f"Error renaming {filename}: {e}")
    
    if renamed_count == 0:
        print("No files with '#' found to rename.")
    else:
        print(f"Finished renaming {renamed_count} files.")

if __name__ == "__main__":
    fix_filenames()
