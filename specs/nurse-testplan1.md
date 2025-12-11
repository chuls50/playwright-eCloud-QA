# eCloud Nurse User Test Plan - Part 1

## Application Overview

This comprehensive test plan documents all features and functionality for the Nurse user role in the eNcounterCloud PACS system. Nurses have clinical responsibilities similar to physicians but with their own professional licensing requirements and specialties. The nurse role provides full access to clinical workflows including study review, reporting, documentation, and patient management. This document enables the Product team to extract user stories and requirements for the legacy application. Part 1 covers Authentication, Clinical Dashboard, DICOM Viewer, and Patient Management functionality.

## Test Scenarios

### 1. 1. Nurse Authentication and Security (CRITICAL PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 1.1. Nurse Login - Valid Credentials

**File:** `tests/nurse-authentication/nurse-login-valid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Verify the login page displays username and password fields
3. Enter valid nurse username credentials (NURSE_USERNAME)
4. Enter valid nurse password credentials (NURSE_PASSWORD)
5. Click the 'Sign in' button
6. Verify successful redirect to nurse dashboard (/admin)

**Expected Results:**

- Login page loads successfully with all required fields visible
- Username field accepts nurse credentials
- Password field masks input characters
- Nurse is authenticated and redirected to /admin/index.html
- Nurse dashboard displays with user's full name, 'Nurse' role, and institution in header
- Session is established with appropriate nurse role permissions

#### 1.2 Nurse Login - Invalid Credentials

**File:** `tests/nurse-authentication/nurse-login-invalid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter invalid nurse username
3. Enter invalid nurse password
4. Click the 'Sign in' button
5. Verify appropriate error message is displayed
6. Verify user remains on login page

**Expected Results:**

- System displays clear error message indicating invalid credentials
- Nurse is not authenticated
- Nurse remains on login page
- Password field is cleared for security
- No sensitive information is revealed in error message

#### 1.3 EULA Acceptance on First Nurse Login

**File:** `tests/nurse-authentication/nurse-eula-acceptance.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter credentials for a new nurse user who has never logged in
3. Click the 'Sign in' button
4. Verify EULA dialog is displayed with full text
5. Click 'I Agree' button
6. Verify redirect to nurse dashboard

**Expected Results:**

- EULA modal displays before dashboard access for new nurse users
- EULA text is readable and complete
- Nurse cannot access application without accepting EULA
- Clicking 'I Agree' records acceptance and allows dashboard access
- EULA acceptance is persisted for the nurse account

#### 1.4 Nurse Session Management and Timeout

**File:** `tests/nurse-authentication/nurse-session-timeout.spec.ts`

**Steps:**

1. Login as nurse user
2. Verify dashboard is accessible
3. Allow session to remain idle for extended period
4. Attempt to access protected resource
5. Verify session timeout behavior

**Expected Results:**

- System enforces session timeout after idle period for nurse users
- Nurse is redirected to login page when session expires
- Appropriate message indicates session has expired
- PHI data is not exposed after nurse session timeout

#### 1.5 Nurse Role Permissions Verification

**File:** `tests/nurse-authentication/nurse-permissions.spec.ts`

**Steps:**

1. Login as nurse user
2. Verify nurse dashboard navigation tabs
3. Verify access to clinical features (study review)
4. Verify access to patient management features
5. Verify no access to system administration features
6. Confirm nurse-specific features are available

**Expected Results:**

- Nurse has access to clinical dashboard features (Pending, Reviewed, Shares, Study Search)
- Nurse can review studies and mark them as reviewed
- Nurse has full DICOM viewer access
- Nurse cannot access system administration features (Institutions, DICOM Nodes)
- Nurse has clinical administration access (Patients, Worklist)
- Role-based access control is enforced

### 2. Clinical Dashboard - Pending Studies (HIGH PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 2.1 Pending Studies - Display and Content

**File:** `tests/nurse-clinical/pending-studies-display.spec.ts`

**Steps:**

1. Login as nurse user
2. Verify default landing on Pending tab or click Pending tab
3. Verify pending studies are displayed in card format
4. Verify each study card shows required metadata
5. Check pagination indicator
6. Verify study thumbnail images are displayed

**Expected Results:**

- Pending tab is accessible from nurse dashboard navigation
- All pending (unreviewed) studies assigned to nurse's institution are listed
- Study cards display all required attributes: Patient Name, Passcode, Consult Type, Date/Time, Modality
- Patient names are visible and readable
- Date/time stamps are in readable format
- Modality types (OT, XC, etc.) are clearly labeled
- Pagination shows current page and total pages

#### 2.2 Pending Studies - Study Access and Navigation

**File:** `tests/nurse-clinical/pending-study-access.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Pending tab
3. Click on a study card from the pending studies list
4. Verify navigation to DICOM viewer
5. Verify selected study loads correctly
6. Verify patient information displays in viewer header

**Expected Results:**

- Study cards are clickable and respond to nurse interaction
- Clicking a study card opens the DICOM viewer
- Correct study is loaded based on nurse's selection
- Patient header displays correct information in viewer
- Study series are available for nurse to review

#### 2.3 Pending Studies - Pagination Functionality

**File:** `tests/nurse-clinical/pending-pagination.spec.ts`

**Steps:**

1. Login as nurse user with multiple pages of pending studies
2. Navigate to Pending tab
3. Verify current page indicator displays correctly
4. Click 'Next' button to navigate to next page
5. Verify page number updates and new studies are displayed
6. Click 'Previous' button to return to previous page

**Expected Results:**

- Pagination controls are visible when multiple pages exist
- Current page and total pages are accurately displayed
- Next button loads subsequent page of results
- Previous button loads prior page of results
- Button states update appropriately (disabled at boundaries)
- Study data loads correctly for each page

#### 2.4 Pending Studies - Empty State Handling

**File:** `tests/nurse-clinical/pending-empty-state.spec.ts`

**Steps:**

1. Login as nurse user with no pending studies
2. Navigate to Pending tab
3. Verify appropriate empty state message or indication
4. Verify pagination reflects no results

**Expected Results:**

- System handles empty state gracefully when no pending studies exist
- Nurse sees clear indication that no pending studies exist
- Pagination shows '0 of 0 page(s)'
- No error messages are displayed for normal empty state

### 3. Clinical Dashboard - Reviewed Studies (HIGH PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 3.1 Reviewed Studies - Display and Content

**File:** `tests/nurse-clinical/reviewed-studies-display.spec.ts`

**Steps:**

1. Login as nurse user
2. Click on Reviewed tab
3. Verify reviewed studies are displayed in card format
4. Verify each study card displays: Patient Name, Reviewer, Review Date/Time
5. Verify study thumbnail images are displayed
6. Check for studies reviewed by nurses vs other roles

**Expected Results:**

- Reviewed tab is accessible from nurse dashboard navigation
- All reviewed studies are listed in the tab
- Study cards show complete review metadata
- Reviewer name is displayed with role identification (e.g., 'CodyNurse2')
- Review timestamp is shown in readable format
- Original study date/time is preserved
- Studies reviewed by nurses are properly tracked

#### 3.2 Reviewed Studies - Post-Review Access

**File:** `tests/nurse-clinical/reviewed-study-access.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Reviewed tab
3. Click on a reviewed study card
4. Verify navigation to DICOM viewer
5. Verify reviewed study loads with all data
6. Verify review status indicators

**Expected Results:**

- Reviewed studies remain accessible after nurse review
- Study opens in DICOM viewer when clicked
- All study data including images, reports, and notes are accessible
- Review status is maintained and visible
- Nurse can view previously reviewed studies

#### 3.3 Reviewed Studies - Filtering and Search

**File:** `tests/nurse-clinical/reviewed-studies-filter.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Reviewed tab
3. Verify list of reviewed studies
4. Check for any available filter or search options
5. Apply filters if available
6. Verify filtered results display correctly

**Expected Results:**

- Reviewed studies list is complete and accurate
- Any available filters function correctly for nurse role
- Search or filter reduces result set appropriately
- Clearing filters restores full reviewed studies list

### 4. DICOM Viewer - Clinical Image Review (CRITICAL PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 4.1 DICOM Viewer - Patient Header Information

**File:** `tests/nurse-dicom/patient-header-display.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study from Pending tab
3. Verify patient header displays at top of viewer
4. Verify header shows: Patient Name, Sex, DOB
5. Verify information accuracy

**Expected Results:**

- Patient header is prominently displayed at top of viewer
- Patient name appears in correct format (e.g., 'DDOCS PATIENT')
- Sex and DOB are displayed accurately
- All patient information matches study metadata
- Header information is clear and readable for nurse users

#### 4.2 DICOM Viewer - Toolbar Button Access

**File:** `tests/nurse-dicom/toolbar-accessibility.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study from Pending tab
3. Verify viewer toolbar displays all expected buttons
4. Verify all buttons have visible icons and labels
5. Test button hover states and clickability

**Expected Results:**

- Toolbar is visible below patient header
- All 11 buttons are present: Zoom, Enhance, Invert, Refresh, Report, Notes, Share, Header, Review, Attach, Exit
- Button icons are visible and appropriate for function
- Buttons are clickable and respond to nurse interaction
- Button layout is organized and user-friendly

#### 4.3 DICOM Viewer - Series Selection and Image Display

**File:** `tests/nurse-dicom/series-navigation.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study with multiple series
3. Verify series list is displayed in left panel
4. Click on a series to select it
5. Verify images from selected series load in main viewing area
6. Verify image metadata displays below image

**Expected Results:**

- Series list is visible in left panel of viewer
- Each series shows complete metadata: Series name, Image count, IDs, Modality
- Thumbnail image may be shown for each series
- Clicking a series makes it active and loads images for nurse review
- Main viewport displays the selected series images
- Image metadata overlay shows technical details

#### 4.4 DICOM Viewer - Multi-frame Navigation

**File:** `tests/nurse-dicom/image-navigation.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study with multiple images in a series
3. Verify image navigation controls are available
4. Use navigation to move through images
5. Verify image counter updates correctly
6. Verify smooth image transitions

**Expected Results:**

- Multi-image series displays navigation controls
- Nurse can navigate forward and backward through image stack
- Image counter accurately reflects current position
- Images load without significant delay
- Navigation is intuitive and responsive for clinical use

#### 4.5 DICOM Viewer - Zoom Controls for Clinical Review

**File:** `tests/nurse-dicom/zoom-functionality.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study and select a series with images
3. Click the Zoom button on toolbar
4. Verify zoom submenu appears with options
5. Test each zoom option: Zoom +, Zoom -, Fit, 1:1
6. Verify image quality and positioning

**Expected Results:**

- Zoom button opens submenu with 4 zoom options
- Zoom + increases image magnification
- Zoom - decreases image magnification
- Fit scales image to fill viewport while maintaining aspect ratio
- 1:1 displays image at native resolution
- Zoom operations maintain image center or focus point
- Image quality is preserved during zoom operations

#### 4.6 DICOM Viewer - Image Enhancement Controls

**File:** `tests/nurse-dicom/image-enhancement.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study and load an image
3. Click the Enhance button on toolbar
4. Verify enhance panel appears with sliders
5. Adjust Contrast and Brightness sliders
6. Verify real-time image updates
7. Reset adjustments and verify original state

**Expected Results:**

- Enhance panel displays Contrast and Brightness sliders
- Each slider has numeric input field showing current value
- Dragging sliders adjusts image in real-time
- Numeric values update to match slider position
- Changes apply immediately to visible image
- Image adjustments are non-destructive (can be reset)
- Enhancement controls support clinical image interpretation

#### 4.7 DICOM Viewer - Invert Functionality

**File:** `tests/nurse-dicom/image-inversion.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study and load an image
3. Click the Invert button on toolbar
4. Verify image colors/grayscale is inverted
5. Click Invert again to toggle back
6. Verify image returns to original display

**Expected Results:**

- Invert button toggles image polarity
- Black becomes white and white becomes black
- Invert is immediate and responsive
- Toggling invert multiple times works correctly
- Invert state is maintained when navigating between images
- Invert function supports clinical review needs

#### 4.8 DICOM Viewer - Refresh and Reset

**File:** `tests/nurse-dicom/refresh-reset.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study and apply some image adjustments
3. Click the Refresh button on toolbar
4. Verify all image adjustments are reset to default
5. Verify image returns to original display state

**Expected Results:**

- Refresh button resets all image manipulations
- Zoom level returns to Fit or default
- Brightness and contrast reset to 0
- Invert state is removed if applied
- Image displays in original unmodified state
- Series selection is maintained

### 5. Clinical Documentation - Reports and Notes (HIGH PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 5.1 Clinical Reports - Access and Template Selection

**File:** `tests/nurse-clinical/report-access.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study in DICOM viewer
3. Click Report button on toolbar
4. Verify 'New Report' option appears
5. Click 'New Report'
6. Verify template selection dialog displays

**Expected Results:**

- Report button is accessible from DICOM viewer toolbar
- Clicking Report shows 'New Report' option
- New Report opens template selection dialog
- All report templates available to nurses are displayed
- Template selection is clear and functional

#### 5.2 Clinical Reports - Template Availability

**File:** `tests/nurse-clinical/report-templates.spec.ts`

**Steps:**

1. Login as nurse user
2. Open study and access New Report
3. Verify Case Documentation Report template
4. Verify Discharge Summary template
5. Verify HPI Report template
6. Verify SOAP Report template
7. Test template selection functionality

**Expected Results:**

- All clinical report templates are available: Case Documentation Report, Discharge Summary, HPI Report, SOAP Report
- Each template displays with clear heading and description
- Templates are clickable and selectable
- Template selection leads to report creation interface
- Nurses have same template access as physicians for clinical documentation

#### 5.3 Clinical Notes - Creation and Management

**File:** `tests/nurse-clinical/notes-functionality.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study in DICOM viewer
3. Click Notes button on toolbar
4. Verify notes interface displays
5. Test note writing capability
6. Verify Save and Close functionality

**Expected Results:**

- Notes button is accessible from DICOM viewer toolbar
- Clicking Notes opens note creation/viewing interface
- Text area is available for writing notes
- Save and Close buttons are functional
- Notes interface is intuitive for clinical documentation

#### 5.4 Study Review - Mark as Reviewed by Nurse

**File:** `tests/nurse-clinical/study-review.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study in DICOM viewer
3. Click Review button on toolbar
4. Verify review confirmation dialog
5. Test 'Cancel' to exit without reviewing
6. Test 'Okay' to mark as reviewed
7. Verify nurse's name appears as reviewer

**Expected Results:**

- Review button opens review confirmation dialog
- Dialog asks confirmation to mark study as reviewed
- Warning states action cannot be undone
- 'Okay' button marks study as reviewed by nurse
- 'Cancel' button exits without reviewing
- Reviewed studies show nurse's name as reviewer

#### 5.5 Study Sharing - Clinical Collaboration

**File:** `tests/nurse-clinical/study-sharing.spec.ts`

**Steps:**

1. Login as nurse user
2. Open a study in DICOM viewer
3. Click Share button on toolbar
4. Verify Share dialog with Transfer and Referral options
5. Test sharing functionality
6. Verify nurse can initiate study transfers

**Expected Results:**

- Share button is accessible to nurse users
- Share dialog displays Transfer and Referral options
- Both sharing options are functional for nurses
- Nurses can share studies to other institutions
- Share functionality supports clinical collaboration

### 6. Patient Management - Clinical Administration (MEDIUM PRIORITY)

**Seed:** `tests/nurse_seed.spec.ts`

#### 6.1 Patient Management - Patient List Access

**File:** `tests/nurse-admin/patient-list-management.spec.ts`

**Steps:**

1. Login as nurse user
2. Click Administration tab
3. Verify Patients, Worklist, View Studies options
4. Click Patients tab
5. Verify patient list displays with complete information
6. Check pagination and selection controls

**Expected Results:**

- Administration tab is accessible from nurse dashboard
- Patients, Worklist, View Studies tabs are available
- Patients tab shows comprehensive patient list
- Each patient entry shows: Name, ID, DOB, Gender, Study Count
- Pagination controls manage large patient lists
- Select All checkbox enables bulk operations

#### 6.2 Patient Management - Create and Search Operations

**File:** `tests/nurse-admin/patient-operations.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Administration > Patients
3. Verify 'New' button for patient creation
4. Test Search functionality
5. Test patient selection
6. Verify bulk operation capabilities

**Expected Results:**

- New button is available for patient creation
- Search functionality allows patient lookup
- Patient search supports multiple criteria
- Patient selection enables individual patient management
- Bulk operations may be available with Select All

#### 6.3 Worklist Management - Clinical Task List

**File:** `tests/nurse-admin/worklist-access.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Administration > Worklist
3. Verify Worklist Items display
4. Check for scheduled procedures or tasks
5. Test worklist navigation and management

**Expected Results:**

- Worklist tab is accessible from Administration
- Worklist shows items relevant to nurse workflow
- Worklist may display scheduled procedures or pending tasks
- Navigation between worklist pages functions correctly

#### 6.4 View Studies - Alternative Study Access

**File:** `tests/nurse-admin/view-studies.spec.ts`

**Steps:**

1. Login as nurse user
2. Navigate to Administration > View Studies
3. Verify study display and organization
4. Compare with main Pending tab view
5. Test navigation and filtering capabilities

**Expected Results:**

- View Studies tab provides alternative study view
- Studies display may differ from main Pending tab
- Pagination and navigation work correctly
- View may show studies from different perspective
