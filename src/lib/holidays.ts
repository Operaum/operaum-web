export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  country: "CA" | "US" | "BOTH";
}

// 2026 holidays - update yearly, or later swap for a holiday API.
export const HOLIDAYS_2026: Holiday[] = [
  { date: "2026-01-01", name: "New Year's Day", country: "BOTH" },
  { date: "2026-02-16", name: "Family Day", country: "CA" },
  { date: "2026-02-16", name: "Presidents' Day", country: "US" },
  { date: "2026-04-03", name: "Good Friday", country: "BOTH" },
  { date: "2026-05-18", name: "Victoria Day", country: "CA" },
  { date: "2026-05-25", name: "Memorial Day", country: "US" },
  { date: "2026-07-01", name: "Canada Day", country: "CA" },
  { date: "2026-07-04", name: "Independence Day", country: "US" },
  { date: "2026-08-03", name: "BC Day", country: "CA" },
  { date: "2026-09-07", name: "Labour Day", country: "BOTH" },
  { date: "2026-10-12", name: "Thanksgiving (CA)", country: "CA" },
  { date: "2026-11-11", name: "Remembrance Day", country: "CA" },
  { date: "2026-11-11", name: "Veterans Day", country: "US" },
  { date: "2026-11-26", name: "Thanksgiving (US)", country: "US" },
  { date: "2026-12-25", name: "Christmas Day", country: "BOTH" },
  { date: "2026-12-26", name: "Boxing Day", country: "CA" },
];

export function getHolidayForDate(date: Date): Holiday | null {
  const iso = date.toISOString().split("T")[0];
  return HOLIDAYS_2026.find((h) => h.date === iso) ?? null;
}

export function getHolidayDates(): Date[] {
  return HOLIDAYS_2026.map((h) => new Date(h.date + "T00:00:00"));
}
