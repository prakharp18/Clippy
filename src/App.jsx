// App.jsx
import React, { useState } from 'react';
import ShortenTab from './components/Tabs/ShortenTab';
import HistoryTab from './components/Tabs/HistoryTab';
import QRTab from './components/Tabs/QRTab';
import TabHeader from './components/TabHeader';
import bg from './assets/clippy-bg.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('Shorten');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Shorten':
        return <ShortenTab />;
      case 'History':
        return <HistoryTab />;
      case 'QR':
        return <QRTab />;
      default:
        return null;
    }
  };

  return (
    // Add 'relative' class here
    <div className="relative w-[360px] h-[620px] overflow-hidden shadow-2xl border border-white/10">
      {/* Background */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-5 gap-5 text-white font-sans">
        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full">{renderActiveTab()}</div>
      </div>
    </div>
  );
}