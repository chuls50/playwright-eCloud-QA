# eCloud Technology User Test Plan - Part 1

## Application Overview

This comprehensive test plan documents all features and functionality for the Technology user role in the eNcounterCloud PACS system. Technology users are responsible for system technology oversight, infrastructure monitoring, integration support, and technical system optimization within clinical workflows. This document enables the Product team to extract user stories and requirements for the legacy application. Part 1 covers Authentication, Clinical Dashboard, DICOM Viewer, and Technology Documentation functionality.

## Test Scenarios

### 1. Technology User Authentication and Security (CRITICAL PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 1.1 Technology User Login - Valid Credentials

**File:** `tests/regression/technology/technology-authentication/technology-login-valid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Verify the login page displays username and password fields
3. Enter valid technology user username credentials
4. Enter valid technology user password credentials
5. Click the 'Sign in' button
6. Verify successful redirect to technology dashboard (/admin)

**Expected Results:**

- Login page loads successfully with all required fields
- Technology user credentials are accepted
- User is authenticated and redirected to technology dashboard (/admin/index.html)
- Technology dashboard displays with user's full name, role (Technology), and institution in header
- Technology-specific navigation tabs are visible: Pending, Reviewed, Shares, Study Search, Administration, Account
- Session is established with appropriate technology user privileges

#### 1.2 Technology User Login - Invalid Credentials

**File:** `tests/regression/technology/technology-authentication/technology-login-invalid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter invalid technology username
3. Enter invalid technology password
4. Click the 'Sign in' button
5. Verify appropriate error message
6. Verify user remains on login page without access

**Expected Results:**

- System displays clear error message for invalid credentials
- User is not authenticated
- User remains on login page
- No technology user access is granted
- Error handling is consistent with other user roles

#### 1.3 EULA Acceptance - First Time Technology User Login

**File:** `tests/regression/technology/technology-authentication/eula-acceptance.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter credentials for new technology user
3. Click the 'Sign in' button
4. Verify EULA dialog displays
5. Read EULA content
6. Click 'I Agree' button
7. Verify redirect to technology dashboard

**Expected Results:**

- EULA modal displays before dashboard access for new technology users
- EULA text is readable and complete
- User cannot access application without accepting EULA
- Clicking 'I Agree' records acceptance and allows dashboard access
- EULA acceptance is persisted for the technology user account

#### 1.4 Technology User Role Permissions Verification

**File:** `tests/regression/technology/technology-authentication/technology-permissions.spec.ts`

**Steps:**

1. Login as technology user
2. Verify technology dashboard navigation tabs
3. Verify access to clinical support features
4. Verify access to technology administration
5. Confirm no access to system-level configuration
6. Verify technology-specific features are available

**Expected Results:**

- Technology user has access to technology-focused features
- Technology user can manage system technology aspects
- Technology user can support clinical operations
- Technology user does NOT have system administration access (different from Administrator role)
- Role-based access control is enforced for technology scope

#### 1.5 Technology User Session Management

**File:** `tests/regression/technology/technology-authentication/session-management.spec.ts`

**Steps:**

1. Login as technology user
2. Allow session to remain idle for extended period
3. Attempt to access protected resource
4. Verify session timeout behavior
5. Verify redirect to login page
6. Verify no cached technology data is accessible

**Expected Results:**

- Session timeout applies to technology user accounts
- Technology user is logged out after idle period
- Technology data is protected after logout
- Session management follows security best practices

### 2. Clinical Dashboard - Pending Studies (HIGH PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 2.1 Pending Studies - Technology Support Queue

**File:** `tests/regression/technology/technology-dashboard/pending-studies-display.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Pending tab
3. Verify pending studies list displays
4. Verify each study card shows technology-relevant metadata
5. Check study thumbnails for system preview
6. Verify pagination controls
7. Test study card accessibility

**Expected Results:**

- Pending tab is accessible for technology users
- Complete list of all pending (unreviewed) studies is displayed
- Each study card shows: Patient Name, Passcode, Consult Type/Description, Date and Time, Modality Type
- Study thumbnail images are displayed for technology preview
- Pagination controls are available if studies exceed page limit
- Technology users can access studies for technical support

#### 2.2 Pending Studies - Technology Study Access

**File:** `tests/regression/technology/technology-dashboard/pending-study-access.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Pending tab
3. Click on a study card
4. Verify navigation to DICOM viewer
5. Verify study loads correctly
6. Verify patient information accuracy
7. Verify series availability for technology analysis

**Expected Results:**

- Clicking study card opens DICOM viewer for technology review
- Correct study loads based on technology user selection
- Patient header displays accurate patient information
- Study series are available for technology analysis
- Technology user can perform system support review

#### 2.3 Pending Studies - Queue Pagination

**File:** `tests/regression/technology/technology-dashboard/pending-pagination.spec.ts`

**Steps:**

1. Login as technology user
2. Verify multiple pages of pending studies exist
3. Navigate through study pages
4. Verify page indicators update correctly
5. Test pagination performance
6. Verify study data integrity across pages

**Expected Results:**

- Pagination works correctly for technology workflows
- Current page and total pages are accurately displayed
- Navigation between pages is smooth and responsive
- Study data loads efficiently for each page
- Technology user can efficiently navigate through support queue

#### 2.4 Pending Studies - Empty Queue Handling

**File:** `tests/regression/technology/technology-dashboard/pending-empty-state.spec.ts`

**Steps:**

1. Login as technology user with no pending studies
2. Navigate to Pending tab
3. Verify empty state message
4. Verify interface remains functional
5. Check for alternative workflow options

**Expected Results:**

- Empty pending queue is handled gracefully
- Appropriate message indicates no pending studies
- Interface remains functional with no studies
- Technology user can perform other tasks when queue is empty

### 3. Clinical Dashboard - Reviewed Studies (HIGH PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 3.1 Reviewed Studies - Technology Review History

**File:** `tests/regression/technology/technology-dashboard/reviewed-studies-display.spec.ts`

**Steps:**

1. Login as technology user
2. Click Reviewed tab
3. Verify reviewed studies list
4. Check review attribution including technology user reviews
5. Verify review timestamps
6. Verify mixed reviewer types visibility

**Expected Results:**

- Reviewed tab shows all studies that have been reviewed
- Each reviewed study displays: Patient info, Review attribution, Review timestamp
- Reviewer attribution may show technology user name when technology user reviews
- Review timestamps are accurate and complete
- Technology user can view review history for support purposes

#### 3.2 Reviewed Studies - Post-Review Technology Analysis

**File:** `tests/regression/technology/technology-dashboard/reviewed-study-access.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Reviewed tab
3. Click on a reviewed study
4. Verify DICOM viewer opens
5. Verify all study data is accessible
6. Check review status indicators

**Expected Results:**

- Reviewed studies remain accessible for technology support
- Studies open in DICOM viewer when selected
- All technical data and images are preserved
- Review status is maintained and visible
- Technology user can perform post-review analysis

#### 3.3 Reviewed Studies - Technology Performance Monitoring

**File:** `tests/regression/technology/technology-dashboard/reviewed-studies-management.spec.ts`

**Steps:**

1. Login as technology user
2. Review list of previously reviewed studies
3. Filter or search reviewed studies if available
4. Verify review history tracking
5. Check technology performance monitoring capabilities

**Expected Results:**

- Reviewed studies list supports technology workflow
- Search and filter options work for reviewed studies
- Historical review data is preserved
- Technology user can track system review performance

### 4. DICOM Viewer - Technology System Analysis (CRITICAL PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 4.1 DICOM Viewer - Patient Information Header

**File:** `tests/regression/technology/technology-viewer/patient-identification.spec.ts`

**Steps:**

1. Login as technology user
2. Open any study from Pending or Reviewed
3. Verify patient header displays at top of viewer
4. Check patient name format and accuracy
5. Verify sex and DOB information
6. Confirm data matches study selection

**Expected Results:**

- Patient header displays comprehensive patient information
- Header shows: Patient Name (uppercase format), Patient Sex, Patient Date of Birth
- Patient information is accurate and matches study metadata
- Header provides clear patient identification for technology workflow

#### 4.2 DICOM Viewer - Technology Toolbar Access

**File:** `tests/regression/technology/technology-viewer/toolbar-functionality.spec.ts`

**Steps:**

1. Login as technology user
2. Open study in DICOM viewer
3. Verify all toolbar buttons are present
4. Check button icons and labels
5. Verify button responsiveness
6. Test hover states and click responses

**Expected Results:**

- Complete toolbar is visible with all technology functions
- Toolbar includes: Zoom, Enhance, Invert, Refresh, Report, Notes, Share, Header, Review, Attach, Exit
- All buttons have appropriate icons and labels
- Buttons are responsive and accessible for technology workflow
- Toolbar layout supports efficient technology analysis

#### 4.3 DICOM Viewer - Series and Image Navigation

**File:** `tests/regression/technology/technology-viewer/series-navigation.spec.ts`

**Steps:**

1. Login as technology user
2. Open study with multiple series
3. Verify series list in left panel
4. Click different series to select them
5. Verify images load in main viewport
6. Check image metadata display

**Expected Results:**

- Series list displays in left panel with technology metadata
- Each series shows: Series name, Image count, Study ID, Patient ID, Modality
- Clicking series loads images in main viewing area
- Series information supports technology analysis
- Image metadata is displayed for technology review

#### 4.4 DICOM Viewer - Image Zoom and Magnification

**File:** `tests/regression/technology/technology-viewer/zoom-controls.spec.ts`

**Steps:**

1. Login as technology user
2. Open study and load images
3. Click Zoom button to open submenu
4. Test Zoom + functionality
5. Test Zoom - functionality
6. Test Fit to viewport
7. Test 1:1 pixel ratio
8. Verify image quality preservation

**Expected Results:**

- Zoom submenu provides technology magnification options
- Zoom options include: Zoom +, Zoom -, Fit, 1:1
- Zoom operations maintain image quality
- Magnification changes are smooth and responsive
- Zoom functionality supports detailed technology analysis

#### 4.5 DICOM Viewer - Image Enhancement Tools

**File:** `tests/regression/technology/technology-viewer/image-enhancement.spec.ts`

**Steps:**

1. Login as technology user
2. Open study and load images
3. Click Enhance button
4. Adjust Contrast slider
5. Adjust Brightness slider
6. Verify real-time image changes
7. Check numeric value updates

**Expected Results:**

- Enhance panel provides image optimization tools
- Contrast and Brightness sliders with real-time adjustment
- Numeric values update with slider movement
- Image adjustments are non-destructive
- Enhancement tools support technology quality assessment

#### 4.6 DICOM Viewer - Image Polarity Inversion

**File:** `tests/regression/technology/technology-viewer/image-invert.spec.ts`

**Steps:**

1. Login as technology user
2. Open study and load images
3. Click Invert button
4. Verify image polarity changes
5. Click Invert again to toggle back
6. Test multiple invert operations

**Expected Results:**

- Invert function toggles image polarity
- Black becomes white and white becomes black
- Invert is immediate and responsive
- Toggle functionality works reliably
- Invert supports different image types and contrast needs

#### 4.7 DICOM Viewer - Image Reset and Refresh

**File:** `tests/regression/technology/technology-viewer/image-refresh.spec.ts`

**Steps:**

1. Login as technology user
2. Open study and apply image modifications
3. Click Refresh button
4. Verify all modifications are reset
5. Confirm image returns to original state
6. Test refresh multiple times

**Expected Results:**

- Refresh button resets all image modifications
- Zoom, brightness, contrast, and invert are reset
- Image returns to original unmodified state
- Reset is immediate and complete
- Refresh supports clean slate for re-analysis

#### 4.8 DICOM Viewer - Multi-Frame Image Navigation

**File:** `tests/regression/technology/technology-viewer/multiframe-navigation.spec.ts`

**Steps:**

1. Login as technology user
2. Open study with multi-frame images
3. Navigate through image frames
4. Verify image counter updates
5. Test forward and backward navigation
6. Check navigation performance

**Expected Results:**

- Multi-frame images navigate smoothly
- Image counter shows current/total position
- Navigation controls are responsive
- Frame transitions are smooth
- Multi-frame support enables dynamic image review

### 5. Technology Documentation and Reporting (HIGH PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 5.1 Technology Reporting - Report Interface Access

**File:** `tests/regression/technology/technology-documentation/report-access.spec.ts`

**Steps:**

1. Login as technology user
2. Open study in DICOM viewer
3. Click Report button
4. Verify 'New Report' option
5. Test report interface accessibility

**Expected Results:**

- Report button provides access to technology documentation
- 'New Report' option is available
- Technology user can create technology-related reports
- Report interface supports technology workflow

#### 5.2 Technology Reporting - Template Selection

**File:** `tests/regression/technology/technology-documentation/report-templates.spec.ts`

**Steps:**

1. Login as technology user
2. Open study and access reporting
3. Click 'New Report'
4. Verify template selection dialog
5. Check all available templates
6. Test template accessibility

**Expected Results:**

- Template selection dialog provides report options
- Templates include: Case Documentation Report, Discharge Summary, HPI Report, SOAP Report
- All templates are accessible to technology users
- Template selection supports technology documentation needs

#### 5.3 Technology Notes - System Analysis Documentation

**File:** `tests/regression/technology/technology-documentation/technology-notes.spec.ts`

**Steps:**

1. Login as technology user
2. Open study in DICOM viewer
3. Click Notes button
4. Enter technology observation note
5. Save note
6. Verify note persistence
7. Test note retrieval

**Expected Results:**

- Notes functionality provides technology annotation capability
- 'Write your note:' field accepts technology observations
- Save and Close buttons function correctly
- Notes are preserved with study
- Technology notes support system analysis workflow

#### 5.4 Technology Review - Study Completion

**File:** `tests/regression/technology/technology-documentation/technology-review.spec.ts`

**Steps:**

1. Login as technology user
2. Open pending study
3. Click Review button
4. Read confirmation dialog
5. Complete review process
6. Verify study moves to reviewed list
7. Check review attribution

**Expected Results:**

- Review function allows technology users to mark studies as reviewed
- Confirmation dialog warns about permanent action
- Review attribution shows technology user name
- Review timestamp is accurate
- Technology reviews are tracked in system

#### 5.5 Technology Attachments - Supporting Documentation

**File:** `tests/regression/technology/technology-documentation/technology-attachments.spec.ts`

**Steps:**

1. Login as technology user
2. Open study in DICOM viewer
3. Click Attach button
4. Test attachment functionality
5. Verify file association
6. Check attachment accessibility

**Expected Results:**

- Attach function supports technology file attachments
- Technology users can attach relevant technology files
- Attachments are properly associated with studies
- Attachment workflow supports technology documentation

### 6. Patient and Study Administration (MEDIUM PRIORITY)

**Seed:** `tests/technology_seed.spec.ts`

#### 6.1 Patient Administration - Technology Data Management

**File:** `tests/regression/technology/technology-admin/patient-administration.spec.ts`

**Steps:**

1. Login as technology user
2. Click Administration tab
3. Verify Patients tab access
4. Review patient list display
5. Check patient information completeness
6. Test patient selection

**Expected Results:**

- Administration tab provides patient management access
- Patients, Worklist, and View Studies tabs are available
- Patient list shows comprehensive patient information
- Technology staff can manage patient data for technology support

#### 6.2 Patient List - Technology Data Access

**File:** `tests/regression/technology/technology-admin/patient-list-management.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Administration > Patients
3. Verify patient list information
4. Test 'New' patient button
5. Test Search functionality
6. Verify pagination controls

**Expected Results:**

- Patient list displays: Names, IDs, DOB, Gender, Study counts
- 'New' button allows patient creation
- Search function enables patient lookup
- Select All checkbox supports bulk operations
- Pagination handles large patient datasets

#### 6.3 Worklist Management - Technology Task Organization

**File:** `tests/regression/technology/technology-admin/worklist-management.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Administration > Worklist
3. Verify worklist display
4. Check task organization
5. Test worklist functionality
6. Verify integration with patient data

**Expected Results:**

- Worklist tab provides technology task management
- Worklist items are organized for technology workflow
- Task prioritization supports technology operations
- Worklist integrates with study management

#### 6.4 Study Management - Technology Study Operations

**File:** `tests/regression/technology/technology-admin/study-management.spec.ts`

**Steps:**

1. Login as technology user
2. Navigate to Administration > View Studies
3. Verify study list display
4. Test study search capabilities
5. Check technology metadata
6. Verify study accessibility

**Expected Results:**

- View Studies provides comprehensive study access
- Studies are organized for technology review
- Study search and filter capabilities
- Technology metadata is displayed
