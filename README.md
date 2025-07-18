# 📎 Clippy – URL Shortener Chrome Extension

Clippy is a beautiful, modern Chrome extension for URL shortening, QR code generation, and link management. Built with React and featuring a stunning gradient UI, it provides a seamless experience for managing your links without requiring any sign-ups or external accounts.

## 🧭 Key Features

**No Sign-Up Required**: 100% local storage. All your shortened URLs and history are stored securely in your browser.

**Dual URL Shortening**: Support for both GET and POST requests with real-time URL validation and one-click copying.

**QR Code Generation**: Create high-quality SVG QR codes for any URL with instant download as PNG images.

**Smart History Management**: Automatically maintains your latest 20 shortened URLs with quick access and management.

**Modern Glassmorphism UI**: Beautiful orange-to-blue gradient design with backdrop blur effects and smooth animations.

**Clipboard Integration**: Paste URLs directly from clipboard with one-click convenience.

## � Tech Stack

**Frontend**: React 18 with Vite for fast development and Tailwind CSS for modern styling  
**Backend**: Express.js server with CORS support and CleanURI API integration  
**QR Generation**: qrcode.react for SVG-based QR codes  
**Storage**: localStorage for offline history tracking (no backend data storage)  
**Extension APIs**: Chrome Extension Manifest V3 for browser integration  

## 🚀 Getting Started

**Prerequisites**: Node.js 16+ and Chrome browser

### Development Setup
```bash
git clone https://github.com/prakharp18/Clippy.git
cd Clippy/clippy-extension
npm install

# Start backend server
cd server && npm install && node index.js &

# Build extension
npm run build
```

### Install in Chrome
1. Open `chrome://extensions/`
2. Enable "Developer mode" 
3. Click "Load unpacked" → Select `dist` folder
4. Pin the extension and start shortening URLs!

## 📋 Usage

**Shorten URLs**: Paste any URL, get shortened link instantly, copy with one click  
**Generate QR Codes**: Enter URL, generate scannable QR code, download as PNG  
**View History**: Access your latest 20 shortened URLs with original/short link pairs  

## 🎨 Design

Modern glassmorphism interface with:
- Blue navigation tabs with orange/amber content areas
- Responsive 360×480px popup optimized for browser extensions  
- Smooth transitions and elegant hover effects
- Error handling with contextual feedback

## � License

MIT License - feel free to fork, modify, and distribute.

---

⭐ **Star this repo if Clippy helps boost your productivity!**