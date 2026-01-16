/**
 * Centralized Test Data Management System
 * 
 * This module contains all shared test data used across the eCloud QA automation suite.
 * Data is organized by functional areas and user roles for easy maintenance and reusability.
 * 
 * Environment-sensitive data (credentials, URLs) should use environment variables.
 * Static test data (names, IDs, etc.) are defined based on actual test data.
 * 
 * UI selectors and locators have been moved to page object models for better organization.
 * 
 * @author eCloud QA Team
 * @version 2.0.0
 */

export const TEST_DATA = {
  /**
   * User account data for supported roles in the eCloud system
   * Based on actual test data from existing test files
   */
  users: {
    physician: {
      firstname: 'CodyMD001',
      role: 'Physician',
      institution: 'eCloudModern',
      displayName: 'CodyMD001 Physician eCloudModern'
    },
    
    newUser: {
      role: 'New User',
      displayName: 'First Time User'
    },

    admin: {
      role: 'Administrator',
      institution: 'eCloudModern',
      displayName: 'Admin User'
    },

    nurse: {
      role: 'Nurse',
      institution: 'eCloudModern',
      displayName: 'Nurse User'
    },

    technician: {
      role: 'Technician',
      institution: 'eCloudModern', 
      displayName: 'Technician User'
    },

    technology: {
      role: 'Technology',
      institution: 'eCloudModern',
      displayName: 'Technology User'
    },

    guest: {
      role: 'Guest',
      institution: 'eCloudModern',
      displayName: 'Guest User'
    },

    institutionManager: {
      role: 'Institution Manager',
      institution: 'eCloudModern',
      displayName: 'Institution Manager'
    }
  },

  /**
   * Test patient data used in existing test scenarios
   * Based on actual data from current test files
   */
  patients: {
    bobSmith: {
      firstName: 'Bob',
      lastName: 'Smith',
      fullName: 'Bob Smith'
    }
  },



  /**
   * Test data for search functionality
   */
  searchData: {
    patients: {
      lastName: 'Smith',
      firstName: 'Bob'
    }
  },

  /**
   * Account form test data
   */
  accountData: {
    address: {
      address1: '4315 E. Thunderbird Rd',
      address2: '09-195',
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      zip: '85032',
      phoneNumber: '1234567890'
    }
  },

  /**
   * Authentication test data for login scenarios
   */
  authentication: {
    invalidCredentials: {
      username: 'invalid_user123',
      password: 'WrongPassword456!'
    },
    errorMessages: {
      authenticationFailed: 'authentication failed',
      invalidUsername: 'Invalid username',
      invalidPassword: 'Invalid password'
    }
  },

  /**
   * External links test data for GlobalMed resources
   */
  externalLinks: {
    sendFeedback: 'https://www.globalmed.com/contact-us/',
    legalInfo: 'https://www.globalmed.com/legal',
    privacyStatement: 'https://www.globalmed.com/legal/privacy-statement',
    socialMedia: {
      facebook: 'https://www.facebook.com/globalmed',
      twitter: 'https://twitter.com/GlobalMed_USA',
      youtube: 'https://www.youtube.com/user/GlobalMediaTelemed',
      linkedin: 'https://www.linkedin.com/company/839991'
    }
  }
} as const;

/**
 * Type definitions for better TypeScript support
 */
export type UserRole = keyof typeof TEST_DATA.users;

/**
 * Utility functions for accessing test data
 */
export const getUser = (role: UserRole) => TEST_DATA.users[role];