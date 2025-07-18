// TabHeader.jsx
import React from 'react';

export default function TabHeader({ tabs = ['Shorten', 'History', 'QR'], activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-center gap-1 bg-black/40 backdrop-blur-sm w-full px-1 py-1 rounded-2xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${activeTab === tab
              ? 'bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white shadow-lg'
              : 'text-blue-200/70 hover:bg-white/10 hover:text-blue-100'}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
