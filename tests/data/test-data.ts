/**
 * Centralized Test Data Management System
 * 
 * This module contains all shared test data used across the eCloud QA automation suite.
 * Data is organized by functional areas and user roles for easy maintenance and reusability.
 * 
 * Environment-sensitive data (credentials, URLs) should use environment variables.
 * Static test data (names, IDs, etc.) are defined based on actual test data.
 * 
 * @author eCloud QA Team
 * @version 1.0.0
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
      displayName: 'CodyMD001 Physician eCloudModern',
      credentials: {
        username: process.env.PHYSICIAN_USERNAME,
        password: process.env.PHYSICIAN_PASSWORD,
      }
    },
    
    newUser: {
      credentials: {
        username: process.env.NEW_USER_USERNAME,
        password: process.env.NEW_USER_PASSWORD,
      }
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
   * External links used in the application
   */
  externalLinks: {
    globalMed: {
      sendFeedback: 'https://www.globalmed.com/contact-us/',
      legalInformation: 'https://www.globalmed.com/legal',
      privacyStatement: 'https://www.globalmed.com/legal/privacy-statement',
      facebook: 'https://www.facebook.com/globalmed',
      twitter: 'https://twitter.com/GlobalMed_USA',
      youtube: 'https://www.youtube.com/user/GlobalMediaTelemed',
      linkedin: 'https://www.linkedin.com/company/839991'
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
   * Navigation and UI element selectors based on existing tests
   */
  ui: {
    loginForm: {
      username: '#username',
      password: '#password',
      signInButton: 'text=Sign in'
    },
    
    dashboardTabs: {
      pending: '#button-pending',
      reviewed: '#button-reviewed',
      studies: '#button-studies',
      account: '#button-account',
      admin: '#button-admin'
    },
    
    searchButtons: {
      today: '#button-search-today',
      yesterday: '#button-search-yesterday',
      last7Days: '#button-search-last-7-days',
      last30Days: '#button-search-last-30-days',
      search: '#button-search'
    },
    
    adminTabs: {
      patients: '#button-patients',
      worklist: '#button-worklist',
      viewStudies: '#button-view-studies',
      account: '#button-account'
    },
    
    content: {
      data: '#content-data',
      title: '#content-title'
    },
    
    buttons: {
      save: '#button-save'
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