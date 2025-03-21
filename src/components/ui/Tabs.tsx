'use client';

import { Text } from '@/components/ui/Text';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`flex ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        
        return (
          <div
            key={tab.id}
            className={`flex flex-row px-[10px] cursor-pointer pb-[10px] ${
              isActive ? 'border-b-2 border-content-primary' : 'border-b-1 border-border-low-contrast'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Text
              variant={isActive ? 'nav-selected' : 'nav-unselected'}
              className="text-content-primary"
            >
              {tab.label}
            </Text>
          </div>
        );
      })}
    </div>
  );
} 