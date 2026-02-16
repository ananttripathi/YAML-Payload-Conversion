# YAML to Python Converter

A premium, client-side web application that instantly converts YAML configurations into Python variable assignments. Designed with a modern glassmorphism aesthetic and built for efficiency.

![App Interface](https://github.com/ananttripathi/YAML-Payload-Conversion/blob/main/app_screenshot.png?raw=true)
*(Note: You might want to upload a screenshot to your repo and link it here, or use the one I captured)*

## Features

- **Real-time Conversion**: Type or paste YAML, get Python code instantly.
- **Privacy Focused**: All processing happens locally in your browser using `js-yaml`. No data leaves your device.
- **Smart Formatting**: Automatically handles string quoting, booleans (`true` -> `True`), nulls (`null` -> `None`), lists, and dictionaries.
- **Premium UI**: Sleek glassmorphism design with animated backgrounds.
- **Developer Friendly**: 
    - **One-line Mode**: Horizontal scrolling enabled for long payloads to prevent wrapping.
    - **Download Support**: Export your converted config as a `.py` file with one click.
    - **Copy to Clipboard**: Quick copy button for immediate use.

## How to Use

1. **Input**: Paste your YAML content into the left pane.
2. **Convert**: Click the "Convert Now" button (or wait for auto-convert).
3. **Output**: Copy the Python code from the right pane or click the **Download** icon to save as `config.py`.

## Installation / Local Setup

Since this is a static web app, you can run it without any complex backend.

1. **Clone the repository**
   ```bash
   git clone https://github.com/ananttripathi/YAML-Payload-Conversion.git
   cd YAML-Payload-Conversion
   ```

2. **Open index.html**
    सिंपली double-click `index.html` to open it in your browser.

   OR serve it locally for a better experience:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Hosting

You can easily host this on [GitHub Pages](https://pages.github.com/) or [Netlify Drop](https://app.netlify.com/drop) for free.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.