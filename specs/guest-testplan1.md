# eNcounterCloud PACS Guest User Test Plan - Part 1

## Application Overview

Comprehensive test scenarios for Guest user role in eNcounterCloud PACS system. Guest users are external users who access shared medical studies via secure passcodes rather than having full clinical system access. This role represents patients, referring physicians, or other external stakeholders who need limited access to specific shared studies.

## Test Scenarios

### 1. Authentication and Access

**Seed:** `tests/guest_seed.spec.ts`

#### 1.1. Guest Login Success

**File:** `tests/regression/guest/guest-user/guest_login_success.spec.ts`

**Steps:**
  1. Navigate to eCloud login page
  2. Enter valid guest username credentials
  3. Enter valid guest password
  4. Click 'Sign In' button

**Expected Results:**
  - User successfully logs into the system
  - Guest dashboard displays with 'Shares' and 'Account' tabs only
  - User header shows guest name and institution
  - No clinical navigation options are visible

#### 1.2. Guest Login Invalid Credentials

**File:** `tests/regression/guest/guest-user/guest_login_invalid.spec.ts`

**Steps:**
  1. Navigate to eCloud login page
  2. Enter invalid guest username
  3. Enter invalid password
  4. Click 'Sign In' button

**Expected Results:**
  - Login fails with appropriate error message
  - User remains on login page
  - No system access is granted

#### 1.3. Guest Session Timeout

**File:** `tests/regression/guest/guest-user/guest_session_timeout.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to any page
  3. Wait for session timeout period
  4. Attempt to perform any action

**Expected Results:**
  - System automatically logs out user after timeout
  - User is redirected to login page
  - Security session is properly terminated

### 2. Passcode-Based Study Access

**Seed:** `tests/guest_seed.spec.ts`

#### 2.1. Access Study with Valid Passcode

**File:** `tests/regression/guest/guest-user/passcode_valid_access.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Click 'Passcodes' button
  4. Enter valid study passcode in text field
  5. Click 'Add passcode(s)' button

**Expected Results:**
  - Passcode is accepted by the system
  - Shared study becomes available in shares list
  - Study details are properly displayed
  - Guest can access study viewer

#### 2.2. Access Study with Invalid Passcode

**File:** `tests/regression/guest/guest-user/passcode_invalid_access.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Click 'Passcodes' button
  4. Enter invalid or expired passcode
  5. Click 'Add passcode(s)' button

**Expected Results:**
  - System rejects invalid passcode with error message
  - No study access is granted
  - Passcode field remains available for retry

#### 2.3. Multiple Passcode Entry

**File:** `tests/regression/guest/guest-user/multiple_passcode_entry.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Click 'Passcodes' button
  4. Enter first valid passcode
  5. Click 'Enter another passcode' link
  6. Enter second valid passcode
  7. Click 'Add passcode(s)' button

**Expected Results:**
  - System accepts multiple passcodes simultaneously
  - All associated studies become available
  - Studies are listed in shares section
  - Guest can access all unlocked studies

#### 2.4. Delete Passcode

**File:** `tests/regression/guest/guest-user/passcode_delete.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Click 'Passcodes' button
  4. Enter a passcode
  5. Click 'Delete' button for the passcode

**Expected Results:**
  - Passcode is removed from input field
  - No study access is granted for deleted passcode
  - Interface returns to clean state

#### 2.5. Passcode Entry Back Navigation

**File:** `tests/regression/guest/guest-user/passcode_back_navigation.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Click 'Passcodes' button
  4. Click 'Back' button

**Expected Results:**
  - User returns to main shares view
  - No passcode changes are saved
  - Interface displays original shares state

### 3. Study Sharing Interface

**Seed:** `tests/guest_seed.spec.ts`

#### 3.1. View Shared Studies List

**File:** `tests/regression/guest/guest-user/shared_studies_list.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Add valid passcode to access studies
  4. Review shared studies section

**Expected Results:**
  - Shared studies are displayed in organized list
  - Study information includes relevant details
  - Studies are accessible for viewing
  - List updates properly when studies are added

#### 3.2. Filter All Studies

**File:** `tests/regression/guest/guest-user/filter_all_studies.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Access multiple shared studies via passcodes
  4. Select 'All' radio button filter

**Expected Results:**
  - All available shared studies are displayed
  - Filter correctly shows complete list
  - Studies remain accessible for viewing

#### 3.3. Filter Sent Studies

**File:** `tests/regression/guest/guest-user/filter_sent_studies.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab
  3. Access shared studies via passcodes
  4. Select 'Sent' radio button filter

**Expected Results:**
  - Only studies sent by guest user are displayed
  - Filter correctly applies sent criteria
  - Interface updates appropriately

#### 3.4. No Shares Available State

**File:** `tests/regression/guest/guest-user/no_shares_available.spec.ts`

**Steps:**
  1. Login as guest user
  2. Navigate to 'Shares' tab without adding passcodes
  3. Observe empty shares state

**Expected Results:**
  - System displays 'No shares found' message
  - Interface provides clear guidance for accessing studies
  - Passcode entry options remain available
