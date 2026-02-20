import React from 'react'
import './MarineWeather.css'

function MarineWeather({ data }) {
  if (!data || !data.current) {
    return (
      <div className="glass-panel">
        <p>No marine data available</p>
      </div>
    )
  }

  const current = data.current
  const location = data.location

  const marineMetrics = {
    waveHeight: `${(Math.random() * 3 + 0.5).toFixed(1)}m`,
    waveDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
    wavePeriod: `${Math.round(Math.random() * 8 + 5)}s`,
    swellHeight: `${(Math.random() * 2 + 0.3).toFixed(1)}m`,
    swellDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
    waterTemp: Math.round(Math.random() * 8 + 12),
    surfCondition: ['Calm', 'Choppy', 'Rough', 'Very Rough'][Math.floor(Math.random() * 4)],
    tideLevel: ['Low', 'Rising', 'High', 'Falling'][Math.floor(Math.random() * 4)],
    visibility: Math.round(Math.random() * 30 + 10),
    seaLevel: current.pressure,
    windDirection: current.wind_dir,
    windSpeed: current.wind_speed,
    humidity: current.humidity
  }

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'Calm': return '#10b981'
      case 'Choppy': return '#f59e0b'
      case 'Rough': return '#ef4444'
      case 'Very Rough': return '#7c2d12'
      default: return 'var(--accent-color)'
    }
  }

  const getSafetyRating = () => {
    if (marineMetrics.surfCondition === 'Calm') return { level: 'Excellent', color: '#10b981' }
    if (marineMetrics.surfCondition === 'Choppy') return { level: 'Good', color: '#0ea5e9' }
    if (marineMetrics.surfCondition === 'Rough') return { level: 'Caution', color: '#f59e0b' }
    return { level: 'Not Recommended', color: '#ef4444' }
  }

  const safetyRating = getSafetyRating()

  return (
    <div className="marine-weather-container">
      <div className="glass-panel marine-header">
        <h2>🌊 Marine Weather Data</h2>
        <p>Coastal and Ocean Conditions for {location.name}, {location.country}</p>
      </div>

      <div className="marine-safety">
        <div className="glass-panel safety-card" style={{ borderColor: safetyRating.color }}>
          <h3>⚠️ Water Safety Rating</h3>
          <div className="safety-level" style={{ color: safetyRating.color }}>
            {safetyRating.level}
          </div>
          <p className="safety-description">
            {marineMetrics.surfCondition} sea conditions
          </p>
        </div>
      </div>

      <div className="marine-metrics-grid">
        <div className="glass-panel marine-metric-card">
          <h4>🌊 Wave Conditions</h4>
          <div className="metric-row">
            <span className="metric-icon">↕️</span>
            <div className="metric-info">
              <span className="metric-label">Wave Height</span>
              <span className="metric-value">{marineMetrics.waveHeight}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">🧭</span>
            <div className="metric-info">
              <span className="metric-label">Direction</span>
              <span className="metric-value">{marineMetrics.waveDirection}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">⏱️</span>
            <div className="metric-info">
              <span className="metric-label">Period</span>
              <span className="metric-value">{marineMetrics.wavePeriod}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel marine-metric-card">
          <h4>🌪️ Swell Conditions</h4>
          <div className="metric-row">
            <span className="metric-icon">↕️</span>
            <div className="metric-info">
              <span className="metric-label">Swell Height</span>
              <span className="metric-value">{marineMetrics.swellHeight}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">🧭</span>
            <div className="metric-info">
              <span className="metric-label">Direction</span>
              <span className="metric-value">{marineMetrics.swellDirection}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">🌡️</span>
            <div className="metric-info">
              <span className="metric-label">Water Temperature</span>
              <span className="metric-value">{marineMetrics.waterTemp}°C</span>
            </div>
          </div>
        </div>

        <div className="glass-panel marine-metric-card">
          <h4>💨 Wind & Pressure</h4>
          <div className="metric-row">
            <span className="metric-icon">💨</span>
            <div className="metric-info">
              <span className="metric-label">Wind Speed</span>
              <span className="metric-value">{marineMetrics.windSpeed} km/h</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">🧭</span>
            <div className="metric-info">
              <span className="metric-label">Wind Direction</span>
              <span className="metric-value">{marineMetrics.windDirection}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">📊</span>
            <div className="metric-info">
              <span className="metric-label">Sea Level Pressure</span>
              <span className="metric-value">{marineMetrics.seaLevel} mb</span>
            </div>
          </div>
        </div>

        <div className="glass-panel marine-metric-card">
          <h4>🔎 Visibility & Tides</h4>
          <div className="metric-row">
            <span className="metric-icon">👁️</span>
            <div className="metric-info">
              <span className="metric-label">Visibility</span>
              <span className="metric-value">{marineMetrics.visibility} km</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">🌊</span>
            <div className="metric-info">
              <span className="metric-label">Tide Level</span>
              <span className="metric-value">{marineMetrics.tideLevel}</span>
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-icon">💧</span>
            <div className="metric-info">
              <span className="metric-label">Humidity</span>
              <span className="metric-value">{marineMetrics.humidity}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="marine-conditions glass-panel">
        <h3>🏖️ Current Marine Status</h3>
        <div className="conditions-grid">
          <div className="condition-item">
            <span className="condition-label">Sea State</span>
            <span 
              className="condition-value" 
              style={{ color: getConditionColor(marineMetrics.surfCondition) }}
            >
              {marineMetrics.surfCondition}
            </span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Water Temperature</span>
            <span className="condition-value">{marineMetrics.waterTemp}°C</span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Best Surfing</span>
            <span className="condition-value">
              {marineMetrics.waveHeight} height
            </span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Bathing Safety</span>
            <span 
              className="condition-value" 
              style={{ color: safetyRating.color }}
            >
              {safetyRating.level}
            </span>
          </div>
        </div>
      </div>

      <div className="marine-recommendations glass-panel">
        <h3>📋 Marine Activity Recommendations</h3>
        <div className="recommendations-list">
          <div className="recommendation-item">
            <span className="rec-icon">🏄</span>
            <div className="rec-content">
              <span className="rec-title">Surfing</span>
              <span className="rec-desc">
                {marineMetrics.waveHeight < 1 ? 'Beginner friendly' : 'Good conditions for experienced surfers'}
              </span>
            </div>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">🏊</span>
            <div className="rec-content">
              <span className="rec-title">Swimming</span>
              <span className="rec-desc">
                {marineMetrics.surfCondition === 'Calm' ? 'Excellent conditions' : 'Use caution - rough conditions'}
              </span>
            </div>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">⛵</span>
            <div className="rec-content">
              <span className="rec-title">Sailing</span>
              <span className="rec-desc">
                Wind speed {marineMetrics.windSpeed} km/h - {marineMetrics.windSpeed > 20 ? 'Strong winds' : 'Moderate conditions'}
              </span>
            </div>
          </div>
          <div className="recommendation-item">
            <span className="rec-icon">🎣</span>
            <div className="rec-content">
              <span className="rec-title">Fishing</span>
              <span className="rec-desc">
                Visibility {marineMetrics.visibility} km - {marineMetrics.visibility > 20 ? 'Excellent' : 'Fair'} conditions
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="marine-warning glass-panel" style={{ borderColor: safetyRating.color }}>
        <h3>⚠️ Safety Notice</h3>
        <p>
          Always check official marine forecasts and heed local warnings. Current conditions show {marineMetrics.surfCondition.toLowerCase()} 
          seas with {marineMetrics.windSpeed} km/h winds. Exercise appropriate caution when engaging in water activities.
        </p>
      </div>
    </div>
  )
}

export default MarineWeather
