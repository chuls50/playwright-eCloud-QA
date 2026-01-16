# eCloud Physician User Test Plan - Part 1

## Application Overview

This comprehensive test plan documents all features and functionality for the Physician user role in the eNcounterCloud PACS system. eCloud is an FDA-accredited, HIPAA-compliant cloud-based medical image archiving and management system with AES-256 encryption. This document is structured to enable the Product team to extract user stories and requirements for a legacy application that requires backward documentation. Part 1 covers Authentication, Security, Clinical Dashboard, and DICOM Viewer functionality.

## Test Scenarios

### 1. 1. Authentication and Security (CRITICAL PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 1.1 Physician Login - Valid Credentials

**File:** `tests/regression/clinician/physician/authentication/physician-login-valid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Verify the login page displays username and password fields
3. Enter valid physician username credentials
4. Enter valid physician password credentials
5. Click the 'Sign in' button
6. Verify successful redirect to physician dashboard (/admin)

**Expected Results:**

- Login page loads successfully with all required fields visible
- Username field accepts alphanumeric input
- Password field masks input characters
- User is authenticated and redirected to /admin/index.html
- Physician dashboard displays with user's full name and institution in header
- Session is established with appropriate physician role permissions

#### 1.2 Physician Login - Invalid Credentials

**File:** `tests/regression/physician/authentication/physician-login-invalid.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter invalid username credentials
3. Enter invalid password credentials
4. Click the 'Sign in' button
5. Verify appropriate error message is displayed
6. Verify user remains on login page

**Expected Results:**

- System displays clear error message indicating invalid credentials
- User is not authenticated
- User remains on login page
- Password field is cleared for security
- No sensitive information is revealed in error message

#### 1.3 EULA Acceptance on First Login

**File:** `tests/regression/physician/authentication/eula-first-login.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter credentials for a new user who has never logged in
3. Click the 'Sign in' button
4. Verify EULA dialog is displayed with full text
5. Verify 'I Agree' and 'Cancel' buttons are present
6. Click 'I Agree' button
7. Verify redirect to physician dashboard

**Expected Results:**

- EULA modal displays before dashboard access
- EULA text is readable and complete (SUBSCRIPTION-EULA content)
- User cannot access application without accepting EULA
- Clicking 'I Agree' records acceptance and allows dashboard access
- EULA acceptance is persisted for the user account

#### 1.4 EULA Decline on First Login

**File:** `tests/regression/physician/authentication/eula-decline.spec.ts`

**Steps:**

1. Navigate to the eCloud application login page
2. Enter credentials for a new user
3. Click the 'Sign in' button
4. Verify EULA dialog is displayed
5. Click 'Cancel' button on EULA dialog
6. Verify user is logged out and returned to login page

**Expected Results:**

- Clicking 'Cancel' prevents dashboard access
- User is returned to login page
- Session is terminated
- User must accept EULA on subsequent login attempt

#### 1.5 Session Management and Timeout

**File:** `tests/regression/physician/session-timeout.spec.ts`

**Steps:**

1. Login as physician user
2. Verify dashboard is accessible
3. Allow session to remain idle for extended period
4. Attempt to access protected resource
5. Verify session timeout behavior

**Expected Results:**

- System enforces session timeout after idle period
- User is redirected to login page when session expires
- Appropriate message indicates session has expired
- PHI data is not exposed after session timeout

#### 1.6 External Links - GlobalMed Website Navigation

**File:** `tests/regression/physician/authentication/external-links-globalmed.spec.ts`

**Steps:**

1. Navigate to the login page
2. Verify 'Send feedback' link is present and has correct href attribute (https://www.globalmed.com/contact-us/)
3. Verify 'Legal Information' link is present and has correct href attribute (https://www.globalmed.com/legal)
4. Verify 'Privacy Statement' link is present and has correct href attribute (https://www.globalmed.com/legal/privacy-statement)
5. Click each link and verify navigation to correct external page
6. Navigate back to login page after each link test

**Expected Results:**

- All external links are visible and clickable
- Links open correct GlobalMed pages
- Links maintain proper href attributes
- Navigation back to login page works correctly

#### 1.7 Social Media Links - External Platform Navigation

**File:** `tests/regression/physician/authentication/social-media-links.spec.ts`

**Steps:**

1. Navigate to the login page
2. Verify Facebook link is present with correct href (https://www.facebook.com/globalmed)
3. Verify Twitter link is present with correct href (https://twitter.com/GlobalMed_USA)
4. Verify YouTube link is present with correct href (https://www.youtube.com/user/GlobalMediaTelemed)
5. Verify LinkedIn link is present with correct href (https://www.linkedin.com/company/839991)
6. Click each social media link and verify navigation

**Expected Results:**

- All social media icons are visible
- Links navigate to correct social media platforms
- External links open in appropriate manner
- User can navigate back to login page

### 2. Clinical Dashboard - Pending Studies Tab (HIGH PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 2.1 Pending Tab - Display and Content Verification

**File:** `tests/regression/physician/clinical-dashboard/pending-tab-content.spec.ts`

**Steps:**

1. Login as physician user
2. Verify default landing on Pending tab or click Pending tab
3. Verify pending studies are displayed in card format
4. Verify each study card displays: Patient Name, Passcode, Consult Type/Description, Date and Time, Modality Type
5. Verify study thumbnail images are displayed
6. Verify pagination controls if studies exceed page limit

**Expected Results:**

- Pending tab is accessible from dashboard navigation
- All pending (unreviewed) studies are listed
- Study cards display all required attributes clearly
- Patient names are visible and readable
- Passcodes are displayed when available
- Study descriptions (e.g., 'Telemedicine Consult') are shown
- Date/time stamps are in readable format (MM/DD/YYYY HH:MM)
- Modality types (OT, XC, etc.) are clearly labeled
- Pagination shows current page and total pages (e.g., '1 of 2 page(s)')

#### 2.2 Pending Tab - Study Card Navigation

**File:** `tests/regression/physician/clinical-dashboard/pending-study-navigation.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Pending tab
3. Click on a study card from the pending studies list
4. Verify navigation to DICOM viewer (/viewer/index.html)
5. Verify selected study loads in viewer with patient information

**Expected Results:**

- Study cards are clickable and respond to user interaction
- Clicking a study card opens the DICOM viewer
- Correct study is loaded based on selection
- Patient header displays correct patient name, sex, and DOB in viewer
- Study series are available in the viewer

#### 2.3 Pending Tab - Empty State

**File:** `tests/regression/physician/clinical-dashboard/pending-tab-empty.spec.ts`

**Steps:**

1. Login as physician user with no pending studies
2. Navigate to Pending tab
3. Verify appropriate empty state message or indication
4. Verify pagination reflects no results

**Expected Results:**

- System handles empty state gracefully
- User sees clear indication that no pending studies exist
- Pagination shows '0 of 0 page(s)'
- No error messages are displayed for normal empty state

#### 2.4 Pending Tab - Pagination Functionality

**File:** `tests/regression/physician/clinical-dashboard/pending-pagination.spec.ts`

**Steps:**

1. Login as physician user with multiple pages of pending studies
2. Navigate to Pending tab
3. Verify current page indicator displays correctly
4. Click 'Next' button to navigate to next page
5. Verify page number updates and new studies are displayed
6. Click 'Previous' button to return to previous page
7. Verify page navigation works correctly

**Expected Results:**

- Pagination controls are visible when multiple pages exist
- Current page and total pages are accurately displayed
- Next button loads subsequent page of results
- Previous button loads prior page of results
- Button states update appropriately (disabled at boundaries)
- Study data loads correctly for each page

### 3. Clinical Dashboard - Reviewed Studies Tab (HIGH PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 3.1 Reviewed Tab - Display and Content Verification

**File:** `tests/regression/physician/clinical-dashboard/reviewed-tab-content.spec.ts`

**Steps:**

1. Login as physician user
2. Click on Reviewed tab
3. Verify reviewed studies are displayed in card format
4. Verify each study card displays: Patient Name, Passcode, Consult Type, Date and Time, Reviewed By (physician name), Reviewed Date and Time
5. Verify study thumbnail images are displayed
6. Verify pagination controls if studies exceed page limit

**Expected Results:**

- Reviewed tab is accessible from dashboard navigation
- All reviewed studies are listed in the tab
- Study cards show all required review metadata
- Reviewer name is displayed (e.g., 'Reviewed by: Cody Huls MD')
- Review timestamp is shown (e.g., 'On: 12/10/2025, 12:16:47 PM')
- Original study date/time is preserved
- Patient information remains visible on reviewed studies

#### 3.2 Reviewed Tab - Study Access from Reviewed Studies

**File:** `tests/regression/physician/clinical-dashboard/reviewed-study-access.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Reviewed tab
3. Click on a reviewed study card
4. Verify navigation to DICOM viewer
5. Verify reviewed study loads with all images and metadata
6. Verify review status is maintained

**Expected Results:**

- Reviewed studies remain accessible after review
- Study opens in DICOM viewer when clicked
- All study data including images, reports, and notes are accessible
- Review button is not visible
- Physician can view the reviewed study

#### 3.3 Reviewed Tab - Filter and Search Reviewed Studies

**File:** `tests/regression/physician/clinical-dashboard/reviewed-filter.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Reviewed tab
3. Verify list of reviewed studies
4. Check for any available filter or search options
5. Apply filters if available (by date, reviewer, etc.)
6. Verify filtered results display correctly

**Expected Results:**

- Reviewed studies list is complete
- Any available filters function correctly
- Search or filter reduces result set appropriately
- Clearing filters restores full list

### 4. DICOM Viewer - Image Display and Navigation (CRITICAL PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 4.1 DICOM Viewer - Patient Header Information

**File:** `tests/regression/physician/dicom-viewer/patient-header.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study from Pending tab
3. Verify patient header displays at top of viewer
4. Verify header shows: Patient Name (uppercase), Patient Sex, Patient Date of Birth
5. Verify information matches the selected patient

**Expected Results:**

- Patient header is prominently displayed at top of viewer
- Patient name appears in format: 'LASTNAME FIRSTNAME' or 'DDOCS PATIENT'
- Sex is displayed (M, F, O)
- DOB is in readable format (YYYY-MM-DD)
- All patient information is accurate and matches study metadata

#### 4.2 DICOM Viewer - Toolbar Button Visibility

**File:** `tests/regression/physician/dicom-viewer/toolbar-buttons.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study from Pending tab
3. Verify viewer toolbar displays all expected buttons
4. Verify buttons are: Zoom, Enhance, Invert, Refresh, Report, Notes, Share, Header, Review, Attach, Exit
5. Verify all buttons have visible icons and labels

**Expected Results:**

- Toolbar is visible below patient header
- All 11 buttons are present and properly labeled
- Button icons are visible and appropriate for function
- Buttons are clickable and respond to hover states
- Button layout is organized and user-friendly

#### 4.3 DICOM Viewer - Series Selection and Display

**File:** `tests/regression/physician/dicom-viewer/series-selection.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with multiple series
3. Verify series list is displayed in left panel
4. Verify each series shows: Series name/description, Image count, Study ID, Patient ID, Modality
5. Click on a series to select it
6. Verify images from selected series load in main viewing area
7. Verify image metadata displays below image (date, time, matrix size)

**Expected Results:**

- Series list is visible in left panel of viewer
- Each series card shows complete metadata
- Thumbnail image may be shown for each series
- Clicking a series makes it active and loads images
- Main viewport displays the selected series images
- Image metadata overlay shows technical details (e.g., '2025-12-10 14:48:48 MTX:1920x1080')
- Series information displays (e.g., 'SE:1 IM:1/1 Series 1')
- Image counter shows current image / total images

#### 4.4 DICOM Viewer - Multi-frame Navigation

**File:** `tests/regression/physician/dicom-viewer/multiframe-navigation.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with multiple images in a series
3. Verify image navigation controls are available
4. Use navigation to move through images (arrow keys, mouse, or controls)
5. Verify image counter updates correctly
6. Verify images display smoothly during navigation

**Expected Results:**

- Multi-image series displays navigation controls
- User can navigate forward and backward through image stack
- Image counter accurately reflects current position (e.g., '1/15')
- Images load without significant delay
- Navigation is intuitive and responsive

#### 4.5 DICOM Viewer - Zoom Functionality

**File:** `tests/regression/physician/dicom-viewer/zoom-controls.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study and select a series with images
3. Click the Zoom button on toolbar
4. Verify zoom submenu appears with options: Zoom +, Zoom -, Fit, 1:1
5. Click 'Zoom +' and verify image zooms in
6. Click 'Zoom -' and verify image zooms out
7. Click 'Fit' and verify image fits to viewport
8. Click '1:1' and verify image displays at actual pixel size

**Expected Results:**

- Zoom button opens submenu with 4 zoom options
- Zoom + increases image magnification
- Zoom - decreases image magnification
- Fit scales image to fill viewport while maintaining aspect ratio
- 1:1 displays image at native resolution (1 image pixel = 1 screen pixel)
- Zoom operations maintain image center or focus point
- Image quality is preserved during zoom operations

#### 4.6 DICOM Viewer - Enhance (Brightness/Contrast) Controls

**File:** `tests/regression/physician/dicom-viewer/enhance-controls.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study and load an image
3. Click the Enhance button on toolbar
4. Verify enhance panel appears with Contrast and Brightness sliders
5. Adjust Contrast slider and verify image contrast changes
6. Adjust Brightness slider and verify image brightness changes
7. Verify numeric values update as sliders are moved
8. Reset adjustments and verify image returns to original

**Expected Results:**

- Enhance panel displays two sliders: Contrast and Brightness
- Each slider has numeric input field showing current value
- Sliders have appropriate range (e.g., -100 to +100 or 0 to 255)
- Dragging Contrast slider adjusts image contrast in real-time
- Dragging Brightness slider adjusts image brightness in real-time
- Numeric values update to match slider position
- Changes apply immediately to visible image
- Image adjustments are non-destructive (can be reset)

#### 4.7 DICOM Viewer - Invert Functionality

**File:** `tests/regression/physician/dicom-viewer/invert-function.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study and load an image
3. Click the Invert button on toolbar
4. Verify image colors/grayscale is inverted
5. Click Invert again to toggle back
6. Verify image returns to original display

**Expected Results:**

- Invert button toggles image polarity
- Black becomes white and white becomes black (grayscale inversion)
- For color images, colors are inverted appropriately
- Invert is immediate and responsive
- Toggling invert multiple times works correctly
- Invert state is maintained when navigating between images in series

#### 4.8 DICOM Viewer - Refresh Functionality

**File:** `tests/regression/physician/dicom-viewer/refresh-function.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study and apply some image adjustments (zoom, enhance)
3. Click the Refresh button on toolbar
4. Verify all image adjustments are reset to default
5. Verify image returns to original display state

**Expected Results:**

- Refresh button resets all image manipulations
- Zoom level returns to Fit or default
- Brightness and contrast reset to 0
- Invert state is removed if applied
- Image displays in original unmodified state
- Series selection is maintained (doesn't reload study)
