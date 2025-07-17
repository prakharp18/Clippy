// TabHeader.jsx
import React from 'react';

export default function TabHeader({ tabs = ['Shorten', 'History', 'QR'], activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-center gap-2 bg-black/30 px-2 py-1 rounded-xl backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === tab
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
