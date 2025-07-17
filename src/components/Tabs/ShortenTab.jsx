import React, { useState } from 'react';

export default function ShortenTab() {
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`border-2 ${isDragging ? 'border-blue-500' : 'border-zinc-600'} border-dashed rounded-lg p-6 text-center transition-colors`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const dropped = e.dataTransfer.getData('text');
          if (dropped) setUrl(dropped);
        }}
      >
        <p className="text-zinc-400">📎 Drag or paste a URL here</p>
      </div>

      <input
        type="text"
        placeholder="Or paste here manually..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-600 rounded-md p-2 text-white"
      />

      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-md py-2 text-white">
          Shorten URL
        </button>
        <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 rounded-md py-2 text-white">
          Copy
        </button>
      </div>
    </div>
  );
}
