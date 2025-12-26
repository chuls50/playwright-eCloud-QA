/**
 * Physician-specific test data and workflows
 * 
 * Contains data specifically related to physician workflows based on existing test scenarios
 */

import { TEST_DATA } from './test-data';

export const PHYSICIAN_TEST_DATA = {
  user: TEST_DATA.users.physician,
  
  /**
   * Dashboard tabs available to physicians
   */
  dashboardTabs: [
    'Pending',
    'Reviewed',
    'Study Search',
    'Account',
    'Administration'
  ],

  /**
   * Study attributes displayed in the dashboard
   */
  studyAttributes: {
    pending: [
      'Patient Name',
      'Passcode', 
      'Consult type',
      'Date',
      'Time',
      'Modality Type'
    ],
    
    reviewed: [
      'Patient Name',
      'Passcode',
      'Consult type', 
      'Date',
      'Time',
      'Reviewed by',
      'Reviewed date',
      'Reviewed time'
    ]
  },

  /**
   * Search functionality data
   */
  search: {
    dateRanges: [
      'Today',
      'Yesterday', 
      '- 7 days',
      '- 30 days'
    ],
    
    criteria: [
      'Patient ID',
      'First Name',
      'Last Name',
      'From Date',
      'To Date',
      'Modality'
    ]
  },

  /**
   * Account form fields
   */
  accountFields: {
    editable: [
      'Email Address',
      'SMS Number',
      'Specialties',
      'Address 1',
      'Address 2', 
      'City',
      'State',
      'Country',
      'Zip',
      'Phone'
    ],
    
    nonEditable: [
      'Profile',
      'Username',
      'User Full Name'
    ]
  },

  /**
   * Administration tabs accessible to physicians
   */
  adminTabs: [
    'Patients',
    'Worklist',
    'View Studies',
    'Account'
  ]
};