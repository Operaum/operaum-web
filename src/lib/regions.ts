export const REGIONS = [
  { code: "BC", name: "British Columbia", country: "CA" },
  { code: "AB", name: "Alberta", country: "CA" },
  { code: "SK", name: "Saskatchewan", country: "CA" },
  { code: "MB", name: "Manitoba", country: "CA" },
  { code: "ON", name: "Ontario", country: "CA" },
  { code: "QC", name: "Quebec", country: "CA" },
  { code: "NB", name: "New Brunswick", country: "CA" },
  { code: "NS", name: "Nova Scotia", country: "CA" },
  { code: "PE", name: "Prince Edward Island", country: "CA" },
  { code: "NL", name: "Newfoundland and Labrador", country: "CA" },
  { code: "WA", name: "Washington", country: "US" },
  { code: "OR", name: "Oregon", country: "US" },
  { code: "CA", name: "California", country: "US" },
  { code: "NY", name: "New York", country: "US" },
  { code: "TX", name: "Texas", country: "US" },
  { code: "FL", name: "Florida", country: "US" },
  { code: "IL", name: "Illinois", country: "US" },
  { code: "AZ", name: "Arizona", country: "US" },
];

// City -> region lookup (approximate; a production version would use geocoding).
const CITY_TO_REGION: Record<string, string> = {
  langley: "BC",
  surrey: "BC",
  "white rock": "BC",
  abbotsford: "BC",
  mission: "BC",
  chilliwack: "BC",
  vancouver: "BC",
  burnaby: "BC",
  richmond: "BC",
  coquitlam: "BC",
  calgary: "AB",
  edmonton: "AB",
  toronto: "ON",
  ottawa: "ON",
  mississauga: "ON",
  montreal: "QC",
  seattle: "WA",
  spokane: "WA",
  portland: "OR",
  "los angeles": "CA",
  "san francisco": "CA",
  "san diego": "CA",
};

// Province/state name (and common abbreviation) -> region code.
const NAME_TO_REGION: Record<string, string> = {
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
  newfoundland: "NL",
  washington: "WA",
  oregon: "OR",
  california: "CA",
  "new york": "NY",
  texas: "TX",
  florida: "FL",
  illinois: "IL",
  arizona: "AZ",
};

export function matchRegionFromText(text: string): string | null {
  const lower = text.toLowerCase();

  for (const [name, region] of Object.entries(NAME_TO_REGION)) {
    if (lower.includes(name)) {
      return region;
    }
  }

  for (const [city, region] of Object.entries(CITY_TO_REGION)) {
    if (lower.includes(city)) {
      return region;
    }
  }

  return null;
}
