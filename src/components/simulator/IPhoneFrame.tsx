import React, { useState, useEffect } from 'react';
import { Home, Gauge, List, PieChart, Target, Settings, Wifi, BatteryCharging, Signal } from 'lucide-react';
import { useI18n } from '../../context/I18nContext';

interface IPhoneFrameProps {
  children: React.ReactNode;
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
  theme?: string;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  activeTab,
  onTabChange,
  theme = 'system',
}) => {
  const { t, isRTL, dir } = useI18n();
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 0, label: t.tabDashboard, icon: Home },
    { id: 1, label: t.tabPlans, icon: Target },
    { id: 2, label: t.tabTransactions, icon: List },
    { id: 3, label: t.tabAnalytics, icon: PieChart },
    { id: 4, label: t.tabSettings, icon: Settings },
  ];

  return (
    <div
      dir={dir}
      className={`relative mx-auto flex w-full flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-all
        max-sm:min-h-[100dvh] max-sm:h-[100dvh] max-sm:w-full max-sm:border-0 max-sm:rounded-none max-sm:shadow-none
        sm:max-w-[428px] sm:rounded-[52px] sm:border-[10px] sm:border-slate-900 sm:shadow-2xl sm:shadow-slate-900/40 sm:dark:border-slate-800 sm:ring-1 sm:ring-white/20 sm:min-h-[820px] sm:max-h-[860px] ${
        isRTL ? 'font-sans' : ''
      }`}
    >
      {/* Top Notch & Sensor Bar (Visible on desktop simulator with frosted glass so scrolled cards never clash with clock/icons) */}
      <div className="hidden sm:flex absolute top-0 right-0 left-0 z-30 h-11 items-center justify-between px-7 pt-1 text-[#1C1C1E] dark:text-white select-none bg-[#F2F2F7]/85 dark:bg-[#1C1C1E]/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04]" dir="ltr">
        {/* Clock */}
        <span className="font-semibold text-xs tracking-tight">{currentTime}</span>

        {/* Physical Camera Notch (iPhone 13 Pro Max) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex h-6 w-36 items-center justify-center rounded-b-2xl bg-slate-900">
          <div className="h-1.5 w-12 rounded-full bg-slate-800" />
          <div className="ml-3 h-2.5 w-2.5 rounded-full bg-slate-800 ring-1 ring-slate-700/50" />
        </div>

        {/* Status Icons */}
        <div className="flex items-center gap-1.5">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-bold">100%</span>
            <BatteryCharging className="h-3.5 w-3.5 text-[#34C759]" />
          </div>
        </div>
      </div>

      {/* Main Content Area with Safe-Area Scroll */}
      <div className="relative flex-1 overflow-y-auto safe-content-container no-scrollbar bg-[#F2F2F7] dark:bg-[#1C1C1E]">
        {children}
      </div>

      {/* iOS 17 Bottom TabBar with Blur Effect */}
      <div className="absolute right-0 bottom-0 left-0 z-30 border-t border-[#D1D1D6] bg-white/95 pb-safe-home pt-2 backdrop-blur-xl dark:border-[#38383A] dark:bg-[#1C1C1E]/95">
        <div className="grid grid-cols-5 gap-1 px-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-1 transition-all ${
                  isActive ? 'text-[#007AFF] scale-105' : 'text-[#8E8E93] hover:text-[#3A3A3C] dark:hover:text-white'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                <span
                  className={`mt-0.5 max-w-full truncate text-[9px] font-bold uppercase tracking-tighter ${
                    isActive ? 'text-[#007AFF]' : 'text-[#8E8E93]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Home Indicator bar (Shown on desktop simulator) */}
        <div className="hidden sm:block mx-auto mt-1.5 h-1 w-32 rounded-full bg-[#C7C7CC] dark:bg-[#38383A]" />
      </div>
    </div>
  );
};

