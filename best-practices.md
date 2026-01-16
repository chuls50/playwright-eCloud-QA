# Playwright Test Recording Best Practices

## Overview

This document outlines the standardized workflow and best practices for recording, creating, and maintaining Playwright tests for the eCloud QA automation suite. Following these practices ensures consistency, maintainability, and reliability across all test files.

## Test Recording Workflow

### Step 1: Record Test Using Playwright Test Generator

- Use the MCP `playwright-test-generator` tool to record the test scenario
- Follow the test plan specifications exactly as documented
- Capture all user interactions and verifications during recording
- Focus on the core functionality without optimization initially

### Step 2: Initial Test Verification

- Run the generated test immediately after creation
- Ensure the test passes in its initial recorded state
- Fix any immediate issues with selectors or timing
- Verify all steps execute successfully

### Step 3: Structure Optimization

- **Remove `test.describe` blocks** - Use individual test functions instead
- **Implement `test.step`** for each logical test action
- Group related actions into meaningful steps
- Ensure each step has a descriptive name

### Step 4: Clean Up Logging

- **Remove all `console.log` statements** from the final test
- Replace with meaningful step descriptions
- Use test.step names for progress tracking instead

### Step 5: Data and Locator Refactoring

- **Move test data to `TEST_DATA`** in `/tests/data/test-data.ts`
- **Use Page Object Models** for all locators and page interactions
- Replace direct page selectors with page object methods
- Ensure environment-aware data access using `getCurrentEnvironment()`

### Step 6: Final Validation and Iteration

- Run the refactored test to ensure it still passes
- If test fails, debug and fix issues iteratively
- Repeat testing until the test passes consistently
- Verify the test follows all established patterns

## File Structure Standards

### Test File Organization

```
tests/
├── regression/
│   ├── shared/                 # Cross-role functionality
│   ├── clinician/physician/    # Physician-specific tests
│   ├── administrative/         # Admin-specific tests
│   └── ...
├── data/                       # Centralized test data
├── pages/                      # Page Object Models
├── fixtures/                   # Authentication and setup fixtures
└── seed/                       # Environment setup tests
```

### Test File Template

```typescript
// spec: [Descriptive Test Name]
// seed: tests/seed/[appropriate_seed].spec.ts

import { test, expect } from '../../../fixtures/auth.fixtures';
import { getCurrentEnvironment } from '../../../data/environments';
import { TEST_DATA } from '../../../data/test-data';
import { LoginPage } from '../../../pages/login.page';

test('Descriptive Test Name @[TestRailID] @role @ui', async ({ fixture }) => {
  const env = getCurrentEnvironment();
  const testData = TEST_DATA.[category].[item];
  const page = new PageObject(pageFromFixture);

  await test.step('Step 1: Action Description', async () => {
    // Test implementation
    await expect(page.element).toBeVisible();
  });

  await test.step('Step 2: Verification Description', async () => {
    // Verification implementation
  });
});
```

## Data Management Best Practices

### TEST_DATA Structure

Store all static test data in `/tests/data/test-data.ts`:

```typescript
export const TEST_DATA = {
  users: {
    physician: {
      firstname: 'CodyMD001',
      role: 'Physician',
      institution: 'eCloudModern',
      displayName: 'CodyMD001 Physician eCloudModern',
    },
  },
  authentication: {
    invalidCredentials: {
      username: 'invalid_user123',
      password: 'WrongPassword456!',
    },
    errorMessages: {
      authenticationFailed: 'authentication failed',
    },
  },
};
```

### Environment Configuration

- Use `getCurrentEnvironment()` for environment-aware testing
- Access credentials via `getCurrentUserCredentials('userType')`
- Store environment-sensitive data in `.env` files
- Never hardcode URLs or credentials in test files

## Page Object Model Standards

### Page Object Structure

```typescript
export class PageName extends BasePage {
  readonly elementName: Locator;
  readonly anotherElement: Locator;

  constructor(page: Page) {
    super(page);
    this.elementName = page.locator('#selector');
    this.anotherElement = page.getByRole('button', { name: 'Text' });
  }

  async methodName() {
    // Page-specific interactions
  }
}
```

### Locator Best Practices

1. **Prefer semantic locators**: `page.getByRole()`, `page.getByText()`
2. **Use stable selectors**: Avoid CSS selectors that may change
3. **Group related locators**: Organize by page section or functionality
4. **Use descriptive names**: Make locator purpose clear

## Testing Standards

### Test Step Organization

- Each `test.step` should represent a single logical action
- Use descriptive step names that explain the purpose
- Group related verifications within the same step
- Maintain clear separation between setup, action, and verification

### Assertion Guidelines

- Use Playwright's built-in assertions: `expect(locator).toBeVisible()`
- Prefer waiting assertions over static waits
- Verify both positive and negative conditions where appropriate
- Include meaningful error context in custom assertions

### Fixture Usage

- Use appropriate fixtures for test context:
  - `{ page, loginPage }` for unauthenticated tests
  - `{ physicianAuth }` for physician-authenticated tests
  - `{ adminAuth }` for admin-authenticated tests
- Extract page objects from fixtures consistently
- Leverage fixtures for common setup and teardown

## Error Handling and Debugging

### Common Issues and Solutions

1. **Element not found**: Check if page has loaded completely
2. **Timing issues**: Use proper waiting strategies, avoid `page.waitForTimeout()`
3. **Flaky tests**: Implement proper wait conditions and retries
4. **Environment differences**: Use environment-aware configurations

### Debugging Techniques

- Use `page.screenshot()` for visual debugging
- Add temporary `page.pause()` for interactive debugging
- Check console messages for application errors
- Verify network requests if needed

## Test Naming and Tagging

### Naming Conventions

- Use descriptive test names that explain the scenario
- Include the user role and test type in the name
- Follow pattern: `Verify [Action/Feature] [Context] @[TestRailID] @[role] @[type]`

### Tagging Standards

- `@[TestRailID]`: Link to test management system
- `@physician`, `@admin`, `@nurse`: User role being tested
- `@ui`, `@api`, `@integration`: Test type classification
- `@smoke`, `@regression`: Test priority/suite classification

## Quality Checklist

Before finalizing any test, verify:

- [ ] Test passes consistently across multiple runs
- [ ] All test data is stored in TEST_DATA
- [ ] All locators use Page Object Models
- [ ] No hardcoded values or console.log statements
- [ ] Proper error handling and assertions
- [ ] Clear and descriptive test steps
- [ ] Appropriate fixtures and imports
- [ ] Environment-aware configuration
- [ ] Follows established file structure
- [ ] Includes proper test tags and documentation

## Maintenance Guidelines

### Regular Maintenance Tasks

1. **Update test data** when application data changes
2. **Refactor page objects** when UI elements change
3. **Review and update** environment configurations
4. **Monitor test stability** and fix flaky tests promptly
5. **Keep documentation** updated with any pattern changes

### Version Control Practices

- Commit frequently with descriptive messages
- Include both test files and supporting data changes
- Test changes in isolation before merging
- Document any breaking changes in commit messages

## Examples

Refer to these exemplary test files for implementation reference:

- **Authentication**: `/tests/regression/shared/login-valid.spec.ts`
- **EULA Handling**: `/tests/regression/shared/eula-decline.spec.ts`
- **Security**: `/tests/regression/clinician/physician/session-timeout.spec.ts`
- **Invalid Input**: `/tests/regression/shared/login-invalid.spec.ts`

These files demonstrate proper structure, data usage, page object implementation, and step organization according to these best practices.
