import React from 'react'
import WeatherIcon from './WeatherIcon'
import './CurrentWeather.css'
import { formatDistanceToNow } from 'date-fns'

function CurrentWeather({ data, lastUpdateTime }) {
  if (!data || !data.current) {
    return (
      <div className="glass-panel weather-card">
        <p>No weather data available</p>
      </div>
    )
  }

  const current = data.current
  const location = data.location
  
  // Format the last update time
  const getUpdateTimeDisplay = () => {
    if (!lastUpdateTime) return 'Just now'
    
    const now = new Date()
    const diffMs = now - new Date(lastUpdateTime)
    const diffSec = Math.floor(diffMs / 1000)
    
    if (diffSec < 60) return 'Just now'
    if (diffSec < 120) return '1 min ago'
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`
    return `${Math.floor(diffSec / 3600)} hour ago`
  }

  const getWeatherDescription = (weatherCode) => {
    const descriptions = {
      113: 'Clear sky',
      116: 'Partly cloudy',
      119: 'Cloudy',
      122: 'Overcast',
      143: 'Mist',
      176: 'Patchy rain nearby',
      179: 'Patchy snow nearby',
      182: 'Patchy sleet nearby',
      185: 'Patchy freezing drizzle nearby',
      200: 'Thundery outbreaks',
      227: 'Blizzard',
      230: 'Blizzard',
      248: 'Fog',
      260: 'Freezing fog',
      263: 'Light drizzle',
      266: 'Light drizzle',
      281: 'Freezing drizzle',
      284: 'Heavy freezing drizzle',
      293: 'Light rain shower',
      296: 'Moderate rain shower',
      299: 'Heavy rain shower',
      302: 'Light rain',
      305: 'Moderate rain',
      308: 'Heavy rain',
      311: 'Light sleet',
      314: 'Moderate sleet',
      317: 'Light snow',
      320: 'Moderate snow',
      323: 'Light snow shower',
      326: 'Moderate snow shower',
      329: 'Heavy snow shower',
      332: 'Moderate snow',
      335: 'Heavy snow',
      338: 'Heavy snow',
      350: 'Ice pellets',
      353: 'Light rain shower',
      356: 'Moderate rain shower',
      359: 'Torrential rain shower',
      362: 'Light sleet shower',
      365: 'Moderate sleet shower',
      368: 'Light snow shower',
      371: 'Moderate snow shower',
      374: 'Light sleet shower',
      377: 'Heavy sleet shower',
      386: 'Thundery rain shower',
      389: 'Thundery heavy rain shower',
      392: 'Thundery snow shower',
      395: 'Thundery heavy snow shower'
    }
    return descriptions[weatherCode] || 'Unknown'
  }

  return (
    <div className="current-weather-container">
      <div className="glass-panel main-weather-card">
        <div className="main-weather-layout">
          <div className="weather-left">
            <div className="main-temp-display">
              <span className="main-temperature">{current.temperature}</span>
              <span className="temp-unit">°C</span>
              <span className="weather-unit">| °F</span>
            </div>
            <p className="weather-description">{getWeatherDescription(current.weather_code)}</p>
          </div>

          <div className="weather-center">
            <WeatherIcon weatherCode={current.weather_code} size="xlarge" />
          </div>

          <div className="weather-right">
            <div className="info-item">
              <span className="info-label">Wind</span>
              <span className="info-text">{current.wind_speed} km/h</span>
            </div>
            <div className="info-item">
              <span className="info-label">Humidity</span>
              <span className="info-text">{current.humidity} pct</span>
            </div>
            <div className="info-item">
              <span className="info-label">Visibility</span>
              <span className="info-text">{current.visibility} km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="detail-card glass-panel">
          <div className="detail-icon">Dir</div>
          <div className="detail-content">
            <span className="detail-label">Wind Dir</span>
            <span className="detail-value">{current.wind_dir}</span>
          </div>
        </div>

        <div className="detail-card glass-panel">
          <div className="detail-icon">Pres</div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{current.pressure} mb</span>
          </div>
        </div>

        <div className="detail-card glass-panel">
          <div className="detail-icon">Rain</div>
          <div className="detail-content">
            <span className="detail-label">Precip</span>
            <span className="detail-value">{current.precip} mm</span>
          </div>
        </div>

        <div className="detail-card glass-panel">
          <div className="detail-icon">UV</div>
          <div className="detail-content">
            <span className="detail-label">UV Index</span>
            <span className="detail-value">{current.uv_index}</span>
          </div>
        </div>

        <div className="detail-card glass-panel">
          <div className="detail-icon">Cld</div>
          <div className="detail-content">
            <span className="detail-label">Cloud</span>
            <span className="detail-value">{current.cloudcover} pct</span>
          </div>
        </div>

        <div className="detail-card glass-panel">
          <div className="detail-icon">Feel</div>
          <div className="detail-content">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{current.feelslike}°C</span>
          </div>
        </div>
      </div>

      <div className="update-info">
        <span className="update-time">Updated {getUpdateTimeDisplay()}</span>
        <span className="update-indicator">●</span>
      </div>
    </div>
  )
}

export default CurrentWeather
