
import React from "react";

interface TabNavigationProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  tabList: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabList,
}) => {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {tabList.map((tab, idx) => (
        <button
          key={tab}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all
            ${activeTab === idx
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
            }
          `}
          disabled={idx > activeTab}
          onClick={() => onTabChange(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
