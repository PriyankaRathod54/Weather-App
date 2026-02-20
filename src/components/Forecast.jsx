import React from 'react'
import WeatherIcon from './WeatherIcon'
import './Forecast.css'

function Forecast({ data }) {
  if (!data || !data.current) {
    return (
      <div className="glass-panel">
        <p>No forecast data available</p>
      </div>
    )
  }

  const current = data.current
  const location = data.location

  // Generate mock forecast data for next 5 days
  const getForecastDays = () => {
    const days = []
    for (let i = 1; i <= 5; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        maxTemp: Math.round(current.temperature + Math.sin(i) * 7),
        minTemp: Math.round(current.temperature - Math.sin(i) * 5),
        avgTemp: Math.round(current.temperature + Math.sin(i) * 2),
        humidity: Math.round(current.humidity + Math.random() * 15 - 7),
        windSpeed: Math.round(current.wind_speed + Math.random() * 8 - 4),
        precipitation: Math.round(Math.random() * 40),
        chanceOfRain: Math.round(Math.random() * 80),
        weatherCode: [113, 116, 119, 176, 263, 293, 302][Math.floor(Math.random() * 7)],
        uvIndex: Math.round(Math.random() * 11),
        visibility: Math.round(8 + Math.random() * 4)
      })
    }
    return days
  }

  const forecastDays = getForecastDays()

  return (
    <div className="forecast-container">
      <div className="glass-panel forecast-header">
        <h2>📈 5-Day Weather Forecast</h2>
        <p>Extended outlook for {location.name}, {location.country}</p>
      </div>

      <div className="forecast-cards-container">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-card glass-panel">
            <div className="forecast-date">{day.displayDate}</div>
            
            <div className="forecast-icon">
              <WeatherIcon weatherCode={day.weatherCode} size="medium" />
            </div>

            <div className="forecast-temps">
              <div className="temp-max">
                <span className="temp-label">High</span>
                <span className="temp-value">{day.maxTemp}°</span>
              </div>
              <div className="temp-separator">/</div>
              <div className="temp-min">
                <span className="temp-label">Low</span>
                <span className="temp-value">{day.minTemp}°</span>
              </div>
            </div>

            <div className="forecast-details">
              <div className="detail-row">
                <span className="detail-icon">💧</span>
                <span className="detail-text">{day.chanceOfRain}% rain</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">💨</span>
                <span className="detail-text">{day.windSpeed} km/h</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">💧</span>
                <span className="detail-text">{day.precipitation}mm</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">☀️</span>
                <span className="detail-text">UV: {day.uvIndex}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="forecast-summary glass-panel">
        <h3>🔮 Forecast Summary</h3>
        
        <div className="summary-section">
          <h4>Temperature Range</h4>
          <div className="range-display">
            <div className="range-item">
              <span className="range-label">Highest</span>
              <span className="range-value">{Math.max(...forecastDays.map(d => d.maxTemp))}°C</span>
            </div>
            <div className="range-item">
              <span className="range-label">Lowest</span>
              <span className="range-value">{Math.min(...forecastDays.map(d => d.minTemp))}°C</span>
            </div>
            <div className="range-item">
              <span className="range-label">Average</span>
              <span className="range-value">
                {Math.round(forecastDays.reduce((sum, d) => sum + d.avgTemp, 0) / forecastDays.length)}°C
              </span>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h4>Precipitation Outlook</h4>
          <div className="precip-display">
            <div className="precip-item">
              <span className="precip-label">Total Expected</span>
              <span className="precip-value">
                {forecastDays.reduce((sum, d) => sum + d.precipitation, 0)}mm
              </span>
            </div>
            <div className="precip-item">
              <span className="precip-label">Rainy Days</span>
              <span className="precip-value">
                {forecastDays.filter(d => d.chanceOfRain > 30).length} days
              </span>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h4>Wind Conditions</h4>
          <div className="wind-display">
            <div className="wind-item">
              <span className="wind-label">Average Speed</span>
              <span className="wind-value">
                {Math.round(forecastDays.reduce((sum, d) => sum + d.windSpeed, 0) / forecastDays.length)} km/h
              </span>
            </div>
            <div className="wind-item">
              <span className="wind-label">Max Speed</span>
              <span className="wind-value">
                {Math.max(...forecastDays.map(d => d.windSpeed))} km/h
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast-tips glass-panel">
        <h3>💡 Helpful Tips</h3>
        <ul className="tips-list">
          <li>Pack an umbrella for the next few days</li>
          <li>Temperature will be mild - light jacket recommended</li>
          <li>Good conditions for outdoor activities on {forecastDays[0].displayDate}</li>
          <li>Stay hydrated and use sunscreen if UV index is high</li>
        </ul>
      </div>
    </div>
  )
}

export default Forecast
