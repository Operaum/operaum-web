// Parses times like "10:00 AM", "2:30 PM", "14:00" into minutes since midnight.
// Returns null if the string can't be parsed.
export function parseTimeToMinutes(time: string | null | undefined): number | null {
  if (!time) return null;
  const trimmed = time.trim();

  const ampmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const minutes = parseInt(ampmMatch[2], 10);
    const period = ampmMatch[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  const twentyFourMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourMatch) {
    const hours = parseInt(twentyFourMatch[1], 10);
    const minutes = parseInt(twentyFourMatch[2], 10);
    return hours * 60 + minutes;
  }

  return null;
}

export function timeRangesOverlap(
  startA: string | null | undefined,
  endA: string | null | undefined,
  startB: string | null | undefined,
  endB: string | null | undefined
): boolean {
  const sA = parseTimeToMinutes(startA);
  const sB = parseTimeToMinutes(startB);

  // If either event has no parseable start time, fall back to treating it
  // as an all-day/unspecified-time event that always conflicts on that day.
  if (sA === null || sB === null) return true;

  const eA = parseTimeToMinutes(endA) ?? sA + 60; // default 1hr duration if no end time
  const eB = parseTimeToMinutes(endB) ?? sB + 60;

  return sA < eB && sB < eA;
}
