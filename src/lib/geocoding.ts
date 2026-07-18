import { REGIONS } from "@/lib/regions";

interface NominatimResult {
  address?: {
    state?: string;
    province?: string;
    country_code?: string;
  };
}

// Maps full state/province names returned by Nominatim to our region codes.
const STATE_NAME_TO_CODE: Record<string, string> = {
  "british columbia": "BC",
  alberta: "AB",
  saskatchewan: "SK",
  manitoba: "MB",
  ontario: "ON",
  quebec: "QC",
  "new brunswick": "NB",
  "nova scotia": "NS",
  "prince edward island": "PE",
  "newfoundland and labrador": "NL",
  washington: "WA",
  oregon: "OR",
  california: "CA",
  "new york": "NY",
  texas: "TX",
  florida: "FL",
  illinois: "IL",
  arizona: "AZ",
};

export async function geocodeRegion(query: string): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=1&countrycodes=ca,us`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Operaum/1.0 (lead-routing)",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      return null;
    }

    const results: NominatimResult[] = await response.json();
    const first = results[0];
    const stateName = first?.address?.state ?? first?.address?.province;

    if (!stateName) {
      return null;
    }

    const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
    return code ?? null;
  } catch {
    return null;
  }
}

export { REGIONS };
