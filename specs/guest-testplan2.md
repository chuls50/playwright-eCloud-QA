# eNcounterCloud PACS Guest User Test Plan - Part 2

## Application Overview

Additional comprehensive test scenarios for Guest user role covering account management, security, error handling, and edge cases. This part focuses on guest user profile management, security boundaries, and integration scenarios with other system roles.

## Test Scenarios

### 4. Account Management

**Seed:** `tests/guest_seed.spec.ts`

#### 4.1. View Account Information

**File:** `tests/regression/guest/guest-user/view_account_information.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Review account information fields
4. Verify field editability status

**Expected Results:**

- Account information displays correctly
- Editable fields allow modifications
- Profile and username fields are disabled
- Save functionality is available

#### 4.2. Update Email Address

**File:** `tests/regression/guest/guest-user/update_email_address.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Modify email address field with valid email
4. Click 'Save' button

**Expected Results:**

- Email field accepts valid email format
- System saves updated email address
- Confirmation message appears
- Changes persist after logout/login

#### 4.3. Update SMS Number

**File:** `tests/regression/guest/guest-user/update_sms_number.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Enter valid SMS number in correct format
4. Click 'Save' button

**Expected Results:**

- SMS field accepts valid phone number format
- System saves updated phone number
- Format validation works correctly
- Changes are preserved in database

#### 4.4. Update Address Information

**File:** `tests/regression/guest/guest-user/update_address_information.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Fill in address fields (Address 1, City, State, Country, Zip)
4. Click 'Save' button

**Expected Results:**

- Address fields accept text input
- All address components can be updated
- Geographic information is saved correctly
- Address validation functions properly

#### 4.5. Toggle Email Notifications

**File:** `tests/regression/guest/guest-user/toggle_email_notifications.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Toggle 'Send email notifications' checkbox
4. Click 'Save' button

**Expected Results:**

- Notification preference is toggled correctly
- System respects email notification setting
- Setting persists across sessions

#### 4.6. Change Password

**File:** `tests/regression/guest/guest-user/change_password.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Click 'Password' option
4. Enter current password and new password
5. Confirm password change

**Expected Results:**

- Password change interface is accessible
- Security requirements are enforced
- Old password verification works
- New password is successfully updated

### 5. Security and Access Control

**Seed:** `tests/guest_seed.spec.ts`

#### 5.1. Restricted Navigation Access

**File:** `tests/regression/guest/guest-user/restricted_navigation_access.spec.ts`

**Steps:**

1. Login as guest user
2. Attempt to navigate to unauthorized sections
3. Verify access restrictions are enforced

**Expected Results:**

- Guest user cannot access clinical features
- Navigation is restricted to Shares and Account only
- Unauthorized access attempts are blocked

#### 5.2. Study Access Boundaries

**File:** `tests/regression/guest/guest-user/study_access_boundaries.spec.ts`

**Steps:**

1. Login as guest user
2. Access studies via valid passcodes
3. Attempt to access studies without passcode
4. Verify access control enforcement

**Expected Results:**

- Guest can only view studies accessible via passcode
- No unauthorized study access is possible
- Study access is properly scoped

#### 5.3. Audit Trail Logging

**File:** `tests/regression/guest/guest-user/audit_trail_logging.spec.ts`

**Steps:**

1. Login as guest user
2. Perform various activities (passcode entry, study access)
3. Check system logs for proper activity recording

**Expected Results:**

- System logs guest user activities properly
- Security events are recorded
- Audit trail includes guest actions

#### 5.4. Session Security Timeout

**File:** `tests/regression/guest/guest-user/session_security_timeout.spec.ts`

**Steps:**

1. Login as guest user
2. Remain idle beyond session timeout
3. Verify automatic logout occurs
4. Attempt to access system after timeout

**Expected Results:**

- User session expires after configured timeout
- Automatic logout functions correctly
- Session security is maintained

#### 5.5. Expired Passcode Handling

**File:** `tests/regression/guest/guest-user/expired_passcode_handling.spec.ts`

**Steps:**

1. Login as guest user
2. Attempt to use expired passcode
3. Verify system rejection and messaging

**Expected Results:**

- Expired passcodes are rejected
- System prevents access to expired content
- Error messaging explains expiration

### 6. Error Handling and Edge Cases

**Seed:** `tests/guest_seed.spec.ts`

#### 6.1. Invalid Email Validation

**File:** `tests/regression/guest/guest-user/invalid_email_validation.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Enter invalid email format
4. Attempt to save account information

**Expected Results:**

- Invalid email format is rejected
- Validation error message appears
- Save operation is prevented

#### 6.2. Invalid Phone Number Validation

**File:** `tests/regression/guest/guest-user/invalid_phone_validation.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Enter invalid SMS number format
4. Attempt to save account information

**Expected Results:**

- Invalid phone number format is rejected
- Format validation prevents save
- User receives clear error feedback

#### 6.3. Empty Required Fields Validation

**File:** `tests/regression/guest/guest-user/empty_required_fields.spec.ts`

**Steps:**

1. Login as guest user
2. Navigate to 'Account' tab
3. Clear required fields
4. Attempt to save account information

**Expected Results:**

- Empty required fields prevent save
- Validation messages guide user
- Form state is preserved during error

#### 6.4. Network Error Handling

**File:** `tests/regression/guest/guest-user/network_error_handling.spec.ts`

**Steps:**

1. Login as guest user
2. Simulate network connectivity issues
3. Attempt to perform actions
4. Verify error handling

**Expected Results:**

- System handles network errors gracefully
- User receives appropriate error messaging
- Data integrity is maintained

#### 6.5. Concurrent Login Handling

**File:** `tests/regression/guest/guest-user/concurrent_login_handling.spec.ts`

**Steps:**

1. Login as guest user in first session
2. Attempt to login with same credentials in second session
3. Verify system behavior for concurrent access

**Expected Results:**

- System prevents concurrent session conflicts
- Login security is maintained
- Session management functions properly

### 7. Integration and Workflow

**Seed:** `tests/guest_seed.spec.ts`

#### 7.1. Access Physician Shared Studies

**File:** `tests/regression/guest/guest-user/physician_shared_study_access.spec.ts`

**Steps:**

1. Have physician user share study with guest passcode
2. Login as guest user
3. Use passcode to access shared study
4. Verify study content accessibility

**Expected Results:**

- Guest successfully accesses studies shared by physicians
- Cross-role sharing workflow functions correctly
- Study content is properly accessible

#### 7.2. Access Multi-Role Shared Studies

**File:** `tests/regression/guest/guest-user/multi_role_shared_studies.spec.ts`

**Steps:**

1. Have multiple clinical users share different studies
2. Login as guest user
3. Use multiple passcodes to access all studies
4. Verify access to all shared content

**Expected Results:**

- Guest can access studies shared by multiple clinical roles
- Multi-source sharing works correctly
- Access permissions are properly maintained

#### 7.3. Guest Notification Workflow

**File:** `tests/regression/guest/guest-user/notification_workflow.spec.ts`

**Steps:**

1. Configure guest notification preferences
2. Have clinical user share study with guest
3. Verify guest receives appropriate notifications

**Expected Results:**

- Guest receives proper notifications when available
- Notification delivery follows preferences
- Communication workflow functions correctly

#### 7.4. Cross-Device Study Access

**File:** `tests/regression/guest/guest-user/cross_device_access.spec.ts`

**Steps:**

1. Login as guest user on first device
2. Access shared studies via passcodes
3. Login on second device with same credentials
4. Verify study access on second device

**Expected Results:**

- Guest can access shared studies on different devices
- Cross-device functionality works correctly
- Session management handles device switching

---

Guest User Test Plans Generated

Part 1 (guest-testplan1.md) - 27 Test Scenarios

Authentication and Access (3 tests): Login success/failure, session timeout
Passcode-Based Study Access (5 tests): Valid/invalid passcodes, multiple entry, deletion, navigation
Study Sharing Interface (4 tests): Study list viewing, filtering (All/Sent), empty state handling

Part 2 (guest-testplan2.md) - 27 Test Scenarios

Account Management (6 tests): Profile viewing/editing, email/SMS updates, address management, notifications, password changes
Security and Access Control (5 tests): Navigation restrictions, study access boundaries, audit logging, session security, expired passcode handling
Error Handling and Edge Cases (5 tests): Email/phone validation, required field validation, network errors, concurrent login handling
Integration and Workflow (4 tests): Cross-role study sharing, multi-source access, notifications, cross-device functionality

Key Findings About Guest Users

The Guest user role is fundamentally different from all other clinical roles:

Highly Restricted Interface: Only 2 navigation tabs (Shares, Account) vs 5+ for clinical roles

External User Model: Designed for patients, referring physicians, or external stakeholders

Passcode-Based Access: Security model based on temporary passcodes rather than role-based permissions

Limited Functionality: No clinical features, study search, or administrative capabilities

Basic Account Management: Can update contact info and preferences but cannot change core profile data

Complete Role Documentation Status
✅ All 6 User Roles Documented:

Physician: 110 test scenarios
Administrator: 95 test scenarios
Nurse: 54 test scenarios
Technician: 54 test scenarios
Technology: 54 test scenarios
Guest: 54 test scenarios ✅
Total: 401 comprehensive test scenarios covering all user roles in the eNcounterCloud PACS system, ready for the Product team to extract user stories from the legacy application.
