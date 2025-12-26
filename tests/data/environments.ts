/**
 * Environment-specific configuration data
 * 
 * Manages different environment settings for QA, Staging, and Production
 * All environment-sensitive values should be stored in .env files
 */

export const ENVIRONMENTS = {
  qa: {
    name: 'QA Environment',
    baseUrl: process.env.QA_BASE_URL || 'https://qa.ecloudmodern.com',
    apiEndpoint: process.env.QA_API_ENDPOINT || 'https://api-qa.ecloudmodern.com',
    dicomPort: parseInt(process.env.QA_DICOM_PORT || '11112'),
    databaseUrl: process.env.QA_DATABASE_URL,
    features: {
      enableDebugMode: true,
      enableTestDataReset: true,
      allowDataExport: true,
      enablePerformanceLogging: true
    },
    timeouts: {
      pageLoad: 30000,
      apiResponse: 10000,
      studyUpload: 60000,
      reportGeneration: 45000
    }
  },
  
  staging: {
    name: 'Staging Environment',
    baseUrl: process.env.STAGING_BASE_URL || 'https://staging.ecloudmodern.com',
    apiEndpoint: process.env.STAGING_API_ENDPOINT || 'https://api-staging.ecloudmodern.com',
    dicomPort: parseInt(process.env.STAGING_DICOM_PORT || '11112'),
    databaseUrl: process.env.STAGING_DATABASE_URL,
    features: {
      enableDebugMode: false,
      enableTestDataReset: false,
      allowDataExport: false,
      enablePerformanceLogging: true
    },
    timeouts: {
      pageLoad: 20000,
      apiResponse: 8000,
      studyUpload: 45000,
      reportGeneration: 30000
    }
  },
  
  production: {
    name: 'Production Environment',
    baseUrl: process.env.PROD_BASE_URL || 'https://ecloudmodern.com',
    apiEndpoint: process.env.PROD_API_ENDPOINT || 'https://api.ecloudmodern.com',
    dicomPort: parseInt(process.env.PROD_DICOM_PORT || '11112'),
    databaseUrl: process.env.PROD_DATABASE_URL,
    features: {
      enableDebugMode: false,
      enableTestDataReset: false,
      allowDataExport: false,
      enablePerformanceLogging: false
    },
    timeouts: {
      pageLoad: 15000,
      apiResponse: 5000,
      studyUpload: 30000,
      reportGeneration: 20000
    }
  }
};

/**
 * Get current environment configuration based on NODE_ENV
 */
export const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV || 'qa';
  
  switch (env.toLowerCase()) {
    case 'staging':
      return ENVIRONMENTS.staging;
    case 'production':
    case 'prod':
      return ENVIRONMENTS.production;
    case 'qa':
    case 'test':
    default:
      return ENVIRONMENTS.qa;
  }
};

/**
 * Environment-specific test data overrides
 */
export const ENVIRONMENT_OVERRIDES = {
  qa: {
    // QA-specific overrides
    slowMo: 100, // Slow down actions for debugging
    headless: false, // Show browser for debugging
    enableScreenshots: true,
    enableVideoRecording: true
  },
  
  staging: {
    // Staging-specific overrides
    slowMo: 0,
    headless: true,
    enableScreenshots: false,
    enableVideoRecording: false
  },
  
  production: {
    // Production-specific overrides (limited testing)
    slowMo: 0,
    headless: true,
    enableScreenshots: false,
    enableVideoRecording: false,
    readOnlyMode: true // Prevent any data modifications
  }
};