
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const MetricCard = ({ icon, label, value }: MetricCardProps) => (
  <div className="bg-white rounded-lg px-6 py-5 border border-gray-200 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon={<span className="text-amber-600">💎</span>}
        label="Main Category"
        value="Decoration"
      />
      <MetricCard
        icon={<span className="text-amber-600">⭐</span>}
        label="Avg. Stars"
        value="4.1"
      />
      <MetricCard
        icon={<span className="text-amber-600">⏱️</span>}
        label="Avg. Duration"
        value="3"
      />
      <MetricCard
        icon={<span className="text-amber-600">📚</span>}
        label="Saved Tutorials"
        value="1,240"
      />
    </div>
  );
};

export default MetricsOverview;
