
export interface Tutorial {
  id: number;
  title: string;
  status: string;
  views: number;
  likes: number;
  comments: number;
  revenue: string;
  date: string;
  image: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  tutorial: string;
  date: string;
  likes: number;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface AnalyticsData {
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
