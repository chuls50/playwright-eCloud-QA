/**
 * Environment-specific configuration data
 * 
 * Manages different environment settings for QA and UAT
 * All environment-sensitive values should be stored in .env files
 */

import dotenv from 'dotenv';

// Load environment variables quietly
dotenv.config({ quiet: true });

export const ENVIRONMENTS = {
  qa: {
    name: 'QA Environment',
    baseUrl: process.env.QA_ENV || 'https://ecloud-modern.qa-encounterservices.com',
    features: {
      enableDebugMode: true,
      enableTestDataReset: true,
      allowDataExport: true,
    },
    users: {
      newUser: {
        username: process.env.QA_NEW_USER_USERNAME || '',
        password: process.env.QA_NEW_USER_PASSWORD || ''
      },
      physician: {
        username: process.env.QA_PHYSICIAN_USERNAME || '',
        password: process.env.QA_PHYSICIAN_PASSWORD || ''
      },
      admin: {
        username: process.env.QA_ADMIN_USERNAME || '',
        password: process.env.QA_ADMIN_PASSWORD || ''
      },
      nurse: {
        username: process.env.QA_NURSE_USERNAME || '',
        password: process.env.QA_NURSE_PASSWORD || ''
      },
      technician: {
        username: process.env.QA_TECHNICIAN_USERNAME || '',
        password: process.env.QA_TECHNICIAN_PASSWORD || ''
      },
      technology: {
        username: process.env.QA_TECHNOLOGY_USERNAME || '',
        password: process.env.QA_TECHNOLOGY_PASSWORD || ''
      },
      guest: {
        username: process.env.QA_GUEST_USERNAME || '',
        password: process.env.QA_GUEST_PASSWORD || ''
      },
      institutionManager: {
        username: process.env.QA_INSTITUTION_MANAGER_USERNAME || '',
        password: process.env.QA_INSTITUTION_MANAGER_PASSWORD || ''
      }
    }
  },
  uat: {
    name: 'UAT Environment',
    baseUrl: process.env.UAT_ENV || 'https://ecloud-modern.demo-encounterservices.com',
    features: {
      enableDebugMode: true,
      enableTestDataReset: true,
      allowDataExport: true,
    },
    users: {
      newUser: {
        username: process.env.UAT_NEW_USER_USERNAME || '',
        password: process.env.UAT_NEW_USER_PASSWORD || ''
      },
      physician: {
        username: process.env.UAT_PHYSICIAN_USERNAME || '',
        password: process.env.UAT_PHYSICIAN_PASSWORD || ''
      },
      admin: {
        username: process.env.UAT_ADMIN_USERNAME || '',
        password: process.env.UAT_ADMIN_PASSWORD || ''
      },
      nurse: {
        username: process.env.UAT_NURSE_USERNAME || '',
        password: process.env.UAT_NURSE_PASSWORD || ''
      },
      technician: {
        username: process.env.UAT_TECHNICIAN_USERNAME || '',
        password: process.env.UAT_TECHNICIAN_PASSWORD || ''
      },
      technology: {
        username: process.env.UAT_TECHNOLOGY_USERNAME || '',
        password: process.env.UAT_TECHNOLOGY_PASSWORD || ''
      },
      guest: {
        username: process.env.UAT_GUEST_USERNAME || '',
        password: process.env.UAT_GUEST_PASSWORD || ''
      },
      institutionManager: {
        username: process.env.UAT_INSTITUTION_MANAGER_USERNAME || '',
        password: process.env.UAT_INSTITUTION_MANAGER_PASSWORD || ''
      }
    }
  },

};

/**
 * Get current environment configuration based on NODE_ENV
 */
export const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV || 'qa';
  
  switch (env.toLowerCase()) {
    case 'uat':
      return ENVIRONMENTS.uat;
    case 'qa':
    default:
      return ENVIRONMENTS.qa;
  }
};

/**
 * Helper function to get user credentials for current environment
 */
export const getCurrentUserCredentials = (userType: keyof typeof ENVIRONMENTS.qa.users) => {
  const currentEnv = getCurrentEnvironment();
  return currentEnv.users[userType];
};
