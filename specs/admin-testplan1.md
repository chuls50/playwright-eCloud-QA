# eCloud Administrator User Test Plan - Part 1

## Application Overview

This comprehensive test plan documents all features and functionality for the Administrator user role in the eNcounterCloud PACS system. Administrators manage system-level configurations including institutions, DICOM nodes, routing rules, and system-wide settings. This is a critical role for maintaining the technical infrastructure of the PACS. This document enables the Product team to extract user stories and requirements for the legacy application. Part 1 covers Authentication, Institution Management, and DICOM Node Configuration.

## Test Scenarios

### 1. Authentication and Access Control (CRITICAL PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 1.1 Administrator Login - Valid Credentials

**File:** `tests/regression/admin/admin-authentication/admin-login-valid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Verify the login page displays username and password fields
3. Enter valid administrator username credentials
4. Enter valid administrator password credentials
5. Click the 'Sign in' button
6. Verify successful redirect to administrator dashboard (/admin)

**Expected Results:**

- Login page loads successfully with all required fields
- Administrator credentials are accepted
- User is authenticated and redirected to admin dashboard (/admin/index.html)
- Administrator dashboard displays with user's full name, role (Administrator), and institution in header
- Administrator-specific navigation tabs are visible: Institutions, DICOM Nodes, Account
- Session is established with appropriate administrator privileges

#### 1.2 Administrator Login - Invalid Credentials

**File:** `tests/regression/admin/admin-authentication/admin-login-invalid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter invalid administrator username
3. Enter invalid administrator password
4. Click the 'Sign in' button
5. Verify appropriate error message
6. Verify user remains on login page without access

**Expected Results:**

- System displays clear error message for invalid credentials
- User is not authenticated
- User remains on login page
- No administrator access is granted
- Error handling is consistent with other user roles

#### 1.3 Administrator Role Permissions Verification

**File:** `tests/regression/admin/admin-authentication/admin-permissions.spec.ts`

**Steps:**

1. Login as administrator user
2. Verify administrator dashboard navigation tabs
3. Verify access to Institutions management
4. Verify access to DICOM Nodes management
5. Verify no access to clinical dashboard features (Pending, Reviewed studies)
6. Confirm administrator-specific features are available

**Expected Results:**

- Administrator has access to system configuration features
- Administrator can manage institutions across the system
- Administrator can configure DICOM nodes
- Administrator does NOT have clinical dashboard access (different from physician role)
- Administrator dashboard is distinct from clinical user dashboards
- Role-based access control is enforced

#### 1.4 Administrator Session Management

**File:** `tests/regression/admin/admin-authentication/admin-session.spec.ts`

**Steps:**

1. Login as administrator user
2. Allow session to remain idle for extended period
3. Attempt to access protected resource
4. Verify session timeout behavior
5. Verify redirect to login page
6. Verify no cached sensitive data is accessible

**Expected Results:**

- Session timeout applies to administrator accounts
- Administrator is logged out after idle period
- Sensitive configuration data is protected after logout
- Session management follows security best practices

### 2. Institution Management (HIGH PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 2.1 View Institutions List

**File:** `tests/regression/admin/admin-institutions/view-institutions.spec.ts`

**Steps:**

1. Login as administrator user
2. Verify default landing on Institutions tab
3. Verify institutions list displays
4. Verify each institution card shows institution name
5. Check pagination indicator (e.g., '1 of 8 page(s)')
6. Verify Select All checkbox functionality
7. Verify Search button presence

**Expected Results:**

- Institutions tab is default landing page for administrators
- Complete list of all institutions in the system is displayed
- Each institution card shows: Institution Full Name, Short Name/Identifier placeholder
- Institutions are listed in organized manner (alphabetically or by ID)
- Pagination controls are available if institutions exceed page limit
- Select All checkbox allows multi-institution selection
- Search button provides institution search capability

#### 2.2 Institution List Pagination

**File:** `tests/regression/admin/admin-institutions/institutions-pagination.spec.ts`

**Steps:**

1. Login as administrator user
2. Verify multiple pages of institutions exist
3. Note current page indicator
4. Click 'Next' button to navigate to next page
5. Verify new page of institutions loads
6. Verify page indicator updates
7. Click 'Previous' button to return
8. Verify previous page displays correctly

**Expected Results:**

- Pagination controls work correctly
- Current page and total pages are accurately displayed
- Next button loads subsequent page of institutions
- Previous button loads prior page
- Page navigation is smooth and responsive
- Button states update appropriately at boundaries

#### 2.3 Search Institutions

**File:** `tests/regression/admin/admin-institutions/search-institutions.spec.ts`

**Steps:**

1. Login as administrator user
2. Click Search button on Institutions tab
3. Verify search dialog appears
4. Enter institution name search criteria
5. Execute search
6. Verify matching institutions are displayed
7. Clear search and verify full list returns

**Expected Results:**

- Search button opens institution search dialog
- Search fields allow filtering by institution name or identifier
- Search returns matching institutions
- Search is case-insensitive
- No results message if no matches found
- Clear search returns to full institution list

#### 2.4 Select Institution for Management

**File:** `tests/regression/admin/admin-institutions/select-institution.spec.ts`

**Steps:**

1. Login as administrator user
2. Click on an institution card from the list
3. Verify institution is selected (visual indication)
4. Verify checkbox is checked
5. Verify Edit button appears or becomes enabled
6. Select another institution and verify multi-select behavior

**Expected Results:**

- Clicking an institution card selects it
- Selected institution is highlighted or indicated
- Checkbox for selected institution is checked
- Edit button becomes available when institution is selected
- Multiple institutions can be selected if multi-select is supported

#### 2.5 Edit Institution - Access Edit Interface

**File:** `tests/regression/admin/admin-institutions/edit-institution-access.spec.ts`

**Steps:**

1. Login as administrator user
2. Select an institution from the list
3. Click Edit button
4. Verify navigation to institution edit screen
5. Verify institution configuration interface loads
6. Click Back button to return to list

**Expected Results:**

- Edit button is accessible after selecting institution
- Clicking Edit opens institution configuration screen
- Edit screen displays institution details
- Back button allows returning to institution list without saving

#### 2.6 Edit Institution - View Institution Identification

**File:** `tests/regression/admin/admin-institutions/institution-identification.spec.ts`

**Steps:**

1. Login as administrator user
2. Select and edit an institution
3. Verify 'Institution Identification' section header
4. Verify Full Name field is displayed and disabled
5. Verify Short Name field is displayed and disabled
6. Verify Identifier field is displayed and disabled
7. Verify all fields contain correct institution data

**Expected Results:**

- 'Institution Identification' section is displayed at top
- Three identification fields are shown: Full Name, Short Name, Identifier
- All three fields are disabled (non-editable) for data integrity
- Current institution name and identifiers display correctly
- Identification fields serve as reference during configuration

#### 2.7 Edit Institution - Manage Destination Institutions

**File:** `tests/regression/admin/admin-institutions/manage-destinations.spec.ts`

**Steps:**

1. Login as administrator user
2. Select and edit an institution
3. Locate 'Institution Destinations' section
4. Verify prompt: 'Add institution as destination:'
5. Type institution name in text field
6. Verify autocomplete suggestions appear (if applicable)
7. Click 'Add' button to add destination
8. Verify destination appears in list
9. Click 'Remove this item' on a destination
10. Verify destination is removed from list
11. Click Save to commit changes

**Expected Results:**

- 'Institution Destinations' section allows configuring transfer destinations
- Text input field for typing destination institution name
- Autocomplete or search suggests available institutions as user types
- 'Add' button adds selected institution to destination list
- Current destination institutions are listed
- Each destination has 'Remove this item' option
- Removing destination immediately updates list
- Changes save when Save button is clicked

#### 2.8 Edit Institution - Destination List Management

**File:** `tests/regression/admin/admin-institutions/view-destinations.spec.ts`

**Steps:**

1. Login as administrator user
2. Select institution that has existing destinations
3. Open institution edit screen
4. Verify destination institutions list
5. Verify each destination displays name clearly
6. Check for any additional destination information
7. Verify list is organized and readable

**Expected Results:**

- Existing destination institutions are clearly listed
- Each destination shows institution name
- Destination list is scrollable if many destinations exist
- Clicking on destination name may show details or allow inline editing
- Visual indicators distinguish active destinations

#### 2.9 Edit Institution - Manage Report Templates

**File:** `tests/regression/admin/admin-institutions/manage-report-templates.spec.ts`

**Steps:**

1. Login as administrator user
2. Select and edit an institution
3. Locate 'Institution Templates' section
4. Verify template selection dropdown/combobox
5. Click dropdown to view available templates
6. Select a template from dropdown
7. Click 'Add' button
8. Verify template appears in institution's template list
9. Click 'Remove this item' on a template
10. Verify template is removed from list
11. Click Save to commit changes

**Expected Results:**

- 'Institution Templates' section manages available report templates for institution
- Dropdown or combobox lists available report templates
- Templates include system templates: Case Documentation Report, Discharge Summary, HPI Report, SOAP Report, and potentially custom templates
- 'Add' button adds selected template to institution
- Current templates assigned to institution are listed
- Each template has 'Remove this item' option
- Removing template makes it unavailable for users in that institution
- Template changes save with Save button

#### 2.10 Edit Institution - Template List Display

**File:** `tests/regression/admin/admin-institutions/view-templates.spec.ts`

**Steps:**

1. Login as administrator user
2. Select institution with existing templates
3. Open institution edit screen
4. Verify template list displays
5. Verify each template name is shown
6. Check for template descriptions or additional info
7. Verify list organization

**Expected Results:**

- Currently assigned templates are clearly listed
- Template names are displayed (e.g., 'Case Documentation Report', 'SOAP Report')
- List shows which templates physicians at this institution can use
- Visual organization makes template management clear

#### 2.11 Edit Institution - Save Configuration Changes

**File:** `tests/regression/admin/admin-institutions/save-institution.spec.ts`

**Steps:**

1. Login as administrator user
2. Select and edit an institution
3. Make changes to destinations and/or templates
4. Click Save button
5. Verify save completes successfully
6. Verify confirmation message or behavior
7. Return to institution list
8. Re-open same institution
9. Verify changes were saved correctly

**Expected Results:**

- Save button is prominent at top of edit screen
- Clicking Save commits all institution changes (destinations and templates)
- Success message or confirmation indicates save completed
- Validation errors show if configuration is invalid
- After successful save, user may return to institution list or remain in edit mode
- Changes persist and are immediately active

#### 2.12 Edit Institution - Cancel or Back Without Saving

**File:** `tests/regression/admin/admin-institutions/cancel-institution-edit.spec.ts`

**Steps:**

1. Login as administrator user
2. Select and edit an institution
3. Make some configuration changes
4. Click Back button without saving
5. Verify warning prompt if unsaved changes exist
6. Confirm exit without saving
7. Verify return to institution list
8. Re-open same institution
9. Verify changes were not saved

**Expected Results:**

- Back button allows exiting edit screen
- If unsaved changes exist, warning prompt may appear
- Confirming exit without saving discards changes
- Canceling exit warning keeps user in edit mode
- Unsaved changes do not affect institution configuration

#### 2.13 Institution Configuration - Data Integrity

**File:** `tests/regression/admin/admin-institutions/institution-data-integrity.spec.ts`

**Steps:**

1. Login as administrator user
2. Edit an institution
3. Verify identification fields are disabled
4. Attempt to edit them (should be impossible)
5. Make valid configuration changes
6. Save and verify data integrity
7. Check that patient data and studies remain intact

**Expected Results:**

- Institution name and identifier cannot be changed (data integrity)
- Only destinations and templates are configurable
- System prevents duplicate institution identifiers
- Configuration changes do not affect patient data or studies
- Institutions remain associated with correct DICOM nodes

#### 2.14 Multi-Institution Management

**File:** `tests/regression/admin/admin-institutions/multi-institution-ops.spec.ts`

**Steps:**

1. Login as administrator user
2. Click Select All checkbox
3. Verify all institutions on page are selected
4. Deselect Select All
5. Verify all institutions are deselected
6. Select multiple institutions individually
7. Check for bulk operation options (if available)
8. Test bulk operation if supported

**Expected Results:**

- Select All checkbox selects all institutions on current page
- Bulk operations may be available for multiple selections
- Deselecting institution removes it from selection
- Selection state is clear and visual
- Bulk edits or operations maintain data consistency

### 3. DICOM Node Management (CRITICAL PRIORITY)

**Seed:** `tests/admin_seed.spec.ts`

#### 3.1 View DICOM Nodes List

**File:** `tests/regression/admin/admin-dicom/view-dicom-nodes.spec.ts`

**Steps:**

1. Login as administrator user
2. Click on DICOM Nodes tab
3. Verify DICOM nodes list displays
4. Verify each node shows AET, host, port in card heading
5. Verify node description displays
6. Check pagination indicator
7. Verify New button is visible
8. Verify Search button is visible

**Expected Results:**

- DICOM Nodes tab is accessible from admin navigation
- Complete list of all configured DICOM nodes displays
- Each node card shows: AET@Host:Port format (e.g., 'ACAET@dcm4che.qa-encounterservices.com:11112')
- Node description/name is displayed
- Pagination controls are available for long node lists
- Select All checkbox allows multi-node selection
- New button allows creating new DICOM nodes
- Search button provides node search capability

#### 3.2 DICOM Node List Pagination

**File:** `tests/regression/admin/admin-dicom/dicom-pagination.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Verify multiple pages exist
4. Click Next button
5. Verify next page of nodes loads
6. Verify page indicator updates
7. Click Previous button
8. Verify navigation works correctly

**Expected Results:**

- Pagination works correctly for DICOM nodes
- Page indicator shows current and total pages (e.g., '1 of 5 page(s)')
- Next and Previous buttons navigate pages
- Node data loads correctly for each page

#### 3.3 Search DICOM Nodes

**File:** `tests/regression/admin/admin-dicom/search-dicom-nodes.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Click Search button
4. Enter search criteria (e.g., AET name)
5. Execute search
6. Verify matching nodes display
7. Clear search and verify full list

**Expected Results:**

- Search button opens DICOM node search dialog
- Search fields allow filtering by AET, host, port, or description
- Search returns matching nodes
- No results message if no matches
- Clear search returns full list

#### 3.4 Select DICOM Node for Management

**File:** `tests/regression/admin/admin-dicom/select-dicom-node.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Click on a DICOM node card
4. Verify node is selected
5. Verify checkbox is checked
6. Verify Edit, Delete, and Echo buttons appear
7. Select another node and verify multi-select

**Expected Results:**

- Clicking DICOM node card selects it
- Selected node is visually indicated
- Checkbox for selected node is checked
- Management buttons appear: Edit, Delete, Echo
- Multiple nodes can be selected for bulk operations

#### 3.5 Create New DICOM Node

**File:** `tests/regression/admin/admin-dicom/create-dicom-node.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Click New button
4. Verify DICOM node creation form appears
5. Fill in Node AET (e.g., 'TESTAET')
6. Fill in Node Host (e.g., 'dicom.example.com')
7. Fill in Node Port (e.g., '11112')
8. Fill in Description
9. Select or type Institution name
10. Optionally check 'Use Encrypted TLS Communication'
11. Click Save
12. Verify new node is created and appears in list

**Expected Results:**

- New button opens DICOM node creation form
- Required fields: Node AET, Node Host, Node Port, Description, Institution
- AET field accepts alphanumeric Application Entity Title
- Host field accepts hostname or IP address
- Port field accepts numeric port number (typically 11112 or 104)
- Description field provides friendly name for node
- Institution field associates node with institution (autocomplete)
- 'Use Encrypted TLS Communication' checkbox enables TLS
- Save button creates new DICOM node
- Validation ensures required fields are complete
- New node appears in DICOM nodes list

#### 3.6 Edit DICOM Node Configuration

**File:** `tests/regression/admin/admin-dicom/edit-dicom-node.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Select a DICOM node
4. Click Edit button
5. Verify edit form displays with current node data
6. Modify node configuration (e.g., change description)
7. Click Save
8. Verify changes are saved
9. Re-open node to verify changes persisted

**Expected Results:**

- Edit button opens node configuration screen
- All node fields are editable: AET, Host, Port, Description, Institution
- TLS encryption checkbox can be toggled
- Advanced Settings option available (may be disabled)
- Changes save with Save button
- Validation prevents invalid configurations
- Back button exits without saving

#### 3.7 DICOM Node - AET Configuration

**File:** `tests/regression/admin/admin-dicom/configure-aet.spec.ts`

**Steps:**

1. Login as administrator user
2. Create or edit a DICOM node
3. Enter Node AET
4. Verify AET field accepts valid format
5. Attempt duplicate AET and verify error
6. Attempt invalid characters and verify validation
7. Save with valid AET

**Expected Results:**

- Node AET (Application Entity Title) is required
- AET must be unique within the system
- AET typically 1-16 characters, alphanumeric
- Invalid AET format shows validation error
- AET is used for DICOM communication identification

#### 3.8 DICOM Node - Host and Port Configuration

**File:** `tests/regression/admin/admin-dicom/configure-host-port.spec.ts`

**Steps:**

1. Login as administrator user
2. Create or edit DICOM node
3. Enter Node Host (hostname or IP)
4. Enter Node Port (numeric)
5. Verify validation for valid formats
6. Test with invalid formats and verify errors
7. Save with valid host and port

**Expected Results:**

- Node Host accepts hostname (FQDN) or IP address
- Host field validates format
- Node Port accepts numeric port (1-65535)
- Common DICOM ports: 104, 11112
- Invalid port shows validation error
- Host and port combination must be reachable

#### 3.9 DICOM Node - Institution Association

**File:** `tests/regression/admin/admin-dicom/node-institution-association.spec.ts`

**Steps:**

1. Login as administrator user
2. Create or edit DICOM node
3. Locate Institution field
4. Type institution name
5. Verify autocomplete suggestions
6. Select institution from list
7. Save node with institution association
8. Verify institution assignment

**Expected Results:**

- DICOM node must be associated with an institution
- Institution field has autocomplete/search
- Typing institution name shows matching suggestions
- Selected institution links node to that institution's users
- Changing institution reassigns node access
- Institution association is required for save

#### 3.10 DICOM Node - TLS Encryption Configuration

**File:** `tests/regression/admin/admin-dicom/configure-tls.spec.ts`

**Steps:**

1. Login as administrator user
2. Create or edit DICOM node
3. Locate 'Use Encrypted TLS Communication' checkbox
4. Check the checkbox to enable TLS
5. Save node configuration
6. Verify TLS setting persists
7. Uncheck to disable TLS
8. Save and verify change

**Expected Results:**

- 'Use Encrypted TLS Communication' checkbox enables DICOM TLS
- Unchecked: standard unencrypted DICOM (default)
- Checked: DICOM communication uses TLS encryption
- TLS configuration ensures HIPAA compliance for network transmission
- Receiving DICOM node must also support TLS
- TLS setting saves with node configuration

#### 3.11 DICOM Node - Advanced Settings

**File:** `tests/regression/admin/admin-dicom/dicom-advanced-settings.spec.ts`

**Steps:**

1. Login as administrator user
2. Edit a DICOM node
3. Check 'Configure Advanced Settings' option status
4. If enabled, click to expand advanced options
5. Review available advanced configuration fields
6. Make advanced configuration changes if applicable
7. Save and verify advanced settings

**Expected Results:**

- 'Configure Advanced Settings' option is visible
- Advanced settings may be disabled for certain nodes or users
- If enabled, advanced settings allow: Timeout configuration, Transfer syntax preferences, SCP/SCU role settings, Character set configuration
- Advanced changes require technical DICOM knowledge
- Invalid advanced settings prevented by validation

#### 3.12 Delete DICOM Node

**File:** `tests/regression/admin/admin-dicom/delete-dicom-node.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Select a DICOM node (use test node)
4. Click Delete button
5. Verify confirmation prompt appears
6. Read warning about deletion impact
7. Confirm deletion
8. Verify node is removed from list
9. Verify deletion cannot be undone

**Expected Results:**

- Delete button is available after selecting node
- Delete prompts confirmation dialog
- Confirmation warns that deletion is permanent
- Warning indicates impact on routing rules or studies
- Confirming deletion removes node from system
- Deleted node no longer appears in list
- Deletion is logged for audit

#### 3.13 DICOM Echo - Test Node Connectivity

**File:** `tests/regression/admin/admin-dicom/dicom-echo-test.spec.ts`

**Steps:**

1. Login as administrator user
2. Navigate to DICOM Nodes tab
3. Select a DICOM node
4. Click Echo button
5. Wait for echo test to complete
6. Verify result message displays
7. If successful, verify success indication and response time
8. If failed, verify error message explains failure
9. Test with known-working node for baseline
10. Test with unreachable node to verify error handling

**Expected Results:**

- Echo button tests DICOM connectivity
- Echo sends DICOM C-ECHO request to selected node
- Successful echo shows success message with response time
- Failed echo shows error message with failure reason
- Echo result indicates: Connection successful/failed, Response time, Error details if failed
- Echo is non-destructive test (no data transfer)
- Echo verifies: Network connectivity, Node is listening, AET is correct, Port is open

#### 3.14 DICOM Echo - Connection Troubleshooting

**File:** `tests/regression/admin/admin-dicom/echo-troubleshooting.spec.ts`

**Steps:**

1. Login as administrator user
2. Create test DICOM node with intentional errors
3. Test with incorrect host - verify appropriate error
4. Test with incorrect port - verify port error
5. Test with incorrect AET - verify AET error
6. Test with unreachable host - verify timeout
7. Review error messages for troubleshooting guidance

**Expected Results:**

- Echo failures provide diagnostic information
- Common failure reasons identified: Host unreachable, Port closed/blocked, AET mismatch, Timeout, TLS misconfiguration
- Error messages guide troubleshooting
- Network and firewall issues can be detected

#### 3.15 DICOM Node Configuration - Data Validation

**File:** `tests/regression/admin/admin-dicom/dicom-validation.spec.ts`

**Steps:**

1. Login as administrator user
2. Attempt to create DICOM node with missing required fields
3. Verify validation errors prevent save
4. Enter invalid host format
5. Verify host validation error
6. Enter invalid port (e.g., 70000)
7. Verify port validation error
8. Enter duplicate AET
9. Verify uniqueness validation
10. Correct all errors and verify save succeeds

**Expected Results:**

- All required fields must be completed
- Field format validation prevents invalid entries
- Duplicate AET is not allowed
- Invalid hostname/IP rejected
- Port must be in valid range (1-65535)
- Save is blocked if validation fails
- Clear error messages indicate validation issues
