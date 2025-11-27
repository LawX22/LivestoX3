// deliveryOptionsHelper.ts - FIXED VERSION WITH PROPER PICKUP PARSING
import type { ParsedDeliveryOptions, ParsedPickupSchedule, ParsedDeliveryInfo } from '@/types/managementTypes'

/**
 * ✅ FIXED - Parse delivery options from encoded string array with robust error handling
 * Format: 
 * - Pickup: "pickup:Mon|Tue|Wed:09:00:17:00"
 * - Delivery: "delivery:500"
 * 
 * CRITICAL FIX: Uses regex to properly handle time format (HH:MM) which contains colons
 */
export function parseDeliveryOptions(deliveryOptions: string[] | null | undefined): ParsedDeliveryOptions {
  console.log('🔍 HELPER: Parsing delivery options:', deliveryOptions)
  
  const parsed: ParsedDeliveryOptions = {
    hasPickup: false,
    hasDelivery: false
  }

  // Validate input
  if (!deliveryOptions || !Array.isArray(deliveryOptions) || deliveryOptions.length === 0) {
    console.warn('⚠️ HELPER: No valid delivery options provided')
    return parsed
  }

  for (const option of deliveryOptions) {
    // Skip invalid options
    if (!option || typeof option !== 'string') {
      console.warn('⚠️ HELPER: Skipping invalid option:', option)
      continue
    }

    if (option.startsWith('pickup:')) {
      try {
        // ✅ CRITICAL FIX: Use regex to properly parse time format
        // Pattern: pickup:Days:HH:MM:HH:MM
        // Example: "pickup:Mon|Tue|Wed:09:00:17:00"
        const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
        
        if (match) {
          const [, daysStr, startTime, endTime] = match
          const days = daysStr.split('|').filter(day => day && day.trim().length > 0)
          
          if (days.length > 0 && startTime && endTime) {
            parsed.hasPickup = true
            parsed.pickup = {
              availableDays: days,
              startTime,
              endTime
            }
            console.log('✅ HELPER: Parsed pickup:', parsed.pickup)
          }
        } else {
          console.error('❌ HELPER: Invalid pickup format - could not match pattern:', option)
        }
      } catch (error) {
        console.error('❌ HELPER: Error parsing pickup:', error)
      }
    } else if (option.startsWith('delivery:')) {
      try {
        // Parse delivery: "delivery:500"
        const feeStr = option.substring(9).trim() // Remove "delivery:" prefix
        const fee = parseFloat(feeStr)
        if (!isNaN(fee) && fee >= 0) {
          parsed.hasDelivery = true
          parsed.delivery = {
            fee
          }
          console.log('✅ HELPER: Parsed delivery:', parsed.delivery)
        }
      } catch (error) {
        console.error('❌ HELPER: Error parsing delivery:', error)
      }
    }
  }

  console.log('✅ HELPER: Final result:', parsed)
  return parsed
}

/**
 * Format time for display (24hr to 12hr format)
 */
export function formatTime(time: string): string {
  if (!time) return ''
  try {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  } catch (error) {
    console.error('Error formatting time:', error)
    return time
  }
}

/**
 * Get user-friendly delivery options summary
 */
export function getDeliveryOptionsSummary(deliveryOptions: string[]): string {
  const parsed = parseDeliveryOptions(deliveryOptions)
  const summaries: string[] = []

  if (parsed.hasPickup && parsed.pickup) {
    const daysStr = parsed.pickup.availableDays.join(', ')
    const timeStr = `${formatTime(parsed.pickup.startTime)} - ${formatTime(parsed.pickup.endTime)}`
    summaries.push(`Pickup: ${daysStr} (${timeStr})`)
  }

  if (parsed.hasDelivery && parsed.delivery) {
    const feeStr = parsed.delivery.fee === 0 
      ? 'Free/Negotiable' 
      : `₱${parsed.delivery.fee.toLocaleString()}`
    summaries.push(`Delivery: ${feeStr}`)
  }

  return summaries.join(' • ') || 'No delivery options'
}

/**
 * Encode pickup schedule into delivery option string
 */
export function encodePickupOption(
  availableDays: string[],
  startTime: string,
  endTime: string
): string {
  return `pickup:${availableDays.join('|')}:${startTime}:${endTime}`
}

/**
 * Encode delivery fee into delivery option string
 */
export function encodeDeliveryOption(fee: number): string {
  return `delivery:${fee}`
}

/**
 * Check if delivery options include pickup
 */
export function hasPickupOption(deliveryOptions: string[]): boolean {
  return deliveryOptions.some(opt => opt && typeof opt === 'string' && opt.startsWith('pickup:'))
}

/**
 * Check if delivery options include delivery
 */
export function hasDeliveryOption(deliveryOptions: string[]): boolean {
  return deliveryOptions.some(opt => opt && typeof opt === 'string' && opt.startsWith('delivery:'))
}

/**
 * Extract pickup schedule from delivery options
 */
export function getPickupSchedule(deliveryOptions: string[]): ParsedPickupSchedule | null {
  const parsed = parseDeliveryOptions(deliveryOptions)
  return parsed.pickup || null
}

/**
 * Extract delivery info from delivery options
 */
export function getDeliveryInfo(deliveryOptions: string[]): ParsedDeliveryInfo | null {
  const parsed = parseDeliveryOptions(deliveryOptions)
  return parsed.delivery || null
}

/**
 * Validate delivery options format
 */
export function validateDeliveryOptions(deliveryOptions: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!deliveryOptions || !Array.isArray(deliveryOptions)) {
    errors.push('Delivery options must be an array')
    return { valid: false, errors }
  }

  for (const option of deliveryOptions) {
    if (!option || typeof option !== 'string') {
      errors.push('All delivery options must be strings')
      continue
    }

    if (option.startsWith('pickup:')) {
      // Validate using regex
      const match = option.match(/^pickup:([^:]+):(\d{2}:\d{2}):(\d{2}:\d{2})$/)
      if (!match) {
        errors.push('Invalid pickup option format - must match pickup:Days:HH:MM:HH:MM')
      } else {
        const [, days, startTime, endTime] = match
        if (!days || days.split('|').filter(d => d.trim()).length === 0) {
          errors.push('Pickup option must have at least one day')
        }
      }
    } else if (option.startsWith('delivery:')) {
      const feeStr = option.substring(9)
      const fee = parseFloat(feeStr)
      if (isNaN(fee) || fee < 0) {
        errors.push('Invalid delivery fee')
      }
    } else {
      errors.push(`Unknown delivery option format: ${option}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Debug function to log delivery options details
 */
export function debugDeliveryOptions(deliveryOptions: any): void {
  console.group('🔍 Delivery Options Debug')
  console.log('Raw value:', deliveryOptions)
  console.log('Type:', typeof deliveryOptions)
  console.log('Is Array:', Array.isArray(deliveryOptions))
  
  if (Array.isArray(deliveryOptions)) {
    console.log('Length:', deliveryOptions.length)
    deliveryOptions.forEach((opt, idx) => {
      console.log(`  [${idx}]:`, opt, `(type: ${typeof opt})`)
    })
    
    const parsed = parseDeliveryOptions(deliveryOptions)
    console.log('Parsed result:', parsed)
    console.log('Has Pickup:', parsed.hasPickup)
    console.log('Has Delivery:', parsed.hasDelivery)
    if (parsed.pickup) {
      console.log('Pickup Details:', parsed.pickup)
    }
    if (parsed.delivery) {
      console.log('Delivery Details:', parsed.delivery)
    }
  }
  
  console.groupEnd()
}