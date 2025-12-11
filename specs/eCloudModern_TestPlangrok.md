# Hierarchical Test Plan for eNcounterCloud PACS

## Summary Table

| Section             | Scenario Count |
| ------------------- | -------------- |
| Shared/Common Tests | 5              |
| Physician           | 100            |
| Administrator       | 91             |
| Nurse               | 49             |
| Technician          | 49             |
| Technology          | 49             |
| Guest               | 49             |
| Institution Manager | 58             |
| **Total**           | **450**        |

## Shared/Common Tests

### Authentication and Access Control

| Scenario Name                  | Brief Description                                                                  | Priority |
| ------------------------------ | ---------------------------------------------------------------------------------- | -------- |
| Login - Valid Credentials      | Successful login with valid username/password, redirect to role-specific dashboard | CRITICAL |
| Login - Invalid Credentials    | Failed login with invalid credentials, error message and remain on login page      | CRITICAL |
| EULA Acceptance on First Login | Display and accept EULA on initial login, persist acceptance                       | CRITICAL |
| Session Management and Timeout | Automatic logout after idle period, redirect to login                              | CRITICAL |
| Role Permissions Verification  | Verify access to role-specific features and restrictions post-login                | CRITICAL |

## Physician

### Clinical Dashboard - Pending Studies Tab

| Scenario Name                | Brief Description                            | Priority |
| ---------------------------- | -------------------------------------------- | -------- |
| Pending Studies List Display | Display list of pending studies with details | HIGH     |
| Pending Studies Sorting      | Sort pending studies by various criteria     | HIGH     |
| Pending Studies Filtering    | Filter pending studies based on parameters   | HIGH     |
| Pending Studies Selection    | Select and manage pending studies            | HIGH     |

### Clinical Dashboard - Reviewed Studies Tab

| Scenario Name                 | Brief Description                             | Priority |
| ----------------------------- | --------------------------------------------- | -------- |
| Reviewed Studies List Display | Display list of reviewed studies with details | HIGH     |
| Reviewed Studies Sorting      | Sort reviewed studies by various criteria     | HIGH     |
| Reviewed Studies Filtering    | Filter reviewed studies based on parameters   | HIGH     |

### DICOM Viewer - Image Display and Navigation

| Scenario Name         | Brief Description                      | Priority |
| --------------------- | -------------------------------------- | -------- |
| Image Display         | Load and display DICOM images properly | CRITICAL |
| Series Navigation     | Navigate between series in a study     | CRITICAL |
| Image Navigation      | Scroll through images in a series      | CRITICAL |
| Zoom Functionality    | Zoom in/out, fit, 1:1 display          | CRITICAL |
| Enhance Controls      | Adjust brightness/contrast             | CRITICAL |
| Invert Functionality  | Toggle image inversion                 | CRITICAL |
| Refresh Functionality | Reset image adjustments                | CRITICAL |

### DICOM Viewer - Reports and Clinical Documentation

| Scenario Name             | Brief Description                      | Priority |
| ------------------------- | -------------------------------------- | -------- |
| Report Template Selection | Select from available report templates | HIGH     |
| Case Documentation Report | Create and save case documentation     | HIGH     |
| HPI Report                | Create and save HPI report             | HIGH     |
| SOAP Report               | Create and save SOAP report            | HIGH     |
| Discharge Summary         | Create and save discharge summary      | HIGH     |
| Report Editing            | Edit existing reports                  | HIGH     |
| Report Viewing            | View saved reports                     | HIGH     |
| Report Deletion           | Delete reports                         | HIGH     |
| Report Attachment         | Attach reports to studies              | HIGH     |

### DICOM Viewer - Study Sharing

| Scenario Name      | Brief Description                     | Priority |
| ------------------ | ------------------------------------- | -------- |
| Study Transfer     | Transfer study to another institution | MEDIUM   |
| Study Referral     | Refer study for consultation          | MEDIUM   |
| Share Confirmation | Confirm sharing actions               | MEDIUM   |
| Share History      | View sharing history                  | MEDIUM   |
| Share Cancellation | Cancel pending shares                 | MEDIUM   |

### DICOM Viewer - DICOM Headers

| Scenario Name     | Brief Description           | Priority |
| ----------------- | --------------------------- | -------- |
| Header Viewing    | View DICOM metadata headers | MEDIUM   |
| Header Searching  | Search within headers       | MEDIUM   |
| Header Export     | Export header data          | MEDIUM   |
| Header Validation | Validate header information | MEDIUM   |

### DICOM Viewer - Study Review Management

| Scenario Name          | Brief Description             | Priority |
| ---------------------- | ----------------------------- | -------- |
| Review Confirmation    | Confirm study review          | CRITICAL |
| Review Attribution     | Attribute review to physician | CRITICAL |
| Review History         | View review history           | CRITICAL |
| Unreview Functionality | Revert review if possible     | CRITICAL |

### DICOM Viewer - File Attachments

| Scenario Name           | Brief Description              | Priority |
| ----------------------- | ------------------------------ | -------- |
| File Upload             | Upload attachments to study    | MEDIUM   |
| Attachment Viewing      | View attached files            | MEDIUM   |
| Attachment Downloading  | Download attachments           | MEDIUM   |
| Attachment Deletion     | Delete attachments             | MEDIUM   |
| Attachment Organization | Organize attachments           | MEDIUM   |
| Attachment Validation   | Validate attachment types      | MEDIUM   |
| Attachment Limits       | Enforce attachment size/limits | MEDIUM   |

### Study Search and Filtering

| Scenario Name          | Brief Description                | Priority |
| ---------------------- | -------------------------------- | -------- |
| Basic Study Search     | Search studies by basic criteria | HIGH     |
| Advanced Study Search  | Search with multiple filters     | HIGH     |
| Search Results Display | Display search results           | HIGH     |
| Search Sorting         | Sort search results              | HIGH     |
| Search Pagination      | Paginate search results          | HIGH     |
| Search Export          | Export search results            | HIGH     |
| Search History         | View recent searches             | HIGH     |
| Search Validation      | Validate search inputs           | HIGH     |

### Account Management

| Scenario Name            | Brief Description           | Priority |
| ------------------------ | --------------------------- | -------- |
| Profile Viewing          | View account profile        | MEDIUM   |
| Email Update             | Update email address        | MEDIUM   |
| SMS Update               | Update SMS number           | MEDIUM   |
| Address Update           | Update address information  | MEDIUM   |
| Notification Preferences | Configure notifications     | MEDIUM   |
| Password Change          | Change password             | MEDIUM   |
| License Management       | Manage professional license | MEDIUM   |

### Administration - Patient Management

| Scenario Name           | Brief Description                | Priority |
| ----------------------- | -------------------------------- | -------- |
| Patient List Access     | Access patient list              | MEDIUM   |
| Patient Creation        | Create new patient               | MEDIUM   |
| Patient Editing         | Edit patient details             | MEDIUM   |
| Patient Deletion        | Delete patient                   | MEDIUM   |
| Patient Search          | Search patients                  | MEDIUM   |
| Patient Export          | Export patient data              | MEDIUM   |
| Patient Import          | Import patient data              | MEDIUM   |
| Patient Assignment      | Assign to physicians             | MEDIUM   |
| Patient History         | View patient history             | MEDIUM   |
| Patient Studies         | View patient studies             | MEDIUM   |
| Patient Attachments     | Manage patient attachments       | MEDIUM   |
| Patient Validation      | Validate patient data            | MEDIUM   |
| Bulk Patient Operations | Perform bulk actions on patients | MEDIUM   |
| Patient Audit           | Audit patient changes            | MEDIUM   |

### Administration - Worklist Management

| Scenario Name          | Brief Description              | Priority |
| ---------------------- | ------------------------------ | -------- |
| Worklist Access        | Access worklist                | MEDIUM   |
| Worklist Filtering     | Filter worklist items          | MEDIUM   |
| Worklist Sorting       | Sort worklist                  | MEDIUM   |
| Worklist Assignment    | Assign worklist tasks          | MEDIUM   |
| Worklist Completion    | Mark tasks complete            | MEDIUM   |
| Worklist Notifications | Set notifications for worklist | MEDIUM   |
| Worklist Export        | Export worklist                | MEDIUM   |

### Administration - View Studies

| Scenario Name         | Brief Description      | Priority |
| --------------------- | ---------------------- | -------- |
| Study List Access     | Access full study list | MEDIUM   |
| Study Details Viewing | View study details     | MEDIUM   |

### Cross-Functional and Integration Tests

| Scenario Name             | Brief Description               | Priority |
| ------------------------- | ------------------------------- | -------- |
| End-to-End Workflow       | Test full clinical workflow     | HIGH     |
| Integration with External | Integrate with external systems | HIGH     |
| Performance Testing       | Test under load                 | HIGH     |
| Security Testing          | Test security features          | HIGH     |
| Compliance Checks         | Check HIPAA/FDA compliance      | HIGH     |
| Mobile Compatibility      | Test on mobile devices          | HIGH     |
| Browser Compatibility     | Test across browsers            | HIGH     |
| Data Integrity            | Verify data consistency         | HIGH     |
| Error Recovery            | Test recovery from errors       | HIGH     |
| Accessibility             | Check WCAG compliance           | HIGH     |

## Administrator

### Institution Management

| Scenario Name                  | Brief Description                           | Priority |
| ------------------------------ | ------------------------------------------- | -------- |
| Institution Creation           | Create new institution                      | HIGH     |
| Institution Editing            | Edit institution details                    | HIGH     |
| Institution Deletion           | Delete institution                          | HIGH     |
| Institution List               | View institution list                       | HIGH     |
| Report Templates Configuration | Configure report templates for institutions | HIGH     |
| Destination Management         | Manage institution destinations             | HIGH     |
| Bulk Operations                | Perform bulk institution operations         | HIGH     |
| Validation                     | Validate institution data                   | HIGH     |
| Audit                          | Audit institution changes                   | HIGH     |
| Integration                    | Integrate institutions                      | HIGH     |
| Permissions                    | Manage institution permissions              | HIGH     |
| Export                         | Export institution data                     | HIGH     |
| Import                         | Import institution data                     | HIGH     |
| Search                         | Search institutions                         | HIGH     |

### DICOM Node Management

| Scenario Name                | Brief Description                       | Priority |
| ---------------------------- | --------------------------------------- | -------- |
| Node Creation                | Create new DICOM node                   | CRITICAL |
| Node Editing                 | Edit DICOM node details                 | CRITICAL |
| Node Deletion                | Delete DICOM node                       | CRITICAL |
| Node List                    | View DICOM node list                    | CRITICAL |
| Echo Test                    | Perform DICOM echo test                 | CRITICAL |
| TLS Configuration            | Configure TLS for nodes                 | CRITICAL |
| Advanced Settings            | Configure advanced node settings        | CRITICAL |
| Validation                   | Validate node configuration             | CRITICAL |
| Dependencies Check           | Check node dependencies before deletion | CRITICAL |
| Connectivity Troubleshooting | Troubleshoot node connectivity          | CRITICAL |
| Bulk Operations              | Perform bulk node operations            | CRITICAL |
| Export                       | Export node configurations              | CRITICAL |
| Import                       | Import node configurations              | CRITICAL |
| Search                       | Search DICOM nodes                      | CRITICAL |
| Audit                        | Audit node changes                      | CRITICAL |

### Account Management

| Scenario Name            | Brief Description             | Priority |
| ------------------------ | ----------------------------- | -------- |
| View Account Information | View admin account details    | MEDIUM   |
| Update Email             | Update admin email            | MEDIUM   |
| Update SMS               | Update admin SMS              | MEDIUM   |
| Update Address           | Update admin address          | MEDIUM   |
| Email Notifications      | Configure email notifications | MEDIUM   |
| Password Change          | Change admin password         | MEDIUM   |
| Profile Management       | Manage admin profile          | MEDIUM   |

### Security and Compliance

| Scenario Name             | Brief Description           | Priority |
| ------------------------- | --------------------------- | -------- |
| Role-Based Access Control | Enforce RBAC                | CRITICAL |
| Audit Trails              | View audit logs             | CRITICAL |
| Data Integrity Checks     | Check data integrity        | CRITICAL |
| Encryption Verification   | Verify encryption           | CRITICAL |
| Compliance Reporting      | Generate compliance reports | CRITICAL |
| Security Settings         | Configure security options  | CRITICAL |
| PHI Monitoring            | Monitor PHI access          | CRITICAL |

### Integration and System Operations

| Scenario Name          | Brief Description             | Priority |
| ---------------------- | ----------------------------- | -------- |
| Routing Configuration  | Configure institution routing | HIGH     |
| Template Distribution  | Distribute report templates   | HIGH     |
| System Diagnostics     | Run system diagnostics        | HIGH     |
| Performance Monitoring | Monitor system performance    | HIGH     |
| Backup Operations      | Perform backups               | HIGH     |
| Restore Operations     | Restore from backups          | HIGH     |
| Update Management      | Manage system updates         | HIGH     |

### Error Handling and Edge Cases

| Scenario Name          | Brief Description            | Priority |
| ---------------------- | ---------------------------- | -------- |
| Network Error Handling | Handle network errors        | MEDIUM   |
| Form Validation        | Validate forms               | MEDIUM   |
| Concurrent Sessions    | Handle concurrent sessions   | MEDIUM   |
| Delete Dependencies    | Check dependencies on delete | MEDIUM   |
| Browser Compatibility  | Test across browsers         | MEDIUM   |
| Large Dataset Handling | Handle large datasets        | MEDIUM   |
| Invalid Input          | Handle invalid inputs        | MEDIUM   |
| Timeout Recovery       | Recover from timeouts        | MEDIUM   |
| Error Logging          | Log errors                   | MEDIUM   |
| User Feedback          | Provide error feedback       | MEDIUM   |
| Edge Case Testing      | Test edge cases              | MEDIUM   |
| Performance Edge Cases | Test under high load         | MEDIUM   |

## Nurse

### Clinical Dashboard - Pending Studies

| Scenario Name        | Brief Description                 | Priority |
| -------------------- | --------------------------------- | -------- |
| Pending List Display | Display pending studies for nurse | HIGH     |
| Pending Sorting      | Sort pending studies              | HIGH     |
| Pending Filtering    | Filter pending studies            | HIGH     |
| Pending Selection    | Select pending studies            | HIGH     |

### Clinical Dashboard - Reviewed Studies

| Scenario Name         | Brief Description                  | Priority |
| --------------------- | ---------------------------------- | -------- |
| Reviewed List Display | Display reviewed studies for nurse | HIGH     |
| Reviewed Sorting      | Sort reviewed studies              | HIGH     |
| Reviewed Filtering    | Filter reviewed studies            | HIGH     |

### DICOM Viewer - Clinical Image Review

| Scenario Name | Brief Description                    | Priority |
| ------------- | ------------------------------------ | -------- |
| Image Display | Load DICOM images for nurse review   | CRITICAL |
| Navigation    | Navigate images/series for nurse     | CRITICAL |
| Zoom          | Zoom functions for nurse             | CRITICAL |
| Enhance       | Adjust brightness/contrast for nurse | CRITICAL |
| Invert        | Invert images for nurse              | CRITICAL |
| Refresh       | Reset adjustments for nurse          | CRITICAL |
| Header View   | View DICOM headers for nurse         | CRITICAL |
| Notes         | Add notes for nurse                  | CRITICAL |

### Clinical Documentation - Reports and Notes

| Scenario Name     | Brief Description                        | Priority |
| ----------------- | ---------------------------------------- | -------- |
| Report Creation   | Create reports using templates for nurse | HIGH     |
| Note Addition     | Add clinical notes                       | HIGH     |
| Review Completion | Mark study as reviewed by nurse          | HIGH     |
| Study Sharing     | Share studies for nurse collaboration    | HIGH     |

### Account Management - Nurse Profile

| Scenario Name            | Brief Description       | Priority |
| ------------------------ | ----------------------- | -------- |
| Profile Display          | View nurse profile      | MEDIUM   |
| Email Management         | Update email            | MEDIUM   |
| SMS Management           | Update SMS              | MEDIUM   |
| Address Management       | Update address          | MEDIUM   |
| Notification Preferences | Configure notifications | MEDIUM   |
| Password Management      | Change password         | MEDIUM   |

### Study Search - Clinical Research

| Scenario Name   | Brief Description            | Priority |
| --------------- | ---------------------------- | -------- |
| Basic Search    | Basic study search for nurse | HIGH     |
| Advanced Search | Advanced filters for nurse   | HIGH     |
| Results Display | Display search results       | HIGH     |
| Sorting         | Sort results                 | HIGH     |
| Pagination      | Paginate results             | HIGH     |

### Sharing and Collaboration

| Scenario Name         | Brief Description          | Priority |
| --------------------- | -------------------------- | -------- |
| Study Sharing         | Share studies              | HIGH     |
| Collaboration Tools   | Use collaboration features | HIGH     |
| Share History         | View share history         | HIGH     |
| Referral Management   | Manage referrals           | HIGH     |
| Notification on Share | Notify on shares           | HIGH     |

### Clinical Workflow Integration

| Scenario Name            | Brief Description                     | Priority |
| ------------------------ | ------------------------------------- | -------- |
| Workflow Automation      | Automate clinical tasks               | HIGH     |
| Integration with Systems | Integrate with other clinical systems | HIGH     |
| Task Assignment          | Assign tasks                          | HIGH     |
| Status Tracking          | Track status                          | HIGH     |
| Reporting Integration    | Integrate reports                     | HIGH     |

### Security and Compliance

| Scenario Name     | Brief Description    | Priority |
| ----------------- | -------------------- | -------- |
| Access Control    | Enforce nurse access | CRITICAL |
| Audit Logs        | View audits          | CRITICAL |
| Data Encryption   | Verify encryption    | CRITICAL |
| Compliance Checks | Check compliance     | CRITICAL |
| PHI Handling      | Handle PHI           | CRITICAL |

### Error Handling and Edge Cases

| Scenario Name         | Brief Description        | Priority |
| --------------------- | ------------------------ | -------- |
| Network Errors        | Handle network issues    | MEDIUM   |
| Processing Errors     | Handle processing errors | MEDIUM   |
| Form Validation       | Validate forms           | MEDIUM   |
| Concurrent Access     | Handle concurrent access | MEDIUM   |
| Performance           | Test performance         | MEDIUM   |
| Browser Compatibility | Test browsers            | MEDIUM   |

## Technician

### Clinical Dashboard - Pending Studies

| Scenario Name | Brief Description              | Priority |
| ------------- | ------------------------------ | -------- |
| Pending List  | Display pending for technician | HIGH     |
| Sorting       | Sort pending                   | HIGH     |
| Filtering     | Filter pending                 | HIGH     |
| Selection     | Select pending                 | HIGH     |

### Clinical Dashboard - Reviewed Studies

| Scenario Name | Brief Description               | Priority |
| ------------- | ------------------------------- | -------- |
| Reviewed List | Display reviewed for technician | HIGH     |
| Sorting       | Sort reviewed                   | HIGH     |
| Filtering     | Filter reviewed                 | HIGH     |

### DICOM Viewer - Technical Image Analysis

| Scenario Name | Brief Description                  | Priority |
| ------------- | ---------------------------------- | -------- |
| Image Display | Load images for technical analysis | CRITICAL |
| Navigation    | Navigate for technical review      | CRITICAL |
| Zoom          | Zoom for detail                    | CRITICAL |
| Enhance       | Adjust for quality check           | CRITICAL |
| Invert        | Invert for analysis                | CRITICAL |
| Refresh       | Reset for re-analysis              | CRITICAL |
| Header        | View technical headers             | CRITICAL |
| Notes         | Add technical notes                | CRITICAL |

### Technical Documentation and Reporting

| Scenario Name   | Brief Description                 | Priority |
| --------------- | --------------------------------- | -------- |
| Report Creation | Create technical reports          | HIGH     |
| Note Addition   | Add technical notes               | HIGH     |
| Review          | Mark as reviewed technically      | HIGH     |
| Attachments     | Add technical attachments         | HIGH     |
| Sharing         | Share for technical collaboration | HIGH     |

### Account Management

| Scenario Name | Brief Description       | Priority |
| ------------- | ----------------------- | -------- |
| Profile       | View technician profile | MEDIUM   |
| Email         | Update email            | MEDIUM   |
| SMS           | Update SMS              | MEDIUM   |
| Address       | Update address          | MEDIUM   |
| Notifications | Configure notifications | MEDIUM   |
| Password      | Change password         | MEDIUM   |

### Study Search and Analysis

| Scenario Name  | Brief Description          | Priority |
| -------------- | -------------------------- | -------- |
| Search         | Search studies technically | HIGH     |
| Analysis Tools | Use analysis tools         | HIGH     |
| Results        | Display results            | HIGH     |
| Filtering      | Filter results             | HIGH     |
| Export         | Export analysis            | HIGH     |

### Technical Sharing and Collaboration

| Scenario Name | Brief Description               | Priority |
| ------------- | ------------------------------- | -------- |
| Sharing       | Share technically               | HIGH     |
| Collaboration | Collaborate on technical issues | HIGH     |
| History       | View share history              | HIGH     |
| Notifications | Notify on shares                | HIGH     |
| Cancellation  | Cancel shares                   | HIGH     |

### Technical Quality Assurance Integration

| Scenario Name | Brief Description  | Priority |
| ------------- | ------------------ | -------- |
| QA Checks     | Perform QA         | CRITICAL |
| Integration   | Integrate QA tools | CRITICAL |
| Monitoring    | Monitor quality    | CRITICAL |
| Reporting     | Report QA issues   | CRITICAL |
| Automation    | Automate QA        | CRITICAL |

### Security and Compliance - Technical Operations

| Scenario Name | Brief Description        | Priority |
| ------------- | ------------------------ | -------- |
| Access        | Technical access control | CRITICAL |
| Logs          | Technical audits         | CRITICAL |
| Encryption    | Technical encryption     | CRITICAL |
| Compliance    | Technical compliance     | CRITICAL |
| PHI           | Technical PHI handling   | CRITICAL |

### Error Handling and Technical Edge Cases

| Scenario Name | Brief Description                  | Priority |
| ------------- | ---------------------------------- | -------- |
| Network       | Handle network errors technically  | MEDIUM   |
| Processing    | Handle processing errors           | MEDIUM   |
| Validation    | Validate technical inputs          | MEDIUM   |
| Concurrent    | Handle concurrent technical access | MEDIUM   |
| Performance   | Test technical performance         | MEDIUM   |
| Browser       | Technical browser compatibility    | MEDIUM   |

## Technology

### Clinical Dashboard - Pending Studies

| Scenario Name | Brief Description              | Priority |
| ------------- | ------------------------------ | -------- |
| Pending List  | Display pending for technology | HIGH     |
| Sorting       | Sort pending                   | HIGH     |
| Filtering     | Filter pending                 | HIGH     |
| Selection     | Select pending                 | HIGH     |

### Clinical Dashboard - Reviewed Studies

| Scenario Name | Brief Description               | Priority |
| ------------- | ------------------------------- | -------- |
| Reviewed List | Display reviewed for technology | HIGH     |
| Sorting       | Sort reviewed                   | HIGH     |
| Filtering     | Filter reviewed                 | HIGH     |

### DICOM Viewer - Technical Image Analysis

| Scenario Name | Brief Description                   | Priority |
| ------------- | ----------------------------------- | -------- |
| Image Display | Load images for technology analysis | CRITICAL |
| Navigation    | Navigate for technology review      | CRITICAL |
| Zoom          | Zoom for detail                     | CRITICAL |
| Enhance       | Adjust for quality                  | CRITICAL |
| Invert        | Invert for analysis                 | CRITICAL |
| Refresh       | Reset adjustments                   | CRITICAL |
| Header        | View technology headers             | CRITICAL |
| Notes         | Add technology notes                | CRITICAL |

### Technology Documentation and Reporting

| Scenario Name   | Brief Description                  | Priority |
| --------------- | ---------------------------------- | -------- |
| Report Creation | Create technology reports          | HIGH     |
| Note Addition   | Add technology notes               | HIGH     |
| Review          | Mark as reviewed technologically   | HIGH     |
| Attachments     | Add technology attachments         | HIGH     |
| Sharing         | Share for technology collaboration | HIGH     |

### Account Management

| Scenario Name | Brief Description       | Priority |
| ------------- | ----------------------- | -------- |
| Profile       | View technology profile | MEDIUM   |
| Email         | Update email            | MEDIUM   |
| SMS           | Update SMS              | MEDIUM   |
| Address       | Update address          | MEDIUM   |
| Notifications | Configure notifications | MEDIUM   |
| Password      | Change password         | MEDIUM   |

### Study Search and Analysis

| Scenario Name | Brief Description              | Priority |
| ------------- | ------------------------------ | -------- |
| Search        | Search studies technologically | HIGH     |
| Analysis      | Analyze studies                | HIGH     |
| Results       | Display results                | HIGH     |
| Filtering     | Filter results                 | HIGH     |
| Export        | Export analysis                | HIGH     |

### Technical Sharing and Collaboration

| Scenario Name | Brief Description                | Priority |
| ------------- | -------------------------------- | -------- |
| Sharing       | Share technologically            | HIGH     |
| Collaboration | Collaborate on technology issues | HIGH     |
| History       | View history                     | HIGH     |
| Notifications | Notify on shares                 | HIGH     |
| Cancellation  | Cancel shares                    | HIGH     |

### Technology Infrastructure Monitoring

| Scenario Name    | Brief Description     | Priority |
| ---------------- | --------------------- | -------- |
| Monitoring Tools | Use monitoring tools  | CRITICAL |
| Integration      | Integrate monitoring  | CRITICAL |
| Alerts           | Set alerts            | CRITICAL |
| Reporting        | Report infrastructure | CRITICAL |
| Optimization     | Optimize system       | CRITICAL |

### Security and Compliance - Technology Operations

| Scenario Name | Brief Description         | Priority |
| ------------- | ------------------------- | -------- |
| Access        | Technology access control | CRITICAL |
| Logs          | Technology audits         | CRITICAL |
| Encryption    | Technology encryption     | CRITICAL |
| Compliance    | Technology compliance     | CRITICAL |
| PHI           | Technology PHI handling   | CRITICAL |

### Error Handling and Technology Edge Cases

| Scenario Name | Brief Description        | Priority |
| ------------- | ------------------------ | -------- |
| Network       | Handle network issues    | MEDIUM   |
| Processing    | Handle processing errors | MEDIUM   |
| Validation    | Validate inputs          | MEDIUM   |
| Concurrent    | Handle concurrent access | MEDIUM   |
| Performance   | Test performance         | MEDIUM   |
| Browser       | Browser compatibility    | MEDIUM   |

## Guest

### Passcode-Based Study Access

| Scenario Name         | Brief Description                 | Priority |
| --------------------- | --------------------------------- | -------- |
| Valid Passcode Access | Access study with valid passcode  | HIGH     |
| Invalid Passcode      | Reject invalid passcode           | HIGH     |
| Multiple Passcodes    | Enter multiple passcodes          | HIGH     |
| Delete Passcode       | Delete passcode                   | HIGH     |
| Back Navigation       | Navigate back from passcode entry | HIGH     |

### Study Sharing Interface

| Scenario Name       | Brief Description          | Priority |
| ------------------- | -------------------------- | -------- |
| Shared Studies List | View shared studies list   | HIGH     |
| Filter All Studies  | Filter all studies         | HIGH     |
| Filter Sent Studies | Filter sent studies        | HIGH     |
| No Shares State     | Handle no shares available | HIGH     |

### Account Management

| Scenario Name        | Brief Description          | Priority |
| -------------------- | -------------------------- | -------- |
| View Information     | View account info          | MEDIUM   |
| Update Email         | Update email               | MEDIUM   |
| Update SMS           | Update SMS                 | MEDIUM   |
| Update Address       | Update address             | MEDIUM   |
| Toggle Notifications | Toggle email notifications | MEDIUM   |
| Change Password      | Change password            | MEDIUM   |

### Security and Access Control

| Scenario Name         | Brief Description               | Priority |
| --------------------- | ------------------------------- | -------- |
| Restricted Navigation | Restrict to shares/account      | CRITICAL |
| Study Boundaries      | Enforce study access boundaries | CRITICAL |
| Audit Logging         | Log guest access                | CRITICAL |
| Session Security      | Secure sessions                 | CRITICAL |
| Expired Passcode      | Handle expired passcodes        | CRITICAL |

### Error Handling and Edge Cases

| Scenario Name    | Brief Description        | Priority |
| ---------------- | ------------------------ | -------- |
| Email Validation | Validate email           | MEDIUM   |
| Phone Validation | Validate phone           | MEDIUM   |
| Required Fields  | Enforce required fields  | MEDIUM   |
| Network Errors   | Handle network errors    | MEDIUM   |
| Concurrent Login | Handle concurrent logins | MEDIUM   |

### Integration and Workflow

| Scenario Name         | Brief Description           | Priority |
| --------------------- | --------------------------- | -------- |
| Cross-Role Sharing    | Access shared by physicians | HIGH     |
| Multi-Role Studies    | Access multi-source studies | HIGH     |
| Notification Workflow | Receive notifications       | HIGH     |
| Cross-Device Access   | Access on multiple devices  | HIGH     |

## Institution Manager

### Patient Management - Creation

| Scenario Name         | Brief Description          | Priority |
| --------------------- | -------------------------- | -------- |
| Creation Interface    | Access creation form       | HIGH     |
| Complete Record       | Create full patient record | HIGH     |
| Field Validation      | Validate fields            | HIGH     |
| Birth Date Validation | Validate DOB               | HIGH     |
| Duplicate Prevention  | Prevent duplicate IDs      | HIGH     |
| Gender Selection      | Select gender              | HIGH     |

### Patient Management - Search and Navigation

| Scenario Name           | Brief Description | Priority |
| ----------------------- | ----------------- | -------- |
| Search Interface        | Access search     | HIGH     |
| Search by Last Name     | Search by name    | HIGH     |
| Search by ID            | Search by ID      | HIGH     |
| Multi-Criteria Search   | Combined search   | HIGH     |
| List Navigation         | Paginate list     | HIGH     |
| Selection Functionality | Select patients   | HIGH     |

### Patient Management - Editing and Updates

| Scenario Name        | Brief Description   | Priority |
| -------------------- | ------------------- | -------- |
| Edit Access          | Access edit form    | HIGH     |
| Demographic Updates  | Update demographics | HIGH     |
| Medical Info Updates | Update medical info | HIGH     |
| Address Updates      | Update address      | HIGH     |
| Physician Assignment | Assign physician    | HIGH     |

### Patient Management - Advanced Operations

| Scenario Name       | Brief Description | Priority |
| ------------------- | ----------------- | -------- |
| Patient Deletion    | Delete patients   | HIGH     |
| Transfer Operations | Transfer patients | HIGH     |
| Study Management    | Manage studies    | HIGH     |
| Studies Overview    | View all studies  | HIGH     |
| Data Export         | Export data       | HIGH     |

### Worklist Management

| Scenario Name     | Brief Description | Priority |
| ----------------- | ----------------- | -------- |
| Overview          | View worklist     | HIGH     |
| Today Filter      | Filter today      | HIGH     |
| Tomorrow Filter   | Filter tomorrow   | HIGH     |
| +7/-7 Days Filter | Filter week range | HIGH     |
| Yesterday Filter  | Filter yesterday  | HIGH     |
| Search            | Search worklist   | HIGH     |
| Pagination        | Paginate worklist | HIGH     |

### Routing Administration

| Scenario Name          | Brief Description         | Priority |
| ---------------------- | ------------------------- | -------- |
| Configuration Overview | View routing config       | HIGH     |
| Routing Creation       | Create routing rules      | HIGH     |
| Modification           | Modify rules              | HIGH     |
| Deletion               | Delete rules              | HIGH     |
| Modality-Specific      | Modality rules            | HIGH     |
| Inter-Institutional    | Inter-institution routing | HIGH     |

### Account Management and Profile

| Scenario Name            | Brief Description       | Priority |
| ------------------------ | ----------------------- | -------- |
| Profile View             | View profile            | MEDIUM   |
| Email Updates            | Update email            | MEDIUM   |
| SMS Updates              | Update SMS              | MEDIUM   |
| Address Updates          | Update address          | MEDIUM   |
| Notification Preferences | Configure notifications | MEDIUM   |
| Password Changes         | Change password         | MEDIUM   |

### PHI Compliance and Audit

| Scenario Name         | Brief Description       | Priority |
| --------------------- | ----------------------- | -------- |
| PHI Logs Access       | Access PHI logs         | HIGH     |
| Report Generation     | Generate access reports | HIGH     |
| Report Verification   | Verify report content   | HIGH     |
| Historical Tracking   | Track history           | HIGH     |
| Role-Based Monitoring | Monitor by role         | HIGH     |

### System Integration and Error Handling

| Scenario Name              | Brief Description        | Priority |
| -------------------------- | ------------------------ | -------- |
| Network Error Handling     | Handle network errors    | HIGH     |
| Large Dataset Performance  | Handle large data        | HIGH     |
| Concurrent Access Handling | Handle concurrent access | HIGH     |
