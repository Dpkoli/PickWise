const BLOCKED_PATTERNS = [
  /weapon|firearm|gun|explosive|bomb/i,
  /drug dealer|buy cocaine|buy heroin|illegal drug/i,
  /hack|phishing|malware|ransomware/i,
  /counterfeit|fake passport|fake id/i,
];

const SENSITIVE_PATTERNS = [
  /therapist|psychiatrist|psychologist|mental health|depression|anxiety/i,
  /solicitor|lawyer|legal advice|sue|lawsuit/i,
  /financial adviser|investment|stocks|pension|mortgage/i,
  /doctor|GP|symptom|medication|prescription/i,
];

export function filterQuery(query) {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(query)) {
      return {
        blocked: true,
        message: "We can't help with that search. Please try something else."
      };
    }
  }
  const sensitiveMatch = SENSITIVE_PATTERNS.find(p => p.test(query));
  return {
    blocked: false,
    sensitiveCategory: sensitiveMatch ? detectCategory(query) : null
  };
}

export function detectCategory(query) {
  if (/therapist|mental health|depression|anxiety|doctor|symptom|medication/i.test(query))
    return 'health';
  if (/solicitor|lawyer|legal|sue|lawsuit|contract/i.test(query))
    return 'legal';
  if (/financial adviser|investment|stocks|pension|mortgage|loan/i.test(query))
    return 'financial';
  return null;
}
