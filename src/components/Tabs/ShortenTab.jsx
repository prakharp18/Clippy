import React, { useState } from "react";

function ShortenTab() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

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
        setShortUrl(data.result_url);
        setError("");
        setCopied(false);

        const newEntry = {
          originalUrl: url,
          shortUrl: data.result_url,
          timestamp: Date.now()
        };

        const existing = JSON.parse(localStorage.getItem("clippy-history")) || [];
        const updatedHistory = [newEntry, ...existing].slice(0, 20);
        localStorage.setItem("clippy-history", JSON.stringify(updatedHistory));
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
    <div className="flex flex-col gap-2 h-full">
      <div className="text-center mb-1">
        <span className="text-amber-200/80 text-sm mr-2">Need to paste?</span>
        <button
          onClick={handlePasteFromClipboard}
          className="text-orange-300 hover:text-orange-200 text-sm underline transition-colors"
        >
          Click here
        </button>
      </div>

      <input
        type="text"
        placeholder="Paste your URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onFocus={(e) => e.target.select()}
        className="w-full bg-black/40 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-3 text-white placeholder-amber-300/60 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300/50 transition-all"
      />

      {error && (
        <div className="text-sm text-red-200 text-center bg-red-500/20 backdrop-blur-sm rounded-2xl p-2 border border-red-400/40">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="text-sm text-emerald-200 text-center bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-3 border border-emerald-400/40">
          <p className="mb-2">✓ URL shortened successfully!</p>
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-200 hover:text-blue-100 underline break-all transition-colors"
          >
            {shortUrl}
          </a>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleShorten}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-orange-500/80 to-amber-500/80 hover:from-orange-500 hover:to-amber-500 backdrop-blur-sm rounded-2xl py-2.5 px-4 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
        <button
          onClick={handleCopy}
          disabled={!shortUrl}
          className="flex-1 bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-sm rounded-2xl py-2.5 px-4 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default ShortenTab;
