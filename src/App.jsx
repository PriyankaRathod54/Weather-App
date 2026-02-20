import React, { useState, useCallback, useRef } from 'react'
import API_CONFIG from './config/apiConfig'
import { debounceWithCancel } from './utils/debounce'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HistoricalWeather from './components/HistoricalWeather'
import Forecast from './components/Forecast'
import MarineWeather from './components/MarineWeather'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('current')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentLocation, setCurrentLocation] = useState('London')
  const [weatherData, setWeatherData] = useState(null)
  const [historicalData, setHistoricalData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [marineData, setMarineData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [rateLimited, setRateLimited] = useState(false)
  const [cacheInfo, setCacheInfo] = useState(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(10) // minutes
  const [lastUpdateTime, setLastUpdateTime] = useState(null)

  // Detect user's current location using multiple methods
  const detectUserLocation = useCallback(async () => {
    // Method 1: Try browser Geolocation API
    const tryBrowserGeolocation = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null)
          return
        }

        const timeout = setTimeout(() => {
          resolve(null) // Timeout after 5 seconds
        }, 5000)

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            clearTimeout(timeout)
            const { latitude, longitude } = position.coords
            try {
              // Reverse geocode to get location name
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              )
              const data = await response.json()
              
              const city = data.address?.city || 
                          data.address?.county || 
                          data.address?.state || 
                          data.name || 
                          'Current Location'
              
              resolve({ city, latitude, longitude, method: 'browser' })
            } catch (err) {
              console.log('Reverse geocoding error:', err)
              resolve({ city: 'Current Location', latitude, longitude, method: 'browser' })
            }
          },
          (error) => {
            clearTimeout(timeout)
            console.log('Browser geolocation error:', error)
            resolve(null)
          },
          { 
            timeout: 5000,
            enableHighAccuracy: false
          }
        )
      })
    }

    // Method 2: IP-based geolocation (no permission needed)
    const tryIPGeolocation = async () => {
      try {
        // Using ip-api.com (free tier, no API key required)
        const response = await fetch('https://ip-api.com/json/?fields=city,lat,lon')
        const data = await response.json()
        
        if (data.city && data.lat && data.lon) {
          return { 
            city: data.city, 
            latitude: data.lat, 
            longitude: data.lon, 
            method: 'ip' 
          }
        }
        return null
      } catch (err) {
        console.log('IP geolocation error:', err)
        return null
      }
    }

    try {
      // Try browser geolocation first
      let location = await tryBrowserGeolocation()
      
      if (location) {
        console.log('Location detected via browser geolocation:', location)
        return location
      }

      // Fallback to IP-based geolocation
      location = await tryIPGeolocation()
      
      if (location) {
        console.log('Location detected via IP geolocation:', location)
        return location
      }

      // Final fallback to London
      console.log('Location detection failed, using London as default')
      return { 
        city: 'London', 
        latitude: 51.5073, 
        longitude: -0.1276, 
        method: 'default' 
      }
    } catch (err) {
      console.log('Location detection error:', err)
      return { 
        city: 'London', 
        latitude: 51.5073, 
        longitude: -0.1276, 
        method: 'default' 
      }
    }
  }, [])

  // Fetch current weather with automatic fallback to mock data
  const fetchCurrentWeather = useCallback(async (location) => {
    setLoading(true)
    setError(null)
    setCacheInfo(null)
    setUsingMockData(false)
    const updateTime = new Date()
    
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?access_key=${API_CONFIG.API_KEY}&query=${location}`
      )
      const data = await response.json()
      
      if (data.error) {
        setError(`API Error: ${data.error.info}`)
        setRateLimited(data.error.code === 104)
        setLoading(false)
        return
      }
      
      if (!response.ok) {
        setError('Failed to fetch weather data')
        setLoading(false)
        return
      }
      
      // Success - use real API data
      setWeatherData(data)
      setCurrentLocation(location)
      setRateLimited(false)
      setUsingMockData(false)
      setLastUpdateTime(updateTime)
    } catch (err) {
      setError(`Network error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch forecast with automatic fallback to mock data
  const fetchForecast = useCallback(async (location) => {
    setLoading(true)
    setError(null)
    setCacheInfo(null)
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?access_key=${API_CONFIG.API_KEY}&query=${location}&forecast=1`
      )
      const data = await response.json()

      if (data.error) {
        setError(`API Error: ${data.error.info || 'Failed to fetch forecast'}`)
        setRateLimited(data.error.code === 104)
        setLoading(false)
        return
      }

      if (!response.ok) {
        setError('Failed to fetch forecast data')
        setLoading(false)
        return
      }

      setForecastData(data)
      setRateLimited(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch historical weather with automatic fallback to mock data
  const fetchHistoricalWeather = useCallback(async (location) => {
    setLoading(true)
    setError(null)
    setCacheInfo(null)
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?access_key=${API_CONFIG.API_KEY}&query=${location}&historical_data=1`
      )
      const data = await response.json()

      if (data.error) {
        setError(`API Error: ${data.error.info || 'Failed to fetch historical data'}`)
        setRateLimited(data.error.code === 104)
        setLoading(false)
        return
      }

      if (!response.ok) {
        setError('Failed to fetch historical data')
        setLoading(false)
        return
      }

      setHistoricalData(data)
      setRateLimited(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch marine weather with automatic fallback to mock data
  const fetchMarineWeather = useCallback(async (location) => {
    setLoading(true)
    setError(null)
    setCacheInfo(null)
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?access_key=${API_CONFIG.API_KEY}&query=${location}&forecast=1`
      )
      const data = await response.json()

      if (data.error) {
        setError(`API Error: ${data.error.info || 'Failed to fetch marine data'}`)
        setRateLimited(data.error.code === 104)
        setLoading(false)
        return
      }

      if (!response.ok) {
        setError('Failed to fetch marine data')
        setLoading(false)
        return
      }

      setMarineData(data)
      setRateLimited(false)
    } finally {
      setLoading(false)
    }
  }, [])
  // Debounced search to prevent rapid API calls
  const debouncedSearch = useRef(null)

  // Handle search with debouncing
  const handleSearch = useCallback((location) => {
    if (location.trim()) {
      setSearchQuery(location)
      
      // Cancel previous request
      if (debouncedSearch.current) {
        debouncedSearch.current.cancel()
      }

      // Create debounced search function
      debouncedSearch.current = debounceWithCancel(() => {
        if (activeTab === 'current') {
          fetchCurrentWeather(location)
        } else if (activeTab === 'historical') {
          fetchHistoricalWeather(location)
        } else if (activeTab === 'forecast') {
          fetchForecast(location)
        } else if (activeTab === 'marine') {
          fetchMarineWeather(location)
        }
        setSuggestions([])
      }, 500) // Reduced debounce time

      debouncedSearch.current()
    }
  }, [activeTab, fetchCurrentWeather, fetchHistoricalWeather, fetchForecast, fetchMarineWeather])

  // Handle location search for suggestions
  const handleLocationSearch = (query) => {
    if (query.length > 2) {
      const mockSuggestions = [
        'London, UK',
        'Los Angeles, USA',
        'New York, USA',
        'Tokyo, Japan',
        'Sydney, Australia',
        'Paris, France',
        'Dubai, UAE',
        'Singapore',
      ].filter(s => s.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(mockSuggestions)
    } else {
      setSuggestions([])
    }
  }

  // Handle tab change
  const handleTabChange = async (tabName) => {
    setActiveTab(tabName)
    if (currentLocation && currentLocation.trim()) {
      switch(tabName) {
        case 'current':
          fetchCurrentWeather(currentLocation)
          break
        case 'historical':
          fetchHistoricalWeather(currentLocation)
          break
        case 'forecast':
          fetchForecast(currentLocation)
          break
        case 'marine':
          fetchMarineWeather(currentLocation)
          break
        default:
          break
      }
    }
  }

  // Load initial weather on mount
  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        // Detect user's current location
        const locationData = await detectUserLocation()
        setCurrentLocation(locationData.city)
        
        // Fetch weather for the detected location
        fetchCurrentWeather(locationData.city)
      } catch (err) {
        // Fallback to London if detection fails
        fetchCurrentWeather('London')
      }
    }
    
    initializeApp()
  }, [detectUserLocation, fetchCurrentWeather])
  // Real-time clock update - updates every second
  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(clockInterval)
  }, [])

  // Auto-refresh weather data every 10 minutes
  React.useEffect(() => {
    if (!currentLocation) return

    const refreshWeather = () => {
      console.log(`Auto-refreshing weather for ${currentLocation}`)
      
      // Refresh based on active tab
      switch(activeTab) {
        case 'current':
          fetchCurrentWeather(currentLocation)
          break
        case 'forecast':
          fetchForecast(currentLocation)
          break
        case 'historical':
          fetchHistoricalWeather(currentLocation)
          break
        case 'marine':
          fetchMarineWeather(currentLocation)
          break
        default:
          fetchCurrentWeather(currentLocation)
      }
    }

    // Set initial refresh timer
    const autoRefreshTimer = setInterval(
      refreshWeather, 
      autoRefreshInterval * 60 * 1000 // Convert minutes to milliseconds
    )

    return () => clearInterval(autoRefreshTimer)
  }, [currentLocation, activeTab, autoRefreshInterval, fetchCurrentWeather, fetchForecast, fetchHistoricalWeather, fetchMarineWeather])

  // Monitor location changes and update weather
  React.useEffect(() => {
    if (!currentLocation) return

    const watchLocationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            // Check if location changed significantly (more than 1km)
            const currentWeatherLat = weatherData?.location?.latitude
            const currentWeatherLon = weatherData?.location?.longitude

            if (currentWeatherLat && currentWeatherLon) {
              const distance = calculateDistance(
                latitude, 
                longitude, 
                currentWeatherLat, 
                currentWeatherLon
              )

              if (distance > 1) { // Location changed more than 1km
                console.log(`Location changed. Distance: ${distance.toFixed(2)}km`)
                // Reverse geocode and update
                try {
                  const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                  )
                  const data = await response.json()
                  const newCity = data.address?.city || data.address?.county || data.name
                  
                  if (newCity && newCity !== currentLocation) {
                    console.log(`Location updated to: ${newCity}`)
                    setCurrentLocation(newCity)
                    fetchCurrentWeather(newCity)
                  }
                } catch (err) {
                  console.log('Error updating location:', err)
                }
              }
            }
          },
          (error) => {
            console.log('Location watch error:', error)
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        )
      }
    }, 30000) // Check location every 30 seconds

    return () => clearInterval(watchLocationInterval)
  }, [currentLocation, weatherData?.location?.latitude, weatherData?.location?.longitude, fetchCurrentWeather])

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-layout">
          <div className="location-datetime">
            {weatherData?.location && (
              <>
                <div className="location-header-row">
                  <h1 className="location-name-header">{weatherData.location.name}</h1>
                  <button 
                    className="location-detect-btn"
                    onClick={() => {
                      setLoading(true)
                      detectUserLocation().then((location) => {
                        setCurrentLocation(location.city)
                        fetchCurrentWeather(location.city)
                      })
                    }}
                    title="Detect your current location"
                  >
                    📍
                  </button>
                </div>
                <p className="datetime-info">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </>
            )}
          </div>
          <div className="search-section">
            <SearchBar 
              onSearch={handleSearch}
              onInputChange={handleLocationSearch}
              suggestions={suggestions}
              onSuggestionSelect={(suggestion) => handleSearch(suggestion.split(',')[0])}
            />
          </div>
        </div>
      </header>

      <main className="app-main">

        {error && !usingMockData && <ErrorMessage message={error} />}

        {cacheInfo && (
          <div className="cache-info-banner">
            <span className="cache-icon">💾</span>
            <span>{cacheInfo}</span>
          </div>
        )}

        <div className="tabs-container glass-panel">
          <div className="tabs">
            <button 
              className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => handleTabChange('current')}
            >
              <span className="tab-icon">🌡️</span> Current
            </button>
            <button 
              className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
              onClick={() => handleTabChange('forecast')}
            >
              <span className="tab-icon">📈</span> Forecast
            </button>
            <button 
              className={`tab-button ${activeTab === 'historical' ? 'active' : ''}`}
              onClick={() => handleTabChange('historical')}
            >
              <span className="tab-icon">📊</span> Historical
            </button>
            <button 
              className={`tab-button ${activeTab === 'marine' ? 'active' : ''}`}
              onClick={() => handleTabChange('marine')}
            >
              <span className="tab-icon">🌊</span> Marine
            </button>
          </div>
        </div>

        <div className="content-container">
          {loading && <LoadingSpinner />}
          
          {!loading && (
            <>
              {activeTab === 'current' && weatherData && (
                <CurrentWeather data={weatherData} lastUpdateTime={lastUpdateTime} />
              )}
              {activeTab === 'forecast' && forecastData && (
                <Forecast data={forecastData} />
              )}
              {activeTab === 'historical' && historicalData && (
                <HistoricalWeather data={historicalData} />
              )}
              {activeTab === 'marine' && marineData && (
                <MarineWeather data={marineData} />
              )}
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Weather data powered by <strong>weatherstack API</strong></p>
        <p className="footer-credit">© 2026 Weather Master. Professional Weather Insights.</p>
      </footer>
    </div>
  )
}

export default App
