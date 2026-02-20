/**
 * API Cache Manager
 * Stores API responses to avoid excessive API calls
 * Implements cache expiration and size limits
 */

class CacheManager {
  constructor(maxSize = 50, expirationTime = 3600000) { // 1 hour default
    this.cache = new Map()
    this.maxSize = maxSize
    this.expirationTime = expirationTime
  }

  // Set cache with expiration
  set(key, value) {
    // If cache is full, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now()
    })
  }

  // Get cache if not expired
  get(key) {
    if (!this.cache.has(key)) {
      return null
    }

    const item = this.cache.get(key)
    const isExpired = Date.now() - item.timestamp > this.expirationTime

    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  // Check if key exists and is valid
  has(key) {
    return this.get(key) !== null
  }

  // Clear all cache
  clear() {
    this.cache.clear()
  }

  // Clear expired entries
  clearExpired() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.expirationTime) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expirationTime: this.expirationTime
    }
  }
}

// Create global cache instance
const apiCache = new CacheManager(50, 3600000) // 50 items, 1 hour expiration

export default apiCache
