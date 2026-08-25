'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog, Loader2 } from 'lucide-react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  code: number;
  location: string;
}

const weatherIcons: Record<number, React.ElementType> = {
  0: Sun,
  1: Sun,
  2: Cloud,
  3: Cloud,
  45: CloudFog,
  48: CloudFog,
  51: CloudDrizzle,
  53: CloudDrizzle,
  55: CloudDrizzle,
  61: CloudRain,
  63: CloudRain,
  65: CloudRain,
  71: CloudSnow,
  73: CloudSnow,
  75: CloudSnow,
  80: CloudRain,
  81: CloudRain,
  82: CloudRain,
  95: CloudLightning,
  96: CloudLightning,
  99: CloudLightning,
};



const DEFAULT_LOCATION = { lat: 6.5244, lon: 3.3792, city: 'Lagos' };

// Resolve the visitor's city + coordinates without a reverse-geocode service.
// ipapi.co returns `city` directly; ipwho.is is a CORS-friendly fallback.
// (Nominatim is intentionally avoided — it blocks browser requests that can't
// set a User-Agent header, which previously left location as "Unknown".)
async function fetchLocation(): Promise<{ lat: number; lon: number; city: string }> {
  const tryProvider = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    if (d.error) throw new Error(String(d.error));
    const lat = Number(d.latitude ?? d.lat);
    const lon = Number(d.longitude ?? d.lon);
    const city = d.city || d.region || DEFAULT_LOCATION.city;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error('no coords');
    return { lat, lon, city };
  };

  try {
    return await tryProvider('https://ipapi.co/json/');
  } catch {
    try {
      return await tryProvider('https://ipwho.is/');
    } catch {
      return DEFAULT_LOCATION;
    }
  }
}

export default function WeatherWidget() {
  const reduceMotion = useReducedMotion();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchWeather() {
      try {
        const loc = await fetchLocation();
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=auto`,
        );
        const data = await weatherRes.json();

        if (!mounted) return;

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          code: data.current.weather_code,
          location: loc.city,
        });
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchWeather();
    return () => { mounted = false; };
  }, []);

  if (error || (!loading && !weather)) return null;

  const WeatherIcon = weather ? (weatherIcons[weather.code] || Cloud) : Cloud;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] flex items-center justify-center h-[calc(var(--weather-bar-h)+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] border-b border-border/40 bg-background/80 backdrop-blur-sm"
    >
      {loading ? (
        <Loader2 className="w-3 h-3 text-foreground-subtle animate-spin" />
      ) : weather ? (
        <div className="flex items-center gap-4 text-[11px] text-foreground-subtle font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-accent" />
            {weather.location}
          </span>
          <span className="flex items-center gap-1.5">
            <WeatherIcon className="w-3.5 h-3.5 text-accent" />
            {weather.temp}°C
          </span>
          <span className="hidden sm:inline text-foreground-subtle/60">
            Feels like {weather.feelsLike}°C
          </span>
          <span className="hidden sm:inline text-foreground-subtle/60" />
        </div>
      ) : null}
    </motion.div>
  );
}