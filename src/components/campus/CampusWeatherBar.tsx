import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudFog, 
  CloudRain, 
  Snowflake, 
  CloudLightning,
  Car,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface CampusWeatherBarProps {
  isDark: boolean;
}

interface WeatherData {
  temp: number;
  condition: string;
  weatherCode: number;
  isDay: boolean;
}

// Google Weather links
const SEYRANTEPE_WEATHER_URL = 'https://www.google.com/search?q=hava+durumu+Huzur+Mahallesi+Sarıyer+İstanbul';
const CAYIRBASI_WEATHER_URL = 'https://www.google.com/search?q=hava+durumu+Kazım+Karabekir+Paşa+Mahallesi+Sarıyer+İstanbul';

// Google Maps navigation links with verified official hospital destination entities
const SEYRANTEPE_NAV_URL = 'https://www.google.com/maps/dir/?api=1&destination=Seyrantepe+Hamidiye+Etfal+E%C4%9Fitim+ve+Ara%C5%9Ft%C4%B1rma+Hastanesi&travelmode=driving';
const CAYIRBASI_NAV_URL = 'https://www.google.com/maps/dir/?api=1&destination=Sar%C4%B1yer+Hamidiye+Etfal+E%C4%9Fitim+ve+Ara%C5%9Ft%C4%B1rma+Hastanesi+%C3%87ay%C4%B1rba%C5%9F%C4%B1+Ek+Bina&travelmode=driving';
const BETWEEN_CAMPUS_NAV_URL = 'https://www.google.com/maps/dir/?api=1&origin=Seyrantepe+Hamidiye+Etfal+E%C4%9Fitim+ve+Ara%C5%9Ft%C4%B1rma+Hastanesi&destination=Sar%C4%B1yer+Hamidiye+Etfal+E%C4%9Fitim+ve+Ara%C5%9Ft%C4%B1rma+Hastanesi+%C3%87ay%C4%B1rba%C5%9F%C4%B1+Ek+Bina&travelmode=driving';

export const CampusWeatherBar: React.FC<CampusWeatherBarProps> = ({ isDark }) => {
  const [seyrantepeWeather, setSeyrantepeWeather] = useState<WeatherData>({
    temp: 18,
    condition: 'Parçalı Bulutlu',
    weatherCode: 2,
    isDay: true
  });

  const [cayirbasiWeather, setCayirbasiWeather] = useState<WeatherData>({
    temp: 17,
    condition: 'Parçalı Bulutlu',
    weatherCode: 2,
    isDay: true
  });

  // Fetch live weather from Open-Meteo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const resSeyrantepe = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=41.1045&longitude=29.0065&current=temperature_2m,weather_code,is_day&timezone=Europe%2FIstanbul'
        );
        if (resSeyrantepe.ok) {
          const data = await resSeyrantepe.json();
          if (data.current) {
            setSeyrantepeWeather({
              temp: Math.round(data.current.temperature_2m),
              condition: getWeatherConditionText(data.current.weather_code, data.current.is_day === 1),
              weatherCode: data.current.weather_code,
              isDay: data.current.is_day === 1
            });
          }
        }

        const resCayirbasi = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=41.1565&longitude=29.0435&current=temperature_2m,weather_code,is_day&timezone=Europe%2FIstanbul'
        );
        if (resCayirbasi.ok) {
          const data = await resCayirbasi.json();
          if (data.current) {
            setCayirbasiWeather({
              temp: Math.round(data.current.temperature_2m),
              condition: getWeatherConditionText(data.current.weather_code, data.current.is_day === 1),
              weatherCode: data.current.weather_code,
              isDay: data.current.is_day === 1
            });
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0) {
      return isDay ? (
        <Sun className="w-3.5 h-3.5 text-amber-500 animate-[spin_12s_linear_infinite]" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-indigo-400" />
      );
    }

    if (code >= 1 && code <= 3) {
      return (
        <div className="relative w-3.5 h-3.5 shrink-0 flex items-center justify-center">
          {isDay ? (
            <Sun className="w-2 h-2 text-amber-500 absolute top-0 right-0" />
          ) : (
            <Moon className="w-2 h-2 text-indigo-400 absolute top-0 right-0" />
          )}
          <Cloud className="w-3 h-3 text-slate-400 dark:text-slate-300 fill-slate-300/40 dark:fill-slate-600/40 absolute bottom-0 left-0" />
        </div>
      );
    }

    if (code === 45 || code === 48) return <CloudFog className="w-3.5 h-3.5 text-slate-400" />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className="w-3.5 h-3.5 text-sky-400" />;
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return <Snowflake className="w-3.5 h-3.5 text-cyan-300" />;
    if (code >= 95) return <CloudLightning className="w-3.5 h-3.5 text-purple-400" />;
    return <Cloud className="w-3.5 h-3.5 text-slate-400 fill-slate-400/20" />;
  };

  const getWeatherConditionText = (code: number, isDay: boolean): string => {
    if (code === 0) return isDay ? 'Açık' : 'Açık';
    if (code === 1 || code === 2) return 'Parçalı Bulutlu';
    if (code === 3) return 'Çok Bulutlu';
    if (code === 45 || code === 48) return 'Sisli';
    if (code >= 51 && code <= 55) return 'Çisenti';
    if (code >= 61 && code <= 65) return 'Yağmurlu';
    if (code >= 71 && code <= 77) return 'Karlı';
    if (code >= 80 && code <= 82) return 'Sağanak';
    if (code >= 95) return 'Fırtına';
    return 'Bulutlu';
  };

  return (
    <div className={`w-full border-b transition-colors select-none py-1.5 px-3 sm:px-6 ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-slate-50/95 border-slate-200 text-slate-700'
    }`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
        
        {/* Sol Taraf: İki Yerleşkenin Canlı Hava Durumu */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Seyrantepe Hava Durumu */}
          <a
            href={SEYRANTEPE_WEATHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Seyrantepe (Huzur Mah.) Google Hava Durumu"
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 hover:border-teal-500 hover:bg-slate-800' 
                : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-2xs'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-white">Seyrantepe</span>
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-700">
              {renderWeatherIcon(seyrantepeWeather.weatherCode, seyrantepeWeather.isDay)}
              <span className="font-mono font-bold text-slate-900 dark:text-white">{seyrantepeWeather.temp}°C</span>
            </div>
          </a>

          {/* Çayırbaşı Hava Durumu */}
          <a
            href={CAYIRBASI_WEATHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Çayırbaşı (Kazım Karabekirpaşa Mah.) Google Hava Durumu"
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 hover:border-amber-500 hover:bg-slate-800' 
                : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-2xs'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-white">Çayırbaşı</span>
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-700">
              {renderWeatherIcon(cayirbasiWeather.weatherCode, cayirbasiWeather.isDay)}
              <span className="font-mono font-bold text-slate-900 dark:text-white">{cayirbasiWeather.temp}°C</span>
            </div>
          </a>
        </div>

        {/* Sağ Taraf: Tek Tıkla Navigasyon Butonları */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* İki Yerleşke Arası Navigasyon Butonu */}
          <a
            href={BETWEEN_CAMPUS_NAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Seyrantepe ⇄ Çayırbaşı Canlı Google Haritalar Rota Navigasyonu"
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-indigo-400 hover:text-white' 
                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-900 hover:shadow-2xs'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="hidden sm:inline">Yerleşkeler Arası Rota</span>
            <span className="sm:hidden">Rota</span>
          </a>

          {/* Dikey İnce Ayırıcı */}
          <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />

          {/* Seyrantepe Navigasyon Butonu */}
          <a
            href={SEYRANTEPE_NAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Seyrantepe Yerleşkesi'ne Yol Tarifi Başlat"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <Navigation className="w-3 h-3 fill-current" />
            <span>Seyrantepe</span>
          </a>

          {/* Çayırbaşı Navigasyon Butonu */}
          <a
            href={CAYIRBASI_NAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Çayırbaşı Yerleşkesi'ne Yol Tarifi Başlat"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <Navigation className="w-3 h-3 fill-current" />
            <span>Çayırbaşı</span>
          </a>
        </div>

      </div>
    </div>
  );
};
