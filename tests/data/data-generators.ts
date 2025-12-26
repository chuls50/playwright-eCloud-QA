/**
 * Test Data Generator Utilities
 * 
 * Provides functions for generating unique identifiers and timestamps
 * for test scenarios that require dynamic data
 */

/**
 * Base Test Data Generator Class
 * Provides core functionality for generating unique identifiers
 */
export class TestDataGenerator {
  /**
   * Generate unique timestamps for test data
   */
  static generateTimestamp(): number {
    return Date.now();
  }

  static generateUniqueId(prefix: string = 'ID'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Generate date strings in various formats
   */
  static generateDateString(format: 'ISO' | 'US' | 'display' = 'ISO'): string {
    const date = new Date();
    
    switch (format) {
      case 'ISO':
        return date.toISOString().split('T')[0];
      case 'US':
        return date.toLocaleDateString('en-US');
      case 'display':
        return date.toDateString();
      default:
        return date.toISOString();
    }
  }

  /**
   * Generate time strings
   */
  static generateTimeString(): string {
    return new Date().toTimeString().split(' ')[0];
  }

  /**
   * Generate random numbers within range
   */
  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random string of specified length
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}