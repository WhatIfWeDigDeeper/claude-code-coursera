# /e2e-test Command

Creates comprehensive Playwright end-to-end tests in an isolated git worktree environment.

## Task

Create and execute end-to-end tests for specified features using Playwright, ensuring all application code is robust and tests pass before merging back to main.

## Arguments

**$ARGUMENTS**: Feature specification (required)

- **Specific feature**: Single feature name (e.g., `expense-form`, `auth`, `dark-mode`)
- **Glob pattern**: Pattern matching multiple features (e.g., `expense-*`, `*-modal`)
- **All features**: Use `.` or `all` to test all application features

## Process Steps

### 1. Create Isolated Git Worktree

```bash
# Generate timestamp for unique worktree name
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
WORKTREE_PATH="../e2e-test-worktree-$TIMESTAMP"

# Create worktree from current branch
git worktree add "$WORKTREE_PATH" -b "e2e-test-$TIMESTAMP"
cd "$WORKTREE_PATH/expense-tracker-ai"
```

**Why**: Isolation prevents breaking the main workspace during test development and application fixes.

### 2. Install and Configure Playwright

**Check for existing Playwright installation**:
```bash
# Check if @playwright/test is in package.json
grep '@playwright/test' package.json
```

**If not present, install**:
```bash
npm install -D @playwright/test
npx playwright install --with-deps
```

**Create `playwright.config.ts` if missing**:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Add npm Script

**Check for existing script**:
```bash
grep 'test:e2e' package.json
```

**If not present, add**:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

Use the Edit tool to add the script to the existing scripts object.

### 4. Create Test Structure

**Create directories**:
```bash
mkdir -p tests/e2e
```

**Update `.gitignore`** (add if not present):
```
# Playwright
/test-results/
/playwright-report/
/playwright/.cache/
```

### 5. Identify Features to Test

**For specific feature** ($ARGUMENTS = `expense-form`):
- Single test file: `tests/e2e/expense-form.spec.ts`

**For glob pattern** ($ARGUMENTS = `expense-*`):
1. Search components and app directories for matching files
2. Map to feature names
3. Create test for each match

**For all features** ($ARGUMENTS = `.` or `all`):
1. List all components in `components/` directory
2. List all app routes in `app/` directory
3. Identify features without matching `*.spec.ts` in `tests/e2e/`
4. If >3 features, use Task tool with parallel subagents (1-2 features per agent)
5. Review existing tests for completeness, update as needed

**Feature Detection Commands**:
```bash
# List all components
ls -1 expense-tracker-ai/components/*.tsx | sed 's/.*\///' | sed 's/\.tsx$//'

# List all app routes
find expense-tracker-ai/app -type d -mindepth 1 | sed 's|expense-tracker-ai/app/||'

# Check for existing e2e tests
ls -1 expense-tracker-ai/tests/e2e/*.spec.ts 2>/dev/null || echo "No tests yet"
```

### 6. Generate Test Files

**Test File Template** (`tests/e2e/[feature-name].spec.ts`):

```typescript
import { test, expect } from '@playwright/test';

test.describe('[Feature Name]', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
  });

  test('should [happy path scenario]', async ({ page }) => {
    // Arrange: Set up test data

    // Act: Perform user actions

    // Assert: Verify expected outcomes
    await expect(page.locator('[data-testid="expected-element"]')).toBeVisible();
  });

  test('should handle [edge case scenario]', async ({ page }) => {
    // Test edge cases, error states, empty states
  });

  test('should validate [input validation scenario]', async ({ page }) => {
    // Test invalid inputs, boundary conditions
  });

  test('should be accessible', async ({ page }) => {
    // Basic accessibility checks
    // Consider using @axe-core/playwright for comprehensive checks
  });
});
```

**Test Implementation Standards**:

1. **Page Object Model** (recommended for complex features):
```typescript
// tests/e2e/page-objects/ExpenseFormPage.ts
export class ExpenseFormPage {
  constructor(private page: Page) {}

  async fillExpenseForm(data: { amount: string; description: string; category: string; date: string }) {
    await this.page.locator('[data-testid="amount-input"]').fill(data.amount);
    await this.page.locator('[data-testid="description-input"]').fill(data.description);
    await this.page.locator('[data-testid="category-select"]').selectOption(data.category);
    await this.page.locator('[data-testid="date-input"]').fill(data.date);
  }

  async submitForm() {
    await this.page.locator('[data-testid="submit-button"]').click();
  }
}
```

2. **Test Coverage Requirements**:
   - ✅ Happy path (valid inputs, expected flow)
   - ✅ Edge cases (empty states, maximum values, minimum values)
   - ✅ Error states (invalid inputs, failed operations)
   - ✅ Boundary conditions (0, negative numbers, very large numbers)
   - ✅ User interactions (click, type, select, navigate)
   - ✅ Accessibility (keyboard navigation, screen reader support)

3. **Selector Strategy**:
   - **Prefer**: `data-testid` attributes (stable, semantic)
   - **Avoid**: CSS classes (change frequently), nth-child selectors (brittle)
   - **Add** `data-testid` to components if missing

**Example: Add data-testid to Component**:
```typescript
// Before
<button onClick={handleSubmit}>Submit</button>

// After
<button onClick={handleSubmit} data-testid="submit-button">Submit</button>
```

4. **Accessibility Testing**:
```typescript
test('should be keyboard navigable', async ({ page }) => {
  await page.goto('/');

  // Tab through interactive elements
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'first-input');

  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'second-input');
});
```

### 7. Run Tests and Fix Failures

**Execute tests**:
```bash
npm run test:e2e
```

**For failures, categorize and fix**:

**Type 1: Application Code Issues** (MUST FIX IN APPLICATION):
- Missing `data-testid` attributes → Add to components
- Broken functionality → Fix the feature code
- Race conditions → Add proper loading states
- Validation bugs → Fix validation logic

**Type 2: Test Implementation Issues**:
- Incorrect selectors → Update test selectors
- Wrong assertions → Fix test expectations
- Timing issues → Add proper waits (`waitFor`, `toBeVisible`)

**CRITICAL**: Fixes must be general and robust, NOT hardcoded for specific test values.

**Example - GOOD Fix**:
```typescript
// Application code fix (ExpenseForm.tsx)
// Handles ANY positive number correctly
if (amount <= 0) {
  setError('Amount must be greater than 0');
  return;
}
```

**Example - BAD Fix**:
```typescript
// Hardcoded for test value - DON'T DO THIS
if (amount === 100) {
  // Special handling for test value
}
```

**Debugging Commands**:
```bash
# Run in UI mode for interactive debugging
npm run test:e2e:ui

# Run in headed mode to see browser
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e -- expense-form.spec.ts

# Debug specific test
npm run test:e2e:debug -- expense-form.spec.ts
```

### 8. Validate Full Suite

**Run in order** (stop on first failure):

```bash
# 1. Build validation
echo "Running build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# 2. Lint validation
echo "Running lint..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint failed"
  exit 1
fi

# 3. Unit tests validation
echo "Running unit tests..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi

# 4. E2E tests validation
echo "Running e2e tests..."
npm run test:e2e
if [ $? -ne 0 ]; then
  echo "❌ E2E tests failed"
  exit 1
fi

echo "✅ All validations passed"
```

### 9. Error Handling & Categorization

**Build Errors**:
```
🔴 Build Errors Detected

Error: Type 'string' is not assignable to type 'number'
  → File: components/ExpenseForm.tsx:42

Recommendation:
1. Check for breaking changes in dependencies
2. Run 'npm install' to ensure lock file sync
3. Update @types/* packages if type errors persist
```

**Lint Errors**:
```
🔴 Lint Errors Detected

✗ Unexpected any type (4 errors)
  → components/ExpenseForm.tsx:15
  → components/ExpenseForm.tsx:23
  → lib/storage.ts:8
  → lib/storage.ts:12

Recommendation:
1. Run 'npm run lint -- --fix' for auto-fixable issues
2. Manually fix type definitions for 'any' types
```

**Test Failures**:
```
🔴 Test Failures Detected

FAILED tests/e2e/expense-form.spec.ts
  ✗ should add expense with valid data
    Expected element to be visible, but it was not found

Category: Deterministic failure (selector issue)

Debugging:
1. Run 'npm run test:e2e:ui' for interactive debugging
2. Run 'npm run test:e2e -- --headed' to see browser
3. Check selector: [data-testid="expense-item"]
```

**Security Issues**:
```
🔴 Security Vulnerabilities Detected

2 high severity vulnerabilities found

Package: webpack (5.88.0)
Severity: High
Recommendation: Update to 5.89.0 or later

Manual remediation:
npm install webpack@latest --save-dev
npm test  # Verify compatibility
```

### 10. Documentation Updates

**Update `expense-tracker-ai/docs/dev/testing-guide.md`** (create if missing):

```markdown
# Testing Guide

## E2E Testing with Playwright

### Running E2E Tests

\`\`\`bash
# Run all e2e tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug
\`\`\`

### Writing E2E Tests

See [tests/e2e/](../../tests/e2e/) for examples.

**Key Patterns**:
- Use `data-testid` attributes for stable selectors
- Follow Page Object Model for complex features
- Test happy paths, edge cases, and error states
- Include accessibility checks

**Example**:
\`\`\`typescript
test('should add expense', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="amount-input"]').fill('50.00');
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page.locator('[data-testid="expense-item"]')).toBeVisible();
});
\`\`\`
```

**Update `expense-tracker-ai/GETTING_STARTED.md`** (add E2E section):

```markdown
### Running Tests

\`\`\`bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
\`\`\`

For more details, see [Testing Guide](docs/dev/testing-guide.md).
```

### 11. Update CLAUDE.md

**Add section after "Testing Infrastructure"**:

```markdown
## E2E Testing with Playwright

The application uses Playwright for end-to-end testing of user flows.

**Test Stack**:
- @playwright/test
- Playwright browsers (Chromium, Firefox, WebKit)

**Configuration**:
- [playwright.config.ts](expense-tracker-ai/playwright.config.ts): Browser configs, base URL, retries
- Tests located in: [tests/e2e/](expense-tracker-ai/tests/e2e/)

**Running Tests**:
```bash
npm run test:e2e        # Run all e2e tests
npm run test:e2e:ui     # Run with UI mode
npm run test:e2e:debug  # Debug specific tests
```

**Test Patterns**:

1. **Use data-testid for selectors**:
```typescript
// Component
<button data-testid="submit-button">Submit</button>

// Test
await page.locator('[data-testid="submit-button"]').click();
```

2. **Clear localStorage in beforeEach**:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});
```

3. **Wait for elements properly**:
```typescript
// GOOD: Wait for visibility
await expect(page.locator('[data-testid="result"]')).toBeVisible();

// BAD: Arbitrary timeouts
await page.waitForTimeout(1000);
```

4. **Test edge cases and error states**:
```typescript
test('should show error for negative amount', async ({ page }) => {
  await page.locator('[data-testid="amount-input"]').fill('-10');
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
});
```

**Common Gotchas**:

1. **localStorage Race Conditions**: Always clear localStorage in beforeEach to prevent test pollution
2. **Flaky Selectors**: Use data-testid instead of CSS classes or nth-child
3. **Missing Waits**: Use `toBeVisible()` instead of assuming elements exist
4. **Hardcoded Values**: Application fixes must be general, not specific to test data
```

### 12. Report Results

**Success Report Template**:

```markdown
✅ E2E Testing Complete

📊 Summary:
- Tests created: [count]
- Tests updated: [count]
- Application code changes: [count]

📝 Tests Created/Updated:
- tests/e2e/expense-form.spec.ts (12 tests)
- tests/e2e/expense-list.spec.ts (8 tests)
- tests/e2e/dark-mode.spec.ts (6 tests)

🔧 Application Changes:
- Added data-testid to ExpenseForm submit button (components/ExpenseForm.tsx:45)
- Fixed validation for negative amounts (components/ExpenseForm.tsx:78)
- Added loading state for async operations (app/page.tsx:123)

✅ Validation Results:
- Build: ✓ Passed
- Lint: ✓ Passed
- Unit tests: ✓ Passed (24/24)
- E2E tests: ✓ Passed (26/26)

📁 Worktree: ../e2e-test-worktree-[timestamp]

📚 Documentation Updated:
- expense-tracker-ai/docs/dev/testing-guide.md
- expense-tracker-ai/GETTING_STARTED.md
- CLAUDE.md (E2E Testing section added)
```

**Failure Report Template**:

```markdown
❌ E2E Testing Failed

📊 Summary:
- Tests created: [count]
- Tests passing: [count]
- Tests failing: [count]

🔴 Failures:

[Error category and details]

🔧 Attempted Fixes:
- [List of fixes attempted]

📁 Worktree: ../e2e-test-worktree-[timestamp]

🛠️ Next Steps:
1. Review failures in worktree
2. Run 'npm run test:e2e:ui' for interactive debugging
3. Fix remaining issues
4. Re-run validation suite
```

### 13. Prompt User for Merge

**On Success**:

```
✅ E2E tests are passing. All validations successful.

Merge changes back to main branch? (yes/no)

- yes: Will merge worktree → main, then remove worktree
- no: Worktree will remain for manual review at ../e2e-test-worktree-[timestamp]
```

**If user says yes**:
```bash
# Navigate to original repo
cd /path/to/original/repo

# Merge the e2e-test branch
git merge e2e-test-[timestamp]

# Push to remote if applicable
git push origin main

# Remove worktree
git worktree remove ../e2e-test-worktree-[timestamp]

# Delete branch
git branch -d e2e-test-[timestamp]

echo "✅ Changes merged and worktree cleaned up"
```

**If user says no**:
```
Worktree preserved for manual review.

Location: ../e2e-test-worktree-[timestamp]

To merge manually:
1. cd [original-repo-path]
2. git merge e2e-test-[timestamp]
3. git push origin main

To clean up when done:
git worktree remove ../e2e-test-worktree-[timestamp]
git branch -d e2e-test-[timestamp]
```

**On Failure**:

```
❌ Tests failed. Keep worktree for debugging or clean up?

Options:
- keep: Preserve worktree for manual debugging
- cleanup: Remove worktree and discard changes

Worktree path: ../e2e-test-worktree-[timestamp]

To debug:
cd ../e2e-test-worktree-[timestamp]/expense-tracker-ai
npm run test:e2e:ui
```

**If user chooses cleanup**:
```bash
cd /path/to/original/repo
git worktree remove ../e2e-test-worktree-[timestamp] --force
git branch -D e2e-test-[timestamp]
echo "✅ Worktree removed"
```

## Success Criteria Checklist

Before prompting for merge, verify:

- [x] Worktree created and isolated (main branch unchanged)
- [x] Playwright installed and configured
- [x] All requested tests created with proper coverage
  - [x] Happy path scenarios
  - [x] Edge cases
  - [x] Error states
  - [x] Accessibility checks
- [x] `data-testid` attributes added where needed
- [x] Full validation suite passed:
  - [x] `npm run build` ✓
  - [x] `npm run lint` ✓
  - [x] `npm test` ✓
  - [x] `npm run test:e2e` ✓
- [x] Clear pass/fail report generated
- [x] Documentation updated:
  - [x] `docs/dev/testing-guide.md`
  - [x] `GETTING_STARTED.md`
- [x] CLAUDE.md updated with E2E patterns
- [x] User prompted for merge decision

## Parallel Execution Strategy

**When $ARGUMENTS matches >3 features**:

Use Task tool with parallel subagents for efficiency:

```typescript
// Pseudocode for parallel test generation
const features = identifyFeatures($ARGUMENTS); // e.g., ['expense-form', 'expense-list', 'dashboard', 'dark-mode', 'export']

if (features.length > 3) {
  // Split into groups of 1-2 features per agent
  const groups = chunkArray(features, 2); // [[expense-form, expense-list], [dashboard, dark-mode], [export]]

  // Launch agents in parallel
  const agents = groups.map((group, index) =>
    Task({
      subagent_type: 'general-purpose',
      description: `Create e2e tests for ${group.join(', ')}`,
      prompt: `Create comprehensive Playwright e2e tests for: ${group.join(', ')}\n\nFollow test standards in .claude/commands/e2e-test.md`,
      run_in_background: true
    })
  );

  // Wait for all agents to complete
  // Collect results and continue with validation
}
```

## Edge Cases

**Case 1: No features match glob pattern**
```
⚠️ No features found matching pattern: expense-xyz*

Available features:
- expense-form
- expense-list
- dashboard
- dark-mode

Please update pattern or specify features directly.
```

**Case 2: Playwright already installed but outdated**
```
ℹ️ Found Playwright v1.20.0 (latest: v1.40.0)

Update to latest version? (yes/no)
```

**Case 3: Port 3000 already in use**
```
❌ Port 3000 already in use

Options:
1. Kill existing process on port 3000
2. Update playwright.config.ts to use different port
3. Manually stop conflicting service

Choose option (1/2/3):
```

**Case 4: Tests pass locally but should fail**
```
⚠️ Warning: Tests are passing but may have false positives

Review checklist:
- Are assertions actually checking expected behavior?
- Are selectors finding the right elements?
- Are error states properly tested?

Review tests before merging? (yes/no)
```

## Quality Standards

**Test Quality Indicators**:
- ✅ Each test has clear describe/test names
- ✅ Tests use Page Object Model for complex features
- ✅ Selectors use data-testid (not CSS classes)
- ✅ Tests are deterministic (no random failures)
- ✅ Edge cases and error states covered
- ✅ Accessibility checks included
- ✅ No hardcoded waits (`waitForTimeout`)
- ✅ Tests are independent (can run in any order)

**Code Quality Indicators**:
- ✅ Application fixes are general (not test-specific)
- ✅ data-testid attributes follow naming convention
- ✅ No regression in existing tests
- ✅ Build/lint/unit tests still pass
- ✅ Documentation reflects new patterns

## Examples

### Example 1: Specific Feature

```
User: /e2e-test expense-form

Output:
✅ E2E Testing Complete

📊 Summary:
- Tests created: 1 file (12 tests)
- Application code changes: 2

📝 Tests Created:
- tests/e2e/expense-form.spec.ts (12 tests)
  ✓ should add expense with valid data
  ✓ should edit existing expense
  ✓ should delete expense
  ✓ should validate required fields
  ✓ should validate amount > 0
  ✓ should handle date selection
  ✓ should handle category selection
  ✓ should clear form after submission
  ✓ should show error for negative amount
  ✓ should show error for empty description
  ✓ should be keyboard navigable
  ✓ should be accessible

🔧 Application Changes:
- Added data-testid to submit button (components/ExpenseForm.tsx:45)
- Fixed validation message for negative amounts (components/ExpenseForm.tsx:78)

✅ Validation: build ✓ lint ✓ unit tests ✓ e2e tests (12/12) ✓

Merge changes back to main branch? (yes/no)
```

### Example 2: Glob Pattern

```
User: /e2e-test expense-*

Output:
🔍 Found 3 features matching pattern 'expense-*':
- expense-form
- expense-list
- expense-export

Creating tests for all matched features...

✅ E2E Testing Complete

📊 Summary:
- Tests created: 3 files (28 tests)
- Application code changes: 5

📝 Tests Created:
- tests/e2e/expense-form.spec.ts (12 tests)
- tests/e2e/expense-list.spec.ts (10 tests)
- tests/e2e/expense-export.spec.ts (6 tests)

✅ Validation: build ✓ lint ✓ unit tests ✓ e2e tests (28/28) ✓

Merge changes back to main branch? (yes/no)
```

### Example 3: All Features

```
User: /e2e-test all

Output:
🔍 Analyzing codebase for features...

Found 8 features:
- expense-form (no tests) ✨ NEW
- expense-list (no tests) ✨ NEW
- dashboard (no tests) ✨ NEW
- spending-chart (no tests) ✨ NEW
- dark-mode (tests exist) 🔄 REVIEW
- export-modal (no tests) ✨ NEW
- theme-toggle (no tests) ✨ NEW
- monthly-insights (tests exist) 🔄 REVIEW

Using parallel agents for 6 new features...

✅ E2E Testing Complete

📊 Summary:
- Tests created: 6 files (48 tests)
- Tests reviewed/updated: 2 files (4 tests added)
- Application code changes: 12

✅ Validation: build ✓ lint ✓ unit tests ✓ e2e tests (52/52) ✓

Merge changes back to main branch? (yes/no)
```

## Related Documentation

- [Playwright Documentation](https://playwright.dev)
- [Testing Library Best Practices](https://testing-library.com/docs/)
- [CLAUDE.md](../../CLAUDE.md) - Project-specific patterns
- [Module 4 Notes](../../module-4.md) - Context about commands
