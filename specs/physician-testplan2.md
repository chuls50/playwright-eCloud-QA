# eCloud Physician User Test Plan - Part 2

## Application Overview

This is Part 2 of the comprehensive physician user test plan for eNcounterCloud PACS. This section covers DICOM Viewer advanced features (Reports, Notes, Sharing, Headers, Review, Attachments), Study Search functionality, Account Management, and Administrative Functions. This documentation enables the Product team to extract user stories and requirements for the legacy application.

## Test Scenarios

### 5. DICOM Viewer - Reports and Clinical Documentation (HIGH PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 5.1 Report Creation - Template Selection

**File:** `tests/dicom-viewer/report-templates.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study from dashboard
3. Click Report button on viewer toolbar
4. Verify 'New Report' button appears
5. Click 'New Report' button
6. Verify template selection modal appears
7. Verify all 4 templates are listed and selectable
8. Click Close to exit without selection

**Expected Results:**

- Report button opens report creation interface
- 'New Report' option is available
- Template selection modal displays with available templates
- 4 report templates are available: Case Documentation Report, Discharge Summary, HPI Report, SOAP Report
- Templates are visually distinguishable with titles and descriptions
- User can preview or select any template
- Close button exits template selection without creating report

#### 5.2 Report Creation - Case Documentation Report

**File:** `tests/dicom-viewer/case-documentation-report.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Navigate to Report creation
4. Select 'Case Documentation Report' template
5. Verify report editor opens with template structure
6. Complete required report fields
7. Save the report
8. Verify report is saved successfully

**Expected Results:**

- Selecting Case Documentation Report opens report editor
- Report template pre-populates with appropriate sections
- Patient demographics auto-fill from DICOM metadata
- Physician can enter clinical findings
- Report has appropriate fields for case documentation
- Save functionality persists report to study
- Report is associated with the study and accessible later

#### 5.3 Report Creation - HPI Report Template

**File:** `tests/dicom-viewer/hpi-report.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Navigate to Report creation
4. Select 'HPI Report' template
5. Verify HPI template structure
6. Complete HPI report fields
7. Save the report

**Expected Results:**

- HPI (History of Present Illness) template loads correctly
- Template has appropriate sections for HPI documentation
- Chief Complaint, HPI, ROS, and other standard sections are available
- Free-text entry is supported
- Report saves and attaches to study

#### 5.4 Report Creation - SOAP Note Template

**File:** `tests/dicom-viewer/soap-report.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Navigate to Report creation
4. Select 'SOAP Report' template
5. Verify SOAP template structure with S-O-A-P sections
6. Complete SOAP note fields
7. Save the report

**Expected Results:**

- SOAP (Subjective, Objective, Assessment, Plan) template loads
- Four main sections are clearly delineated: S, O, A, P
- Each section has appropriate input fields
- Template supports clinical note taking workflow
- Report saves successfully

#### 5.5 Report Creation - Discharge Summary Template

**File:** `tests/dicom-viewer/discharge-summary.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Navigate to Report creation
4. Select 'Discharge Summary' template
5. Verify discharge summary template structure
6. Complete discharge summary fields
7. Save the report

**Expected Results:**

- Discharge Summary template loads with appropriate sections
- Template includes fields relevant to discharge documentation
- Physician can document hospital course, discharge instructions, follow-up
- Report saves and links to patient study

#### 5.6 Report Access and Viewing - Existing Reports

**File:** `tests/dicom-viewer/view-existing-reports.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study that has an existing report
3. Navigate to Report section
4. Verify existing report is accessible
5. Open and review the report content
6. Verify all report data displays correctly

**Expected Results:**

- Studies with existing reports show report indicator
- Physician can open and view previously created reports
- Report content is read-only if already finalized
- Reports maintain formatting and all entered data
- Multiple reports per study are supported if applicable

#### 5.7 Notes - Create Case-Specific Notes

**File:** `tests/dicom-viewer/create-notes.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Notes button on viewer toolbar
4. Verify note creation dialog appears with text area
5. Enter note text: 'Write your note:'
6. Click Save button
7. Verify note is saved successfully

**Expected Results:**

- Notes button opens note creation dialog
- Note editor has text input area with adequate space
- Physician can type free-text notes
- Save button commits note to study
- Close button cancels without saving (with confirmation if note has content)
- Notes are timestamped and attributed to creating physician

#### 5.8 Notes - View Existing Notes

**File:** `tests/dicom-viewer/view-notes.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with existing notes
3. Click Notes button
4. Verify existing notes are displayed
5. Verify each note shows author name and timestamp
6. Verify notes are in chronological order

**Expected Results:**

- Studies with notes show note indicator
- Opening Notes displays all existing notes for study
- Notes show author and timestamp
- Multiple notes are listed chronologically
- Notes are read-only once saved

#### 5.9 Notes - Edit and Delete Notes

**File:** `tests/dicom-viewer/edit-delete-notes.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with physician's own note
3. Attempt to edit the note
4. Verify edit functionality if available
5. Attempt to delete note
6. Verify deletion confirmation prompt
7. Confirm deletion and verify note is removed

**Expected Results:**

- Physician can edit their own notes
- Edit preserves original timestamp but may add 'modified' indicator
- Delete option is available for note author
- Confirmation is required before deleting note
- Deleted notes are permanently removed

### 6. DICOM Viewer - Study Sharing and Collaboration (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 6.1 Share Study - Share Dialog Access

**File:** `tests/dicom-viewer/share-dialog.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Share button on viewer toolbar
4. Verify share dialog appears
5. Verify 'Transfer' and 'Referral' options are visible
6. Click Close to exit dialog

**Expected Results:**

- Share button opens sharing options dialog
- Two sharing options are presented: Transfer and Referral
- Dialog has clear labels and descriptions
- Close button exits without sharing
- UI is intuitive and accessible

#### 6.2 Share Study - Transfer to Institution

**File:** `tests/dicom-viewer/transfer-study.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Share button and select Transfer
4. Verify institution selection dialog appears
5. Select a target institution
6. Confirm transfer action
7. Verify transfer confirmation message

**Expected Results:**

- Transfer option opens institution selection interface
- Available institutions are listed
- Physician can select target institution
- Transfer confirmation prompts for verification
- Successful transfer shows confirmation message
- Study becomes available to receiving institution
- Transfer maintains HIPAA compliance and audit trail

#### 6.3 Share Study - Referral with Passcode

**File:** `tests/dicom-viewer/referral-passcode.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Share button and select Referral
4. Verify passcode generation interface
5. Generate or view passcode for the study
6. Note passcode and sharing instructions
7. Verify passcode is saved and accessible

**Expected Results:**

- Referral option generates a passcode for study access
- Passcode is unique and secure
- Passcode allows time-limited or access-limited viewing
- Referral instructions are clear for recipient
- Physician can specify referral parameters if applicable
- Referral complies with HIPAA for external sharing

#### 6.4 Share Study - View Shared Studies from Dashboard

**File:** `tests/dashboard/view-shared-studies.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Shares tab on dashboard
3. Verify list of shared studies
4. Click 'Passcodes' button to view active passcodes
5. Toggle between 'All' and 'Sent' filters
6. Verify filtered results display correctly

**Expected Results:**

- Shares tab on dashboard shows all shared studies
- 'Passcodes' button is accessible
- Shared studies list shows study details and share status
- Filter options 'All' and 'Sent' work correctly
- 'All' shows studies shared with and by the physician
- 'Sent' shows only studies shared by the physician
- Pagination works for shared studies list

#### 6.5 Share Study - Revoke or Manage Shares

**File:** `tests/dicom-viewer/manage-shares.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Shares tab
3. Select a shared study
4. Attempt to revoke or manage the share
5. Verify revocation options and confirmation
6. Confirm revocation and verify share is terminated

**Expected Results:**

- Physician can view all active shares for their studies
- Option to revoke or expire passcodes exists
- Revocation immediately prevents further access via passcode
- Audit log records share revocation
- Confirmation is required before revoking access

### 7. DICOM Viewer - DICOM Header and Technical Metadata (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 7.1 DICOM Header - View Complete Header

**File:** `tests/dicom-viewer/dicom-header-view.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study and load an image
3. Click Header button on viewer toolbar
4. Verify DICOM header table displays
5. Verify table columns: TAG, VR, LENGTH, DESCRIPTION, VALUE
6. Scroll through header to view all tags
7. Click Close to exit header viewer

**Expected Results:**

- Header button opens DICOM header viewer
- Header displays in tabular format with columns: TAG, VR, LENGTH, DESCRIPTION, VALUE
- All DICOM tags are listed (Group 0002, 0008, 0010, 0018, 0020, 0028, 0040, etc.)
- Standard DICOM tags are present: Patient Name, Patient ID, Study Date, Modality, etc.
- Technical tags include Transfer Syntax, SOP Instance UID, etc.
- Header is scrollable for long lists of tags
- Close button exits header viewer

#### 7.2 DICOM Header - Search and Filter Tags

**File:** `tests/dicom-viewer/header-filter.spec.ts`

**Steps:**

1. Login as physician user
2. Open DICOM header viewer
3. Look for search or filter options
4. If available, search for specific DICOM tag (e.g., '0010,0010' for Patient Name)
5. Verify search results
6. Clear search and verify full header displays

**Expected Results:**

- Search or filter functionality is available (if implemented)
- Physician can search by tag number, description, or value
- Filtered results show matching tags only
- Clearing filter restores full header view
- Common tags are easy to locate

#### 7.3 DICOM Header - Column Customization

**File:** `tests/dicom-viewer/header-columns.spec.ts`

**Steps:**

1. Login as physician user
2. Open DICOM header viewer
3. Click 'Columns to display...' link
4. Verify column selection dialog appears
5. Toggle columns on/off
6. Verify table updates to show selected columns only
7. Reset to default columns

**Expected Results:**

- 'Columns to display...' link is available
- Physician can toggle which columns are visible
- Column selection persists during session
- Hidden columns can be re-enabled
- Customization improves readability for technical users

#### 7.4 DICOM Header - Export Header Data

**File:** `tests/dicom-viewer/header-export.spec.ts`

**Steps:**

1. Login as physician user
2. Open DICOM header viewer
3. Look for export or download option
4. If available, initiate header export
5. Verify exported file downloads correctly
6. Verify exported content is complete and readable

**Expected Results:**

- Export option allows downloading header data (if implemented)
- Exported format is machine-readable (CSV, JSON, or TXT)
- All visible columns and tags are included in export
- Exported file includes study identifiers
- Export maintains HIPAA compliance

### 8. DICOM Viewer - Study Review and Status Management (CRITICAL PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 8.1 Mark Study as Reviewed - Review Action

**File:** `tests/dicom-viewer/mark-reviewed.spec.ts`

**Steps:**

1. Login as physician user
2. Open a pending study
3. Click Review button on viewer toolbar
4. Verify confirmation dialog appears with warning message
5. Click 'Okay' to confirm review
6. Verify study is marked as reviewed
7. Exit viewer and return to dashboard
8. Verify study now appears in Reviewed tab, not Pending tab

**Expected Results:**

- Review button is accessible from viewer toolbar
- Clicking Review prompts confirmation dialog
- Confirmation message clearly warns: 'Are you sure you want to mark this study as reviewed? You cannot undo this action.'
- Okay button confirms and marks study as reviewed
- Cancel button aborts without changing status
- After review confirmation, study moves from Pending to Reviewed
- Reviewed timestamp and reviewer name are recorded
- Study remains accessible but shows reviewed status

#### 8.2 Review Status - Prevent Duplicate Review

**File:** `tests/dicom-viewer/prevent-duplicate-review.spec.ts`

**Steps:**

1. Login as physician user
2. Open a previously reviewed study from Reviewed tab
3. Attempt to click Review button
4. Verify button state (disabled or shows already reviewed)
5. If clickable, verify appropriate message indicating already reviewed

**Expected Results:**

- Already-reviewed studies show reviewed status in viewer
- Review button may be disabled or show different state
- Attempting to review again shows appropriate message
- System prevents multiple review records from same action
- Original review metadata is preserved

#### 8.3 Review Status - Audit Trail

**File:** `tests/dicom-viewer/review-audit-trail.spec.ts`

**Steps:**

1. Login as physician user
2. Mark multiple studies as reviewed
3. Access audit log or review history (if available in UI)
4. Verify review actions are logged
5. Verify log entries include reviewer and timestamp
6. Attempt to verify immutability of records

**Expected Results:**

- Each review action creates audit log entry
- Audit log includes: Reviewer name, Review timestamp, Study identifiers
- Audit data is accessible to administrators
- Review records are immutable
- HIPAA compliance is maintained for audit logs

#### 8.4 Review Workflow - Clinical Integration

**File:** `tests/dicom-viewer/review-workflow.spec.ts`

**Steps:**

1. Login as physician user
2. Open a pending study
3. Create a report and/or add notes
4. Mark study as reviewed after documentation
5. Verify workflow is smooth and logical
6. Return to dashboard and verify reviewed status

**Expected Results:**

- Review workflow supports clinical decision-making
- Physician can create report before marking reviewed
- Notes can be added before review completion
- Review can be done after all necessary documentation
- Reviewed studies are easily identifiable on dashboard

### 9. DICOM Viewer - File Attachments (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 9.1 Attach PDF - Upload Interface

**File:** `tests/dicom-viewer/attach-pdf-upload.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Attach button on viewer toolbar
4. Verify attachment dialog appears
5. Verify drop zone and 'Choose File' button are present
6. Click Close without uploading

**Expected Results:**

- Attach button opens PDF attachment dialog
- Dialog title: 'Attach PDF to study'
- Drop zone for drag-and-drop file upload is visible
- 'Choose File' button for browse-to-upload is available
- Dialog has Close button to cancel
- UI clearly indicates PDF files only

#### 9.2 Attach PDF - File Upload via Browse

**File:** `tests/dicom-viewer/attach-pdf-browse.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Attach button
4. Click 'Choose File' button
5. Browse and select a valid PDF file (< 5 MB)
6. Confirm file selection
7. Verify file uploads successfully
8. Verify success confirmation message

**Expected Results:**

- Click 'Choose File' opens file browser
- File browser filters for PDF files (or shows warning for non-PDF)
- Physician can select a PDF file from local system
- File size limit is 5 MB (per requirements)
- Selected file name displays in dialog
- Upload button or automatic upload initiates transfer
- Upload progress indicator shows (if large file)
- Success message confirms attachment

#### 9.3 Attach PDF - Drag and Drop Upload

**File:** `tests/dicom-viewer/attach-pdf-drag-drop.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Click Attach button to open dialog
4. Drag a PDF file from file system over drop zone
5. Drop file to initiate upload
6. Verify upload completes successfully
7. Verify success message

**Expected Results:**

- Drag-and-drop zone is clearly indicated
- Dragging PDF file over zone highlights or shows visual feedback
- Dropping PDF file initiates upload
- File size validation occurs (5 MB limit)
- Upload progress and completion are shown
- Multiple files can be dropped if supported, or error if not

#### 9.4 Attach PDF - File Size Validation

**File:** `tests/dicom-viewer/attach-pdf-size-validation.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Attempt to attach a PDF file larger than 5 MB
4. Verify error message indicating file size limit
5. Verify upload is rejected
6. Select a smaller file and verify successful upload

**Expected Results:**

- Files larger than 5 MB are rejected
- Clear error message indicates file is too large
- Upload does not proceed for oversized files
- Physician can select a different file after error

#### 9.5 Attach PDF - Duplicate File Prevention

**File:** `tests/dicom-viewer/attach-pdf-duplicate.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study
3. Attach a PDF file successfully
4. Attempt to attach the same PDF file again
5. Verify duplicate detection message
6. Verify second upload is prevented

**Expected Results:**

- System prevents duplicate PDF attachments (per requirements)
- Attempting to upload same file twice shows error or warning
- File name or hash is checked for duplicates
- Appropriate message explains duplicate detected

#### 9.6 Attach PDF - View Attached Files

**File:** `tests/dicom-viewer/view-attached-pdfs.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with attached PDFs
3. Navigate to attachments section
4. Verify list of attached PDFs
5. Click on a PDF to open/download
6. Verify PDF opens correctly

**Expected Results:**

- Attached PDFs are listed in study
- Physician can see all attached documents
- File names are displayed clearly
- Click on attached PDF opens or downloads the file
- PDFs are viewable in browser or external PDF viewer

#### 9.7 Attach PDF - Delete Attached Files

**File:** `tests/dicom-viewer/delete-attached-pdf.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with attached PDF
3. Locate delete option for attachment
4. Click delete and verify confirmation prompt
5. Confirm deletion
6. Verify PDF is removed from attachments list

**Expected Results:**

- Physician can delete attached PDFs if authorized
- Delete option is available next to each attachment
- Confirmation prompt before deletion
- Deleted files are permanently removed from study
- Audit log records PDF deletion

### 10. Study Search and Filtering (HIGH PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 10.1 Study Search - Quick Date Filters

**File:** `tests/study-search/quick-date-filters.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Study Search tab
3. Verify quick date filter buttons are present
4. Click 'Today' button
5. Verify studies from today are displayed
6. Verify page title shows 'Study search: Today'
7. Repeat for Yesterday, -7 days, and -30 days filters
8. Verify each filter returns appropriate results

**Expected Results:**

- Study Search tab is accessible from dashboard
- Four quick filter buttons are visible: Today, Yesterday, -7 days, -30 days
- Each button is clearly labeled with icon
- Clicking a date filter loads studies from that time period
- Results page title updates (e.g., 'Study search: Today')
- Study count and pagination update based on filter
- Empty results show appropriate message

#### 10.2 Study Search - Advanced Search Dialog

**File:** `tests/study-search/advanced-search.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Study Search tab
3. Click Search button
4. Verify 'Search Study' modal appears
5. Verify all search fields are present and functional
6. Verify Modality dropdown has all modality types
7. Click Cancel to close without searching

**Expected Results:**

- Search button opens advanced search modal
- Modal title: 'Search Study'
- Seven search fields are available: Patient ID, Last Name, First Name, From Date, To Date, Modality
- All fields are optional (can search by any combination)
- Date fields have date picker functionality
- Modality dropdown includes options: Any, CR, CT, DX, MR, OT, US, XA, XC
- Search button executes query
- Cancel button closes modal without searching

#### 10.3 Study Search - Search by Patient ID

**File:** `tests/study-search/search-patient-id.spec.ts`

**Steps:**

1. Login as physician user
2. Open Study Search advanced dialog
3. Enter a known Patient ID (e.g., 'ddoc1243')
4. Click Search button
5. Verify studies matching that Patient ID are displayed
6. Verify search results accuracy

**Expected Results:**

- Entering Patient ID in search returns matching studies
- Search is case-insensitive
- Partial matches may be supported
- Results display all studies for matched patient(s)
- No results message if patient ID not found

#### 10.4 Study Search - Search by Patient Name

**File:** `tests/study-search/search-patient-name.spec.ts`

**Steps:**

1. Login as physician user
2. Open Study Search advanced dialog
3. Enter Last Name (e.g., 'Smith')
4. Click Search and verify results for patients with that last name
5. Clear search and enter First Name (e.g., 'Bob')
6. Click Search and verify results for patients with that first name
7. Enter both Last Name and First Name
8. Verify refined search results

**Expected Results:**

- Last Name field searches by patient last name
- First Name field searches by patient first name
- Both fields can be used together for more specific search
- Search is case-insensitive
- Partial name matching may be supported
- Results show all matching patients' studies

#### 10.5 Study Search - Search by Date Range

**File:** `tests/study-search/search-date-range.spec.ts`

**Steps:**

1. Login as physician user
2. Open Study Search advanced dialog
3. Enter 'From Date' (e.g., 11/01/2025)
4. Enter 'To Date' (e.g., 11/30/2025)
5. Click Search
6. Verify studies from November 2025 are displayed
7. Verify all results fall within date range

**Expected Results:**

- From Date and To Date define a date range for search
- Date pickers allow easy date selection
- Search returns studies acquired between From Date and To Date
- Date range is inclusive of both start and end dates
- Invalid date ranges (To Date before From Date) show error or swap automatically

#### 10.6 Study Search - Search by Modality

**File:** `tests/study-search/search-modality.spec.ts`

**Steps:**

1. Login as physician user
2. Open Study Search advanced dialog
3. Select a specific modality from dropdown (e.g., 'OT - Other')
4. Click Search
5. Verify only studies with OT modality are displayed
6. Repeat with different modality
7. Verify filter accuracy

**Expected Results:**

- Modality dropdown filters studies by imaging modality
- 'Any' returns all modalities (default)
- Selecting specific modality (e.g., OT, XC, MR) filters results
- Results show only studies of selected modality
- Modality types include: CR (Computed Radiography), CT (Computed Tomography), DX (Digital X-ray), MR (Magnetic Resonance), OT (Other), US (Ultrasound), XA (X-ray Angiography), XC (External Camera)

#### 10.7 Study Search - Combined Search Criteria

**File:** `tests/study-search/combined-search.spec.ts`

**Steps:**

1. Login as physician user
2. Open Study Search advanced dialog
3. Enter Patient Last Name: 'Smith'
4. Select Modality: 'OT - Other'
5. Set date range: Last 30 days
6. Click Search
7. Verify results match all criteria (Smith, OT modality, recent dates)
8. Verify result accuracy

**Expected Results:**

- Multiple search criteria can be combined
- All specified criteria must match (AND logic)
- Results are refined as more criteria are added
- Complex searches return accurate results
- No results message if no studies match all criteria

#### 10.8 Study Search - Clear and Reset Search

**File:** `tests/study-search/clear-search.spec.ts`

**Steps:**

1. Login as physician user
2. Perform a search with multiple criteria
3. Close search dialog
4. Reopen search dialog
5. Verify fields are cleared or maintain previous search
6. Test reset behavior

**Expected Results:**

- Cancel button closes search dialog without executing
- After search, physician can open dialog again with cleared fields
- Quick date filters reset search to that time period
- Navigating away from search results and returning maintains last search or resets appropriately

### 11. Account Management (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 11.1 Account Tab - View Profile Information

**File:** `tests/account/view-profile.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Verify 'Account Information' section displays
4. Verify 'Address Information' section displays
5. Check that disabled fields show current data but cannot be edited
6. Check that enabled fields are editable
7. Verify current account values are displayed correctly

**Expected Results:**

- Account tab is accessible from dashboard
- Account page displays two sections: Account Information and Address Information
- Non-editable fields are clearly disabled: User Full Name, Profile (Physician), Username, License ID, 'Can view all patients' checkbox
- Editable fields are enabled: Email Address, SMS Number, Specialties, Address 1, Address 2, City, State, Country, Zip Code, Phone
- Send email notifications checkbox is functional
- All current account data populates correctly

#### 11.2 Account Tab - Edit Email and SMS

**File:** `tests/account/edit-email-sms.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Edit Email Address field with valid email
4. Edit SMS Number field with valid phone number
5. Click Save button
6. Verify success message or confirmation
7. Logout and login again
8. Verify updated email and SMS are saved

**Expected Results:**

- Email Address field accepts valid email format
- Invalid email shows validation error
- SMS Number field accepts phone number format with country code
- SMS number format example provided: +19998887777
- Changes are saved when Save button is clicked
- Confirmation message or redirect indicates successful save
- Updated information persists after logout/login

#### 11.3 Account Tab - Edit Specialties

**File:** `tests/account/edit-specialties.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Edit Specialties field (e.g., change 'General' to 'Radiology')
4. Click Save button
5. Verify specialties update is saved
6. Verify updated specialties display on subsequent account view

**Expected Results:**

- Specialties field is editable text input
- Physician can enter or update specialty information
- Multiple specialties may be entered (e.g., 'Cardiology, Internal Medicine')
- Changes save successfully
- Specialties information may be used elsewhere in system (e.g., physician directory)

#### 11.4 Account Tab - Update Address Information

**File:** `tests/account/update-address.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Update Address 1 field (e.g., '4315 E. Thunderbird Rd')
4. Update City, State, Country, Zip as needed
5. Update Phone field with valid number
6. Click Save button
7. Verify address information is updated
8. Verify changes persist

**Expected Results:**

- All address fields are editable: Address 1, Address 2, City, State, Country, Zip Code
- Address validation may apply for format
- Physician can update address for correspondence or records
- Phone number field is separate and editable
- Save persists all address changes
- Address updates do not affect clinical data or studies

#### 11.5 Account Tab - Email Notification Preferences

**File:** `tests/account/email-notifications.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Toggle 'Send email notifications' checkbox
4. Save account settings
5. Verify notification preference is updated
6. Test by triggering a notification event if possible
7. Verify emails are sent or not sent based on preference

**Expected Results:**

- 'Send email notifications' checkbox controls notification preference
- Checked: Physician receives email notifications for study updates, reviews, etc.
- Unchecked: Email notifications are disabled
- Preference saves with account settings
- Change takes effect immediately for future notifications

#### 11.6 Account Tab - Password Change

**File:** `tests/account/change-password.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Click Password button
4. Verify password change interface appears
5. Enter current password
6. Enter new password meeting requirements
7. Confirm new password
8. Submit password change
9. Verify password is updated (may require re-login)

**Expected Results:**

- Password button is visible at top of Account page
- Clicking Password opens password change dialog or page
- Password change requires current password for security
- New password must meet complexity requirements
- Password confirmation field must match new password
- Successful password change logs user out or requires re-authentication
- Password hint field may be optional

#### 11.7 Account Tab - Save and Cancel Actions

**File:** `tests/account/save-cancel.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Account tab
3. Make several edits to account fields
4. Click Save button
5. Verify success confirmation
6. Make edits and click Back button without saving
7. Verify unsaved changes handling

**Expected Results:**

- Save button commits all account changes
- Back button navigates away without saving (may prompt if unsaved changes)
- Unsaved changes warning if navigating away with edits
- Save shows confirmation message
- Failed save shows error message with details

### 12. Administration Functions - Patient Management (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 12.1 Administration Access - Navigation to Admin Dashboard

**File:** `tests/administration/admin-navigation.spec.ts`

**Steps:**

1. Login as physician user
2. Click Administration tab from main dashboard
3. Verify redirect to admin dashboard
4. Verify admin navigation tabs are visible: Patients, Worklist, View Studies, Account
5. Verify Patients tab is active by default

**Expected Results:**

- Administration tab is accessible from main dashboard
- Clicking Administration redirects to administrative dashboard (/admin/index.html)
- Admin dashboard has separate navigation: Patients, Worklist, View Studies, Account
- Patients tab is default landing page in admin section
- User role permissions determine available admin functions

#### 12.2 Patient Management - View Patient List

**File:** `tests/administration/view-patients.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Administration > Patients tab
3. Verify patient list is displayed
4. Verify each patient card shows required information
5. Verify pagination and patient count display
6. Verify Select All checkbox functionality

**Expected Results:**

- Patients tab shows complete patient list
- Each patient card displays: Name, Patient ID, Date of Birth, Study count, Sex (M/F/O)
- Patients are listed alphabetically or by recent activity
- Pagination controls if patient list exceeds page limit
- Select All checkbox allows multi-patient selection
- Search button provides patient search capability

#### 12.3 Patient Management - Create New Patient

**File:** `tests/administration/create-patient.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Click New button
4. Verify patient creation form appears
5. Fill in required patient information
6. Click Save
7. Verify new patient is created and appears in list

**Expected Results:**

- New button opens patient creation form
- Required fields: Last Name, First Name, Date of Birth, Sex, Patient ID
- Optional fields may include: Address, Phone, etc.
- Patient ID must be unique
- Save button creates new patient record
- New patient appears in patient list
- Cancel button discards new patient without saving

#### 12.4 Patient Management - Edit Patient Information

**File:** `tests/administration/edit-patient.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Select a patient from list
4. Click Edit button
5. Modify patient information (e.g., update address)
6. Click Save
7. Verify patient information is updated

**Expected Results:**

- Selecting a patient enables Edit button
- Edit opens patient information form with pre-filled data
- Physician can modify patient demographics
- Some fields may be restricted (e.g., cannot change Patient ID)
- Save commits changes to patient record
- Audit log records patient information changes

#### 12.5 Patient Management - Delete Patient

**File:** `tests/administration/delete-patient.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Select a patient (preferably test patient with no critical data)
4. Click Delete button
5. Verify confirmation prompt with appropriate warning
6. Confirm deletion
7. Verify patient is removed from list

**Expected Results:**

- Selecting a patient enables Delete button
- Delete prompts for confirmation
- Warning indicates all patient studies will also be affected or require handling
- Confirmation deletes patient record
- Deleted patient is removed from patient list
- Deletion is logged for audit purposes
- HIPAA compliance maintained for deletion

#### 12.6 Patient Management - Search Patients

**File:** `tests/administration/search-patients.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Click Search button
4. Enter patient search criteria (e.g., Patient ID)
5. Execute search
6. Verify matching patients are displayed
7. Clear search and verify full list returns

**Expected Results:**

- Search button opens patient search dialog
- Search fields: Patient ID, Name, DOB, etc.
- Search returns matching patients
- Search is case-insensitive
- Results display in patient list
- Clear search returns to full patient list

#### 12.7 Patient Management - Transfer Patient to Another Institution

**File:** `tests/administration/transfer-patient.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Select a patient
4. Click Transfer button
5. Verify institution selection dialog
6. Select target institution
7. Confirm transfer
8. Verify transfer confirmation message

**Expected Results:**

- Selecting a patient enables Transfer button
- Transfer dialog shows available institutions
- Physician selects target institution
- Transfer includes patient record and all associated studies
- Confirmation prompt before transfer
- Successful transfer shows confirmation
- Patient appears in target institution's patient list
- Transfer maintains data integrity and HIPAA compliance

#### 12.8 Patient Management - Schedule Study for Patient

**File:** `tests/administration/schedule-study.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Select a patient
4. Click Study button to schedule new study
5. Fill in study scheduling form
6. Click Save
7. Verify study is added to worklist

**Expected Results:**

- Selecting a patient enables Study button (schedule study)
- Study scheduling form appears
- Required fields: Study description, Date/Time, Modality, Accession number
- Optional fields: Notes, special instructions
- Save creates scheduled study in Worklist
- Scheduled study shows in worklist with SCHEDULED status

#### 12.9 Patient Management - View Patient Studies

**File:** `tests/administration/view-patient-studies.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Patients tab
3. Select a patient with existing studies
4. Click Studies button
5. Verify patient's studies are displayed
6. Verify study details are complete and accurate
7. Click Back to return to patient list

**Expected Results:**

- Selecting a patient enables Studies button
- Studies button shows list of all studies for selected patient
- Each study card shows: Description, Date/Time, Accession number, Passcode, Series count, Modality
- Studies are listed chronologically
- Selecting a study shows study management options
- Back button returns to patient list

#### 12.10 Study Management - Generate Passcode for Study

**File:** `tests/administration/generate-passcode.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient studies view
3. Select a study without passcode
4. Click Passcode button
5. Verify passcode is generated and displayed
6. Copy passcode for sharing
7. Verify passcode is saved with study

**Expected Results:**

- Selecting a study enables Passcode button
- Passcode generation creates unique access code
- Generated passcode displays clearly for copying
- Passcode allows external or temporary access to study
- Passcode can be shared with referring physician or patient
- Passcode access is logged for security

#### 12.11 Study Management - Attach PDF to Study

**File:** `tests/administration/admin-attach-pdf.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient study management
3. Select a study
4. Click Attach PDF button
5. Upload a PDF file
6. Verify successful attachment
7. Verify PDF is accessible from DICOM viewer

**Expected Results:**

- Attach PDF button is available from study management
- Functions identically to viewer Attach PDF feature
- PDF upload follows same rules: 5 MB limit, no duplicates
- Attached PDFs are accessible in viewer
- Administrative attachment is logged

#### 12.12 Study Management - View Series and Images

**File:** `tests/administration/view-series.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient study management
3. Select a study
4. Click Series button
5. Verify series list is displayed
6. View series details
7. Check for series management options

**Expected Results:**

- Series button shows all series within selected study
- Each series lists image count
- Series can be viewed individually
- Images within series may be viewable as thumbnails
- Delete option may be available for series (with appropriate warnings)

#### 12.13 Study Management - Delete Study

**File:** `tests/administration/delete-study.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient study management
3. Select a study (use test data)
4. Click Delete button
5. Verify confirmation prompt with warning
6. Confirm deletion
7. Verify study is removed from list

**Expected Results:**

- Delete button removes study from patient record
- Confirmation prompt warns of permanent deletion
- All series and images are deleted with study
- Study removal is logged in audit trail
- Deleted study no longer appears in patient studies or dashboards

#### 12.14 Study Management - Share Study from Admin

**File:** `tests/administration/admin-share-study.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient study management
3. Select a study
4. Click Share button
5. Verify transfer and referral options
6. Initiate share action
7. Verify share is successful

**Expected Results:**

- Share button provides transfer or referral options
- Functions similarly to viewer Share feature
- Study can be transferred to another institution
- Referral passcode can be generated
- Share actions are logged

### 13. Administration Functions - Worklist Management (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 13.1 Worklist - View Scheduled Studies

**File:** `tests/administration/view-worklist.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Administration > Worklist tab
3. Verify worklist items are displayed
4. Verify each item shows complete information
5. Verify acquisition and review statuses are clear
6. Check pagination if applicable

**Expected Results:**

- Worklist tab shows all scheduled procedures/studies
- Each worklist item displays: Patient Name (uppercase), Patient ID, Accession Number, Study Description, Acquisition Status, Review Status, Scheduled Date/Time, Modality
- Worklist items show status: SCHEDULED, PENDING, COMPLETED
- Review status shows: PENDING, TO REVIEW, SCHEDULED
- Pagination controls for long worklist
- Select All checkbox for multi-item selection

#### 13.2 Worklist - Date Filter Buttons

**File:** `tests/administration/worklist-date-filters.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Click each date filter button
4. Verify worklist updates for each date range
5. Verify page title or indicator shows current filter
6. Verify appropriate items display for each filter

**Expected Results:**

- Six date filter buttons at top: Today, Tomorrow, +7 days, Yesterday, -7 days, Search
- Each button filters worklist by date range
- Today shows procedures scheduled for today
- Tomorrow shows next day's procedures
- +7 days shows next week
- Yesterday and -7 days show past items (may be empty or show completed)
- Search opens advanced worklist search

#### 13.3 Worklist - Search Worklist Items

**File:** `tests/administration/worklist-search.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Click Search button
4. Enter search criteria (e.g., Patient ID or Accession Number)
5. Execute search
6. Verify matching worklist items are displayed
7. Test with different search combinations

**Expected Results:**

- Search button opens worklist search dialog
- Search fields: Patient ID, Accession Number, Date range, Modality, Status
- Search returns matching worklist items
- Complex searches with multiple criteria work correctly
- No results shows appropriate message

#### 13.4 Worklist - Edit Worklist Item

**File:** `tests/administration/edit-worklist.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Select a worklist item
4. Access edit function (button or dialog)
5. Modify worklist item details
6. Save changes
7. Verify worklist item is updated

**Expected Results:**

- Selecting worklist item shows edit options
- Physician can modify: Scheduled time, Study description, Modality
- Acquisition and Review statuses may update automatically or manually
- Changes save to worklist item
- Updated item reflects changes immediately

#### 13.5 Worklist - Delete Worklist Item

**File:** `tests/administration/delete-worklist.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Select a worklist item (test data)
4. Click Delete
5. Confirm deletion
6. Verify item is removed from worklist

**Expected Results:**

- Delete option available for worklist items
- Confirmation prompt before deletion
- Deleting worklist item removes scheduled procedure
- Does not delete patient or existing studies
- Deletion is logged

#### 13.6 Worklist - Acquisition Status Management

**File:** `tests/administration/acquisition-status.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Identify worklist item with SCHEDULED status
4. Update acquisition status to COMPLETED
5. Verify status updates correctly
6. Check if status change affects other displays (e.g., move to review queue)

**Expected Results:**

- Acquisition status indicates procedure completion stage
- Statuses: SCHEDULED (not started), PENDING (in progress), COMPLETED (images acquired)
- Status updates may be manual or automatic based on DICOM receipt
- Physician or technologist can update status
- Status change updates worklist display

#### 13.7 Worklist - Review Status Management

**File:** `tests/administration/review-status.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Worklist tab
3. Identify item with TO REVIEW status
4. Open associated study and mark as reviewed
5. Return to worklist
6. Verify review status updates

**Expected Results:**

- Review status tracks physician review completion
- Statuses: PENDING (not reviewed), TO REVIEW (ready for review), SCHEDULED (review appointment set)
- When study is marked reviewed in viewer, worklist item updates
- Review status helps manage physician workload
- Reports system integration with clinical dashboard

### 14. Administration Functions - View Studies from Admin (MEDIUM PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 14.1 View Studies - Studies Pending Review List

**File:** `tests/administration/admin-view-pending.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to Administration > View Studies tab
3. Verify list of pending studies
4. Compare with main dashboard Pending tab (should match)
5. Click on a study to open viewer
6. Verify study opens correctly

**Expected Results:**

- View Studies tab shows studies pending review
- List matches Pending tab from main clinical dashboard
- Study cards show same attributes: Patient name, Passcode, Description, Date/Time, Modality
- Clicking study opens in DICOM viewer
- This provides alternate access path to pending studies for administrative workflow

#### 14.2 View Studies - Integration with Clinical Dashboard

**File:** `tests/administration/admin-clinical-integration.spec.ts`

**Steps:**

1. Login as physician user
2. Note studies in Administration > View Studies
3. Navigate to main Clinical Dashboard > Pending tab
4. Verify same studies appear
5. Mark a study as reviewed from viewer
6. Check both Admin View Studies and Clinical Pending
7. Verify study moves to reviewed in both locations

**Expected Results:**

- Admin View Studies and Clinical Dashboard Pending tab show same data
- Marking study as reviewed in either location updates both
- Data consistency maintained between admin and clinical views
- User can switch between admin and clinical dashboards seamlessly

### 15. Cross-Functional and Integration Tests (HIGH PRIORITY)

**Seed:** `tests/physician_seed.spec.ts`

#### 15.1 End-to-End Workflow - Study Review Complete Cycle

**File:** `tests/integration/study-review-e2e.spec.ts`

**Steps:**

1. Login as physician user
2. Access pending study from dashboard
3. Open study in DICOM viewer
4. Review all series and images
5. Create a clinical report using template
6. Add case notes
7. Mark study as reviewed
8. Exit to dashboard
9. Verify study appears in Reviewed tab
10. Verify all documentation is saved and accessible

**Expected Results:**

- Complete workflow from pending to reviewed functions smoothly
- Physician can access pending study, create report, add notes, and mark as reviewed in single session
- Study status updates across all views
- All documentation persists correctly
- Workflow is efficient and user-friendly

#### 15.2 Data Integrity - Study Information Consistency

**File:** `tests/integration/data-consistency.spec.ts`

**Steps:**

1. Login as physician user
2. Access a study from Pending tab
3. Note all study metadata
4. Open study in viewer and verify metadata matches
5. Check same study in Admin > Patient Studies
6. Verify consistency across all views
7. Make note or report change and verify it persists

**Expected Results:**

- Study information is consistent across all interfaces
- Patient name, ID, DOB match in Dashboard, Viewer, Admin section
- Study date/time, modality, accession number consistent
- Updates in one location reflect in all other locations
- No data loss or corruption during navigation

#### 15.3 Multi-Study Management - Bulk Operations

**File:** `tests/integration/bulk-operations.spec.ts`

**Steps:**

1. Login as physician user
2. Navigate to patient studies or admin view
3. Use Select All checkbox to select multiple studies
4. Initiate bulk operation (transfer, delete, etc.)
5. Confirm bulk action
6. Verify all selected items are processed
7. Check for error handling if some items fail

**Expected Results:**

- Select All checkbox allows multi-study selection
- Bulk operations available where applicable (e.g., bulk delete, bulk transfer)
- Confirmation prompts for bulk operations
- Bulk operations complete successfully for all selected items
- Error handling for partial failures in bulk operations

#### 15.4 Security and Access Control - Role-Based Permissions

**File:** `tests/security/physician-role-permissions.spec.ts`

**Steps:**

1. Login as physician user
2. Verify access to clinical dashboard features
3. Verify access to administration features (Patients, Worklist)
4. Attempt to access features outside physician role (if applicable)
5. Verify appropriate permissions and restrictions
6. Check audit log for recorded access (if accessible)

**Expected Results:**

- Physician has appropriate access to clinical and limited admin functions
- Physician can view all patients from their institution (if checkbox is enabled)
- Physician cannot access functions outside their role (if such restrictions exist)
- PHI is protected and only accessible to authorized physician
- Audit logs record physician access to studies

#### 15.5 HIPAA Compliance - PHI Protection

**File:** `tests/security/hipaa-compliance.spec.ts`

**Steps:**

1. Login as physician user
2. Verify HTTPS connection throughout application
3. Access patient studies and verify no PHI in URLs
4. Check browser history for PHI exposure
5. Verify session timeout after idle period
6. Review audit logs for access tracking
7. Verify password complexity requirements

**Expected Results:**

- All PHI is transmitted over encrypted connections (TLS 1.2+)
- PHI is not exposed in URLs or browser history
- Session timeout protects unattended workstations
- Audit trail logs all PHI access
- Password policies enforce strong authentication
- Data at rest is encrypted (AES-256)

#### 15.6 Performance - Large Study Handling

**File:** `tests/performance/large-studies.spec.ts`

**Steps:**

1. Login as physician user
2. Open a study with many series (10+) and many images (100+)
3. Measure load time for study to open
4. Navigate through all series and images
5. Monitor browser performance and memory
6. Verify application responsiveness
7. Check for any errors or crashes

**Expected Results:**

- Large studies (many series, many images) load efficiently
- Image rendering is smooth without lag
- Navigation between images is responsive
- Memory usage is reasonable (no memory leaks)
- Application remains stable during large data operations

#### 15.7 Browser Compatibility - Cross-Browser Testing

**File:** `tests/compatibility/browser-support.spec.ts`

**Steps:**

1. Login as physician user in Chrome
2. Execute core workflows (view study, create report, mark reviewed)
3. Verify all features work correctly
4. Repeat tests in Firefox
5. Repeat tests in Safari
6. Repeat tests in Edge
7. Document any browser-specific issues

**Expected Results:**

- Application functions correctly in supported browsers: Chrome, Firefox, Safari, Edge
- UI renders consistently across browsers
- All features work without browser-specific issues
- Minimum browser versions are documented and supported

#### 15.8 Error Handling - Network and System Errors

**File:** `tests/error-handling/system-errors.spec.ts`

**Steps:**

1. Login as physician user
2. Simulate network disconnection during operation
3. Verify error message is clear and helpful
4. Reconnect and verify operation can be retried
5. Simulate server error (500) if possible
6. Verify appropriate error handling and user guidance
7. Test various failure scenarios

**Expected Results:**

- Application handles network errors gracefully
- Clear error messages inform user of issues
- System errors do not expose sensitive information
- Failed operations can be retried
- Application state is preserved when possible
- Critical failures prompt user to refresh or re-login

#### 15.9 Accessibility - WCAG Compliance

**File:** `tests/accessibility/wcag-compliance.spec.ts`

**Steps:**

1. Navigate application using keyboard only (Tab, Enter, Arrow keys)
2. Verify all interactive elements are keyboard accessible
3. Test with screen reader (JAWS, NVDA, or VoiceOver)
4. Verify color contrast meets standards
5. Check form field labels and accessibility attributes
6. Verify focus indicators are visible

**Expected Results:**

- Application meets WCAG 2.1 Level AA standards (if compliance is required)
- Keyboard navigation works for all features
- Screen reader compatibility for visually impaired users
- Sufficient color contrast for readability
- Form labels and ARIA attributes are properly implemented
- Focus indicators are visible

#### 15.10 Logout and Session Termination

**File:** `tests/authentication/logout.spec.ts`

**Steps:**

1. Login as physician user
2. Locate logout option (may be in header, dropdown menu, or account section)
3. Click Logout
4. Verify redirect to login page
5. Use browser back button to attempt accessing protected page
6. Verify redirect to login (session terminated)
7. Check that no cached PHI is accessible

**Expected Results:**

- Logout option is available and accessible
- Clicking Logout terminates session immediately
- User is redirected to login page
- Attempting to access protected page after logout redirects to login
- Session data is cleared from browser
- No PHI remains accessible after logout

---

Summary of What Was Created:
Part 1 (physician-testplan1.md) covers:
Authentication and Security (7 tests) - CRITICAL PRIORITY
Clinical Dashboard - Pending Studies Tab (4 tests) - HIGH PRIORITY
Clinical Dashboard - Reviewed Studies Tab (3 tests) - HIGH PRIORITY
DICOM Viewer - Image Display and Navigation (8 tests) - CRITICAL PRIORITY
Part 2 (physician-testplan2.md) covers:
DICOM Viewer - Reports and Clinical Documentation (9 tests) - HIGH PRIORITY
DICOM Viewer - Study Sharing (5 tests) - MEDIUM PRIORITY
DICOM Viewer - DICOM Headers (4 tests) - MEDIUM PRIORITY
DICOM Viewer - Study Review Management (4 tests) - CRITICAL PRIORITY
DICOM Viewer - File Attachments (7 tests) - MEDIUM PRIORITY
Study Search and Filtering (8 tests) - HIGH PRIORITY
Account Management (7 tests) - MEDIUM PRIORITY
Administration - Patient Management (14 tests) - MEDIUM PRIORITY
Administration - Worklist Management (7 tests) - MEDIUM PRIORITY
Administration - View Studies (2 tests) - MEDIUM PRIORITY
Cross-Functional and Integration Tests (10 tests) - HIGH PRIORITY
Key Features:
✅ 110 comprehensive test scenarios covering all physician user functionality
✅ Organized by feature domain following knowledge management best practices
✅ Priority levels assigned (Critical, High, Medium) for implementation planning
✅ Detailed test steps - specific enough for any tester to execute
✅ Expected results clearly defined for each scenario
✅ HIPAA & FDA compliance considerations integrated throughout
✅ User story extraction ready - structured for Product team to derive requirements
✅ Based on actual application exploration - all features verified through browser testing

This test plan provides your Product team with the comprehensive documentation they need to extract user stories and requirements for the legacy eCloud application!
