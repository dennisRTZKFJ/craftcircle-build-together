import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, DollarSign, ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  trend: string;
  description: string;
}

const StatsCard = ({ title, icon, value, trend, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="flex-align-center-gap-2 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <div className="flex items-center text-sm">
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          {trend}
        </Badge>
        <span className="muted-text ml-2">{description}</span>
      </div>
    </CardContent>
  </Card>
);

interface AnalyticsData {
  views: {
    total: number;
    trend: string;
    data: number[];
  };
  revenue: {
    total: string;
    trend: string;
    data: number[];
  };
  followers: {
    total: number;
    trend: string;
    data: number[];
  };
  engagement: {
    total: string;
    trend: string;
    data: number[];
  };
}

interface StatsOverviewProps {
  analytics: AnalyticsData;
}

const StatsOverview = ({ analytics }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Views"
        icon={<Eye className="h-5 w-5 text-craft-wood" />}
        value={analytics.views.total.toLocaleString()}
        trend={analytics.views.trend}
        description="last month"
      />
      <StatsCard
        title="Engagement"
        icon={<Heart className="h-5 w-5 text-craft-wood" />}
        value={analytics.engagement.total}
        trend={analytics.engagement.trend}
        description="last month"
      />
      <StatsCard
        title="Revenue"
        icon={<DollarSign className="h-5 w-5 text-craft-wood" />}
        value={analytics.revenue.total}
        trend={analytics.revenue.trend}
        description="last month"
      />
      <StatsCard
        title="Followers"
        icon={<ArrowUpRight className="h-5 w-5 text-craft-wood" />}
        value={analytics.followers.total.toLocaleString()}
        trend={analytics.followers.trend}
        description="last month"
      />
    </div>
  );
};

export default StatsOverview;
