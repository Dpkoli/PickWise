export const AFFILIATE_CONFIG = {
  amazon_uk:        "https://www.amazon.co.uk/s?k={query}&tag=YOURTAG-21",
  amazon_us:        "https://www.amazon.com/s?k={query}&tag=YOURTAG-20",
  amazon_books:     "https://www.amazon.co.uk/s?k={query}&i=stripbooks&tag=YOURTAG-21",
  google_shopping:  "https://www.google.com/search?q={query}&tbm=shop",
  tripadvisor:      "https://www.tripadvisor.co.uk/Search?q={query}",
  booking:          "https://www.booking.com/searchresults.html?ss={query}&aid=BOOKAID",
  viator:           "https://www.viator.com/searchResults/all?text={query}",
  skyscanner:       "https://www.skyscanner.net/transport/flights/?query={query}",
  udemy:            "https://www.udemy.com/courses/search/?q={query}",
  coursera:         "https://www.coursera.org/search?query={query}",
  moneysupermarket: "https://www.moneysupermarket.com/",
  google_maps:      "https://maps.google.com/?q={query}",
  direct:           "https://www.google.com/search?q={query}+official+site+buy",
  brand_website:    "https://www.google.com/search?q={query}+official+site",
  default:          "https://www.google.com/search?q={query}+buy+online"
};

export const STORE_LABELS = {
  amazon_uk:        "Amazon UK",
  amazon_us:        "Amazon US",
  amazon_books:     "Amazon Books",
  google_shopping:  "Compare prices",
  tripadvisor:      "TripAdvisor",
  booking:          "Booking.com",
  viator:           "Viator",
  skyscanner:       "Skyscanner",
  udemy:            "Udemy",
  coursera:         "Coursera",
  moneysupermarket: "MoneySuperMarket",
  google_maps:      "Google Maps",
  direct:           "Official site",
  brand_website:    "Official site"
};

// CTA label shown on the button when ctaText isn't set
export const DEFAULT_CTA = {
  amazon_uk:        "Buy on Amazon",
  amazon_us:        "Buy on Amazon",
  amazon_books:     "Buy on Amazon",
  google_shopping:  "Find best price",
  tripadvisor:      "See reviews",
  booking:          "Book now",
  viator:           "Book experience",
  skyscanner:       "Search flights",
  udemy:            "View course",
  coursera:         "View course",
  moneysupermarket: "Compare",
  google_maps:      "Get directions",
  direct:           "Visit site",
  brand_website:    "Visit site",
  default:          "View →"
};

export function buildAffiliateUrl(hint, name, query) {
  const term = name || query;
  // Amazon: quoted exact-match search for better product accuracy
  if (hint === 'amazon_uk' || hint === 'amazon_books') {
    return `https://www.amazon.co.uk/s?k=${encodeURIComponent(`"${term}"`)}&tag=YOURTAG-21`;
  }
  if (hint === 'amazon_us') {
    return `https://www.amazon.com/s?k=${encodeURIComponent(`"${term}"`)}&tag=YOURTAG-20`;
  }
  const encoded = encodeURIComponent(term);
  const template = AFFILIATE_CONFIG[hint] || AFFILIATE_CONFIG.default;
  return template.replace('{query}', encoded);
}

export function buildMapsUrl(mapsQuery) {
  return `https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`;
}

export function logClick({ rank, type, name, category, query }) {
  try {
    const log = JSON.parse(localStorage.getItem('pickwise_clicks') || '[]');
    log.push({ rank, type, name, category, query, ts: Date.now() });
    localStorage.setItem('pickwise_clicks', JSON.stringify(log.slice(-200)));
  } catch (e) {
    // localStorage may be unavailable
  }
}
