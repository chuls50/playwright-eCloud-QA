# eCloud Playwright QA Automation

TypeScript-based test automation framework for the eNcounterCloud (eCloud) web application using Playwright. This project provides automated test coverage for the secure cloud-based medical image archiving and management system.

## 🏥 About eCloud

eNcounterCloud is a secure, FDA-accredited Picture Archiving Communications System (PACS) that provides:

- **Secure Medical Imaging**: Cloud-based image archiving with AES-256 encryption
- **HIPAA Compliant**: Full compliance for data security and privacy
- **Multi-User Support**: Clinical and administrative user profiles
- **DICOM Compatible**: Full DICOM/TLS services support
- **Cross-Platform**: Browser-based access across multiple devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- eCloud QA environment access

### Installation

```bash
# Clone the repository
git clone https://github.com/chuls50/playwright-eCloud-QA.git
cd playwright-eCloud-QA

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Configure your `.env` file with test credentials:

```env
# QA Environment URL
QA_ENV=https://ecloud-modern.qa-encounterservices.com/

# Physician Test Credentials
PHYSICIAN_USERNAME=your-physician-username
PHYSICIAN_PASSWORD=your-physician-password

# Admin Test Credentials
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

> ⚠️ **Security Note**: Never commit the `.env` file to version control. It's included in `.gitignore` for your protection.

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run specific test file
npx playwright test tests/regression/physician-user/physician_dashboard_pending_tab.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# View HTML test report
npx playwright show-report
```

## 📁 Project Structure

```
playwright-eCloud-QA/
├── .github/
│   └── workflows/
│       └── playwright.yml              # CI/CD workflow configuration
├── tests/
│   ├── models/
│   │   └── base-page.ts                # Base page with reusable methods
│   ├── regression/
│   │   ├── administrator-user/         # Admin user tests
│   │   ├── e3/                         # E3 feature tests
│   │   ├── guest-user/                 # Guest user tests
│   │   ├── institution-manager-user/   # Institution manager tests
│   │   ├── login-page/                 # Login functionality tests
│   │   ├── nurse-user/                 # Nurse user tests
│   │   ├── physician-user/             # Physician user tests
│   │   ├── technician-user/            # Technician user tests
│   │   └── technology-user/            # Technology user tests
│   └── example.spec.ts                 # Example test file
├── test-results/                       # Test execution results (git-ignored)
├── playwright-report/                  # HTML test reports (git-ignored)
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies
├── .env                                # Environment variables (git-ignored)
├── .env.example                        # Environment template
├── .prettierrc.json                    # Code formatting rules
└── README.md                           # This file
```

## 🏗️ Test Architecture

### BasePage Pattern

The framework uses a Page Object Model (POM) approach with a `BasePage` class containing reusable methods:

**Location**: `tests/models/base-page.ts`

**Features**:

- `performPhysicianLogin(options)` - Authenticates as a physician user
- Automatically loads environment variables from `.env`
- Provides consistent error handling and logging

### Writing New Tests

Example test structure:

```typescript
import { test, expect, Page } from '@playwright/test';
import { BasePage } from '../../models/base-page';

test.describe('Feature Name @tag', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.performPhysicianLogin();
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('Test description @[ticket-number]', async ({ page }) => {
    // 1. First step description
    const element = page.locator('#element-id');
    await expect(element).toBeVisible();

    // 2. Next step description
    await element.click();
  });
});
```

### Key Guidelines

1. **TypeScript**: All test files should be `.spec.ts` files
2. **Imports**: No file extension needed thanks to `"moduleResolution": "bundler"` (e.g., `from '../../models/base-page'`)
3. **Single Quotes**: Project uses single quotes (configured in `.prettierrc.json`)
4. **Type Safety**: Add type annotations for variables and parameters
5. **Organize by Role**: Place tests in appropriate user role folders

## ⚙️ Configuration

### Playwright Config (`playwright.config.ts`)

Key settings:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled (`fullyParallel: true`)
- **Retries**: 2 retries in CI, 0 locally
- **Workers**: 1 worker in CI, auto-detected locally
- **Browsers**: Chromium, Firefox, and WebKit
- **Reporter**: HTML report generation

### TypeScript Config (`tsconfig.json`)

- **Module System**: ESNext (ES modules)
- **Target**: ESNext (modern JavaScript)
- **Strict Mode**: Enabled for type safety
- **Module Resolution**: Bundler strategy

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow that:

- ✅ Runs on push/pull request to main branch
- ✅ Runs every Friday at midnight UTC (scheduled)
- ✅ Installs dependencies and Playwright browsers
- ✅ Executes all tests
- ✅ Uploads test reports as artifacts

**Workflow File**: `.github/workflows/playwright.yml`

### Setting Up GitHub Secrets

To enable CI/CD, add these secrets to your GitHub repository:

1. Navigate to: `Settings` → `Secrets and variables` → `Actions`
2. Add the following repository secrets:
   - `QA_ENV` - QA environment URL
   - `PHYSICIAN_USERNAME` - Physician test username
   - `PHYSICIAN_PASSWORD` - Physician test password
   - `ADMIN_USERNAME` - Admin test username
   - `ADMIN_PASSWORD` - Admin test password

## 🤝 Contributing

### Getting Started as a New Contributor

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chuls50/playwright-eCloud-QA.git
   cd playwright-eCloud-QA
   ```

2. **Install dependencies**:

   ```bash
   npm install
   npx playwright install --with-deps
   ```

3. **Set up environment**:

   - Copy `.env.example` to `.env`
   - Ask your team lead for test credentials
   - Update `.env` with provided credentials

4. **Verify setup**:
   ```bash
   npx playwright test tests/example.spec.ts
   ```

### Development Workflow

1. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write your tests** in the appropriate `tests/regression/[role]/` folder

3. **Run tests locally**:

   ```bash
   npx playwright test
   ```

4. **Commit and push**:

   ```bash
   git add .
   git commit -m "Add tests for feature X"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Code Formatting

The project uses Prettier for consistent code formatting:

- Automatically formats on save (if configured in VS Code)
- Uses single quotes
- 2-space indentation
- 100 character line width

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:

- Test execution summary
- Pass/fail status for each test
- Screenshots and traces for failures
- Execution time and performance metrics

## 🔒 Security Best Practices

- ✅ All credentials stored in `.env` file (git-ignored)
- ✅ GitHub Secrets for CI/CD environment variables
- ✅ No hardcoded credentials in test files
- ✅ HTTPS-only connections to test environment
- ✅ HIPAA-compliant test data handling

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [eCloud Documentation](https://globalmed.com)

## 🐛 Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module" errors

```bash
# Solution: Check your import paths are correct
import { BasePage } from '../../models/base-page';
```

**Issue**: Browser not launching

```bash
# Solution: Reinstall Playwright browsers
npx playwright install --with-deps
```

**Issue**: Environment variables not loading

```bash
# Solution: Verify .env file exists and contains correct values
cat .env  # Linux/Mac
type .env # Windows
```

---

**Questions or Issues?** Open an issue on GitHub or contact the team lead.

Happy Testing! 🎭
