/**
 * Parse image string from API
 * Handles multiple formats:
 * 1. JSON array string: "[\"url1\", \"url2\"]"
 * 2. Comma-separated: "url1, url2, url3"
 * 3. Array-like: "[url1, url2, url3]"
 * 4. Single URL: "https://..."
 */
export function parseImageString(imageString: string | null | undefined): string[] {
  if (!imageString) return []

  try {
    // Try to parse as JSON first (for format: "[\"url1\", \"url2\"]")
    try {
      const parsed = JSON.parse(imageString)
      if (Array.isArray(parsed)) {
        return parsed.filter((url) => url && typeof url === 'string')
      }
    } catch {
      // Not valid JSON, continue with other methods
    }

    // Check if it's a single valid URL
    if (imageString.startsWith('http://') || imageString.startsWith('https://')) {
      // Check if it contains commas (multiple URLs)
      if (imageString.includes(',')) {
        return imageString
          .split(',')
          .map((url) => url.trim())
          .filter((url) => url.length > 0)
      }
      return [imageString]
    }

    // Handle array-like string format: "[url1, url2, url3]"
    const cleaned = imageString.replace(/[\[\]]/g, '').trim()
    if (!cleaned) return []

    return cleaned
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0)
  } catch (error) {
    console.error('Error parsing image string:', error, 'Input:', imageString)
    return []
  }
}

/**
 * Get color hex code from color name (Vietnamese and English)
 */
export function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    // English colors
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    yellow: '#eab308',
    black: '#000000',
    white: '#ffffff',
    gray: '#6b7280',
    grey: '#6b7280',
    purple: '#a855f7',
    pink: '#ec4899',
    orange: '#f97316',
    brown: '#92400e',
    navy: '#1e3a8a',
    teal: '#14b8a6',
    gold: '#eab308',
    silver: '#d1d5db',

    // Vietnamese colors
    đỏ: '#ef4444',
    xanh: '#3b82f6',
    'xanh dương': '#3b82f6',
    'xanh lá': '#22c55e',
    đen: '#000000',
    trắng: '#ffffff',
    xám: '#6b7280',
    tím: '#a855f7',
    hồng: '#ec4899',
    cam: '#f97316',
    nâu: '#92400e',
    vàng: '#eab308',
    bạc: '#d1d5db',
  }

  const normalized = colorName.toLowerCase().trim()
  return colorMap[normalized] || '#9ca3af' // Default to gray
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * Get initials from name for avatar
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
