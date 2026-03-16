from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        page.goto('http://localhost:8080/weatherapp/')
        page.wait_for_selector('input[placeholder="Enter city..."]')
        page.fill('input[placeholder="Enter city..."]', 'Paris')
        page.click('button:has-text("Search")')
        page.wait_for_timeout(5000) # Wait for API response and animations
        page.screenshot(path='screenshots/preview.png')
        browser.close()

if __name__ == "__main__":
    run()
