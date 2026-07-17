export interface MarketTrend {
  month: string;
  avgPrice: number;
  daysOnMarket: number;
}

export interface ComparableProperty {
  id: string;
  address: string;
  city: string;
  soldPrice: number;
  sqft: number;
  soldDate: string;
  pricePerSqft: number;
}

export interface MarketInsight {
  id: string;
  title: string;
  detail: string;
  area: string;
  trend: "up" | "down" | "neutral";
  timestamp: string;
}
