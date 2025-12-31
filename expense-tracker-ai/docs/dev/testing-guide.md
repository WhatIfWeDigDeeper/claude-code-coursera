# Testing Guide

## Overview

This application uses two complementary testing approaches:

1. **Unit Testing** with Jest and React Testing Library
2. **End-to-End Testing** with Playwright

## Unit Testing

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Stack

- **jest** (v30.2.0) - Testing framework
- **@testing-library/react** (v16.3.1) - React component testing utilities
- **@testing-library/jest-dom** (v6.9.1) - Custom matchers for DOM
- **@testing-library/user-event** (v14.6.1) - User interaction simulation

### Configuration

- [jest.config.js](../../jest.config.js) - Jest configuration with Next.js integration
- [jest.setup.js](../../jest.setup.js) - Test environment setup

### Writing Unit Tests

Unit tests focus on component logic and rendering:

```typescript
// Example: components/MonthlyInsights.test.tsx
import { render, screen } from '@testing-library/react';
import MonthlyInsights from './MonthlyInsights';

test('renders the component with title', () => {
  render(<MonthlyInsights expenses={[]} categories={[]} />);
  expect(screen.getByText('Monthly Insights')).toBeInTheDocument();
});
```

### Coverage

Coverage is collected from:
- `components/**/*.{js,jsx,ts,tsx}`
- `lib/**/*.{js,jsx,ts,tsx}`
- `app/**/*.{js,jsx,ts,tsx}`

## E2E Testing with Playwright

### Running E2E Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug
```

### Test Stack

- **@playwright/test** (v1.57.0) - E2E testing framework
- **Playwright Chromium** - Browser automation

### Configuration

- [playwright.config.ts](../../playwright.config.ts) - Playwright configuration
  - Base URL: `http://localhost:3000`
  - Timeout: 30 seconds per test
  - Retries: 2 (in CI), 0 (locally)
  - Automatic dev server startup

### Writing E2E Tests

E2E tests focus on user flows and interactions:

```typescript
// Example: tests/e2e/expense-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Expense Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should add expense with valid data', async ({ page }) => {
    await page.locator('[data-testid="date-input"]').fill('2024-12-31');
    await page.locator('[data-testid="amount-input"]').fill('50.00');
    await page.locator('[data-testid="category-select"]').selectOption('Food');
    await page.locator('[data-testid="description-input"]').fill('Grocery shopping');
    await page.locator('[data-testid="submit-button"]').click();

    await page.getByRole('button', { name: 'Expenses' }).click();
    await expect(page.locator('[data-testid="expense-item"]').first()).toBeVisible();
  });
});
```

### Test Patterns

#### 1. Use data-testid for Selectors

**Component:**
```tsx
<button data-testid="submit-button">Submit</button>
```

**Test:**
```typescript
await page.locator('[data-testid="submit-button"]').click();
```

#### 2. Clear localStorage in beforeEach

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});
```

This prevents test pollution and ensures each test starts with a clean state.

#### 3. Wait for Elements Properly

```typescript
// GOOD: Wait for visibility
await expect(page.locator('[data-testid="result"]')).toBeVisible();

// BAD: Arbitrary timeouts
await page.waitForTimeout(1000);
```

#### 4. Test Edge Cases and Error States

```typescript
test('should show error for negative amount', async ({ page }) => {
  await page.locator('[data-testid="amount-input"]').fill('-10');
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
});
```

#### 5. Test Accessibility

```typescript
test('should be keyboard navigable', async ({ page }) => {
  await page.locator('[data-testid="date-input"]').focus();
  await expect(page.locator('[data-testid="date-input"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[data-testid="amount-input"]')).toBeFocused();
});
```

### Test Coverage Requirements

For each feature, ensure tests cover:

- ✅ **Happy path** - Valid inputs, expected flow
- ✅ **Edge cases** - Empty states, maximum values, minimum values
- ✅ **Error states** - Invalid inputs, failed operations
- ✅ **Boundary conditions** - Zero, negative numbers, very large numbers
- ✅ **User interactions** - Click, type, select, navigate
- ✅ **Accessibility** - Keyboard navigation, screen reader support

### Common Gotchas

#### 1. localStorage Race Conditions

Always clear localStorage in `beforeEach` to prevent test pollution:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});
```

#### 2. Flaky Selectors

Use `data-testid` instead of CSS classes or nth-child:

```typescript
// GOOD
await page.locator('[data-testid="submit-button"]').click();

// BAD
await page.locator('.btn-primary').click(); // CSS classes change
await page.locator('button:nth-child(2)').click(); // Brittle
```

#### 3. Missing Waits

Use `toBeVisible()` instead of assuming elements exist:

```typescript
// GOOD
await expect(page.locator('[data-testid="result"]')).toBeVisible();

// BAD
const result = page.locator('[data-testid="result"]');
await result.click(); // May fail if element isn't ready
```

#### 4. Hardcoded Values

Application fixes must be general, not specific to test data:

```typescript
// GOOD: General validation
if (amount <= 0) {
  setError('Amount must be greater than 0');
}

// BAD: Hardcoded for test
if (amount === -10) {
  setError('Negative amount');
}
```

## Full Validation Suite

Before committing changes, run the full validation suite:

```bash
# 1. Build
npm run build

# 2. Lint
npm run lint

# 3. Unit tests
npm test

# 4. E2E tests
npm run test:e2e
```

All commands must pass before merging.

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm test -- MonthlyInsights.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"

# Run with coverage
npm test -- --coverage
```

### E2E Tests

```bash
# Run in UI mode (interactive debugging)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e -- expense-form.spec.ts

# Debug specific test
npm run test:e2e:debug -- expense-form.spec.ts
```

## CI/CD Integration

The tests are configured for CI environments:

- **Retries**: 2 retries in CI (vs 0 locally)
- **Workers**: 1 worker in CI (vs unlimited locally)
- **forbidOnly**: Prevents `.only` from being committed

Set `CI=true` environment variable in your CI pipeline.

## Test Reports

After running e2e tests, view the HTML report:

```bash
npx playwright show-report
```

The report includes:
- Test results and timing
- Screenshots on failure
- Video recordings (if enabled)
- Network activity logs

## Adding New Tests

### For New Components

1. Create unit test: `components/ComponentName.test.tsx`
2. Add e2e test if it involves user interaction: `tests/e2e/feature-name.spec.ts`

### For New Features

1. Add `data-testid` attributes to key elements
2. Write e2e tests covering happy path and edge cases
3. Update this documentation if new patterns emerge

## Related Documentation

- [GETTING_STARTED.md](../GETTING_STARTED.md) - Developer onboarding
- [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md) - Architecture overview
- [Playwright Documentation](https://playwright.dev)
- [Testing Library Best Practices](https://testing-library.com/docs/)
