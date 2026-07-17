import { MarketTrend, ComparableProperty, MarketInsight } from "@/types/market";

export const marketTrends: MarketTrend[] = [
  { month: "Feb", avgPrice: 872000, daysOnMarket: 34 },
  { month: "Mar", avgPrice: 891000, daysOnMarket: 29 },
  { month: "Apr", avgPrice: 905000, daysOnMarket: 27 },
  { month: "May", avgPrice: 918000, daysOnMarket: 24 },
  { month: "Jun", avgPrice: 934000, daysOnMarket: 22 },
  { month: "Jul", avgPrice: 949000, daysOnMarket: 19 },
];

export const comparableProperties: ComparableProperty[] = [
  { id: "1", address: "88 Birchwood Ave", city: "Langley, BC", soldPrice: 1142000, sqft: 2760, soldDate: "2026-07-10", pricePerSqft: 414 },
  { id: "2", address: "410 Cedarbrook Rd", city: "Surrey, BC", soldPrice: 875000, sqft: 1890, soldDate: "2026-07-08", pricePerSqft: 463 },
  { id: "3", address: "12 Sunset Terrace", city: "White Rock, BC", soldPrice: 2050000, sqft: 3980, soldDate: "2026-07-05", pricePerSqft: 515 },
  { id: "4", address: "770 Fraser Vista Dr", city: "Abbotsford, BC", soldPrice: 712000, sqft: 1640, soldDate: "2026-07-02", pricePerSqft: 434 },
];

export const marketInsights: MarketInsight[] = [
  { id: "1", title: "Langley prices up 3.2%", detail: "Detached homes in Langley have risen steadily over the past 60 days, outpacing the regional average.", area: "Langley", trend: "up", timestamp: "Today" },
  { id: "2", title: "Days on market shrinking", detail: "Average days on market for the Fraser Valley dropped from 34 to 19 over the last 5 months.", area: "Fraser Valley", trend: "up", timestamp: "Today" },
  { id: "3", title: "Condo inventory rising in Surrey", detail: "New listings for condos in Surrey increased 14% this month, which may soften pricing short-term.", area: "Surrey", trend: "down", timestamp: "Yesterday" },
  { id: "4", title: "White Rock luxury segment steady", detail: "Homes above $1.8M in White Rock are holding price with minimal negotiation from list price.", area: "White Rock", trend: "neutral", timestamp: "2 days ago" },
];
