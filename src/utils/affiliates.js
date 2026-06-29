export const AFFILIATE_CONFIG = {
  amazon_uk:       "https://www.amazon.co.uk/s?k={query}&tag=YOURTAG-21",
  amazon_us:       "https://www.amazon.com/s?k={query}&tag=YOURTAG-20",
  currys:          "https://www.currys.co.uk/search?q={query}",
  argos:           "https://www.argos.co.uk/search/{query}/",
  john_lewis:      "https://www.johnlewis.com/search?search-term={query}",
  walmart:         "https://www.walmart.com/search?q={query}",
  bestbuy:         "https://www.bestbuy.com/site/searchpage.jsp?st={query}",
  ebay_uk:         "https://www.ebay.co.uk/sch/i.html?_nkw={query}",
  booking:         "https://booking.com/searchresults.html?ss={query}&aid=BOOKAID",
  google_maps:     "https://maps.google.com/?q={query}",
  google_shopping: "https://www.google.com/search?q={query}&tbm=shop",
  direct:          "https://www.google.com/search?q={query}+official+site+buy",
  brand_website:   "https://www.google.com/search?q={query}+official+site",
  tripadvisor:     "https://tripadvisor.com/Search?q={query}",
  default:         "https://www.google.com/search?q={query}+buy+online"
};

export const STORE_LABELS = {
  amazon_uk:       "Amazon UK",
  amazon_us:       "Amazon US",
  currys:          "Currys",
  argos:           "Argos",
  john_lewis:      "John Lewis",
  walmart:         "Walmart",
  bestbuy:         "Best Buy",
  ebay_uk:         "eBay UK",
  google_shopping: "Compare prices",
  direct:          "Brand website",
  brand_website:   "Brand website",
  booking:         "Booking.com",
  google_maps:     "Google Maps",
  tripadvisor:     "TripAdvisor"
};

export function buildAffiliateUrl(hint, name, query) {
  const term = name || query;
  // Amazon: use quoted exact-match search to surface the specific product
  if (hint === 'amazon_uk') {
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
