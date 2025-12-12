# eCloud Technician User Test Plan - Part 1

## Application Overview

This comprehensive test plan documents all features and functionality for the Technician user role in the eNcounterCloud PACS system. Technicians are responsible for image management, technical quality assurance, study processing, and supporting clinical workflows through technical expertise. This document enables the Product team to extract user stories and requirements for the legacy application. Part 1 covers Authentication, Clinical Dashboard, DICOM Viewer, and Technical Documentation functionality.

## Test Scenarios

### 1. Technician Authentication and Security (CRITICAL PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 1.1 Technician Login - Valid Credentials

**File:** `tests/regression/technician/technician-authentication/technician-login-valid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Verify the login page displays username and password fields
3. Enter valid technician username credentials
4. Enter valid technician password credentials
5. Click the 'Sign in' button
6. Verify successful redirect to technician dashboard (/admin)

**Expected Results:**

- Login page loads successfully with all required fields
- Technician credentials are accepted
- User is authenticated and redirected to technician dashboard (/admin/index.html)
- Technician dashboard displays with user's full name, role (Technician), and institution in header
- Technician-specific navigation tabs are visible: Pending, Reviewed, Shares, Study Search, Administration, Account
- Session is established with appropriate technician privileges

#### 1.2 Technician Login - Invalid Credentials

**File:** `tests/regression/technician/technician-authentication/technician-login-invalid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter invalid technician username
3. Enter invalid technician password
4. Click the 'Sign in' button
5. Verify appropriate error message
6. Verify user remains on login page without access

**Expected Results:**

- System displays clear error message for invalid credentials
- User is not authenticated
- User remains on login page
- No technician access is granted
- Error handling is consistent with other user roles

#### 1.3 EULA Acceptance - First Time Technician Login

**File:** `tests/regression/technician/technician-authentication/eula-acceptance.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter credentials for new technician user
3. Click the 'Sign in' button
4. Verify EULA dialog displays
5. Read EULA content
6. Click 'I Agree' button
7. Verify redirect to technician dashboard

**Expected Results:**

- EULA modal displays before dashboard access for new technicians
- EULA text is readable and complete
- User cannot access application without accepting EULA
- Clicking 'I Agree' records acceptance and allows dashboard access
- EULA acceptance is persisted for the technician account

#### 1.4 Technician Role Permissions Verification

**File:** `tests/regression/technician/technician-authentication/technician-permissions.spec.ts`

**Steps:**

1. Login as technician user
2. Verify technician dashboard navigation tabs
3. Verify access to Pending, Reviewed, Shares, Study Search
4. Verify access to Administration (patient management)
5. Confirm no access to system-level configuration
6. Verify technician-specific features are available

**Expected Results:**

- Technician has access to technical and clinical features
- Technician can manage image studies and patient data
- Technician can perform quality assurance functions
- Technician does NOT have system administration access (different from Administrator role)
- Role-based access control is enforced for technician scope

#### 1.5 Technician Session Management

**File:** `tests/regression/technician/technician-authentication/session-management.spec.ts`

**Steps:**

1. Login as technician user
2. Allow session to remain idle for extended period
3. Attempt to access protected resource
4. Verify session timeout behavior
5. Verify redirect to login page
6. Verify no cached technical data is accessible

**Expected Results:**

- Session timeout applies to technician accounts
- Technician is logged out after idle period
- Technical data is protected after logout
- Session management follows security best practices

### 2. Clinical Dashboard - Pending Studies (HIGH PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 2.1 Pending Studies - Technical Review Queue

**File:** `tests/regression/technician/technician-dashboard/pending-studies-display.spec.ts`

**Steps:**

1. Login as technician user
2. Verify default landing on Pending tab or navigate to it
3. Verify pending studies list displays
4. Verify each study card shows technical metadata
5. Check study thumbnails for image quality preview
6. Verify pagination controls
7. Test study card selection

**Expected Results:**

- Pending tab is default landing page or accessible for technicians
- Complete list of all pending (unreviewed) studies is displayed
- Each study card shows: Patient Name, Passcode, Consult Type/Description, Date and Time, Modality Type
- Study thumbnail images are displayed for technical preview
- Pagination controls are available if studies exceed page limit
- Select All checkbox allows multi-study technical operations

#### 2.2 Pending Studies - Technical Study Access

**File:** `tests/regression/technician/technician-dashboard/pending-study-access.spec.ts`

**Steps:**

1. Login as technician user
2. Navigate to Pending tab
3. Click on a study card
4. Verify navigation to DICOM viewer
5. Verify study loads correctly
6. Verify patient information accuracy
7. Verify series availability for analysis

**Expected Results:**

- Clicking study card opens DICOM viewer for technical review
- Correct study loads based on technician selection
- Patient header displays accurate patient information
- Study series are available for technical analysis
- Technician can perform quality assurance review

#### 2.3 Pending Studies - Queue Pagination

**File:** `tests/regression/technician/technician-dashboard/pending-pagination.spec.ts`

**Steps:**

1. Login as technician user
2. Verify multiple pages of pending studies exist
3. Navigate through study pages
4. Verify page indicators update correctly
5. Test pagination performance
6. Verify study data integrity across pages

**Expected Results:**

- Pagination works correctly for large study volumes
- Current page and total pages are accurately displayed
- Navigation between pages is smooth and responsive
- Study data loads efficiently for each page
- Technician can efficiently navigate through work queue

#### 2.4 Pending Studies - Empty Queue Handling

**File:** `tests/regression/technician/technician-dashboard/pending-empty-state.spec.ts`

**Steps:**

1. Login as technician user with no pending studies
2. Navigate to Pending tab
3. Verify empty state message
4. Verify interface remains functional
5. Check for alternative workflow options

**Expected Results:**

- Empty pending queue is handled gracefully
- Appropriate message indicates no pending studies
- Interface remains functional with no studies
- Technician can perform other tasks when queue is empty

### 3. Clinical Dashboard - Reviewed Studies (HIGH PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 3.1 Reviewed Studies - Technical Review History

**File:** `tests/regression/technician/technician-dashboard/reviewed-studies-display.spec.ts`

**Steps:**

1. Login as technician user
2. Click Reviewed tab
3. Verify reviewed studies list
4. Check review attribution for technician reviews
5. Verify review timestamps
6. Verify mixed reviewer types (technicians, physicians, nurses)

**Expected Results:**

- Reviewed tab shows all studies that have been technically reviewed
- Each reviewed study displays: Patient info, Review attribution, Review timestamp
- Reviewer attribution shows technician name (e.g., 'Reviewed by: Anya Technician')
- Review timestamps are accurate and complete
- Technician can view previous technical reviews

#### 3.2 Reviewed Studies - Post-Review Analysis

**File:** `tests/regression/technician/technician-dashboard/reviewed-study-access.spec.ts`

**Steps:**

1. Login as technician user
2. Navigate to Reviewed tab
3. Click on a reviewed study
4. Verify DICOM viewer opens
5. Verify all study data is accessible
6. Check review status indicators

**Expected Results:**

- Reviewed studies remain accessible for quality assurance
- Studies open in DICOM viewer when selected
- All technical data and images are preserved
- Review status is maintained and visible
- Technician can perform post-review analysis

#### 3.3 Reviewed Studies - Quality Assurance Workflow

**File:** `tests/regression/technician/technician-dashboard/reviewed-studies-management.spec.ts`

**Steps:**

1. Login as technician user
2. Review list of previously reviewed studies
3. Filter or search reviewed studies if available
4. Verify review history tracking
5. Check quality assurance capabilities

**Expected Results:**

- Reviewed studies list supports technician workflow
- Search and filter options work for reviewed studies
- Historical review data is preserved
- Technician can track their review history

### 4. DICOM Viewer - Technical Image Analysis (CRITICAL PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 4.1 DICOM Viewer - Patient Information Header

**File:** `tests/regression/technician/technician-viewer/patient-identification.spec.ts`

**Steps:**

1. Login as technician user
2. Open any study from Pending or Reviewed
3. Verify patient header displays at top of viewer
4. Check patient name format and accuracy
5. Verify sex and DOB information
6. Confirm data matches study selection

**Expected Results:**

- Patient header displays comprehensive patient information
- Header shows: Patient Name (uppercase format), Patient Sex, Patient Date of Birth
- Patient information is accurate and matches study metadata
- Header provides clear patient identification for technician workflow

#### 4.2 DICOM Viewer - Technical Toolbar Access

**File:** `tests/regression/technician/technician-viewer/toolbar-functionality.spec.ts`

**Steps:**

1. Login as technician user
2. Open study in DICOM viewer
3. Verify all toolbar buttons are present
4. Check button icons and labels
5. Verify button responsiveness
6. Test hover states and click responses

**Expected Results:**

- Complete toolbar is visible with all technical functions
- Toolbar includes: Zoom, Enhance, Invert, Refresh, Report, Notes, Share, Header, Review, Attach, Exit
- All buttons have appropriate icons and labels
- Buttons are responsive and accessible for technical workflow
- Toolbar layout supports efficient image analysis

#### 4.3 DICOM Viewer - Series and Image Navigation

**File:** `tests/regression/technician/technician-viewer/series-navigation.spec.ts`

**Steps:**

1. Login as technician user
2. Open study with multiple series
3. Verify series list in left panel
4. Click different series to select them
5. Verify images load in main viewport
6. Check image metadata display

**Expected Results:**

- Series list displays in left panel with technical metadata
- Each series shows: Series name, Image count, Study ID, Patient ID, Modality
- Clicking series loads images in main viewing area
- Series information supports technical analysis
- Image metadata is displayed below images

#### 4.4 DICOM Viewer - Image Zoom and Magnification

**File:** `tests/regression/technician/technician-viewer/zoom-controls.spec.ts`

**Steps:**

1. Login as technician user
2. Open study and load images
3. Click Zoom button to open submenu
4. Test Zoom + functionality
5. Test Zoom - functionality
6. Test Fit to viewport
7. Test 1:1 pixel ratio
8. Verify image quality preservation

**Expected Results:**

- Zoom submenu provides technical magnification options
- Zoom options include: Zoom +, Zoom -, Fit, 1:1
- Zoom operations maintain image quality
- Magnification changes are smooth and responsive
- Zoom functionality supports detailed technical analysis

#### 4.5 DICOM Viewer - Image Enhancement Tools

**File:** `tests/regression/technician/technician-viewer/image-enhancement.spec.ts`

**Steps:**

1. Login as technician user
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
- Enhancement tools support technical quality assessment

#### 4.6 DICOM Viewer - Image Polarity Inversion

**File:** `tests/regression/technician/technician-viewer/image-invert.spec.ts`

**Steps:**

1. Login as technician user
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

**File:** `tests/regression/technician/technician-viewer/image-refresh.spec.ts`

**Steps:**

1. Login as technician user
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

**File:** `tests/regression/technician/technician-viewer/multiframe-navigation.spec.ts`

**Steps:**

1. Login as technician user
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

### 5. Technical Documentation and Reporting (HIGH PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 5.1 Technical Reporting - Report Interface Access

**File:** `tests/regression/technician/technician-documentation/report-access.spec.ts`

**Steps:**

1. Login as technician user
2. Open study in DICOM viewer
3. Click Report button
4. Verify 'New Report' option
5. Verify 'View Reports' option
6. Test report interface accessibility

**Expected Results:**

- Report button provides access to technical documentation
- 'New Report' and 'View Reports' options are available
- Technician can create technical reports
- Report interface supports technician workflow

#### 5.2 Technical Reporting - Template Selection

**File:** `tests/regression/technician/technician-documentation/report-templates.spec.ts`

**Steps:**

1. Login as technician user
2. Open study and access reporting
3. Click 'New Report'
4. Verify template selection dialog
5. Check all available templates
6. Test template accessibility

**Expected Results:**

- Template selection dialog provides report options
- Templates include: Case Documentation Report, Discharge Summary, HPI Report, SOAP Report
- All templates are accessible to technicians
- Template selection supports technical documentation needs

#### 5.3 Technical Notes - Quality Assurance Documentation

**File:** `tests/regression/technician/technician-documentation/technical-notes.spec.ts`

**Steps:**

1. Login as technician user
2. Open study in DICOM viewer
3. Click Notes button
4. Enter technical observation note
5. Save note
6. Verify note persistence
7. Test note retrieval

**Expected Results:**

- Notes functionality provides technical annotation capability
- 'Write your note:' field accepts technical observations
- Save and Close buttons function correctly
- Notes are preserved with study
- Technical notes support quality assurance workflow

#### 5.4 Technical Review - Study Completion

**File:** `tests/regression/technician/technician-documentation/technical-review.spec.ts`

**Steps:**

1. Login as technician user
2. Open pending study
3. Click Review button
4. Read confirmation dialog
5. Complete review process
6. Verify study moves to reviewed list
7. Check review attribution

**Expected Results:**

- Review function allows technicians to mark studies as reviewed
- Confirmation dialog warns about permanent action
- Review attribution shows technician name
- Review timestamp is accurate
- Technical reviews are tracked in system

#### 5.5 Technical Attachments - Supporting Documentation

**File:** `tests/regression/technician/technician-documentation/technical-attachments.spec.ts`

**Steps:**

1. Login as technician user
2. Open study in DICOM viewer
3. Click Attach button
4. Test attachment functionality
5. Verify file association
6. Check attachment accessibility

**Expected Results:**

- Attach function supports technical file attachments
- Technicians can attach relevant technical files
- Attachments are properly associated with studies
- Attachment workflow supports technical documentation

### 6. Patient and Study Administration (MEDIUM PRIORITY)

**Seed:** `tests/technician_seed.spec.ts`

#### 6.1 Patient Administration - Technical Data Management

**File:** `tests/regression/technician/technician-admin/patient-administration.spec.ts`

**Steps:**

1. Login as technician user
2. Click Administration tab
3. Verify Patients tab access
4. Review patient list display
5. Check patient information completeness
6. Test patient selection

**Expected Results:**

- Administration tab provides patient management access
- Patients, Worklist, and View Studies tabs are available
- Patient list shows comprehensive patient information
- Technical staff can manage patient data

#### 6.2 Patient List - Technical Data Access

**File:** `tests/regression/technician/technician-admin/patient-list-management.spec.ts`

**Steps:**

1. Login as technician user
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

#### 6.3 Worklist Management - Technical Task Organization

**File:** `tests/regression/technician/technician-admin/worklist-management.spec.ts`

**Steps:**

1. Login as technician user
2. Navigate to Administration > Worklist
3. Verify worklist display
4. Check task organization
5. Test worklist functionality
6. Verify integration with patient data

**Expected Results:**

- Worklist tab provides technician task management
- Worklist items are organized for technical workflow
- Task prioritization supports technical operations
- Worklist integrates with study management

#### 6.4 Study Management - Technical Study Operations

**File:** `tests/regression/technician/technician-admin/study-management.spec.ts`

**Steps:**

1. Login as technician user
2. Navigate to Administration > View Studies
3. Verify study list display
4. Test study search capabilities
5. Check technical metadata
6. Verify study accessibility

**Expected Results:**

- View Studies provides comprehensive study access
- Studies are organized for technical review
- Study search and filter capabilities
- Technical metadata is displayed
