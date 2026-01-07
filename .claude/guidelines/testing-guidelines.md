# Testing Guidelines

> **Note to Claude**: Only read this file when working with tests, debugging test failures, or setting up new test suites

The application uses Jest with React Testing Library for unit testing and Playwright for end-to-end testing.

## Unit Testing

### Test Stack
- jest@^30.2.0
- @testing-library/react@^16.3.1
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^14.6.1
- jest-environment-jsdom@^30.2.0

### Configuration
- [jest.config.js](../../expense-tracker-ai/jest.config.js): Next.js integration, path alias support (@/ mapping), e2e test exclusion
- [jest.setup.js](../../expense-tracker-ai/jest.setup.js): Testing library setup, ResizeObserver mock for Recharts

### Running Tests
```bash
npm test           # Run all unit tests once
npm run test:watch # Run unit tests in watch mode
```

### Test Coverage
- Coverage collected from: `components/`, `lib/`, `app/`
- Example: [MonthlyInsights.test.tsx](../../expense-tracker-ai/components/MonthlyInsights.test.tsx) demonstrates component testing patterns

**Important**: ResizeObserver is mocked globally in jest.setup.js to support Recharts components in tests.

## E2E Testing with Playwright

The application uses Playwright for end-to-end testing of user flows.

### Test Stack
- @playwright/test@^1.57.0
- Playwright Chromium browser

### Configuration
- [playwright.config.ts](../../expense-tracker-ai/playwright.config.ts): Browser configs, base URL, retries, automatic dev server
- Tests located in: [tests/e2e/](../../expense-tracker-ai/tests/e2e/)

### Running Tests
```bash
npm run test:e2e        # Run all e2e tests
npm run test:e2e:ui     # Run with UI mode (interactive)
npm run test:e2e:debug  # Debug specific tests
```

## Test Patterns

### 1. Use data-testid for selectors
```typescript
// Component
<button data-testid="submit-button">Submit</button>

// Test
await page.locator('[data-testid="submit-button"]').click();
```

### 2. Clear localStorage in beforeEach
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});
```

### 3. Wait for elements properly
```typescript
// GOOD: Wait for visibility
await expect(page.locator('[data-testid="result"]')).toBeVisible();

// BAD: Arbitrary timeouts
await page.waitForTimeout(1000);
```

### 4. Test edge cases and error states
```typescript
test('should show error for negative amount', async ({ page }) => {
  await page.locator('[data-testid="amount-input"]').fill('-10');
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
});
```

## Common Gotchas

1. **localStorage Race Conditions**: Always clear localStorage in beforeEach to prevent test pollution
2. **Flaky Selectors**: Use data-testid instead of CSS classes or nth-child
3. **Missing Waits**: Use `toBeVisible()` instead of assuming elements exist
4. **Hardcoded Values**: Application fixes must be general, not specific to test data

## Test Coverage Requirements

When writing tests, ensure coverage of:
- Happy path scenarios
- Edge cases (empty states, maximum values)
- Error states (invalid inputs, failed operations)
- Boundary conditions (zero, negative, very large numbers)
- User interactions (click, type, select, navigate)
- Accessibility (keyboard navigation)

## Additional Documentation

For comprehensive testing documentation, see [docs/dev/testing-guide.md](../../expense-tracker-ai/docs/dev/testing-guide.md).
