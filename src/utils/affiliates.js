// All URLs use {query} as placeholder — replaced with the exact product/service name.
// Replace the capitalised placeholders (YOURTAG-21 etc.) with your real affiliate IDs
// once you join each programme.

export const AFFILIATE_CONFIG = {
  // Amazon — Amazon Associates (affiliate-program.amazon.co.uk / amazon.com)
  amazon_uk:   (q) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(`"${q}"`)}&tag=YOURTAG-21`,
  amazon_us:   (q) => `https://www.amazon.com/s?k=${encodeURIComponent(`"${q}"`)}&tag=YOURTAG-20`,

  // UK retailers — all available via Awin (awin.com) once approved
  currys:      (q) => `https://www.currys.co.uk/search?q=${encodeURIComponent(q)}`,
  argos:       (q) => `https://www.argos.co.uk/search/${encodeURIComponent(q)}/`,
  john_lewis:  (q) => `https://www.johnlewis.com/search?search-term=${encodeURIComponent(q)}`,
  boots:       (q) => `https://www.boots.com/search?q=${encodeURIComponent(q)}`,
  asos:        (q) => `https://www.asos.com/search/?q=${encodeURIComponent(q)}`,
  ebay_uk:     (q) => `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(`"${q}"`)}`,

  // US retailers
  walmart:     (q) => `https://www.walmart.com/search?q=${encodeURIComponent(q)}`,
  bestbuy:     (q) => `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(q)}`,
  target:      (q) => `https://www.target.com/s?searchTerm=${encodeURIComponent(q)}`,

  // Travel & experiences
  booking:     (q) => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(q)}&aid=BOOKAID`,
  tripadvisor: (q) => `https://www.tripadvisor.co.uk/Search?q=${encodeURIComponent(q)}`,
  viator:      (q) => `https://www.viator.com/searchResults/all?text=${encodeURIComponent(q)}`,
  // Skyscanner needs airport codes for deep links — use Google Flights which handles natural language
  skyscanner:  (q) => `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`,

  // Learning
  udemy:       (q) => `https://www.udemy.com/courses/search/?q=${encodeURIComponent(q)}`,
  coursera:    (q) => `https://www.coursera.org/search?query=${encodeURIComponent(q)}`,

  // Local services
  google_maps: (q) => `https://maps.google.com/?q=${encodeURIComponent(q)}`,

  // Fallback — Amazon UK search
  default:     (q) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=YOURTAG-21`,
};

export const RETAILER_LABELS = {
  amazon_uk:   'Amazon UK',
  amazon_us:   'Amazon US',
  currys:      'Currys',
  argos:       'Argos',
  john_lewis:  'John Lewis',
  boots:       'Boots',
  asos:        'ASOS',
  ebay_uk:     'eBay',
  walmart:     'Walmart',
  bestbuy:     'Best Buy',
  target:      'Target',
  booking:     'Booking.com',
  tripadvisor: 'TripAdvisor',
  viator:      'Viator',
  skyscanner:  'Skyscanner',
  udemy:       'Udemy',
  coursera:    'Coursera',
  google_maps: 'Google Maps',
};

export const CTA_LABELS = {
  amazon_uk:   'Buy on Amazon',
  amazon_us:   'Buy on Amazon',
  currys:      'Buy at Currys',
  argos:       'Buy at Argos',
  john_lewis:  'Buy at John Lewis',
  boots:       'Buy at Boots',
  asos:        'Shop on ASOS',
  ebay_uk:     'Buy on eBay',
  walmart:     'Buy at Walmart',
  bestbuy:     'Buy at Best Buy',
  target:      'Buy at Target',
  booking:     'Book on Booking.com',
  tripadvisor: 'See on TripAdvisor',
  viator:      'Book on Viator',
  skyscanner:  'Search on Skyscanner',
  udemy:       'View on Udemy',
  coursera:    'View on Coursera',
  google_maps: 'Get directions',
  default:     'View →',
};

// For travel hints, the original search query (e.g. "flights to Kathmandu")
// is more useful than the result name (e.g. "Turkish Airlines")
const USE_ORIGINAL_QUERY = new Set(['skyscanner', 'booking', 'viator']);

export function buildAffiliateUrl(hint, name, query) {
  const term = USE_ORIGINAL_QUERY.has(hint) ? (query || name) : (name || query);
  const builder = AFFILIATE_CONFIG[hint] || AFFILIATE_CONFIG.default;
  return builder(term);
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
