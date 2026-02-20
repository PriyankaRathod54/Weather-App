import React from 'react'
import './ErrorMessage.css'

function ErrorMessage({ message }) {
  const isRateLimit = message.includes('Rate limit') || message.includes('rate')
  const isNetworkError = message.includes('fetch') || message.includes('network')
  
  return (
    <div className={`error-container slide-in-up ${isRateLimit ? 'rate-limit' : isNetworkError ? 'network' : ''}`}>
      <div className="error-icon">
        {isRateLimit ? '⏱️' : isNetworkError ? '📡' : '❌'}
      </div>
      <div className="error-content">
        <h3>{isRateLimit ? 'Rate Limit Reached' : isNetworkError ? 'Connection Error' : 'Error Occurred'}</h3>
        <p className="error-message">{message}</p>
        <p className="error-suggestion">
          {isRateLimit && '💡 Wait a moment before trying again, or check RATE_LIMIT_GUIDE.md for tips to avoid this.'}
          {isNetworkError && '💡 Check your internet connection and try again.'}
          {!isRateLimit && !isNetworkError && '💡 Please try again or contact support if the problem persists.'}
        </p>
      </div>
    </div>
  )
}

export default ErrorMessage
