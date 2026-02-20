import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch, onInputChange, suggestions, onSuggestionSelect }) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    onInputChange(value)
    if (value.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    onSuggestionSelect(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search city, country, or coordinates..."
            value={input}
            onChange={handleInputChange}
            onFocus={() => input.length > 0 && setShowSuggestions(true)}
            className="search-input glass-effect"
          />
          <button type="submit" className="search-button glass-button primary">
            <span className="search-icon">🔍</span> Search
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown glass-panel">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-icon">📍</span>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar
