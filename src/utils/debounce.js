/**
 * Debounce utility
 * Delays function execution to prevent excessive calls
 */

export const debounce = (func, delay = 500) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}

/**
 * Throttle utility
 * Limits function execution frequency
 */
export const throttle = (func, limit = 1000) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Debounce with cancel
 * Returns debounced function with cancel method
 */
export const debounceWithCancel = (func, delay = 500) => {
  let timeout
  const debouncedFunc = function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
  
  debouncedFunc.cancel = () => {
    clearTimeout(timeout)
  }
  
  return debouncedFunc
}

export default debounce
