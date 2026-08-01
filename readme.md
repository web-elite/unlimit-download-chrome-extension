# 🚀 Download Helper Extension

A lightweight Chrome Extension for detecting download elements on webpages and providing quick access through a simple interface.

Download Helper helps users find available download buttons and links on authorized websites, especially when websites have complex download interfaces or dynamically generated elements.

---

## ✨ Features

- 🔍 Automatic webpage scanning
- 🎯 Detect download elements:
  - Buttons
  - Links
  - Input buttons
  - Dynamic DOM elements
  - `data-url`
  - `data-href`
- 🖱️ Show detected downloads as clickable buttons
- ⚡ Supports modern websites:
  - React
  - Vue
  - Angular
  - Vanilla JavaScript
- 🔄 Real-time DOM monitoring using MutationObserver
- 🧩 Chrome Extension Manifest V3
- 🪶 Lightweight and fast
- 🔒 Runs locally in browser

---

## 📦 Installation

### Requirements

- Google Chrome
- Chromium-based browser
- Developer Mode enabled

Supported browsers:

- Google Chrome
- Microsoft Edge
- Brave
- Other Chromium browsers

---

# Install from Source

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/download-helper.git
```

Go to directory:

```bash
cd download-helper
```

---

## 2. Open Chrome Extensions

Open:

```
chrome://extensions/
```

Enable:

```
Developer mode
```

---

## 3. Load Extension

Click:

```
Load unpacked
```

Select:

```
download-helper/
```

Done.

---

# 📁 Project Structure

```
download-helper/
│
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── README.md
```

---

# ⚙️ Configuration

Edit:

```
content.js
```

Modify keywords:

```javascript
const keywords = [
  "download",
  "download file",
  "get file",
  "start",
  "دانلود"
];
```

Add custom keywords depending on your needs.

---

# 🧠 How It Works

Architecture:

```
Website
   |
   ↓
content.js
   |
   ↓
Download Scanner
   |
   ↓
Detected Links
   |
   ↓
popup.js
   |
   ↓
Download Buttons
```

Process:

1. Extension injects content script.
2. Page elements are scanned.
3. Download elements are detected.
4. Links are extracted.
5. Popup displays available downloads.
6. User opens selected download.

---

# 🔍 Detection

Supported examples:

HTML link:

```html
<a href="file.zip">
Download
</a>
```

Button:

```html
<button>
Download File
</button>
```

Data URL:

```html
<div data-url="https://example.com/file.zip">
</div>
```

Data href:

```html
<div data-href="https://example.com/file.zip">
</div>
```

---

# 🔐 Privacy

Download Helper:

- Does not collect personal data.
- Does not send browsing history.
- Does not use tracking services.
- Runs completely locally.

All processing happens inside your browser.

---

# 🛠️ Development

No dependencies required.

Built with:

- JavaScript
- Chrome Extensions API
- Manifest V3

After changes:

1. Open:

```
chrome://extensions/
```

2. Click:

```
Reload
```

3. Test extension.

---

# 🤝 Contributing

Contributions are welcome.

## Create branch

```bash
git checkout -b feature/new-feature
```

## Commit

```bash
git commit -m "Add new feature"
```

## Push

```bash
git push origin feature/new-feature
```

Open Pull Request.

---

# ⭐ Support

If this project helped you:

Give this repository a ⭐ Star.

Stars help:

- More people discover the project.
- Support future development.
- Motivate new features.

---

# 🐛 Bug Reports

Open an issue:

```
https://github.com/YOUR_USERNAME/download-helper/issues
```

Include:

- Browser version
- Operating system
- Website example
- Steps to reproduce
- Console errors
- Screenshots

---

# 🗺️ Roadmap

- [ ] Better download detection
- [ ] Advanced URL extraction
- [ ] Custom website rules
- [ ] Download history
- [ ] Firefox support
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Settings panel
- [ ] Export/import configuration

---

# 📄 License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.

---

# ❤️ Credits

Built with:

- JavaScript
- Chrome Extensions API
- Manifest V3

---

If this project helped you, consider giving it a ⭐ on GitHub.