export const AFFILIATE_CONFIG = {
  amazon_uk:       "https://amazon.co.uk/s?k={query}&tag=YOURTAG-21",
  amazon_us:       "https://amazon.com/s?k={query}&tag=YOURTAG-20",
  booking:         "https://booking.com/searchresults.html?ss={query}&aid=BOOKAID",
  google_maps:     "https://maps.google.com/?q={query}+near+me",
  google_shopping: "https://www.google.com/search?q={query}&tbm=shop",
  tripadvisor:     "https://tripadvisor.com/Search?q={query}",
  direct:          "https://www.google.com/search?q={query}+official+site+buy",
  brand_website:   "https://www.google.com/search?q={query}+official+site",
  default:         "https://www.google.com/search?q={query}+buy+online"
};

export function buildAffiliateUrl(hint, name, query) {
  const encoded = encodeURIComponent(name || query);
  const template = AFFILIATE_CONFIG[hint] || AFFILIATE_CONFIG.default;
  return template.replace('{query}', encoded);
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
