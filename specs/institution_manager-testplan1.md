# eNcounterCloud PACS Institution Manager Test Plan - Part 1

## Application Overview

Comprehensive test scenarios for Institution Manager role in eNcounterCloud PACS system. Institution Managers oversee patient data management, routing configurations, worklist administration, and institutional compliance monitoring. This role has administrative privileges for patient lifecycle management and institutional operations oversight.

## Test Scenarios

### 1. Authentication and Access Control

**Seed:** `tests/institution_manager_seed.spec.ts`

#### 1.1. Institution Manager Login Success

**File:** `tests/regression/institution-manager/institution-manager-user/institution_manager_login_success.spec.ts`

**Steps:**
  1. Navigate to eCloud login page
  2. Enter valid institution manager username
  3. Enter valid institution manager password
  4. Click 'Sign In' button

**Expected Results:**
  - User successfully logs into the system
  - Institution Manager dashboard displays with 5 navigation tabs
  - User header shows institution manager name and institution
  - All administrative features are accessible

#### 1.2. Institution Manager Invalid Login

**File:** `tests/regression/institution-manager/institution-manager-user/institution_manager_login_invalid.spec.ts`

**Steps:**
  1. Navigate to eCloud login page
  2. Enter invalid institution manager credentials
  3. Attempt to sign in
  4. Verify access denial

**Expected Results:**
  - Login fails with appropriate error message
  - User remains on login page
  - No administrative access is granted

#### 1.3. Institution Manager Session Timeout

**File:** `tests/regression/institution-manager/institution-manager-user/institution_manager_session_timeout.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to any administrative page
  3. Wait for session timeout period
  4. Attempt to perform administrative action

**Expected Results:**
  - System automatically logs out user after timeout
  - User is redirected to login page
  - Administrative session is properly terminated

### 2. Patient Management - Creation

**Seed:** `tests/institution_manager_seed.spec.ts`

#### 2.1. Access Patient Creation Interface

**File:** `tests/regression/institution-manager/institution-manager-user/patient_creation_interface.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to 'Patients' tab
  3. Click 'New' button
  4. Review patient creation form

**Expected Results:**
  - New patient form is displayed
  - All required patient information fields are available
  - Medical information sections are accessible
  - Physician assignment functionality works

#### 2.2. Create Complete Patient Record

**File:** `tests/regression/institution-manager/institution-manager-user/create_complete_patient.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to patient creation form
  3. Fill in all patient demographic information
  4. Complete address information
  5. Add medical details (SSN, height, weight, allergies)
  6. Set blood type and Rh factor
  7. Save patient record

**Expected Results:**
  - Patient is successfully created with complete information
  - All demographic data is properly saved
  - Medical information is accurately recorded
  - Patient appears in patient list

#### 2.3. Patient Creation Field Validation

**File:** `tests/regression/institution-manager/institution-manager-user/patient_creation_validation.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Access patient creation form
  3. Attempt to save with missing required fields
  4. Verify validation messages

**Expected Results:**
  - System validates required fields
  - Appropriate error messages are displayed
  - Save operation is prevented until required data is provided

#### 2.4. Patient Birth Date Validation

**File:** `tests/regression/institution-manager/institution-manager-user/patient_birth_date_validation.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Access patient creation form
  3. Test various birth date formats
  4. Verify date validation and processing

**Expected Results:**
  - Birth date field accepts valid date formats
  - Invalid date formats are rejected
  - Age calculations are accurate

#### 2.5. Prevent Duplicate Patient IDs

**File:** `tests/regression/institution-manager/institution-manager-user/patient_duplicate_id_prevention.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Attempt to create patient with existing patient ID
  3. Verify duplicate prevention mechanism

**Expected Results:**
  - Patient ID uniqueness is enforced
  - Duplicate patient ID creation is prevented
  - Appropriate error message is displayed

#### 2.6. Patient Gender Selection

**File:** `tests/regression/institution-manager/institution-manager-user/patient_gender_selection.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Access patient creation form
  3. Test gender selection options (Female, Male, Other)
  4. Verify selection persistence

**Expected Results:**
  - Gender selection works correctly
  - All gender options are available
  - Selection is properly saved and displayed

### 3. Patient Management - Search and Navigation

**Seed:** `tests/institution_manager_seed.spec.ts`

#### 3.1. Access Patient Search Interface

**File:** `tests/regression/institution-manager/institution-manager-user/patient_search_interface.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to 'Patients' tab
  3. Click 'Search' button
  4. Review search dialog options

**Expected Results:**
  - Patient search dialog is displayed
  - Search fields for Last Name, First Name, and Patient ID are available
  - Search functionality works correctly

#### 3.2. Search Patients by Last Name

**File:** `tests/regression/institution-manager/institution-manager-user/patient_search_by_last_name.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Open patient search dialog
  3. Enter patient last name
  4. Execute search and verify results

**Expected Results:**
  - Search by last name returns accurate results
  - Partial name matches work correctly
  - Search results are properly formatted

#### 3.3. Search Patients by Patient ID

**File:** `tests/regression/institution-manager/institution-manager-user/patient_search_by_id.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Open patient search dialog
  3. Enter specific patient ID
  4. Verify search result accuracy

**Expected Results:**
  - Search by patient ID returns exact match
  - Invalid patient IDs return no results
  - Search accuracy is maintained

#### 3.4. Multi-Criteria Patient Search

**File:** `tests/regression/institution-manager/institution-manager-user/patient_multi_criteria_search.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Open patient search dialog
  3. Enter multiple search criteria
  4. Verify combined search functionality

**Expected Results:**
  - Combined search criteria work correctly
  - Multiple field search narrows results appropriately
  - Search logic functions as expected

#### 3.5. Patient List Navigation

**File:** `tests/regression/institution-manager/institution-manager-user/patient_list_navigation.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to 'Patients' tab
  3. Use pagination controls (Previous/Next)
  4. Verify patient list display

**Expected Results:**
  - Patient list displays correctly
  - Pagination controls work properly
  - Patient information is accurately shown

#### 3.6. Patient List Selection

**File:** `tests/regression/institution-manager/institution-manager-user/patient_list_selection.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Navigate to patient list
  3. Test 'Select All' checkbox
  4. Verify individual patient selection

**Expected Results:**
  - Select All checkbox functions correctly
  - Individual patient selection works
  - Bulk selection functionality operates properly

### 4. Patient Management - Editing and Updates

**Seed:** `tests/institution_manager_seed.spec.ts`

#### 4.1. Access Patient Edit Interface

**File:** `tests/regression/institution-manager/institution-manager-user/patient_edit_access.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Select a patient from the list
  3. Click 'Edit' button
  4. Verify edit form accessibility

**Expected Results:**
  - Selected patient can be edited
  - Edit form is pre-populated with existing data
  - All patient information sections are editable

#### 4.2. Update Patient Demographics

**File:** `tests/regression/institution-manager/institution-manager-user/patient_demographic_update.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Select and edit a patient
  3. Modify demographic information
  4. Save changes and verify updates

**Expected Results:**
  - Patient demographic information can be updated
  - Changes are properly saved
  - Updated information reflects in patient list

#### 4.3. Update Patient Medical Information

**File:** `tests/regression/institution-manager/institution-manager-user/patient_medical_info_update.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Edit patient medical information
  3. Update blood type, allergies, alerts
  4. Save and verify medical data changes

**Expected Results:**
  - Medical information can be modified
  - Blood type and Rh factor updates work
  - Medical alerts and allergies can be updated

#### 4.4. Update Patient Address Information

**File:** `tests/regression/institution-manager/institution-manager-user/patient_address_update.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Edit patient address details
  3. Update all address fields
  4. Save and verify address changes

**Expected Results:**
  - Address information can be completely updated
  - All address fields accept changes
  - Geographic information is properly saved

#### 4.5. Patient Physician Assignment

**File:** `tests/regression/institution-manager/institution-manager-user/patient_physician_assignment.spec.ts`

**Steps:**
  1. Login as institution manager
  2. Edit patient record
  3. Access physician assignment section
  4. Add physician to patient
  5. Verify assignment

**Expected Results:**
  - Physician assignment functionality works
  - Physicians can be added to patient records
  - Physician search and selection operates correctly
