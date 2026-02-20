import React from 'react'
import './WeatherIcon.css'

function WeatherIcon({ weatherCode, size = 'medium' }) {
  const getWeatherEmoji = (code) => {
    if (code === 113) return '☀️' // Clear
    if (code === 116) return '⛅' // Partly cloudy
    if (code >= 119 && code <= 122) return '☁️' // Cloudy
    if (code >= 143 && code <= 260) return '🌫️' // Fog/Mist
    if (code >= 263 && code <= 299) return '🌧️' // Drizzle/Light rain
    if (code >= 302 && code <= 311) return '🌧️' // Moderate/Heavy rain
    if (code >= 314 && code <= 329) return '❄️' // Sleet/Snow
    if (code >= 332 && code <= 338) return '❄️' // Heavy snow
    if (code >= 350 && code <= 377) return '🌨️' // Ice/Sleet showers
    if (code >= 386 && code <= 395) return '⛈️' // Thunderstorms
    return '🌤️' // Default
  }

  const sizeClasses = {
    small: 'weather-icon-small',
    medium: 'weather-icon-medium',
    large: 'weather-icon-large',
    xlarge: 'weather-icon-xlarge'
  }

  return (
    <div className={`weather-icon ${sizeClasses[size]}`}>
      {getWeatherEmoji(weatherCode)}
    </div>
  )
}

export default WeatherIcon
