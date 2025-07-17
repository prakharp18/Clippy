import React, { useState } from 'react';

export default function QRTab() {
  const [url, setUrl] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQR = () => {
    if (url.trim()) setQrGenerated(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter URL to generate QR code"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-600 rounded-md p-2 text-white"
      />
      <button
        onClick={handleGenerateQR}
        className="bg-green-600 hover:bg-green-700 rounded-md py-2 text-white"
      >
        Generate QR
      </button>

      {qrGenerated ? (
        <div className="w-full flex justify-center">
          <div className="bg-white p-4 rounded-md">
            <p className="text-black text-sm">[QR Preview Placeholder]</p>
          </div>
        </div>
      ) : (
        <p className="text-zinc-400 text-center">🔲 QR code will appear here</p>
      )}
    </div>
  );
}