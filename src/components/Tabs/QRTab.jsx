import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRTab() {
  const [url, setUrl] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQR = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      setQrGenerated(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
      setQrGenerated(true);
      setError('');
    } catch {
      setError("Invalid URL format. Please include http:// or https://");
      setQrGenerated(false);
    }
  };

  const downloadQR = () => {
    const svg = document.querySelector('#qr-code svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 128;
      canvas.height = 128;
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
  {/*Input field*/}
      <input
        type="text"
        placeholder="Enter URL to generate QR code..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onFocus={(e) => e.target.select()}
        className="w-full bg-black/40 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-3 text-white placeholder-amber-300/60 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300/50 transition-all"
      />
      
      {/* Error message */}
      {error && (
        <div className="text-sm text-red-200 text-center bg-red-500/20 backdrop-blur-sm rounded-2xl p-2 border border-red-400/40">
          {error}
        </div>
      )}
      
      {/* QR Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl border border-orange-400/20 p-4">
        {qrGenerated ? (
          <div className="bg-white p-4 rounded-2xl shadow-lg" id="qr-code">
            <QRCodeSVG
              value={url}
              size={128}
              level="M"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">🔲</div>
            <p className="text-amber-200/70 text-sm">QR code will appear here</p>
          </div>
        )}
      </div>

      {/* buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleGenerateQR}
          disabled={!url.trim()}
          className="flex-1 bg-gradient-to-r from-orange-500/80 to-amber-500/80 hover:from-orange-500 hover:to-amber-500 backdrop-blur-sm rounded-2xl py-2.5 px-4 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          Generate QR
        </button>
        {qrGenerated && (
          <button 
            onClick={downloadQR}
            className="flex-1 bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-sm rounded-2xl py-2.5 px-4 text-white font-medium transition-all duration-200 shadow-lg"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}