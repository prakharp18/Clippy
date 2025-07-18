import React, { useState } from "react";

function ShortenTab() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      setShortUrl("");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setError("");
        setCopied(false);
      } else {
        setError(data.error || "Something went wrong.");
        setShortUrl("");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server unreachable.");
      setShortUrl("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

      {error && (
        <div className="text-sm text-red-400 text-center">{error}</div>
      )}

      {shortUrl && (
        <div className="text-sm text-green-400 text-center truncate">
          Shortened: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{shortUrl}</a>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleShorten}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-md py-2 text-white disabled:opacity-50"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
        <button
          onClick={handleCopy}
          disabled={!shortUrl}
          className="flex-1 bg-zinc-700 hover:bg-zinc-600 rounded-md py-2 text-white disabled:opacity-50"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default ShortenTab;
