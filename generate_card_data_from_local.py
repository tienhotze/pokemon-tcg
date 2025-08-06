import os
import json
import re

def generate_card_data():
    images_dir = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'public', 'images', 'pokemon_base_set')
    all_cards_data = []
    
    # Use a set to keep track of card names to avoid duplicates from different editions
    processed_cards = set()

    for filename in sorted(os.listdir(images_dir)):
        if not (filename.endswith(".jpg") or filename.endswith(".png")):
            continue

        # Extract a clean base name for the card
        clean_name = re.sub(r'_\#\d+_thumb\.(jpg|png)$', '', filename)
        clean_name = re.sub(r'\[.*?\]', '', clean_name).replace('_', ' ').strip()

        if clean_name in processed_cards:
            continue # Skip if we've already processed this card name

        # Extract number from filename
        number_match = re.search(r'__(\d+)', filename)
        number = number_match.group(1) if number_match else 'N/A'
        
        card_id = f"base1-{number}"

        card_data = {
            "id": card_id,
            "name": clean_name,
            "supertype": "Pokémon",
            "subtypes": ["Unknown"], # Placeholder
            "hp": "Unknown", # Placeholder
            "types": ["Unknown"], # Placeholder
            "evolvesFrom": "Unknown", # Placeholder
            "abilities": [], # Placeholder
            "attacks": [], # Placeholder
            "weaknesses": [], # Placeholder
            "resistances": [], # Placeholder
            "retreatCost": [], # Placeholder
            "convertedRetreatCost": 0, # Placeholder
            "set": {
                "id": "base1",
                "name": "Base",
                "series": "Base",
                "printedTotal": 102,
                "total": 102,
                "legalities": { "unlimited": "Legal" },
                "ptcgoCode": "BS",
                "releaseDate": "1999/01/09",
                "updatedAt": "2023/03/14" # Placeholder
            },
            "number": number,
            "artist": "Unknown", # Placeholder
            "rarity": "Unknown", # Placeholder
            "flavorText": "Unknown", # Placeholder
            "nationalPokedexNumbers": [], # Placeholder
            "legalities": { "unlimited": "Legal" },
            "images": {
                "small": f"images/pokemon_base_set/{filename}",
                "large": f"images/pokemon_base_set/{filename.replace('_thumb', '_large')}"
            },
            "tcgplayer": {}, # Placeholder
            "cardmarket": {} # Placeholder
        }
        all_cards_data.append(card_data)
        processed_cards.add(clean_name)

    # Sort by card number
    all_cards_data.sort(key=lambda x: int(x['number']) if x['number'].isdigit() else 999)

    js_file_path = os.path.join(os.path.dirname(__file__), 'pokemon-tcg-collector', 'src', 'data', 'base_set_cards.js')
    with open(js_file_path, 'w', encoding='utf-8') as f:
        f.write("export const baseSetCards = ")
        json.dump(all_cards_data, f, indent=2)
        f.write(";")
        
    print(f"Successfully generated and saved data for {len(all_cards_data)} unique cards.")

if __name__ == "__main__":
    generate_card_data()
