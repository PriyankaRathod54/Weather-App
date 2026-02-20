/**
 * Mock Weather Data
 * Used as fallback when API is rate limited
 */

export const generateMockWeatherData = (location) => {
  const mockLocations = {
    london: {
      location: {
        name: 'London',
        country: 'United Kingdom',
        region: 'City of London',
        lat: 51.5073,
        lon: -0.1276,
        latitude: 51.5073,
        longitude: -0.1276,
        timezone_id: 'Europe/London',
        localtime_epoch: Math.floor(Date.now() / 1000),
        localtime: new Date().toLocaleString()
      },
      current: {
        temperature: 15,
        feelslike: 13,
        humidity: 72,
        weather_code: 116,
        weather_icons: ['https://assets.weatherstack.com/images/wsymbols01d_png/wsymbol_0002_cloudy.png'],
        weather_descriptions: ['Partly cloudy'],
        wind_speed: 18,
        wind_dir: 'NW',
        pressure: 1013,
        precip: 2.5,
        visibility: 10,
        uv_index: 4,
        cloudcover: 45
      }
    },
    tokyo: {
      location: {
        name: 'Tokyo',
        country: 'Japan',
        region: 'Tokyo',
        lat: 35.6762,
        lon: 139.6503,
        latitude: 35.6762,
        longitude: 139.6503,
        timezone_id: 'Asia/Tokyo',
        localtime_epoch: Math.floor(Date.now() / 1000),
        localtime: new Date().toLocaleString()
      },
      current: {
        temperature: 22,
        feelslike: 21,
        humidity: 65,
        weather_code: 113,
        weather_icons: ['https://assets.weatherstack.com/images/wsymbols01d_png/wsymbol_0001_sunny.png'],
        weather_descriptions: ['Clear sky'],
        wind_speed: 12,
        wind_dir: 'E',
        pressure: 1015,
        precip: 0,
        visibility: 15,
        uv_index: 6,
        cloudcover: 10
      }
    },
    newyork: {
      location: {
        name: 'New York',
        country: 'United States',
        region: 'New York',
        lat: 40.7128,
        lon: -74.0060,
        latitude: 40.7128,
        longitude: -74.0060,
        timezone_id: 'America/New_York',
        localtime_epoch: Math.floor(Date.now() / 1000),
        localtime: new Date().toLocaleString()
      },
      current: {
        temperature: 8,
        feelslike: 5,
        humidity: 55,
        weather_code: 122,
        weather_icons: ['https://assets.weatherstack.com/images/wsymbols01d_png/wsymbol_0004_overcast.png'],
        weather_descriptions: ['Overcast'],
        wind_speed: 22,
        wind_dir: 'NW',
        pressure: 1010,
        precip: 1.2,
        visibility: 12,
        uv_index: 2,
        cloudcover: 80
      }
    },
    sydney: {
      location: {
        name: 'Sydney',
        country: 'Australia',
        region: 'New South Wales',
        lat: -33.8688,
        lon: 151.2093,
        latitude: -33.8688,
        longitude: 151.2093,
        timezone_id: 'Australia/Sydney',
        localtime_epoch: Math.floor(Date.now() / 1000),
        localtime: new Date().toLocaleString()
      },
      current: {
        temperature: 27,
        feelslike: 28,
        humidity: 60,
        weather_code: 116,
        weather_icons: ['https://assets.weatherstack.com/images/wsymbols01d_png/wsymbol_0002_cloudy.png'],
        weather_descriptions: ['Partly cloudy'],
        wind_speed: 15,
        wind_dir: 'S',
        pressure: 1012,
        precip: 0.5,
        visibility: 14,
        uv_index: 8,
        cloudcover: 35
      }
    }
  }

  // Normalize location string
  const normalizedLocation = location.toLowerCase().replace(/\s+/g, '')
  
  // Check for exact match
  for (const key in mockLocations) {
    if (normalizedLocation.includes(key)) {
      return mockLocations[key]
    }
  }

  // Default to London if no match
  return {
    ...mockLocations.london,
    location: {
      ...mockLocations.london.location,
      name: location
    }
  }
}

export const generateMockForecastData = (location) => {
  const baseTemp = 18
  const days = []
  
  for (let i = 0; i < 5; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    days.push({
      date: date.toISOString().split('T')[0],
      maxtemp: baseTemp + Math.random() * 8,
      mintemp: baseTemp - Math.random() * 5,
      avgtemp: baseTemp + Math.random() * 4,
      humidity: 60 + Math.random() * 30,
      wind_speed: 10 + Math.random() * 15,
      total_snow: 0,
      total_rain: Math.random() * 10,
      weather_code: [113, 116, 119, 122, 176][Math.floor(Math.random() * 5)]
    })
  }

  return {
    location: {
      name: location,
      country: 'Unknown',
      timezone_id: 'UTC'
    },
    forecast: days
  }
}

export const generateMockHistoricalData = (location) => {
  const baseTemp = 16
  const days = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    days.push({
      date: date.toISOString().split('T')[0],
      maxtemp: baseTemp + Math.random() * 8,
      mintemp: baseTemp - Math.random() * 5,
      avgtemp: baseTemp + Math.random() * 4,
      humidity: 60 + Math.random() * 30,
      wind_speed: 10 + Math.random() * 15,
      total_snow: 0,
      total_rain: Math.random() * 10,
      weather_code: [113, 116, 119, 122, 176][Math.floor(Math.random() * 5)]
    })
  }

  return {
    location: {
      name: location,
      country: 'Unknown',
      timezone_id: 'UTC'
    },
    forecast: days
  }
}

export const generateMockMarineData = (location) => {
  return {
    location: {
      name: location,
      country: 'Unknown',
      timezone_id: 'UTC'
    },
    current: {
      water_temperature: 18,
      wave_height: 1.5,
      wave_direction: 'NW',
      swell_height: 2.0,
      swell_direction: 'W',
      swell_period: 12,
      wind_speed: 15,
      wind_direction: 'NW',
      visibility: 5000,
      safety_rating: 'Caution',
      uv_index: 5
    }
  }
}
