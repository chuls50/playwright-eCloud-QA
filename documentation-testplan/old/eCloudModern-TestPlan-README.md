# Hierarchical Test Plan for eNcounterCloud PACS

## Document Overview

This hierarchical test plan consolidates all user role test scenarios for the eNcounterCloud PACS system. It is structured to support Azure Test Plans with top-level test suites for Shared/Common tests and Role-specific tests, with sub-suites organized by functionality. Authentication and access control tests have been deduplicated into a single Shared section applicable to all roles.

**Total Test Scenarios:** 470 (491 original - 21 deduplicated authentication tests)

---

## Summary Table

| Section                      | Scenario Count |
| ---------------------------- | -------------- |
| **Shared/Common Tests**      | 7              |
| **Physician Role**           | 103            |
| **Administrator Role**       | 91             |
| **Nurse Role**               | 49             |
| **Technician Role**          | 49             |
| **Technology Role**          | 49             |
| **Guest Role**               | 51             |
| **Institution Manager Role** | 87             |
| **TOTAL**                    | **470**        |

---

## Shared/Common Tests

### Authentication and Access Control (CRITICAL)

Common authentication scenarios that apply system-wide across all user roles. Test once with role-specific credentials and permissions verification.

| Scenario Name                       | Brief Description                                                                                                                            | Priority |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| User Login - Valid Credentials      | Verify successful login with valid username/password, redirect to appropriate dashboard, session establishment with correct role permissions | CRITICAL |
| User Login - Invalid Credentials    | Verify login failure with invalid credentials, appropriate error messaging, no system access granted                                         | CRITICAL |
| EULA Acceptance - First Login       | Verify EULA modal displays on first login, user cannot proceed without acceptance, EULA acceptance is persisted                              | CRITICAL |
| EULA Decline - First Login          | Verify declining EULA prevents system access, user returned to login page, session terminated                                                | CRITICAL |
| Session Timeout                     | Verify session expires after idle period, user redirected to login, no cached sensitive data accessible                                      | CRITICAL |
| Role-Based Permissions Verification | Verify user has access only to role-appropriate features, role-based navigation tabs display correctly, unauthorized access is blocked       | CRITICAL |
| Concurrent Session Handling         | Verify system handles concurrent login attempts appropriately, session management maintains data integrity                                   | CRITICAL |

---

## Physician Role

### Clinical Dashboard - Pending Studies (HIGH)

| Scenario Name               | Brief Description                                                                                               | Priority |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| Pending Studies Display     | Verify pending studies list displays with patient name, passcode, consult type, date/time, modality, thumbnails | HIGH     |
| Pending Study Access        | Verify clicking study card opens DICOM viewer with correct study, patient information accuracy                  | HIGH     |
| Pending Studies Pagination  | Verify pagination controls work correctly, page indicators update, study data loads efficiently                 | HIGH     |
| Pending Studies Empty State | Verify empty state message displays when no pending studies, interface remains functional                       | HIGH     |

### Clinical Dashboard - Reviewed Studies (HIGH)

| Scenario Name              | Brief Description                                                                          | Priority |
| -------------------------- | ------------------------------------------------------------------------------------------ | -------- |
| Reviewed Studies Display   | Verify reviewed studies list shows completed reviews with reviewer attribution, timestamps | HIGH     |
| Reviewed Study Access      | Verify clicking reviewed study reopens in DICOM viewer with previous report/notes intact   | HIGH     |
| Reviewed Studies Filtering | Verify filtering reviewed studies by date, reviewer, patient works correctly               | HIGH     |

### DICOM Viewer - Image Display and Navigation (CRITICAL)

| Scenario Name           | Brief Description                                                                               | Priority |
| ----------------------- | ----------------------------------------------------------------------------------------------- | -------- |
| DICOM Viewer Launch     | Verify viewer launches correctly, displays patient header, series thumbnails, main viewport     | CRITICAL |
| Image Series Selection  | Verify clicking series thumbnail loads images in main viewport, series switching works smoothly | CRITICAL |
| Image Zoom In/Out       | Verify zoom controls magnify/reduce image, image quality maintained at zoom levels              | CRITICAL |
| Image Pan/Navigate      | Verify image panning within zoomed view, click-drag navigation works intuitively                | CRITICAL |
| Image Enhance Controls  | Verify brightness/contrast adjustments, window/level manipulation, real-time preview            | CRITICAL |
| Image Invert Function   | Verify color inversion toggle, original/inverted states preserved                               | CRITICAL |
| Multi-Series Navigation | Verify navigating between multiple series, previous series state maintained                     | CRITICAL |
| Viewer Refresh Function | Verify refresh reloads current study, latest images/reports appear                              | CRITICAL |

### DICOM Viewer - Reports and Clinical Documentation (HIGH)

| Scenario Name                    | Brief Description                                                                                | Priority |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| Access Report Creation Interface | Verify clicking Report button opens editor, template selection available                         | HIGH     |
| Create Case Documentation Report | Verify Case Documentation template populates fields, rich text editing works, save functionality | HIGH     |
| Create Discharge Summary         | Verify Discharge Summary template specific fields, clinical data entry, report save              | HIGH     |
| Create HPI Report                | Verify History of Present Illness template, structured data fields, narrative sections           | HIGH     |
| Create SOAP Report               | Verify Subjective/Objective/Assessment/Plan template structure, clinical workflow support        | HIGH     |
| Edit Existing Report             | Verify reopening saved report, modifications persist, version control if applicable              | HIGH     |
| Report Validation                | Verify required field validation, error messaging, save prevention for incomplete reports        | HIGH     |
| Multiple Reports per Study       | Verify creating multiple report types for same study, independent report management              | HIGH     |
| Report Attribution               | Verify physician name/credentials automatically attached to reports, timestamp accuracy          | HIGH     |

### DICOM Viewer - Study Sharing (MEDIUM)

| Scenario Name                | Brief Description                                                                                    | Priority |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | -------- |
| Share Study via Email        | Verify email sharing interface, recipient email input, secure link generation, notification delivery | MEDIUM   |
| Share Study via Passcode     | Verify passcode generation, passcode security settings, guest access enabled                         | MEDIUM   |
| View Shared Studies List     | Verify list of studies shared by physician, share status tracking, recipient information             | MEDIUM   |
| Revoke Study Share           | Verify ability to revoke shared study access, passcode invalidation, guest access termination        | MEDIUM   |
| Share Permissions Management | Verify configuring view-only vs download permissions, expiration dates for shares                    | MEDIUM   |

### DICOM Viewer - DICOM Headers (MEDIUM)

| Scenario Name              | Brief Description                                                                  | Priority |
| -------------------------- | ---------------------------------------------------------------------------------- | -------- |
| View DICOM Header Metadata | Verify DICOM header viewer displays, standard tags readable, metadata completeness | MEDIUM   |
| Search DICOM Headers       | Verify search/filter functionality in header data, tag value lookup                | MEDIUM   |
| Export DICOM Headers       | Verify export header metadata to file, format options (CSV, JSON, etc.)            | MEDIUM   |
| Private Tag Handling       | Verify private/vendor-specific tags display appropriately, data interpretation     | MEDIUM   |

### DICOM Viewer - Study Review Management (CRITICAL)

| Scenario Name               | Brief Description                                                               | Priority |
| --------------------------- | ------------------------------------------------------------------------------- | -------- |
| Mark Study as Reviewed      | Verify clicking Review button updates study status, study moves to Reviewed tab | CRITICAL |
| Review Status Persistence   | Verify reviewed status persists across sessions, study remains in Reviewed list | CRITICAL |
| Review Attribution Tracking | Verify physician name attached to review action, review timestamp recorded      | CRITICAL |
| Unreview Study              | Verify ability to unreview if needed, study returns to Pending status           | CRITICAL |

### DICOM Viewer - File Attachments (MEDIUM)

| Scenario Name                   | Brief Description                                                                  | Priority |
| ------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| Upload File Attachment          | Verify file upload interface, supported file types, size limits, upload progress   | MEDIUM   |
| View Attached Files List        | Verify list of attachments displays, file names/types/sizes shown                  | MEDIUM   |
| Download File Attachment        | Verify downloading attached files, file integrity maintained                       | MEDIUM   |
| Delete File Attachment          | Verify removing attachments, confirmation dialog, permanent deletion               | MEDIUM   |
| Multiple Attachments Management | Verify handling multiple files, attachment organization, bulk operations           | MEDIUM   |
| Attachment File Type Validation | Verify only allowed file types accepted, invalid types rejected with error message | MEDIUM   |
| Large File Upload Handling      | Verify large file upload performance, timeout handling, progress indication        | MEDIUM   |

### Study Search and Filtering (HIGH)

| Scenario Name                    | Brief Description                                                                      | Priority |
| -------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| Study Search by Patient Name     | Verify search returns accurate results for patient name queries, partial match support | HIGH     |
| Study Search by Patient ID       | Verify search by patient identifier, exact match functionality                         | HIGH     |
| Study Search by Date Range       | Verify date range filtering, calendar picker interface, date validation                | HIGH     |
| Study Search by Modality         | Verify filtering by imaging modality (CT, MR, XR, etc.), multi-select support          | HIGH     |
| Study Search by Accession Number | Verify search by unique accession number, precise result retrieval                     | HIGH     |
| Advanced Search Multi-Criteria   | Verify combining multiple search criteria, complex queries, result refinement          | HIGH     |
| Search Results Sorting           | Verify sorting results by date, patient name, modality, study description              | HIGH     |
| Search Results Pagination        | Verify pagination of large search result sets, efficient navigation                    | HIGH     |

### Account Management (MEDIUM)

| Scenario Name                  | Brief Description                                                                               | Priority |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | -------- |
| View Physician Profile         | Verify account information displays correctly, profile fields editable/read-only as appropriate | MEDIUM   |
| Update Email Address           | Verify email update functionality, format validation, change confirmation                       | MEDIUM   |
| Update SMS Number              | Verify SMS/phone number update, format validation, notification preference tied to SMS          | MEDIUM   |
| Update Address Information     | Verify address fields (street, city, state, zip, country) update correctly                      | MEDIUM   |
| Update License Information     | Verify physician-specific fields (License ID, Specialties, NPI) can be updated                  | MEDIUM   |
| Email Notification Preferences | Verify toggling email notifications on/off, preference persists                                 | MEDIUM   |
| Change Password                | Verify password change interface, old password verification, new password strength requirements | MEDIUM   |

### Administration - Patient Management (MEDIUM)

| Scenario Name                   | Brief Description                                                                             | Priority |
| ------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| View Patient List               | Verify patient list displays, patient demographics shown, pagination functional               | MEDIUM   |
| Search Patients                 | Verify patient search by name, ID, demographics, search result accuracy                       | MEDIUM   |
| Create New Patient              | Verify patient creation form, required fields, data validation, successful save               | MEDIUM   |
| Edit Patient Information        | Verify editing existing patient, demographic updates, medical info changes                    | MEDIUM   |
| Delete Patient                  | Verify patient deletion, confirmation dialog, cascade effects on studies                      | MEDIUM   |
| Assign Physician to Patient     | Verify physician assignment functionality, physician search/selection, assignment persistence | MEDIUM   |
| Patient Demographics Validation | Verify field validation (DOB format, gender selection, ID uniqueness)                         | MEDIUM   |
| Patient Medical Information     | Verify medical fields (allergies, blood type, height, weight) update correctly                | MEDIUM   |
| Patient Address Management      | Verify patient address input/update, geographic data validation                               | MEDIUM   |
| Patient Study Association       | Verify viewing studies associated with patient, study count accuracy                          | MEDIUM   |
| Bulk Patient Operations         | Verify selecting multiple patients, bulk actions (if available)                               | MEDIUM   |
| Patient Data Export             | Verify exporting patient list/details, format options                                         | MEDIUM   |
| Patient Duplicate Prevention    | Verify system prevents duplicate patient IDs, warning messages                                | MEDIUM   |
| Patient Inactive Status         | Verify marking patients as inactive, filtering inactive patients                              | MEDIUM   |

### Administration - Worklist Management (MEDIUM)

| Scenario Name           | Brief Description                                                                | Priority |
| ----------------------- | -------------------------------------------------------------------------------- | -------- |
| View Worklist           | Verify worklist displays scheduled procedures, study details shown               | MEDIUM   |
| Worklist Date Filtering | Verify filtering worklist by date (Today, Tomorrow, +7/-7 days), date navigation | MEDIUM   |
| Worklist Search         | Verify searching worklist by patient, accession number, modality                 | MEDIUM   |
| Create Worklist Entry   | Verify adding new scheduled procedure to worklist, required fields               | MEDIUM   |
| Edit Worklist Entry     | Verify modifying scheduled procedure details, update persistence                 | MEDIUM   |
| Delete Worklist Entry   | Verify removing worklist item, confirmation, cleanup                             | MEDIUM   |
| Worklist Status Updates | Verify updating procedure status (Scheduled, In Progress, Completed)             | MEDIUM   |

### Administration - View Studies (MEDIUM)

| Scenario Name             | Brief Description                                                 | Priority |
| ------------------------- | ----------------------------------------------------------------- | -------- |
| View Studies List         | Verify comprehensive study list displays, all studies accessible  | MEDIUM   |
| Filter Studies by Patient | Verify filtering studies by patient selection, accurate filtering | MEDIUM   |

### Cross-Functional and Integration Tests (HIGH)

| Scenario Name                | Brief Description                                                                                              | Priority |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | -------- |
| End-to-End Clinical Workflow | Verify complete workflow: receive study → review images → create report → mark reviewed → share with colleague | HIGH     |
| Study to Patient Association | Verify studies correctly linked to patients, demographic consistency                                           | HIGH     |
| Report to Study Association  | Verify reports attached to correct studies, report retrieval from study                                        | HIGH     |
| Multi-Tab Navigation         | Verify switching between Pending, Reviewed, Study Search, Admin tabs maintains state                           | HIGH     |
| Concurrent User Access       | Verify multiple physicians accessing same study, data consistency                                              | HIGH     |
| Network Error Recovery       | Verify graceful error handling for network issues, data preservation                                           | HIGH     |
| Large Study Load Performance | Verify performance with studies containing many images/series                                                  | HIGH     |
| Browser Compatibility        | Verify functionality across supported browsers (Chrome, Firefox, Safari, Edge)                                 | HIGH     |
| Mobile Responsive Behavior   | Verify interface adapts appropriately on tablet/mobile devices (if supported)                                  | HIGH     |
| Audit Trail Compliance       | Verify all clinical actions logged appropriately for HIPAA compliance                                          | HIGH     |

---

## Administrator Role

### Institution Management (HIGH)

| Scenario Name                          | Brief Description                                                                   | Priority |
| -------------------------------------- | ----------------------------------------------------------------------------------- | -------- |
| View Institutions List                 | Verify institutions display with name, AE Title, configuration details              | HIGH     |
| Create New Institution                 | Verify institution creation form, required fields (name, AE Title), successful save | HIGH     |
| Edit Institution Details               | Verify modifying institution information, update persistence                        | HIGH     |
| Delete Institution                     | Verify institution deletion, confirmation dialog, dependency checks                 | HIGH     |
| Institution AE Title Configuration     | Verify unique AE Title enforcement, DICOM standards compliance                      | HIGH     |
| Institution Contact Information        | Verify institution address, phone, email fields update correctly                    | HIGH     |
| Configure Institution Destination      | Verify setting up institution as routing destination, destination parameters        | HIGH     |
| Institution Report Template Assignment | Verify assigning report templates to institutions, template availability            | HIGH     |
| View Institution Statistics            | Verify viewing institution usage stats (study count, storage) if available          | HIGH     |
| Institution Active/Inactive Status     | Verify toggling institution active status, impact on routing                        | HIGH     |
| Institution Search and Filtering       | Verify searching institutions by name, AE Title, filtering options                  | HIGH     |
| Bulk Institution Configuration         | Verify applying settings to multiple institutions simultaneously                    | HIGH     |
| Institution Export/Import              | Verify exporting institution configurations, importing from file                    | HIGH     |
| Institution DICOM Connectivity Test    | Verify testing DICOM connectivity to institution nodes                              | HIGH     |

### DICOM Node Management (CRITICAL)

| Scenario Name                    | Brief Description                                                                     | Priority |
| -------------------------------- | ------------------------------------------------------------------------------------- | -------- |
| View DICOM Nodes List            | Verify DICOM nodes display with AE Title, host, port, TLS status                      | CRITICAL |
| Create New DICOM Node            | Verify node creation form, required fields (AE Title, host, port), validation         | CRITICAL |
| Edit DICOM Node Configuration    | Verify modifying node parameters, connection settings update                          | CRITICAL |
| Delete DICOM Node                | Verify node deletion, confirmation, routing rule cleanup                              | CRITICAL |
| DICOM AE Title Validation        | Verify AE Title format validation, uniqueness enforcement, DICOM standards            | CRITICAL |
| Configure Node Host and Port     | Verify host/IP address and port number configuration, validation                      | CRITICAL |
| Enable/Disable TLS Encryption    | Verify TLS toggle for secure DICOM communication, certificate handling                | CRITICAL |
| Test DICOM Echo (C-ECHO)         | Verify DICOM Echo connectivity test, success/failure indication, troubleshooting info | CRITICAL |
| DICOM Node Priority Settings     | Verify setting node priority for routing, priority-based routing behavior             | CRITICAL |
| Node Storage Configuration       | Verify configuring storage parameters for node, capacity settings                     | CRITICAL |
| Node Query/Retrieve Settings     | Verify C-FIND and C-MOVE configuration, query capabilities                            | CRITICAL |
| Node Modality Filtering          | Verify configuring which modalities node accepts, filtering rules                     | CRITICAL |
| Node Active/Inactive Status      | Verify toggling node active status, impact on DICOM operations                        | CRITICAL |
| Multiple Node Management         | Verify managing multiple DICOM nodes, bulk operations if available                    | CRITICAL |
| Node Configuration Export/Import | Verify exporting/importing node configurations, backup/restore                        | CRITICAL |

### Account Management (MEDIUM)

| Scenario Name              | Brief Description                                                 | Priority |
| -------------------------- | ----------------------------------------------------------------- | -------- |
| View Administrator Profile | Verify administrator account information displays correctly       | MEDIUM   |
| Update Admin Email         | Verify email address update, validation, notification delivery    | MEDIUM   |
| Update Admin SMS Number    | Verify SMS/phone number update, format validation                 | MEDIUM   |
| Update Admin Address       | Verify address fields update correctly                            | MEDIUM   |
| Admin Email Notifications  | Verify toggling admin notification preferences                    | MEDIUM   |
| Change Admin Password      | Verify password change functionality, security requirements       | MEDIUM   |
| Admin Profile Restrictions | Verify certain fields (username, role) are read-only/non-editable | MEDIUM   |

### Security and Compliance (CRITICAL)

| Scenario Name                         | Brief Description                                                                    | Priority |
| ------------------------------------- | ------------------------------------------------------------------------------------ | -------- |
| Audit Trail for Configuration Changes | Verify all admin configuration changes logged, audit trail completeness              | CRITICAL |
| Role-Based Access Enforcement         | Verify administrators cannot access clinical features, separation of duties          | CRITICAL |
| Data Encryption Verification          | Verify data at rest and in transit is encrypted, TLS/SSL implementation              | CRITICAL |
| System-Wide Security Settings         | Verify configuring global security policies (password requirements, session timeout) | CRITICAL |
| HIPAA Compliance Reporting            | Verify generating compliance reports, audit log exports                              | CRITICAL |
| Access Control Review                 | Verify reviewing user access levels, permission auditing                             | CRITICAL |
| Security Incident Logging             | Verify security events (failed logins, unauthorized access attempts) are logged      | CRITICAL |

### Integration and System Operations (HIGH)

| Scenario Name                 | Brief Description                                                        | Priority |
| ----------------------------- | ------------------------------------------------------------------------ | -------- |
| Inter-Institution Routing     | Verify configuring routing rules between institutions, data flow testing | HIGH     |
| DICOM Worklist Integration    | Verify worklist server integration, modality worklist queries            | HIGH     |
| External System Integration   | Verify integration with external EMR/EHR systems if applicable           | HIGH     |
| Backup and Restore Operations | Verify system backup procedures, configuration restore capability        | HIGH     |
| System Health Monitoring      | Verify viewing system health dashboard, performance metrics              | HIGH     |
| Database Maintenance          | Verify database maintenance operations, cleanup procedures               | HIGH     |
| System Upgrade Procedures     | Verify configuration preservation during system upgrades                 | HIGH     |

### Error Handling and Edge Cases (MEDIUM)

| Scenario Name                        | Brief Description                                                         | Priority |
| ------------------------------------ | ------------------------------------------------------------------------- | -------- |
| Invalid DICOM Node Configuration     | Verify handling invalid AE Title, unreachable host, port conflicts        | MEDIUM   |
| Network Connectivity Issues          | Verify graceful handling of network failures, timeout management          | MEDIUM   |
| Large Configuration Dataset          | Verify performance with many institutions/nodes, pagination/filtering     | MEDIUM   |
| Concurrent Administrator Access      | Verify multiple admins making changes simultaneously, conflict resolution | MEDIUM   |
| Configuration Rollback               | Verify ability to rollback configuration changes if errors occur          | MEDIUM   |
| Validation Error Messaging           | Verify clear, actionable error messages for validation failures           | MEDIUM   |
| Required Field Validation            | Verify all required fields enforced across admin forms                    | MEDIUM   |
| Duplicate Detection                  | Verify prevention of duplicate institutions/nodes, warning messages       | MEDIUM   |
| Data Import Validation               | Verify validation of imported configuration data, error reporting         | MEDIUM   |
| Session Timeout During Configuration | Verify configuration data preserved if session times out mid-edit         | MEDIUM   |
| Browser Back Button Handling         | Verify proper handling of browser navigation during configuration         | MEDIUM   |
| Unsaved Changes Warning              | Verify warning when navigating away with unsaved configuration changes    | MEDIUM   |

---

## Nurse Role

### Clinical Dashboard - Pending Studies (HIGH)

| Scenario Name                   | Brief Description                                                       | Priority |
| ------------------------------- | ----------------------------------------------------------------------- | -------- |
| Nurse Pending Studies Display   | Verify nurse can view pending studies queue, all study metadata visible | HIGH     |
| Nurse Pending Study Access      | Verify nurse can open and review pending studies in DICOM viewer        | HIGH     |
| Nurse Pending Queue Navigation  | Verify pagination and navigation through pending studies                | HIGH     |
| Nurse Pending Queue Empty State | Verify empty state handling when no pending studies                     | HIGH     |

### Clinical Dashboard - Reviewed Studies (HIGH)

| Scenario Name                  | Brief Description                                                    | Priority |
| ------------------------------ | -------------------------------------------------------------------- | -------- |
| Nurse Reviewed Studies Display | Verify nurse can view reviewed studies with nurse attribution        | HIGH     |
| Nurse Reviewed Study Re-access | Verify nurse can reopen reviewed studies with previous documentation | HIGH     |
| Nurse Review Filtering         | Verify filtering reviewed studies by nurse name, date, patient       | HIGH     |

### DICOM Viewer - Clinical Image Review (CRITICAL)

| Scenario Name                  | Brief Description                                                   | Priority |
| ------------------------------ | ------------------------------------------------------------------- | -------- |
| Nurse DICOM Viewer Launch      | Verify nurse can launch DICOM viewer for image review               | CRITICAL |
| Nurse Image Navigation         | Verify nurse can navigate through image series and studies          | CRITICAL |
| Nurse Image Manipulation       | Verify nurse can use zoom, enhance, invert, pan functions           | CRITICAL |
| Nurse Multi-Series Review      | Verify nurse can review multiple series within study                | CRITICAL |
| Nurse Viewer Refresh           | Verify refresh functionality for nurses to reload latest study data | CRITICAL |
| Nurse Image Quality Assessment | Verify nurse can assess image quality for clinical adequacy         | CRITICAL |
| Nurse Viewport Configuration   | Verify nurse can adjust viewport settings for optimal review        | CRITICAL |
| Nurse Measurement Tools        | Verify nurse can use measurement/annotation tools if available      | CRITICAL |

### Clinical Documentation - Reports and Notes (HIGH)

| Scenario Name                 | Brief Description                                                       | Priority |
| ----------------------------- | ----------------------------------------------------------------------- | -------- |
| Nurse Report Creation         | Verify nurse can create clinical reports using available templates      | HIGH     |
| Nurse Clinical Notes          | Verify nurse can add clinical notes to studies                          | HIGH     |
| Nurse Documentation Templates | Verify nurse-specific documentation templates (Care Plans, Assessments) | HIGH     |
| Nurse Report Attribution      | Verify nurse name/credentials attached to all documentation             | HIGH     |

### Account Management - Nurse Profile (MEDIUM)

| Scenario Name                    | Brief Description                                             | Priority |
| -------------------------------- | ------------------------------------------------------------- | -------- |
| View Nurse Profile               | Verify nurse profile displays with nursing-specific fields    | MEDIUM   |
| Update Nurse License Information | Verify nurse can update License ID and nursing specialties    | MEDIUM   |
| Update Nurse Contact Information | Verify email, SMS, phone, address updates for nurse account   | MEDIUM   |
| Nurse Notification Preferences   | Verify nurse can configure email/SMS notification preferences | MEDIUM   |
| Nurse Password Management        | Verify nurse can change password with security requirements   | MEDIUM   |
| Nurse Credentials Display        | Verify nursing credentials properly displayed in system       | MEDIUM   |

### Study Search - Clinical Research (HIGH)

| Scenario Name                | Brief Description                                                     | Priority |
| ---------------------------- | --------------------------------------------------------------------- | -------- |
| Nurse Study Search           | Verify nurse can search studies by patient, date, modality, accession | HIGH     |
| Nurse Search Results         | Verify search results display appropriately for nursing workflows     | HIGH     |
| Nurse Advanced Search        | Verify multi-criteria search functionality for nurses                 | HIGH     |
| Nurse Search Filtering       | Verify filtering and sorting search results                           | HIGH     |
| Nurse Patient-Centric Search | Verify searching all studies for specific patient                     | HIGH     |

### Sharing and Collaboration (HIGH)

| Scenario Name                         | Brief Description                                                | Priority |
| ------------------------------------- | ---------------------------------------------------------------- | -------- |
| Nurse Study Sharing                   | Verify nurse can share studies with physicians and other nurses  | HIGH     |
| Nurse Collaboration Features          | Verify nurse can collaborate on study reviews with care team     | HIGH     |
| Nurse Share Management                | Verify nurse can view and manage studies shared with them        | HIGH     |
| Nurse Interdisciplinary Communication | Verify communication features for interdisciplinary coordination | HIGH     |
| Nurse Handoff Documentation           | Verify nurse can document care transitions and handoffs          | HIGH     |

### Clinical Workflow Integration (HIGH)

| Scenario Name                     | Brief Description                                                 | Priority |
| --------------------------------- | ----------------------------------------------------------------- | -------- |
| Nurse Care Plan Integration       | Verify integration with care planning workflows                   | HIGH     |
| Nurse Patient Assessment Workflow | Verify nurse assessment workflow within PACS                      | HIGH     |
| Nurse Documentation Workflow      | Verify end-to-end documentation workflow for nurses               | HIGH     |
| Nurse Clinical Decision Support   | Verify clinical decision support features for nursing care        | HIGH     |
| Nurse Multidisciplinary Rounds    | Verify features supporting multidisciplinary rounds participation | HIGH     |

### Security and Compliance (CRITICAL)

| Scenario Name                 | Brief Description                                                        | Priority |
| ----------------------------- | ------------------------------------------------------------------------ | -------- |
| Nurse HIPAA Compliance        | Verify nurse actions comply with HIPAA requirements, audit trails        | CRITICAL |
| Nurse Access Control          | Verify nurse has appropriate access level, cannot access admin functions | CRITICAL |
| Nurse PHI Protection          | Verify PHI protection in nurse workflows, secure data handling           | CRITICAL |
| Nurse Authentication Security | Verify secure authentication for nurse accounts                          | CRITICAL |
| Nurse Audit Trail             | Verify all nurse clinical actions logged appropriately                   | CRITICAL |

### Error Handling and Edge Cases (MEDIUM)

| Scenario Name                   | Brief Description                                                  | Priority |
| ------------------------------- | ------------------------------------------------------------------ | -------- |
| Nurse Network Error Handling    | Verify graceful handling of network issues during nurse workflows  | MEDIUM   |
| Nurse Large Study Performance   | Verify performance with large imaging studies in nursing context   | MEDIUM   |
| Nurse Concurrent Access         | Verify handling of concurrent nurse access to same studies         | MEDIUM   |
| Nurse Session Recovery          | Verify session recovery after unexpected disconnection             | MEDIUM   |
| Nurse Browser Compatibility     | Verify nurse interface works across supported browsers             | MEDIUM   |
| Nurse Validation Error Handling | Verify clear error messages for validation failures in nurse forms | MEDIUM   |

---

## Technician Role

### Clinical Dashboard - Pending Studies (HIGH)

| Scenario Name                    | Brief Description                                                     | Priority |
| -------------------------------- | --------------------------------------------------------------------- | -------- |
| Technician Pending Queue Display | Verify technician can view pending studies requiring technical review | HIGH     |
| Technician Study Selection       | Verify technician can select and open studies for quality review      | HIGH     |
| Technician Queue Navigation      | Verify pagination through technician pending queue                    | HIGH     |
| Technician Queue Empty State     | Verify empty state handling for technician queue                      | HIGH     |

### Clinical Dashboard - Reviewed Studies (HIGH)

| Scenario Name                        | Brief Description                                                    | Priority |
| ------------------------------------ | -------------------------------------------------------------------- | -------- |
| Technician Reviewed Studies          | Verify technician can view studies they've reviewed with attribution | HIGH     |
| Technician Quality Assurance History | Verify technician can access QA history for studies                  | HIGH     |
| Technician Review Search             | Verify searching technician-reviewed studies                         | HIGH     |

### DICOM Viewer - Image Quality Assessment (CRITICAL)

| Scenario Name                          | Brief Description                                                       | Priority |
| -------------------------------------- | ----------------------------------------------------------------------- | -------- |
| Technician Viewer Launch               | Verify technician can launch DICOM viewer for image assessment          | CRITICAL |
| Technician Image Quality Review        | Verify technician can assess image quality, artifacts, technical issues | CRITICAL |
| Technician Image Manipulation          | Verify technician can use all viewer tools for quality assessment       | CRITICAL |
| Technician Series Review               | Verify technician can review all series for completeness                | CRITICAL |
| Technician DICOM Compliance Check      | Verify technician can verify DICOM standard compliance                  | CRITICAL |
| Technician Image Parameter Review      | Verify technician can review acquisition parameters, protocols          | CRITICAL |
| Technician Artifact Detection          | Verify technician can identify and document imaging artifacts           | CRITICAL |
| Technician Image Metadata Verification | Verify technician can verify image metadata accuracy                    | CRITICAL |

### Technical Documentation (HIGH)

| Scenario Name                     | Brief Description                                          | Priority |
| --------------------------------- | ---------------------------------------------------------- | -------- |
| Technician Technical Notes        | Verify technician can add technical notes to studies       | HIGH     |
| Technician QA Documentation       | Verify technician can document quality assurance findings  | HIGH     |
| Technician Issue Reporting        | Verify technician can report technical issues with studies | HIGH     |
| Technician Protocol Documentation | Verify technician can document imaging protocols used      | HIGH     |

### Study Management (MEDIUM)

| Scenario Name                  | Brief Description                                              | Priority |
| ------------------------------ | -------------------------------------------------------------- | -------- |
| Technician Study Upload        | Verify technician can upload studies to PACS                   | MEDIUM   |
| Technician Study Import        | Verify technician can import studies from external sources     | MEDIUM   |
| Technician Study Export        | Verify technician can export studies for archiving or transfer | MEDIUM   |
| Technician Metadata Correction | Verify technician can correct study metadata                   | MEDIUM   |
| Technician Study Reprocessing  | Verify technician can reprocess studies if needed              | MEDIUM   |

### Account Management - Technician Profile (MEDIUM)

| Scenario Name                    | Brief Description                                                    | Priority |
| -------------------------------- | -------------------------------------------------------------------- | -------- |
| View Technician Profile          | Verify technician account profile displays correctly                 | MEDIUM   |
| Update Technician Credentials    | Verify updating technician certification/license information         | MEDIUM   |
| Update Technician Contact Info   | Verify updating email, phone, SMS, address for technician            | MEDIUM   |
| Technician Notification Settings | Verify configuring notification preferences for technical alerts     | MEDIUM   |
| Technician Password Change       | Verify password change functionality for technician account          | MEDIUM   |
| Technician Specialties           | Verify updating technician imaging specialties (CT, MR, X-ray, etc.) | MEDIUM   |

### Study Search - Technical Operations (HIGH)

| Scenario Name                        | Brief Description                                            | Priority |
| ------------------------------------ | ------------------------------------------------------------ | -------- |
| Technician Study Search              | Verify technician can search studies by technical parameters | HIGH     |
| Technician Modality Search           | Verify searching by specific modalities (CT, MR, XR, US)     | HIGH     |
| Technician Protocol Search           | Verify searching studies by imaging protocol                 | HIGH     |
| Technician Date Range Search         | Verify searching studies within date ranges for QA review    | HIGH     |
| Technician Advanced Technical Search | Verify multi-criteria search for technical parameters        | HIGH     |

### Sharing and Collaboration (HIGH)

| Scenario Name                           | Brief Description                                                | Priority |
| --------------------------------------- | ---------------------------------------------------------------- | -------- |
| Technician Study Sharing                | Verify technician can share studies with radiologists/physicians | HIGH     |
| Technician Technical Consultation       | Verify technician can request technical consultation on studies  | HIGH     |
| Technician Cross-Modality Collaboration | Verify collaboration features for multi-modality studies         | HIGH     |
| Technician QA Escalation                | Verify technician can escalate quality issues to supervisors     | HIGH     |
| Technician Training Material Sharing    | Verify sharing studies for training/educational purposes         | HIGH     |

### Quality Assurance Workflow (HIGH)

| Scenario Name                      | Brief Description                                              | Priority |
| ---------------------------------- | -------------------------------------------------------------- | -------- |
| Technician QA Checklist            | Verify technician can complete QA checklists for studies       | HIGH     |
| Technician Protocol Verification   | Verify verifying correct imaging protocols were followed       | HIGH     |
| Technician Image Acceptability     | Verify marking images as acceptable/unacceptable for diagnosis | HIGH     |
| Technician Repeat Study Management | Verify managing repeat studies due to quality issues           | HIGH     |
| Technician QA Reporting            | Verify generating QA reports for management review             | HIGH     |

### Technical System Operations (MEDIUM)

| Scenario Name                     | Brief Description                                           | Priority |
| --------------------------------- | ----------------------------------------------------------- | -------- |
| Technician DICOM Send Operations  | Verify technician can initiate DICOM send operations        | MEDIUM   |
| Technician Study Routing          | Verify technician can configure/verify study routing        | MEDIUM   |
| Technician Archive Management     | Verify technician can manage archived studies               | MEDIUM   |
| Technician Storage Monitoring     | Verify technician can monitor PACS storage usage            | MEDIUM   |
| Technician System Troubleshooting | Verify technician troubleshooting tools/resources available | MEDIUM   |

### Error Handling and Edge Cases (MEDIUM)

| Scenario Name                      | Brief Description                                           | Priority |
| ---------------------------------- | ----------------------------------------------------------- | -------- |
| Technician Network Error Recovery  | Verify handling network errors during technician operations | MEDIUM   |
| Technician Large Study Performance | Verify performance with very large imaging studies          | MEDIUM   |
| Technician Concurrent User Access  | Verify handling concurrent technician access to studies     | MEDIUM   |
| Technician Browser Compatibility   | Verify technician interface across supported browsers       | MEDIUM   |
| Technician Mobile Device Access    | Verify technician can use mobile devices if supported       | MEDIUM   |
| Technician Validation Errors       | Verify clear error messaging for validation failures        | MEDIUM   |

---

## Technology Role

### Clinical Dashboard - Pending Studies (HIGH)

| Scenario Name                 | Brief Description                                                          | Priority |
| ----------------------------- | -------------------------------------------------------------------------- | -------- |
| Technology User Pending Queue | Verify technology user can view pending studies for infrastructure support | HIGH     |
| Technology Study Access       | Verify technology user can access studies to troubleshoot technical issues | HIGH     |
| Technology Queue Navigation   | Verify pagination and navigation for technology user workflows             | HIGH     |
| Technology Queue Empty State  | Verify empty state handling for technology user pending queue              | HIGH     |

### Clinical Dashboard - Reviewed Studies (HIGH)

| Scenario Name                    | Brief Description                                                    | Priority |
| -------------------------------- | -------------------------------------------------------------------- | -------- |
| Technology Reviewed Studies View | Verify technology user can view reviewed studies for system analysis | HIGH     |
| Technology Review History        | Verify accessing review history for system performance analysis      | HIGH     |
| Technology Review Search         | Verify searching reviewed studies for troubleshooting patterns       | HIGH     |

### DICOM Viewer - System Technology Review (CRITICAL)

| Scenario Name                            | Brief Description                                                     | Priority |
| ---------------------------------------- | --------------------------------------------------------------------- | -------- |
| Technology Viewer Access                 | Verify technology user can access DICOM viewer for system testing     | CRITICAL |
| Technology Image Loading Verification    | Verify technology user can verify image loading performance           | CRITICAL |
| Technology Viewer Performance Testing    | Verify technology user can test viewer performance and responsiveness | CRITICAL |
| Technology Rendering Verification        | Verify verifying image rendering accuracy and quality                 | CRITICAL |
| Technology Browser Compatibility Testing | Verify testing viewer across different browsers                       | CRITICAL |
| Technology Viewer Error Detection        | Verify detecting and documenting viewer errors and issues             | CRITICAL |
| Technology Caching Verification          | Verify verifying image caching and loading mechanisms                 | CRITICAL |
| Technology Network Performance Testing   | Verify testing network performance impact on viewer                   | CRITICAL |

### Technology Documentation (HIGH)

| Scenario Name                   | Brief Description                                          | Priority |
| ------------------------------- | ---------------------------------------------------------- | -------- |
| Technology System Notes         | Verify technology user can add system/infrastructure notes | HIGH     |
| Technology Issue Tracking       | Verify documenting system issues and resolutions           | HIGH     |
| Technology Performance Metrics  | Verify documenting system performance metrics              | HIGH     |
| Technology Troubleshooting Logs | Verify creating troubleshooting logs for system issues     | HIGH     |

### Account Management - Technology Profile (MEDIUM)

| Scenario Name                       | Brief Description                                              | Priority |
| ----------------------------------- | -------------------------------------------------------------- | -------- |
| View Technology Profile             | Verify technology user profile displays correctly              | MEDIUM   |
| Update Technology Contact Info      | Verify updating email, SMS, phone, address for technology user | MEDIUM   |
| Technology Notification Preferences | Verify configuring notifications for system alerts             | MEDIUM   |
| Technology Password Management      | Verify password change functionality for technology user       | MEDIUM   |
| Technology Specialization           | Verify documenting technology specializations/expertise areas  | MEDIUM   |
| Technology Credentials              | Verify updating technology certifications and credentials      | MEDIUM   |

### Study Search - Infrastructure Analysis (HIGH)

| Scenario Name                          | Brief Description                                              | Priority |
| -------------------------------------- | -------------------------------------------------------------- | -------- |
| Technology Study Search                | Verify technology user can search studies for system analysis  | HIGH     |
| Technology Performance Analysis Search | Verify searching studies by performance characteristics        | HIGH     |
| Technology Date Range Analysis         | Verify searching studies within date ranges for trend analysis | HIGH     |
| Technology System Load Analysis        | Verify analyzing study distribution for system load            | HIGH     |
| Technology Advanced Search             | Verify multi-criteria search for infrastructure analysis       | HIGH     |

### Sharing and Collaboration (HIGH)

| Scenario Name                       | Brief Description                                               | Priority |
| ----------------------------------- | --------------------------------------------------------------- | -------- |
| Technology Study Sharing            | Verify technology user can share studies for system testing     | HIGH     |
| Technology Cross-Team Collaboration | Verify collaboration features with clinical and technical teams | HIGH     |
| Technology System Demo Sharing      | Verify sharing studies for system demonstrations                | HIGH     |
| Technology Escalation Features      | Verify escalating infrastructure issues to vendors/support      | HIGH     |
| Technology Training Collaboration   | Verify sharing for technology training purposes                 | HIGH     |

### Infrastructure Monitoring (HIGH)

| Scenario Name                       | Brief Description                                         | Priority |
| ----------------------------------- | --------------------------------------------------------- | -------- |
| Technology System Health Monitoring | Verify monitoring overall system health and performance   | HIGH     |
| Technology Storage Monitoring       | Verify monitoring storage capacity and usage              | HIGH     |
| Technology Network Performance      | Verify monitoring network performance metrics             | HIGH     |
| Technology Database Performance     | Verify monitoring database query performance              | HIGH     |
| Technology User Activity Monitoring | Verify monitoring user activity and system usage patterns | HIGH     |

### System Integration Testing (HIGH)

| Scenario Name                        | Brief Description                                     | Priority |
| ------------------------------------ | ----------------------------------------------------- | -------- |
| Technology DICOM Integration Testing | Verify testing DICOM integration functionality        | HIGH     |
| Technology API Integration Testing   | Verify testing API integrations with external systems | HIGH     |
| Technology Database Integration      | Verify testing database integration and connectivity  | HIGH     |
| Technology Security Integration      | Verify testing security system integrations           | HIGH     |
| Technology Backup Integration        | Verify testing backup and recovery integrations       | HIGH     |

### Error Handling and Edge Cases (MEDIUM)

| Scenario Name                         | Brief Description                                      | Priority |
| ------------------------------------- | ------------------------------------------------------ | -------- |
| Technology Network Failure Testing    | Verify testing system behavior during network failures | MEDIUM   |
| Technology Load Testing               | Verify system performance under heavy load conditions  | MEDIUM   |
| Technology Concurrent Access Testing  | Verify testing concurrent user access scenarios        | MEDIUM   |
| Technology Browser Compatibility      | Verify testing across all supported browsers           | MEDIUM   |
| Technology Error Logging Verification | Verify system error logging completeness and accuracy  | MEDIUM   |
| Technology Recovery Testing           | Verify testing system recovery after failures          | MEDIUM   |

---

## Guest Role

### Authentication and Access (CRITICAL)

Note: Only login success/failure and session timeout are moved to Shared. Guest-specific scenarios remain here due to unique access model.

| Scenario Name                            | Brief Description                                                         | Priority |
| ---------------------------------------- | ------------------------------------------------------------------------- | -------- |
| Guest Restricted Navigation Verification | Verify guest user only sees Shares and Account tabs, no clinical features | CRITICAL |

### Passcode-Based Study Access (HIGH)

| Scenario Name                      | Brief Description                                                    | Priority |
| ---------------------------------- | -------------------------------------------------------------------- | -------- |
| Access Study with Valid Passcode   | Verify guest can enter valid passcode and access shared study        | HIGH     |
| Access Study with Invalid Passcode | Verify invalid/expired passcodes are rejected with error message     | HIGH     |
| Multiple Passcode Entry            | Verify guest can enter multiple passcodes to access multiple studies | HIGH     |
| Delete Passcode                    | Verify guest can remove passcode before submission                   | HIGH     |
| Passcode Entry Back Navigation     | Verify back navigation from passcode entry returns to shares view    | HIGH     |

### Study Sharing Interface (HIGH)

| Scenario Name             | Brief Description                                                  | Priority |
| ------------------------- | ------------------------------------------------------------------ | -------- |
| View Shared Studies List  | Verify guest can view list of studies accessible via passcodes     | HIGH     |
| Filter All Studies        | Verify "All" filter shows all shared studies accessible to guest   | HIGH     |
| Filter Sent Studies       | Verify "Sent" filter shows studies shared by guest (if applicable) | HIGH     |
| No Shares Available State | Verify appropriate message when no shares are available            | HIGH     |

### Account Management (MEDIUM)

| Scenario Name                    | Brief Description                                                          | Priority |
| -------------------------------- | -------------------------------------------------------------------------- | -------- |
| View Guest Account Information   | Verify guest can view account details (email, SMS, address)                | MEDIUM   |
| Update Guest Email Address       | Verify guest can update email address with validation                      | MEDIUM   |
| Update Guest SMS Number          | Verify guest can update SMS number with format validation                  | MEDIUM   |
| Update Guest Address Information | Verify guest can update address fields (street, city, state, zip, country) | MEDIUM   |
| Toggle Guest Email Notifications | Verify guest can toggle email notification preferences                     | MEDIUM   |
| Change Guest Password            | Verify guest can change password with security requirements                | MEDIUM   |

### Security and Access Control (CRITICAL)

| Scenario Name                  | Brief Description                                                              | Priority |
| ------------------------------ | ------------------------------------------------------------------------------ | -------- |
| Guest Study Access Boundaries  | Verify guest can only view studies with valid passcode, no unauthorized access | CRITICAL |
| Audit Trail Logging for Guest  | Verify guest activities are logged in audit trail                              | CRITICAL |
| Guest Session Security Timeout | Verify guest session expires after idle period, automatic logout               | CRITICAL |
| Expired Passcode Handling      | Verify expired passcodes are rejected, clear expiration messaging              | CRITICAL |

### Error Handling and Edge Cases (MEDIUM)

| Scenario Name                    | Brief Description                                                        | Priority |
| -------------------------------- | ------------------------------------------------------------------------ | -------- |
| Invalid Email Validation         | Verify invalid email formats rejected with error message                 | MEDIUM   |
| Invalid Phone Number Validation  | Verify invalid phone formats rejected with validation error              | MEDIUM   |
| Empty Required Fields Validation | Verify required fields enforced, prevent save with missing data          | MEDIUM   |
| Network Error Handling           | Verify graceful handling of network errors, data integrity maintained    | MEDIUM   |
| Concurrent Guest Login Handling  | Verify handling of concurrent login attempts with same guest credentials | MEDIUM   |

### Integration and Workflow (HIGH)

| Scenario Name                    | Brief Description                                                                 | Priority |
| -------------------------------- | --------------------------------------------------------------------------------- | -------- |
| Access Physician Shared Studies  | Verify guest can access studies shared by physicians via passcode                 | HIGH     |
| Access Multi-Role Shared Studies | Verify guest can access studies shared by multiple clinical roles                 | HIGH     |
| Guest Notification Workflow      | Verify guest receives notifications when studies are shared (if enabled)          | HIGH     |
| Cross-Device Study Access        | Verify guest can access shared studies on different devices with same credentials | HIGH     |

### DICOM Viewer Access for Guests (HIGH)

| Scenario Name             | Brief Description                                                        | Priority |
| ------------------------- | ------------------------------------------------------------------------ | -------- |
| Guest DICOM Viewer Launch | Verify guest can open DICOM viewer for shared studies                    | HIGH     |
| Guest Image Viewing       | Verify guest can view images in shared studies (read-only)               | HIGH     |
| Guest Viewer Navigation   | Verify guest can navigate through series/images in shared studies        | HIGH     |
| Guest Viewer Limitations  | Verify guest cannot perform administrative actions (share, report, etc.) | HIGH     |
| Guest Study Download      | Verify guest can download shared studies if permitted by sharing user    | HIGH     |

### Guest User Experience (MEDIUM)

| Scenario Name               | Brief Description                                                 | Priority |
| --------------------------- | ----------------------------------------------------------------- | -------- |
| Guest Onboarding Experience | Verify guest receives clear instructions on using passcode system | MEDIUM   |
| Guest Help Resources        | Verify guest has access to help/support resources                 | MEDIUM   |
| Guest Interface Simplicity  | Verify guest interface is simplified and easy to navigate         | MEDIUM   |
| Guest Mobile Responsiveness | Verify guest interface works well on mobile devices               | MEDIUM   |

### Compliance and Privacy (CRITICAL)

| Scenario Name           | Brief Description                                             | Priority |
| ----------------------- | ------------------------------------------------------------- | -------- |
| Guest PHI Protection    | Verify PHI is appropriately protected in guest workflows      | CRITICAL |
| Guest Access Logging    | Verify all guest study access is logged for compliance        | CRITICAL |
| Guest Data Retention    | Verify guest session data is properly cleaned up after logout | CRITICAL |
| Guest Passcode Security | Verify passcode system maintains HIPAA-compliant security     | CRITICAL |

---

## Institution Manager Role

### Patient Management - Creation (HIGH)

| Scenario Name                     | Brief Description                                                     | Priority |
| --------------------------------- | --------------------------------------------------------------------- | -------- |
| Access Patient Creation Interface | Verify institution manager can access patient creation form           | HIGH     |
| Create Complete Patient Record    | Verify creating patient with full demographic and medical information | HIGH     |
| Patient Creation Field Validation | Verify all required fields validated, appropriate error messages      | HIGH     |
| Patient Birth Date Validation     | Verify birth date format validation, age calculation accuracy         | HIGH     |
| Prevent Duplicate Patient IDs     | Verify system prevents duplicate patient IDs, uniqueness enforced     | HIGH     |
| Patient Gender Selection          | Verify gender selection options work correctly, persist properly      | HIGH     |

### Patient Management - Search and Navigation (HIGH)

| Scenario Name                   | Brief Description                                                          | Priority |
| ------------------------------- | -------------------------------------------------------------------------- | -------- |
| Access Patient Search Interface | Verify patient search dialog with Last Name, First Name, Patient ID fields | HIGH     |
| Search Patients by Last Name    | Verify search by last name returns accurate results, partial match support | HIGH     |
| Search Patients by Patient ID   | Verify search by exact patient ID, precise matching                        | HIGH     |
| Multi-Criteria Patient Search   | Verify combining multiple search criteria, complex queries                 | HIGH     |
| Patient List Navigation         | Verify pagination through patient list, Previous/Next controls             | HIGH     |
| Patient List Selection          | Verify Select All checkbox, individual patient selection functionality     | HIGH     |

### Patient Management - Editing and Updates (HIGH)

| Scenario Name                      | Brief Description                                                    | Priority |
| ---------------------------------- | -------------------------------------------------------------------- | -------- |
| Access Patient Edit Interface      | Verify selecting patient and accessing edit form, data pre-populated | HIGH     |
| Update Patient Demographics        | Verify updating patient demographic information, changes saved       | HIGH     |
| Update Patient Medical Information | Verify updating blood type, allergies, alerts, medical details       | HIGH     |
| Update Patient Address Information | Verify updating all address fields, geographic data validation       | HIGH     |
| Patient Physician Assignment       | Verify assigning physicians to patient records, physician search     | HIGH     |

### Patient Management - Advanced Operations (MEDIUM)

| Scenario Name               | Brief Description                                                     | Priority |
| --------------------------- | --------------------------------------------------------------------- | -------- |
| Delete Patient Records      | Verify patient deletion with confirmation, cascade effects on studies | MEDIUM   |
| Patient Transfer Operations | Verify transferring patients between institutions, data integrity     | MEDIUM   |
| Patient Study Management    | Verify managing individual studies for patients                       | MEDIUM   |
| Patient Studies Overview    | Verify viewing all studies for a patient, studies list display        | MEDIUM   |
| Patient Data Export         | Verify exporting patient data, format options                         | MEDIUM   |

### Worklist Management (HIGH)

| Scenario Name             | Brief Description                                                           | Priority |
| ------------------------- | --------------------------------------------------------------------------- | -------- |
| Worklist Overview         | Verify worklist displays scheduled procedures with comprehensive study info | HIGH     |
| Worklist Today Filter     | Verify filtering worklist to show today's procedures only                   | HIGH     |
| Worklist Tomorrow Filter  | Verify filtering worklist to show tomorrow's procedures                     | HIGH     |
| Worklist +7 Days Filter   | Verify filtering worklist to show procedures in next 7 days                 | HIGH     |
| Worklist Yesterday Filter | Verify filtering worklist to show previous day procedures                   | HIGH     |
| Worklist -7 Days Filter   | Verify filtering worklist to show procedures from past 7 days               | HIGH     |
| Worklist Search           | Verify searching worklist by patient, accession number, modality            | HIGH     |
| Worklist Pagination       | Verify pagination through large worklist datasets                           | HIGH     |

### Routing Administration (HIGH)

| Scenario Name                  | Brief Description                                                  | Priority |
| ------------------------------ | ------------------------------------------------------------------ | -------- |
| Routing Configuration Overview | Verify viewing existing routing rules, routing details             | HIGH     |
| Create Routing Configuration   | Verify creating new routing rules, configuring routing parameters  | HIGH     |
| Modify Routing Configuration   | Verify editing existing routing rules, updating parameters         | HIGH     |
| Delete Routing Configuration   | Verify deleting routing rules with confirmation                    | HIGH     |
| Modality-Specific Routing      | Verify configuring routing rules specific to imaging modalities    | HIGH     |
| Inter-Institutional Routing    | Verify setting up routing between institutions, external data flow | HIGH     |

### Account Management and Profile (MEDIUM)

| Scenario Name                            | Brief Description                                                            | Priority |
| ---------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| View Institution Manager Account Profile | Verify account information displays correctly for institution manager        | MEDIUM   |
| Update Email Address                     | Verify updating email with validation, change confirmation                   | MEDIUM   |
| Update SMS Number                        | Verify updating SMS/phone number, format validation                          | MEDIUM   |
| Update Address Information               | Verify updating address fields (street, city, state, zip, country)           | MEDIUM   |
| Email Notification Preferences           | Verify toggling email notification settings                                  | MEDIUM   |
| Change Account Password                  | Verify password change with old password verification, strength requirements | MEDIUM   |

### PHI Compliance and Audit (CRITICAL)

| Scenario Name                    | Brief Description                                                         | Priority |
| -------------------------------- | ------------------------------------------------------------------------- | -------- |
| Access PHI Logs                  | Verify institution manager can access PHI logs for compliance monitoring  | CRITICAL |
| Generate PHI Access Report       | Verify generating PHI access reports, download functionality              | CRITICAL |
| Verify PHI Access Report Content | Verify report contains accurate access data, comprehensive logging        | CRITICAL |
| Historical PHI Access Tracking   | Verify accessing historical PHI access data for audit purposes            | CRITICAL |
| Role-Based PHI Access Monitoring | Verify monitoring PHI access by different user roles, security compliance | CRITICAL |

### System Integration and Error Handling (MEDIUM)

| Scenario Name              | Brief Description                                                          | Priority |
| -------------------------- | -------------------------------------------------------------------------- | -------- |
| Network Error Handling     | Verify graceful handling of network connectivity issues, data integrity    | MEDIUM   |
| Large Dataset Performance  | Verify performance with large patient/worklist datasets, efficient loading | MEDIUM   |
| Concurrent Access Handling | Verify handling concurrent institution manager access, data consistency    | MEDIUM   |

### Institutional Oversight (HIGH)

| Scenario Name                      | Brief Description                                                         | Priority |
| ---------------------------------- | ------------------------------------------------------------------------- | -------- |
| Institution Statistics Dashboard   | Verify viewing institution-level statistics (study counts, storage usage) | HIGH     |
| User Activity Monitoring           | Verify monitoring user activity within institution                        | HIGH     |
| Workflow Bottleneck Identification | Verify identifying workflow bottlenecks through worklist analysis         | HIGH     |
| Capacity Planning Metrics          | Verify metrics for institutional capacity planning                        | HIGH     |
| Quality Metrics Monitoring         | Verify monitoring quality metrics across institution                      | HIGH     |

### Compliance Reporting (CRITICAL)

| Scenario Name                             | Brief Description                                                  | Priority |
| ----------------------------------------- | ------------------------------------------------------------------ | -------- |
| Generate Institutional Compliance Reports | Verify generating comprehensive compliance reports for institution | CRITICAL |
| HIPAA Compliance Dashboard                | Verify viewing HIPAA compliance status and metrics                 | CRITICAL |
| Audit Trail Export                        | Verify exporting audit trails for regulatory review                | CRITICAL |
| Data Retention Compliance                 | Verify monitoring data retention policies compliance               | CRITICAL |
| Access Control Audit                      | Verify auditing user access controls and permissions               | CRITICAL |

### Advanced Patient Operations (MEDIUM)

| Scenario Name                        | Brief Description                                            | Priority |
| ------------------------------------ | ------------------------------------------------------------ | -------- |
| Bulk Patient Import                  | Verify importing multiple patients from file (CSV, HL7)      | MEDIUM   |
| Patient Merge Operations             | Verify merging duplicate patient records, data consolidation | MEDIUM   |
| Patient Archive Management           | Verify archiving inactive patients, archive retrieval        | MEDIUM   |
| Patient Demographics Update Workflow | Verify bulk update patient demographics                      | MEDIUM   |

### Institutional Communication (MEDIUM)

| Scenario Name                    | Brief Description                                               | Priority |
| -------------------------------- | --------------------------------------------------------------- | -------- |
| Broadcast Notifications to Users | Verify sending institution-wide notifications to users          | MEDIUM   |
| Institutional Announcements      | Verify posting announcements visible to all institutional users | MEDIUM   |
| User Communication History       | Verify viewing history of communications sent to users          | MEDIUM   |

### Worklist Advanced Operations (MEDIUM)

| Scenario Name              | Brief Description                                                               | Priority |
| -------------------------- | ------------------------------------------------------------------------------- | -------- |
| Create Worklist Entry      | Verify creating new scheduled procedure on worklist                             | MEDIUM   |
| Edit Worklist Entry        | Verify modifying existing worklist entries, update procedures                   | MEDIUM   |
| Delete Worklist Entry      | Verify removing worklist items with confirmation                                | MEDIUM   |
| Bulk Worklist Operations   | Verify performing bulk actions on multiple worklist items                       | MEDIUM   |
| Worklist Status Management | Verify updating procedure status (Scheduled, In Progress, Completed, Cancelled) | MEDIUM   |

---

## Implementation Notes

### Test Suite Structure for Azure Test Plans

```
eNcounterCloud PACS
├── Shared/Common Tests
│   └── Authentication and Access Control
├── Physician
│   ├── Clinical Dashboard - Pending Studies
│   ├── Clinical Dashboard - Reviewed Studies
│   ├── DICOM Viewer - Image Display and Navigation
│   ├── DICOM Viewer - Reports and Clinical Documentation
│   ├── DICOM Viewer - Study Sharing
│   ├── DICOM Viewer - DICOM Headers
│   ├── DICOM Viewer - Study Review Management
│   ├── DICOM Viewer - File Attachments
│   ├── Study Search and Filtering
│   ├── Account Management
│   ├── Administration - Patient Management
│   ├── Administration - Worklist Management
│   ├── Administration - View Studies
│   └── Cross-Functional and Integration Tests
├── Administrator
│   ├── Institution Management
│   ├── DICOM Node Management
│   ├── Account Management
│   ├── Security and Compliance
│   ├── Integration and System Operations
│   └── Error Handling and Edge Cases
├── Nurse
│   ├── Clinical Dashboard - Pending Studies
│   ├── Clinical Dashboard - Reviewed Studies
│   ├── DICOM Viewer - Clinical Image Review
│   ├── Clinical Documentation - Reports and Notes
│   ├── Account Management - Nurse Profile
│   ├── Study Search - Clinical Research
│   ├── Sharing and Collaboration
│   ├── Clinical Workflow Integration
│   ├── Security and Compliance
│   └── Error Handling and Edge Cases
├── Technician
│   ├── Clinical Dashboard - Pending Studies
│   ├── Clinical Dashboard - Reviewed Studies
│   ├── DICOM Viewer - Image Quality Assessment
│   ├── Technical Documentation
│   ├── Study Management
│   ├── Account Management - Technician Profile
│   ├── Study Search - Technical Operations
│   ├── Sharing and Collaboration
│   ├── Quality Assurance Workflow
│   ├── Technical System Operations
│   └── Error Handling and Edge Cases
├── Technology
│   ├── Clinical Dashboard - Pending Studies
│   ├── Clinical Dashboard - Reviewed Studies
│   ├── DICOM Viewer - System Technology Review
│   ├── Technology Documentation
│   ├── Account Management - Technology Profile
│   ├── Study Search - Infrastructure Analysis
│   ├── Sharing and Collaboration
│   ├── Infrastructure Monitoring
│   ├── System Integration Testing
│   └── Error Handling and Edge Cases
├── Guest
│   ├── Authentication and Access (Guest-Specific)
│   ├── Passcode-Based Study Access
│   ├── Study Sharing Interface
│   ├── Account Management
│   ├── Security and Access Control
│   ├── Error Handling and Edge Cases
│   ├── Integration and Workflow
│   ├── DICOM Viewer Access for Guests
│   ├── Guest User Experience
│   └── Compliance and Privacy
└── Institution Manager
    ├── Patient Management - Creation
    ├── Patient Management - Search and Navigation
    ├── Patient Management - Editing and Updates
    ├── Patient Management - Advanced Operations
    ├── Worklist Management
    ├── Routing Administration
    ├── Account Management and Profile
    ├── PHI Compliance and Audit
    ├── System Integration and Error Handling
    ├── Institutional Oversight
    ├── Compliance Reporting
    ├── Advanced Patient Operations
    ├── Institutional Communication
    └── Worklist Advanced Operations
```

### Priority Distribution

- **CRITICAL:** Core authentication, security, DICOM viewer, regulatory compliance
- **HIGH:** Clinical workflows, patient management, worklist, study search, role-specific core features
- **MEDIUM:** Account management, advanced features, error handling, edge cases

### Testing Approach

1. **Shared Tests:** Execute once with each role's credentials, verify role-specific permissions
2. **Role Tests:** Execute with appropriate role credentials, verify role-specific functionality
3. **Integration Tests:** Verify cross-role workflows (e.g., physician shares study → guest accesses via passcode)
4. **Regression Suite:** Combine CRITICAL and HIGH priority tests across all roles
5. **Smoke Suite:** Authentication + core viewer functionality for each role

### Source Documents

- `physician-testplan1.md` and `physician-testplan2.md` (110 scenarios)
- `admin-testplan1.md` and `admin-testplan2.md` (95 scenarios)
- `nurse-testplan1.md` and `nurse-testplan2.md` (54 scenarios)
- `technician-testplan1.md` and `technician-testplan2.md` (54 scenarios)
- `technology-testplan1.md` and `technology-testplan2.md` (54 scenarios)
- `guest-testplan1.md` and `guest-testplan2.md` (54 scenarios)
- `institution_manager-testplan1.md` and `institution_manager-testplan2.md` (90 scenarios)
- `testplan-summary.md`

**Document Version:** 1.0  
**Last Updated:** December 11, 2025  
**Prepared For:** eNcounterCloud PACS Product Team - User Story Extraction
