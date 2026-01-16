# 🏥 eCloud QA Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.57.0-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

TypeScript-based test automation framework for eNcounterCloud (eCloud) using Playwright with comprehensive Allure reporting for the secure cloud-based medical image archiving and management system.

## 📊 Live Test Results

### 🎯 **Test Reports:**

- **[🔥 QA Environment Report](https://chuls50.github.io/playwright-eCloud-QA/qa/)** - QA environment test results with Allure reporting
- **[🚀 UAT Environment Report](https://chuls50.github.io/playwright-eCloud-QA/uat/)** - UAT environment test results with Allure reporting

[![QA Environment Tests](https://github.com/chuls50/playwright-eCloud-QA/actions/workflows/qa-tests.yml/badge.svg)](https://github.com/chuls50/playwright-eCloud-QA/actions/workflows/qa-tests.yml)
[![UAT Environment Tests](https://github.com/chuls50/playwright-eCloud-QA/actions/workflows/uat-tests.yml/badge.svg)](https://github.com/chuls50/playwright-eCloud-QA/actions/workflows/uat-tests.yml)

**Automated Test Schedule:**

- 🏁 **QA Environment** - Saturdays at midnight UTC → Deploys to `/qa`
- 🔄 **UAT Environment** - Sundays at midnight UTC → Deploys to `/uat`

---

## 🏥 About eCloud

eNcounterCloud is a secure, FDA-accredited Picture Archiving Communications System (PACS) providing:

- **🔒 Secure Medical Imaging**: Cloud-based image archiving with AES-256 encryption
- **🏛️ HIPAA Compliant**: Full compliance for medical data security and privacy
- **👥 Multi-User Support**: Clinical and administrative user profiles
- **🔌 DICOM Compatible**: Full DICOM/TLS services support
- **🌐 Cross-Platform**: Browser-based access across multiple devices

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **eCloud QA Environment Access** - Contact your team lead

### Installation

```bash
# Clone the repository
git clone https://github.com/chuls50/playwright-eCloud-QA.git
cd playwright-eCloud-QA

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Verify installation
npm run test:regression -- --grep="@smoke"
```

### Environment Configuration

1. **Copy the environment template:**

   ```bash
   cp .env.example .env
   ```

2. **Configure your `.env` file:**

   ```env
   # eCloud QA Environment
   QA_ENV=https://ecloud-modern.qa-encounterservices.com/

   # Test User Credentials
   PHYSICIAN_USERNAME=your-physician-username
   PHYSICIAN_PASSWORD=your-physician-password
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD=your-admin-password
   NURSE_USERNAME=your-nurse-username
   NURSE_PASSWORD=your-nurse-password
   # ... additional role credentials
   ```

> ⚠️ **Security Note**: Never commit the `.env` file to version control. It's protected by `.gitignore`.

## 🧪 Running Tests

### Basic Test Execution

```bash
# Run full regression suite
npm run test:regression

# Run tests with Allure reporting
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific test file
npx playwright test tests/regression/clinician/physician/physician-login.spec.js

# Run tests for specific browser
npx playwright test --project=chrome-desktop

# Generate and serve Allure report locally
npm run allure:serve
```

### Advanced Test Options

```bash
# Debug mode with browser inspector
npm run test:debug

# Run tests with specific tags
npx playwright test --grep "@smoke"

# Run parallel tests (CI mode)
CI=true npx playwright test

# Generate static Allure report
npm run allure:generate && npm run allure:open
```

## 📁 Project Architecture

```
playwright-eCloud-QA/
├── 🚀 .github/
│   └── workflows/
│       └── playwright.yml                 # CI/CD with Allure reporting
├── 🧪 tests/
│   ├── 📊 data/                           # Centralized test data management
│   │   ├── test-data.ts                   # Core test data (users, patients)
│   │   ├── environments.ts                # Environment configurations
│   │   ├── data-generators.ts             # Dynamic data utilities
│   │   ├── physician-data.ts              # Physician-specific scenarios
│   │   ├── admin-data.ts                  # Admin workflow data
│   │   ├── nurse-data.ts                  # Nursing workflow data
│   │   ├── technician-data.ts             # Technician scenarios
│   │   ├── technology-data.ts             # Technology role data
│   │   ├── guest-data.ts                  # Guest user scenarios
│   │   └── institution-manager-data.ts    # Institution management data
│   ├── 📄 pages/                          # Page Object Model (POM)
│   │   ├── base.page.ts                   # Reusable base page methods
│   │   ├── login.page.ts                  # Authentication page object
│   │   ├── dashboard.page.ts              # Main dashboard interactions
│   │   └── index.ts                       # Page object exports
│   ├── 🔧 fixtures/                       # Authentication & setup fixtures
│   │   └── auth.fixtures.ts               # Role-based auth fixtures
│   ├── 🏃‍♂️ regression/                      # Main test suites
│   │   ├── administrative/
│   │   │   ├── administrator/             # System admin tests
│   │   │   └── institution-manager/       # Institution mgmt tests
│   │   ├── clinician/
│   │   │   ├── nurse/                     # Nursing workflow tests
│   │   │   ├── physician/                 # Physician workflow tests
│   │   │   ├── technician/                # Medical tech tests
│   │   │   └── technology/                # Technology role tests
│   │   └── shared/                        # Cross-role functionality
│   │       ├── authentication/            # Login/logout tests
│   │       ├── navigation/                # UI navigation tests
│   │       └── security/                  # Security compliance tests
│   └── 🌱 seed/                            # Environment setup scripts
│       ├── admin_seed.spec.ts             # Admin environment prep
│       ├── physician_seed.spec.ts         # Physician environment prep
│       └── [role]_seed.spec.ts            # Other role preparations
├── 📈 allure-results/                      # Allure test results (auto-generated)
├── 📊 allure-report/                       # Allure HTML reports (auto-generated)
├── 🎭 playwright-report/                   # Playwright HTML reports
├── ⚙️ Configuration Files
│   ├── playwright.config.ts               # Playwright + Allure config
│   ├── package.json                       # Dependencies & scripts
│   ├── tsconfig.json                      # TypeScript configuration
│   ├── .env.example                       # Environment template
│   └── .gitignore                         # Git ignore rules
└── 📚 documentation-testplan/              # Test planning & documentation
    ├── eCloudModern-feature-list.md       # Feature documentation
    └── AzureTestPlan/                      # Azure DevOps integration
```

## 🏗️ Test Framework Features

### 🎭 Page Object Model (POM)

**Base Page Pattern** - [tests/pages/base.page.ts](tests/pages/base.page.ts)

```typescript
// Example usage in tests
import { BasePage } from '../pages/base.page';

test('User can navigate to dashboard', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goto();
  await basePage.waitForLoad();
  expect(await basePage.getCurrentEnv()).toContain('qa-encounterservices');
});
```

### 🔐 Authentication Fixtures

**Role-Based Authentication** - [tests/fixtures/auth.fixtures.ts](tests/fixtures/auth.fixtures.ts)

```typescript
// Auto-authenticated test example
test('Physician dashboard access @smoke', async ({ page, physicianAuth }) => {
  // Test runs with pre-authenticated physician session
  await expect(page.locator('[data-testid="physician-dashboard"]')).toBeVisible();
});
```

### 📊 Centralized Test Data

**Data Management** - [tests/data/](tests/data/)

```typescript
import { TEST_DATA } from '../data/test-data';
import { PHYSICIAN_DATA } from '../data/physician-data';

test('Physician workflow test', async ({ page }) => {
  const patient = PHYSICIAN_DATA.patients.johnDoe;
  await page.fill(TEST_DATA.selectors.patientSearch, patient.id);
});
```

## 📊 Allure Reporting Features

### 🎯 Rich Test Reporting

- **📈 Test Execution Trends** - Track test success rates over time
- **🔍 Detailed Test Steps** - Step-by-step test execution breakdown
- **📸 Screenshots & Videos** - Automatic capture on failures
- **🏷️ Test Categorization** - Organize tests by features/roles
- **⏱️ Performance Metrics** - Response time and duration tracking
- **📋 Test Plans Integration** - Link tests to requirements

### 🏷️ Test Annotations

```typescript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('Physician patient search @smoke @physician', async ({ page }) => {
  await allure.feature('Patient Management');
  await allure.story('Patient Search');
  await allure.severity('critical');

  await test.step('Navigate to patient search', async () => {
    // Test implementation
  });

  await test.step('Search for patient by ID', async () => {
    // Test implementation
  });
});
```

## 🔄 CI/CD Pipeline

### 🤖 Automated Testing Workflow

The GitHub Actions pipeline automatically:

- ✅ **Triggers** on push/PR to main, manual dispatch, and Sunday schedule
- ✅ **Environment** sets up Node.js and Playwright browsers
- ✅ **Execution** runs full regression suite on Chrome Desktop
- ✅ **Reporting** generates and deploys Allure reports to GitHub Pages
- ✅ **Artifacts** uploads test results, screenshots, and videos
- ✅ **Notifications** provides real-time status via GitHub badges

### 🔐 GitHub Secrets Configuration

Configure these repository secrets for CI/CD:

**Navigate to:** `Repository Settings` → `Secrets and variables` → `Actions`

```env
# Required Secrets
QA_ENV                           # eCloud QA environment URL
PHYSICIAN_USERNAME               # Physician test account
PHYSICIAN_PASSWORD               # Physician password
ADMIN_USERNAME                   # Admin test account
ADMIN_PASSWORD                   # Admin password
NURSE_USERNAME                   # Nurse test account
NURSE_PASSWORD                   # Nurse password
TECHNICIAN_USERNAME              # Technician test account
TECHNICIAN_PASSWORD              # Technician password
TECHNOLOGY_USERNAME              # Technology role account
TECHNOLOGY_PASSWORD              # Technology role password
INSTITUTION_MANAGER_USERNAME     # Institution manager account
INSTITUTION_MANAGER_PASSWORD     # Institution manager password
```

## 🛠️ Development Workflow

### 🔄 Contributing Process

1. **🌿 Create Feature Branch**

   ```bash
   git checkout -b feature/patient-search-improvements
   ```

2. **✍️ Write Tests** in appropriate role directory

   ```typescript
   // tests/regression/clinician/physician/patient-search.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('Patient Search @physician @smoke', () => {
     test('Search by patient ID', async ({ page, physicianAuth }) => {
       // Test implementation
     });
   });
   ```

3. **🧪 Run Tests Locally**

   ```bash
   npm run test:regression
   npm run allure:serve  # View results
   ```

4. **📝 Commit & Push**

   ```bash
   git add .
   git commit -m "feat: add patient search validation tests"
   git push origin feature/patient-search-improvements
   ```

5. **🔄 Create Pull Request** with test results

### 📏 Code Quality Standards

- **TypeScript** - Strong typing for maintainable tests
- **Prettier** - Consistent code formatting (single quotes, 2-space indent)
- **ESLint** - Code quality and best practices enforcement
- **Allure Annotations** - Rich test documentation and reporting

## 🔒 Security & Compliance

### 🛡️ HIPAA-Compliant Testing

- ✅ **No PHI in Tests** - All test data is synthetic/anonymized
- ✅ **Secure Credential Management** - GitHub Secrets + local .env files
- ✅ **Encrypted Communications** - HTTPS-only test environment connections
- ✅ **Audit Trails** - Complete test execution logging via Allure
- ✅ **Access Control** - Role-based test authentication patterns

### 🔐 Security Best Practices

```typescript
// ✅ Good: Using environment variables
const username = process.env.PHYSICIAN_USERNAME;

// ❌ Bad: Hardcoded credentials
const username = 'test.physician@example.com';
```

## 📈 Test Monitoring & Analytics

### 📊 Allure Dashboard Features

Visit **[Live Test Dashboard](https://chuls50.github.io/playwright-eCloud-QA/)** for:

- **📈 Test Trend Analysis** - Success/failure rates over time
- **🚀 Performance Monitoring** - Response time tracking
- **🔍 Failure Analysis** - Detailed error categorization
- **📋 Test Coverage** - Feature and role coverage metrics
- **⚡ Flaky Test Detection** - Identify unstable tests
- **📱 Multi-Browser Results** - Cross-browser compatibility status

## 📚 Resources & Documentation

### 🔗 External Links

- **[🎭 Playwright Documentation](https://playwright.dev/)** - Official Playwright guide
- **[📊 Allure Framework](http://allure.qatools.ru/)** - Allure reporting documentation
- **[🏥 eCloud Platform](https://globalmed.com/)** - eCloud product information
- **[🔒 HIPAA Compliance Guide](https://www.hhs.gov/hipaa/)** - Healthcare data security standards

### 🎓 Learning Resources

- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language guide
- **[Test Automation Best Practices](https://playwright.dev/docs/best-practices)** - Playwright testing guidelines
- **[Page Object Model Pattern](https://playwright.dev/docs/pom)** - POM implementation guide

---

## 📞 Support & Contact

**🆘 Need Help?**

- **Create an Issue**: [GitHub Issues](https://github.com/chuls50/playwright-eCloud-QA/issues)
- **Team Lead**: Contact your assigned team lead
- **Documentation**: Check [project wiki](https://github.com/chuls50/playwright-eCloud-QA/wiki)

---

<div align="center">

**🎭 Happy Testing with Playwright + MCP + Allure! 🎯**

_Built with ❤️ for eCloud Quality Assurance_

[![Last Updated](https://img.shields.io/badge/Updated-January%202026-blue)](https://github.com/chuls50/playwright-eCloud-QA)

</div>
