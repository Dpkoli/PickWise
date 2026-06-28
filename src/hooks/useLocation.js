import { useState, useEffect, useCallback } from 'react';

const LOCATION_KEY = 'pickwise_location';
const CACHE_HOURS = 24;

export default function useLocation() {
  const [location, setLocation] = useState({ city: '', country: '', lat: null, lon: null, loading: true, error: null });

  function saveLocation(loc) {
    try {
      localStorage.setItem(LOCATION_KEY, JSON.stringify({ ...loc, timestamp: Date.now() }));
    } catch (e) {}
    setLocation({ ...loc, loading: false, error: null });
  }

  function setManualLocation(city, country = '') {
    saveLocation({ city, country: country || 'Unknown', lat: null, lon: null });
  }

  const ipFallback = useCallback(async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      saveLocation({ city: data.city || 'Your area', country: data.country_name || '', lat: data.latitude, lon: data.longitude });
    } catch (e) {
      setLocation({ city: 'Your area', country: '', lat: null, lon: null, loading: false, error: 'Location unavailable' });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reverseGeocode = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Your area';
      const country = data.address?.country || '';
      saveLocation({ city, country, lat, lon });
    } catch (e) {
      await ipFallback();
    }
  }, [ipFallback]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCATION_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        const ageHours = (Date.now() - data.timestamp) / (1000 * 60 * 60);
        if (ageHours < CACHE_HOURS && data.city) {
          setLocation({ ...data, loading: false, error: null });
          return;
        }
      }
    } catch (e) {}

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => reverseGeocode(pos.coords.latitude, pos.coords.longitude),
        () => ipFallback(),
        { timeout: 5000 }
      );
    } else {
      ipFallback();
    }
  }, [reverseGeocode, ipFallback]);

  return { ...location, setManualLocation };
}
