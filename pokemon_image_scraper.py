import os
import re
import asyncio
import aiohttp
import aiofiles
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

BASE_URL = "https://www.pricecharting.com"
START_URL = f"{BASE_URL}/console/pokemon-base-set"
SAVE_DIR = r"C:\Projects\pokemon-tcg\images\pokemon_base_set"
os.makedirs(SAVE_DIR, exist_ok=True)

async def save_image(session, url, save_path):
    try:
        print(f"Downloading {url} to {save_path}")
        async with session.get(url) as resp:
            if resp.status == 200:
                async with aiofiles.open(save_path, mode='wb') as f:
                    content = await resp.read()
                    await f.write(content)
                    print(f"Successfully saved {save_path} ({len(content)} bytes)")
            else:
                print(f"Failed to download {url}: HTTP {resp.status}")
    except Exception as e:
        print(f"Error saving {url}: {e}")

async def fetch_high_res_image(session, card_url, name):
    try:
        async with session.get(card_url) as resp:
            if resp.status == 200:
                html = await resp.text()
                soup = BeautifulSoup(html, 'html.parser')
                img_tag = soup.select_one('img.large_image')
                if img_tag:
                    image_url = img_tag['src']
                    ext = image_url.split(".")[-1].split("?")[0]
                    save_path = os.path.join(SAVE_DIR, f"{name}_highres.{ext}")
                    await save_image(session, image_url, save_path)
                else:
                    print(f"Image not found for {name} at {card_url}")
            else:
                print(f"Failed to fetch card page for {name}: HTTP {resp.status}")
    except Exception as e:
        print(f"Error processing {name}: {str(e)}")

async def scrape():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        print(f"Navigating to {START_URL}")
        await page.goto(START_URL)
        
        # Verify we're on the correct page
        page_title = await page.title()
        print(f"Page title: {page_title}")

        # Scroll to load all cards
        previous_height = 0
        while True:
            await page.mouse.wheel(0, 20000)
            await page.wait_for_timeout(1000)
            height = await page.evaluate("document.body.scrollHeight")
            if height == previous_height:
                break
            previous_height = height

        # Extract all card links and thumbnails
        # Use a more robust selector that matches all card rows
        cards = await page.query_selector_all('table#games_table tbody tr:not(.header):not(.footer)')
        print(f"Found {len(cards)} cards.")
        
        if len(cards) == 0:
            print("Error: No cards found. The website structure may have changed.")
            return

        urls = []
        thumbs = []
        for card in cards:
            # Find the title link within the row
            title_link = await card.query_selector('td.title a')
            if not title_link:
                continue
                
            href = await title_link.get_attribute("href")
            name = await title_link.inner_text()
            full_url = f"{BASE_URL}{href}"
            
            # Find the image within the card row
            img = await card.query_selector('td.image img')
            if img:
                # Try to get data-src first (for lazy-loaded images), then fall back to src
                thumb_url = await img.get_attribute("data-src") or await img.get_attribute("src")
                if not thumb_url:
                    # If still not found, try to get from style attribute
                    style = await img.get_attribute("style")
                    if style and 'background-image' in style:
                        thumb_url = style.split("url('")[1].split("')")[0]
                
                if thumb_url:
                    # Remove invalid characters from filename
                    safe_name = re.sub(r'[\\/*?:"<>|]', "", name.strip().replace(" ", "_"))
                    urls.append((safe_name, full_url))
                    thumbs.append((safe_name, thumb_url))
                else:
                    print(f"Couldn't extract image URL for card: {name}")
            else:
                print(f"No image element found for card: {name}")

        await browser.close()

        # Download images asynchronously
        async with aiohttp.ClientSession() as session:
            tasks = []

            # Print first 5 thumb_urls for debugging
            print(f"First 5 thumbnail URLs:")
            for name, thumb_url in thumbs[:5]:
                print(f"- {name}: {thumb_url}")
                
            for name, thumb_url in thumbs:
                ext = thumb_url.split(".")[-1].split("?")[0]
                path = os.path.join(SAVE_DIR, f"{name}_thumb.{ext}")
                tasks.append(save_image(session, thumb_url, path))

            # Print first 5 detail URLs for debugging
            print(f"First 5 detail URLs:")
            for name, detail_url in urls[:5]:
                print(f"- {name}: {detail_url}")
                
            for name, detail_url in urls:
                tasks.append(fetch_high_res_image(session, detail_url, name))

            await asyncio.gather(*tasks)
            
        print("All downloads completed!")

if __name__ == "__main__":
    print("Starting Pokemon image scraper...")
    asyncio.run(scrape())
    print("Scraping completed. Check the images directory for downloaded files.")
