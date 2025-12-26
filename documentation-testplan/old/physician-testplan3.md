# Physician Role Test Plan

## Application Overview

Comprehensive test plan for the eCloudModern application covering the Physician role functionality. The physician interface provides capabilities for reviewing medical studies, managing patients, searching studies, sharing content, and managing account settings. This plan covers all critical workflows including study review processes, patient management, collaboration features, and account administration.

## Test Scenarios

### 1. Authentication and Login

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 1.1. Valid Physician Login

**File:** `tests/regression/physician-user/login.spec.ts`

**Steps:**
  1. Navigate to the application base URL
  2. Wait for the login page to load
  3. Enter valid physician username (PHYSICIAN_USERNAME environment variable)
  4. Enter valid physician password (PHYSICIAN_PASSWORD environment variable)
  5. Click the 'Sign in' button
  6. Wait for successful authentication

**Expected Results:**
  - Login page loads successfully
  - Username and password fields accept input
  - Sign in button is clickable
  - User is redirected to physician dashboard (/admin/)
  - Physician dashboard displays with user information
  - Navigation menu shows all physician sections

#### 1.2. Invalid Physician Credentials

**File:** `tests/regression/physician-user/invalid-login.spec.ts`

**Steps:**
  1. Navigate to the application base URL
  2. Wait for the login page to load
  3. Enter invalid username 'invaliduser'
  4. Enter invalid password 'wrongpassword'
  5. Click the 'Sign in' button
  6. Verify error message appears

**Expected Results:**
  - Login page loads successfully
  - Invalid credentials are rejected
  - Appropriate error message is displayed
  - User remains on login page
  - No access to physician dashboard is granted

### 2. Study Review Management

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 2.1. View Pending Studies List

**File:** `tests/regression/physician-user/pending-studies.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to the 'Pending' section
  3. Verify the pending studies list displays
  4. Validate study information shows patient name, passcode, study type, date, and modality
  5. Check pagination controls are present
  6. Verify study count displays correctly

**Expected Results:**
  - Pending section loads successfully
  - Studies list displays with proper formatting
  - Each study shows complete information (Patient name, Passcode, Study type, Date/time, Modality)
  - Pagination shows '1 of X page(s)' format
  - Previous/Next buttons are visible
  - Studies are sorted by date/time

#### 2.2. Navigate Study Review Interface

**File:** `tests/regression/physician-user/study-review-interface.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Pending' section
  3. Click on a study with patient data
  4. Verify study opens in review interface
  5. Check for study viewing tools
  6. Verify review actions are available
  7. Test navigation between studies

**Expected Results:**
  - Study opens in dedicated review interface
  - Medical images/data display properly
  - Review tools and controls are accessible
  - Study metadata displays correctly
  - Navigation between studies works
  - Review actions (approve/reject) are available

#### 2.3. View Reviewed Studies History

**File:** `tests/regression/physician-user/reviewed-studies.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to the 'Reviewed' section
  3. Verify reviewed studies list displays
  4. Check study information includes reviewer details
  5. Verify review timestamp is shown
  6. Test pagination for large lists
  7. Validate study status indicators

**Expected Results:**
  - Reviewed section loads successfully
  - Studies show patient information and passcode
  - Reviewer name displays (e.g., 'Reviewed by: Dr. John Smith')
  - Review timestamp shows (e.g., 'On: 12/23/2025, 8:37:34 AM')
  - Studies maintain chronological order
  - Pagination works correctly
  - Study modality information is preserved

### 3. Study Search Functionality

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 3.1. Search Studies by Date Range

**File:** `tests/regression/physician-user/study-search.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Study Search' section
  3. Click on 'Today' filter option
  4. Verify studies from today display
  5. Click on 'Yesterday' filter option
  6. Click on '-7 days' filter option
  7. Click on '-30 days' filter option
  8. Verify results change based on date filter

**Expected Results:**
  - Study Search interface loads successfully
  - Date filter buttons are interactive
  - Today filter shows current day studies only
  - Yesterday filter shows previous day studies
  - 7-day filter shows studies from past week
  - 30-day filter shows studies from past month
  - Study count updates based on filter selection
  - Results display with proper date formatting

#### 3.2. Advanced Study Search

**File:** `tests/regression/physician-user/advanced-search.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Study Search' section
  3. Click on the 'Search' option
  4. Enter search criteria (patient name, ID, etc.)
  5. Execute the search
  6. Verify search results accuracy
  7. Test search with no results
  8. Clear search and verify reset

**Expected Results:**
  - Advanced search interface opens
  - Search fields accept input properly
  - Search executes and returns relevant results
  - Results match search criteria
  - Empty search shows appropriate message
  - Search can be cleared and reset
  - Search performance is acceptable

### 4. Study Sharing and Collaboration

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 4.1. View Shared Studies

**File:** `tests/regression/physician-user/shared-studies.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Shares' section
  3. Verify shared studies list displays
  4. Check sender and receiver information
  5. Verify study date and modality information
  6. Test 'Select All' checkbox functionality
  7. Switch between 'All' and 'Sent' radio buttons

**Expected Results:**
  - Shares section loads successfully
  - Shared studies display with complete information
  - Sender information shows correctly (e.g., 'Sender: CodyMD001')
  - Receiver information displays (e.g., 'Receiver: CodyMD001')
  - Study dates are formatted properly
  - Select All checkbox selects/deselects all items
  - Radio buttons filter between all shares and sent shares
  - Passcode access information is shown when applicable

#### 4.2. Manage Study Sharing

**File:** `tests/regression/physician-user/share-management.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to a study for sharing
  3. Initiate share action
  4. Select recipient(s)
  5. Add sharing notes or comments
  6. Configure share settings
  7. Execute the share
  8. Verify share appears in Shares list

**Expected Results:**
  - Share function is accessible from study view
  - Recipient selection interface works
  - Notes/comments can be added
  - Share settings are configurable
  - Share completes successfully
  - Shared study appears in sender's share list
  - Recipient receives proper notifications
  - Share permissions are enforced correctly

### 5. Patient and Administrative Management

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 5.1. View Patient List

**File:** `tests/regression/physician-user/patient-management.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Administration' section
  3. Click on 'Patients' sub-navigation
  4. Verify patient list displays
  5. Check patient information includes ID, DOB, study count, and gender
  6. Test pagination navigation
  7. Verify 'Select All' checkbox functionality

**Expected Results:**
  - Administration section loads successfully
  - Patients sub-section displays patient list
  - Each patient shows complete information (Name, ID, DOB, study count, gender)
  - Gender indicators display correctly (M/F/O)
  - Study count is accurate for each patient
  - Pagination shows correct page numbers
  - Select All checkbox functions properly
  - Patient list loads within reasonable time

#### 5.2. Patient Record Access

**File:** `tests/regression/physician-user/patient-records.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to Administration > Patients
  3. Click on a patient with studies
  4. Verify patient details page opens
  5. Check patient information display
  6. Verify associated studies list
  7. Test study access from patient record
  8. Navigate back to patient list

**Expected Results:**
  - Patient details page opens successfully
  - Patient demographics display correctly
  - Associated studies list shows properly
  - Studies can be accessed from patient record
  - Navigation maintains context
  - Patient information is complete and accurate
  - Study count matches the patient list display

#### 5.3. Create New Patient Record

**File:** `tests/regression/physician-user/new-patient.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to Administration > Patients
  3. Click the 'New' button
  4. Fill in required patient information
  5. Enter patient demographics
  6. Save the new patient record
  7. Verify patient appears in the list
  8. Confirm patient details are correct

**Expected Results:**
  - New patient interface opens
  - All required fields are available
  - Form validation works properly
  - Patient record saves successfully
  - New patient appears in patient list
  - Patient information persists correctly
  - Patient ID is generated appropriately

### 6. Account Management

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 6.1. View Account Information

**File:** `tests/regression/physician-user/account-view.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Account' section
  3. Verify account information displays
  4. Check personal information fields
  5. Verify professional information (License ID, Specialties)
  6. Check notification preferences
  7. Verify address information section

**Expected Results:**
  - Account section loads successfully
  - Email address displays correctly
  - SMS number field is available
  - Full name and profile show properly
  - Username displays (non-editable)
  - License ID shows correctly
  - Specialties field is editable
  - Email notification preference is configurable
  - Address fields are available for editing
  - All form fields display current values

#### 6.2. Update Account Information

**File:** `tests/regression/physician-user/account-update.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Account' section
  3. Update editable fields (SMS, specialties, address)
  4. Toggle email notification setting
  5. Click 'Save' button
  6. Verify changes are saved
  7. Navigate away and return to confirm persistence

**Expected Results:**
  - Editable fields accept new input
  - SMS number accepts proper format
  - Specialties field updates correctly
  - Address fields save properly
  - Notification preference toggles correctly
  - Save button functions properly
  - Changes persist after navigation
  - No validation errors for valid data

#### 6.3. Password Change

**File:** `tests/regression/physician-user/password-change.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Navigate to 'Account' section
  3. Click on 'Password' option
  4. Enter current password
  5. Enter new password
  6. Confirm new password
  7. Save password change
  8. Verify change confirmation

**Expected Results:**
  - Password change interface opens
  - Current password field validates properly
  - New password accepts secure input
  - Password confirmation validates match
  - Password complexity requirements are enforced
  - Password change saves successfully
  - Confirmation message appears
  - User can log in with new password

### 7. Navigation and User Interface

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 7.1. Main Navigation Functionality

**File:** `tests/regression/physician-user/navigation.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Test navigation between main sections
  3. Verify each section loads properly
  4. Check navigation state persistence
  5. Test back navigation
  6. Verify breadcrumb functionality if present

**Expected Results:**
  - All main navigation links are functional
  - Sections load without errors
  - Navigation maintains user context
  - Back navigation works properly
  - UI remains responsive during navigation
  - No broken links or 404 errors
  - Navigation state is preserved appropriately

#### 7.2. User Interface Responsiveness

**File:** `tests/regression/physician-user/ui-responsiveness.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Test interface at different screen resolutions
  3. Verify pagination controls work
  4. Test scrolling behavior
  5. Check button and link interactions
  6. Verify form field responsiveness

**Expected Results:**
  - Interface adapts to different screen sizes
  - All elements remain accessible
  - Pagination controls function properly
  - Scrolling works smoothly
  - Buttons and links respond appropriately
  - Forms remain usable across screen sizes
  - No UI elements are cut off or overlapping

### 8. Error Handling and Edge Cases

**Seed:** `tests/seed/physician_seed.spec.ts`

#### 8.1. Session Timeout Handling

**File:** `tests/regression/physician-user/session-timeout.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Wait for session to timeout or simulate timeout
  3. Attempt to perform an action
  4. Verify appropriate timeout handling
  5. Check redirect to login page
  6. Verify session restoration after re-login

**Expected Results:**
  - Session timeout is detected properly
  - User receives appropriate timeout notification
  - User is redirected to login page
  - No sensitive data remains accessible
  - Re-login restores proper session
  - User context is restored appropriately

#### 8.2. Network Error Handling

**File:** `tests/regression/physician-user/network-errors.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Simulate network connectivity issues
  3. Attempt data loading operations
  4. Verify error handling behavior
  5. Check error message display
  6. Test recovery when connection restored

**Expected Results:**
  - Network errors are handled gracefully
  - Appropriate error messages display
  - User is informed of connectivity issues
  - No data corruption occurs
  - Recovery works when connection restored
  - User can continue normal operations after recovery

#### 8.3. Invalid Data Handling

**File:** `tests/regression/physician-user/invalid-data.spec.ts`

**Steps:**
  1. Log in as a physician user
  2. Attempt to enter invalid data in forms
  3. Test boundary conditions for input fields
  4. Verify validation error messages
  5. Check form submission with invalid data
  6. Test data format requirements

**Expected Results:**
  - Invalid data is rejected appropriately
  - Clear validation error messages appear
  - Form submission is prevented with invalid data
  - Data format requirements are enforced
  - No invalid data is saved to the system
  - User receives helpful guidance for corrections
