import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-container glass-panel">
      <div className="spinner-wrapper">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
        <p className="loading-text">Loading weather data...</p>
        <p className="loading-subtext">Please wait while we fetch the latest information</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
