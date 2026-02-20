import React, { useState } from 'react'
import WeatherIcon from './WeatherIcon'
import './HistoricalWeather.css'

function HistoricalWeather({ data }) {
  const [selectedDate, setSelectedDate] = useState(null)

  if (!data || !data.current) {
    return (
      <div className="glass-panel">
        <p>No historical data available</p>
      </div>
    )
  }

  const current = data.current
  const location = data.location

  // Generate mock historical data for past 7 days
  const getHistoricalDays = () => {
    const days = []
    for (let i = 7; i >= 1; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        temp: Math.round(current.temperature + Math.sin(i) * 5 - Math.random() * 3),
        feelsLike: Math.round(current.feelslike + Math.sin(i) * 4 - Math.random() * 3),
        humidity: Math.round(current.humidity + Math.random() * 20 - 10),
        windSpeed: Math.round(current.wind_speed + Math.random() * 10 - 5),
        precipitation: Math.round(Math.random() * 20),
        weatherCode: [113, 116, 119, 176, 263, 293][Math.floor(Math.random() * 6)]
      })
    }
    return days
  }

  const historicalDays = getHistoricalDays()

  return (
    <div className="historical-weather-container">
      <div className="glass-panel historical-header">
        <h2>📊 Historical Weather Data</h2>
        <p>Last 7 Days for {location.name}, {location.country}</p>
      </div>

      <div className="historical-timeline">
        {historicalDays.map((day, index) => (
          <div
            key={index}
            className={`timeline-card glass-panel ${selectedDate === day.date ? 'selected' : ''}`}
            onClick={() => setSelectedDate(day.date)}
          >
            <div className="timeline-date">{day.displayDate}</div>
            <div className="timeline-icon">
              <WeatherIcon weatherCode={day.weatherCode} size="small" />
            </div>
            <div className="timeline-temp">{day.temp}°C</div>
            <div className="timeline-precip">{day.precipitation}mm</div>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="detailed-historical glass-panel slide-in-up">
          <h3>📅 Detailed Report - {selectedDate}</h3>
          
          <div className="detail-grid">
            {historicalDays
              .filter(day => day.date === selectedDate)
              .map((day, index) => (
                <div key={index}>
                  <div className="detail-item">
                    <span className="detail-label">Temperature</span>
                    <span className="detail-value">{day.temp}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">{day.feelsLike}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{day.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">{day.windSpeed} km/h</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Precipitation</span>
                    <span className="detail-value">{day.precipitation}mm</span>
                  </div>
                </div>
              ))}
          </div>

          <div className="historical-chart">
            <h4>📈 Temperature Trend</h4>
            <div className="trend-visualization">
              {historicalDays.map((day, index) => (
                <div
                  key={index}
                  className="trend-bar"
                  style={{
                    height: `${Math.max(20, (day.temp - 10) * 3)}px`,
                    backgroundColor: day.temp > 20 ? '#orange' : day.temp > 10 ? '#0ea5e9' : '#06b6d4'
                  }}
                  title={`${day.displayDate}: ${day.temp}°C`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="historical-summary glass-panel">
        <h3>📊 Weekly Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Average Temperature</span>
            <span className="summary-value">
              {Math.round(historicalDays.reduce((sum, d) => sum + d.temp, 0) / historicalDays.length)}°C
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Highest Temperature</span>
            <span className="summary-value">{Math.max(...historicalDays.map(d => d.temp))}°C</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Lowest Temperature</span>
            <span className="summary-value">{Math.min(...historicalDays.map(d => d.temp))}°C</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Precipitation</span>
            <span className="summary-value">
              {historicalDays.reduce((sum, d) => sum + d.precipitation, 0)}mm
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average Humidity</span>
            <span className="summary-value">
              {Math.round(historicalDays.reduce((sum, d) => sum + d.humidity, 0) / historicalDays.length)}%
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average Wind Speed</span>
            <span className="summary-value">
              {Math.round(historicalDays.reduce((sum, d) => sum + d.windSpeed, 0) / historicalDays.length)} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricalWeather
