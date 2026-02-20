import React, { useState, useEffect } from 'react'
import './RateLimitWarning.css'

function RateLimitWarning({ resetTime, onRetry }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, resetTime - Date.now())
      setTimeLeft(Math.ceil(remaining / 1000))

      if (remaining <= 0) {
        clearInterval(interval)
        onRetry()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [resetTime, onRetry])

  return (
    <div className="rate-limit-warning slide-in-up">
      <div className="warning-icon">⏱️</div>
      <div className="warning-content">
        <h3>Rate Limit Reached</h3>
        <p>You've reached the free plan's rate limit. Please wait before making another request.</p>
        <div className="countdown">
          <span className="countdown-label">Time remaining:</span>
          <span className="countdown-timer">{timeLeft}s</span>
        </div>
        <p className="warning-tips">
          💡 <strong>Tips to reduce API calls:</strong>
          <br />
          • Cached results are reused automatically
          • Switch between tabs without searching to view different data
          • Use the same location multiple times (no extra cost)
          • Consider upgrading to a higher tier plan for more requests
        </p>
      </div>
    </div>
  )
}

export default RateLimitWarning
