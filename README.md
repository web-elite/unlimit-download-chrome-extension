# Download Helper

A lightweight Manifest V3 extension for Chromium-based browsers that detects likely download links and buttons on the current page and presents them in a compact popup.

> **Current repository version:** 1.0.3  
> **Status:** Early-stage utility. The documented behavior reflects the current source code; compatibility can vary by website.

## What it does

- Scans the current page for links, buttons, inputs, and elements containing `data-url` or `data-href` attributes.
- Looks for common download-related labels, including English terms such as `download` and the Persian word `دانلود`.
- Displays detected candidates in the extension popup.
- Opens a selected candidate URL in a new browser tab.
- Includes a site-specific URL extraction handler for Uptodown pages.
- Uses Manifest V3 content scripts and the browser's extension messaging API.

## Supported browsers

Designed for Chromium-based browsers that support Manifest V3, including:

- Google Chrome
- Microsoft Edge
- Brave
- Other compatible Chromium browsers

Browser support does not guarantee that every website or download flow will work.

## Installation (developer mode)

The extension currently supports manual installation from source:

1. Download or clone this repository.
2. Open the browser's extensions management page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the folder containing `manifest.json`.

To update, download the latest repository contents and reload the extension from the extensions management page.

## How to use

1. Open a webpage that contains download links or buttons.
2. Select the **Download Helper** extension icon.
3. Review the detected candidates in the popup.
4. Select a candidate to open its URL in a new tab.

The extension detects likely download elements; it does not guarantee that a selected URL is a direct file, that the download will start automatically, or that a website will allow the request.

## How detection works

The content script scans common interactive elements:

- `a`
- `button`
- `input`
- `[data-url]`
- `[data-href]`

It checks visible text and title attributes for configured download-related keywords, then extracts a URL from common link and data attributes. The Uptodown handler contains additional extraction logic for pages that expose a download token through `data-url`.

The popup sends a scan request to the active tab, renders the returned candidates, and opens the selected URL in a new tab.

## Permissions and privacy

The current manifest requests:

- **activeTab** — interact with the tab when the user invokes the extension.
- **storage** — available for extension settings or stored data.
- **Host access to all URLs** — allows the content script to run on pages where download candidates may appear.

The current source code performs page scanning locally in the browser and does not implement an account system or send scanned page contents to a project-owned backend. The extension may open links on the website being visited when the user selects a result. The websites and any third-party services those sites use remain subject to their own privacy policies.

Because the extension requests broad host access, users should install it only from a source they trust and review future changes to its permissions.

## Limitations

- Detection is heuristic and based on element attributes and text; it can miss dynamically generated or custom download controls.
- Some sites require authentication, cookies, JavaScript challenges, or additional steps that a detected URL alone cannot reproduce.
- A detected link may lead to a landing page rather than a file.
- Website markup changes can break site-specific extraction.
- The extension does not bypass access controls, paywalls, DRM, or website restrictions.

## Development

The current implementation is plain JavaScript and HTML; no package manager or build step is required.

Main files:

| File | Purpose |
|---|---|
| `manifest.json` | Manifest V3 metadata, permissions, popup, and content-script registration |
| `content.js` | Page scanning, keyword matching, and URL extraction |
| `popup.html` | Popup layout |
| `popup.js` | Requests a scan and displays detected candidates |

For local development, edit the source files, return to the extensions management page, and reload the extension before testing again.

## Contributing

Bug reports and focused pull requests are welcome. When reporting a website-specific issue, include:

- Browser name and version
- The affected website and page type
- The visible label of the download control
- Whether the control uses a normal link or a dynamically generated action

Do not include passwords, session cookies, private download URLs, or other account credentials in public issues.

## Roadmap

Potential improvements for future versions:

- More robust detection for dynamically rendered download controls
- Configurable keywords and language packs
- Better duplicate filtering and clearer result labels
- A maintained list of tested site-specific extractors
- Automated tests for URL extraction and supported page patterns
- A clearer permission model as the extension's supported sites become more focused

Roadmap items are proposals, not features currently guaranteed by version 1.0.3.
