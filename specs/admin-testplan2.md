# eCloud Administrator User Test Plan - Part 2

## Application Overview

This is Part 2 of the comprehensive Administrator test plan for eNcounterCloud PACS. This document covers Account Management, Security, Integration, Error Handling, and Cross-Functional scenarios specific to administrative operations. These test cases ensure complete coverage of administrator responsibilities including system security, audit compliance, and operational reliability.

## Test Scenarios

### 4. Administrator Account Management (MEDIUM PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 4.1 View Administrator Account Information

**File:** `tests/admin-account/view-account.spec.ts`

**Steps:**

1. Login as administrator user
2. Click Account tab
3. Verify account information screen displays
4. Review User Full Name field (disabled)
5. Review Profile field showing 'Administrator' (disabled)
6. Review Username field (disabled)
7. Verify Email Address is editable
8. Verify SMS Number is editable
9. Verify address fields are editable

**Expected Results:**

- Account tab is accessible from admin navigation
- Account screen displays administrator's profile information
- Read-only fields show: User Full Name, Profile (Administrator), Username
- Editable fields available: Email Address, SMS Number, Address fields
- Email notifications checkbox for receiving system alerts
- Profile clearly indicates Administrator role (not Physician, etc.)
- Institution association is displayed in header

#### 4.2 Update Administrator Email Address

**File:** `tests/admin-account/update-email.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Locate Email Address field
4. Clear existing email
5. Enter new valid email address
6. Click Save
7. Verify success message
8. Verify email is updated
9. Check for confirmation email

**Expected Results:**

- Email Address field is editable
- Valid email format is required
- Invalid email format shows validation error
- Updated email becomes new contact for system notifications
- Email change saves with Save button
- Confirmation email may be sent to new address
- Administrator can receive system alerts at new email

#### 4.3 Update Administrator SMS Number

**File:** `tests/admin-account/update-sms.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Locate SMS Number field
4. Enter valid phone number
5. Click Save
6. Verify number is saved
7. Test with invalid format and verify validation
8. Update with international format if applicable

**Expected Results:**

- SMS Number field is editable
- Valid phone number format required
- Invalid format shows validation error
- SMS used for urgent system alerts or two-factor authentication
- Updated SMS saves successfully
- Format may include country code and formatting

#### 4.4 Update Administrator Address Information

**File:** `tests/admin-account/update-address.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Locate address fields section
4. Update street address
5. Update city
6. Update state/province
7. Update zip/postal code
8. Update country if applicable
9. Click Save
10. Verify all address fields are updated

**Expected Results:**

- Address fields are editable: Street, City, State/Province, Zip/Postal Code, Country
- All address fields save together
- Address information used for: Account records, Compliance documentation, Contact purposes
- Invalid address format may show warnings
- International addresses supported

#### 4.5 Email Notifications Configuration

**File:** `tests/admin-account/email-notifications.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Locate 'Receive email notifications' checkbox
4. Check the box to enable notifications
5. Save changes
6. Verify setting persists
7. Uncheck to disable
8. Verify warning if disabling is not recommended

**Expected Results:**

- 'Receive email notifications' checkbox controls system emails
- Checked: Administrator receives system alerts, error notifications, configuration change confirmations
- Unchecked: Email notifications disabled (not recommended)
- Setting saves immediately or with Save button
- Critical system alerts may override this setting

#### 4.6 Administrator Account - Read-Only Fields

**File:** `tests/admin-account/readonly-fields.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Verify User Full Name field is disabled
4. Verify Profile field is disabled and shows 'Administrator'
5. Verify Username field is disabled
6. Attempt to click in disabled fields (should not be editable)
7. Confirm only editable fields can be modified

**Expected Results:**

- User Full Name is disabled (cannot be edited)
- Profile is disabled and shows 'Administrator' role
- Username is disabled (cannot be changed)
- Read-only fields provide identity reference
- Changes to identity fields must be made by higher-level admin or system owner

#### 4.7 Save Account Changes

**File:** `tests/admin-account/save-account.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to Account tab
3. Make changes to email, SMS, or address
4. Click Save button
5. Verify success confirmation
6. Logout and login again
7. Verify changes persisted
8. Make invalid change and verify save is blocked

**Expected Results:**

- Save button commits all account changes
- Success message confirms save
- Changes persist after logout and login
- Failed save shows error message
- Validation errors prevent save until corrected

### 5. Administrator Security and Compliance (CRITICAL PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 5.1 Role-Based Access Control - Administrator vs Physician

**File:** `tests/admin-security/rbac-admin-physician.spec.ts`

**Steps:**

1. Login as administrator
2. Verify no access to clinical study review features
3. Verify access to Institutions and DICOM Nodes
4. Logout
5. Login as physician user
6. Verify access to clinical dashboard
7. Attempt to navigate to /admin (should be blocked)
8. Verify physician has no admin navigation

**Expected Results:**

- Administrator cannot access clinical dashboard (Pending/Reviewed studies)
- Administrator has system configuration access
- Physician cannot access admin functions (Institutions, DICOM Nodes)
- Roles are strictly separated for compliance
- Attempting to access unauthorized features shows access denied

#### 5.2 DICOM Security - TLS Configuration Enforcement

**File:** `tests/admin-security/dicom-tls-compliance.spec.ts`

**Steps:**

1. Login as administrator
2. Create or edit DICOM node
3. Enable 'Use Encrypted TLS Communication'
4. Save configuration
5. Verify TLS setting is saved
6. Test DICOM echo with TLS enabled
7. Verify TLS connection works or shows TLS error if not supported by remote

**Expected Results:**

- DICOM nodes can be configured with TLS encryption
- TLS ensures HIPAA compliance for DICOM transmission
- Administrator can enable/disable TLS per node
- TLS configuration is part of node audit trail
- Production nodes should use TLS for PHI transmission

#### 5.3 Audit Trail - Configuration Changes

**File:** `tests/admin-security/audit-configuration-changes.spec.ts`

**Steps:**

1. Login as administrator
2. Make configuration change (edit institution or DICOM node)
3. Save change
4. Verify change is logged in audit system
5. Review audit trail for the change
6. Verify audit entry contains user, timestamp, and change details
7. Verify audit log integrity

**Expected Results:**

- All administrator configuration changes are logged
- Audit log captures: User who made change, Timestamp, Entity changed (institution/DICOM node), Before and after values
- Audit trail supports compliance (HIPAA, FDA)
- Audit logs are tamper-proof
- Administrators can view audit history

#### 5.4 Data Integrity - Institution Identifier Immutability

**File:** `tests/admin-security/institution-immutability.spec.ts`

**Steps:**

1. Login as administrator
2. Edit any institution
3. Verify Full Name field is disabled
4. Verify Short Name field is disabled
5. Verify Identifier field is disabled
6. Attempt to enable or edit (should be impossible via UI)
7. Verify data integrity is maintained

**Expected Results:**

- Institution identification fields are immutable (disabled)
- Full Name, Short Name, Identifier cannot be changed by administrator
- Immutability prevents accidental data corruption
- Patient studies remain correctly associated with institutions
- Only system-level operations can modify identifiers

#### 5.5 DICOM Node Security - AET Uniqueness

**File:** `tests/admin-security/aet-uniqueness.spec.ts`

**Steps:**

1. Login as administrator
2. Note existing DICOM node AET
3. Create new DICOM node
4. Enter duplicate AET
5. Attempt to save
6. Verify validation error indicates AET already exists
7. Change to unique AET
8. Verify save succeeds

**Expected Results:**

- System enforces unique AET across all DICOM nodes
- Duplicate AET is rejected with validation error
- AET uniqueness prevents routing conflicts
- Clear error message indicates duplicate AET
- Administrator must choose unique AET

#### 5.6 Network Security - DICOM Echo Testing

**File:** `tests/admin-security/network-security-echo.spec.ts`

**Steps:**

1. Login as administrator
2. Select DICOM node
3. Perform Echo test
4. Verify echo completes without data transfer
5. Verify result provides diagnostic information only
6. Confirm no PHI is transmitted during echo
7. Use echo to troubleshoot connectivity

**Expected Results:**

- DICOM Echo tests connectivity without transferring PHI
- Echo is safe diagnostic tool
- Failed echo indicates network or firewall issues
- Echo does not expose sensitive data
- Administrators can diagnose network issues safely

#### 5.7 Session Security - Administrator Timeout

**File:** `tests/admin-security/session-timeout.spec.ts`

**Steps:**

1. Login as administrator
2. Leave session idle for timeout period
3. Wait for timeout to occur
4. Verify automatic logout
5. Verify redirect to login page
6. Attempt to access admin features without re-login
7. Verify access denied until re-authentication

**Expected Results:**

- Administrator sessions timeout after idle period
- Timeout period follows security policy (e.g., 15-30 minutes)
- Timeout protects against unauthorized access to admin functions
- Administrator is logged out and redirected to login
- Sensitive configuration data is cleared from session

### 6. Integration and System Operations (HIGH PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 6.1 Institution-DICOM Node Association

**File:** `tests/admin-integration/institution-dicom-association.spec.ts`

**Steps:**

1. Login as administrator
2. Create or edit DICOM node
3. Associate node with Institution A
4. Verify association
5. Change association to Institution B
6. Verify change affects node accessibility
7. Confirm Institution B users can now access node

**Expected Results:**

- DICOM nodes are associated with institutions
- Changing node's institution affects which users can access it
- Institution determines: Which physicians see the node, Routing and destination options
- Association is required for proper DICOM workflow
- Multiple nodes can belong to same institution

#### 6.2 Destination Routing - Institution to Institution

**File:** `tests/admin-integration/destination-routing.spec.ts`

**Steps:**

1. Login as administrator
2. Edit Institution A
3. Add Institution B as destination
4. Save configuration
5. Login as physician at Institution A
6. Create or select a study
7. Verify Institution B appears as share destination
8. Remove Institution B as destination (admin)
9. Verify Institution B no longer available for sharing

**Expected Results:**

- Institution Destinations define allowed transfer targets
- Adding destination allows physicians to send studies to that institution
- Destinations enable: Study sharing, Referral workflows, Multi-site collaboration
- Removing destination blocks transfers
- Destination list affects physician Share Study functionality

#### 6.3 Report Template Distribution

**File:** `tests/admin-integration/report-template-distribution.spec.ts`

**Steps:**

1. Login as administrator
2. Edit an institution
3. Add 'SOAP Report' template
4. Save configuration
5. Login as physician at that institution
6. Open DICOM viewer and access Report function
7. Verify 'SOAP Report' is available in template list
8. Remove template (admin)
9. Verify template is no longer available to physician

**Expected Results:**

- Institution Templates determine which reports physicians can generate
- Templates include: Case Documentation, Discharge Summary, HPI, SOAP
- Adding template makes it available to institution's physicians
- Removing template hides it from physicians
- Template configuration affects clinical workflow

#### 6.4 DICOM Workflow - End-to-End Integration

**File:** `tests/admin-integration/dicom-workflow-integration.spec.ts`

**Steps:**

1. Login as administrator
2. Configure DICOM node with correct parameters
3. Associate node with institution
4. Test connectivity with Echo
5. Verify echo succeeds
6. Send test DICOM study from external system to node
7. Verify study is received and routed
8. Login as physician
9. Verify study appears in Pending tab
10. Verify end-to-end workflow functions

**Expected Results:**

- Complete DICOM workflow functions with proper configuration
- Workflow: External system sends to DICOM node → Node receives and routes → Study appears in physician dashboard
- Administrator configuration enables workflow
- Proper AET, host, port, and TLS settings required
- Echo test validates configuration before production use

#### 6.5 Multi-Institution Scenarios

**File:** `tests/admin-integration/multi-institution.spec.ts`

**Steps:**

1. Login as administrator
2. Verify multiple institutions in list
3. Configure Institution A with specific destinations and templates
4. Configure Institution B with different destinations and templates
5. Verify configurations are independent
6. Test physician workflow at Institution A
7. Test physician workflow at Institution B
8. Verify data and config isolation

**Expected Results:**

- System supports multiple institutions simultaneously
- Each institution has independent configuration
- Institution destinations enable inter-institution workflows
- Data isolation maintained between institutions
- Administrator can manage all institutions from single interface

#### 6.6 System Scaling - Large Node Lists

**File:** `tests/admin-integration/large-node-lists.spec.ts`

**Steps:**

1. Login as administrator
2. Navigate to DICOM Nodes with many nodes (5+ pages)
3. Verify pagination functions smoothly
4. Use search to quickly locate specific node
5. Verify search performance is fast
6. Edit node from large list
7. Verify edit operations remain responsive

**Expected Results:**

- System handles large numbers of DICOM nodes
- Pagination manages display of many nodes
- Search function helps locate specific nodes quickly
- Performance remains acceptable with many nodes
- Node list loading is efficient

#### 6.7 Configuration Backup and Disaster Recovery

**File:** `tests/admin-integration/config-backup.spec.ts`

**Steps:**

1. Verify backup procedures exist for configuration data
2. Document institution and DICOM node configurations
3. Simulate configuration recovery scenario
4. Verify all institutions and nodes can be restored
5. Validate template and destination associations after restore
6. Confirm system functionality post-recovery

**Expected Results:**

- Configuration data is backed up regularly
- Institutions, DICOM nodes, templates, and destinations are recoverable
- Disaster recovery procedures exist
- Configuration can be restored after failure
- No data loss in recovery scenarios

### 7. Error Handling and Edge Cases (MEDIUM PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 7.1 Invalid DICOM Configuration - Network Unreachable

**File:** `tests/admin-errors/dicom-network-unreachable.spec.ts`

**Steps:**

1. Login as administrator
2. Create DICOM node with unreachable host
3. Save configuration
4. Perform Echo test
5. Verify error message indicates network unreachable
6. Review error details for troubleshooting guidance

**Expected Results:**

- Configuring node with unreachable host shows error on Echo test
- Error message indicates network issue
- Configuration can still be saved (for future availability)
- Error guides troubleshooting: Check host, Check network connectivity, Check firewall

#### 7.2 Invalid DICOM Configuration - Port Blocked

**File:** `tests/admin-errors/dicom-port-blocked.spec.ts`

**Steps:**

1. Login as administrator
2. Configure DICOM node with blocked port
3. Perform Echo test
4. Verify error indicates port connection failure
5. Use error info to identify port/firewall issue

**Expected Results:**

- Echo test with blocked port shows connection failure
- Error indicates port issue
- Administrator can identify firewall or port configuration problem
- Guidance provided for resolution

#### 7.3 Invalid DICOM Configuration - AET Mismatch

**File:** `tests/admin-errors/dicom-aet-mismatch.spec.ts`

**Steps:**

1. Login as administrator
2. Configure DICOM node with incorrect AET
3. Perform Echo test
4. Verify error indicates AET issue
5. Correct AET
6. Verify Echo succeeds with correct AET

**Expected Results:**

- Echo or DICOM transfer with wrong AET fails
- Error indicates AET mismatch or rejection
- Administrator can correct AET based on error
- Remote node may reject connection due to AET

#### 7.4 Invalid DICOM Configuration - TLS Mismatch

**File:** `tests/admin-errors/dicom-tls-mismatch.spec.ts`

**Steps:**

1. Login as administrator
2. Enable TLS on local node
3. Configure remote node without TLS support
4. Perform Echo test
5. Verify TLS error
6. Disable TLS or configure remote for TLS
7. Verify Echo succeeds with matching TLS

**Expected Results:**

- TLS enabled locally but not on remote shows connection error
- TLS disabled locally but required remotely shows error
- Error message indicates TLS configuration issue
- Administrator can match TLS settings between endpoints

#### 7.5 Institution Configuration - Empty Destinations

**File:** `tests/admin-errors/empty-destinations.spec.ts`

**Steps:**

1. Login as administrator
2. Edit institution
3. Remove all destinations
4. Save configuration
5. Login as physician at that institution
6. Verify study review works
7. Attempt to share study
8. Verify no destinations available or warning shown

**Expected Results:**

- Institution with no destinations still functions
- Physicians can review studies but cannot share to other institutions
- Warning or info message may indicate no destinations configured
- Configuration is valid but limits functionality

#### 7.6 Institution Configuration - Empty Templates

**File:** `tests/admin-errors/empty-templates.spec.ts`

**Steps:**

1. Login as administrator
2. Edit institution
3. Remove all templates
4. Save configuration
5. Login as physician
6. Review study in DICOM viewer
7. Attempt to generate report
8. Verify no templates available or appropriate message

**Expected Results:**

- Institution with no templates functions for study review
- Physicians cannot generate reports without templates
- Warning may indicate no templates configured
- Configuration is valid but limits report functionality

#### 7.7 Account Update - Invalid Email Format

**File:** `tests/admin-errors/invalid-email-format.spec.ts`

**Steps:**

1. Login as administrator
2. Navigate to Account tab
3. Enter invalid email (e.g., 'notanemail')
4. Attempt to save
5. Verify validation error
6. Correct to valid email format
7. Verify save succeeds

**Expected Results:**

- Invalid email format shows validation error
- Error message clearly indicates email format issue
- Save is blocked until email is corrected
- Valid email formats are accepted

#### 7.8 Account Update - Invalid Phone Format

**File:** `tests/admin-errors/invalid-phone-format.spec.ts`

**Steps:**

1. Login as administrator
2. Navigate to Account tab
3. Enter invalid phone number
4. Attempt to save
5. Verify validation error
6. Enter valid phone format
7. Verify save succeeds

**Expected Results:**

- Invalid phone format shows validation error
- Error indicates proper phone format
- Save blocked until corrected
- International formats may have specific requirements

#### 7.9 Pagination Edge Cases

**File:** `tests/admin-errors/pagination-edge-cases.spec.ts`

**Steps:**

1. Login as administrator
2. Navigate to list with pagination
3. Verify on first page, Previous is disabled
4. Navigate to last page
5. Verify Next is disabled on last page
6. Test with single-page list
7. Test with empty list if possible

**Expected Results:**

- First page: Previous button disabled
- Last page: Next button disabled
- Single page: Both buttons disabled or hidden
- Empty list handled gracefully
- Pagination accurate with exact page counts

#### 7.10 Concurrent Administrator Sessions

**File:** `tests/admin-errors/concurrent-admin-sessions.spec.ts`

**Steps:**

1. Login as administrator in two browser sessions
2. Make configuration change in session 1
3. Verify change in session 1
4. Refresh session 2
5. Verify change appears in session 2
6. Attempt concurrent edits of same entity
7. Verify conflict resolution or locking mechanism

**Expected Results:**

- Multiple administrators can be logged in simultaneously
- Configuration changes by one admin may require refresh for other admins to see
- Optimistic locking or conflict resolution prevents simultaneous edit conflicts
- System remains stable with concurrent access

#### 7.11 Delete DICOM Node - Dependencies Check

**File:** `tests/admin-errors/delete-node-dependencies.spec.ts`

**Steps:**

1. Login as administrator
2. Select DICOM node with potential dependencies
3. Attempt to delete
4. Verify warning about dependencies
5. Review impact information
6. Confirm deletion if appropriate
7. Verify node is deleted and dependencies handled

**Expected Results:**

- Deleting node with active studies may show warning
- Warning indicates impact on routing or workflows
- Administrator must confirm deletion understanding consequences
- Deletion is prevented if node has critical dependencies
- Alternative: Disable rather than delete

#### 7.12 Browser Compatibility and Responsiveness

**File:** `tests/admin-errors/browser-compatibility.spec.ts`

**Steps:**

1. Access admin interface in Chrome
2. Verify all functionality works
3. Test in Firefox
4. Test in Safari
5. Test in Edge
6. Verify responsive behavior on tablet size
7. Verify functionality on different screen resolutions

**Expected Results:**

- Administrator interface works in Chrome, Firefox, Safari, Edge
- Responsive design adapts to different screen sizes
- Mobile device access may be limited for admin functions
- All buttons and forms function across browsers
- Consistent behavior across platforms
