import React, { useEffect, useState } from 'react';

export default function HistoryTab() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("clippy-history")) || [];
    setHistory(saved);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleClear = () => {
    localStorage.removeItem("clippy-history");
    setHistory([]);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="text-center mb-2">
        <h3 className="text-amber-200/80 text-sm font-medium">Recent Links</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-3">
              <div className="mb-2">
                <p className="text-xs text-amber-300/70 mb-1">{formatTimeAgo(item.timestamp)}</p>
                <p className="text-xs text-gray-300 truncate">{item.originalUrl}</p>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={item.shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-blue-200 hover:text-blue-100 text-sm underline truncate transition-colors"
                >
                  {item.shortUrl}
                </a>
                <button
                  onClick={() => handleCopy(item.shortUrl)}
                  className="text-orange-300 hover:text-orange-200 text-xs transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-amber-200/70 text-sm">Your shortened links will appear here</p>
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-auto pt-2">
          <button
            onClick={handleClear}
            className="w-full bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-sm rounded-2xl py-2.5 px-4 text-white font-medium transition-all duration-200 shadow-lg"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
