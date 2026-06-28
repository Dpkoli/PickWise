import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: 28 June 2026</p>

        <h2>1. Who we are</h2>
        <p>
          Pickwise ("we", "us", "our") operates pickwise.com — an AI-powered recommendation tool. We are committed to protecting your privacy and handling your data transparently.
        </p>

        <h2>2. What data we collect</h2>
        <p><strong>Location data:</strong> Detected via your browser or IP address to show local results. Stored only in your browser's localStorage. Never sent to our servers.</p>
        <p><strong>Search queries:</strong> Sent to the Anthropic API to generate results. We do not log or store your queries on our servers.</p>
        <p><strong>Cookies:</strong> We use cookies for Google AdSense (advertising) and Google Analytics (anonymous usage statistics), subject to your consent. See our Cookie Policy below.</p>
        <p><strong>Affiliate clicks:</strong> Recorded anonymously in your browser's localStorage only. Never associated with personal identity.</p>

        <h2>3. How we use your data</h2>
        <ul>
          <li>To generate location-relevant recommendations</li>
          <li>To serve relevant advertising (AdSense), where you have consented</li>
          <li>To measure anonymous site traffic (Google Analytics), where you have consented</li>
        </ul>
        <p>We do not sell your data. We do not share your data with third parties except as described below.</p>

        <h2>4. Third-party services we use</h2>
        <p><strong>Anthropic API (anthropic.com)</strong> — processes search queries to generate recommendations. See Anthropic's privacy policy at <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">anthropic.com/privacy</a>.</p>
        <p><strong>Google AdSense</strong> — serves advertisements where consent is given. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.</p>
        <p><strong>Google Analytics</strong> — anonymous traffic analytics where consent is given. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.</p>
        <p><strong>ipapi.co</strong> — used as fallback for location detection via IP address. Only your IP is used; no personal data is stored by us.</p>
        <p><strong>Nominatim / OpenStreetMap</strong> — used for reverse geocoding browser geolocation coordinates to city names. No personal data is stored.</p>

        <h2>5. Your rights (UK GDPR / EU GDPR)</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccuracies in your data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> in the UK)</li>
          <li>Data portability</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:privacy@pickwise.com">privacy@pickwise.com</a>.</p>

        <h2>6. Data retention</h2>
        <p>We do not store personal data on our servers. Browser localStorage data (location cache, click logs) remains on your device until you clear your browser data or it expires automatically (location cache expires after 24 hours).</p>

        <h2>7. Cookies</h2>
        <p>We use:</p>
        <ul>
          <li><strong>Essential cookies</strong> — required for basic site function (cookie consent preference)</li>
          <li><strong>Analytics cookies</strong> — Google Analytics (anonymous). Can be declined on first visit.</li>
          <li><strong>Advertising cookies</strong> — Google AdSense. Requires consent in EU/UK. Can be declined on first visit.</li>
        </ul>
        <p>You can change your cookie preference at any time by clearing your browser's localStorage for pickwise.com and revisiting the site.</p>

        <h2>8. Children</h2>
        <p>Pickwise is not directed at children under 13. We do not knowingly collect data from children. If you believe a child has provided us with data, please contact us at <a href="mailto:privacy@pickwise.com">privacy@pickwise.com</a>.</p>

        <h2>9. Changes to this policy</h2>
        <p>We will notify users of material changes by updating the "Last updated" date at the top of this policy. Continued use of Pickwise after changes constitutes acceptance of the updated policy.</p>

        <h2>10. Contact</h2>
        <p>Email: <a href="mailto:privacy@pickwise.com">privacy@pickwise.com</a></p>
      </div>
    </div>
  );
}
