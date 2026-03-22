from playwright.sync_api import sync_playwright
import os
import subprocess
import time

def run():
    # Start a local server to serve the build
    process = subprocess.Popen(['npx', 'vite', 'preview', '--port', '8080'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(5) # Wait for server to start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={'width': 1280, 'height': 800})
            page.goto('http://localhost:8080/weatherapp/')

            # Wait for the app to load
            page.wait_for_selector('input[placeholder="Rechercher une ville..."]')

            # Take initial screenshot
            page.screenshot(path='screenshots/preview_new.png')

            browser.close()
    finally:
        process.terminate()

if __name__ == "__main__":
    if not os.path.exists('screenshots'):
        os.makedirs('screenshots')
    run()
