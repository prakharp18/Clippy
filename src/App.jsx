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
    <div className="relative w-[360px] h-[480px] overflow-hidden shadow-2xl border border-white/10 rounded-lg">
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-4 gap-4 text-white font-sans h-full">
        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full flex-1 overflow-y-auto">{renderActiveTab()}</div>
      </div>
    </div>
  );
}