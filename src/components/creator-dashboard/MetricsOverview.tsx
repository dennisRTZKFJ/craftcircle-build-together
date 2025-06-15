
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const MetricCard = ({ icon, label, value }: MetricCardProps) => (
  <div className="bg-white rounded-lg px-6 py-5 border border-gray-100">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
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
